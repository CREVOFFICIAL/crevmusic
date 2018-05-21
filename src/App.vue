<template>
<div>
  <header>
    <h2 class="container">CREV MUSIC</h2>
  </header>
  <div class="container">
    <search-form></search-form>
  </div>
  <div class="content">
    <div v-if="submitted">
      <search-result-list></search-result-list>
      <div v-if="selectedItem">
        <div class="list-btn-area"  @click="onClickAddListButton">
          <a class="btn">리스트 추가({{selectedItem}}개)</a>
        </div>
      </div>
      <preview-player-modal v-if="showPreviewPlayer !== null"></preview-player-modal>
      <add-list-modal v-if="showAddListModal"></add-list-modal>
    </div>
    <div v-else>
      <tabs v-bind:selectedTab="selectedTab"></tabs>
      <div v-if="selectedTab === '추천 리스트'">
        <recommend-playlist v-bind:class="showRecommendPlaylist ? 'hide' : 'show'"></recommend-playlist>
        <div class="playlist-description-area" v-if="showRecommendPlaylist">
          <playlist-title></playlist-title>
          <recommend-playlist-button></recommend-playlist-button>
        </div>
        <playlist v-if="showRecommendPlaylist"></playlist>
        <footer-player v-if="showRecommendPlaylist"></footer-player>
        <setting-modal v-if="showSettingModal"></setting-modal>
      </div>
      <div v-else>
        <div class="playlist-description-area">
          <playlist-title></playlist-title>
          <my-playlist-button v-if="showMyPlaylist"></my-playlist-button>
        </div>
        <playlist v-if="showMyPlaylist"></playlist>
        <footer-player v-if="showMyPlaylist"></footer-player>
        <setting-modal v-if="showSettingModal"></setting-modal>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import FormComponent from './components/FormComponent.vue';
import SearchResultListComponent from './components/SearchResultListComponent.vue';
import TabComponent from './components/TabComponent.vue';
import RecommendListComponent from './components/RecommendListComponent.vue';
import PreviewPlayerModalComponent from './components/PreviewPlayerModalComponent.vue';
import AddListModalComponent from './components/AddSearchResultListModalComponent.vue';
import PlayListComponent from './components/PlaylistComponent.vue';
import FooterPlayerComponent from './components/FooterPlayerComponent.vue';
import SettingModalComponent from './components/SettingModalComponent.vue';
import PlaylistTitleComponent from './components/PlaylistTitleComponent.vue';
import MyPlaylistButtonComponent from './components/MyPlaylistButtonComponent.vue';
import RecommendPlaylistButtonComponent from './components/RecommendPlaylistButtonComponent.vue';

import { mapState } from 'vuex';

export default {
  name: 'app',
  created() {
    this.$store.dispatch('getRecommendData');
  },
  computed: mapState({
    submitted: state => state.submitted,
    selectedItem: state => state.searchResult.selectedData.length,
    selectedTab: state => state.tab.selected,
    showPreviewPlayer: state => state.previewPlayerModal.index,
    showAddListModal: state => state.show.addListModal,
    showSettingModal: state => state.show.settingModal,
    playlistData: state => state.playlistData,
    showRecommendPlaylist: state => state.show.recommendPlaylist,
    showMyPlaylist: state => state.show.myPlaylist
  }),
  components: {
    'search-form': FormComponent,
    'search-result-list': SearchResultListComponent,
    'tabs': TabComponent,
    'recommend-playlist': RecommendListComponent,
    'playlist': PlayListComponent,
    'my-playlist-button': MyPlaylistButtonComponent,
    'preview-player-modal': PreviewPlayerModalComponent,
    'add-list-modal': AddListModalComponent,
    'footer-player': FooterPlayerComponent,
    'setting-modal': SettingModalComponent,
    'playlist-title': PlaylistTitleComponent,
    'recommend-playlist-button': RecommendPlaylistButtonComponent
  },
  methods: {
    onClickAddListButton: function () {
      this.$store.dispatch('clickAddListButton');
    }
  }
};
</script>
<style>
.playlist-description-area {
  height: 35px;
  border-bottom: 1px solid #ccc;
}
</style>
