<template>
  <div class="page-content config-page">

    <!--固定版本列表-->
    <el-table
      v-show="firstTableShow"
      :data="versionsFirst.tableData"
      style="width: 100%">
      <el-table-column
        v-for="item in versionsFirst.tableColumn"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="'auto'">
        <template slot-scope="scope">
          <div v-if="item.prop === 'type'">{{ getTypeText(scope.row.type, scope.row.os_type)+getPidName(scope.row) }}</div>
          <div v-else-if="item.prop === 'status'">{{ getStatusText(scope.row.status) }}</div>
          <div v-else-if="item.prop === 'force'">{{ getForceText(scope.row.force) }}</div>
          <div v-else-if="item.prop === 'release_time'">{{ formatTime(scope.row['release_time']) }}</div>
          <div v-else>{{ scope.row[item.prop] }}</div>
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="gotoHistoryList(scope.row,1)">查看版本列表</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
/*
设备类型：
1、android_app，2、router，3、子设备，4、ios，5、H5，6、android_pad，7、android_system，8、device_android_system，9、community_app，10、community_app_plugin

os_type:
1、android_app, 4、ios, 6、android_pad

新增force类型：
3，不弹窗升级（当前共有：0：非强制，1：强制，3：不弹窗升级）2已被占用
*/
import * as namespace from "../../store/namespace";
import { mapGetters, mapActions } from "vuex";
import "../../lib/util.js";
import version_first_json from "../../json/versions.json";
import version_input from "./component/versionInputLayer.vue";
import push_update from "./component/pushUpdateLayer.vue";
// import version_edit from "./component/versionEdit.vue";
import version_detail from "./component/versionDetail.vue";
import operate_log from "./component/operateLogs.vue";
import filter_form from "./component/filterLayer.vue";
import version_mapping from "./component/versionMapping.vue";
import API from "../../service/index";
export default {
    components: {
        "version-input": version_input,
        "push-update": push_update,
        // version_edit: version_edit,
        version_detail: version_detail,
        operate_log: operate_log,
        "filter-form": filter_form,
        "version-mapping": version_mapping
    },
    filters: {
        typeToString(x) {
            if (x * 1 === 1) {
                return "APP";
            } else if (x * 1 === 2) {
                return "路由器";
            } else if (x * 1 === 3) {
                return "子设备";
            } else {
                return "未知";
            }
        },
        forceToString(x) {
            return x ? "是" : "否";
        },
        statusToString(x) {
            return x ? "启用" : "停用";
        }
    },
    data() {
        return {
            firstTableShow: true,
            info: {},
            totalItem: 0,
            currentPage: 1,
            filterTypeOptions: [
                {
                    value: 2,
                    label: "路由器"
                },
                {
                    value: 3,
                    label: "子设备"
                }
            ],
            listParams: {
                method: "list_versions",
                page: 1,
                limit: 10,
                level: 1
            },
            versionsFirst: {},
            versionList: {},
            inputType: "",
            rulesDetail: {},
            suportDevice: [],
            pushHistoryList: {},
            pushDataObj: {},
            secondTitle: "",
            currentDataObj: {},
            currentDetailObj: {},
            operateLogLayer: false,
            operateLogList: {},
            addEditFlag: true,
            editDataObj: {},
            releasedFlag: false, //已发布/未发布标识 || 版本编辑，已发布版本只能编辑几个字段
            mappingData: {}, //各设备对应映射关系
            router: [],
            os_type: "",
            routerPidList: [],
            os_type_text: {
                1: "android_app",
                4: "ios_app",
                6: "android_pad"
            },
            device_type_text: {
                2: "路由器",
                3: "子设备",
                5: "H5",
                7: "Android system",
				11: "route_app",
				12: "video_app"
            },
            getGrayStatus: {
                0: "无",
                1: "白名单",
                2: "黑名单",
                3: "全量"
            },
            activeName: "devices"
        };
    },
    mounted() {
        this.$store.dispatch({
            type: namespace.INITPRODUCT
        });
        this.getVersionList(1);
    },
    methods: {
        formatTime(val) {
            if (!val) {
                return "------";
            } else {
                return val;
            }
        },
        pageChange() {
            this.getVersionList(this.currentPage);
        },
        // 获取所有版本列表
        getVersionList(page) {
            // this.filterParams.token = this.token
            this.listParams.page = page;
            this.versionsFirst = Object.assign({}, version_first_json);
            const obj = this;
            API.getVersions(obj.listParams).then(result => {
                if (result.code === 0) {
                    obj.firstTableShow = true;
                    obj.$nextTick(() => {
                        let currentData = result.result;
                        if (!(obj.versionsFirst.tableData && obj.versionsFirst.tableData.length)) {
                            obj.setFirstVersionList(currentData);
                        }
                    });
                }
            });
        },
        // 渲染首列数据
        setFirstVersionList(dataObj) {
            this.versionsFirst.tableData = [];
            let deviceType = {
                router: 2,
                h5: 5,
                device: 3
            };
            for (let attr in dataObj) {
                if (attr === "android" || attr === "android_pad" || attr === "android_system" || attr === "ios" || attr === 'video_app' || attr === 'route_app') {
                    this.versionsFirst.tableData.push(dataObj[attr]);
                } else {
                    if (JSON.stringify(dataObj[attr]) === "{}") {
                        this.versionsFirst.tableData.push({ type: deviceType[attr] });
                    } else {
                        for (let innerAttr in dataObj[attr]) {
                            this.versionsFirst.tableData.push(dataObj[attr][innerAttr]);
                        }
                        //路由pid列表
                        if (attr === "router") {
                            this.routerPidList = [];
                            for (let routerAttr in dataObj[attr]) {
                                this.routerPidList.push({
                                    label: routerAttr,
                                    value: routerAttr
                                });
                            }
                        }
                    }
                }
            }
        },
        getTypeText(type, os_type) {
            let text = "";
            if (type === 1) {
                text = os_type;
            } else {
                text = this.device_type_text[type];
            }
            return text;
        },
        getStatusTextPush(type) {
            let text = "";
            switch (type) {
                case 1:
                    text = "成功";
                    break;
                case 0:
                    text = "失败";
                    break;
                default:
                    break;
            }
            return text;
        },
        getStatusText(type) {
            let text = "";
            switch (type) {
                case 1:
                    text = "有效";
                    break;
                case 0:
                    text = "无效";
                    break;
                default:
                    break;
            }
            return text;
        },
        getForceText(type) {
            let text = "";
            switch (type) {
                case 3:
                    text = "不弹窗升级";
                    break;
                case 1:
                    text = "强制升级";
                    break;
                case 0:
                    text = "不强制";
                    break;
                default:
                    break;
            }
            return text;
        },
        getPreReleaseText(type) {
            let text = "";
            switch (type) {
                case 1:
                    text = "灰度版本";
                    break;
                case 0:
                    text = "正式版本";
                    break;
                default:
                    break;
            }
            return text;
        },
        gotoHistoryList(dataObj, page) {
			sessionStorage.setItem('CurrentAppInfo', JSON.stringify(dataObj))
			this.$router.push({path:`/main/versionManager/${dataObj.id}`})
        },
        getPidName(dataObj) {
            if (dataObj.type === 3 || dataObj.type === 8 || dataObj.type === 5) {
                if (dataObj.product_id) {
                    return "--" + dataObj.product_id;
                } else {
                    return "";
                }
            } else if (dataObj.type === 2) {
                if (dataObj.router_pid) {
                    return "--" + dataObj.router_pid;
                } else {
                    return "";
                }
            } else {
                return "";
            }
        },
    },
    ...mapActions([
        "getVersions",
        "selectVersion",
        "importSubmitAction",
        "pushUpdateAction",
        "getVersionDetailAction",
        "pubilcCorsAction"
    ]),
    computed: {
        ...mapGetters({
            brand: namespace.BRAND,
            type: namespace.TYPE,
            product: namespace.PRODUCT
        }),
        currentName() {
            let name = this.getTypeText(this.currentDataObj.type, this.currentDataObj.os_type) + " ";
            if (this.currentDataObj.product_id) {
                name += this.currentDataObj.product_id;
            }
            if (this.currentDataObj.router_pid) {
                name += this.currentDataObj.router_pid;
            }
            return name;
        }
    }
};
</script>
<style lang="less">
.cp-filterFormBox {
    padding: 20px;
    label {
        line-height: 36px;
    }
    .cpf-line {
        margin-bottom: 20px;
    }
}
.config-page {
    .el-tabs__active-bar {
        height: 2px;
    }
    .h3_pp {
        height: 30px;
        line-height: 30px;
        margin: 30px 0 15px;
    }
    .cpsr-line {
        margin-bottom: 80px;
    }
    .infoBox {
        font-size: 1rem;
        > div {
            margin-bottom: 18px;
        }
    }

    .p-r {
        position: relative;
    }
    .btn-back {
        position: absolute;
        right: 10px;
        z-index: 999;
        top: 10px;
    }
    .support-routers {
        border: 1px solid #d8d8d8;
        li {
            line-height: 35px;
            padding-left: 30px;
            height: 35px;
            list-style: none;
            border-bottom: 1px solid #d8d8d8;
        }
        li:last-of-type {
            border-bottom: 0;
        }
    }
    .el-tabs__nav-wrap::after {
        height: 1px;
    }
}
</style>
