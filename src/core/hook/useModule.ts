/**
 * @author 胡小右
 * @date 2022-06-17 19:46:35
 * @desc 模块加载核心函数
 */

import all from "@/package"
import router from "@/router";
import {deepMerge, isFunction, isObject, isEmpty} from "../utils";
import {deepFiles} from "../service";
import version from "@/core/utils/version";
import {useModuleStore} from "@/store/module";
import store from "@/store";

// 模块列表
const modules: any[] = [...all.modules]

function removeEmpty(arr: any) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "" || typeof (arr[i]) == "undefined") {
            arr.splice(i, 1);
            i = i - 1;
        }
    }
    return arr;
}

async function useModule(app: any) {
    // 安装模块
    function install(mod: any) {
        const {store: _store, service, directives, components, pages, views, name} = mod;

        try {

            // // 注册Vuex模块  （已经替换Pinia Vuex在3.0中不建议使用）
            // if (_store) {
            //     for (const i in _store) {
            //         store.registerModule(`${name}-${i}`, _store[i])
            //     }
            // }

            // 注册请求服务
            if (service) {
                deepMerge(store.service, service)
            }

            // 注册组件
            if (components) {
                for (const i in components) {
                    if (components[i]) {
                        if (components[i].xiaoyou?.global || i.indexOf("h-") === 0) {
                            app.component(components[i].name, components[i]);
                        }
                    }
                }
            }

            // 注册指令
            if (directives) {
                for (const i in directives) {
                    app.directive(i, directives[i]);
                }
            }

            // 注册页面
            if (pages) {
                pages.forEach((e: any) => {
                    router.addRoute(e);
                });
            }

            // 注册视图
            if (views) {
                views.forEach((e: any) => {
                    if (!e.meta) {
                        e.meta = {};
                    }

                    if (e.path) {
                        router.$plugin?.addViews([e]);
                    } else {
                        console.error(`[${name}-views]：缺少 path 参数`);
                    }
                });
            }


        } catch (e) {
            console.error(`模块 ${name} 异常`, e);
        }

    }


    // 扫描文件
    const files = import.meta.globEager("/src/package/modules/**/*");

    let pagesViews: any = []

    for (const i in files) {
        const [, , , , name, fn, cname, fname, fname2, fname3, fname4] = i.split("/");
        const value: any = files[i].default;

        if (fn === "pages" || fn === "views") {

            const path = value.xiaoyou ? value.xiaoyou.route.path : null

            if (cname && (cname.includes(".vue") || cname.includes(".tsx"))) {
                // pagesViews[cname] = value
                pagesViews.push({
                    i,
                    m: name,
                    path: path,
                    name: cname,
                    value: files[i],
                })
            }

            if (fname && (fname.includes(".vue") || fname.includes(".tsx"))) {
                pagesViews.push({
                    i,
                    m: name,
                    path: path,
                    name: fname,
                    value: files[i],
                })
            }

            if (fname2 && (fname2.includes(".vue") || fname2.includes(".tsx"))) {
                pagesViews.push({
                    i,
                    m: name,
                    path: path,
                    name: fname2,
                    value: files[i],
                })
            }

            if (fname3 && (fname3.includes(".vue") || fname3.includes(".tsx"))) {
                pagesViews.push({
                    i,
                    m: name,
                    path: path,
                    name: fname3,
                    value: files[i],
                })
            }

            if (fname4 && (fname4.includes(".vue") || fname4.includes(".tsx"))) {
                pagesViews.push({
                    i,
                    m: name,
                    path: path,
                    name: fname4,
                    value: files[i],
                })
            }

        } else {
            pagesViews.push({
                i,
                m: name,
                path: null,
                name: null,
                value: files[i],
            })
        }
    }

    let versionJson: any
    // @ts-ignore
    const res = await import("../../../version.json")
    versionJson = res.default

    let list = pagesViews

    for (let i = 0; i < list.length; i++) {
        const item = list[i]

        if (versionJson[item.path]) {
            const l = versionJson[item.path]
            if (l[item.name]) {
                const val = l[item.name]

                if (!val.includes(version)) {
                    // console.log(pagesViews[i], "pagesViews[i]")
                    // console.log(pagesViews[i], i, "pagesViews[i]")
                    delete pagesViews[i]
                }
            }
        }
    }

    removeEmpty(pagesViews)

    let files2: any = {}

    for (const item of pagesViews) {
        files2[item.i] = item["value"]
    }

    for (const i in files2) {
        const [, , , , name, fn, cname] = i.split("/");
        const value: any = files[i].default;
        const fname: string = (cname || "").split(".")[0];


        function next(d: any) {
            // 配置参数入口
            if (fn == "config.ts") {
                d.options = value || {};
            }

            // 模块入口
            if (fn == "en.ts") {
                if (value) {
                    // 阻止往下加载
                    d.isLoaded = true;

                    // 之前
                    d._beforeFn = (e: any) => {
                        if (e.components) {
                            for (const i in e.components) {
                                // 全局注册
                                e.components[i].xiaoyou = {
                                    global: true
                                };
                            }
                        }
                    };

                    d.value = value;

                    return d;
                }
            }
            // 其他功能
            switch (fn) {
                case "service":
                    d._services.push({
                        path: i.replace(`/src/package/modules/${name}/service`, `${name}`),
                        value: new value()
                    });
                    break;

                case "pages":
                case "views":
                    if (value.xiaoyou) {
                        d[fn].push({
                            ...value.xiaoyou.route,
                            component: value
                        });
                    }
                    break;

                case "components":
                    d.components[value.name] = value;
                    break;

                case "store":
                    d.store[fname] = value;
                    break;

                case "directives":
                    d.directives[fname] = value;
                    break;
            }

            return d;
        }

        const item: any = modules.find((e) => e.name === name);

        if (item) {
            if (!item.isLoaded) {
                next(item);
            }
        } else {
            modules.push(
                next({
                    name,
                    options: {},
                    directives: {},
                    components: {},
                    pages: [],
                    views: [],
                    store: {},
                    _services: []
                })
            );
        }
    }

    // 模块安装
    modules.forEach((e: any) => {
        if (!isEmpty(e._services)) {
            e.service = deepFiles(e._services);
        }

        console.log(e, "----v")
        if (isObject(e.value)) {
            if (isFunction(e.value.install)) {
                Object.assign(e, e.value.install(app, e.options));
            } else {
                Object.assign(e, e.value);
            }
        }

        if (e._beforeFn) {
            e._beforeFn(e);
        }

        install(e);
    });

    // 缓存模块
    const moduleStore = useModuleStore()
    moduleStore.SET_MODULE(modules)
    // store.commit("module/SET_MODULE", modules);
}

export {useModule};
