/**
 * Bundle 依赖配置文件
 * 
 * 使用动态发现模式：自动扫描 bundles 目录下的文件
 * manifest.json 由 generate-manifest.js 脚本自动生成
 */
window.BundleConfig = {
  /**
   * 动态发现时的加载顺序规则（正则表达式）
   * 按照数组顺序匹配并排序，未匹配的文件放在最后
   */
  dynamicLoadingOrder: [
    // 1. Webpack 运行时（必须最先）
    /^runtime\.bundle\.js$/,
    
    // 2. Kotlin 核心（必须在标准库前）
    /^kotlin-stdlib\.kotlin_k\.bundle\.js$/,
    /^kotlin-stdlib\.kotlin_kotlin-kotlin-stdlib_k\.bundle\.js$/,
    
    // 3. Kotlin 标准库基础
    /^kotlin-stdlib\.kotlin_kotlin-kotlin-stdlib_kotlin_[A-Za-z]\.bundle\.js$/,
    
    // 4. Kotlin 标准库扩展（collections, text 等）
    /^kotlin-stdlib\.kotlin_kotlin-kotlin-stdlib_kotlin_(collections|text|ranges)_/,
    
    // 5. Kotlin 标准库其他模块
    /^kotlin-stdlib\.kotlin_kotlin-kotlin-stdlib_kotlin_[a-z]{2,}\.bundle\.js$/,
    
    // 6. KuiklyCore 基础模块
    /^kotlin-stdlib\.kotlin_KuiklyCore-core_com_tencent_kuikly_core_[a-z]\.bundle\.js$/,
    
    // 7. KuiklyCore reactive 模块
    /^kotlin-stdlib\.kotlin_KuiklyCore-core_com_tencent_kuikly_core_reactive/,
    
    // 8. KuiklyCore layout 模块
    /^kotlin-stdlib\.kotlin_KuiklyCore-core_com_tencent_kuikly_core_layout/,
    
    // 9. KuiklyCore 其他核心模块
    /^kotlin-stdlib\.kotlin_KuiklyCore-core_com_tencent_kuikly_core_[A-Z]\.bundle\.js$/,
    
    // 10. KuiklyCore views 模块（最后）
    /^kotlin-stdlib\.kotlin_KuiklyCore-core_com_tencent_kuikly_core_views/
  ],
  
  /**
   * 页面bundle的特殊依赖配置
   * 如果某个页面需要额外的依赖，可以在这里配置
   */
  pageDependencies: {
    // 示例：如果某个页面需要特殊的依赖
    // 'SpecialPage': ['special-lib.bundle.js']
  },
  
  /**
   * 预加载配置
   * 可以配置哪些bundle需要预加载
   */
  preloadBundles: [
    // 可以在这里配置需要预加载的bundle
  ],
  
  /**
   * 加载超时配置（毫秒）
   */
  loadTimeout: 10000,
  
  /**
   * 是否启用并行加载优化
   * 现在顺序正确了，可以启用并行加载提升性能
   */
  enableParallelLoading: true
};