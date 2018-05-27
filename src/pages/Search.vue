<template>
<div class="content">
  <search-result-list></search-result-list>
  <div v-if="selectedItem">
    <div class="list-btn-area"  @click="onClickAddListButton">
      <a class="btn">리스트 추가({{selectedItem}}개)</a>
    </div>
  </div>
  <preview-player-modal v-if="showPreviewPlayer !== null"></preview-player-modal>
  <add-list-modal v-if="showAddListModal"></add-list-modal>
</div>
</template>
<script>
import SearchResultListComponent from '../components/SearchResultListComponent.vue';
import PreviewPlayerModalComponent from '../components/PreviewPlayerModalComponent.vue';
import AddListModalComponent from '../components/AddSearchResultListModalComponent.vue';

import { mapState } from 'vuex';

export default {
  computed: mapState({
    selectedItem: state => state.searchResult.selectedData.length,
    showPreviewPlayer: state => state.previewPlayerModal.index,
    showAddListModal: state => state.show.addListModal
  }),
  components: {
    'search-result-list': SearchResultListComponent,
    'preview-player-modal': PreviewPlayerModalComponent,
    'add-list-modal': AddListModalComponent
  },
  methods: {
    onClickAddListButton: function () {
      this.$store.dispatch('clickAddListButton');
    }
  }
}
</script>

