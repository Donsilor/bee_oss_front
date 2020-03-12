<template>
  <div class="versions-mapping">
    <div class="title m-b-20">
      <span class="label-name">{{ getTypeName(currentDataObj.type) }}版本图</span>
      <span style="color: #999">当前版本：</span>{{ currentDataObj.version }}
    </div>
    <!--111111-->
    <!--111111-->
    <!--111111-->
    <div
      v-if="inputType === 1 || inputType === 4 || inputType === 6"
      class="version-list-line"
    >
      <span class="label-name">适配路由器版本:</span>
      <span
        v-for="(item, index) in currenData.router"
        :key="index"
        class="version-list"
      >{{ item }}</span>
    </div>
    <div
      v-if="inputType === 2"
      class="m-b-20"
    >
      <div>
        <span class="label-name">android app版本：</span>
        <span
          v-for="(item, index) in currenData.android"
          :key="index"
          class="version-list"
        >{{ item }}</span>
      </div>
      <div>
        <span class="label-name">ios app版本：</span>
        <span
          v-for="(item, index) in currenData.ios"
          :key="index"
          class="version-list"
        >{{ item }}</span>
      </div>
      <div>
        <span class="label-name">android pad版本：</span>
        <span
          v-for="(item, index) in currenData.android_pad"
          :key="index"
          class="version-list"
        >{{ item }}</span>
      </div>
    </div>
    <!--2222222-->
    <!--2222222-->
    <!--2222222-->
    <div v-if="inputType === 1 || inputType === 2 || inputType === 4 || inputType === 6">
      <div
        v-for="(item, index) in currenData.device"
        :key="index"
        class="m-b-20"
      >
        <div class="title">
          <span class="label-name">子设备</span>{{ item.product_id }}
        </div>
        <div class="version-list-line">
          <span class="label-name">适配版本号: </span>
          <span class="version-list">{{ item.version }}</span>
        </div>
        <div class="version-list-line">
          <span class="label-name">适配H5版本号: </span>
          <span
            v-for="(inner, index) in item.h5"
            :key="index"
            class="version-list"
          >{{ inner }}</span>
        </div>
      </div>
    </div>
    <div v-if="inputType === 3">
      <div class="m-b-20">
        <div>
          <span class="label-name">适配路由：</span>
        </div>
        <div v-for="(item, index) in currenData.router" :key="index">
          <div class="version-list-line">
            <span class="label-name">适配路由器版本号: </span>{{ item.version }}
          </div>
          <div class="version-list-line">
            <span class="label-name">android app: </span>
            <span
              v-for="(inner, index) in item.andorid"
              :key="index"
              class="version-list"
            >{{ inner }}</span>
          </div>
          <div class="version-list-line">
            <span class="label-name">android pad: </span>
            <span
              v-for="(inner, index) in item.andorid_pad"
              :key="index"
              class="version-list"
            >{{ inner }}</span>
          </div>
          <div class="version-list-line">
            <span class="label-name">ios app: </span>
            <span
              v-for="(inner, index) in item.ios"
              :key="index"
              class="version-list"
            >{{ inner }}</span>
          </div>
        </div>
      </div>
      <div class="version-list-line">
        <span class="label-name">适配H5版本号: </span>
        <span
          v-for="(inner, index) in currenData.h5"
          :key="index"
          class="version-list"
        >{{ inner }}</span>
      </div>
    </div>
    <div v-if="inputType === 5">
      <div v-for="(item, index) in currenData.device" :key="index">
        <div class="title">
          <span class="label-name">版本</span>{{ item.version }}
        </div>
        <div class="version-list-line">
          <span class="label-name">适配路由器版本号: </span>{{ item.router.version }}
        </div>
        <div class="version-list-line">
          <span class="label-name">android app: </span>
          <span
            v-for="(inner, index) in item.router.andorid"
            :key="index"
            class="version-list"
          >{{ inner }}</span>
        </div>
        <div class="version-list-line">
          <span class="label-name">android pad: </span>
          <span
            v-for="(inner,index) in item.router.andorid_pad"
            :key="index"
            class="version-list"
          >{{ inner }}</span>
        </div>
        <div class="version-list-line">
          <span class="label-name">ios app: </span>
          <span
            v-for="(inner, index) in item.router.ios"
            :key="index"
            class="version-list"
          >{{ inner }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import API from '../../../service/index'
export default {
  props: ['inputType'],
  data () {
    return {
      routersTableData: [],
      productsTableData: {
        tableColumn: [{ prop: 'product_id', label: '产品id' }, { prop: 'version', label: '版本号' }],
        tableData: []
      },
      currentDataObj: {},
      currenData: {}
    }
  },
  watch: {},
  mounted () { },
  methods: {
    renderData (dataObj) {
      this.currentDataObj = dataObj
      let obj = this
      let param = {
        version: dataObj.version
      }
      switch (this.inputType) {
        case 1:
        case 4:
        case 6:
          param.type = dataObj.type
          param.method = 'app_mapping'
          break
        case 2:
          param.method = 'router_mapping'
          break
        case 3:
          param.method = 'device_mapping'
          param.product_id = dataObj.product_id
          break
        case 5:
          param.method = 'h5_mapping'
          param.product_id = dataObj.product_id
          break
        default:
          break
      }
      API.pubilcCorsAction(param).then(result => {
        obj.currenData = result.result
      })
    },
    getTypeName (type) {
      let text = ''
      switch (type) {
        case 1:
          text = 'Android app'
          break
        case 6:
          text = 'Android PAD'
          break
        case 2:
          text = '路由器'
          break
        case 3:
          text = '子设备'
          break
        case 4:
          text = 'IOS APP'
          break
        default:
          text = 'H5'
          break
      }
      return text
    }
  },
  ...mapActions(['pubilcCorsAction'])
}
</script>
<style lang="less">
.versions-mapping {
  line-height: 35px;
  .version-list {
    padding: 5px 10px;
    background: #4db3ff;
    color: #fff;
    margin-right: 20px;
  }
  .label-name {
    display: inline-block;
    width: 180px;
    color: #999;
  }
  .m-b-20 {
    margin-bottom: 20px;
  }
}
</style>
