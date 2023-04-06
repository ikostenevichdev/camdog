export default (axios) => ({
  getNotificationsChannels() {
    return axios.get('/notificationChannels');
  },

  registerBrowser(payload) {
    return axios.post('/notificationChannels:registerBrowser', payload);
  },

  disableNotification(channelId) {
    return axios.post(`/notificationChannels/${channelId}:disable`);
  },

  activateNotification(channelId) {
    return axios.post(`/notificationChannels/${channelId}:enable`);
  },

  deleteNotification(channelId) {
    return axios.delete(`/notificationChannels/${channelId}`);
  }

  
});
