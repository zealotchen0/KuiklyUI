type Nullable<T> = T | null | undefined
export declare namespace kotlin.collections {
    interface KtList<E> /* extends kotlin.collections.Collection<E> */ {
        asJsReadonlyArrayView(): ReadonlyArray<E>;
        readonly __doNotUseOrImplementIt: {
            readonly "kotlin.collections.KtList": unique symbol;
        };
    }
    const KtList: {
        fromJsArray<E>(array: ReadonlyArray<E>): kotlin.collections.KtList<E>;
    };
    interface KtMap<K, V> {
        asJsReadonlyMapView(): ReadonlyMap<K, V>;
        readonly __doNotUseOrImplementIt: {
            readonly "kotlin.collections.KtMap": unique symbol;
        };
    }
    const KtMap: {
        fromJsMap<K, V>(map: ReadonlyMap<K, V>): kotlin.collections.KtMap<K, V>;
    };
    interface KtMutableMap<K, V> extends kotlin.collections.KtMap<K, V> {
        asJsMapView(): Map<K, V>;
        readonly __doNotUseOrImplementIt: {
            readonly "kotlin.collections.KtMutableMap": unique symbol;
        } & kotlin.collections.KtMap<K, V>["__doNotUseOrImplementIt"];
    }
    const KtMutableMap: {
        fromJsMap<K, V>(map: ReadonlyMap<K, V>): kotlin.collections.KtMutableMap<K, V>;
    };
}
export declare namespace com.tencent.kuikly.core.render.web {
    interface IKuiklyRenderView {
        readonly view: Element;
        readonly kuiklyRenderExport: com.tencent.kuikly.core.render.web.IKuiklyRenderExport;
        readonly kuiklyRenderContext: com.tencent.kuikly.core.render.web.IKuiklyRenderContext;
        init(rootContainer: any, pageName: string, params: kotlin.collections.KtMap<string, any>, size: any/* kotlin.Pair<number, number> */): void;
        didCreateRenderView(): void;
        sendEvent(event: string, data: kotlin.collections.KtMap<string, any>): void;
        module<T extends unknown/* com.tencent.kuikly.core.render.web.export.KuiklyRenderBaseModule */>(name: string): Nullable<T>;
        resume(): void;
        pause(): void;
        destroy(): void;
        syncFlushAllRenderTasks(): void;
        getView(tag: number): Nullable<Element>;
        readonly __doNotUseOrImplementIt: {
            readonly "com.tencent.kuikly.core.render.web.IKuiklyRenderView": unique symbol;
        };
    }
    interface IKuiklyRenderContext {
        readonly kuiklyRenderRootView: Nullable<com.tencent.kuikly.core.render.web.IKuiklyRenderView>;
        getViewData<T>(ele: Element, key: string): Nullable<T>;
        putViewData(ele: Element, key: string, data: any): void;
        removeViewData<T>(ele: Element, key: string): Nullable<T>;
        module<T extends unknown/* com.tencent.kuikly.core.render.web.export.KuiklyRenderBaseModule */>(name: string): Nullable<T>;
        getView(tag: number): Nullable<Element>;
        readonly __doNotUseOrImplementIt: {
            readonly "com.tencent.kuikly.core.render.web.IKuiklyRenderContext": unique symbol;
        };
    }
    interface IKuiklyRenderExport extends com.tencent.kuikly.core.render.web.export.IKuiklyRenderViewPropExternalHandler {
        moduleExport(name: string, creator: () => any/* com.tencent.kuikly.core.render.web.export.IKuiklyRenderModuleExport */): void;
        renderViewExport(viewName: string, renderViewExportCreator: () => any/* com.tencent.kuikly.core.render.web.export.IKuiklyRenderViewExport */, shadowExportCreator?: Nullable<() => any/* com.tencent.kuikly.core.render.web.export.IKuiklyRenderShadowExport */>): void;
        createModule(name: string): any/* com.tencent.kuikly.core.render.web.export.IKuiklyRenderModuleExport */;
        createRenderView(name: string): any/* com.tencent.kuikly.core.render.web.export.IKuiklyRenderViewExport */;
        createRenderShadow(name: string): any/* com.tencent.kuikly.core.render.web.export.IKuiklyRenderShadowExport */;
        viewPropExternalHandlerExport(handler: com.tencent.kuikly.core.render.web.export.IKuiklyRenderViewPropExternalHandler): void;
        readonly __doNotUseOrImplementIt: {
            readonly "com.tencent.kuikly.core.render.web.IKuiklyRenderExport": unique symbol;
        } & com.tencent.kuikly.core.render.web.export.IKuiklyRenderViewPropExternalHandler["__doNotUseOrImplementIt"];
    }
    interface IKuiklyRenderViewLifecycleCallback {
        onInit(): void;
        onPreloadDexClassFinish(): void;
        onInitCoreStart(): void;
        onInitCoreFinish(): void;
        onInitContextStart(): void;
        onInitContextFinish(): void;
        onCreateInstanceStart(): void;
        onCreateInstanceFinish(): void;
        onFirstFramePaint(): void;
        onResume(): void;
        onPause(): void;
        onDestroy(): void;
        onRenderException(throwable: Error, errorReason: com.tencent.kuikly.core.render.web.exception.ErrorReason): void;
        readonly __doNotUseOrImplementIt: {
            readonly "com.tencent.kuikly.core.render.web.IKuiklyRenderViewLifecycleCallback": unique symbol;
        };
    }
}
export declare namespace com.tencent.kuikly.core.render.web.context {
    abstract class KuiklyRenderCoreExecuteMode {
        private constructor();
        static get JVM(): com.tencent.kuikly.core.render.web.context.KuiklyRenderCoreExecuteMode & {
            get name(): "JVM";
            get ordinal(): 0;
        };
        static get JS(): com.tencent.kuikly.core.render.web.context.KuiklyRenderCoreExecuteMode & {
            get name(): "JS";
            get ordinal(): 1;
        };
        static get DEX(): com.tencent.kuikly.core.render.web.context.KuiklyRenderCoreExecuteMode & {
            get name(): "DEX";
            get ordinal(): 2;
        };
        static get SO(): com.tencent.kuikly.core.render.web.context.KuiklyRenderCoreExecuteMode & {
            get name(): "SO";
            get ordinal(): 3;
        };
        get name(): "JVM" | "JS" | "DEX" | "SO";
        get ordinal(): 0 | 1 | 2 | 3;
        get mode(): number;
        static values(): Array<com.tencent.kuikly.core.render.web.context.KuiklyRenderCoreExecuteMode>;
        static valueOf(value: string): com.tencent.kuikly.core.render.web.context.KuiklyRenderCoreExecuteMode;
    }
}
export declare namespace com.tencent.kuikly.core.render.web.exception {
    abstract class ErrorReason {
        private constructor();
        static get UNKNOWN(): com.tencent.kuikly.core.render.web.exception.ErrorReason & {
            get name(): "UNKNOWN";
            get ordinal(): 0;
        };
        static get INITIALIZE(): com.tencent.kuikly.core.render.web.exception.ErrorReason & {
            get name(): "INITIALIZE";
            get ordinal(): 1;
        };
        static get CALL_KOTLIN(): com.tencent.kuikly.core.render.web.exception.ErrorReason & {
            get name(): "CALL_KOTLIN";
            get ordinal(): 2;
        };
        static get CALL_NATIVE(): com.tencent.kuikly.core.render.web.exception.ErrorReason & {
            get name(): "CALL_NATIVE";
            get ordinal(): 3;
        };
        static get UPDATE_VIEW_TREE(): com.tencent.kuikly.core.render.web.exception.ErrorReason & {
            get name(): "UPDATE_VIEW_TREE";
            get ordinal(): 4;
        };
        get name(): "UNKNOWN" | "INITIALIZE" | "CALL_KOTLIN" | "CALL_NATIVE" | "UPDATE_VIEW_TREE";
        get ordinal(): 0 | 1 | 2 | 3 | 4;
        static values(): Array<com.tencent.kuikly.core.render.web.exception.ErrorReason>;
        static valueOf(value: string): com.tencent.kuikly.core.render.web.exception.ErrorReason;
    }
    class KuiklyRenderModuleExportException /* extends kotlin.Exception */ {
        constructor(message: string);
    }
    class KuiklyRenderViewExportException /* extends kotlin.Exception */ {
        constructor(message: string);
    }
    class KuiklyRenderShadowExportException /* extends kotlin.Exception */ {
        constructor(message: string);
    }
}
export declare namespace com.tencent.kuikly.core.render.web.expand {
    interface KuiklyRenderViewDelegatorDelegate {
        registerExternalRenderView(kuiklyRenderExport: com.tencent.kuikly.core.render.web.IKuiklyRenderExport): void;
        registerExternalModule(kuiklyRenderExport: com.tencent.kuikly.core.render.web.IKuiklyRenderExport): void;
        registerViewExternalPropHandler(kuiklyRenderExport: com.tencent.kuikly.core.render.web.IKuiklyRenderExport): void;
        coreExecuteMode(): com.tencent.kuikly.core.render.web.context.KuiklyRenderCoreExecuteMode;
        performanceMonitorTypes(): kotlin.collections.KtList<com.tencent.kuikly.core.render.web.performance.KRMonitorType>;
        onKuiklyRenderViewCreated(): void;
        onKuiklyRenderContentViewCreated(): void;
        syncRenderingWhenPageAppear(): boolean;
        onGetLaunchData(data: any/* com.tencent.kuikly.core.render.web.performance.launch.KRLaunchData */): void;
        onGetPerformanceData(data: any/* com.tencent.kuikly.core.render.web.performance.KRPerformanceData */): void;
        onUnhandledException(throwable: Error, errorReason: com.tencent.kuikly.core.render.web.exception.ErrorReason, executeMode: com.tencent.kuikly.core.render.web.context.KuiklyRenderCoreExecuteMode): void;
        onPageLoadComplete(isSucceed: boolean, errorReason: Nullable<com.tencent.kuikly.core.render.web.exception.ErrorReason> | undefined, executeMode: com.tencent.kuikly.core.render.web.context.KuiklyRenderCoreExecuteMode): void;
        readonly __doNotUseOrImplementIt: {
            readonly "com.tencent.kuikly.core.render.web.expand.KuiklyRenderViewDelegatorDelegate": unique symbol;
        };
    }
}
export declare namespace com.tencent.kuikly.core.render.web.export {
    interface IKuiklyRenderViewPropExternalHandler {
        setViewExternalProp(renderViewExport: any/* com.tencent.kuikly.core.render.web.export.IKuiklyRenderViewExport */, propKey: string, propValue: any): boolean;
        resetViewExternalProp(renderViewExport: any/* com.tencent.kuikly.core.render.web.export.IKuiklyRenderViewExport */, propKey: string): boolean;
        readonly __doNotUseOrImplementIt: {
            readonly "com.tencent.kuikly.core.render.web.export.IKuiklyRenderViewPropExternalHandler": unique symbol;
        };
    }
}
export declare namespace com.tencent.kuikly.core.render.web.performance {
    abstract class KRMonitorType {
        private constructor();
        static get LAUNCH(): com.tencent.kuikly.core.render.web.performance.KRMonitorType & {
            get name(): "LAUNCH";
            get ordinal(): 0;
        };
        static get FRAME(): com.tencent.kuikly.core.render.web.performance.KRMonitorType & {
            get name(): "FRAME";
            get ordinal(): 1;
        };
        static get MEMORY(): com.tencent.kuikly.core.render.web.performance.KRMonitorType & {
            get name(): "MEMORY";
            get ordinal(): 2;
        };
        get name(): "LAUNCH" | "FRAME" | "MEMORY";
        get ordinal(): 0 | 1 | 2;
        static values(): Array<com.tencent.kuikly.core.render.web.performance.KRMonitorType>;
        static valueOf(value: string): com.tencent.kuikly.core.render.web.performance.KRMonitorType;
    }
    class KRPerformanceManager implements com.tencent.kuikly.core.render.web.IKuiklyRenderViewLifecycleCallback {
        constructor(pageName: string, executeMode: com.tencent.kuikly.core.render.web.context.KuiklyRenderCoreExecuteMode, monitorTypes: kotlin.collections.KtList<com.tencent.kuikly.core.render.web.performance.KRMonitorType>);
        getMonitor<T extends com.tencent.kuikly.core.render.web.IKuiklyRenderViewLifecycleCallback/* com.tencent.kuikly.core.render.web.performance.KRMonitor<UnknownType *> */>(name: string): Nullable<T>;
        setMonitorCallback(dataCallback: com.tencent.kuikly.core.render.web.performance.IKRMonitorCallback): void;
        onInit(): void;
        onPreloadDexClassFinish(): void;
        onInitCoreStart(): void;
        onInitCoreFinish(): void;
        onInitContextStart(): void;
        onInitContextFinish(): void;
        onCreateInstanceStart(): void;
        onCreateInstanceFinish(): void;
        onResume(): void;
        onFirstFramePaint(): void;
        onPause(): void;
        onDestroy(): void;
        onRenderException(throwable: Error, errorReason: com.tencent.kuikly.core.render.web.exception.ErrorReason): void;
        getPerformanceData(): any/* com.tencent.kuikly.core.render.web.performance.KRPerformanceData */;
        readonly __doNotUseOrImplementIt: com.tencent.kuikly.core.render.web.IKuiklyRenderViewLifecycleCallback["__doNotUseOrImplementIt"];
        static get Companion(): {
        };
    }
    interface IKRMonitorCallback {
        onLaunchResult(data: any/* com.tencent.kuikly.core.render.web.performance.launch.KRLaunchData */): void;
        onResult(data: any/* com.tencent.kuikly.core.render.web.performance.KRPerformanceData */): void;
        readonly __doNotUseOrImplementIt: {
            readonly "com.tencent.kuikly.core.render.web.performance.IKRMonitorCallback": unique symbol;
        };
    }
}
export declare namespace com.tencent.kuikly.core.render.web.runtime.web.expand {
    interface IKuiklyView {
        onAttach(container: any, pageName: string, pageData: kotlin.collections.KtMap<string, any>, size: any/* kotlin.Pair<number, number> */): void;
        onPause(): void;
        onResume(): void;
        onDetach(): void;
        sendEvent(event: string, data: kotlin.collections.KtMap<string, any>): void;
        addKuiklyRenderViewLifeCycleCallback(callback: com.tencent.kuikly.core.render.web.IKuiklyRenderViewLifecycleCallback): void;
        removeKuiklyRenderViewLifeCycleCallback(callback: com.tencent.kuikly.core.render.web.IKuiklyRenderViewLifecycleCallback): void;
        readonly __doNotUseOrImplementIt: {
            readonly "com.tencent.kuikly.core.render.web.runtime.web.expand.IKuiklyView": unique symbol;
        };
    }
}
export declare namespace com.tencent.kuikly.core.render.web.runtime.web.expand {
    function SizeI(width: number, height: number): any/* kotlin.Pair<number, number> */;
    function emptyList(): kotlin.collections.KtList<any>;
    function jsObjectToMap(jsObject: any, keys: Array<string>): kotlin.collections.KtMutableMap<string, any>;
}
export declare namespace com.tencent.kuikly.core.render.web.runtime.web.expand {
    class KuiklyRenderViewDelegator {
        constructor(delegate: com.tencent.kuikly.core.render.web.expand.KuiklyRenderViewDelegatorDelegate);
        onAttach(container: any, pageName: string, pageData: kotlin.collections.KtMap<string, any>, size: any/* kotlin.Pair<number, number> */): void;
        onDetach(): void;
        onPause(): void;
        onResume(): void;
        sendEvent(event: string, data: kotlin.collections.KtMap<string, any>): void;
        addKuiklyRenderViewLifeCycleCallback(callback: com.tencent.kuikly.core.render.web.IKuiklyRenderViewLifecycleCallback): void;
        removeKuiklyRenderViewLifeCycleCallback(callback: com.tencent.kuikly.core.render.web.IKuiklyRenderViewLifecycleCallback): void;
        getKuiklyRenderContext(): Nullable<com.tencent.kuikly.core.render.web.IKuiklyRenderContext>;
        static get Companion(): {
        };
    }
    function pendingTaskList$factory(): any/* kotlin.reflect.KProperty1<com.tencent.kuikly.core.render.web.runtime.web.expand.KuiklyRenderViewDelegator, kotlin.collections.KtMutableList<(p0: com.tencent.kuikly.core.render.web.KuiklyRenderView) => void>> */;
}
export declare namespace com.tencent.kuikly.core.render.web.runtime.web.expand {
    class KuiklyView implements com.tencent.kuikly.core.render.web.runtime.web.expand.IKuiklyView, com.tencent.kuikly.core.render.web.expand.KuiklyRenderViewDelegatorDelegate {
        constructor(delegate?: Nullable<com.tencent.kuikly.core.render.web.expand.KuiklyRenderViewDelegatorDelegate>);
        onAttach(container: any, pageName: string, pageData: kotlin.collections.KtMap<string, any>, size: any/* kotlin.Pair<number, number> */): void;
        onPause(): void;
        onResume(): void;
        onDetach(): void;
        sendEvent(event: string, data: kotlin.collections.KtMap<string, any>): void;
        addKuiklyRenderViewLifeCycleCallback(callback: com.tencent.kuikly.core.render.web.IKuiklyRenderViewLifecycleCallback): void;
        removeKuiklyRenderViewLifeCycleCallback(callback: com.tencent.kuikly.core.render.web.IKuiklyRenderViewLifecycleCallback): void;
        registerExternalRenderView(kuiklyRenderExport: com.tencent.kuikly.core.render.web.IKuiklyRenderExport): void;
        registerExternalModule(kuiklyRenderExport: com.tencent.kuikly.core.render.web.IKuiklyRenderExport): void;
        registerViewExternalPropHandler(kuiklyRenderExport: com.tencent.kuikly.core.render.web.IKuiklyRenderExport): void;
        onKuiklyRenderViewCreated(): void;
        onKuiklyRenderContentViewCreated(): void;
        onPageLoadComplete(isSucceed: boolean, errorReason: Nullable<com.tencent.kuikly.core.render.web.exception.ErrorReason> | undefined, executeMode: com.tencent.kuikly.core.render.web.context.KuiklyRenderCoreExecuteMode): void;
        onGetLaunchData(data: any/* com.tencent.kuikly.core.render.web.performance.launch.KRLaunchData */): void;
        onGetPerformanceData(data: any/* com.tencent.kuikly.core.render.web.performance.KRPerformanceData */): void;
        coreExecuteMode(): com.tencent.kuikly.core.render.web.context.KuiklyRenderCoreExecuteMode;
        performanceMonitorTypes(): kotlin.collections.KtList<com.tencent.kuikly.core.render.web.performance.KRMonitorType>;
        syncRenderingWhenPageAppear(): boolean;
        onUnhandledException(throwable: Error, errorReason: com.tencent.kuikly.core.render.web.exception.ErrorReason, executeMode: com.tencent.kuikly.core.render.web.context.KuiklyRenderCoreExecuteMode): void;
        readonly __doNotUseOrImplementIt: com.tencent.kuikly.core.render.web.runtime.web.expand.IKuiklyView["__doNotUseOrImplementIt"] & com.tencent.kuikly.core.render.web.expand.KuiklyRenderViewDelegatorDelegate["__doNotUseOrImplementIt"];
    }
}
export as namespace com_tencent_kuikly_open_core_render_web_h5;