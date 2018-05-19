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
      <div v-if="selectedSearchItemLength">
        <div class="list-btn-area"  @click="onClickAddListButton">
          <a class="btn">리스트 추가({{selectedSearchItemLength}}개)</a>
        </div>
      </div>
      <player-modal v-if="showPlayerModal !== null"></player-modal>
      <add-list-modal v-if="showAddListModal"></add-list-modal>
    </div>
    <div v-else>
      <tabs v-bind:selectedTab="selectedTab"></tabs>
      <div v-if="selectedTab === '추천 리스트'">
        <recommend-list></recommend-list>
        <own-list v-if="recommendListData.length" v-bind:listData="recommendListData"></own-list>
      </div>
      <div v-else>
        <own-list-description v-if="showOwnListPlayer.length"></own-list-description>
        <own-list v-bind:listData="ownListData"></own-list>
        <footer-player v-if="showOwnListPlayer.length"></footer-player>
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
import PlayerModalComponent from './components/PlayerModalComponent.vue';
import AddListModalComponent from './components/AddSearchResultListModalComponent.vue';
import OwnListComponent from './components/OwnListComponent.vue';
import FooterPlayerComponent from './components/FooterPlayerComponent.vue';
import SettingModalComponent from './components/SettingModalComponent.vue';
import OwnListDescriptionComponent from './components/OwnListDescriptionComponent.vue';

import { mapState } from 'vuex';

export default {
  name: 'app',
  computed: mapState({
    submitted: state => state.submitted,
    selectedSearchItemLength: state => state.selectedSearchResultItem.length,
    selectedTab: state => state.selectedTab,
    showPlayerModal: state => state.playerModalDataIndex,
    showAddListModal: state => state.showAddList,
    showOwnListPlayer: state => state.ownListData,
    showSettingModal: state => state.showSettingModal,
    ownListData: state => state.ownListData,
    recommendListData: state => state.recommendListData
  }),
  components: {
    'search-form': FormComponent,
    'search-result-list': SearchResultListComponent,
    'tabs': TabComponent,
    'recommend-list': RecommendListComponent,
    'own-list': OwnListComponent,
    'player-modal': PlayerModalComponent,
    'add-list-modal': AddListModalComponent,
    'footer-player': FooterPlayerComponent,
    'setting-modal': SettingModalComponent,
    'own-list-description': OwnListDescriptionComponent
  },
  methods: {
    onClickAddListButton: function() {
      this.$store.commit('onClickAddListButton');
    }
  }
};
</script>
