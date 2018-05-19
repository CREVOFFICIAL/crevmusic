<template>
  <div class="own-list-description-area">
    <div class="own-list-description-title-area">
      <p>{{username}}님의 리스트 목록</p>
    </div>
    <div class="own-list-description-btn-area">
      <button @click="togglePlaylistEdit">{{playlistEditName}}</button>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    username() {
      return this.$store.state.user.name;
    },
    playlistEditName() {
      return this.$store.state.playlistEdit;
    }
  },
  methods: {
    //onclick같은 함수명 보단 무슨일이 발생했는지 알 수 있게 TOGGLE_PLAYLIST_EDIT와 같이 대문자로 사용하기
    togglePlaylistEdit: function () {
      this.$store.commit('togglePlaylistEdit');
    }
  }
}
</script>
<style>
.own-list-description-area {
  height: 35px;
  border-bottom: 1px solid #ccc;
}
.own-list-description-title-area {
  display: inline-block;
  height: 100%;
  width: 80%;
}
.own-list-description-title-area>p {
  padding: 5px 10px;
  font-size: 0.8rem;
  font-weight: 400;
}
.own-list-description-btn-area {
  display: inline-block;
  height: 100%;
  width: 15%;
  float: right;
  padding: 3px 9px;
}
.own-list-description-btn-area>button {
  padding: 5px 10px;
  border: none;
  background: hotpink;
  color: white;
  border-radius: 5px;
  font-weight: 100;
  font-size: 0.4rem;
}
</style>

