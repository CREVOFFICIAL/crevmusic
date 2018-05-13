import ListModel from '../../models/ListModel.js';

const state = {
  listData: []
};

const actions = {
  requestRecommendData: function({commit}) {
    ListModel.list().then(data => {
      commit('responeRecommendResult', data);
    });
  }
};

const mutations = {
  responeRecommendResult: function(state, data) {
    state.listData = data;
  }
};

export default {
  state,
  actions,
  mutations
};