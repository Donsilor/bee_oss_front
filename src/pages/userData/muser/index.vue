<template>
  <div class="page-content ops-page">
    <div style="padding-bottom: 30px">
      <!--搜索框-->
      <el-row
        type="flex"
        justify="space-between"
      >
        <el-col :span="18">
          <el-input
            v-model="searchMobile"
            :maxlength="11"
            class="searchInput"
            type="text"
            placeholder="输入用户手机号码"
          />
          <el-button
            type="primary"
            @click="search"
          >
            &nbsp;&nbsp;查询&nbsp;&nbsp;
          </el-button>
        </el-col>
        <el-col
          :span="6"
          style="text-align: right;"
        >
          <el-button @click="addMuser = true">
            新增
          </el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 20px;">
        <muser-list
          :data-changed="dataChanged"
          :search-mobile="searchMobile"
        />
      </div>
      <div>
        <muser-add
          :dialog-visible="addMuser"
          :data-changed="dataChanged"
          @setDataChanged="changeData"
          @setDialog="closeDialog"
        />
      </div>
    </div>
  </div>
</template>

<script>
import muserList from './muserList.vue'
import muserAdd from './muserAdd.vue'

export default {
  components: {
    muserList,
    muserAdd
  },
  data () {
    return {
      searchMobile: '',
      addMuser: false,
      dataChanged: 0
    }
  },
  methods: {
    search () {
      if (!this.searchMobile) {
        this.$message.error('请输入手机号码')
        return
      }
      this.dataChanged++
    },
    closeDialog () {
      this.addMuser = false
    },
    changeData () {
      this.dataChanged++
    }
  }
}
</script>

<style lang="less">
</style>
