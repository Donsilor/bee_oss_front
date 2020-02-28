<template>
  <div class="search-wrap">
    <el-form ref="form" :model="form" :rules="rules">
      <template v-for="(options, indexOfoptions) in groupOptions">
        <el-row :gutter="20" :key="'options'+indexOfoptions">
          <el-col v-for="(item, index) in options" :key="'option'+index" :span="6">
            <div class="grid-content bg-purple">
              <el-form-item :key="'items'+ index" v-if="item.type"  :prop="item.prop" :label="item.label" >
                <!--输入框-->
                <el-input :style="{width: item.width}" :maxlength="item.maxlength" v-if="item.type === 'input'"
                          v-model.trim="form[item.prop]" :placeholder="item|filterPlaceholder">
                </el-input>

                <!--选择框-->
                <el-select v-if="item.type==='select'" v-model="form[item.prop]"
                           :placeholder="item|filterPlaceholder">
                  <el-option :key="option.label+ index" v-for="(option, index) in item.options" :label="option.label"
                             :value="option.value"></el-option>
                </el-select>

                <!--日期选择器-->
                <el-date-picker
                  v-if="item.type==='date'"
                  v-model="form[item.prop]"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>

                <!--日期选择器-->
                <el-date-picker
                  v-if="item.type==='dateMonth'"
                  v-model="form[item.prop]"
                  type="monthrange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>

                <!--按钮-->
                <template v-if="item.type === 'buttons'">
                  <div class="btn-wrap">
                    <div class="btns">
                      <el-button @click="func(button)" :type="button.type" size="small" v-for="button in item.buttons"
                                 :key="button.name">
                        {{button.name}}
                      </el-button>
                    </div>
                  </div>
                </template>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </template>
    </el-form>
  </div>

</template>

<script>
import eventBus from '@/assets/js/EventBus.js'
import { downLoadExcelByBlob } from '@/views/chargeMgmt/order/apis/index.js'
let linkWatch = {}
let dateProperty = []
function options2Form (options) {
  let result = {}
  options.forEach(item => {
    // date 类型数据处理
    if (item.type === 'date' || item.type === 'dateMonth') {
      dateProperty.push(item.prop)
      result[item.prop] = item.value || ''
      let propLabel = []
      item.dateValues && item.dateValues.forEach((dateItem, index) => {
        if (item.value) {
          result[dateItem] = new Date(new Date(result[item.prop][index]).toLocaleDateString()).getTime()
          if (index === 1) {
            result[dateItem] = result[dateItem] + 24 * 3600 * 1000
          }
        } else {
          result[dateItem] = ''
        }
        propLabel.push(dateItem)
      })
      let label = 'form.' + item.prop
      linkWatch[label] = function (newValue) {
        if (newValue && newValue.length > 1) {
          this.form[propLabel[0]] = new Date(new Date(newValue[0]).toLocaleDateString()).getTime()
          this.form[propLabel[1]] = new Date(new Date(newValue[1]).toLocaleDateString()).getTime() + 24 * 3600 * 1000
          if (item.type === 'dateMonth' && newValue.length > 1) {
            let date = new Date(newValue[1])
            let month = date.getMonth()
            let year = date.getFullYear()
            if (month === 11) {
              year++
              month = 1
            } else {
              month += 2
            }
            let dateStr = `${year}/${month}/ 00:00:00`
            this.form[propLabel[1]] = new Date(new Date(dateStr).toLocaleDateString()).getTime()
          }
        } else {
          this.form[propLabel[0]] = ''
          this.form[propLabel[1]] = ''
        }
      }
    } else if (item.type === 'select') {
      let label = 'form.' + item.prop
      item.prop && (result[item.prop] = item.value || '')
      linkWatch[label] = function (newValue) {
        this.$emit('selectChange', item.prop, newValue)
      }
    } else {
      item.prop && (result[item.prop] = item.value || '')
    }
  })
  return result
}
function groupFormOption (options) {
  let grouped = []
  options.forEach((option, index) => {
    if (index % 4 === 0) {
      grouped.push([])
    }
    grouped[Math.floor(index / 4)].push(option)
  })
  let last = grouped[grouped.length - 1]
  let length = last.length
  for (let i = 0; i < 4 - length; i++) {
    last.push({ prop: '', label: '', type: '' })
  }
  return grouped
}

