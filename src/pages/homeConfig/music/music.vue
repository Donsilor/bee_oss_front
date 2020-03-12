<template>
  <div>
    <!-- 顶部tab -->
    <div class="filter">
      <span>最新专辑-封面配置</span>
      <el-button
        v-if="!isEdit"
        type="primary"
        @click="isEdit = true">编辑</el-button>
      <el-button
        v-else
        type="primary"
        @click="save">确定并生效</el-button>
    </div>
    <div class="main">
      <el-form
        ref="form"
        :model="model"
        label-width="100px">
        <el-form-item
          label="">
          <div class="form-item">
            <!-- Upload -->
            <Upload
              :image-file="model.list_pic"
              :type="model.model"
              :valid="validList"
              path= "scene/"
              @emitImageData="emitListData" />

            <div class="wrap">
              <div class="item">
                <div class="label">主标题</div>
                <el-input
                  v-model="model.list_pic" />
              </div>
              <div class="item">
                <div class="label">副标题</div>
                <el-input
                  v-model="model.list_pic" />
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          label="">
          <div class="form-item">
            <!-- Upload -->
            <Upload
              :image-file="model.list_pic"
              :type="model.model"
              :valid="validList"
              path= "scene/"
              @emitImageData="emitListData" />

            <div class="wrap">
              <div class="item">
                <div class="label">主标题</div>
                <el-input
                  v-model="model.list_pic" />
              </div>
              <div class="item">
                <div class="label">副标题</div>
                <el-input
                  v-model="model.list_pic" />
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          label="">
          <div class="form-item">
            <!-- Upload -->
            <Upload
              :image-file="model.list_pic"
              :type="model.model"
              :valid="validList"
              path= "scene/"
              @emitImageData="emitListData" />

            <div class="wrap">
              <div class="item">
                <div class="label">主标题</div>
                <el-input
                  v-model="model.list_pic" />
              </div>
              <div class="item">
                <div class="label">副标题</div>
                <el-input
                  v-model="model.list_pic" />
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <!-- 顶部tab -->
    <div class="filter">
      <span>个性电台-封面配置</span>
      <el-button
        v-if="!isEdit"
        type="primary"
        @click="isEdit = true">编辑</el-button>
      <el-button
        v-else
        type="primary"
        @click="save">确定并生效</el-button>
    </div>
    <div class="main">
      <el-form
        ref="form"
        :model="model"
        label-width="100px">
        <el-form-item
          label="">
          <div class="form-item">
            <!-- Upload -->
            <Upload
              :image-file="model.list_pic"
              :type="model.model"
              :valid="validList"
              path= "scene/"
              @emitImageData="emitListData" />

            <div class="wrap">
              <div class="item">
                <div class="label">主标题</div>
                <el-input
                  v-model="model.list_pic" />
              </div>
              <div class="item">
                <div class="label">副标题</div>
                <el-input
                  v-model="model.list_pic" />
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          label="">
          <div class="form-item">
            <!-- Upload -->
            <Upload
              :image-file="model.list_pic"
              :type="model.model"
              :valid="validList"
              path= "scene/"
              @emitImageData="emitListData" />

            <div class="wrap">
              <div class="item">
                <div class="label">主标题</div>
                <el-input
                  v-model="model.list_pic" />
              </div>
              <div class="item">
                <div class="label">副标题</div>
                <el-input
                  v-model="model.list_pic" />
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          label="">
          <div class="form-item">
            <!-- Upload -->
            <Upload
              :image-file="model.list_pic"
              :type="model.model"
              :valid="validList"
              path= "scene/"
              @emitImageData="emitListData" />

            <div class="wrap">
              <div class="item">
                <div class="label">主标题</div>
                <el-input
                  v-model="model.list_pic" />
              </div>
              <div class="item">
                <div class="label">副标题</div>
                <el-input
                  v-model="model.list_pic" />
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Upload from '../../../components/upload.vue'
export default {
  components: {
    Upload
  },
  data () {
    return {
      isEdit: false,
      validList: {
        type: 2, // 验证图片尺寸
        width: [850],
        height: [450],
        tips: '尺寸：850*450， 支持jpg，png'
      },
      model: {}
    }
  },
  methods: {
    save () {
      this.isEdit = false
    },
    emitListData () {

    }
  }
}
</script>
<style lang="less">
.form-item{
  display: flex;
  justify-content: flex-start;
  .wrap{
    flex: 1;
  }
}

</style>
