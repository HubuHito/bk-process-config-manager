<template>
  <component
    :class="['auth-box', extCls, { 'auth-box-disabled': !authorized }]"
    :is="tag"
    v-cursor="{
      active: !authorized,
    }"
    @click.stop="handleAuthApplication"
  >
    <slot :disabled="!authorized" class="diabled-auth"></slot>
  </component>
</template>

<script>
import { $on, $off, $once, $emit } from '../../utils/gogocodeTransfer'
export default {
  name: 'AuthTag',
  props: {
    tag: {
      type: String,
      default: 'span',
    },
    // 是否有权限
    authorized: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      default: '',
    },
    // 权限类型
    type: {
      type: String,
      default: 'action', // biz
    },
    // 业务id | 特殊类型的id
    id: {
      type: String,
      default: '',
    },
    extCls: {
      type: String,
      default: '',
    },
    autoEmit: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['show-permission-modal', 'click'],
  computed: {
    // 是否已授权
    isAuthorized() {
      return this.auth.permission
    },
  },
  methods: {
    handleAuthApplication() {
      if (!this.authorized) {
        $emit(window.bus, 'show-permission-modal', {
          trigger: 'click',
          params: {
            action: this.action,
            type: this.type,
            id: this.id,
          },
        })
      }
      if (this.authorized || this.autoEmit) {
        $emit(this, 'click', this.authorized)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.auth-box {
  display: inline-block;
}
.auth-box-disabled {
  color: #dcdee5;
}
</style>
