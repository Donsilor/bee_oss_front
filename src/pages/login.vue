<template>
  <div class="container">
    <div class="login-content">
      <section class="login-box">
        <header>
          <h1>BeeOSS系统 - 登录</h1>
        </header>
        <article>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="rules"
            @submit.prevent.native="login"
          >
            <ol class="login-form">
              <li>
                <el-form-item
                  prop="username"
                  required
                >
                  <el-input
                    v-model="loginForm.username"
                    type="text"
                    size="large"
                    placeholder="手机/登录邮箱"
                  />
                </el-form-item>
              </li>
              <li>
                <el-form-item
                  prop="password"
                  required
                >
                  <el-input
                    v-model="loginForm.password"
                    type="password"
                    size="large"
                    placeholder="登录密码"
                  />
                </el-form-item>
              </li>
              <li>
                <el-form-item>
                  <el-button
                    :disabled="loginForm.name === '' || loginForm.password === ''"
                    native-type="submit"
                    type="primary"
                    size="large"
                  >
                    登录
                  </el-button>
                </el-form-item>
              </li>
            </ol>
          </el-form>
        </article>
      </section>
    </div>
  </div>
</template>
<script>
import { PREFIX } from "../lib/util"
import * as namespace from "../store/namespace"
import { mapGetters } from "vuex"
// import cache from '../../store/cache.js';
const md5 = require('js-md5')
export default {
  data() {
    const checkName = (rule, value, callback) => {
      if (/^1\d{10}$/.test(value) || /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
        callback()
      } else {
        callback(new Error("请输入正确的手机号码或邮箱"))
      }
    }
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入手机或邮箱",
            trigger: "change"
          },
          {
            validator: checkName,
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change"
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      token: namespace.TOKEN
    })
  },
  mounted() {
    if (localStorage.getItem("localData")) {
      this.$router.push("main")
    }
  },
  methods: {
    login() {
      this.$http
        // .post(PREFIX + "auth/login", {
        //   username: this.loginForm.username,
        //   password: md5(this.loginForm.password)
        // })
        .post(PREFIX + "auth/login", this.loginForm)
        .then(res => {
          const json = res.data
          this.$message.success("登录成功")
          let userObj = {
            user: {
              info: json.result
            }
          }
          localStorage.setItem("localData", JSON.stringify(userObj))
          this.$store
            .dispatch({
              type: namespace.SETUSER,
              info: json.result
            })
            .then(() => {
              this.$router.push("main")
            })
        })
    }
  }
}
</script>
<style lang="less" scope>

html, body , #app, .container {
  height: 100%;
}
.login-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 400px;
    padding: 40px 50px;
    border: 1px solid #cccccc;
    header {
      margin-bottom: 30px;
      font-size: 1.25em;
      text-align: center;
    }
  }
  .login-form {
    li {
      margin-bottom: 30px;
    }
    button {
      width: 100%;
    }
  }
}
</style>
