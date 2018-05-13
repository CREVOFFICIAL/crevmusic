import SearchModel from '../../models/SearchModel.js';

const state = {
  query: '',
  submitted: false,
  searchResult: [],
  selectedItem: [],
  isSelectedSearchList: false
};

const actions = {
  requestSearchData: function ({commit}) {
    SearchModel.list().then(data => {
      commit('onSubmit', data);
    });
  }
};

const mutations = {
  updateQuery: function (state, inputValue) {
    state.query = inputValue;
    if(!state.query.length) {
      state.submitted = false;
      state.searchResult = [];
    }
  },
  onSubmit: function (state, data) {
    state.submitted = true;
    state.searchResult = data;
  },
  onReset: function (state) {
    state.query = '';
    state.submitted = false;
    state.searchResult = [];
  },
  selectedList: function (state, item) {
    state.selectedItem = SearchModel.selected(item);
    state.isSelectedSearchList = state.selectedItem.length ? true : false;
  }
};

export default {
  state,
  mutations,
  actions
};