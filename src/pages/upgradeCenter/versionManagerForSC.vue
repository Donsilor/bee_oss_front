<template>
	<div class="page-content config-page">

		<!--固定版本列表-->
		<el-table v-show="firstTableShow" :data="versionsFirst.tableData" style="width: 100%">
			<el-table-column v-for="item in versionsFirst.tableColumn" :key="item.prop" :prop="item.prop" :label="item.label" :width="'auto'">
				<template slot-scope="scope">
					<div v-if="item.prop === 'type'">{{scope.row.key}}</div>
					<div v-else-if="item.prop === 'status'">{{getStatusText(scope.row.status)}}</div>
					<div v-else-if="item.prop === 'force'">{{getForceText(scope.row.force)}}</div>
					<div v-else-if="item.prop === 'release_time'">{{formatTime(scope.row['release_time'])}}</div>
					<div v-else>{{scope.row[item.prop]}}</div>
				</template>
			</el-table-column>
			<el-table-column width="180" label="操作">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="gotoHistoryList(scope.row,1)">查看版本列表</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div v-if="!firstTableShow">
			<!--顶部tab-->
			<el-row type="flex" justify="space-between">
				<el-col :span="12">
					<el-button-group>
						<el-button @click="openImportLayer">录入版本
							<i class="el-icon-caret-bottom"></i>
						</el-button>
						<el-button @click="openFilterFormLayer">匹配搜索
							<i class="el-icon-caret-bottom"></i>
						</el-button>
						<!--<el-button @click="openPushLayer">推送升级 <i class="el-icon-caret-bottom"></i></el-button>-->
					</el-button-group>
				</el-col>
			</el-row>
			<div class="p-r" style="height: 40px; padding-top: 10px">
				<!--<div style="line-height: 40px; height: 40px">{{secondTitle}}</div>-->
				<el-button type="text" @click="backToList" class="btn-back">返回上一级</el-button>
				<template v-if="inputType === 3 || inputType === 8">
					<el-tabs v-model="activeName" @tab-click="deviceRouterChange">
						<el-tab-pane label="子设备列表" name="devices"></el-tab-pane>
						<el-tab-pane label="子路由列表" name="routers"></el-tab-pane>
					</el-tabs>
				</template>
			</div>
			<!--子设备列表-->
			<el-table :data="versionList.tableData" style="width: 100%; border-top:0 none">
				<el-table-column v-for="item in versionList.tableColumn" :key="item.prop" :prop="item.prop" :label="item.label" :width="'auto'">
					<template slot-scope="scope">
						<div v-if="item.prop == 'type'">{{getTypeText(scope.row.type, scope.row.os_type)}}</div>
						<div v-else-if="item.prop == 'status'">{{getStatusText(scope.row.status)}}</div>
						<div v-else-if="item.prop == 'force'">{{getForceText(scope.row.force)}}</div>
						<div v-else-if="item.prop == 'is_pre_release'">{{getPreReleaseText(scope.row.is_pre_release)}}</div>
						<div v-else-if="item.prop == 'gray'">{{getGrayStatus[scope.row.gray]}}</div>
						<div v-else-if="item.prop === 'release_time'">{{formatTime(scope.row['release_time'])}}</div>
						<div v-else>{{scope.row[item.prop]}}</div>
					</template>
				</el-table-column>
				<el-table-column :width="250" label="操作">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="getVersionDetail(scope.row)">查看</el-button>
						<el-button type="text" size="small" @click="openSupportLayer(scope.row)">支持版本</el-button>
						<el-button type="text" size="small" @click="openVersionEdit(scope.row)">编辑</el-button>
						<el-button type="text" size="small" @click="startStopVerion(scope.row)">{{scope.row['status']?'禁用':'启用'}}</el-button>
						<br>
						<el-button type="text" size="small" @click="openPushLayer(scope.row)">推送</el-button>
						<el-button type="text" size="small" @click="getOperateLog(scope.row)">操作日志</el-button>
						<el-button type="text" size="small" @click="rollBackVersion(scope.row)">回滚</el-button>
						<el-button type="text" size="small" @click="deleteVersion(scope.row)">删除</el-button>
						<!-- <el-button type="text" size="small" @click="getVersionHistory(scope.row,1)">查看版本列表</el-button> -->
					</template>
				</el-table-column>
			</el-table>
			<div class="page-line">
				<el-pagination small layout="prev, pager, next" :total="totalItem_two" @current-change="pageChange_two" :page-size="10" :current-page.sync="currentPage_two"></el-pagination>
			</div>
		</div>
		<!--版本匹配搜索-->
		<el-dialog title="版本匹配搜索" :visible.sync="filterPopoverFlag">
			<filter-form key="filterForms" ref="filterForms" @filterVersionsParent="filterVersions" @closeFilterBox="filterPopoverFlag = false;" :type="type" :brandIDOptions="brandIDOptions" :typeIDOptions="typeIDOptions" :productIDOptions="productIDOptions" :inputType="inputType" :product="product" :router="router">
			</filter-form>
		</el-dialog>
		<!--版本详情-->
		<el-dialog title="版本详情" :visible.sync="infoBoxFlag">
			<version_detail ref="versionDetails" :ruleFormDetail="ruleFormDetail" :deviceObj="currentDetailObj">
			</version_detail>
			<div style="text-align: right; margin: 0">
				<el-button type="primary" @click="infoBoxFlag=false">确定</el-button>
			</div>
		</el-dialog>
		<!--版本录入-->
		<el-dialog :title="this.addEditFlag?'录入版本':'编辑版本'" :visible.sync="importBoxFlag">
			<version-input key="versionInputs" ref="versionInputs" @importSubmitParent="importSubmit" @closeImportBox="importBoxFlag = false;" :brandIDOptions="brandIDOptions" :typeIDOptions="typeIDOptions" :productIDOptions="productIDOptions" :inputType="inputType" :product="product" :type="type" :os_type="os_type" :addEditFlag="addEditFlag" :editDataObj="editDataObj" :releasedFlag="releasedFlag" :routerPidList="routerPidList" :activeName="activeName">
			</version-input>
		</el-dialog>
		<!--推送升级-->
		<el-dialog title="推送升级" :visible.sync="pushBoxFlag">
			<push-update ref="pushUpdates" @pushUpdateParent="pushUpdate" @closePushBox="pushBoxFlag = false;" :type="type" :inputType="inputType" :pushDataObj="pushDataObj">
			</push-update>
		</el-dialog>
		<!--操作日志-->
		<el-dialog title="操作日志" :visible.sync="operateLogLayer">
			<operate_log :operateLogList="operateLogList"></operate_log>
			<span slot="footer" class="dialog-footer">
				<el-button @click="operateLogLayer = false" style="border:none;">取 消</el-button>
			</span>
		</el-dialog>
		<!--支持版本-->
		<el-dialog title="支持版本" :visible.sync="supportLayer">
			<version-mapping ref="supportLayer" :inputType="inputType">
			</version-mapping>
			<span slot="footer" class="dialog-footer">
				<el-button @click="supportLayer = false" style="border:none;">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import * as namespace from "../../store/namespace";
