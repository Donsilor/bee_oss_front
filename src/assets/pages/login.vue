<template>
    <div class="container">
        <div class="login-content">
            <section class="login-box">
                <header>
                    <h1>BeeOSS系统 - 登录</h1>
                </header>
                <article>
                    <el-form :model="loginForm" ref="loginForm" :rules="rules">
                        <ol class="login-form">
                            <li>
                                <el-form-item prop="username" required>
                                    <el-input v-model="loginForm.username" type="text" size="large" placeholder="手机/登录邮箱" />
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item prop="password" required>
                                    <el-input v-model="loginForm.password" type="password" size="large" placeholder="登录密码" />
                                 </el-form-item>
                            </li>
                            <li>
                                <el-form-item>
                                    <el-button @click="login" :disabled="loginForm.name === '' || loginForm.password === ''" type="primary" size="large">登录</el-button>
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
import { PREFIX } from '../lib/util';
import * as namespace from '../store/namespace';
import {mapGetters} from 'vuex';
export default {
    data () {
        const checkName = (rule, value, callback) => {
            if (/^1\d{10}$/.test(value) || /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
                callback()
            } else {
                callback(new Error('请输入正确的手机号码或邮箱'));
            }
        };
        return {
            
            loginForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入手机或邮箱',
                        trigger: 'change'
                    },
                    {
                        validator: checkName,
                        trigger: 'change'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'change' 
                    }
                ]
            }
        }
    },
    mounted () {
        if (this.token) {
            this.$router.push('main');
        }
    },
    methods: {
        login () {
            this.$http.post( PREFIX + 'auth/login', this.loginForm).then(res => {
                const json = res.data;
                if (json.code === 200) {
                    this.$message.success('登录成功');
                    this.$store.dispatch({
                        type: namespace.SETUSER,
                        info: json.result
                    })
                    this.$router.push('main');
                } else {
                    this.$message.error(json.msg);

                }
            }).catch((res) => {
                this.$message.error(res);
            });
        }
    },
    computed: {
        ...mapGetters({
            token: namespace.TOKEN
        })
    }
}
</script>
<style lang="less">
.container{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.login-content{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box{
        width: 400px;
        padding: 40px 50px;
        border: 1px solid #cccccc;
        header{
            margin-bottom: 30px;
            font-size: 1.25em;
            text-align: center;
        }
    }
    .login-form {
        li{
            margin-bottom: 30px;
        }
        button{
            width: 100%;
        }
    }
    
}
</style>