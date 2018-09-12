<template>
	<div class="edit_form versionDetail">
		<el-form ref="ruleFormDetail" label-width="100px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="版本Title" prop="title">
						<div>{{ruleFormDetail.title}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="版本号" prop="version">
						<div>{{ruleFormDetail.version}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="概略描述" prop="note">
						<div>{{ruleFormDetail.note}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="详细事项" prop="description">
						<div>{{ruleFormDetail.description}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="是否强制升级" prop="force">
						<div v-if="ruleFormDetail.force==0">否</div>
						<div v-if="ruleFormDetail.force==1">是</div>
						<div v-if="ruleFormDetail.force==3">不弹窗升级</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="版本状态" prop="status">
						<div>{{ruleFormDetail.status ? '启用' : '停用'}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="限制规则" prop="description">
				<div>{{getRules(ruleFormDetail.rules)}}</div>
			</el-form-item>
			<el-row>
				<el-col :span="12">
					<el-form-item label="固件大小" prop="size">
						<div>{{ruleFormDetail.size}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="下载url" prop="download_url_object">
						<div>{{ruleFormDetail.download_url_object}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="图标url" prop="img_url_object">
						<div>{{ruleFormDetail.img_url_object}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="发布时间" prop="release_tm">
						<div>{{ruleFormDetail.release_time}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="下载md5" prop="download_file_md5">
						<div>{{ruleFormDetail.download_file_md5}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="创建时间" prop="created_at">
						<div>{{ruleFormDetail.created_at}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="更新时间" prop="updated_at">
						<div>{{ruleFormDetail.updated_at}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="删除时间" prop="delete_at">
						<div>{{ruleFormDetail.delete_at}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row style="padding: 20px 0">
				<el-table :data="versionDeviceList.tableData" style="width: 100%; border-top:0 none">
					<el-table-column v-for="item in versionDeviceList.tableColumn" :key="item.prop" :prop="item.prop" :label="item.label" :width="'auto'">
						<template slot-scope="scope">
							<div>{{scope.row[item.prop]}}</div>
						</template>
					</el-table-column>
				</el-table>
				<div class="page-line">
					<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="5" :current-page.sync="currentPage"></el-pagination>
				</div>
			</el-row>
		</el-form>
	</div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import API from "../../../service/index";
export default {
    props: ["ruleFormDetail", "deviceObj"],
    data() {
        return {
            versionDeviceList: {
                tableColumn: [
                    { prop: "id", label: "id" },
                    { prop: "uuid", label: "设备标识uuid" },
                    { prop: "created_at", label: "创建时间" }
                ],
                tableData: []
            },
            totalItem: 0,
            currentPage: 1,
            os_type_text: {
                1: "android_app",
                4: "ios_app",
                6: "android_pad"
            }
        };
    },
    mounted() {},
    methods: {
        getRules(rules) {
            if (rules) {
                return rules.map(item => item.rule).join(",");
            } else {
                return "";
            }
        },
        resetList() {
            this.getVersionDeviceList(1);
        },
        pageChange() {
            this.getVersionDeviceList(this.currentPage);
        },
        getVersionDeviceList(page) {
            let obj = this;
            let dataObj = this.deviceObj;
            let param_1 = {
                type: dataObj.type,
                page: page,
                limit: 5,
                version: dataObj.version,
                os_type: obj.os_type_text[dataObj.os_type] || "",
                product_id: dataObj.product_id || "",
                router_pid: dataObj.router_pid || "",
                method: "get_uuids"
            };
            API.pubilcCorsAction(param_1).then(result => {
                obj.versionDeviceList.tableData = result.result ? result.result.items : [];
                obj.totalItem = (result.result && result.result.page && result.result.page.total) || 0;
            });
        }
    },
    computed: {
        ...mapGetters({})
    }
};
</script>
<style lang="less">
.edit_form {
    .el-form-item__label {
        width: 80px;
    }
    .el-select {
        width: 100%;
    }
}
.versionDetail {
    .el-form-item__content {
        word-wrap: break-word;
        line-height: 30px;
    }
    .el-form-item {
        margin-bottom: 3px;
    }
    .el-form-item__label {
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
        color: #999;
    }
}
</style>
