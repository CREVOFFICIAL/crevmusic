<template id="list">
  <div v-if="listData.length">
    <ul class="list">
      <li v-for="(item, index) in listData" :key="index"
          v-on:click="onClickList()">
        <span class="number">{{index + 1}}</span>
        {{item.title}}
        <span class="date">{{item.date}}</span>
      </li>
    </ul>
  </div>
  <div v-else>
    <span>추천 검색어가 없습니다</span>
  </div>
</template>
<script>
export default {
  props: ['listData'],
  data() {
    return{

    }
  },
  methods: {
    onClickList() {

    }
  }
};
</script>
