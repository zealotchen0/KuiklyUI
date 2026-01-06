#!/usr/bin/env node

/**
 * Bundle Manifest Generator
 * 
 * 自动扫描 bundles 目录并生成 manifest.json 文件
 * 用于动态加载模式下的 bundle 文件发现
 * 
 * 使用方法:
 * node scripts/generate-manifest.js
 */

const fs = require('fs');
const path = require('path');

// 配置
const BUNDLES_DIR = path.join(__dirname, '../src/bundles');
const MANIFEST_PATH = path.join(BUNDLES_DIR, 'manifest.json');

/**
 * 扫描 bundles 目录下的所有 .bundle.js 文件
 * 只包含公共依赖，排除页面特定的 bundle
 */
function scanBundleFiles() {
  console.log('[Manifest Generator] 扫描目录:', BUNDLES_DIR);
  
  if (!fs.existsSync(BUNDLES_DIR)) {
    console.error('[Manifest Generator] ❌ bundles 目录不存在:', BUNDLES_DIR);
    return [];
  }
  
  const files = fs.readdirSync(BUNDLES_DIR)
    .filter(file => {
      const isFile = fs.statSync(path.join(BUNDLES_DIR, file)).isFile();
      const isBundleJs = file.endsWith('.bundle.js');
      
      // 排除页面特定的 bundle（不以 kotlin-stdlib 或 runtime 开头）
      // 页面 bundle 一般是数字或页面名称，如: 000.bundle.js, HelloWorldPage.bundle.js
      const isCommonBundle = file.startsWith('kotlin-stdlib.') || 
                            file.startsWith('runtime.') ||
                            file.startsWith('common.') ||
                            file.startsWith('vendors.');
      
      return isFile && isBundleJs && isCommonBundle;
    })
    .sort(); // 字母排序
  
  console.log(`[Manifest Generator] 发现 ${files.length} 个公共 bundle 文件`);
  return files;
}

/**
 * 生成 manifest.json 文件
 */
function generateManifest() {
  try {
    const files = scanBundleFiles();
    
    if (files.length === 0) {
      console.warn('[Manifest Generator] ⚠️  没有找到任何 bundle 文件');
      return;
    }
    
    const manifest = {
      version: '1.0.0',
      generatedAt: new Date().toISOString(),
      files: files,
      fileCount: files.length
    };
    
    // 写入文件
    fs.writeFileSync(
      MANIFEST_PATH,
      JSON.stringify(manifest, null, 2),
      'utf8'
    );
    
    console.log('[Manifest Generator] ✅ Manifest 生成成功!');
    console.log('[Manifest Generator] 📁 文件路径:', MANIFEST_PATH);
    console.log('[Manifest Generator] 📊 文件数量:', files.length);
    console.log('[Manifest Generator] 📝 文件列表:');
    files.forEach(file => console.log(`  - ${file}`));
    
  } catch (error) {
    console.error('[Manifest Generator] ❌ 生成失败:', error.message);
    process.exit(1);
  }
}

// 执行生成
generateManifest();
