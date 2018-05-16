import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import SearchResultModel from '../models/SearchResultModel.js';
import ListModel from '../models/ListModel.js';

Vue.use(Vuex);
const URL = "http://api.soundcloud.com/tracks/?client_id=1dff55bf515582dc759594dac5ba46e9&limit=10&linked_partitioning=1&q=";
export default new Vuex.Store({
  state: {
    query: '',
    submitted: false,
    searchResult: [],
    searchNextHref: null,
    selectedSearchResultItem: [],
    playerModalDataIndex: null,
    playerModalDataId: '',
    playerModalDataURL: null,
    showAddList: false,
    playerIndex: 0,
    playerDataURL: null,
    listData: [],
    ownListData: [],
    tabList: ['추천 리스트', '나의 리스트'],
    selectedTab: '추천 리스트',
    tracks: {},
    player: {
      audio: null,
      duration: null,
      playElement: null,
      pauseElement: null,
      playHead: null,
      timeline: null,
      timelineWidth: null,
      timelinePosition: null,
      currentTime: null
    }
  },
  getters:{
    getPlayerModalData: state => {
      return state.searchResult.find((item, i) => i === state.playerModalDataIndex);
    },
    getPlayerTitle: state => {
      return state.ownListData.find((item, i) => i === state.playerIndex);
    },
    playingTime: state => {
      let startmm = Math.floor(state.player.currentTime / 60);
      let startss = Math.floor(state.player.currentTime) % 60;
      if(startss < 10) {
        startss = `0${startss}`;
      } else {
        startss = `${startss}`;
      }
      if(startmm < 10) {
        startmm = `0${startmm}`;
      } else {
        startmm = `${startmm}`;
      }

      return `${startmm}:${startss}`;
    },
    totalTime: state => {
      let endmm = Math.floor(state.player.duration / 60);
      let endss = Math.round(state.player.duration % 60);
      if(endmm < 10) {
        endmm = `0${endmm}`;
      }
      if(endss < 10) {
        endss = `0${endss}`;
      }
      return `${endmm}:${endss}`;
    }
  },
  actions: {
    requestSearchData: ({commit, state}) => {
      if(!state.searchResult.length) {
        state.searchNextHref = URL + state.query;
      }
      axios.get(state.searchNextHref).then((response) => {
        commit('responeSubmitData', response.data);
      });
    },
    requestRecommendData: ({commit}) => {
      ListModel.list().then(data => {
        commit('responeRecommendResult', data);
      });
    },
    getPreviewURL: ({commit, state}) => {
      axios.get(`https://api.soundcloud.com/i1/tracks/${state.playerModalDataId}/streams?client_id=1dff55bf515582dc759594dac5ba46e9`)
      .then((response) => {
        commit('changePlayerModalDataURL', response.data.preview_mp3_128_url);
      });
    },
    onClickTimeline: ({commit, state} , ev) => {
      commit('getTimelinePosition');

      let newMargLeft = ev.clientX - state.player.timelinePosition;

      if (newMargLeft >= 0 && newMargLeft <= state.player.timelineWidth) {
        commit('updatePlayHeadStyle', newMargLeft);
      }
      if (newMargLeft < 0) {
        commit('updatePlayHeadStyle', 0);
      }
      if (newMargLeft > state.player.timelineWidth) {
        commit('updatePlayHeadStyle', state.player.timelineWidth);
      }

      let percent = newMargLeft / state.player.timelineWidth;
      commit('updateCurrentTime', percent);
    },
    setPlayerIndex: ({dispatch, commit, state}, index) => {
      commit('updatePlayerIndex', index);
      dispatch('getPlayerURL', state.playerIndex);
    },
    getPlayerURL: ({commit, state}, index) => {
      axios.get(`https://api.soundcloud.com/i1/tracks/${state.ownListData[index].id}/streams?client_id=1dff55bf515582dc759594dac5ba46e9`)
      .then((response) => {
        commit('changePlayerDataURL', response.data.http_mp3_128_url);
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
        state.selectedSearchResultItem = [];
        state.playerDataURL = 0;
      }
    },
    responeSubmitData: (state, data) => {
      state.submitted = true;
      state.searchResult = state.searchResult.concat(data.collection);
      state.searchNextHref = data.next_href;
      state.playerDataURL = 0;
    },
    onReset: (state) => {
      state.query = '';
      state.submitted = false;
      state.searchResult = [];
      state.selectedSearchResultItem = [];
      state.playerDataURL = 0;
    },
    selectedList: (state, item) => {
      if(state.selectedSearchResultItem.some((val) => val.id === item.id)) {
        state.selectedSearchResultItem = state.selectedSearchResultItem.filter((val) => val.id !== item.id);
      } else {
        state.selectedSearchResultItem = [item, ...state.selectedSearchResultItem];
      }
    },
    responeRecommendResult:(state, data) => {
      state.listData = data;
    },
    onClickTab: (state, tabName) => {
      state.selectedTab = tabName;
      state.playerDataURL = 0;
    },
    clickedPlayerModal: (state, {index, id}) => {
      state.playerModalDataIndex = index;
      state.playerModalDataId = id;
    },
    onClickAddListButton: (state) => {
      state.showAddList = true;
    },
    changePlayerModalDataURL: (state, url) => {
      state.playerModalDataURL = url;
    },
    changePlayerDataURL: (state, url) => {
      state.playerDataURL = url;
      console.log(state.playerDataURL);
    },
    updatePlayerModalObject: (state, refs) => {
      state.player.audio = refs.player;
      state.player.playHead = refs.playHead;
      state.player.timeline = refs.timeline;
      state.player.timelineWidth = state.player.timeline.offsetWidth - state.player.playHead.offsetWidth;
    },
    updatePlayerObject: (state, refs) => {
      state.player.audio = refs.player;
      state.player.playElement = refs.playElement;
      state.player.pauseElement = refs.pauseElement;
      state.player.playHead = refs.playHead;
      state.player.timeline = refs.timeline;
      state.player.timelineWidth = state.player.timeline.offsetWidth - state.player.playHead.offsetWidth;
    },
    onClickPlayButton: (state) => {
      // start audio
      if(state.player.playElement.style.display === 'inline-block') {
        state.player.audio.play();
        state.player.playElement.style.display = 'none';
        state.player.pauseElement.style.display = 'inline-block';
      } else {
        state.player.audio.pause();
        state.player.playElement.style.display = 'inline-block';
        state.player.pauseElement.style.display = 'none';
      }
    },
    timeUpdate: (state) => {
      let playPercent = state.player.timelineWidth * (state.player.audio.currentTime / state.player.duration);
      state.player.playHead.style.marginLeft = playPercent + "px";

      state.player.currentTime = state.player.audio.currentTime;
    },
    canplayHhrough: (state) => {
      state.player.duration = state.player.audio.duration;
    },
    getTimelinePosition: (state) => {
      state.player.timelinePosition = state.player.timeline.getBoundingClientRect().left;
    },
    updatePlayHeadStyle: (state, marginValue) => {
      state.player.playHead.style.marginLeft = marginValue + "px";
    },
    updateCurrentTime: (state, percent) => {
      state.player.audio.currentTime = state.player.duration * percent;
    },
    onClickAddModalClose: (state) => {
      state.showAddList = false;
    },
    onClickAddList: (state) => {
      state.selectedSearchResultItem.forEach(function (item) {
        state.ownListData.unshift(item);
      });

      state.selectedSearchResultItem = [];
      state.showAddList = false;
      state.query = '';
      state.submitted = false;
      state.searchResult = [];
      state.selectedTab = '나의 리스트';
    },
    updatePlayerIndex: (state, index) => {
      state.playerIndex += index;
      if(state.playerIndex >= state.ownListData.length) {
        state.playerIndex = 0;
      } else if (state.playerIndex < 0) {
        state.playerIndex = state.ownListData.length - 1;
      }
      if(state.player.pauseElement.style.display === 'inline-block') {
        state.player.audio.setAttribute('autoplay', '');
      }
    }
  }
});
