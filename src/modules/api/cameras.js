import qs from 'qs'
export default (axios) => ({
    get(payload) {
        return axios.get('cameras', {
            params: {
                ...payload
            },
            paramsSerializer: (payload) => qs.stringify(payload)
        });
    },
    getCamerasData(id) {
        return axios.get(`cameras/${id}`)
    },
    getSnapshot(id) {
        return axios.post(`cameras/${id}:refreshSnapshot`)
    },
    getPreview(id) {
        return axios.post(`cameras/${id}:refreshPreview`)
    },
    updatePolygon({ id, payload }) {
        return axios.put(`cameras/${id}/recognitionProfiles`, payload)
    },
    create(payload) {
        return axios.post('cameras', payload);
    },
    ConnectionUri(payload) {
        return axios.post('cameras:makeConnectionUri', payload)
    },
    testConnection(payload) {
        return axios.post('cameras:testConnection', payload)
    },
    getConnectionProfiles(payload) {
        return axios.post('cameras:getConnectionProfiles', payload)
    },
    getNotifications(id) {
        return axios.get(`cameras/${id}/notificationSettings`)
    },
    updateNotification({ id, payload }) {
        return axios.put(`cameras/${id}/notificationSettings`, payload)
    },
    play(payload) {
        return axios.post(`cameras/${payload}`)
    },
    update({id, payload}) {
        return axios.put(`cameras/${id}`, payload);
    },
    updateLocation({id, payload}) {
        return axios.put(`cameras/${id}:setGeoLocation`, payload);
    },
    delete(payload) {
        return axios.delete(`cameras/${payload}`);
    },
    setCamerasOrder(payload) {
        return axios.post('cameras:setListOrder', payload)
    },
    getVendors () {
        return axios.get('camerasDb/vendors')
    },
    getVendorsModels (vendorId) {
        return axios.get(`camerasDb/vendors/${vendorId}/models`)
    },
    getModelsConnectionOptions (modelId) {
        return axios.get(`camerasDb/models/${modelId}/connectionOptions`)
    },
    composeConnectionUri (payload) {
        return axios.post('camerasDb:composeConnectionUri', payload)
    },
    camerasConnectionOptions () {
        return axios.post(`cameras:getConnectionProfiles`)
    },
});
