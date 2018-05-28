<template>
  <div class="my-playlist-btn-area">
    <div class="my-playlist-btn-edit">
      <button @click="onClickButton">{{playlistEditName}}</button>
    </div>
    <div class="my-playlist-btn-logout">
      <button @click="onClickLogout">로그아웃</button>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    playlistEditName() {
      return this.$store.state.playlistEdit;
    }
  },
  methods: {
    onClickButton: function () {
      this.$store.dispatch('togglePlaylistEdit');
    },
    onClickLogout: function () {
      localStorage.clear();
      this.$router.replace('/');
      this.$store.dispatch('allClear');
      alert('로그아웃 성공!');
    }
  }
}
</script>
<style>
.my-playlist-btn-area {
    display: inline-block;
    height: 100%;
    width: 40%;
    float: right;
    padding: 3px 10px;
    text-align: center;
}
.my-playlist-btn-area button {
  padding: 5px 10px;
  border: none;
  background: #E95325;
  color: white;
  border-radius: 5px;
  font-weight: 100;
  font-size: 0.4rem;
}
.my-playlist-btn-edit {
  display: inline-block;
  width: 35%;
  float: left;
}
.my-playlist-btn-logout {
  display: inline-block;
  width: 65%;
}
</style>

