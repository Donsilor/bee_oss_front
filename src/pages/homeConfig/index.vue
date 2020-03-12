<template>
  <div>
    <!-- <div class="nav">
      <el-radio-group
        v-model="tabPosition"
        @change="toPage">
        <el-radio-button label="/main/appHomeConfig/home" >首页模块</el-radio-button>
        <el-radio-button label="/main/appHomeConfig/music" >音乐模块</el-radio-button>
      </el-radio-group>
    </div> -->
    <router-view />
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabPosition: '/main/appHomeConfig/home'
    }
  },
  methods: {
    toPage (path) {
      this.$router.push(path)
    }
  }
}
</script>
<style lang="less">
.nav{
  display: flex;
  justify-content: center;
}
.el-radio-button__inner{
  padding: 12px 60px;
}

.filter{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
