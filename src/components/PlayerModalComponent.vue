<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <img v-bind:src="data.artwork_url">
              <span>{{data.user.username}}</span>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              {{data.title}}
              <audio ref="player" autoplay @timeupdate="timeUpdate" @canplaythrough="canplayHhrough">
                <source v-bind:src="url">
            </audio>
            	<div id="wrapper">
              <!--Audio Player Interface-->
              <div class="audioplayer">
                <button class="play" ref="playButton" @click="onClickPlayButton"></button>
                <div class="timeline" ref="timeline" @click="onClickTimeline($event)">
                  <div class="play-head" ref="playHead"></div>
                </div>
              </div>
            </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="onClose">
                닫기
              </button>
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
    onClickPlayButton: function () {
      this.$store.commit('onClickPlayButton');
    },
    onClickTimeline: function(ev) {
      this.$store.dispatch('onClickTimeline', ev);
    },
    timeUpdate: function () {
      this.$store.commit('timeUpdate');
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

.modal-default-button {
  float: right;
  background: hotpink;
  color: #fff;
  font-weight: 100;
  border: none;
  border-radius: 5px;
  padding: 5px
}
.timeline{
  width: 80%;
  max-width: 1000px;
  height: 5px;
	background: rgba(0,0,0,.3);
	margin-top: 20px;
	float: left;
	border-radius: 15px;
}
/*Grabable Playhead*/
.play-head{
	cursor: pointer;
	width: 15px;
	height: 15px;
	border-radius: 50%;
	margin-top: -5px;
	background: hotpink;
}
.audioplayer{
  width: 100%;
}
/* Play/Pause Button */
.play{
	/* height:60px;
	width: 60px;
	border: none;
	background-size: 50% 50%;
	background-repeat: no-repeat;
	background-position: center;
	float:left;
	outline:none; */
}
.pause{
  /* background: url('../img/pause.png'); */
}
</style>
