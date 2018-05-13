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
    tabList: state => state.tabList
  }),
  methods: {
    onClickTab(tabName) {
      this.$store.commit('onClickTab', tabName);
    }
  }
}
</script>
