<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <span>리스트 추가</span>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
             총 {{item.length}} 개의 곡이 담겨있습니다.
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button> 취소 </button>
              <button> 추가 </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    item: state => state.selectedSearchResultItem
  })
};
</script>

<style>
.modal-header {
  margin-top: 0;
  font-size: 1.5rem;
  padding-left: 10px;
}
.modal-body {
  padding: 10px;
}
.modal-footer {
  text-align: center;
  width: 100%;
  border: none;
  border-radius: 5px;
}
.modal-footer button {
  width: 45%;
  height: 30px;
  border-radius: 5px;
  border: none;
  background: hotpink;
  color: #fff;
  font-weight: 100;
  font-size: 1.0rem;
  letter-spacing: 2px;
}
.modal-footer button:nth-child(1) {
  float: left;
}
</style>