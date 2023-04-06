export default (axios) => ({
  async getBillingData () {
    const { data } = await axios.get('/billing');
    return data
  },

  async getСameraSessions (payload) {
    
    const { data } = await axios.get(`/billing/cameraSessions?`, {
      params: payload
    });
    return data
  },

  async getBillingPlans() {
    const { data } = await axios.get('billing/plans');
    return data.plans
  },

  async subscribePlan(payload) {
    try {
      const { data } = await axios.post('billing/subscribe', payload);
      return data.plans
    } catch (error) {
      throw error
    }
  },

  
});
