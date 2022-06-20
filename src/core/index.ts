import {useRefs} from "./hook/useRefs";
import {Service, useService} from "./service";
import BaseService from "./service/base";
import {useRouter} from "./router";
import {useModule} from "./hook/useModule";
import router from "@/router";
import store from "@/store";


const services = useService();

async function bootstrap(app: any) {
    app.config.globalProperties.service = store.service = services;
    app.provide("service", services);

    useRouter();
    await useModule(app);

    router.$plugin?.addViews([]);
}

export {Service, BaseService, services, bootstrap, useRefs};
