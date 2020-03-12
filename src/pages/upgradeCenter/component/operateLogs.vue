<template>
  <div class="edit_form versionDetail">
    <!--<div style="padding-bottom:15px">-->
    <!--<el-date-picker-->
    <!--v-model="date"-->
    <!--@change="changeSelectLogOutDate"-->
    <!--placeholder="今天"-->
    <!--&gt;-->
    <!--</el-date-picker>-->
    <!--</div>-->
    <div class="childDevice">
      <el-table
        :data="operateLogList.tableData"
        style="width: 100%"
      >
        <el-table-column
          v-for="item in operateLogList.tableColumn"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
            <div :title="scope.row[item.prop]">
              {{ scope.row[item.prop] }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--<div class="page-line">-->
    <!--<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="10" :current-page.sync="currentPage"></el-pagination>-->
    <!--</div>-->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['operateLogList'],
  data () {
    return {
      date: ''
    }
  },
  computed: {
    ...mapGetters({})
  },
  mounted () { },
  methods: {
    changeSelectLogOutDate () { }
  }
}
</script>
<style lang="less">
.edit_form {
  .el-form-item__label {
    width: 80px;
  }
  .el-select {
    width: 100%;
  }
}
.versionDetail {
  .el-form-item__content {
    word-wrap: break-word;
    line-height: 30px;
  }
  .el-form-item {
    margin-bottom: 3px;
  }
  .el-form-item__label {
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    color: #999;
  }
}
</style>
