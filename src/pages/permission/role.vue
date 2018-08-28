<template>
	<div class="page-content config-page">
		<!--顶部tab-->
		<div style="position: relative">
			<el-row>
				<el-col>
					<el-button type="primary" @click="handleAdd">新增角色</el-button>
				</el-col>
			</el-row>
		</div>
		<!--列表-->
		<div style="margin-top: 20px">
			<el-table :data="roleList">
				<el-table-column v-for="item in tableColumn" :key="item.prop" :prop="item.prop" :label="item.label" :width="'auto'">
					<template slot-scope="scope">
						{{scope.row[item.prop]}}
					</template>
				</el-table-column>
				<el-table-column width="180" label="操作">
					<template slot-scope="scope">
						<el-button v-if="scope.row.role_name!='Admin'" type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
						<el-button v-if="scope.row.role_name!='Admin'" type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

		</div>
		<!--添加修改-->
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
			<el-form :model="formdata" :rules="rules" label-width="100px">
				<el-form-item label="角色名称" prop="name">
					<el-input v-model="formdata.name" :disabled="isEdit" />
				</el-form-item>
				<el-form-item label="显示名称" prop="display_name">
					<el-input v-model="formdata.display_name" />
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input v-model="formdata.description" />
				</el-form-item>
				<el-form-item label="选择权限" prop="checkList">
					<el-checkbox-group v-model="formdata.checkList">
						<div class="menulist" v-for="menu in menuList" :key="menu.id">
							<!-- v-if="menu.children" -->
							<div class="hd">
								<el-checkbox v-if="menu.permission_name" :key="menu.id" :label="menu.permission_name">
									<strong>{{menu.menu_name}}</strong>
								</el-checkbox>
								<strong v-else>{{menu.menu_name}}</strong>
							</div>
							<el-checkbox v-for="item in menu.children" :key="item.id" :label="item.permission_name">{{item.menu_name}}</el-checkbox>
						</div>
					</el-checkbox-group>
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
            tableColumn: [{ prop: "role_id", label: "id" }, { prop: "role_name", label: "角色名" }],
            isEdit: false,
            dialogVisible: false,
            roleList: [],
            menuList: [],
            formdata: {},
            rules: {
                name: [{ required: true, message: "请输入角色名", trigger: "blur" }],
                display_name: [{ required: true, message: "请输入显示名称", trigger: "blur" }],
                description: [{ required: true, message: "请输入备注", trigger: "blur" }],
                checkList: [{ required: true, message: "请选择权限", trigger: "blur" }]
            }
        };
    },
    computed: {
        dialogTitle() {
            return this.isEdit ? "编辑角色" : "添加角色";
        }
    },
    methods: {
        handleAdd() {
            this.isEdit = false;
            this.dialogVisible = true;
            this.formdata = {
                checkList: []
            };
        },
        handleEdit(row) {
            this.isEdit = true;

            API.getRole(row.role_id).then(res => {
                this.formdata = {
                    role_id: row.role_id,
                    name: res.data.result.role.name,
                    display_name: res.data.result.role.display_name,
                    description: res.data.result.role.description,
                    checkList: this.getCheckList(res.data.result.menuList)
                };
                this.dialogVisible = true;
            });
        },
        handleDelete(row) {
            this.$confirm("确认删除？", "提示").then(() => {
                API.deleteRole(row.role_id).then(() => {
                    this.$message("删除成功");
                    this.getRoleList();
                });
            });
        },
        formSubmit() {
            this.formdata.permission_list = JSON.stringify(this.formdata.checkList);

            API[this.isEdit ? "editRole" : "addRole"](this.formdata).then(res => {
                this.$message(this.isEdit ? "修改成功" : "添加成功");
                this.dialogVisible = false;
                this.getRoleList();
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
        getCheckList(menu) {
            let result = [];
            const getChild = list => {
                list.forEach(item => {
                    result.push(item);
                    if (item.children) {
                        getChild(item.children);
                    }
                });
            };
            getChild(menu);
            return result.filter(item => item.isCheck).map(item => item.permission_name);
        }
    },
    mounted() {
        this.getRoleList();
        this.getMenuList();
    }
};
</script>

<style scoped>
.el-checkbox {
    margin-left: 0;
    margin-right: 15px;
}
.menulist {
    margin-bottom: 5px;
    padding-left: 5px;
    background: #efefef;
}
.menulist .hd {
    /* background: #efefef; */
}
</style>

