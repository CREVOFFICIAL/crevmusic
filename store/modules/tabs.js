const state = {
  tabList: ['추천 리스트', '나의 리스트'],
  selectedTab: '추천 리스트'
};


const mutations = {
  onClickTab: function(state, tabName) {
    state.selectedTab = tabName;
  }
};

export default {
  state,
  mutations
};
