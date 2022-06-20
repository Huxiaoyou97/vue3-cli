/**
 * @author 胡小右
 * @date 2022-06-18 14:00:31
 * @desc useState Demo演示
 */

import {defineComponent} from "vue";
import {useState} from "@/core/hook/useState";

export default defineComponent({
    cool: {
        route: {
            path: "/exam-useState"
        }
    },

    setup() {
        const [flag, setFlag] = useState<boolean>(false);
        const [count, setCount] = useState(0);
        const [data, setData] = useState({
            name: "小右"
        });

        return () => {
            return (
                <div>
                    <h1>{String(flag.value)}----{count.value}----{data.value.name}</h1>
                    <button onClick={() => setFlag(!flag.value)}>点击</button>
                    <button onClick={() => setCount(count.value + 1)}>点击+1</button>
                    <button onClick={() => setData({name: "你好,小右!"})}>点击修改</button>
                </div>
            )
        }
    },
})
