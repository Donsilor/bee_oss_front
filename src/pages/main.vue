<template>
  <div class="container">
    <bheader />
    <div class="content">
      <el-row>
        <el-col :span="3">
          <bnav />
        </el-col>
        <el-col :span="21">
          <div class="page">
            <router-view />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Bheader from "../components/bheader.vue"
import Bnav from "../components/bnav.vue"
export default {
  components: {
    Bheader,
    Bnav
  },
  data() {
    return {}
  },
  mounted() { },
  methods: {},
}
</script>
<style lang="less">
</style>
