import ClipboardJS from 'clipboard'
import {gp} from "@/core/hook/useMessage";
function clipboardSuccess(msg: any) {
    console.log(msg, 'msg')
    gp.$baseMessage(msg, 'success', 'vab-hey-message-success', false)
}

function clipboardError(msg: any) {
    gp.$baseMessage(msg, 'error', 'vab-hey-message-success', false)
}

/**
 * @description 复制数据
 * @param text
 */
export default function handleClipboard(successMsg: string, errorMsg: string) {
    const clipboard = new ClipboardJS('.copy')

    clipboard.on('success', (e: ClipboardJS.Event) => {
        e.clearSelection()
        clipboardSuccess(successMsg)
        clipboard.destroy()
    })
    clipboard.on('error', (e: ClipboardJS.Event) => {
        e.clearSelection()
        clipboardError(errorMsg)
        clipboard.destroy()
    })
}
