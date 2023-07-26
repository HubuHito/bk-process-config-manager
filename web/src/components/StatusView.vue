<template>
  <div class="status-view-container">
    <svg v-if="type === 'loading'" class="svg-icon" aria-hidden="true">
      <use xlink:href="#gsekit-icon-loading"></use>
    </svg>
    <div v-else-if="isSolid" class="status-info">
      <span
        :class="{
          'outer-icon': true,
          'success-outer-col': type === 'success',
          'fail-outer-col': type === 'failed',
        }"
      >
        <i class="inner-icon"></i>
      </span>
    </div>
    <div v-else class="status-circle-container">
      <span
        :class="[
          'status-circle',
          {
            success: type === 'success',
            failed: type === 'failed',
            ignored: type === 'ignored',
          },
        ]"
      ></span>
    </div>
    <span class="loading-text" v-bk-overflow-tips>{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  type: String,
  text: String,
  isSolid: Boolean,
})
</script>

<style scoped>
.status-view-container {
  display: flex;
  align-items: center;
  .svg-icon,
  .status-circle-container {
    width: 16px;
    height: 16px;
  }

  .status-info {
    display: flex;
    align-items: center;

    .outer-icon {
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: #f0f1f5;
      margin-right: 9px;
      padding: 3px;
      flex-shrink: 0;

      &:hover {
        background: #dddee6;
      }

      .inner-icon {
        display: block;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background: #c4c6cc;
      }
    }

    .success-outer-col {
      background: #e5f6ea;

      &:hover {
        background: #d6e7da;
      }

      .inner-icon {
        background: #3fc06d;
      }
    }

    .fail-outer-col {
      background: #ffe6e6;

      &:hover {
        background: #f0d8d9;
      }

      .inner-icon {
        background: #ea3636;
      }
    }
  }

  .status-circle-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .status-circle {
      width: 8px;
      height: 8px;
      border-radius: 4px;

      &.success {
        border: 1px solid #3fc06d;
        background-color: #f5f6fa;
      }

      &.failed {
        border: 1px solid #ea3636;
        background-color: #fdd;
      }

      &.ignored {
        border: 1px solid #ff9c01;
        background-color: #f5f6fa;
      }
    }
  }

  .loading-text {
    margin-left: 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
