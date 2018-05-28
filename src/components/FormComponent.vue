<template>
  <form @submit.prevent="onSubmit(query)">
    <input type="text" :value="query" @input="updateQuery" placeholder="검색어를 입력하세요" autofocus>
    <button v-show="this.query.length" @click="onReset" type="reset" class="btn-reset"></button>
  </form>
</template>

<script>
import { mapState } from 'vuex';
export default {
  created() {
    this.$store.dispatch('getSearchResultData', this.$route.query.q);
  },
  computed: mapState({
    query: state => state.query
  }),
  methods: {
    updateQuery(ev) {
      this.$store.dispatch('updateQuery', ev.target.value);
      if(!ev.target.value.length) {
        this.$router.replace('/main/list');
      }
    },
    onSubmit(query) {
      this.$store.dispatch('getSearchResultData')
        .then(() => {
          this.$router.push(`/search?q=${query}`);
        });
    },
    onReset() {
      this.$store.dispatch('resetQuery');
      this.$router.replace('/main/list');
    }
  }
}
</script>
