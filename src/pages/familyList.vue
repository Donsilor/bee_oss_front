<template>
	<div class="page-content rootLog-page">
		<div style="padding-bottom: 30px;">
			<!--搜索框-->
			<el-row :gutter="24">
				<!-- <el-col :span="3" style="padding-right: 0">
					<el-select placeholder="请选 择城市" value="">
						<el-option label="暂无数据" value=""></el-option>
					</el-select>
				</el-col>
				<el-col :span="3" style="padding-right: 0">
					<el-select placeholder="请选择小区" value="">
						<el-option label="暂无数据" value=""></el-option>
					</el-select>
				</el-col> -->
				<el-col :span="3" style="padding-right: 0">
					<el-input v-model="familyForm.phone" placeholder="输入手机号查询"></el-input>
				</el-col>
				<el-col :span="3" style="padding-right: 0; margin-top: 6px">
					<el-checkbox v-model="familyForm.abnormal">仅看异常家庭</el-checkbox>
				</el-col>
				<el-col :span="2">
					<el-button type="primary" @click="getFamilyList()">&nbsp;&nbsp;查询&nbsp;&nbsp;</el-button>
				</el-col>
			</el-row>
		</div>
		<div>
			<el-table :data="familyList.tableData" style="width: 100%">
				<el-table-column v-for="item in familyList.tableColumn" :key="item.prop" :prop="item.prop" :show-overflow-tooltip="true" :label="item.label" :width="'auto'">
					<template slot-scope="scope">
						<div :title="scope.row[item.prop]">{{scope.row[item.prop]}}</div>
					</template>
				</el-table-column>
				<el-table-column width="180" label="操作">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="openLayer(scope.row)">查看详情</el-button>

					</template>
				</el-table-column>
			</el-table>
			<div class="page-line">
				<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="15" :current-page.sync="currentPage"></el-pagination>
			</div>
		</div>
		<el-dialog title="家庭详情" :visible.sync="infoModel" :lock-scroll='false' width="30%">
			<span> 家庭ID:{{familyInfo.F_family_id}}</span><br>
			<span> 家庭名称:{{familyInfo.F_name}}</span><br>
			<span> 户主用户内部ID:{{familyInfo.F_owner_id}}</span><br>
			<span> 家庭绑定的路由器内部id:{{familyInfo.F_router_id}}</span><br>
			<span> 省份:{{familyInfo.F_provice}}</span><br>
			<span> 城市:{{familyInfo.F_city}}</span><br>
			<span> 家庭小区:{{familyInfo.F_district}}</span><br>
			<span> 家庭地址:{{familyInfo.F_addr}}</span><br>
			<span> 家庭栋号:{{familyInfo.F_building_no}}</span><br>
			<span> 家庭房号:{{familyInfo.F_room_no}}</span><br>
			<span> 电话（账户）:{{familyInfo.F_phone_num}}</span><br>
			<span> 户主:{{familyInfo.F_user_name}}</span><br>
			<span> 关联设备数:{{familyInfo.F_device_num}}</span><br>
			<span> 异常设备数:{{familyInfo.F_device_abnormal_num}}</span><br>
			<span> 创建时间:{{familyInfo.F_created_at}}</span><br>
			<span> 更新时间:{{familyInfo.F_updated_at}}</span>

		</el-dialog>
	</div>

</template>
<script>
import { mapActions } from "vuex";
import rootLogJson from "../json/warnList.json";
import "../lib/util";
import API from "../service/index";
export default {
    computed: {},
    components: {},
    data() {
        return {
            familyForm: {
                phone: "",
                abnormal: false
            },
            familyInfo: {},
            infoModel: false,
            totalItem: 0,
            page: 1,
            currentPage: 1,
            listParams: {},
            familyList: {
                tableColumn: [
                    { prop: "F_family_id", label: "id" },
                    { prop: "F_name", label: "家庭名称" },
                    { prop: "F_owner_id", label: "户主用户内部ID" },
                    { prop: "F_router_id", label: "路由器内部ID" },
                    { prop: "F_phone_num", label: "电话" },
                    { prop: "F_user_name", label: "户主" },
                    { prop: "F_created_at", label: "创建时间" }
                ],
                tableData: []
            },
            rootLogForm: {
                log_type: "",
                host_name: "",
                select_date: new Date(),
                svr_id: "",
                monitor_name: "",
                limit: 15,
                start_end_time: []
            }
        };
    },
    mounted() {
        this.getFamilyList(1);
    },
    watch: {},
    methods: {
        getFamilyList(page) {
            this.listParams.page = page;
            this.listParams.limit = 10;
            this.listParams.phone_num = this.familyForm.phone;
            this.listParams.is_abnormal = this.familyForm.abnormal;
            const obj = this;
            API.getFamilyList(obj.listParams).then(result => {
                if (result && result.result && result.result.data.length) {
                    obj.familyList.tableData = result.result.data;
                    obj.totalItem = result.result.total || 0;
                } else {
                    obj.familyList.tableData = [];
                }
            });
        },
        pageChange() {
            this.getFamilyList(this.currentPage);
        },
        openLayer(row) {
            this.familyInfo = row;
            this.infoModel = true;
        }
    }
};
</script>
<style lang="less">
.rootLog-page {
    .el-table td > .cell > div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        -moz-text-overflow: ellipsis;
        -webkit-text-overflow: ellipsis;
    }
    .el-table .cell,
    .el-table th > div {
        padding-right: 0;
    }
    .el-date-editor.el-input {
        width: 150px;
    }
}
.rootLogDetail {
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
