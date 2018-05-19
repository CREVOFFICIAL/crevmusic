<template>
  <div v-if="data.length">
    <ul class="list">
      <li v-for="(item, index) in data" :key="index"
          @click="onClickList">
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
  created() {
    this.$store.dispatch('requestRecommendChart');
  },
  computed: mapState({
    data: state => state.recommendListChart
  }),
  methods: {
    onClickList: function () {
      this.$store.dispatch('requestRecommendData');
    }
  }
};
</script>
<style>
.fa-headphones {
  color: hotpink;
  margin-right: 5px;
}
</style>