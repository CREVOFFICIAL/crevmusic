<template>
  <div class="home">
    <div class="title">
      <h1 ref="homeTitle">CREV MUSIC</h1>
    </div>
    <div class="login">
      <a @click="onClickLogin"><img src="//mud-kage.kakao.com/14/dn/btqbjxsO6vP/KPiGpdnsubSq3a0PHEGUK1/o.jpg"/></a>
    </div>
  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex';
  export default {
    created() {
      Kakao.init('952d3b00b15f41ddb09b6a63a5131b86');
    },
    methods: {
      onClickLogin: function () {
        Kakao.Auth.login({
          success: (res) => {
            localStorage.setItem('token', res.access_token);
            Kakao.API.request({
              url: '/v1/user/me',
              success: (res) => {
                this.$store.dispatch('setUserObject', {data: res});
                this.$router.replace('/login');
              },
              fail: (error) => {
                alert(JSON.stringify(error));
              }
            });
          },
          fail: (err) => {
            alert(JSON.stringify(err));
          }
        });
      },
      handleHomeTitle: function () {
        var that = this;
        var dataText = [ "CREV MUSIC", "데스크탑    싫어요ㅠ_ㅠ", "모바일   좋아요^_^", "creative developers"];
        function typeWriter(text, i, fnCallback) {
          if (i < (text.length)) {
          if(typeof that.$refs.homeTitle !== 'undefined') {
            that.$refs.homeTitle.innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
          }
            setTimeout(function() {
              typeWriter(text, i + 1, fnCallback)
            }, 100);
          } else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 700);
          }
        }

        function StartTextAnimation(i) {
          if (typeof dataText[i] == 'undefined') {
              setTimeout(function() {
                StartTextAnimation(0);
              }, 5000);
          } else {
            if (i < dataText[i].length) {
              typeWriter(dataText[i], 0, function(){
                StartTextAnimation(i + 1);
              });
            }
          }
        }
        StartTextAnimation(0);
      }
    },
    mounted() {
      window.addEventListener('load', this.handleHomeTitle);
    },
    destroyed() {
      Kakao.cleanup();
    }
  }
</script>
<style>
.home {
  position: fixed;
  background-color: #E95325;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.home>.title {
  width: 100%;
  height: 30%;
}
.title h1 {
  font-size: 32px;
  color: white;
  text-align: center;
  position: relative;
  top: 100px;
}
.title span {
  border-right: .05em solid;
  animation: caret 1s steps(1) infinite;
}

.login>a>img {
  width: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@keyframes caret {
  50% {
    border-color: transparent;
  }
}

</style>