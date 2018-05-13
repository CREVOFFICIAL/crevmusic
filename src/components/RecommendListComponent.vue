<template>
  <div v-if="listData.length">
    <ul class="list">
      <li v-for="(item, index) in listData" :key="index"
          @click="onClickList()">
        <span class="number">{{index + 1}}</span>
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
    this.$store.dispatch('requestRecommendData');
  },
  computed: mapState({
    listData: state => state.listData
  }),
  methods: {
    onClickList: function () {
    }
  }
};
</script>
