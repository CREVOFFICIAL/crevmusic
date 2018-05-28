<template>
  <div class="content">
    <div class="login-title">
      <p>본인 인증란</p>
    </div>
    <div class="login-area">
      <div>
        <img v-bind:src="user.img">
        <p>{{user.name}}</p>
      </div>
      <router-link :to="{path: '/main'}" class="submit">맞습니다</router-link>
      <router-link :to="{path: '/'}" class="cancel">아닙니다</router-link>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: mapState({
    user: state => state.user
  }),
  methods: {
    onClickLogin: function () {
      this.$router.replace('/main');
    },
    onClickCancel: function () {
      this.$router.go(-1);
    }
  }
}
</script>
<style>
.login-title {
  width: 100%;
  height: 100%;
  text-align: center;
}
.login-title>p {
  padding: 50px;
  font-size: 2rem;
  font-weight: 100;
}
.login-area {
  text-align: center;
}
.login-area div {
  margin: 0 auto;
  width: 50%;
  height: 100%;
  max-height: 225px;
  border: 1px solid;
  border-radius: 5px;
}
.login-area img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  padding: 10px;
  margin: 10px;
}
.login-area p {
  padding: 5px;
  font-size: 1.5rem;
}
.login-area .submit {
  width: 50%;
  border: none;
  background: #E95325;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 100;
  display: block;
  margin: 0 auto;
  position: relative;
  top: 10px;
  text-decoration: none;
}
.login-area .cancel {
  width: 50%;
  border: none;
  background: #E95325;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 100;
  display: block;
  position: relative;
  top: 20px;
  margin: 0 auto;
  text-decoration: none;
}
</style>
