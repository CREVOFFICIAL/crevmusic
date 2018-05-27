<template>
  <div class="footer-player-area">
      <div class="footer-player-btn">
        <a @click="onClickBackward(-1)"><i class="fas fa-step-backward"></i></a>
        <a @click="onClickPlayButton" class="play" ref="playElement" style="display: inline-block;"><i class="far fa-play-circle"></i></a>
        <a @click="onClickPlayButton" class="pause" ref="pauseElement"><i class="far fa-pause-circle"></i></a>
        <a @click="onClickForward(1)"><i class="fas fa-step-forward"></i></a>
      </div>
      <div class="footer-player-title">
        <span>
          {{title}}
        </span>
      </div>
      <div class="footer-player-timeline">
          <div class="footer-player-time">
            {{playingTime}}
          </div>
          <audio ref="player" @timeupdate="timeUpdate" @canplaythrough="canplayHhrough">
              <source v-bind:src="url">
          </audio>
          <div class="timeline" ref="timeline" @click="onClickTimeline($event)">
            <div class="play-head" ref="playHead"></div>
          </div>
          <div class="footer-player-time">
            {{totalTime}}
          </div>
      </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  beforeCreate() {
    this.$store.dispatch('getPlayerURL', 0);
  },
  mounted() {
    this.$watch('url', () => {
        this.$refs.player.load()
    });
    this.$store.dispatch('updatePlayerObject', this.$refs);
  },
  computed:{
    title() {
      return this.$store.state.footerPlayer.title;
    },
    url() {
      return this.$store.state.footerPlayer.url;
    },
    playingTime() {
      return this.$store.getters.playingTime;
    },
    totalTime() {
      return this.$store.getters.totalTime;
    }
  },
  methods: {
    onClickForward: function(value) {
      this.$store.dispatch('setPlayerIndex', value);
    },
    onClickPlayButton: function() {
      this.$store.dispatch('togglePlayerPlayButton');
    },
    onClickBackward: function(value) {
      this.$store.dispatch('setPlayerIndex', value);
    },
    timeUpdate: function () {
      this.$store.dispatch('updatePlayerTime');
    },
    canplayHhrough: function () {
      this.$store.dispatch('getPlayerDuration');
    },
    onClickTimeline: function(ev) {
      this.$store.dispatch('updateTimeline', ev);
    }
  }
}
</script>
<style>
.footer-player-area {
  position: fixed;
  width: 100%;
  height: 80px;
  background: #E95325;
  bottom: 0;
  padding: 5px;
  text-align: center;
}
.footer-player-btn {
  width: 100%;
}
.footer-player-btn .fas {
  font-size: 0.8rem;
  color: #fff;
  position: relative;
  top: -4px;
  padding: 0px 20px 0px 20px;
}
.footer-player-btn .pause {
  display: none;
}
.footer-player-btn .far {
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
}
.footer-player-title {
  width: 100%;
}
.footer-player-title>span {
  font-weight: 400;
  font-size: 0.8rem;
}
.footer-player-timeline {
  width: 100%;
}
.footer-player-timeline>.timeline {
  display: inline-block;
  width: 80%;
  height: 2px;
  background: rgba(0,0,0,.3);
  border-radius: 15px;
  margin: 0 auto;
}
.footer-player-timeline>.timeline>.play-head {
  position: relative;
  top: -4px;
  cursor: pointer;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
}
.footer-player-time {
  font-size:0.6rem;
  font-weight: 500;
  display: inline-block;
  position: relative;
  top: 2px;
}
</style>
