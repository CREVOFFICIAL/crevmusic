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
    playlistEdit: '편집',
    showAddList: false,
    playerIndex: 0,
    playerDataURL: null,
    nowPlayingTitle: {
      preview: '',
      full: '',
    },
    recommendListChart: [],
    recommendListData: [],
    ownListData: [],
    showSettingModal: false,
    settingInfoURL: '',
    settingDeleteIndex: null,
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
    },
    user: {
      id: 1,
      name: '_____ggun'
    }
  },
  getters:{
    getPlayerModalData: state => {
      return state.searchResult.find((item, i) => i === state.playerModalDataIndex);
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
      if(state.searchResult.length) {
        state.searchResult.length = 0;
      }
      axios.get(URL + state.query).then((response) => {
        commit('responseSubmitData', response.data);
      });
    },
    requestSearchNextHrefData: ({commit, state}) => {
      axios.get(state.searchNextHref).then((response) => {
        commit('responseSubmitData', response.data);
      });
    },
    requestRecommendChart: ({commit}) => {
      ListModel.list().then(data => {
        commit('responseRecommendChartResult', data);
      });
    },
    requestRecommendData: ({commit}) => {
      ListModel.list().then(data => {
        commit('responseRecommendData', data);
      });
    },
    getPreviewURL: ({commit, state}) => {
      axios.get(`https://api.soundcloud.com/i1/tracks/${state.playerModalDataId}/streams?client_id=1dff55bf515582dc759594dac5ba46e9`)
      .then((response) => {
        commit('changePlayerModalDataURL', response.data.preview_mp3_128_url);
      })
      .catch((error) => {
        console.log(error);
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
    checkUndefinedPlayerURL: ({commit, state}) => {
      var compelted = 0;
      var length = state.ownListData.length;
      Array.prototype.forEach.call(state.selectedSearchResultItem, (item, index) => {
        axios.get(`https://api.soundcloud.com/i1/tracks/${item.id}/streams?client_id=1dff55bf515582dc759594dac5ba46e9`)
        .then((response) => {
          compelted++;
          if(typeof response.data.http_mp3_128_url === 'undefined') {
            alert(`해당 ${item.title}은 추가할 수 없습니다.`);
          } else {
            commit('pushOwnData', {item, index, length});
          }
          if(compelted === state.selectedSearchResultItem.length) {
            commit('completedPushOwnData');
          }
        });
      });
    },
    getPlayerURL: ({commit, state}, index) => {
      axios.get(`https://api.soundcloud.com/i1/tracks/${state.ownListData[index].id}/streams?client_id=1dff55bf515582dc759594dac5ba46e9`)
      .then((response) => {
        commit('changePlayerDataURL', {url: response.data.http_mp3_128_url, index: index});
      });
    },
    editPlaylist: ({dispatch, commit, state}, index) => {
      commit('deletePlayList', index);
      if(index === state.playerIndex && state.ownListData.length) {
        dispatch('getPlayerURL', 0);
      }
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
        state.playerIndex = 0;
        state.playlistEdit = '편집';
      }
    },
    onClickSearchInput: (state, inputELement) => {
      inputELement.setSelectionRange(0, inputELement.value.length);
    },
    responseSubmitData: (state, data) => {
      state.submitted = true;
      state.searchResult = state.searchResult.concat(data.collection);
      state.searchNextHref = data.next_href;
      state.playerIndex = 0;
      state.playlistEdit = '편집';
    },
    onReset: (state) => {
      state.query = '';
      state.submitted = false;
      state.searchResult = [];
      state.selectedSearchResultItem = [];
      state.playerIndex = 0;
      state.playlistEdit = '편집';
    },
    selectedList: (state, item) => {
      if(state.selectedSearchResultItem.some((val) => val.id === item.id)) {
        state.selectedSearchResultItem = state.selectedSearchResultItem.filter((val) => val.id !== item.id);
      } else {
        state.selectedSearchResultItem.push(item);
      }
    },
    responseRecommendChartResult:(state, data) => {
      state.recommendListChart = data;
    },
    responseRecommendData: (state, data) => {
      state.recommendListData = data;
    },
    onClickTab: (state, tabName) => {
      state.selectedTab = tabName;
      state.playerIndex = 0;
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
    changePlayerDataURL: (state, {url, index}) => {
      state.playerDataURL = url;
      state.playerIndex = index;
      state.nowPlayingTitle.full = state.ownListData[index].title;
      if(state.nowPlayingTitle.full.length > 35) {
        state.nowPlayingTitle.preview = state.nowPlayingTitle.full.slice(0, 35) + '...';
      } else {
        state.nowPlayingTitle.preview = state.nowPlayingTitle.full;
      }

      if(state.player.pauseElement.style.display === 'inline-block') {
        state.player.audio.setAttribute('autoplay', '');
        state.player.playElement.style.display = 'none';
      } else {
        state.player.audio.removeAttribute('autoplay');
      }
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
    completedPushOwnData: (state) => {
      state.selectedSearchResultItem = [];
      state.showAddList = false;
      state.query = '';
      state.submitted = false;
      state.searchResult = [];
      state.selectedTab = '나의 리스트';
    },
    pushOwnData: (state, {item, index, length}) => {
      state.ownListData[index + length] = item;
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
        state.player.playElement.style.display = 'none';
      } else {
        state.player.audio.removeAttribute('autoplay');
      }
    },
    onClickSettingButton: (state, {url, index}) => {
      state.settingInfoURL = url;
      state.settingDeleteIndex = index;
      state.showSettingModal = true;
    },
    onClickCloseSettingModal: (state) => {
      state.showSettingModal = false;
    },
    onClickInfoSettingModal: (state) => {
      window.open(state.settingInfoURL);
    },
    togglePlaylistEdit: (state) => {
      if(state.player.pauseElement.style.display === 'inline-block') {
        state.player.audio.pause();
        state.player.playElement.style.display = 'inline-block';
        state.player.pauseElement.style.display = 'none';
      }

      state.playlistEdit = state.playlistEdit === '편집' ? '완료' : '편집';
    },
    deletePlayList: (state, index) => {
      state.ownListData.splice(index, 1);

      if(!state.ownListData.length) {
        state.playlistEdit = '편집';
      }
    }
  }
});
