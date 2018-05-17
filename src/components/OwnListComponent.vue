<template>
  <div v-if="listData.length">
    <div class="own-list-area">
    <ul class="own-list">
      <li v-for="(item, index) in listData" :key="index" v-bind:class="{nowPlaying: playerTitle === item.title}">
        <div class="numbar-area">
          <span class="number">{{index + 1}}</span>
        </div>
        <div class="img-area">
          <img v-bind:src="item.user.avatar_url">
        </div>
        <div class="title-area">
          <span class="title">{{item.title}}</span>
        </div>
        <div class="setting-area">
          <a @click="onClickSettingButton({url:item.permalink_url, index: index})"><i class="fas fa-ellipsis-v"></i></a>
        </div>
      </li>
    </ul>
    </div>
  </div>
  <div v-else>
    <span>나의 리스트가 없습니다</span>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: mapState({
    listData: state => state.ownListData,
    playerTitle: state => state.nowPlayingTitle.full
  }),
  methods: {
    onClickSettingButton: function ({url, index}) {
      this.$store.commit('onClickSettingButton', {url, index});
    }
  }
}
</script>
<style>
.own-list-area {
  position: absolute;
  top: 183px;
  overflow-y: scroll;
  height: 66vh;
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
  cursor: pointer;
  float: right;
  width: 5%;
};
.nowPlaying {
  background: lightgray;
}

@media only screen
  and (min-device-width: 320px)
  and (max-device-width: 568px)
  and (-webkit-min-device-pixel-ratio: 2) {
.own-list-area {
    height: 54vh;
  }
}
@media only screen
  and (min-device-width: 375px)
  and (max-device-width: 667px)
  and (-webkit-min-device-pixel-ratio: 2) {
.own-list-area {
    height: 61vh;
  }
}
@media only screen
  and (min-device-width: 414px)
  and (max-device-width: 736px)
  and (-webkit-min-device-pixel-ratio: 3) {
.own-list-area {
    height: 65vh;
  }
}
@media only screen
  and (min-device-width: 375px)
  and (max-device-width: 667px)
  and (min-device-height: 812px)
  and (-webkit-min-device-pixel-ratio: 2) {
.own-list-area {
    height: 67.5vh;
  }
}
</style>
