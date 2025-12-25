#!/bin/bash

###############################################################################
# Kuikly H5 Bundle Builder and Copier
# 
# 功能：编译指定的 Kuikly 页面并将 bundle 文件复制到 h5App-js 项目
#
# 用法：
#   ./scripts/build-and-copy-bundles.sh [pageNameList]
#
# 参数：
#   pageNameList - 可选，逗号分隔的页面名称列表（如：router,home,detail）
#                  如果不指定，则编译所有页面
#
# 示例：
#   ./scripts/build-and-copy-bundles.sh HelloWorldPage,000
#   ./scripts/build-and-copy-bundles.sh              # 编译所有页面 (等同于 -PpageNameList=all)
###############################################################################

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
H5APP_JS_DIR="$(dirname "$SCRIPT_DIR")"
KUIKLY_ROOT="$(dirname "$H5APP_JS_DIR")"

# 页面名称列表参数
PAGE_NAME_LIST="${1:-}"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Kuikly Page Bundle Builder${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 显示配置信息
echo -e "${YELLOW}📁 项目根目录:${NC} $KUIKLY_ROOT"
echo -e "${YELLOW}📁 H5 应用目录:${NC} $H5APP_JS_DIR"

if [ -z "$PAGE_NAME_LIST" ]; then
  echo -e "${YELLOW}📄 页面列表:${NC} 所有页面 (all)"
else
  echo -e "${YELLOW}📄 页面列表:${NC} $PAGE_NAME_LIST"
fi

echo ""

# 检查项目根目录
if [ ! -f "$KUIKLY_ROOT/gradlew" ]; then
  echo -e "${RED}❌ 错误: 找不到 gradlew 文件${NC}"
  echo -e "${RED}   请确保在正确的目录下运行此脚本${NC}"
  exit 1
fi

# 步骤 1: 清理构建产物
echo -e "${GREEN}[1/4]${NC} 清理旧的构建产物..."
cd "$KUIKLY_ROOT"
./gradlew clean
echo -e "      ✅ 清理完成"
echo ""

# 步骤 2: 编译页面 bundle
echo -e "${GREEN}[2/4]${NC} 编译 Kuikly 页面 bundle..."
cd "$KUIKLY_ROOT"

if [ -z "$PAGE_NAME_LIST" ]; then
  # 编译所有页面
  echo -e "      正在编译所有页面..."
  ./gradlew :demo:packEntryJSBundleDebug -PpageNameList=all
else
  # 编译指定页面
  echo -e "      正在编译页面: ${YELLOW}$PAGE_NAME_LIST${NC}"
  ./gradlew :demo:packEntryJSBundleDebug -PpageNameList=$PAGE_NAME_LIST
fi

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ 编译失败${NC}"
  exit 1
fi

echo -e "      ✅ 编译完成"
echo ""

# 步骤 3: 检查产物并复制到 h5App-js
echo -e "${GREEN}[3/4]${NC} 检查编译产物..."

BUNDLE_SOURCE_DIR="$KUIKLY_ROOT/demo/build/dist/js/developmentExecutable"

if [ ! -d "$BUNDLE_SOURCE_DIR" ]; then
  echo -e "${RED}❌ 错误: 找不到编译产物目录${NC}"
  echo -e "${RED}   预期位置: $BUNDLE_SOURCE_DIR${NC}"
  exit 1
fi

# 统计 bundle 文件数量
BUNDLE_COUNT=$(find "$BUNDLE_SOURCE_DIR" -maxdepth 1 -name "*.bundle.js" -type f | wc -l)

if [ "$BUNDLE_COUNT" -eq 0 ]; then
  echo -e "${RED}❌ 错误: 没有找到任何 .bundle.js 文件${NC}"
  exit 1
fi

echo -e "      找到 ${YELLOW}$BUNDLE_COUNT${NC} 个 bundle 文件"
echo ""

# 步骤 4: 清理目标目录并复制
echo -e "${GREEN}[4/4]${NC} 清理目标目录并复制 bundle 文件..."

# 创建目标目录
TARGET_BUNDLES_DIR="$H5APP_JS_DIR/src/bundles"
mkdir -p "$TARGET_BUNDLES_DIR"

# 清理旧的 bundle 文件
echo -e "      正在清理旧的 bundle 文件..."
if [ -d "$TARGET_BUNDLES_DIR" ]; then
  # 删除所有 .bundle.js 文件
  find "$TARGET_BUNDLES_DIR" -maxdepth 1 -name "*.bundle.js" -type f -delete 2>/dev/null || true
  # 删除 composeResources 目录
  if [ -d "$TARGET_BUNDLES_DIR/composeResources" ]; then
    rm -rf "$TARGET_BUNDLES_DIR/composeResources"
  fi
  echo -e "      ✅ 清理完成"
fi

# 复制 bundle 文件到 h5App-js
echo -e "      正在复制 bundle 文件..."

# 复制所有 .bundle.js 文件
COPIED_COUNT=0
for bundle_file in "$BUNDLE_SOURCE_DIR"/*.bundle.js; do
  if [ -f "$bundle_file" ]; then
    filename=$(basename "$bundle_file")
    cp "$bundle_file" "$TARGET_BUNDLES_DIR/"
    echo -e "      ✅ 复制: ${YELLOW}$filename${NC}"
    COPIED_COUNT=$((COPIED_COUNT + 1))
  fi
done

# 复制资源文件（如果存在）
RESOURCES_SOURCE_DIR="$BUNDLE_SOURCE_DIR/composeResources"
if [ -d "$RESOURCES_SOURCE_DIR" ]; then
  TARGET_RESOURCES_DIR="$TARGET_BUNDLES_DIR/composeResources"
  mkdir -p "$TARGET_RESOURCES_DIR"
  cp -r "$RESOURCES_SOURCE_DIR"/* "$TARGET_RESOURCES_DIR/" 2>/dev/null || true
  echo -e "      ✅ 复制资源文件到 composeResources/"
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✨ 完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "📦 已复制 ${YELLOW}$COPIED_COUNT${NC} 个 bundle 文件到:"
echo -e "   ${BLUE}$TARGET_BUNDLES_DIR${NC}"
echo ""
echo -e "${YELLOW}💡 提示:${NC}"
echo -e "   1. Bundle 文件已复制到 ${BLUE}src/bundles/${NC} 目录"
echo -e "   2. 在 HTML 中使用 ${BLUE}<script src=\"bundles/页面名.bundle.js\"></script>${NC} 引入"
echo -e "   3. 运行 ${BLUE}npm run dev${NC} 启动开发服务器"
echo ""
