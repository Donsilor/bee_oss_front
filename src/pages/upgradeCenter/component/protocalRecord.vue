
<template>
  <el-dialog
    :visible="recordVisible"
    :before-close="close"
    center
    width="1200px"
    title="协议更新记录">
    <List
      :table-items="tableItems"
      :table-data="tableData"/>
    <div
      slot="footer"
      class="dialog-footer">
      <el-button @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import List from './List.vue'
import Api from '@/service/upgrade.js'
export default {
  name: 'ProtocalRecord',
  components: { List },
  props: {
    recordVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return { formLabelWidth: '120px',
      tableData: [{ id: '01',
        name: '家居服务协议',
        url: 'https://router.vuejs.org/zh/guide/#html',
        remark: '这是10月份协议',
        version: 'v1.0.0',
        date: '2016-05-02',
        address: '上海市普陀区金沙江路 1518 弄'
      }, { id: '01',
        name: '家居服务协议',
        url: 'https://router.vuejs.org/zh/guide/#html',
        remark: '这是10月份协议',
        version: 'v1.0.0',
        date: '2016-05-02',
        address: '上海市普陀区金沙江路 1518 弄'
      }, { id: '01',
        name: '家居服务协议',
        url: 'https://router.vuejs.org/zh/guide/#html',
        remark: '这是10月份协议',
        version: 'v1.0.0',
        date: '2016-05-02',
        address: '上海市普陀区金沙江路 1518 弄'
      }, { id: '01',
        name: '家居服务协议',
        url: 'https://router.vuejs.org/zh/guide/#html',
        remark: '这是10月份协议',
        version: 'v1.0.0',
        date: '2016-05-02',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      tableItems: [
        { label: '更新时间', prop: 'date', width: '' },
        { label: '协议名称', prop: 'name', width: '' },
        { label: '备注', prop: 'remark', width: '350' },
        { label: '版本号', prop: 'version', width: '90' },
        { label: '操作人', prop: 'name', width: '160' }
      ]
    }
  },
  methods: {
  	getData () {
      Api.agreementSave().then(res => {

      })
    },
    close () {
      this.$emit('update:recordVisible', false)
    },
    confirm () {
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
