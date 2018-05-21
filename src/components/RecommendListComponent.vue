<template>
  <div v-if="data.length">
    <ul class="list">
      <li class="recommend-list" v-for="(item, index) in data" :key="index"
          @click="onClickList(item)">
        <i class="fas fa-headphones"></i>
        {{item.title}}
        <span class="date">{{item.date}}</span>
      </li>
    </ul>
  </div>
  <div v-else>
    <span>추천 리스트가 없습니다</span>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: mapState({
    data: state => state.recommendData
  }),
  methods: {
    onClickList: function (data) {
      this.$store.dispatch('getPlaylistData', {data: data.tracks, tabName: '추천 리스트', title: data.title});
    }
  }
};
</script>
<style>
.fa-headphones {
  color: hotpink;
  margin-right: 5px;
}
.recommend-list {
  cursor: pointer;
}
</style>