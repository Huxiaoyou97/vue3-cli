import {BaseService, Service} from "@/core";

@Service("comm")
export default class Common extends BaseService {
    test() {
        return this.request({
            url: "/test"
        });
    }
}
