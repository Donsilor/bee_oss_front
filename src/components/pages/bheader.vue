<template>
  <section class="ericeader">
    <el-row>
      <el-col :span="16" class="eric-logo">
        <div class="eric-title">星络科技管理后台</div>
      </el-col>
      <el-col :span="8" class="eric-info">
        <span class="eric-name">{{ 'admin'}}</span>
        <a class="eric-quite" href="javascript:;" @click="logout">退出登录</a>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import * as namespace from '@/store/namespace.js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      token: namespace.TOKEN,
      user: namespace.USER
    })
  },
  mounted () { },
  methods: {
    logout () {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less">
.ericeader {
  position: relative;
  z-index: 100;
  color: #ffffff;
  height: 60px;
  z-index: 1000;
}
.eric-logo {
  font-size: 1.5em;
  padding-left: 2em;
  height: 60px;
  display: flex;
  align-items: center;
}
.eric-title{
  font-size: 25px;
}
.eric-info {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 3em;
  span {
    margin-right: 2em;
  }
  a {
    color: #ffffff;
  }
  .eric-name, .eric-quite{
    font-size: 16px;
  }
}
</style>
