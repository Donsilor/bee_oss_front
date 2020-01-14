<template>
  <div class="table-list-view">
    <el-table
      :size="size"
      :data="localTableData"
      :style="{width:tableWidth}"
      :border="isBorder">
      <template v-for="(item, index) in tableItems">
        <el-table-column
          v-if="!item.shouldCustom"
          :type="item.type"
          :key="item.prop + index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row[item.prop]|format(item.label, item.options) }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="item.shouldCustom"
          :key="item.prop + index"
          :label="item.label"
          :width="item.width">
          <template
            slot-scope="scope">
            <slot
              :row="scope.row"
              :name="item.prop ">我是c组件(儿子)---外部没传递，我才显示</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="showPagination"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      :total="localTotal"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script>

export default {
  name: 'List',
  props: {
    isBorder: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: ''
    },
    showPagination: {
      type: Boolean,
      default: false
    },
    tableWidth: {
      type: String,
      default: '100%'
    },
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    },
    tableItems: {
      type: Array,
      default: function() {
        return []
      }
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    requestFunc: {
      type: Function,
      default: null
    },
    paginationLeft: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      localForm: this.formData,
      currentPage: 1,
      pageSize: 10,
      localTotal: this.total,
      localTableData: this.tableData
    }
  },
  watch: {
    tableData(value) {
      this.localTableData = value
    },
    total(value) {
      this.localTotal = value
    }
  },
  mounted() {
    if (this.tableData.length > 0 && this.requestFunc) {
      this.requestData(1)
    }
  },
  methods: {
    requestData(currentPage) {
      let page = currentPage || this.currentPage
      this.currentPage = page
      let param = {
        ...this.localForm,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.requestFunc(param).then(res => {
        this.localTotal = res.data.total || 0
        this.localTableData = this.pickRows(res.data)
      })
    },
    pickRows(data) {
      if (data.rows && data.rows instanceof Array) return data.rows
      let tableData = []
      for (let key in data) {
        if (data[key] instanceof Array) {
          tableData = data[key]
          break
        }
      }
      return tableData
    },
    handleSizeChange(value) {
      this.currentPage = 1
      this.pageSize = value
      this.requestData()
    },
    handleCurrentChange(value) {
      this.currentPage = value
      this.requestData()
    }
  }
}
</script>

<style scoped>
	.table-list-view {
		margin-top: 10px;
	}

	.el-pagination {
		display: flex;
		justify-content: center;
		margin-left: 0;
		margin-top: 20px;
	}
</style>
