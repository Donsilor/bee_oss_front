<template>
  <el-dialog
    :visible.sync="config.show"
    :title="config.type === 'add' ? '添加场景' : '编辑场景'">
    <el-form
      :model="config"
      label-width="100px">
      <el-form-item
        label="场景名称">
        <el-input
          v-model="config.name"
          autocomplete="off"/>
      </el-form-item>
      <el-form-item label="列表配图">
        <!-- Upload -->
        <Upload :upload="upload"/>
      </el-form-item>

      <el-form-item label="详情页配图">
        <!-- Upload -->
        <Upload :upload="upload"/>
      </el-form-item>

      <el-form-item label="启动模式">
        <el-select
          v-model="config.upmode"
          placeholder="选择">
          <el-option
            label="选择"
            value="shanghai"/>
          <el-option
            label="手动点击"
            value="beijing"/>
          <el-option
            label="定时启动"
            value="shanghai1"/>
          <el-option
            label="进入wifi"
            value="shanghai2"/>
          <el-option
            label="离开wifi"
            value="shanghai3"/>
          <el-option
            label="天气变化时"
            value="shanghai4"/>
        </el-select>
      </el-form-item>

      <el-form-item label="选择设备">
        <el-checkbox v-model="opt">选择</el-checkbox>
        <img
          src="../../../images/u432.png"
          alt="图片">
        <span>开关</span>
        <el-select v-model="opt1">
          <el-option
            label="选择"
            value="shenzhen"/>
          <el-option
            label="开"
            value="shenzhen1"/>
          <el-option
            label="关"
            value="shenzhen2"/>
        </el-select>
      </el-form-item>

      <el-form-item label="">
        <el-checkbox v-model="tv">选择</el-checkbox>
        <img
          src="../../../images/u432.png"
          alt="图片">
        <span>电视</span>
        <el-select v-model="tv1">
          <el-option
            label="选择"
            value="shenzhen"/>
          <el-option
            label="开"
            value="shenzhen1"/>
          <el-option
            label="关"
            value="shenzhen2"/>
        </el-select>
        <el-checkbox v-model="tv2">默认客厅</el-checkbox>
      </el-form-item>

      <el-form-item label="">
        <el-checkbox v-model="box">选择</el-checkbox>
        <img
          src="../../../images/u432.png"
          alt="图片">
        <span>音箱</span>
        <el-select v-model="box1">
          <el-option
            label="选择"
            value="shenzhen"/>
          <el-option
            label="开"
            value="shenzhen1"/>
          <el-option
            label="关"
            value="shenzhen2"/>
        </el-select>
        <el-checkbox v-model="box2">默认客厅</el-checkbox>
      </el-form-item>

      <el-form-item label="">
        <el-checkbox v-model="air">选择</el-checkbox>
        <img
          src="../../../images/u432.png"
          alt="图片">
        <span>空调</span>
        <el-select v-model="air1">
          <el-option
            label="选择"
            value="shenzhen"/>
          <el-option
            label="开"
            value="shenzhen1"/>
          <el-option
            label="关"
            value="shenzhen2"/>
        </el-select>
        <el-checkbox v-model="air2">默认客厅</el-checkbox>
      </el-form-item>

      <el-form-item label="">
        <el-checkbox v-model="cur">选择</el-checkbox>
        <img
          src="../../../images/u432.png"
          alt="图片">
        <span>窗帘</span>
        <el-select v-model="cur1">
          <el-option
            label="选择"
            value="shenzhen"/>
          <el-option
            label="开"
            value="shenzhen1"/>
          <el-option
            label="关"
            value="shenzhen2"/>
        </el-select>
        <!-- <el-checkbox v-model="tv1">默认客厅</el-checkbox> -->
      </el-form-item>

      <el-form-item label="状态">
        <el-radio-group v-model="config.state">
          <el-radio label="启用"/>
          <el-radio label="禁用"/>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer">
      <el-button @click="config.show = false">取 消</el-button>
      <el-button
        type="primary"
        @click="config.show = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<style lang="less">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    .clear {
      position: absolute;
      top: 0;
      right: -20px;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
  .tips {
    color: #999;
  }
</style>
<script>
import { PREFIX } from "../../../lib/util"
import getCorsUrl from "../../../lib/corsconfig"
import Upload from "../../../components/upload.vue"
export default {
  components: {
    Upload
  },
  props: ['config'],
  data() {
    return {
      upload: {},
      corsUrls: getCorsUrl() + "/oss_file_upload",
      uploadObj: {
        token: JSON.parse(localStorage.getItem("localData")).user.info.token
      },
      image_file: '',
      // 开关控制
      opt: false,
      opt1: '',
      // 电视控制
      tv: false,
      tv1: '',
      tv2: false,
      // 音箱控制
      box: false,
      box1: '',
      box2: false,
      // 空调控制
      air: false,
      air1: '',
      air2: false,
      // 窗帘控制
      cur: false,
      cur1: '',
    }
  },
  methods: {
  }
}
</script>
