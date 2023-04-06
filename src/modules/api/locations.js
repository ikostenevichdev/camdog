export default (axios) => ({
    get(payload) {
        return axios.get('locations', payload);
    },
    create(payload) {
        return axios.post('locations', payload);
    },
    update({id, payload}) {
        return axios.put(`locations/${id}`, payload);
    },
    delete(payload) {
        return axios.delete(`locations/${payload}`);
    },
});
