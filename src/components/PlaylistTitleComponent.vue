<template>
  <div class="playlist-description-title-area">
    <p>{{title}}</p>
  </div>
</template>
<script>
export default {
  computed: {
    title() {
      return this.$store.state.playlistTitle;
    }
  }
}
</script>
<style>
.playlist-description-title-area {
  display: inline-block;
  height: 100%;
  width: 60%;
}
.playlist-description-title-area>p {
  padding: 5px 10px;
  font-size: 0.8rem;
  font-weight: 400;
}
</style>
