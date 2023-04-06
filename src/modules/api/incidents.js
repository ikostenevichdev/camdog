export default (axios) => ({
    get(pageToken, startTime, endTime, sort = {}) {
        const params = { pageSize: 12, startTime, endTime }
        if (pageToken) {
            params.pageToken = pageToken
        }
        for (const key in sort) {
            const value = sort[key]
            if (value) params[key] = sort[key]
        }
        return axios.get('incidents', { params })
    },
    getCurrentAlert (id) {
        return axios.get(`incidents/${id}`)
    },
    getAlertFrames (id, pageToken) {
        const params = { pageSize: 30 }
        if (pageToken) {
            params.pageToken = pageToken
        }
        return axios.get(`incidents/${id}/alertFrames`, { params })
    },
    removeAlert (incidentIds) {
        return axios.post(`incidents:batchDelete`, {
            incidentIds
        })
    },
    loadVideo (cameraId, startTime, endTime) {
        return axios.get(`cameras/${cameraId}/videos`, { params: { startTime, endTime } })
    },
    removeAlertFrames (alertFrameIds) {
        return axios.post(`alertFrames:batchDelete`, {
            alertFrameIds
        })
    }
  });
  