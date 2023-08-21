<template>
  <div class="button-content">
    <AuthTag action="manage_process" :authorized="authMap.manage_process">
      <template #default="{ disabled }">
        <bk-popover
          :disabled="disabled || !isAllowStart"
          :content="
            !isSelected ? $t('请先选择进程') : $t('进程运行中，无需启动')
          "
        >
          <bk-button
            class="operate-btn"
            v-test="'batchStart'"
            :disabled="disabled || isDataLoading || !isSelected || isAllowStart"
            theme="primary"
            :loading="isBtnLoading === 'start'"
            @click="operateProcess('start')"
          >
            {{ $t('启动') }}
          </bk-button>
        </bk-popover>
        <bk-popover
          :disabled="disabled || !isAllowStop"
          :content="!isSelected ? $t('请先选择进程') : $t('进程未运行')"
        >
          <bk-button
            class="operate-btn"
            v-test="'batchStop'"
            :disabled="disabled || isDataLoading || !isSelected || isAllowStop"
            :loading="isBtnLoading === 'stop'"
            @click="operateProcess('stop')"
          >
            {{ $t('停止') }}
          </bk-button>
        </bk-popover>
      </template>
    </AuthTag>
    <AuthTag action="operate_config" :authorized="authMap.operate_config">
      <template #default="{ disabled }">
        <bk-popover
          :disabled="disabled || !isAllowIssued"
          :content="
            !isSelected
              ? $t('请先选择进程')
              : $t('所选进程暂未关联配置文件，无法进行配置下发')
          "
        >
          <bk-button
            class="king-btn"
            v-test="'batchRelease'"
            :disabled="
              disabled || isDataLoading || !isSelected || isAllowIssued
            "
            @click="operateConfigDistribute"
          >
            {{ $t('配置下发') }}
          </bk-button>
        </bk-popover>
      </template>
    </AuthTag>
    <AuthTag
      v-if="!authMap.manage_process"
      action="manage_process"
      :authorized="false"
    >
      <bk-button disabled icon-right="icon-angle-down">
        {{ $t('更多') }}
      </bk-button>
    </AuthTag>
    <bk-popover
      v-else
      class="dot-menu"
      placement="bottom-start"
      :disabled="!isSelected"
      theme="dot-menu light"
      trigger="click"
      :arrow="false"
    >
      <bk-button
        v-test.common="'more'"
        icon-right="icon-angle-down"
        :disabled="isDataLoading || !isSelected"
      >
        {{ $t('更多') }}
      </bk-button>

      <template #content>
        <ul class="dot-menu-list">
          <li
            class="dot-menu-item"
            v-test.common="'moreItem'"
            v-for="item in jobAction.slice(2)"
            :test-key="item.type"
            :key="item.type"
            @click="operateProcess(item.type)"
          >
            {{ item.actionName }}
          </li>
        </ul>
      </template>
    </bk-popover>
    <div class="synchronous-btn">
      <bk-button
        v-test="'syncStatus'"
        icon="bk-icon icon-refresh"
        :loading="isSynchronousLoading"
        @click="synchronousProcess"
      >
        {{ $t('同步进程状态') }}
      </bk-button>
      <bk-popover
        ref="synchronousPopover"
        :class="{ disabled: isDataLoading }"
        placement="bottom-start"
        theme="dot-menu light"
        :disabled="isDataLoading"
        trigger="click"
        :arrow="false"
      >
        <div class="icon-btn">
          <i class="bk-icon icon-angle-down" v-test="'syncMore'"></i>
        </div>

        <template #content>
          <ul class="dot-menu-list">
            <li
              class="dot-menu-item"
              v-test.common="'moreItem'"
              @click="switchSynchronousText"
            >
              {{ $t('同步CMDB进程配置') }}
            </li>
          </ul>
        </template>
      </bk-popover>
    </div>
  </div>
</template>

<script>
import { $on, $off, $once, $emit } from '../../../utils/gogocodeTransfer'
import { mapState } from 'vuex'

export default {
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
    isBtnLoading: {
      type: String,
      default: '',
    },
    isSynchronousLoading: {
      type: Boolean,
      default: false,
    },
    jobAction: {
      type: Array,
      default() {
        return []
      },
    },
    isDataLoading: {
      type: Boolean,
      default: false,
    },
    isAllowIssued: {
      type: Boolean,
      default: false,
    },
    isSelectedAllPages: {
      type: Boolean,
      default: false,
    },
    isAllowStart: {
      type: Boolean,
      default: false,
    },
    isAllowStop: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['authMap']),
  },
  methods: {
    operateConfigDistribute() {
      $emit(this, 'operateConfigDistribute')
    },
    operateProcess(type) {
      $emit(this, 'operateProcess', type)
    },
    synchronousProcess() {
      $emit(this, 'synchronousProcess', 'status')
    },
    switchSynchronousText() {
      $emit(this, 'synchronousProcess', 'config')
      this.$refs.synchronousPopover.hide()
    },
  },
  emits: ['operateProcess', 'synchronousProcess', 'operateConfigDistribute'],
}
</script>

<style lang="postcss" scoped>
.button-content {
  position: relative;
  .bk-button {
    margin-right: 5px;
    min-width: 76px;
  }

  .king-btn {
    min-width: 86px;
  }

  .synchronous-btn {
    position: absolute;
    right: 0;
    top: 0;
    height: 32px;
    color: #63656e;
    font-size: 14px;
    display: flex;
    align-items: center;

    .bk-button {
      margin-right: 0;
      padding: 0 10px;
      border-radius: 2px 0px 0px 2px;
      margin-right: -1px;
      width: auto;

      &:hover {
        z-index: 10;
      }

      :deep(.bk-icon) {
        font-size: 16px;
        font-weight: 700;
        color: #979ba5;
        top: 0;
      }
    }

    .disabled {
      .icon-btn {
        cursor: not-allowed;
      }
    }

    .icon-btn {
      height: 32px;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      border: 1px solid #c4c6cc;
      border-radius: 0px 2px 2px 0px;
      cursor: pointer;

      &:hover {
        border-color: #979ba5;
      }
    }

    .bk-icon {
      display: inline-block;
      font-size: 20px;
      color: #979ba5;
      transform: rotate(0deg);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .tippy-active {
      .icon-btn {
        border-color: #3a84ff;

        .bk-icon {
          color: #3a84ff;
          transform: rotate(-180deg);
        }
      }
    }
  }
}
</style>
