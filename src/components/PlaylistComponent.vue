<template>
<div v-if="data.length">
    <div class="own-list-area">
    <ul class="own-list">
      <li v-for="(item, index) in data" :key="index" v-bind:class="{nowPlaying: playerIndex === index}" @click="onClickOwnListElement(index)">
        <div class="numbar-area">
          <span class="number" v-bind:class="playlistEdit === '완료'? 'hide' : 'show'">{{index + 1}}</span>
          <span class="delete" v-bind:class="playlistEdit === '완료'? 'show' : 'hide'" @click.stop="editPlaylist(index)">X</span>
        </div>
        <div class="img-area">
          <img v-bind:src="item.user.avatar_url">
        </div>
        <div class="title-area">
          <span class="title">{{item.title}}</span>
        </div>
        <div class="setting-area">
          <a @click.stop="onClickSettingButton({url:item.permalink_url, index: index})"><i class="fas fa-ellipsis-v"></i></a>
        </div>
      </li>
    </ul>
    </div>
</div>
<div v-else>
<div class="track-title-form-area">
  <form @submit.prevent="onSubmitAddTrackBtn">
  <input type="text" :value="trackTitle" @input="updateTrackTitle" placeholder="트랙 타이틀을 입력해주세요">
  <button type="submit">등록</button>
  </form>
</div>
</div>
</template>
<script>

import { mapState } from 'vuex';
export default {
  computed: mapState({
    playerIndex: state => state.footerPlayer.index,
    playlistEdit: state => state.playlistEdit,
    data: state => state.playlistData,
    trackTitle: state => state.user.title
  }),
  methods: {
    onClickSettingButton: function ({url, index}) {
      this.$store.dispatch('showSettingModal', {url, index});
    },
    onClickOwnListElement: function (index) {
      this.$store.dispatch('getPlayerURL', index);
    },
    editPlaylist: function (index) {
      this.$store.dispatch('editPlaylist', index);
    },
    onSubmitAddTrackBtn: function () {
      this.$store.dispatch('addUserTrack');
    },
    updateTrackTitle: function (ev) {
      this.$store.dispatch('updateTrackTitle', ev.target.value);
    }
  }
}
</script>
<style>
.own-list-area {
  position: absolute;
  top: 218px;
  overflow-y: scroll;
  height: 61vh;
  width: 100%;
}
.own-list>li {
  box-sizing: border-box;
  display: block;
  padding: 15px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.own-list div {
  display: inline-block;
}
.own-list .numbar-area {
  float: left;
  width: 25px;
  text-align: center;
}
.own-list .numbar-area .number {
  color: darkgray;
  position: relative;
  top: 3px;
}
.own-list .numbar-area .delete {
  color: darkgray;
  position: relative;
  top: 3px;
}
.show {
  display: block;
}
.hide {
  display: none;
}
.own-list .img-area {
  width: 50px;
  height: 25px;
  text-align: center;
  float: left;
}
.own-list div>img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
.own-list .title-area {
  width: 70%;
}
.own-list .title-area .title {
  font-weight: 400;
  font-size: 0.8rem;
}
.setting-area {
  font-size: 0.8rem;
  color: darkgray;
  cursor: pointer;
  float: right;
  width: 4%;
}
.nowPlaying {
  background: lightgray;
}
@media only screen
  and (min-device-width: 320px)
  and (max-device-width: 568px)
  and (-webkit-min-device-pixel-ratio: 2) {
.own-list-area {
    height: 47vh;
  }
}
@media only screen
  and (min-device-width: 375px)
  and (max-device-width: 667px)
  and (-webkit-min-device-pixel-ratio: 2) {
.own-list-area {
    height: 55vh;
  }
}
@media only screen
  and (min-device-width: 414px)
  and (max-device-width: 736px)
  and (-webkit-min-device-pixel-ratio: 3) {
.own-list-area {
    height: 60vh;
  }
}
@media only screen
  and (min-device-width: 375px)
  and (max-device-width: 667px)
  and (min-device-height: 812px)
  and (-webkit-min-device-pixel-ratio: 2) {
.own-list-area {
    height: 63.5vh;
  }
}
.track-title-form-area {
  text-align: center;
  padding: 10px;
}
.track-title-form-area input {
  width: 90%;
  margin: 0 auto;
  border-radius: 5px;
}
.track-title-form-area button {
  margin: 15px 0 15px 0;
  padding: 10px 15px;
  width: 90%;
  border: none;
  background: #E95325;
  color: #fff;
  font-size: 1rem;
  border-radius: 5px;
  font-weight: 100;
  letter-spacing: 5px;
}
</style>
