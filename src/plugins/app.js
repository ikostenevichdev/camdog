import Api from '@/modules/api'
import snotify from 'vue3-snotify';
import 'vue3-snotify/style';

export default {
    install: (app, options) => {
        app.use(snotify);
        const funcs = {
            $api: Api.reps(app),
            $snotify: app.config.globalProperties.$snotify
        };
        app.config.globalProperties.$app = funcs;
        app.provide('$app', funcs);
    }
}
