<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <img v-bind:src="data.track.avatar_url">
              <span>{{data.track.username}}</span>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              {{data.track.title}}
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              progress bar
              <button class="modal-default-button" @click="onClose">
                닫기
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    data: 'getPlayerModalData'
  }),
  methods: {
    onClose: function () {
      this.$store.commit('onClose');
    }
  }
}
</script>
<style>
.modal-header {
  margin-top: 0;
  font-size: 1rem;
}
.modal-header img {
  width: 30px;
  height: 30px;
}
.modal-header span {
  position: relative;
  top: -8px;
}
.modal-body {
  margin: 10px 0;
  font-size: 0.8rem;
}

.modal-default-button {
  float: right;
  background: hotpink;
  color: #fff;
  font-weight: 100;
  border: none;
  border-radius: 5px;
  padding: 5px
}
</style>
