<template>
  <form @submit.prevent="requestSearchData">
    <input type="text" :value="this.query" @input="updateQuery" placeholder="검색어를 입력하세요" autofocus>
    <button v-show="this.query.length" @click="onReset" type="reset" class="btn-reset"></button>
  </form>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: mapState({
    query: state => state.query
  }),
  methods: {
    updateQuery(ev) {
      this.$store.commit('updateQuery', ev.target.value);
    },
    requestSearchData() {
      this.$store.dispatch('requestSearchData');
    },
    onReset() {
      this.$store.commit('onReset');
    }
  }
}
</script>
