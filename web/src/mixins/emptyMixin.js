import { $on, $off, $once, $emit } from '../utils/gogocodeTransfer'
import * as Vue from 'vue'

const EmptyMixin = {
  methods: {
    emptySearchClear() {
      $emit(this, 'empty-clear')
    },
    emptyRefresh() {
      $emit(this, 'empty-refresh')
    },
  },
}

window.$vueApp.mixin(EmptyMixin)
