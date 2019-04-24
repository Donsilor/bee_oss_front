<template>
  <div
    class="block"
    style="float:right;margin-top:10px;"
  >
    <el-pagination
      :current-page="config.currentPage"
      :page-sizes="config.pageSizes"
      :page-size="config.pageSize"
      :total="config.total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: ["config"],
  methods: {
    handleSizeChange(val) {
      this.config.currentPage = 1
      this.config.pageSize = val
    },
    handleCurrentChange(val) {
      this.config.currentPage = val
    }
  }
}
</script>
