<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-setting-container">

          <div class="modal-setting-body">
            <slot name="body">
             <ul>
               <li @click="onClickInfoSettingModal">노래정보</li>
               <li @click="onClickCloseSettingModal">닫기</li>
             </ul>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  methods: {
    onClickCloseSettingModal: function () {
      this.$store.dispatch('closeSettingModal');
    },
    onClickInfoSettingModal: function () {
      this.$store.dispatch('openBrower');
    }
  }
}
</script>
<style>
.modal-setting-container {
  width: 200px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
}
.modal-setting-body {
  padding: 30px;
}
.modal-setting-body li {
  padding: 10px;
  letter-spacing: 5px;
}
.modal-setting-body li:nth-child(2n) {
  border-top: 1px solid #ccc;
}
</style>
