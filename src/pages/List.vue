<template>
  <div class="content">
    <tabs v-bind:selectedTab="selectedTab"></tabs>
      <div v-if="selectedTab === '추천 리스트'">
        <recommend-list v-bind:class="showRecommendPlaylist ? 'hide' : 'show'"></recommend-list>
        <router-view></router-view>
      </div>
      <div v-else>
        <div v-if="isTrack" class="playlist-description-area">
          <playlist-title></playlist-title>
          <my-playlist-button></my-playlist-button>
        </div>
        <playlist></playlist>
        <footer-player v-if="isTrack"></footer-player>
        <setting-modal v-if="showSettingModal"></setting-modal>
      </div>
    <div v-if="loading" class="loading">
      <img src="https://www.loading.io/spinners/bars/index.progress-bar-facebook-loader.svg">
    </div>
  </div>
</template>
<script>
import tabs from '../components/TabComponent.vue';
import RecommendListComponent from '../components/RecommendListComponent.vue';
import PlayListComponent from '../components/PlaylistComponent.vue';
import FooterPlayerComponent from '../components/FooterPlayerComponent.vue';
import PlaylistTitleComponent from '../components/PlaylistTitleComponent.vue';
import SettingModalComponent from '../components/SettingModalComponent.vue';
import MyPlaylistButtonComponent from '../components/MyPlaylistButtonComponent.vue';

import { mapState } from 'vuex';
export default {
  beforeRouteUpdate(to, from, next) {
    next();
  },
  watch: {
    '$route' (to, from) {
      if(to.path.split('/').length < from.path.split('/').length) {
        this.$store.dispatch('setRecommendPlaylist', false);
      } else {
        this.$store.dispatch('setRecommendPlaylist', true);
      }
    }
  },
  components: {
    'tabs': tabs,
    'recommend-list': RecommendListComponent,
    'playlist-title': PlaylistTitleComponent,
    'my-playlist-button': MyPlaylistButtonComponent,
    'playlist': PlayListComponent,
    'footer-player': FooterPlayerComponent,
    'setting-modal': SettingModalComponent
  },
  computed: mapState({
    selectedTab: state => state.tab.selected,
    loading: state => state.loading,
    showRecommendPlaylist: state => state.show.recommendPlaylist,
    showSettingModal: state => state.show.settingModal,
    isTrack: state => state.user.trackId
  })
}
</script>
<style>
.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
}
.loading>img {
  width: 20%;
  height: 20%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

