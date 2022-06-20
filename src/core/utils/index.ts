import flat from "array.prototype.flat";
import {routerMode} from "@/config/env";

export function isArray(value: any) {
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}

export function isObject(value: any) {
    return Object.prototype.toString.call(value) === "[object Object]";
}

export function isNumber(value: any) {
    return !isNaN(Number(value));
}

export function isFunction(value: any) {
    return typeof value == "function";
}

export function isString(value: any) {
    return typeof value == "string";
}

export function isNull(value: any) {
    return !value && value !== 0;
}

export function isEmpty(value: any) {
    if (isArray(value)) {
        return value.length === 0;
    }

    if (isObject(value)) {
        return Object.keys(value).length === 0;
    }

    return value === "" || value === undefined || value === null;
}

export function isBoolean(value: any) {
    return typeof value === "boolean";
}

export function last(data: any) {
    if (isArray(data) || isString(data)) {
        return data[data.length - 1];
    }
}

export function cloneDeep(obj: any) {
    const d = isArray(obj) ? obj : {};

    if (isObject(obj)) {
        for (const key in obj) {
            if (obj[key]) {
                if (obj[key] && typeof obj[key] === "object") {
                    d[key] = cloneDeep(obj[key]);
                } else {
                    d[key] = obj[key];
                }
            }
        }
    }

    return d;
}

