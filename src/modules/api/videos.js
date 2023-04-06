export default (axios) => ({
    get(cameraId, startTime, endTime) {
        return axios.get(`/cameras/${cameraId}/videos`, { params: { startTime, endTime } })
    },
  });
  