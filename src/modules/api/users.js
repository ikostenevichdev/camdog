export default (axios) => ({
    getMe() {
        return axios.get('users/me');
    },

    updateUser(user) {
        console.log('user update', user)
        axios.put('/users/me', user);
    },

    changePassword(payload) {
        return axios.put('users/me:changePassword', payload);
    }
});
  