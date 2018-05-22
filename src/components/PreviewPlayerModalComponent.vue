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
              <audio ref="player" autoplay loop played @timeupdate="timeUpdate" @canplaythrough="canplayHhrough">
                <source v-bind:src="url">
            </audio>
              <!--Audio Player Interface-->
              <div class="audio-player">
                <div class="player-time">
                <span>
                  {{playingTime}} / {{totalTime}}
                </span>
                </div>
                <div class="player-timeline">
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
    this.$store.dispatch('updatePreviewPlayerObject', this.$refs);
  },
  computed:{
    data() {
      return this.$store.getters.getPlayerModalData;
    },
    url() {
      return this.$store.state.previewPlayerModal.url;
    },
    playingTime() {
      return this.$store.getters.playingTime;
    },
    totalTime() {
      return this.$store.getters.totalTime;
    }
  },
  methods: {
    onClose: function () {
      this.$store.dispatch('closePreviewPlayer');
    },
    onClickTimeline: function(ev) {
      this.$store.dispatch('updateTimeline', ev);
    },
    timeUpdate: function () {
      this.$store.dispatch('updatePlayerTime');
    },
    canplayHhrough: function () {
      this.$store.dispatch('getPlayerDuration');
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
  top: 2px;
  right: -25px;
  cursor: pointer;
}
.audio-player{
  position: relative;
  left: -5px;
  top: 0;
  bottom: 0;
}
.player-time {
  width: 25%;
  display: inline-block;
}
.player-time>span {
  font-size: 0.1rem;
}
.player-timeline {
  width: 73%;
  display: inline-block;
  cursor: pointer;
}
.player-timeline .timeline{
  width: 73%;
  height: 2px;
  background: rgba(0,0,0,.3);
  margin-top: 15px;
  float: left;
  border-radius: 15px;
}
/*Grabable Playhead*/
.player-timeline .play-head{
  cursor: pointer;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: -4px;
  background: hotpink;
}
</style>