import { mapGetters, mapActions } from "vuex";
import "../../lib/util.js";
import version_first_json from "../../json/versions.json";
import versions_children_json from "../../json/versionsChildren.json";
import versions_device_h5_json from "../../json/versionsDeviceH5.json";
import push_history_json from "../../json/pushHistory.json";
import operation_log_json from "../../json/operateLogList.json";
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
    data() {
        return {
            supportLayer: false,
            firstTableShow: true,
            pushBoxFlag: false,
            info: {},
            importBoxFlag: false,
            filterPopoverFlag: false,
            infoBoxFlag: false,
            totalItem: 0,
            totalItem_two: 0,
            currentPage: 1,
            currentPage_two: 1,
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
            brandIDOptions: [],
            typeIDOptions: [],
            productIDOptions: [],
            listParams: {
                method: "list_versions",
                page: 1,
                limit: 10,
                level: 1
            },
            terminalOptions: [
                {
                    value: "1",
                    lable: "选项一"
                }
            ],
            versionOptions: [
                {
                    value: "1",
                    lable: "选项一"
                }
            ],
            osOptions: [
                {
                    value: "1",
                    lable: "选项一"
                }
            ],
            versionsFirst: {},
            versionList: {},
            inputType: "",
            ruleFormDetail: {
                title: "",
                description: "",
                version: "",
                type: "",
                force: "",
                size: "",
                note: "",
                status: "",
                download_file_md5: "",
                download_url_object: "",
                img_url_object: "",
                created_at: "",
                updated_at: "",
                release_time: ""
            },
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
                7: "Android system"
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
    watch: {
        filterPopoverFlag(curVal, oldVal) {
            if (curVal) {
                if (!this.brandIDOptions.length) {
                    this.brandIDOptions = this.brand.map(x => {
                        return {
                            label: x.brand_name,
                            value: x.brand_id
                        };
                    });
                }
                this.versionOptions = this.router;
            }
        }
    },
    mounted() {
        //        this.$store.dispatch({
        //            type: namespace.INITAPPIOS
        //        })
        //        this.$store.dispatch({
        //            type: namespace.INITAPPANDROID
        //        })
        //		this.$store.dispatch({
        //			type: namespace.INITROUTER
        //		})
        this.$store.dispatch({
            type: namespace.INITPRODUCT
        });
        this.getVersionList(1);
    },
    methods: {
        openSupportLayer(dataObj) {
            this.supportLayer = true;
            this.$nextTick(() => {
                this.$refs["supportLayer"].renderData(dataObj);
            });
        },
        openFilterFormLayer() {
            this.filterPopoverFlag = true;
            this.$nextTick(() => {
                this.$refs["filterForms"].resetFilterForm();
            });
        },
        formatTime(val) {
            if (!val) {
                return "------";
            } else {
                return val;
                //                let date = new Date(val*1000)
                //                return date.Format('yyyy-MM-dd hh:mm:ss')
            }
        },
        openVersionEdit(dataObj) {
            this.initBrandIDOptions();
            this.filterPopoverFlag = false;
            let cur_os_type = "";
            if (dataObj.os_type) {
                switch (dataObj.os_type) {
                    case 1:
                        cur_os_type = "android_app";
                        break;
                    case 4:
                        cur_os_type = "ios_app";
                        break;
                    case 6:
                        cur_os_type = "android_pad";
                        break;
                    default:
                        cur_os_type = dataObj.os_type;
                        break;
                }
            }

            let param = {
                method: "version_detail",
                type: dataObj.type,
                version: dataObj.version,
                product_id: dataObj.product_id || "",
                os_type: cur_os_type,
                router_pid: dataObj.router_pid || ""
            };
            let obj = this;
            API.pubilcCorsAction(param).then(result => {
                let currentData = result.result;
                obj.releasedFlag = currentData.status === 1 ? true : false;
                obj.addEditFlag = false;
                obj.editDataObj = currentData;
                obj.importBoxFlag = true;
                obj.$nextTick(() => {
                    obj.$refs["versionInputs"].resetImportForm();
                    obj.$refs["versionInputs"].renderEditData();
                });
            });
        },
        //禁用、启用
        startStopVerion(dataObj) {
            let obj = this;
            obj
                .$confirm("确定此操作吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    let param = {
                        type: dataObj.type,
                        version: dataObj.version,
                        os_type: obj.os_type_text[dataObj.os_type] || "",
                        user_id: dataObj.user_id,
                        product_id: dataObj.product_id,
                        router_pid: dataObj.router_pid,
                        method: dataObj["status"] ? "disable" : "enable"
                    };

                    API.pubilcCorsAction(param).then(result => {
                        if (result.code === 0) {
                            obj.$message({
                                type: "success",
                                message: "操作成功!"
                            });
                            obj.getVersionHistory(obj.currentDataObj, 1);
                        }
                    });
                });
        },
        //操作日志
        getOperateLog(dataObj) {
            this.operateLogLayer = true;
            this.operateLogList = operation_log_json;
            let obj = this;
            let param = {
                type: dataObj.type,
                version: dataObj.version,
                product_id: dataObj.product_id,
                method: "history_operation_logs"
            };
            API.pubilcCorsAction(param).then(result => {
                if (result.code === 0) {
                    obj.operateLogList.tableData = result.result.items;
                }
            });
        },
        //删除
        deleteVersion(dataObj) {
            let obj = this;
            obj
                .$confirm("确定此操作吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    let param = {
                        type: dataObj.type,
                        version: dataObj.version,
                        user_id: dataObj.user_id,
                        product_id: dataObj.product_id || "",
                        os_type: obj.os_type_text[dataObj.os_type] || "",
                        router_pid: dataObj.router_pid || "",
                        method: "del_version"
                    };

                    API.pubilcCorsAction(param).then(result => {
                        if (result.code === 0) {
                            obj.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            obj.getVersionHistory(obj.currentDataObj, 1);
                        }
                    });
                });
        },
        //回滚
        rollBackVersion(dataObj) {
            let obj = this;
            obj
                .$confirm("确定此操作吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    let param = {
                        type: dataObj.type,
                        version: dataObj.version,
                        user_id: dataObj.user_id,
                        product_id: dataObj.product_id,
                        method: "rollback",
                        os_type: obj.os_type_text[dataObj.os_type] || ""
                    };

                    API.pubilcCorsAction(param).then(result => {
                        if (result.code === 0) {
                            obj.$message({
                                type: "success",
                                message: "回滚成功!"
                            });
                            obj.getVersionHistory(obj.currentDataObj, 1);
                        }
                    });
                });
        },
        // 获取详情
        getVersionDetail(dataObj) {
            this.infoBoxFlag = true;
            this.currentDetailObj = dataObj;
            let param = {
                method: "version_detail",
                type: dataObj.type,
                version: dataObj.version,
                product_id: dataObj.product_id || "",
                os_type: this.os_type_text[dataObj.os_type] || "",
                router_pid: dataObj.router_pid || ""
            };
            let obj = this;
            API.pubilcCorsAction(param).then(result => {
				obj.ruleFormDetail = result.result
                // let datas = result.result;
                // let form = obj.ruleFormDetail;
                // for (let attr in form) {
                //     form[attr] = datas[attr];
                // }
            });
            obj.$nextTick(() => {
                obj.$refs["versionDetails"].resetList();
            });
        },
        filterClearAll() {
            //			for (let name in this.filterForm) {
            //				this.filterForm[name] = '';
            //			}
        },
        rowChosed(scope) {
            this.infoBoxFlag = true;
            this.info = scope.row;
        },
        initBrandIDOptions() {
            if (!this.brandIDOptions.length) {
                this.brandIDOptions = this.brand.map(x => {
                    return {
                        label: x.brand_name,
                        value: x.brand_id
                    };
                });
            }
        },
        openImportLayer() {
            this.addEditFlag = true;
            this.releasedFlag = false;
            this.initBrandIDOptions();
            this.importBoxFlag = true;
            this.filterPopoverFlag = false;
            this.$nextTick(() => {
                this.$refs["versionInputs"].resetImportForm();
            });
        },
        openPushLayer(dataObj) {
            this.pushDataObj = dataObj;
            this.initBrandIDOptions();
            this.pushBoxFlag = true;
            this.$nextTick(() => {
                this.$refs["pushUpdates"].resetPushForm();
            });
        },
        // 版本录入
        importSubmit(params) {
            API.pubilcCorsAction(params).then(result => {
                if (result.code === 0) {
                    this.$message.success(this.addEditFlag ? "录入成功" : "编辑成功");
                    this.importBoxFlag = false;
                    this.getVersionList(1);
                }
            });
        },
        // 推送升级
        pushUpdate(params) {
            API.pubilcCorsAction(params).then(result => {
                if (result.code === 0) {
                    this.$message.success("推送成功");
                    this.pushBoxFlag = false;
                    this.getVersionList(1);
                }
            });
        },
        pageChange() {
            this.getVersionList(this.currentPage);
        },
        pageChange_two() {
            this.getVersionHistory(this.currentDataObj, this.currentPage_two);
        },
        // 版本匹配搜索
        filterVersions(params) {
            let obj = this;
            API.pubilcCorsAction(params).then(result => {
                if (result.code === 0) {
                    obj.filterPopoverFlag = false;
                    obj.firstTableShow = false;
                    let currentData = result.result;
                    obj.versionList.tableData = currentData.items;
                    obj.versionList = versions_children_json;
                    obj.totalItem = currentData.page.total;
                }
            });
        },
        // 获取所有版本列表
        getVersionList(page) {
            // this.filterParams.token = this.token
            this.listParams.page = page;
            this.versionsFirst = Object.assign({}, version_first_json);
            const obj = this;
            API.getVersionsForSC(obj.listParams).then(result => {
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
            for (let attr in dataObj) {
                dataObj[attr].key = attr;
                //后台bug，前端强制改变type
                dataObj[attr].type = attr.indexOf("plugin") >= 0 ? 10 : 9;
                this.versionsFirst.tableData.push(dataObj[attr]);
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
        // 历史版本
        getVersionHistoryList(page, dataObj) {
            // this.listParams.page = page
            let param = {
                page: page,
                limit: 10,
                level: 2,
                os_type: this.os_type_text[dataObj.os_type] || "",
                type: dataObj.type
            };
            const obj = this;
            API.getVersionsForSC(param).then(result => {
                if (result.code === 0) {
                    let currentData = result.result;
                    obj.firstTableShow = false;
                    versions_children_json.tableData = currentData.items;
                    obj.versionList = Object.assign({}, versions_children_json);
                    obj.totalItem_two = currentData.page.total;
                }
            });
        },
        getVersionHistory(dataObj, page) {
            this.currentDataObj = dataObj; //此操作是为了进入列表，进行各种操作时需要重新刷新列表
            this.inputType = dataObj.type;
            // this.os_type = dataObj.os_type || "";
            this.os_type = this.os_type_text[dataObj.os_type] || "";
            this.secondTitle = this.getVersionTitle(dataObj);
            this.getVersionHistoryList(page, dataObj);
        },
        gotoHistoryList(dataObj, page) {
            if (dataObj.type === 3) {
                this.activeName = "devices";
            }
            this.currentPage_two = page;
            this.getVersionHistory(dataObj, page);
        },
        getVersionTitle(dataObj) {
            let title = "";
            if (dataObj.name) {
                title = dataObj.name + "-版本历史";
            } else {
                if (dataObj.type === 3) {
                    title = "子设备-" + dataObj.product_id + "-版本历史";
                } else if (dataObj.type === 5) {
                    title = "H5-" + dataObj.product_id + "-版本历史";
                }
            }
            return title;
        },
        backToList() {
            this.getVersionList(1);
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
        //子设备/子路由切换
        deviceRouterChange() {
            this.currentDataObj.type = this.activeName === "devices" ? 3 : 8;
            this.getVersionHistory(this.currentDataObj, 1);
        }
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
        })
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
