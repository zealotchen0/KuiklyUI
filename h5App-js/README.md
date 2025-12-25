# Kuikly H5 App (JavaScript)

JavaScript 实现的 Kuikly H5 应用，通过集成编译后的 Kotlin/JS 核心渲染库实现完整的 Kuikly 渲染能力。

## 🚀 快速开始

### 📋 常用 npm 命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run rebuild-kotlin` | 编译并复制 Kotlin/JS 核心库（生产版本） |
| `npm run rebuild-kotlin:dev` | 编译并复制 Kotlin/JS 核心库（开发版本） |
| `npm run build-bundles HelloWorldPage,000` | 编译指定页面 Bundle |
| `npm run build-bundles:all` | 编译所有页面 Bundle |
| `npm run copy-libs` | 仅复制 Kotlin/JS 核心库（生产版本，不编译） |
| `npm run copy-libs:dev` | 仅复制 Kotlin/JS 核心库（开发版本，不编译） |

### 完整初始化流程（首次运行）

```bash
# 1. 安装依赖
npm install

# 2. 编译并复制 Kotlin 核心库
npm run rebuild-kotlin

# 3. 编译并复制页面 Bundle（指定页面名称）
npm run build-bundles HelloWorldPage,000

# 4. 启动开发服务器
npm run dev
```

访问 http://localhost:8080

### 快速开始（推荐的开发流程）

1. **修改核心库代码** → 运行 `npm run rebuild-kotlin`
2. **修改页面代码** → 运行 `npm run build-bundles 页面名`
3. **修改 JS 代码** → 自动热重载，无需操作

---

## 📖 详细说明

### 1. 安装依赖
```bash
npm install
```

### 2. 编译并复制 Kotlin/JS 核心库

```bash
npm run rebuild-kotlin
```

此命令会自动完成：
1. 编译 `core-render-web:h5` 模块（已包含 base 模块代码）
2. 复制编译产物到 `src/libs/`

**手动编译（可选）**
```bash
# 从项目根目录编译 Kotlin 模块
./gradlew :core-render-web:h5:clean :core-render-web:h5:jsBrowserProductionWebpack

# 复制编译产物到 h5App-js
npm run copy-libs
```

编译产物说明：
- `KuiklyCore-render-web-h5.js` + `.d.ts`：H5 渲染模块（webpack 打包，已包含 base 模块和所有依赖）

**开发模式编译（可选）**
```bash
npm run rebuild-kotlin:dev
```
开发模式生成的产物包含更多调试信息，便于排查问题。

### 3. 编译并复制页面 Bundle

Kuikly 页面需要先编译成 JS bundle 文件才能在 Web 中加载。

```bash
# 编译指定页面（推荐，速度快）
npm run build-bundles HelloWorldPage,000

# 或者编译所有页面
npm run build-bundles:all
```

**手动编译（可选）**
```bash
# 从项目根目录执行
cd ..

# 编译指定页面
./gradlew clean && ./gradlew :demo:packEntryJSBundleDebug -PpageNameList=HelloWorldPage,000

# 或编译所有页面
./gradlew clean && ./gradlew :demo:packEntryJSBundleDebug -PpageNameList=all

# 复制到 h5App-js
cd h5App-js
cp ../demo/build/dist/js/developmentExecutable/*.bundle.js src/bundles/
```

编译产物说明：
- `页面名.bundle.js`：页面的完整渲染代码（包含 UI 和业务逻辑）
- `composeResources/`：Compose 资源文件

### Bundle依赖管理

多页面bundles支持自动依赖检查，通过 `src/resources/bundle-config.js` 配置特殊依赖：

```javascript
// bundle-config.js 示例
window.BundleConfig = {
  // 特殊依赖配置
  specialDependencies: {
    'PageA': ['common-utils.bundle.js'],
    'PageB': ['shared-components.bundle.js', 'common-utils.bundle.js']
  },
  // 全局依赖（所有页面都需要）
  globalDependencies: ['runtime.bundle.js']
};
```

⚠️ **重要提示：**
- Bundle 文件会自动复制到 `src/bundles/` 目录
- 多页面bundles会**自动检查依赖**，确保正确的加载顺序
- 特殊依赖可在 `src/resources/bundle-config.js` 中配置
- 无需手动在 HTML 中添加 `<script>` 标签
- Bundle 加载顺序：Kotlin 核心库 → Bundle 文件 → 应用代码

### 4. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:8080

### 5. 构建生产版本
```bash
npm run build
```

构建产物位于 `build/distributions/`

## 📁 项目结构

```
h5App-js/
├── src/
│   ├── libs/                # Kotlin/JS 核心库（webpack 打包版本）
│   │   ├── KuiklyCore-render-web-h5.js          # H5 渲染模块（已包含 base 模块）
│   │   └── KuiklyCore-render-web-h5.d.ts        # TypeScript 类型定义
│   ├── bundles/             # 页面 Bundle 文件
│   │   ├── router.bundle.js
│   │   ├── home.bundle.js
│   │   └── composeResources/  # Compose 资源
│   ├── resources/           # 静态资源和配置
│   │   └── bundle-config.js # Bundle依赖配置文件
│   ├── components/          # 自定义组件
│   ├── modules/             # 自定义模块
│   ├── KuiklyWebRenderViewDelegator.js  # 委托实现
│   └── index.js            # 应用入口
├── scripts/                 # 构建脚本（通过 npm 命令调用）
└── package.json
```