export default {
  name: 'Form',
  props: {
    formWidth: {
      type: String,
      default: '1250px'
    },
    rules: Object,
    formOptions: {
      type: Array,
      default: function () {
        // let stateOption = [{ label: '全部', value: 0 }, { label: '处理中', value: 1 }, { label: '取消', value: 2 }, { label: '完成', value: 3 }]
        // let typeOption = [{ label: '全部', value: 0 }, { label: '个人', value: 1 }, { label: '企业', value: 2 }]
        // let config = [{ prop: 'accountName', label: '用户: ', type: 'input' },
        //   { prop: 'email', label: '邮箱地址: ', type: 'input' },
        //   { prop: 'creatDate', label: '创建日期: ', type: 'date',dateValues:['dateStart', 'dateEnd'] },
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
  watch: linkWatch,
  data () {
    return {
      groupOptions: groupFormOption(this.formOptions),
      form: options2Form.call(this, this.formOptions)
    }
  },
  filters: {
    filterPlaceholder: function (item) {
      let label = ''
      if (item.type === 'input') {
        label = '请输入' + item.label.replace(/:\s*$/, '')
      } else {
        label = '请选择' + item.label.replace(/:\s*$/, '')
      }
      return label
    }
  },
  methods: {
    search () {
      let param = { ...this.form }
      dateProperty.forEach(item => {
        delete param[item]
      })
      eventBus.$emit('formSearch', param)
    },
    func (info) {
      if (info.name === '重置' && !info.func) {
        this.$refs.form.resetFields()
        this.$nextTick(res => {
          eventBus.$emit('formSearch', this.form)
        })
      } else if ((info.name === '搜索' || info.name === '查询' || '筛选') && !info.func) {
        this.search()
      } else if (info.name === '导出' && info.func) {
        const param = {
          ...this.form
        }
        info.func(param).then(res => {
          var downLoadFile = info.fileName || '导出.xls'
          downLoadExcelByBlob(res, downLoadFile)
        })
      } else {
        info.func()
      }
    }
  }
}
</script>

<style scoped lang="less">
  .search-wrap {
    background: white;
    padding: 10px 20px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    @flex-item-margin: 20px;
    .place-holder {
      width: 200px;
      background-color: rebeccapurple;
      height: 0;
      margin-right: 60px;
    }
    /deep/ .el-form-item {
      .el-form-item__label {
        font-size: 12px;
        line-height: 17px;
        color: #6D7278;
      }

      .el-input__inner {
        border: none;
        border-radius: 0;
        padding: 0;
        font-size: 13px;
        border-bottom: 1px solid #cccccc;
        height: auto;
      }
      .el-range-input{
        font-size: 13px;
      }
      .el-input__inner,
      .el-date-editor .el-range__icon,
      .el-date-editor .el-range__close-icon,
      .el-date-editor .el-range-separator {
        line-height: 26px;
      }

      .el-input__icon {
        line-height: 26px;
      }

      .el-range-editor.el-input__inner {
        padding: 0;
      }

      .el-form-item__content,
      .el-date-editor--datetimerange.el-input__inner,
      .el-select {
        width: 200px;
        line-height: inherit;
      }
      .el-input__inner{
        width: 200px;
      }
      .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
        width: 300px;
      }
      .btn-wrap {
        position: relative;
        height: 44px;
        .btns{
          position: absolute;
          left: 0;
          bottom: 0px;
        }
      }
    }
  }
</style>
