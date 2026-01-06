/**
 * miniApp-js 入口文件
 * 
 * 简化版：只需加载一个统一的 kuiklyRender.js
 */

// ========== 第一步：加载 Kuikly 渲染库（包含 Kotlin 层和 JS 层）==========
var kuiklyRender = require('./lib/kuiklyRender.js');

// 保存到 global 供页面使用
global.render = kuiklyRender;

console.log('[app.js] kuiklyRender loaded');
console.log('[app.js] render.initApp:', typeof kuiklyRender.initApp);
console.log('[app.js] render.renderView:', typeof kuiklyRender.renderView);

// ========== 第二步：加载业务代码分包 ==========
require('./business/runtime.bundle.js');
require('./business/kotlin-stdlib.bundle.js');
require('./business/000.bundle.js');
require('./business/HelloWorldPage.bundle.js');

console.log('[app.js] Business bundles loaded');

// 资源加载函数
global.getAssetJson = function(path) {
  var json = require('./assets/' + path.replace('.json','.js'));
  return json;
};

// 初始化应用
kuiklyRender.initApp();
