<template>
<div>
  <header>
      <h2 class="container">{{userName}}님! 반갑습니다.</h2>
  </header>
  <div class="container">
    <search-form></search-form>
  </div>
  <router-view></router-view>
</div>
</template>
<script>
import FormComponent from '../components/FormComponent.vue';
import { mapState } from 'vuex';
export default {
  computed: mapState({
    userName: state => state.user.name
  }),
  components: {
    'search-form': FormComponent
  }
}
</script>


