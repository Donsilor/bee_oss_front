<template>
  <el-dialog
    :visible.sync="config.show"
    :title="config.type === 'add' ? '添加情景' : '编辑情景'">
    <el-form
      :model="config"
      label-width="100px">
      <el-form-item
        label="情景名称">
        <el-input
          v-model="config.name"
          autocomplete="off"/>
      </el-form-item>
      <el-form-item label="情景icon">
        <Upload 
          :image-file="imageFile" 
          @emitImageData="emitImageData" />
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
      imageFile: '', // download_url
      image_url: '', // image object
    }
  },
  methods: {
    emitImageData(data) {
      this.image_url = data.object
      this.imageFile = data.download_url 
    }
  }
}
</script>
