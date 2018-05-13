const state = {
  trackData: [],
  dataIndex: null
};

const actions = {
  modalPlayerDataIndex
};

const mutations = {
  
  onClose: state => {
    state.trackData = [];
  }
};

export default {
  state,
  mutations,
  actions
};