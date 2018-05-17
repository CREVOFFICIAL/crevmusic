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
      <div v-if="showAddListButton">
        <div class="list-btn-area"  @click="onClickAddListButton">
          <a class="btn">리스트 추가</a>
        </div>
      </div>
      <player-modal v-if="showPlayerModal !== null"></player-modal>
      <add-list-modal v-if="showAddListModal"></add-list-modal>
    </div>
    <div v-else>
      <tabs v-bind:selectedTab="selectedTab"></tabs>
      <div v-if="selectedTab === '추천 리스트'">
        <recommend-list></recommend-list>
      </div>
      <div v-else>
        <own-list></own-list>
        <footer-player></footer-player>
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

import { mapState } from 'vuex';

export default {
  name: 'app',
  computed: mapState({
    submitted: state => state.submitted,
    showAddListButton: state => state.selectedSearchResultItem.length,
    selectedTab: state => state.selectedTab,
    showPlayerModal: state => state.playerModalDataIndex,
    showAddListModal: state => state.showAddList
  }),
  components: {
    'search-form': FormComponent,
    'search-result-list': SearchResultListComponent,
    'tabs': TabComponent,
    'recommend-list': RecommendListComponent,
    'own-list': OwnListComponent,
    'player-modal': PlayerModalComponent,
    'add-list-modal': AddListModalComponent,
    'footer-player': FooterPlayerComponent
  },
  methods: {
    onClickAddListButton: function() {
      this.$store.commit('onClickAddListButton');
    }
  }
};
</script>
