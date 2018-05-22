<template>
  <form @submit.prevent="onSubmit">
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
      this.$store.dispatch('updateQuery', ev.target.value);
    },
    onSubmit() {
      this.$store.dispatch('getSearchResultData');
    },
    onReset() {
      this.$store.dispatch('resetQuery');
    }
  }
}
</script>
