export default (axios) => ({
  async login(form) {
    try {
      return await axios.post('users:signIn', form);
    } catch (error) {
      if (error.messages === 'user not found') {
        throw { message: 'User not found' }
      }

      if (error.response.data.code === 'wrong_password') {
        throw { message: 'Incorrect password' }
      }
    }
  },

  registration(form) {
    return axios.post('users:signUp', form);
  },
  
  refreshSession(payload) {
    return axios.post('users:refreshSession', payload);
  },

  resetPassword(payload) {
    return axios.post('users:resetPassword', payload);
  }
});
