<template>
  <ul class="tabs">
    <li v-for="tab in tabs" :key="tab" v-bind:class="{active: tab === selectedTab}"
    v-on:click="onClickTab(tab)">
      {{tab}}
    </li>
  </ul>
</template>
<script>
const tag = '[TabComponent]';
export default {
  props: ['tabs', 'selected-tab'],
  data() {
    return {

    }
  },
  methods: {
    onClickTab(tab) {
      console.log(tag, 'onClickTab()', tab);
      this.$emit('@change', tab);
    }
  }
}
</script>
