<template>
  <div v-if="data.length">
    <ul class="list">
      <li class="recommend-list" @click="onClickList(item, index)" v-for="(item, index) in data" :key="index">
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
    this.$store.dispatch('getRecommendData');
  },
  computed: mapState({
    data: state => state.recommendData
  }),
  methods: {
    onClickList: function (data, index) {
      this.$store.dispatch('getPlaylistData', {
        data: data.tracks,
        title: data.title,
        cb: () => {
          this.$router.push('list/'+index);
        }
      });
    }
  }
};
</script>
<style>
.fa-headphones {
  color: #E95325;
  margin-right: 5px;
}
.recommend-list {
  cursor: pointer;
}
</style>