## 🎯 核心架构

本项目通过 **委托模式** 集成 Kotlin/JS 核心渲染库：

```
JavaScript App
    ↓
KuiklyWebRenderViewDelegator.js (JS 委托实现)
    ↓
KuiklyRenderViewDelegator (Kotlin/JS 编译)
    ↓
核心渲染引擎 (Kotlin)
```

## 🔧 关键实现

### 1. Kotlin/JS 模块加载

在 `index.html` 中加载：
```html
<script src="libs/KuiklyCore-render-web-h5.js"></script>
```

> 注：h5 模块已包含 base 模块代码，无需单独加载 base 模块。使用 webpack 打包版本，已包含所需的 Kotlin 标准库依赖。

### 2. 访问导出的 Kotlin 类

Kotlin/JS 编译后会在 `window` 对象上注册全局模块：

```javascript
// H5 模块（主入口类）
const h5Module = window['com.tencent.kuikly-open.core-render-web:h5'];
const KotlinDelegator = h5Module.com.tencent.kuikly.core.render.web.runtime.web.expand.KuiklyRenderViewDelegator;

// Base 模块（枚举和工具类）
const baseModule = window['KuiklyCore-render-web-base'];
const ExecuteMode = baseModule.com.tencent.kuikly.core.render.web.context.KuiklyRenderCoreExecuteMode;
const ErrorReason = baseModule.com.tencent.kuikly.core.render.web.exception.ErrorReason;
```

### 3. 实现委托接口

`KuiklyWebRenderViewDelegator.js` 实现了 Kotlin 委托接口的所有方法：

```javascript
const delegateImpl = {
  // 注册自定义渲染视图
  registerExternalRenderView(kuiklyRenderExport) {
    // 注册 MyView, WebView, PageView 等
  },
  
  // 注册自定义模块
  registerExternalModule(kuiklyRenderExport) {
    // 注册 Bridge, Cache 等模块
  },
  
  // 返回执行模式（JS = 2）
  coreExecuteMode() {
    return baseModule.com.tencent.kuikly.core.render.web.context
           .KuiklyRenderCoreExecuteMode.JS_getInstance();
  },
  
  // 生命周期回调
  onKuiklyRenderViewCreated() { /* ... */ },
  onPageLoadComplete(isSucceed, errorReason, executeMode) { /* ... */ },
  onUnhandledException(throwable, errorReason, executeMode) { /* ... */ }
};

// 创建 Kotlin 实例
const kotlinDelegator = new KotlinDelegator(delegateImpl);
```

### 4. JavaScript ↔ Kotlin 类型转换

**JS Object → Kotlin Map**
```javascript
const kotlinStdlib = window['kotlin-kotlin-stdlib'];
const pageDataMap = kotlinStdlib.kotlin.collections.KtMap.fromJsMap(
  new Map(Object.entries(pageData))
);
```

**尺寸转换（Pair<Int, Int>）**
```javascript
// Kotlin Pair 在 JS 中用数组表示
const kotlinSize = [width, height];
```

### 5. 使用示例

```javascript
import { KuiklyWebRenderViewDelegator } from './KuiklyWebRenderViewDelegator';

const delegator = new KuiklyWebRenderViewDelegator();
delegator.init(
  'container-id',           // 容器 DOM ID
  'page-name',              // 页面名称
  { key: 'value' },         // 页面数据（自动转为 Kotlin Map）
  { width: 375, height: 667 }  // 尺寸
);

// 生命周期管理
delegator.resume();  // 页面可见
delegator.pause();   // 页面不可见
delegator.detach();  // 页面卸载

// 发送事件
delegator.sendEvent('custom_event', { data: 'value' });
```

## 🔄 开发工作流

### 修改 Kotlin 核心代码后

```bash
npm run rebuild-kotlin
```

**手动方式：**
1. 重新编译 h5 模块：`./gradlew :core-render-web:h5:clean :core-render-web:h5:jsBrowserProductionWebpack`
2. 复制产物：`cd h5App-js && ./scripts/copy-kotlin-libs.sh`
3. 刷新浏览器

**脚本功能：**
- ✅ 自动编译 h5 模块（已包含 base 模块代码）
- ✅ 自动复制 JS 文件和 TypeScript 声明文件（`.d.ts`）
- ✅ 提供编译进度提示
- ✅ 错误时自动停止

### 修改页面代码后

```bash
# 只编译修改的页面（快速）
npm run build-bundles HelloWorldPage

# 或编译所有页面
npm run build-bundles:all
```

**手动方式：**
1. 编译页面：`./gradlew clean && ./gradlew :demo:packEntryJSBundleDebug -PpageNameList=HelloWorldPage`
2. 复制 bundle：`cp ../demo/build/dist/js/developmentExecutable/*.bundle.js src/bundles/`
3. 刷新浏览器

