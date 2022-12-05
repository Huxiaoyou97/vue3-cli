/// <reference types="vite/client" />
import type {DefineComponent} from 'vue'
import {VNode} from "vue";
declare module '*.vue' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}


interface Window {
    $message: any;
    $notice: any
}
