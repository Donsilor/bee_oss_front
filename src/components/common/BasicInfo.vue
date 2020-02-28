<template>
  <div>
    <template v-for="(rows, index) in localInfoList">
      <el-row :key="index" :gutter="20">
        <el-col class="row-item" :span="24/rowNum" v-for="item in rows" :key="item.label">
          <span class="title">{{item.label}}:</span>
          <span v-if="/(时间|日期)/g.test(item.label)">{{InfoData[item.prop] | dateFormat}}</span>
          <span v-else>{{InfoData[item.prop]}}</span>
        </el-col>
      </el-row>
    </template>
  </div>

</template>

<script>
function handleInfoList (infoList) {
  let handled = []
  let rowNum = this.rowNum
  infoList && infoList.forEach((item, index) => {
    if (index % rowNum === 0) {
      handled.push([])
    }
    let reg = /时间/g
    if (reg.test(item.label)) {
      item.isTime = true
    }
    let arrIndex = Math.floor(index / rowNum)
    handled[arrIndex].push(item)
  })
  return handled
}

export default {
  name: 'BasicInfo',
  data () {
    return {
      localInfoList: handleInfoList.call(this, this.infoList)
    }
  },
  watch: {
    infoList: {
      handler: function (val, oldVal) {
        handleInfoList.call(this, val)
      },
      deep: true
    }
  },
  props: {
    'infoList': Array, // 格式[{label:'标题', prop: 'tittle'}]
    'InfoData': Object, // 格式示例{title: '新闻' }
    'rowNum': {
      type: [String, Number],
      default: 4
    }
  }
}
</script>

<style lang="less" scoped>
.row-item{
  margin-bottom: 12px ;
  .title {
    margin-right: 10px;
  }
}
</style>
