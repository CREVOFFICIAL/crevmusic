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
    listData: [],
    ownListData: [],
    tabList: ['추천 리스트', '나의 리스트'],
    selectedTab: '추천 리스트',
    tracks: {},
    player: {
      audio: null,
      duration: null,
      playButton: null,
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
    divideTimeSection: state => {
      let startmm;
      let startss;
      let startTimeRemaining = Math.round(state.player.currentTime / 60);
      let endmm = Math.floor(state.player.duration / 60);
      let endss = Math.round(state.player.duration % 60);

      if(endmm < 10) {
        endmm = `0${endmm}`;
      }
      if(endss < 10) {
        endss = `0${endss}`;
      }
      if(startTimeRemaining <= 0) {
        startmm = '00';
        if(Math.round(state.player.currentTime) < 10) {
          startss = `0${Math.round(state.player.currentTime)}`;
        } else {
          startss = `${Math.round(state.player.currentTime)}`;
        }
      } else {
        startmm = `0${startTimeRemaining}`;
        startss = '00';
      }

      return `${startmm}:${startss}` + '/' + `${endmm}:${endss}`;
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
        commit('changePlayerModalData', response.data.preview_mp3_128_url);
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
      }
    },
    responeSubmitData: (state, data) => {
      state.submitted = true;
      state.searchResult = state.searchResult.concat(data.collection);
      state.searchNextHref = data.next_href;
    },
    onReset: (state) => {
      state.query = '';
      state.submitted = false;
      state.searchResult = [];
      state.selectedSearchResultItem = [];
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
    },
    clickedPlayerModal: (state, {index, id}) => {
      state.playerModalDataIndex = index;
      state.playerModalDataId = id;
    },
    onClickAddListButton: (state) => {
      state.showAddList = true;
    },
    changePlayerModalData: (state, url) => {
      state.playerModalDataURL = url;
    },
    updatePlayerObject: (state, refs) => {
      state.player.audio = refs.player;
      state.player.playButton = refs.playButton;
      state.player.playHead = refs.playHead;
      state.player.timeline = refs.timeline;
      state.player.timelineWidth = state.player.timeline.offsetWidth - state.player.playHead.offsetWidth;
    },
    onClickPlayButton: (state) => {
      // start audio
      if (state.player.audio.paused) {
        state.player.audio.play();
        // remove play, add pause
        state.player.playButton.classList.remove('play');
        state.player.playButton.classList.add('pause');
      } else { // pause audio
        state.player.audio.pause();
        // remove pause, add play
        state.player.playButton.classList.add('play');
        state.player.playButton.classList.remove('pause');
      }
    },
    previewTimeUpdate: (state) => {
      let playPercent = state.player.timelineWidth * (state.player.audio.currentTime / state.player.duration);
      state.player.playHead.style.marginLeft = playPercent + "px";

      state.player.currentTime = state.player.audio.currentTime;
    },
    timeUpdate: (state) => {
      let playPercent = state.player.timelineWidth * (state.player.audio.currentTime / state.player.duration);

      state.player.playHead.style.marginLeft = playPercent + "px";
      if (state.player.audio.currentTime == state.player.duration) {
        state.player.playButton.className = "";
        state.player.playButton.className = "play";
      }
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
    }
  }
});
