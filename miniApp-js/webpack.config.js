const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    // 入口文件：先加载 Kotlin 库，再加载业务代码
    // 打包为单个 kuiklyRender.js 文件
    entry: './src/entry.js',
    output: {
      path: path.resolve(__dirname, 'dist/lib'),
      filename: 'kuiklyRender.js',
      clean: false,
      // 使用 CommonJS 导出，小程序支持 require
      library: {
        type: 'commonjs2',
      },
      // 确保兼容性
      environment: {
        arrowFunction: false,
      },
    },
    target: 'node',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          // Copy assets from demo
          {
            from: path.resolve(__dirname, '../demo/src/commonMain/assets'),
            to: path.resolve(__dirname, 'dist/assets'),
            noErrorOnMissing: true,
          },
          // Copy page bundles with transformation for miniprogram compatibility
          {
            from: path.resolve(__dirname, 'src/bundles'),
            to: path.resolve(__dirname, 'dist/business'),
            noErrorOnMissing: true,
            transform: {
              transformer(content, absoluteFrom) {
                // 处理所有 bundle.js 文件，将 window 替换为兼容小程序的写法
                if (absoluteFrom.endsWith('.bundle.js')) {
                  let contentStr = content.toString();
                  
                  // 1. 替换 var w = window; 为兼容写法
                  contentStr = contentStr.replace(
                    /var\s+w\s*=\s*window\s*;/g,
                    'var w = (typeof window !== "undefined" ? window : (typeof global !== "undefined" ? global : this));'
                  );
                  
                  // 2. 替换 var _com = window.com; 模式
                  contentStr = contentStr.replace(
                    /var\s+_com\s*=\s*window\.com\s*;/g,
                    'var _global = typeof global !== "undefined" ? global : (typeof window !== "undefined" ? window : this); var _com = _global.com;'
                  );
                  
                  // 3. 替换 Object.defineProperty(window, 'com', ...) 模式
                  contentStr = contentStr.replace(
                    /Object\.defineProperty\(window,\s*'com'/g,
                    'Object.defineProperty(_global, \'com\''
                  );
                  
                  // 4. 替换直接访问 window.com 的情况
                  contentStr = contentStr.replace(
                    /(\W)window\.com([.\[])/g,
                    '$1(typeof window !== "undefined" ? window : global).com$2'
                  );
                  
                  return Buffer.from(contentStr);
                }
                return content;
              },
            },
          },
        ],
      }),
    ],
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@modules': path.resolve(__dirname, 'src/modules'),
      }
    },
    devtool: isDevelopment ? 'source-map' : false,
    optimization: {
      minimize: !isDevelopment,
    },
  };
};
