import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import ListModel from '../models/ListModel.js';

Vue.use(Vuex);
const URL = "http://api.soundcloud.com/tracks/?client_id=1dff55bf515582dc759594dac5ba46e9&limit=10&linked_partitioning=1&q=";
export default new Vuex.Store({
  state: {
    query: '',
    submitted: false,
    searchResult: {
      data: [],
      nextHref: null,
      selectedData: []
    },
    previewPlayerModal: {
      index: null,
      id: '',
      url: null
    },
    show: {
      addListModal: false,
      myPlaylist: false,
      recommendPlaylist: false,
      settingModal: false
    },
    footerPlayer: {
      index: 0,
      url: null,
      title: ''
    },
    recommendData: [],
    playlistData: [],
    playlistTitle: '',
    playlistEdit: '편집',
    settingModalURL: '',
    tab: {
      list: ['추천 리스트', '나의 리스트'],
      selected: '추천 리스트',
    },
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
      id: '5b01b014c3bc3567b9ae9c1c',
      author: '건우',
      name: '____ggun',
      title: '졸릴때 듣고 싶은 노래'
    }
  },
  getters:{
    getPlayerModalData: state => {
      return state.searchResult.data.find((item, i) => i === state.previewPlayerModal.index);
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
    updateQuery: ({commit}, inputValue) => {
      commit('UPDATE_QUERY', inputValue);
    },
    resetQuery: ({commit}) => {
      commit('RESET_QUERY');
    },
    getRecommendData: ({commit}) => {
      axios.get('http://crev.kr:50004/playlists')
        .then((response) => {
          commit('STORE_RECOMMEND_DATA', response.data);
        });
    },
    backToRecommendList: ({commit}) => {
      commit('BACK_TO_RECOMMEND_LIST');
    },
    storeSearchResultItem: ({commit}, item) => {
      commit('STORE_SEARCHRESULT_ITEM', item);
    },
    getPreviewURL: ({commit, state}) => {
      axios.get(`https://api.soundcloud.com/i1/tracks/${state.previewPlayerModal.id}/streams?client_id=1dff55bf515582dc759594dac5ba46e9`)
      .then((response) => {
        commit('CHANGE_PREVIEW_PLAYER_URL', response.data.preview_mp3_128_url);
      })
      .catch((error) => {
        alert(`${error}. 다시 시도해주시기 바랍니다.`);
      });
    },
    showPreviewPlayerModal: ({commit}, {index, id}) => {
      commit('SHOW_PREVIEW_PLAYER_MODAL', {index, id});
    },
    updatePreviewPlayerObject: ({commit}, refs) => {
      commit('UPDATE_PREVIEW_PLAYER_OBJECT', refs);
    },
    updatePlayerObject: ({commit}, refs) => {
      commit('UPDATE_PLAYER_OBJECT', refs);
    },
    closePreviewPlayer: ({commit}) => {
      commit('CLOSE_PREVIEW_PLAYER');
    },
    getMylistData: ({commit, dispatch, state}, tabName) => {
      axios.get(`http://crev.kr:50004/playlists/${state.user.id}`)
        .then((response) => {
          dispatch('getPlaylistData', {data: response.data.tracks, tabName: tabName, plylistTitle: undefined});
        })
        .catch((error) => {
          alert(`${error}. 다시 시도해주시기 바랍니다.`);
        });
    },
    getSearchResultData: ({commit, state}) => {
      if(state.searchResult.data.length) {
        state.searchResult.data.length = 0;
      }
      axios.get(URL + state.query)
        .then((response) => {
          commit('STORE_SEARCHRESULT_DATA', response.data);
        });
    },
    getNextSearchResultData: ({commit, state}) => {
      axios.get(state.searchResult.nextHref)
        .then((response) => {
          commit('STORE_SEARCHRESULT_DATA', response.data);
        });
    },
    getPlaylistData: ({commit, state}, {data, tabName, plylistTitle}) => {
      commit('UPDATE_PLAYLIST_TITLE', plylistTitle);
      commit('CLEAR_PLAYLIST');
      var compelted = 0;
      var length = state.playlistData.length;
      Array.prototype.forEach.call(data, (id, index) => {
        axios.get(`http://api.soundcloud.com/tracks/${id}?client_id=1dff55bf515582dc759594dac5ba46e9`)
        .then((response) => {
          compelted++;
          commit('STORE_PLAYLIST', {data: response.data, index: index, length: length});

          if(data.length === compelted) {
            commit('DONE_STORE_PLAYLIST', tabName);
          }
        })
        .catch((error) => {
          alert(`${error}. 다시 시도해주시기 바랍니다.`);
        });
      });
    },
    updateTimeline: ({commit, state} , ev) => {
      commit('GET_TIMELINE_POSITION');
      let newMargLeft = ev.clientX - state.player.timelinePosition;

      if (newMargLeft >= 0 && newMargLeft <= state.player.timelineWidth) {
        commit('UPDATE_PLAYER_HEAD_LOCATION', newMargLeft);
      }
      if (newMargLeft < 0) {
        commit('UPDATE_PLAYER_HEAD_LOCATION', 0);
      }
      if (newMargLeft > state.player.timelineWidth) {
        commit('UPDATE_PLAYER_HEAD_LOCATION', state.player.timelineWidth);
      }

      let percent = newMargLeft / state.player.timelineWidth;
      commit('UPDATE_CURRENT_TIME', percent);
    },
    setPlayerIndex: ({dispatch, commit, state}, index) => {
      commit('UPDATE_PLAYER_INDEX', index);
      dispatch('getPlayerURL', state.footerPlayer.index);
    },
    updatePlayerTime: ({commit}) => {
      commit('UPDATE_PLAYER_TIME');
    },
    getPlayerDuration: ({commit}) => {
      commit('GET_PLAYER_DURATION');
    },
    togglePlayerPlayButton: ({commit}) => {
      commit('TOGGLE_PLAYER_PLAY_BUTTON')
    },
    checkSelectedPlaylistURL: ({dispatch, state}, tabName) => {
      var compelted = 0;
      var length = state.playlistData.length;
      var data = [];
      Array.prototype.forEach.call(state.searchResult.selectedData, (item, index) => {
        axios.get(`https://api.soundcloud.com/i1/tracks/${item.id}/streams?client_id=1dff55bf515582dc759594dac5ba46e9`)
          .then((response) => {
            compelted++;
            if(typeof response.data.http_mp3_128_url === 'undefined') {
              alert(`해당 ${item.title} 데이터는 추가할 수 없습니다.`);
            } else {
              data[index] = item.id;
            }

            if(compelted === state.searchResult.selectedData.length) {
              axios.post('http://crev.kr:50004/playlists',{
                author: state.user.name,
                title: state.user.title,
                tracks: data.toString()
              })
                .then((response) => {
                  dispatch('getPlaylistData', {data: data, tabName: tabName});
                })
                .catch((error) => {
                   alert(`${error}. 다시 시도해주시기 바랍니다.`);
                });
            }
          });
      });
    },
    getPlayerURL: ({commit, state}, index) => {
      axios.get(`https://api.soundcloud.com/i1/tracks/${state.playlistData[index].id}/streams?client_id=1dff55bf515582dc759594dac5ba46e9`)
      .then((response) => {
        commit('CHANGE_PLAYER_URL', {url: response.data.http_mp3_128_url, index: index});
      });
    },
    editPlaylist: ({dispatch, commit, state}, index) => {
      axios.delete(`http://crev.kr:50004/playlists/${state.playlistData[index].id}`)
        .then((response) => {
          commit('DELETE_PLAYLIST', index);
          if(index === state.footerPlayer.index && state.playlistData.length) {
            dispatch('getPlayerURL', 0);
          }
          console.log(response);
        })
        .catch((error) => {
          alert(`${error}. 다시 시도해주시기 바랍니다.`);
        });
    },
    showSettingModal: ({commit}, {url, index}) => {
      commit('SHOW_SETTING_MODAL', {url, index});
    },
    closeSettingModal: ({commit}) => {
      commit('CLOSE_SETTING_MODAL')
    },
    togglePlaylistEdit: ({commit}) => {
      commit('TOGGLE_PLAYLIST_EDIT');
    },
    openBrower: ({state}) => {
      window.open(state.settingModalURL);
    },
    clickTab: ({dispatch, commit, state}, tabName) => {
      if(tabName === state.tab.list[1] && state.tab.selected !== tabName) {
        dispatch('getMylistData', tabName);
      }
      if(tabName === state.tab.list[0]) {
        commit('CLEAR_PLAYLIST');
      }
      commit('SET_TAB_NAME', tabName);
    },
    clickAddListButton: ({commit}) => {
      commit('CLICK_ADD_LIST_BUTTON');
    },
    closeAddListModal: ({commit}) => {
      commit('CLOSE_ADD_LIST_MODAL');
    }
  },
  mutations: {
    CLOSE_PREVIEW_PLAYER: state => {
      state.previewPlayerModal.index = null;
    },
    UPDATE_QUERY: (state, inputValue) => {
      state.query = inputValue;
      if(!state.query.length) {
        state.submitted = false;
        state.searchResult.data = [];
        state.searchResult.selectedData = [];
        state.footerPlayer.index = 0;
      }
    },
    STORE_SEARCHRESULT_DATA: (state, data) => {
      state.submitted = true;
      state.searchResult.data = state.searchResult.data.concat(data.collection);
      state.searchResult.nextHref = data.next_href;
      state.footerPlayer.index = 0;
      state.playlistEdit = '편집';
    },
    RESET_QUERY: (state) => {
      state.query = '';
      state.submitted = false;
      state.searchResult.data = [];
      state.searchResult.selectedData = [];
      state.footerPlayer.index = 0;
      state.playlistEdit = '편집';
    },
    STORE_SEARCHRESULT_ITEM: (state, item) => {
      if(state.searchResult.selectedData.some((val) => val.id === item.id)) {
        state.searchResult.selectedData = state.searchResult.selectedData.filter((val) => val.id !== item.id);
      } else {
        state.searchResult.selectedData.push(item);
      }
    },
    SET_TAB_NAME: (state, tabName) => {
      state.tab.selected = tabName;
      state.footerPlayer.index = 0;
    },
    SHOW_PREVIEW_PLAYER_MODAL: (state, {index, id}) => {
      state.previewPlayerModal.index = index;
      state.previewPlayerModal.id = id;
    },
    CHANGE_PREVIEW_PLAYER_URL: (state, url) => {
      state.previewPlayerModal.url = url;
    },
    CHANGE_PLAYER_URL: (state, {url, index}) => {
      state.footerPlayer.url = url;
      state.footerPlayer.index = index;
      if(state.playlistData[index].title.length > 35) {
        state.footerPlayer.title = state.playlistData[index].title.slice(0, 35) + '...';
      } else {
        state.footerPlayer.title = state.playlistData[index].title;
      }

      if(state.player.pauseElement.style.display === 'inline-block') {
        state.player.audio.setAttribute('autoplay', '');
        state.player.playElement.style.display = 'none';
      } else {
        state.player.audio.removeAttribute('autoplay');
      }
      console.log(state.footerPlayer.url);
    },
    UPDATE_PREVIEW_PLAYER_OBJECT: (state, refs) => {
      state.player.audio = refs.player;
      state.player.playHead = refs.playHead;
      state.player.timeline = refs.timeline;
      state.player.timelineWidth = state.player.timeline.offsetWidth - state.player.playHead.offsetWidth;
    },
    UPDATE_PLAYER_OBJECT: (state, refs) => {
      state.player.audio = refs.player;
      state.player.playElement = refs.playElement;
      state.player.pauseElement = refs.pauseElement;
      state.player.playHead = refs.playHead;
      state.player.timeline = refs.timeline;
      state.player.timelineWidth = state.player.timeline.offsetWidth - state.player.playHead.offsetWidth;
    },
    TOGGLE_PLAYER_PLAY_BUTTON: (state) => {
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
    UPDATE_PLAYER_TIME: (state) => {
      let playPercent = state.player.timelineWidth * (state.player.audio.currentTime / state.player.duration);
      state.player.playHead.style.marginLeft = playPercent + "px";

      state.player.currentTime = state.player.audio.currentTime;
    },
    GET_PLAYER_DURATION: (state) => {
      state.player.duration = state.player.audio.duration;
    },
    GET_TIMELINE_POSITION: (state) => {
      state.player.timelinePosition = state.player.timeline.getBoundingClientRect().left;
    },
    UPDATE_PLAYER_HEAD_LOCATION: (state, marginValue) => {
      state.player.playHead.style.marginLeft = marginValue + "px";
    },
    UPDATE_CURRENT_TIME: (state, percent) => {
      state.player.audio.currentTime = state.player.duration * percent;
    },
    CLOSE_ADD_LIST_MODAL: (state) => {
      state.show.addListModal = false;
    },
    UPDATE_PLAYER_INDEX: (state, index) => {
      state.footerPlayer.index += index;
      if(state.footerPlayer.index >= state.playlistData.length) {
        state.footerPlayer.index = 0;
      } else if (state.footerPlayer.index < 0) {
        state.footerPlayer.index = state.playlistData.length - 1;
      }
      if(state.player.pauseElement.style.display === 'inline-block') {
        state.player.audio.setAttribute('autoplay', '');
        state.player.playElement.style.display = 'none';
      } else {
        state.player.audio.removeAttribute('autoplay');
      }
    },
    SHOW_SETTING_MODAL: (state, {url, index}) => {
      state.settingModalURL = url;
      state.show.settingModal = true;
    },
    CLOSE_SETTING_MODAL: (state) => {
      state.show.settingModal = false;
    },
    TOGGLE_PLAYLIST_EDIT: (state) => {
      if(state.player.pauseElement.style.display === 'inline-block') {
        state.player.audio.pause();
        state.player.playElement.style.display = 'inline-block';
        state.player.pauseElement.style.display = 'none';
      }

      state.playlistEdit = state.playlistEdit === '편집' ? '완료' : '편집';
    },
    DELETE_PLAYLIST: (state, index) => {
      state.playlistData.splice(index, 1);
      if(!state.playlistData.length) {
        state.playlistEdit = '편집';
      }
    },
    STORE_PLAYLIST: (state, {data, index, length}) => {
      state.playlistData[index + length] = data;
    },
    DONE_STORE_PLAYLIST: (state, tabName) => {
      state.tab.selected = tabName;
      state.show.recommendPlaylist = true;
      state.searchResult.selectedData = [];
      state.show.addListModal = false;
      state.query = '';
      state.submitted = false;
      state.searchResult.data = [];
      state.show.myPlaylist = true;
    },
    STORE_RECOMMEND_DATA: (state, data) => {
      state.recommendData = data;
    },
    BACK_TO_RECOMMEND_LIST: (state) => {
      state.show.recommendPlaylist = false;
      state.show.myPlaylist = false;
    },
    CLEAR_PLAYLIST: (state) => {
      state.playlistData = [];
      state.show.myPlaylist = false;
      state.show.recommendPlaylist = false;
    },
    UPDATE_PLAYLIST_TITLE: (state, plylistTitle) => {
      if(typeof plylistTitle !== 'undefined') {
        state.playlistTitle = plylistTitle;
      } else {
        state.playlistTitle = state.user.title;
      }
    },
    CLICK_ADD_LIST_BUTTON: (state) => {
      state.show.addListModal = true;
    }
  }
});
