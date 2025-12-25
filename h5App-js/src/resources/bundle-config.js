/**
 * Bundle 依赖配置文件
 * 定义了公共依赖的加载顺序和页面bundle的依赖关系
 */
window.BundleConfig = {
  /**
   * 公共依赖的加载顺序
   * 按照依赖关系从底层到上层排序
   */
  commonDependencies: [
    // === Webpack 运行时 ===
    'runtime.bundle.js',
    
    // === Kotlin 标准库核心（必须最先加载）===
    // 'kotlin-stdlib.kotlin_k.bundle.js',
    'kotlin-stdlib.kotlin_kotlin-kotlin-stdlib_k.bundle.js',
    
    // === Kotlin 标准库基础模块（按依赖关系排序）===
    'kotlin-stdlib.kotlin_kotlin-kotlin-stdlib_kotlin_C.bundle.js',
    'kotlin-stdlib.kotlin_kotlin-kotlin-stdlib_kotlin_e.bundle.js',
    'kotlin-stdlib.kotlin_kotlin-kotlin-stdlib_kotlin_l.bundle.js',
    'kotlin-stdlib.kotlin_kotlin-kotlin-stdlib_kotlin_i.bundle.js',
    'kotlin-stdlib.kotlin_kotlin-kotlin-stdlib_kotlin_text_A.bundle.js',
    'kotlin-stdlib.kotlin_kotlin-kotlin-stdlib_kotlin_collections_M.bundle.js',
    'kotlin-stdlib.kotlin_kotlin-kotlin-stdlib_kotlin_ch.bundle.js',
    'kotlin-stdlib.kotlin_kotlin-kotlin-stdlib_kotlin_co.bundle.js',
    'kotlin-stdlib.kotlin_kotlin-kotlin-stdlib_kotlin_p.bundle.js',
    
    // === KuiklyCore 基础模块（按依赖关系排序）===
    'kotlin-stdlib.kotlin_kuiklycore-core_com_tencent_kuikly_core_module_B.bundle.js',
    'kotlin-stdlib.kotlin_kuiklycore-core_com_tencent_kuikly_core_b.bundle.js',
    'kotlin-stdlib.kotlin_kuiklycore-core_com_tencent_kuikly_core_e.bundle.js',
    'kotlin-stdlib.kotlin_kuiklycore-core_com_tencent_kuikly_core_t.bundle.js',
    'kotlin-stdlib.kotlin_kuiklycore-core_com_tencent_kuikly_core_reactive_O.bundle.js',
    'kotlin-stdlib.kotlin_kuiklycore-core_com_tencent_kuikly_core_l.bundle.js',
    'kotlin-stdlib.kotlin_kuiklycore-core_com_tencent_kuikly_core_n.bundle.js',
    'kotlin-stdlib.kotlin_kuiklycore-core_com_tencent_kuikly_core_S.bundle.js',
    
    // === KuiklyCore 视图模块（最后加载）===
    // 'kotlin-stdlib.kotlin_kuiklycore-core_com_tencent_kuikly_core_views_I.bundle.js',
    // 'kotlin-stdlib.kotlin_kuiklycore-core_com_tencent_kuikly_core_views_W.bundle.js',
    'kotlin-stdlib.kotlin_kuiklycore-core_com_tencent_kuikly_core_views_R.bundle.js',

    'kotlin-stdlib.kotlin_nativevue2_c.bundle.js'
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