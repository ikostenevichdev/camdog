export default (axios) => ({
  async getPresetsList() {
    const response = await axios.get(`/videoWalls`)
    return response.data
  },

  async savePresetsList(presets) {
    await axios.put(`/videoWalls`, presets)
  }
});
