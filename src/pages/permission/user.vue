<template>
	<div class="page-content config-page">
		<!--顶部tab-->
		<div style="position: relative">
			<el-row>
				<el-col>
					<el-button type="primary" @click="handleAdd">新增用户</el-button>
					<!-- <el-button type="primary" @click="handleExport">导出</el-button> -->
					<el-button type="danger" @click="handleDelete">删除</el-button>

					<el-form :inline="true" style="float:right">
						<el-form-item style="margin-bottom:0">
							<el-input v-model="keyword" placeholder="请输入手机号" />

						</el-form-item>
						<el-form-item style="margin-bottom:0">
							<el-button type="primary" @click="handleSearch">查询</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
		<!--列表-->
		<div style="margin-top: 20px">
			<el-table :data="userList" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" :selectable="onSelectable">
				</el-table-column>
				<el-table-column v-for="item in tableColumn" :key="item.prop" :prop="item.prop" :label="item.label" :width="'auto'">

				</el-table-column>
				<el-table-column width="180" label="操作">
					<template slot-scope="scope">
						<el-button v-if="scope.row.name!='admin'" type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
						<el-button v-if="scope.row.name!='admin'" type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page-line">
				<el-pagination small layout="prev, pager, next" :total="total" @current-change="onPageChange" :page-size="pageSize" :current-page.sync="page"></el-pagination>
			</div>
		</div>
		<!--添加修改-->
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
			<el-form :model="formdata" :rules="rules" label-width="100px">
				<el-form-item label="用户名" prop="name">
					<el-input v-model="formdata.name" autocomplete="off" :disabled="isEdit" />
				</el-form-item>
				<el-form-item label="密码" prop="password" v-if="!isEdit">
					<el-input type="password" v-model="formdata.password" autocomplete="off" />
				</el-form-item>
				<el-form-item label="手机" prop="mobile">
					<el-input v-model="formdata.mobile" :disabled="isEdit" />
				</el-form-item>
				<el-form-item :model="formdata" label="邮箱" prop="email">
					<el-input v-model="formdata.email" />
				</el-form-item>
				<el-form-item label="部门">
					<el-input v-model="formdata.department" />
				</el-form-item>
				<el-form-item label="职位">
					<el-input v-model="formdata.job" />
				</el-form-item>
				<el-form-item label="用户权限" prop="role_id">
					<el-select v-model="formdata.role_id">
						<el-option v-for="item in roleList" :key="item.role_id" :label="item.role_name" :value="item.role_id"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="formSubmit">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import API from "../../service/index.js";

export default {
    data() {
        return {
            tableColumn: [
                { prop: "id", label: "id" },
                { prop: "name", label: "用户名" },
                { prop: "role_name", label: "角色" },
                { prop: "mobile", label: "手机号" },
                { prop: "created_at", label: "创建时间" }
            ],
            totalItem: 0,
            currentPage: 1,
            isEdit: false,
            dialogVisible: false,
            selectedIds: [],
            userList: [],
            roleList: [],
            menuList: [],
            formdata: {},
            total: 0,
            pageSize: 20,
            page: 1,
            keyword: "",
            rules: {
                name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }],
                mobile: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
                email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
                role_id: [{ required: true, message: "请选择角色", trigger: "blur" }]
            }
        };
    },
    computed: {
        dialogTitle() {
            return this.isEdit ? "编辑" : "添加";
        }
    },
    methods: {
        handleAdd() {
            this.isEdit = false;
            this.dialogVisible = true;
            this.formdata = {};
        },
        handleEdit(row) {
            this.isEdit = true;
            this.dialogVisible = true;
            this.formdata = Object.assign({}, row);
            this.formdata.user_id = row.id;
        },
        handleDelete(row) {
            if (!row.id && this.selectedIds.length === 0) {
                this.$message("请最少选择一项");
                return;
            }
            let ids = row.id ? [row.id] : this.selectedIds.map(item => item.id);
            this.$confirm("确认删除？", "提示").then(() => {
                API.deleteUser(JSON.stringify(ids)).then(res => {
                    this.$message("删除成功");
                    this.getUserList();
                });
            });
        },
        handleExport() {},
        handleSelectionChange(val) {
            this.selectedIds = val;
        },
        onSelectable(row, index) {
            if (row.name == "admin") return false;
            return true;
        },
        onPageChange(page) {
            this.getUserList();
        },
        formSubmit() {
            API[this.isEdit ? "editUser" : "addUser"](this.formdata).then(res => {
                this.$message(this.isEdit ? "修改成功" : "添加成功");
                this.dialogVisible = false;
                this.getUserList();
            });
        },
        handleSearch() {
            this.page = 1;
            this.getUserList();
        },
        getUserList() {
            API.userList({
                keyword: this.keyword,
                page: this.page,
                limit: this.pageSize
            }).then(res => {
                this.userList = res.data.result.data;
                this.total = res.data.result.total;
            });
        },
        getRoleList() {
            API.roleList().then(res => {
                this.roleList = res.data.result;
            });
        },
        getMenuList() {
            API.menuList().then(res => {
                this.menuList = res.data.result;
            });
        },
        getUserDetail(id) {
            API.getUser(id).then(res => {
                this.formdata = res.data.result;
            });
        }
    },
    mounted() {
        this.getUserList();
        this.getRoleList();
        this.getMenuList();
    }
};
</script>
