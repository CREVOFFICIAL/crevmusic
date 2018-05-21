<template>
  <div class="my-playlist-btn-area">
    <button @click="onClickButton">{{playlistEditName}}</button>
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
    }
  }
}
</script>
<style>
.my-playlist-btn-area {
  display: inline-block;
  height: 100%;
  width: 15%;
  float: right;
  padding: 3px 9px;
}
.my-playlist-btn-area>button {
  padding: 5px 10px;
  border: none;
  background: hotpink;
  color: white;
  border-radius: 5px;
  font-weight: 100;
  font-size: 0.4rem;
}
</style>

