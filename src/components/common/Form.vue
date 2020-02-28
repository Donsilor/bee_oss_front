<template>
  <el-form :inline="isInline" :label-position="labelPosition" ref="form" :model="formData" :rules="rules" :style="{width:formWidth}" :label-width="labelWidth">
    <el-form-item :prop="item.prop" :label="item.label" :key="item.label" v-for="item in formConfig">
      <el-input :style="{width: item.width}" :maxlength="item.maxlength"  v-if="item.type === 'input'" v-model.trim="formData[item.prop]" :placeholder="'请输入'+ item.label.replace(/:\s*$/,'')"></el-input>
      <el-select v-if="item.type==='select'" v-model="formData[item.prop]" :placeholder="'请选择'+ item.label.replace(/:\s*$/,'')">
        <el-option :key="option.label+ index" v-for="(option, index) in item.options" :label="option.label" :value="option.value"></el-option>
      </el-select>
      <el-date-picker
        v-if="item.type==='date'"
        v-model="formData[item.prop]"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <template v-if="item.type === 'buttons'">
        <el-button v-for="button in item.buttons" @click="func(button)" :type="button.type" :key="button.name">
         {{button.name}}
        </el-button>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Form',
  props: {
    labelPosition: {
      type: String,
      default: 'right'
    },
    isInline: {
      type: Boolean,
      default: true
    },
    formWidth: {
      type: String,
      default: '1250px'
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    rules: Object,
    formConfig: {
      type: Array,
      default: function () {
        // let stateOption = [{ label: '全部', value: 0 }, { label: '处理中', value: 1 }, { label: '取消', value: 2 }, { label: '完成', value: 3 }]
        // let typeOption = [{ label: '全部', value: 0 }, { label: '个人', value: 1 }, { label: '企业', value: 2 }]
        // let config = [{ prop: 'accountName', label: '用户: ', type: 'input' },
        //   { prop: 'email', label: '邮箱地址: ', type: 'input' },
        //   { prop: 'creatDate', label: '创建日期: ', type: 'date' },
        //   { prop: 'invoiceNo', label: '发票编号: ', type: 'input' },
        //   { prop: 'applicationType', label: '开票类型: ', type: 'select', options: typeOption },
        //   { prop: 'invoicesStatus', label: '状态: ', type: 'select', options: stateOption }]
        return []
      }
    },
    formData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    func (info) {
      if (info.name === '重置' && !info.func) {
        this.reset()
      } else {
        info.func()
      }
    },
    reset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
  >>> .el-form-item{
    margin-right: 50px;
  }
   >>> .el-select, .el-input{
    width: 200px;
  }
  .el-form{
    margin: 20px 0;
  }
</style>
