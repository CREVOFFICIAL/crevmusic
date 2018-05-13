<template>
  <div v-if="searchResult.length" class="result">
    <ul>
      <li v-for="(item, index) in searchResult" :key="index" @click="onClickList(item, $event)">
        <div class="list-area">
          <div class="user-area">
            <img v-bind:src="item.artwork_url">
            <span>{{item.user.username}}</span>
          </div>
          <div class="track-area">
            <div class="player">
            <img v-bind:src="item.user.avatar_url">
            <div class="btns">
              <a @click.stop="onClickPlayerModal(index, item.id)"><i class="fas fa-play-circle"></i></a>
            </div>
            </div>
            <div class="track-info">
                <div class="info">
                  <p class="artist">{{item.user.username}}</p>
                  <p class="title">{{item.title}}</p>
                </div>
              <div class="count">
                  <span><i class="fas fa-play"></i> {{item.playback_count}}</span>
                  <span><i class="fas fa-heart"></i> {{item.likes_count}}</span>
                  <span><i class="fas fa-redo-alt"></i> {{item.comment_count}}</span>
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
import { mapState } from 'vuex';
import { findClosestParentWithClass, toggleClassList } from '../utils/domUtils.js';

export default {
  computed: mapState({
    searchResult: state => state.searchResult
  }),
  methods: {
    onClickList: function (item, ev) {
      var targetEl = findClosestParentWithClass(ev.target, 'list-area');
      toggleClassList(targetEl, 'selected');
      this.$store.commit('selectedList', item);
    },
    onClickPlayerModal: function (index, id) {
      this.$store.commit('ClickedPlayerModal', {index, id});
    }
  }
}
</script>