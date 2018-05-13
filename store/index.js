import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import SearchResultModel from '../models/SearchResultModel.js';
import ListModel from '../models/ListModel.js';

Vue.use(Vuex);
const URL = "http://api.soundcloud.com/tracks/?client_id=1dff55bf515582dc759594dac5ba46e9&limit=100&q=";
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
    selectedTab: '추천 리스트',
    tracks: {},
  },
  getters:{
    getPlayerModalData: state => {
      return SearchResultModel.find(state.playerModalDataIndex);
    }
  },
  actions: {
    requestSearchData: ({commit, state}) => {
      axios.get(URL + state.query).then((response) => {
        commit('responeSubmitData', response.data);
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
