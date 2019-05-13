<template>
  <el-dialog 
    :visible.sync="config.show"
    :title="config.type === 'add' ? '添加模式' : '编辑模式'" 
    width="560px">
    <el-form 
      :model="config"
      label-width="80px">
      <el-form-item 
        label="模式名称">
        <el-input 
          v-model="config.name" 
          autocomplete="off"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="config.state">
          <el-radio label="启用"/>
          <el-radio label="禁用"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item 
        label="排序">
        <el-input 
          v-model="config.name" 
          autocomplete="off"/>
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
  .tips {
    color: #999;
  }
</style>
<script>
export default {
  props: ['config'],
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
