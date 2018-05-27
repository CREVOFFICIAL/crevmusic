import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);
const URL = "http://api.soundcloud.com/tracks/?client_id=1dff55bf515582dc759594dac5ba46e9&limit=10&linked_partitioning=1&q=";
export default new Vuex.Store({
  state: {
    query: '',
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
      id: null,
      trackId: '5b06bd03f0b5393a20fe6efd',
      name: null,
      img: null,
      title: ''
    },
    loading: false
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
    },
    isAuthenticated: state => {
      return !!localStorage.getItem('token');
    }
  },
  actions: {
    updateQuery: ({commit}, inputValue) => {
      commit('UPDATE_QUERY', inputValue);
    },
    resetQuery: ({commit}) => {
      commit('RESET_QUERY');
    },
    getRecommendData: ({commit, dispatch}) => {
      axios.get('http://crev.kr:50004/playlists')
        .then((response) => {
          setTimeout(() => {
          }, 1000);
          commit('STORE_RECOMMEND_DATA', response.data);
        })
        .catch((error) => {
          dispatch(getRecommendData);
          alert(`${error}. 다시 로드하겠습니다.`);
        });
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
    getMylistData: ({commit, dispatch, state}, cb) => {
      if(state.user.trackId) {
        axios.get(`http://crev.kr:50004/playlists/${state.user.trackId}`)
          .then((response) => {
            dispatch('getPlaylistData', {data: response.data.tracks, title: undefined, cb: cb});
          })
          .catch((error) => {
            alert(`${error}. 다시 시도해주시기 바랍니다.`);
          });
      }
    },
    getSearchResultData: ({commit, state}, q) => {
      if(state.searchResult.data.length) {
        state.searchResult.data.length = 0;
      }
      if(typeof q !== 'undefined') {
        commit('UPDATE_QUERY', q);
      }
      return axios.get(URL + state.query)
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
    getPlaylistData: ({commit, dispatch, state}, {data, title, cb}) => {
      commit('TURN_ON_LOADING');
      commit('UPDATE_PLAYLIST_TITLE', title);
      commit('CLEAR_PLAYLIST');
      var compelted = 0;
      var length = state.playlistData.length;
      Array.prototype.forEach.call(data, (id, index) => {
        axios.get(`http://api.soundcloud.com/tracks/${id}?client_id=1dff55bf515582dc759594dac5ba46e9`)
        .then((response) => {
          compelted++;
          commit('STORE_PLAYLIST', {data: response.data, index: index, length: length});

          if(data.length === compelted) {
            if(typeof cb !== 'undefined') {
              cb();
            }

            commit('TURN_OFF_LOADING');
            commit('DONE_STORE_PLAYLIST');
          }
        })
        .catch((error) => {
          commit('TURN_OFF_LOADING');
          alert('로딩 중 오류가 발생했습니다.');
          dispatch('getMylistData', {cb});
        });
      });
    },
    setRecommendPlaylist:({commit}, isPlaylist) => {
      commit('SET_RECOMMEND_PLAYLIST', isPlaylist);
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
    checkSelectedPlaylistURL: ({commit, dispatch, state}, cb) => {
      var compelted = 0;
      var length = state.playlistData.length;
      var StoreData = [];
      Array.prototype.forEach.call(state.searchResult.selectedData, (item, index) => {
        axios.get(`https://api.soundcloud.com/i1/tracks/${item.id}/streams?client_id=1dff55bf515582dc759594dac5ba46e9`)
          .then((response) => {
            compelted++;
            if(typeof response.data.http_mp3_128_url === 'undefined') {
              alert(`해당 ${item.title} 데이터는 추가할 수 없습니다.`);
            } else {
              StoreData[index] = item.id;
            }

            if(compelted === state.searchResult.selectedData.length) {
              console.log(StoreData.toString());
              return axios({
                method: 'PUT',
                url: `http://crev.kr:50004/playlists/${state.user.trackId}`,
                data: {
                  tracks: StoreData.toString(),
                  methods: 'add'
                }
              })
                .then((data) => {
                  dispatch('allClear');
                  cb();
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
      axios({
        method: 'PUT',
        url: `http://crev.kr:50004/playlists/${state.user.trackId}`,
        data: {
          ids: index.toString(),
          methods: 'remove'
        }
      })
        .then((response) => {
          commit('DELETE_PLAYLIST', index);
          if(index === state.footerPlayer.index && state.playlistData.length) {
            dispatch('getPlayerURL', 0);
          }
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
      commit('SET_TAB_NAME', tabName);
    },
    clickAddListButton: ({commit}) => {
      commit('CLICK_ADD_LIST_BUTTON');
    },
    closeAddListModal: ({commit}) => {
      commit('CLOSE_ADD_LIST_MODAL');
    },
    allClear: ({commit}) => {
      commit('ALLCLEAR');
    },
    setUserObject: ({commit}, {data}) => {
      commit('SET_USER_OBJECT', {data});
    },
    updateTrackTitle: ({commit}, title) => {
      commit('UPDATE_TRACK_TITLE', title);
    },
    addUserTrack: ({commit, state}) => {
      axios({
        method: 'POST',
        url: 'http://crev.kr:50004/playlists',
        data: {
          // 임시 트랙 아이디
          tracks: '198656805',
          title: state.user.title
        }
      })
        .then((data) => {
          // 나중에 트랙아이디를 현재 로그인된 아이디의 trackid에 저장
          // 현재는 테스트를 위해 dispatch부분에서 state값을 수정함.
          state.user.trackId = data._id;
          commit('SET_TAB_NAME', '추천 리스트');
          alert('등록완료!');
        })
        .catch((error) => {
            alert(`${error}. 다시 시도해주시기 바랍니다.`);
        });
    }
  },
  mutations: {
    CLOSE_PREVIEW_PLAYER: state => {
      state.previewPlayerModal.index = null;
    },
    UPDATE_QUERY: (state, inputValue) => {
      state.query = inputValue;
      if(!state.query.length) {
        state.searchResult.data = [];
        state.searchResult.selectedData = [];
      }
    },
    STORE_SEARCHRESULT_DATA: (state, data) => {
      state.searchResult.data = state.searchResult.data.concat(data.collection);
      state.searchResult.nextHref = data.next_href;
      state.footerPlayer.index = 0;
      state.playlistEdit = '편집';
    },
    RESET_QUERY: (state) => {
      state.query = '';
      state.searchResult.data = [];
      state.searchResult.selectedData = [];
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
    DONE_STORE_PLAYLIST: (state) => {
      state.searchResult.selectedData = [];
      state.show.addListModal = false;
      state.query = '';
      state.searchResult.data = [];
    },
    STORE_RECOMMEND_DATA: (state, data) => {
      state.recommendData = data;
      Array.prototype.forEach.call(state.recommendData, function (item) {
        item.date = item.date.slice(5,10);
      });
    },
    CLEAR_PLAYLIST: (state) => {
      state.playlistData = [];
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
    },
    SET_RECOMMEND_PLAYLIST: (state, isPlaylist) => {
      if(typeof isPlaylist !== 'undefined') {
        state.show.recommendPlaylist = isPlaylist;
      }
    },
    TURN_ON_LOADING: (state) => {
      state.loading = true;
    },
    TURN_OFF_LOADING: (state) => {
      state.loading = false;
    },
    ALLCLEAR: (state) => {
      state.query = '';
      state.searchResult.data = [];
      state.searchResult.selectedData = [];
      state.footerPlayer.index = 0;
      state.playlistEdit = '편집';
      state.tab.selected = '추천 리스트';
    },
    SET_USER_OBJECT: (state, {data}) => {
      state.user.name = data.properties.nickname;
      state.user.img = data.properties.profile_image;
      state.user.id = data.id;
    },
    UPDATE_TRACK_TITLE: (state, title) => {
      state.user.title = title;
    }
  }
});
