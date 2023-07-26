<template>
  <div class="cascade-panel">
    <bk-input
      :placeholder="$t('请输入关键字')"
      :left-icon="'bk-icon icon-search'"
      @change="onSeaechChange"
    >
    </bk-input>
    <ul v-if="list.length" class="cascade-panel-ul">
      <li
        :class="['bk-option-li', { 'is-selected': !selectId.length }]"
        v-if="environmentId === 'all'"
        @click.prevent.stop="handleAllSetItem"
      >
        {{ $t('全部') + name + $t('（*）') }}
      </li>
      <li class="bk-option-li" v-else @click.prevent.stop="handleAllSetItem">
        {{ $t('全部') + name }}
      </li>
      <li
        v-for="item in list"
        :key="item.id"
        v-show="item.isShow"
        :class="['bk-option-li', { 'is-selected': selectId.includes(item.id) }]"
        @click.prevent.stop="handleSelectItem(item)"
      >
        {{ item.name }}
        <i
          v-if="selectId.includes(item.id)"
          class="bk-icon icon-check-line"
        ></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { $on, $off, $once, $emit } from '../../utils/gogocodeTransfer'
export default {
  name: 'BkCaspanel',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    selectId: {
      type: Array,
      default: () => [],
    },
    environmentId: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  methods: {
    // 搜索
    onSeaechChange(val) {
      $emit(this, 'onSearch', val)
    },
    // 全部集群
    handleAllSetItem() {
      $emit(this, 'clickAllSetSelect')
    },
    // 单个集群
    handleSelectItem(val) {
      $emit(this, 'clickSetSelect', val)
    },
  },
  emits: ['onSearch', 'clickSetSelect', 'clickAllSetSelect'],
}
</script>

<style lang="postcss" scoped>
@import '../../css/mixins/scroll.css';
.cascade-panel {
  height: 100%;
  width: 248px;
  background-color: #fff;
  :deep(.bk-form-control) {
    line-height: 0;

    .bk-form-input {
      height: 32px;
      border: 0;
      border-radius: 0;
    }
  }

  .cascade-panel-ul {
    border-top: 1px solid #f0f1f5;
    height: 201px;
    overflow-y: auto;

    @mixin scroller;

    .bk-option-li {
      padding-left: 10px;
      color: #63656e;
      font-size: 12px;
      position: relative;
      cursor: pointer;

      &:hover {
        color: #3a84ff;
        background: #eaf3ff;
      }

      &.is-selected {
        color: #3a84ff;
        background-color: #f4f6fa;
      }

      .bk-icon {
        position: absolute;
        top: 6px;
        right: 9px;
        font-size: 20px;
        color: #3a84ff;
      }
    }
  }
}
</style>