**脚本功能：**
- ✅ 自动清理旧产物
- ✅ 编译指定页面或全部页面
- ✅ 自动复制 bundle 文件和资源
- ✅ 显示详细的编译信息

### 修改 JavaScript 代码后
开发服务器自动热重载，无需操作

## ⚠️ 注意事项

1. **自动依赖检查**：多页面bundles会自动检查和管理依赖关系
2. **依赖配置**：特殊依赖需在 `src/resources/bundle-config.js` 中配置
3. **类型转换**：JS 对象需转换为 Kotlin 类型（Map、Pair）
4. **全局变量**：Kotlin 类会挂载到 `window` 对象
5. **@JsExport**：已为关键类添加 `@JsExport` 和 `@JsName` 注解
6. **TypeScript 支持**：编译产物包含 `.d.ts` 类型定义文件，支持 IDE 自动补全

## 🔧 npm 脚本详解

### 开发相关
- `npm run dev` - 启动开发服务器（支持热重载）
- `npm run build` - 构建生产版本
- `npm run build:dev` - 构建开发版本

### Kotlin 编译相关
库来源是 core-render-web，编译前需要将 KuiklyUI/core-render-web/h5/build.gradle.kts 中对 base 的依赖方式从 complieOnly 改成 implementation

- `npm run rebuild-kotlin` - 编译并复制 Kotlin/JS 核心库（生产版本）
- `npm run rebuild-kotlin:dev` - 编译并复制 Kotlin/JS 核心库（开发版本，含调试信息）
- `npm run copy-libs` - 仅复制已编译的核心库（生产版本，不执行编译）
- `npm run copy-libs:dev` - 仅复制已编译的核心库（开发版本，不执行编译）

### 页面 Bundle 相关
- `npm run build-bundles <页面名>` - 编译指定页面（如：`npm run build-bundles HelloWorldPage,000`）
- `npm run build-bundles:all` - 编译所有页面

> 💡 **提示**：所有 npm 脚本内部都调用了 `scripts/` 目录下的 Shell 脚本，如需了解详细执行逻辑，可以查看对应的 `.sh` 文件。

## 🔧 故障排查

### 编译失败
**原因：** Kotlin 代码存在语法错误或依赖问题

**解决：**
1. 检查控制台输出的错误信息
2. 修复 Kotlin 代码错误
3. 重新运行 npm 命令

### 找不到 Bundle 文件
**原因：** 编译时未指定正确的页面名称

**解决：**
1. 检查 `demo/src/commonMain/assets/` 目录下的页面名称
2. 确保页面名称拼写正确
3. 使用正确的页面名称重新编译

### Module not loaded 错误
**原因：** Kotlin/JS 模块加载顺序不正确或未加载完成

**解决：**
1. 确认 HTML 中脚本加载顺序正确（base → h5 → bundles）
2. 清空浏览器缓存后重试
3. 检查控制台是否有 404 错误

## 💡 性能优化建议

- ✅ **编译指定页面**：使用 `npm run build-bundles HelloWorldPage,000` 只编译修改的页面，而不是编译所有页面
- ✅ **并行开发**：核心库和页面可以分别编译，互不影响
- ✅ **利用热重载**：修改 JavaScript 代码时会自动重载，无需手动刷新

## 📚 自定义扩展

### 自定义组件
- `KRMyView.js`：自定义视图示例
- `KRWebView.js`：WebView 组件
- `KuiklyPageView.js`：页面容器
- `KuiklyRenderView.js`：业务封装类，注册模块

### 自定义模块
- `KRBridgeModule.js`：桥接通信
- `KRCacheModule.js`：缓存管理

## 🐛 调试

浏览器控制台日志前缀：
- `[Delegate]`：委托回调
- `[Module]`：模块注册
- `[View]`：视图注册
- `[KuiklyWebRenderViewDelegator]`：委托器

## 📚 技术细节

### 导出的关键类（通过 @JsExport）

| 类名 | 模块 | 用途 |
|------|------|------|
| `KuiklyRenderViewDelegator` | h5 | 主入口类，管理渲染生命周期 |
| `KuiklyRenderViewDelegatorDelegate` | base | 委托接口定义 |
| `KuiklyRenderCoreExecuteMode` | base | 执行模式枚举（WEB/JS） |
| `ErrorReason` | base | 错误原因枚举 |
| `KRMonitorType` | base | 性能监控类型枚举 |

### Webpack 自动复制配置

`webpack.config.js` 已配置自动复制 Kotlin 库：
```javascript
new CopyWebpackPlugin({
  patterns: [
    { from: 'src/libs', to: 'libs' }
  ]
})
```

### 一键更新脚本

修改 Kotlin 代码后运行：
```bash
cd h5App-js
./scripts/rebuild-kotlin-and-copy.sh
```

此脚本包含以下步骤：
1. 编译 `core-render-web:h5` 模块（已包含 base 模块代码）
2. 复制所有编译产物（包括 `.d.ts` 类型定义文件）
