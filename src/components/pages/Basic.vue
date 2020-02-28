<template>
  <el-container class="container">
    <el-header>
      <bheader/>
    </el-header>

    <el-container>
      <el-aside width="190px">
        <bnav/>
      </el-aside>
      <el-main
        id="page"
        class="page">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Bheader from './bheader.vue'
import Bnav from './bnav.vue'

export default {
  components: {
    Bheader,
    Bnav
  },
  data () {
    return {}
  },
  mounted () {
  },
  methods: {}
}
</script>
<style lang="less" scoped>
  container {
    height: 100vh;
  }

  .el-header {
    background: #2b2b37;
  }
</style>
