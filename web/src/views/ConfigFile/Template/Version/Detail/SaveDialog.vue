<template>
  <bk-dialog
    :isShow="show"
    :title="$t('保存确认')"
    :quick-close="false"
    width="480"
    header-position="left"
    @value-change="handleValueChange"
  >
    <div class="save-dialog-content">
      <div class="version-description">
        <div class="title">
          {{ $t('版本描述') }}
          <span class="star">*</span>
        </div>
        <bk-input
          v-model.trim="versionDescription"
          ref="inputRef"
          type="textarea"
          :clearable="true"
          :maxlength="100"
          :class="isError && 'is-error-input'"
          @blur="isError = !versionDescription"
          @focus="isError = false"
        ></bk-input>
        <div v-if="isError" class="is-error-text">
          {{ $t('版本描述不能为空') }}
        </div>
      </div>
    </div>
    <template #footer>
      <div class="footer-wrapper">
        <bk-button
          theme="primary"
          :loading="loading"
          :disabled="isError"
          @click="handleConfirm"
        >
          {{ $t('确定') }}
        </bk-button>
        <bk-button @click="handleCancel">
          {{ $t('取消') }}
        </bk-button>
      </div>
    </template>
  </bk-dialog>
</template>

<script>
import { $on, $off, $once, $emit } from '../../../../../utils/gogocodeTransfer'
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:show', 'confirm'],
  data() {
    return {
      isError: false,
      versionDescription: '',
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.versionDescription = ''
        setTimeout(() => {
          this.$refs.inputRef.$el.querySelector('textarea').focus()
        }, 100)
      }
    },
  },
  methods: {
    handleValueChange(val) {
      $emit(this, 'update:show', val)
    },
    handleConfirm() {
      if (!this.isError) {
        $emit(this, 'confirm', this.versionDescription)
      }
    },
    handleCancel() {
      $emit(this, 'update:show', false)
    },
  },
}
</script>

<style lang="postcss" scoped>
@import '../../../../../css/variable.css';
.save-dialog-content {
  .version-description {
    position: relative;

    .title {
      margin: -12px 0 10px;
      font-size: 14px;
      color: $newBlackColor1;

      .star {
        color: $newRedColor;
      }
    }

    :deep(.is-error-input .bk-textarea-wrapper) {
      border-color: $newRedColor;
    }

    .is-error-text {
      position: absolute;
      font-size: 12px;
      color: $newRedColor;
    }
  }
}
</style>
