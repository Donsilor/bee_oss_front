<template>
  <div class="page-content feedback-detail">
    <el-breadcrumb
      separator="/"
      class="item"
    >
      <el-breadcrumb-item>
       <span
         style="cursor:pointer"
         @click="goList">用户反馈中心</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>反馈详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="item infos">
      <el-col
        :span="8"
        class="col col1"
      >
        <div>
          <ul>
            <li>反馈用户名：{{ detail.name }}</li>
            <li>反馈用户手机号: {{ detail.uname }}</li>
            <li>反馈时间：{{ detail.created_at }}</li>
            <li>联系方式：{{ detail.contact }}</li>
          </ul>
        </div>
      </el-col>
      <el-col
        :span="8"
        class="col col2"
      >
        <div>
          <ul>
            <li>终端名：{{ detail.terminal_name }}</li>
            <li>终端类型: {{ detail.terminal_type }}</li>
            <li>客户端版本号：{{ detail.app_version }}</li>
          </ul>
        </div>
      </el-col>
      <el-col
        :span="8"
        class="col col3"
      >
        <div>
          <el-button
            :disabled="prevDisabled"
            @click="detailPrev"
          >
            上一条
          </el-button>
          <el-button
            :disabled="nextDisabled"
            type="primary"
            @click="detailNext"
          >
            下一条
          </el-button>
        </div>
      </el-col>
    </el-row>
    <div class="item content">
      <p style="line-height: 30px;">
        反馈内容：<br> {{ detail.content }}
      </p>
    </div>
    <div class="item imgs">
      <img
        v-for="(item, index) in detail.img_list"
        :key="index"
        :src="item"
        preview="1"
        preview-text=""
        alt=""
      >
    </div>
    <div v-if="has_reply">
      <p>已回复：</p>
      <pre style="font-family: 微软雅黑">{{ contentReply }}</pre>
    </div>
    <!--回复按钮-->
    <div v-if="!has_reply">
      <el-button
        type="primary"
        style="margin-top: 20px;"
        @click="dialogVisible = true">回复</el-button>
    </div>
    <div v-if="dialogVisible">
      <el-dialog
        :visible.sync="dialogVisible"
        title="请输入回复的内容"
        width="30%">
        <el-input
          v-model="replyText"
          type="textarea"
          placeholder="请输入内容"
          maxlength="100"
          show-word-limit
        />
        <span
          slot="footer"
          class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="reply">回 复</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from '~/lib/http'
import * as URL from '~/lib/api'
import { mapGetters } from 'vuex'
export default {
  components: {},
  data () {
    return {
      detail: {},
      prevDisabled: false,
      nextDisabled: false,
      dialogVisible: false,
      replyText: '',
      has_reply: false,
      contentReply: ''
    }
  },
  computed: {
    ...mapGetters('feedback', ['queryOptionStorage', 'needQueryOptionStorage'])
  },
  watch: {
    dialogVisible (val) {
      if (!val) {
        this.replyText = ''
      }
    }
  },
  mounted () {
    // 点击列表页某条反馈进来
    this.getFeedbackDetails(this.$route.params.id, 0)
  },
  methods: {
    goList () {
      // needQueryOptionStorage为true
      this.$store.dispatch('feedback/setNeedQueryOptionStorage', true).then(() => {
        this.$router.push({ name: 'feedbackList' })
      })
    },
    getFeedbackDetails (detailId, is_forward) {
      let params = null
      if (is_forward === 0) {
        // 点击列表某条反馈进来
        params = {
          id: detailId,
          is_forward: is_forward
        }
      } else {
        // 点击上一条下一条 is_forward为1或者2 请求详情要带上列表页的筛选条件(存储在queryOptionStorage)
        params = {
          id: detailId,
          is_forward: is_forward,
          keyword: this.queryOptionStorage.keyword,
          is_read: this.queryOptionStorage.is_read,
          start_time: this.queryOptionStorage.start_time,
          end_time: this.queryOptionStorage.end_time
        }
      }
      axios.post(URL.feedbackDetails, params).then(res => {
        const result = res.data.result
        this.prevDisabled = false
        this.nextDisabled = false
        this.has_reply = result.has_reply !== 0
        this.contentReply = result.reply_content
        if (result) {
          this.detail = result
          this.detail.img_list = result.img_list ? result.img_list.split(',') : []
          this.$previewRefresh()
        } else {
          // 如果没有返回数据 所以是最前或者最后一条 不更新界面 只disable按钮
          if (is_forward === 1) {
            this.prevDisabled = true
            this.$message('已经是最前面一条')
          } else if (is_forward === 2) {
            this.nextDisabled = true
            this.$message('已经是最后面一条')
          }
        }
      })
    },
    reply () {
      if (!this.replyText) {
        this.$message.warning('请输入内容')
        return
      }
      let obj = {
        reply_content: this.replyText.trim(),
        id: this.$route.params.id
      }
      axios.post(URL.feedbackReply, obj).then(res => {
        if (res.data.code === 200) {
          this.dialogVisible = false
          this.getFeedbackDetails(this.$route.params.id, 0)
        }
      })
    },
    // 上一条
    detailPrev () {
      this.getFeedbackDetails(this.detail.id, 1)
    },
    // 下一条
    detailNext () {
      this.getFeedbackDetails(this.detail.id, 2)
    }
  }
}
</script>

<style lang="less">
@import "../../styles/_var.less";
.feedback-detail {
  font-size: 14px;
}
.item {
  overflow: hidden;
  margin: 0 0 30px 0;
}
.col li {
  margin: 0 0 12px 0;
}
.col1 {
  border-right: 1px solid @borderColor;
}
.col2 {
  padding: 0 0 0 40px;
}
.imgs img {
  float: left;
  width: 13%;
  margin: 0 2% 20px 0;
  cursor: pointer;
}
</style>