export function dataset(obj: any, key: string, value: any, isMerge?: boolean): any {
    const isGet = value === undefined;
    let d = obj;

    const arr = flat(
        key.split(".").map((e) => {
            if (e.includes("[")) {
                return e.split("[").map((e) => e.replace(/"/g, ""));
            } else {
                return e;
            }
        })
    );

    try {
        for (let i = 0; i < arr.length; i++) {
            const e: any = arr[i];
            let n: any = null;

            if (e.includes("]")) {
                const [k, v] = e.replace("]", "").split(":");

                if (v) {
                    n = d.findIndex((x: any) => x[k] == v);
                } else {
                    n = Number(k);
                }
            } else {
                n = e;
            }

            if (i != arr.length - 1) {
                d = d[n];
            } else {
                if (isGet) {
                    return d[n];
                } else {
                    if (isMerge) {
                        Object.assign(d[n], value);
                    } else {
                        d[n] = value;
                    }
                }
            }
        }

        return obj;
    } catch (e) {
        console.error("格式错误", `${key}`);
        return {};
    }
}


export function clone(obj: any) {
    return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}

export function deepMerge(a: any, b: any) {
    let k;
    for (k in b) {
        a[k] =
            a[k] && a[k].toString() === "[object Object]" ? deepMerge(a[k], b[k]) : (a[k] = b[k]);
    }
    return a;
}

export function contains(parent: any, node: any) {
    while (node && (node = node.parentNode)) if (node === parent) return true;
    return false;
}

export function getUrlParam(name: string) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

export function isPc() {
    const userAgentInfo = navigator.userAgent;
    const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

export function getBrowser() {
    const {clientHeight, clientWidth} = document.documentElement;

    // 浏览器信息
    const ua = navigator.userAgent.toLowerCase();

    // 浏览器类型
    let type = (ua.match(/firefox|chrome|safari|opera/g) || "other")[0];

    if ((ua.match(/msie|trident/g) || [])[0]) {
        type = "msie";
    }

    // 平台标签
    let tag = "";

    const isTocuh =
        "ontouchstart" in window || ua.indexOf("touch") !== -1 || ua.indexOf("mobile") !== -1;
    if (isTocuh) {
        if (ua.indexOf("ipad") !== -1) {
            tag = "pad";
        } else if (ua.indexOf("mobile") !== -1) {
            tag = "mobile";
        } else if (ua.indexOf("android") !== -1) {
            tag = "androidPad";
        } else {
            tag = "pc";
        }
    } else {
        tag = "pc";
    }

    // 浏览器内核
    let prefix = "";

    switch (type) {
        case "chrome":
        case "safari":
        case "mobile":
            prefix = "webkit";
            break;
        case "msie":
            prefix = "ms";
            break;
        case "firefox":
            prefix = "Moz";
            break;
        case "opera":
            prefix = "O";
            break;
        default:
            prefix = "webkit";
            break;
    }

    // 操作平台
    const plat = ua.indexOf("android") > 0 ? "android" : navigator.platform.toLowerCase();

    // 屏幕信息
    let screen = "full";

    if (clientWidth < 768) {
        screen = "xs";
    } else if (clientWidth < 992) {
        screen = "sm";
    } else if (clientWidth < 1200) {
        screen = "md";
    } else if (clientWidth < 1920) {
        screen = "xl";
    } else {
        screen = "full";
    }

    // 是否 ios
    const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    // 浏览器版本
    const version = (ua.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1];

    // 是否 PC 端
    const isPC = tag === "pc";

    // 是否移动端
    const isMobile = isPC ? false : true;

    // 是否移动端 + 屏幕宽过小
    const isMini = screen === "xs" || isMobile;

    return {
        height: clientHeight,
        width: clientWidth,
        version,
        type,
        plat,
        tag,
        prefix,
        isMobile,
        isIOS,
        isPC,
        isMini,
        screen
    };
}

export function href(path: string, newWindow?: boolean) {
    const {origin, pathname} = window.location;

    if (pathname == path) {
        return false;
    }

    let url = "";

    if (routerMode == "history") {
        url = origin + import.meta.env.BASE_URL + path.substr(1);
    } else {
        url = origin + import.meta.env.BASE_URL + "#" + path;
    }

    if (newWindow) {
        window.open(url);
    } else {
        window.location.href = url;
    }
}

export function orderBy(list: Array<any>, key: any) {
    return list.sort((a, b) => a[key] - b[key]);
}

export function deepTree(list: Array<any>) {
    const newList: Array<any> = [];
    const map: any = {};

    list.forEach((e) => (map[e.id] = e));

    list.forEach((e) => {
        const parent = map[e.parentId];

        if (parent) {
            (parent.children || (parent.children = [])).push(e);
        } else {
            newList.push(e);
        }
    });

    const fn = (list: Array<any>) => {
        list.map((e) => {
            if (e.children instanceof Array) {
                e.children = orderBy(e.children, "orderNum");

                fn(e.children);
            }
        });
    };

    fn(newList);

    return orderBy(newList, "orderNum");
}

export function revDeepTree(list: Array<any> = []) {
    const d: Array<any> = [];
    let id = 0;

    const deep = (list: Array<any>, parentId: any) => {
        list.forEach((e) => {
            if (!e.id) {
                e.id = id++;
            }

            e.parentId = parentId;

            d.push(e);

            if (e.children && isArray(e.children)) {
                deep(e.children, e.id);
            }
        });
    };

    deep(list || [], null);

    return d;
}


/*
 * 六合彩多选中一算法Permutations
 * arr:需要排列组合的数组,
 * n:需要排列组合的个数,
 * res 空数组
 * out 最终结果数组
 */

export function Permutations(arr: any, n: number, res = [], out: string[][]) {
    if (n === 0) {
        out.push(res);
        return out;
    }
    if (arr.length === n) {
        out.push(res.concat(arr));
        return out;
    }

    for (let i = 0; i <= arr.length - n; i++) {
        let temp = res.slice(0);
        // @ts-ignore
        temp.push(arr[i]);
        Permutations(arr.slice(i + 1), n - 1, temp, out);
    }
}


export function basename(path: string) {
    let index = path.lastIndexOf("/");
    index = index > -1 ? index : path.lastIndexOf("\\");
    if (index < 0) {
        return path;
    }
    return path.substring(index + 1);
}

export function sum(arr: any[]) {
    let s = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
        s += parseInt(arr[i]);
    }
    return s;
}

export const keyCodes = Object.freeze({
    enter: 13,
    tab: 9,
    delete: 46,
    esc: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    end: 35,
    home: 36,
    del: 46,
    backspace: 8,
    insert: 45,
    pageup: 33,
    pagedown: 34,
    shift: 16,
})

// 数组对象深度对比
export function deepCompare(x: any, y: any) {
    let i, l, leftChain: any, rightChain: any;
    // @ts-ignore
    let that = this;

    function compare2Objects(x: any, y: any) {
        let p;


        // 记住 NaN === NaN 返回 false
        // 并且 isNaN(undefined) 返回 true
        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
        }

        // 比较原语和函数。
        // 检查两个参数是否链接到同一个对象。
        // 在我们比较原型的步骤中特别有用
        if (x === y) {
            return true;
        }

        // 在构造函数中创建函数的情况下有效。
        // 比较日期是一种常见的情况。 另一个内置插件？
        // 我们甚至可以处理跨 iframe 传递的函数
        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString();
        }

        // 最后尽可能地检查原型
        if (!(x instanceof Object && y instanceof Object)) {
            return false;
        }

        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        if (x.prototype !== y.prototype) {
            return false;
        }

        // 检查不定式链接循环
        if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
            return false;
        }

        // 快速检查一个对象是另一个对象的子集。
        // todo: 缓存 arguments[0] 的结构以提高性能
        for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }
        }

        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }

            switch (typeof (x[p])) {
                case 'object':
                case 'function':

                    leftChain.push(x);
                    rightChain.push(y);

                    if (!compare2Objects(x[p], y[p])) {
                        return false;
                    }

                    leftChain.pop();
                    rightChain.pop();
                    break;

                default:
                    if (x[p] !== y[p]) {
                        return false;
                    }
                    break;
            }
        }

        return true;
    }

    if (arguments.length < 1) {
        return true;
    }

    for (i = 1, l = arguments.length; i < l; i++) {

        leftChain = [];
        rightChain = [];

        if (!compare2Objects(arguments[0], arguments[i])) {
            return false;
        }
    }

    return true;
}
