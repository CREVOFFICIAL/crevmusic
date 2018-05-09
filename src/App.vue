<template>
<div>
  <header>
    <h2 class="container">CREV MUSIC</h2>
  </header>
  <div class="container">
    <search-form v-bind:value="query" v-on:@submit="onSubmit"
          v-on:@reset="onReset"></search-form>
  </div>
  <div class="content">
    <div v-if="submitted">
      <search-result v-bind:resultData="searchResult" v-bind:query="query" v-on:@clickList="onClickList"></search-result>
    </div>
    <div v-else>
      <tabs v-bind:tabs="tabs" v-bind:selected-tab="selectedTab" v-on:@change="onClickTab"></tabs>
      <div v-if="selectedTab === tabs[0]">
        <list v-bind:listData="recommend" type="recommend"></list>
      </div>
      <div v-else>
        <list v-bind:listData="own" type="own"></list>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import FormComponent from './components/FormComponent.vue';
import ResultComponent from './components/ResultComponent.vue';
import TabComponent from './components/TabComponent.vue';
import ListComponent from './components/ListComponent.vue';

import SearchModel from '../models/SearchModel.js';
import ListModel from '../models/ListModel.js';

export default {
  name: 'app',
  data () {
    return {
      query: '',
      submitted: false,
      tabs: ['추천 리스트', '나의 리스트'],
      selectedTab: '',
      recommend: [],
      own: [],
      searchResult: [],
      selectedList: []
    };
  },
  created() {
    this.selectedTab = this.tabs[0];
    this.fetchRecommend();
  },
  components: {
    'search-form': FormComponent,
    'search-result': ResultComponent,
    'tabs': TabComponent,
    'list': ListComponent
  },
  methods: {
    onSubmit(query) {
      this.query = query;
      this.search();
    },
    onReset(e) {
      this.resetForm();
    },
    onClickTab(tab) {
      this.selectedTab = tab;
    },
    onClickList(id) {
      this.find(id);
    },
    search() {
      SearchModel.list().then(data => {
        this.submitted = true;
        this.searchResult = data;
      });
    },
    find(id) {
      this.searchResult.forEach(function(item) {
        if(item.id === id) {
          this.selectedList.push({
            count: item.count,
            id: item.id,
            track: item.track,
            user: item.user
          });
        }
      });
      console.log(this.selectedList);
    },
    resetForm() {
      this.query = '';
      this.submitted = false;
      this.searchResult = [];
    },
    fetchRecommend() {
      ListModel.list().then(data => {
        this.recommend = data;
      });
    }
  }
};
</script>
