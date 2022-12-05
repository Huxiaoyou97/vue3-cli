import {createI18n} from 'vue-i18n'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
import HiCache from "@/core/utils/storage";
import {HiStance} from "$/base/utils/key";

const i18n = createI18n({
    legacy: false,
    locale: HiCache.getCache<string>(HiStance.LANGUAGE) || 'en',
    fallbackLocale: "en",
    globalInjection: true,
    messages
})

export default i18n
