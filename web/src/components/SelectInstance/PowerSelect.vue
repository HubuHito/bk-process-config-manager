<template>
  <bk-select
    :model-value="value"
    :placeholder="$t('全部') + name + '（*）'"
    :popover-min-width="160"
    :list="list"
    multiple
    filterable
    display-key="name"
    id-key="id"
    :enable-virtual-render="list.length > 50"
    @change="handleChange"
  >
  </bk-select>
  <!--<bk-select :value="value"
                                                          :placeholder="name"
                                                          :clearable="false"
                                                          :popover-min-width="160"
                                                          multiple
                                                          searchable
                                                          @selected="handleChange">
                                                          <bk-option id="*" :name="$t('全部') + name + '（*）'"></bk-option>
                                                          <template v-for="item in list">
                                                            <bk-option :key="item.id" :id="item.id" :name="item.name">
                                                              <div class="bk-option-content-default king-option-container">
                                                                <i class="bk-option-icon bk-icon icon-check-1" v-if="value.includes(item.id)"></i>
                                                                <div v-bk-overflow-tips="{ placement: 'right', content: item.name }" class="bk-option-name">
                                                                  {{ item.name }}
                                                                </div>
                                                              </div>
                                                            </bk-option>
                                                          </template>
                                                        </bk-select>-->
</template>

<script>
import { $on, $off, $once, $emit } from '../../utils/gogocodeTransfer'
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
  },
  emits: ['change', 'selected', 'update:value'],
  methods: {
    handleChange(val) {
      this.handleSelected(val)
      $emit(this, 'change', val)
    },
    handleSelected(value, option) {
      $emit(this, 'selected', value, option)
    },
  },
}
</script>
