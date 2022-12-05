import request from "@/service/request";
import {baseUrl, isDev} from "@/config/env";

export default function send(options: any = {}): Promise<any> {
    if (!options.params) options.params = {};
    if (!options.data) options.data = {};

    let ns: any = "";

    if (isDev) {
        ns = baseUrl;
    } else {
        ns = baseUrl;
    }

    // 处理 http
    if (options.url.indexOf("http") !== 0) {
        options.url = ns + options.url;
    }

    return request(options);
}
