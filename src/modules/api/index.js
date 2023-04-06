import VueAxios from 'vue-axios'
import axios from 'axios';

import apiAuth from '@/modules/api/auth';
import apiLocations from '@/modules/api/locations';
import apiCameras from '@/modules/api/cameras';
import apiUsers from '@/modules/api/users';
import apiIncidents from '@/modules/api/incidents';
import apiVideos from '@/modules/api/videos';
import apiPresets from '@/modules/api/presets';
import apiNotifications from '@/modules/api/notifications';
import apiBilling from '@/modules/api/billing';

export default {
    reps: (app,options) => {
        app.use(VueAxios, axios);
        const cleanRestApi = (obj) => {
            for (const propName in obj) {
                if (!obj.hasOwnProperty(propName)) continue;
            }
        };

        const client = axios.create({
            baseURL: 'https://api-dev.camdog.ai/api/v1'
        });

        client.interceptors.request.use(async config => {
            if (config.method === 'put' || config.method === 'post') {
                cleanRestApi(config.data);
            }
            if (app.$cookies.get('token')) {
                config.headers.common['Authorization'] = `Bearer ${app.$cookies.get(
                    "token"
                )}`;
            }
            return config;
        }, async error => {
            return Promise.reject(error);
        });

        client.interceptors.response.use(async response => {
            return response;
        }, async (error) => {
            let code = error.response && error.response.status ? error.response.status : 500;

            if (code === 422) {
                let err = {};
                _.forEach(error.response.data.errors, el => {
                    Object.assign(err, {
                        [el.param]: [el.msg]
                    })
                });

                return Promise.reject({
                    status: code,
                    errors: err
                });
            } else if (code === 403 || code === 401) {
                app.$cookies.remove('token')
                app.$cookies.remove('refreshToken')
                app.config.globalProperties.$router.push({ name: 'login' });
            } else if (code === 400 || code === 404 || code == 409) {
                return Promise.reject({
                    status: code,
                    messages: error.response.data.message
                });
            }

            return Promise.reject(error);
        });

        return {
            auth: apiAuth(client),
            locations: apiLocations(client),
            cameras: apiCameras(client),
            users: apiUsers(client),
            incidents: apiIncidents(client),
            videos: apiVideos(client),
            presets: apiPresets(client),
            notifications: apiNotifications(client),
            billing: apiBilling(client),
        };
    }
}