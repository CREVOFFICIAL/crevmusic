<template>
  <div v-if="resultData.length" class="result">
    <ul>
      <!-- :key="item.id"의 차이는..? -->
      <li v-for="item in resultData" :key="item.id" v-on:click="onClickList(item.id)">
        <div class="list-area">
          <div class="user-area">
            <img v-bind:src="item.user.avatar_url">
            <span>{{item.user.username}}</span>
          </div>
          <div class="track-area">
            <div class="player">
            <img v-bind:src="item.track.avatar_url">
            <div class="btns">
              <a href="#"><i class="fas fa-play-circle"></i></a>
            </div>
            </div>
            <div class="track-info">
                <div class="info">
                  <p class="artist">{{item.track.username}}</p>
                  <p class="title">{{item.track.title}}</p>
                </div>
              <div class="count">
                  <span><i class="fas fa-play"></i> {{item.count.playback}}</span>
                  <span><i class="fas fa-heart"></i> {{item.count.favoritings}}</span>
                  <span><i class="fas fa-redo-alt"></i> {{item.count.comment}}</span>
                </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div v-else>
    {{query}} 검색어로 찾을수 없습니다
  </div>
</template>
<script>
const tag = '[ResultComponent]';
export default {
  props: ['resultData', 'query'],
  data() {
    return {
    }
  },
  methods: {
    onClickList(id) {
      console.log(tag, 'onClickList()', id);
      this.$emit('@clickList', id);
    }
  }
}
</script>