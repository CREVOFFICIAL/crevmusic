<template>
  <div v-if="listData.length">
    <div class="list-play">
      <div>
        <button>플레이</button>
      </div>
      <div>
        <button>삭제</button>
      </div>
      <div>
        <button>초기화</button>
      </div>
    </div>
    <div class="own-list-area">
    <ul class="own-list">
      <li v-for="(item, index) in listData" :key="index">
        <div class="numbar-area">
          <span class="number">{{index + 1}}</span>
        </div>
        <div class="img-area">
          <img v-bind:src="item.user.avatar_url">
        </div>
        <div class="title-area">
          <span class="title">{{item.title}}</span>
        </div>
      </li>
    </ul>
    </div>
  </div>
  <div v-else>
    <span>추천 리스트가 없습니다</span>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: mapState({
    listData: state => state.ownListData
  })
}
</script>
<style>
.own-list-area {
  position: absolute;
  top: 230px;
  overflow-y: scroll;
  height: 100%;
  max-height: 65%;
  width: 100%;
}
.own-list>li {
  box-sizing: border-box;
  display: block;
  padding: 15px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.own-list div {
  display: inline-block;
}
.own-list .numbar-area {
  float: left;
  width: 25px;
  text-align: center;
}
.own-list .numbar-area .number {
  color: darkgray;
  position: relative;
  top: 3px;
}
.own-list .img-area {
  width: 50px;
  height: 25px;
  text-align: center;
  float: left;
}
.own-list div>img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
.own-list .title-area {
  width: 70%;
}
.own-list .title-area .title {
  font-weight: 400;
  font-size: 0.8rem;
}
.list-play {
  text-align: center;
  width: 100%;
}
.list-play>div {
  display: inline-block;
  width: 33.3333%;
  float: left;
}
.list-play>div>button {
  border: none;
  width: 80%;
  height: 30px;
  margin: 10px 10px 10px 5px;
  background: hotpink;
  border-radius: 5px;
  color: #fff;
  font-weight: 100;
  letter-spacing: 2px;
  cursor: pointer;
}
.own-list>li:nth-child(2n) {
  background: #D3D3D3;
}
</style>
