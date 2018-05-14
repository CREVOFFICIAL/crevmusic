<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <img v-bind:src="data.user.avatar_url">
              <span>{{data.user.username}}</span>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              {{data.title}}
              <audio ref="player" autoplay loop @timeupdate="previewTimeUpdate" @canplaythrough="canplayHhrough">
                <source v-bind:src="url">
            </audio>
            	<div class="wrapper">
              <!--Audio Player Interface-->
              <div class="audio-player">
                <div class="timeline" ref="timeline" @click="onClickTimeline($event)">
                  <div class="play-head" ref="playHead"></div>
                </div>
              </div>
            </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <div>
              <button class="modal-default-button" @click="onClose">
                닫기
              </button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  created() {
    this.$store.dispatch('getPreviewURL');
  },
  mounted() {
    this.$watch('url', () => {
        this.$refs.player.load()
    });
    this.$store.commit('updatePlayerObject', this.$refs);
  },
  computed:{
    data() {
      return this.$store.getters.getPlayerModalData;
    },
    url() {
      return this.$store.state.playerModalDataURL;
    }
  },
  methods: {
    onClose: function () {
      this.$store.commit('onClose');
    },
    onClickTimeline: function(ev) {
      this.$store.dispatch('onClickTimeline', ev);
    },
    previewTimeUpdate: function () {
      this.$store.commit('previewTimeUpdate');
    },
    canplayHhrough: function () {
      this.$store.commit('canplayHhrough');
    }
  }
}
</script>
<style>
.modal-header {
  margin-top: 0;
  font-size: 1rem;
}
.modal-header img {
  width: 30px;
  height: 30px;
}
.modal-header span {
  position: relative;
  top: -8px;
}
.modal-body {
  margin: 10px 0;
  font-size: 0.8rem;
}
.modal-footer div {
  width: 20%;
  float: right;
}

.modal-default-button {
  float: right;
  background: hotpink;
  color: #fff;
  font-weight: 100;
  border: none;
  border-radius: 5px;
  padding: 5px;
  position: relative;
  top: -5px;
}
.audio-player .timeline{
  width: 100%;
  max-width: 1000px;
  height: 2px;
  background: rgba(0,0,0,.3);
  margin-top: 15px;
  float: left;
  border-radius: 15px;
}
/*Grabable Playhead*/
.audio-player .play-head{
  cursor: pointer;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: -4px;
  background: hotpink;
}
.wrapper {
  width: 80%;
  height: 100%;
}
.audio-player{
  position: relative;
  left: -5px;
  top: 0;
  bottom: 0;
}


/* 플레이어 버튼 만들때 사용할 css와 html */
.audio-player .play-button{
	height: 30px;
	width: 30px;
	border: none;
	float:left;
}
/* Play/Pause Button */
.play{
	background: url('https://raw.githubusercontent.com/alexanderkatz/HTML5-Audio/master/img/play.png');
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
}
.pause{
  background: url('https://raw.githubusercontent.com/alexanderkatz/HTML5-Audio/master/img/pause.png');
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
}
/* <button class="pause play-button" ref="playButton" @click="onClickPlayButton"></button> */
</style>
