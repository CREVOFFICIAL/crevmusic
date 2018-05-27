<template>
  <ul class="tabs">
    <li v-for="tab in tabList" :key="tab" v-bind:class="{active: tab === selectedTab}"
    @click="onClickTab(tab)">
      {{tab}}
    </li>
  </ul>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: ['selectedTab'],
  computed: mapState({
    tabList: state => state.tab.list
  }),
  methods: {
    onClickTab(tabName) {
      if(tabName === '추천 리스트') {
        this.$store.dispatch('clickTab', tabName);
      } else {
        this.$store.dispatch('getMylistData', () => {
          this.$store.dispatch('clickTab', tabName);
          this.$router.replace('/main/list');
        });
      }
    }
  }
}
</script>
<style>
</style>

