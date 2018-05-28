<template>
<div>
  <div class="playlist-description-area">
    <playlist-title></playlist-title>
    <recommend-playlist-button></recommend-playlist-button>
  </div>
  <playlist></playlist>
  <footer-player></footer-player>
  <setting-modal v-if="showSettingModal"></setting-modal>
</div>
</template>
<script>
import PlayListComponent from '../components/PlaylistComponent.vue';
import FooterPlayerComponent from '../components/FooterPlayerComponent.vue';
import PlaylistTitleComponent from '../components/PlaylistTitleComponent.vue';
import SettingModalComponent from '../components/SettingModalComponent.vue';
import RecommendPlaylistButtonComponent from '../components/RecommendPlaylistButtonComponent.vue';

import { mapState } from 'vuex';
export default {
  created() {
    this.$store.dispatch('setRecommendPlaylist');
  },
  components: {
    'playlist': PlayListComponent,
    'footer-player': FooterPlayerComponent,
    'setting-modal': SettingModalComponent,
    'playlist-title': PlaylistTitleComponent,
    'recommend-playlist-button': RecommendPlaylistButtonComponent
  },
  computed: mapState({
    showSettingModal: state => state.show.settingModal
  })
}
</script>

