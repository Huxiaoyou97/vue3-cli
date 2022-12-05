import send from "$/base/service/index";

//========================  基础-模块  ===================================
const basic = {
    // 获取商户配置
    getSysTime(params?) {
        return send({
            url: '/sport-api/categoryApi/sysTime',
            method: "get",
            params,
        });
    },
}

export {
    basic,
}
