import Vue from 'vue';
import Vuex from 'vuex';

import SearchResultModel from '../models/SearchResultModel.js';
import ListModel from '../models/ListModel.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    query: '',
    submitted: false,
    searchResult: [],
    selectedSearchResultItem: [],
    playerModalDataIndex: null,
    showAddList: false,
    listData: [],
    tabList: ['추천 리스트', '나의 리스트'],
    selectedTab: '추천 리스트'
  },
  getters:{
    getPlayerModalData: state => {
      return SearchResultModel.find(state.playerModalDataIndex);
    }
  },
  actions: {
    requestSearchData: ({commit}) => {
      SearchResultModel.list().then(data => {
        commit('responeSubmitData', data);
      });
    },
    requestRecommendData: ({commit}) => {
      ListModel.list().then(data => {
        commit('responeRecommendResult', data);
      });
    }
  },
  mutations: {
    onClose: state => {
      state.playerModalDataIndex = null;
    },
    updateQuery: (state, inputValue) => {
      state.query = inputValue;
      if(!state.query.length) {
        state.submitted = false;
        state.searchResult = [];
      }
    },
    responeSubmitData: (state, data) => {
      state.submitted = true;
      state.searchResult = data;
    },
    onReset: (state) => {
      state.query = '';
      state.submitted = false;
      state.searchResult = [];
    },
    selectedList: (state, item) => {
      state.selectedSearchResultItem = SearchResultModel.selected(item);
    },
    responeRecommendResult:(state, data) => {
      state.listData = data;
    },
    onClickTab: (state, tabName) => {
      state.selectedTab = tabName;
    },
    updatePlayerModalIndex: (state, index) => {
      state.playerModalDataIndex = index;
    },
    onClickAddListButton: (state) => {
      state.showAddList = true;
    }
  }
});
