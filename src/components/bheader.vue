<template>
  <section class="bnheader">
    <el-row>
      <el-col
        :span="16"
        class="bnh-logo"
      >
        <h1>BeeNet OSS管理后台</h1>
      </el-col>
      <el-col
        :span="8"
        class="bnh-info"
      >
        <span>{{ user.name }}</span>
        <a
          href="javascript:;"
          @click="logout"
        >退出登录</a>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import * as namespace from "../store/namespace"
import { PREFIX } from "../lib/util"
import { mapGetters } from "vuex"
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      token: namespace.TOKEN,
      user: namespace.USER
    })
  },
  mounted() { },
  methods: {
    logout() {
      this.$http
        .post(PREFIX + "auth/logout", {
          token: this.token
        })
        .then(res => {
          const json = res.data
          this.$store.dispatch({
            type: namespace.DELUSER
          })
          this.$router.push("/")
          this.$message.success("登出成功")
        })
    }
  }
}
</script>
<style lang="less">
.bnheader {
  position: relative;
  z-index: 100;
  background: #2b2b37;
  color: #ffffff;
  height: 80px;
  z-index: 1000;
}
.bnh-logo {
  font-size: 1.5em;
  padding-left: 2em;
  height: 80px;
  display: flex;
  align-items: center;
}
.bnh-info {
  height: 80px;
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
}
</style>
