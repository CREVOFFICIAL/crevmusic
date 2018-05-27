<template>
  <div class="recommend-playlist-btn-area">
    <button @click="onClickButton">뒤로</button>
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
      this.$router.back();
    }
  }
}
</script>
<style>
.recommend-playlist-btn-area {
  display: inline-block;
  height: 100%;
  width: 15%;
  float: right;
  padding: 3px 9px;
}
.recommend-playlist-btn-area>button {
  padding: 5px 10px;
  border: none;
  background: #E95325;
  color: white;
  border-radius: 5px;
  font-weight: 100;
  font-size: 0.4rem;
}
</style>

