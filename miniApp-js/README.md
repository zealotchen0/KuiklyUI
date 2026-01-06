# Kuikly MiniApp JS

Kuikly 小程序纯 JavaScript 实现版本。

## 项目结构

```
miniApp-js/
├── dist/                    # 小程序运行目录（用微信开发者工具打开此目录）
│   ├── app.js              # 小程序入口
│   ├── app.json            # 小程序配置
│   ├── app.wxss            # 全局样式
│   ├── base.wxml           # 基础模板
│   ├── lib/                # 构建输出的渲染库
│   ├── business/           # 业务代码 bundle
│   ├── assets/             # 静态资源
│   └── pages/              # 页面目录
├── src/                     # 源代码目录
│   ├── index.js            # 主入口
│   ├── KuiklyMiniAppRenderViewDelegator.js  # 渲染代理
│   ├── components/         # 自定义组件
│   ├── modules/            # 自定义模块
│   ├── runtime/            # 小程序运行时
│   │   ├── MiniApp.js      # App 生命周期管理
│   │   ├── MiniDocument.js # 页面管理
│   │   ├── NativeApi.js    # 原生 API 封装
│   │   ├── Transform.js    # 组件别名管理
│   │   └── dom/            # DOM 元素模拟
│   ├── utils/              # 工具函数
│   ├── libs/               # Kotlin/JS 库（需复制）
│   └── bundles/            # 业务 bundle（需复制）
├── scripts/                 # 构建脚本
├── package.json
└── webpack.config.js
```

## 开发指南

```bash
### 1. 安装依赖
cd miniApp-js
npm install

### 2. 复制 Kotlin/JS 库
npm run rebuild-libs

### 3. 编译业务 Bundle
npm run build-bundles HelloWorldPage,000

### 4. 构建miniApp-js
npm run build
```

### 5. 在微信开发者工具中预览

1. 打开微信开发者工具
2. 导入项目，选择 `miniApp-js/dist` 目录
3. 填写 AppID（可使用测试号）

## 与 miniApp (Kotlin) 版本的区别

| 特性 | miniApp (Kotlin) | miniApp-js |
|------|------------------|------------|
| 语言 | Kotlin/JS | JavaScript |
| 构建工具 | Gradle | Webpack |
| 类型检查 | 编译时 | 运行时 |
| 代码体积 | 较大 | 较小 |
| 开发效率 | 需要编译 | 热更新 |

## 自定义组件

在 `src/components/` 目录下创建自定义组件：

```javascript
// src/components/MyCustomView.js
import { MiniDivElement } from '../runtime/dom/MiniDivElement';

export class MyCustomView {
  static VIEW_NAME = 'MyCustomView';

  constructor() {
    this._div = new MiniDivElement();
  }

  get ele() {
    return this._div;
  }

  setProp(propKey, propValue) {
    // 处理属性设置
    return false;
  }
}
```

然后在 `KuiklyMiniAppRenderViewDelegator.js` 中注册：

```javascript
import { MyCustomView } from '@components/MyCustomView';

// 在 registerExternalRenderView 方法中
kuiklyRenderExport.renderViewExport(MyCustomView.VIEW_NAME, () => {
  return new MyCustomView();
});
```

## 自定义模块

在 `src/modules/` 目录下创建自定义模块：

```javascript
// src/modules/MyCustomModule.js
export class MyCustomModule {
  static MODULE_NAME = 'MyCustomModule';

  call(method, params, callback) {
    switch (method) {
      case 'myMethod':
        // 处理方法调用
        return;
      default:
        return null;
    }
  }
}
```

然后在 `KuiklyMiniAppRenderViewDelegator.js` 中注册：

```javascript
import { MyCustomModule } from '@modules/MyCustomModule';

// 在 registerExternalModule 方法中
kuiklyRenderExport.moduleExport(MyCustomModule.MODULE_NAME, () => {
  return new MyCustomModule();
});
```

## 许可证

MIT
