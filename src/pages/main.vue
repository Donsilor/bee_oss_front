<template>
  <el-container>
    <el-header>
      <bheader />
    </el-header>

    <el-container>
      <el-aside width="190px">
        <bnav />
      </el-aside>

      <el-main
        id="page"
        class="page">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Bheader from '../components/bheader.vue'
import Bnav from '../components/bnav/bnav.vue'
export default {
  components: {
    Bheader,
    Bnav
  },
  data () {
    return {}
  },
  mounted () { },
  methods: {}
}
</script>
<style lang="less">
</style>
