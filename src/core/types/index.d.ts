import {Router} from "vue-router"
import {Pinia} from "pinia";

export declare interface HStore extends Pinia {
    service?: ServiceType;
}

export declare interface HRouter extends Router {
    $plugin?: {
        addViews(list: any[], options?: any): void
    }
}


interface ServiceType {
    base: {
        common?: CommonServiceType,
    }
}

interface CommonServiceType {
    test: () => Promise<any>;
}
