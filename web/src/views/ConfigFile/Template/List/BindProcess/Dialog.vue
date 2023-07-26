<template>
  <bk-dialog
    :value="showDialog"
    :mask-close="false"
    :position="{ top: dialogTop }"
    width="1000"
    ext-cls="create-template-dialog"
    header-position="left"
    @value-change="handleValueChange"
  >
    <template v-slot:header>
      <div class="bk-dialog-header-inner">
        {{ $t('关联进程') }}
        <span
          style="
            font-size: 14px;
            font-weight: bold;
            line-height: 62px;
            vertical-align: top;
          "
          >{{ ' - ' }}</span
        >
        <span style="font-size: 18px; font-weight: normal">
          {{ templateItem.template_name + '(' + templateItem.file_name + ')' }}
        </span>
      </div>
    </template>
    <ProcessSelect
      v-if="showDialog"
      should-backfill
      ref="processSelect"
      v-test.form="'confirm'"
      :template-id="templateItem.config_template_id"
    />
    <template v-slot:footer>
      <div class="footer-wrapper">
        <bk-button theme="primary" :loading="saveLoading" @click="handleSave">
          {{ $t('保存') }}
        </bk-button>
        <bk-button @click="closeDialog">
          {{ $t('取消') }}
        </bk-button>
      </div>
    </template>
  </bk-dialog>
</template>

<script>
import { $on, $off, $once, $emit } from '../../../../../utils/gogocodeTransfer'
import ProcessSelect from './ProcessSelect'
import dialogTopMixin from '@/mixins/dialogTop'

export default {
  components: {
    ProcessSelect,
  },
  mixins: [dialogTopMixin],
  props: {
    templateItem: {
      type: Object,
      required: true,
    },
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogHeight: 618, // 弹窗高度
      saveLoading: false,
    }
  },
  methods: {
    handleValueChange(val) {
      $emit(this, 'update:showDialog', val)
      if (!val) {
        // 关闭时重置数据
        this.saveLoading = false
      }
    },
    async handleSave() {
      try {
        this.saveLoading = true
        const { templateProcess, instanceProcess } = this.$refs.processSelect
        const processObjectList = []
        templateProcess.forEach((item) => {
          processObjectList.push({
            process_object_type: 'TEMPLATE',
            process_object_id: item.id,
          })
        })
        instanceProcess.forEach((item) => {
          processObjectList.push({
            process_object_type: 'INSTANCE',
            process_object_id: item.property.bk_process_id,
          })
        })
        const templateId = Number(this.templateItem.config_template_id)
        await this.$store.dispatch('configTemplate/ajaxBindTemplateToProcess', {
          templateId,
          data: {
            process_object_list: processObjectList,
          },
        })
        this.messageSuccess(this.$t('关联成功'))
        $emit(this, 'shouldRefreshList')
        $emit(
          this,
          'bindSuccess',
          templateProcess.length,
          instanceProcess.length
        )
        this.closeDialog()
      } catch (e) {
        console.warn(e)
      } finally {
        this.saveLoading = false
      }
    },
    closeDialog() {
      $emit(this, 'update:showDialog', false)
    },
  },
  emits: ['update:showDialog', 'bindSuccess', 'shouldRefreshList'],
}
</script>
