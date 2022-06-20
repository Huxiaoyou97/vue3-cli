import router, {ignore} from "@/router";
import {cloneDeep} from "../utils";


const views = import.meta.globEager("/src/**/views/**/*.vue");

for (const i in views) {
    views[i.slice(5)] = views[i];
    delete views[i];
}


function useRouter() {
    router.$plugin = {
        addViews: (list: Array<any>, options: any) => {
            if (!options) {
                options = {};
            }

            // Parse route config
            list.forEach((e: any) => {
                const d: any = cloneDeep(e);

                // avoid router repeat
                d.name = d.router;

                if (!d.component) {
                    const url = d.viewPath;

                    if (url) {
                        if (
                            /^(http[s]?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i.test(
                                url
                            )
                        ) {
                            d.meta.iframeUrl = url;
                            // d.component = () => import(`$/base/pages/iframe/index.vue`);
                        } else {
                            d.component = () => Promise.resolve(views[url]);
                        }
                    } else {
                        d.redirect = "/404";
                    }
                }

                // Batch add route
                router.addRoute("index", d);
            });
        }
    };

    let lock = false;

    router.onError((err: any) => {
        if (!lock) {
            lock = true;
            console.error(err);

            setTimeout(() => {
                lock = false;
            }, 0);
        }
    });
}

export {useRouter};
