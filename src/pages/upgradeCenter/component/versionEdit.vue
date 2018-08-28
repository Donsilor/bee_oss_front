<template>
	<div class="edit_form">
		<el-form :model="ruleFormDetail" :rules="rulesDetail" ref="ruleFormDetail" label-width="100px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="版本Title" prop="title">
						<el-input v-model="ruleFormDetail.title" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="版本号" prop="version">
						<el-input v-model="ruleFormDetail.version" placeholder=""></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="概略描述" prop="description">
						<el-input v-model="ruleFormDetail.description" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="详细事项" prop="description">
						<el-input v-model="ruleFormDetail.description" placeholder=""></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="是否强制升级" prop="force">
						<el-select v-model="ruleFormDetail.force" placeholder="请选择">
							<el-option label="是" :value="1"></el-option>
							<el-option label="否" :value="0"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="版本状态" prop="status">
						<el-select v-model="ruleFormDetail.status" placeholder="请选择">
							<el-option label="启用" :value="1"></el-option>
							<el-option label="停用" :value="0"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="限制规则" prop="description">
				<el-input v-model="ruleFormDetail.description" placeholder=""></el-input>
			</el-form-item>
			<el-row>
				<el-col :span="12">
					<el-form-item label="固件大小" prop="size">
						<el-input v-model="ruleFormDetail.size" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="下载url" prop="download_url_object">
						<el-input v-model="ruleFormDetail.download_url_object" placeholder=""></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="图标url" prop="img_url_object">
						<el-input v-model="ruleFormDetail.img_url_object" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="发布时间" prop="release_tm">
						<el-input v-model="ruleFormDetail.release_tm" placeholder=""></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="下载md5" prop="download_file_md5">
						<el-input v-model="ruleFormDetail.download_file_md5" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="创建时间" prop="created_at">
						<el-input v-model="ruleFormDetail.created_at" placeholder=""></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="更新时间" prop="updated_at">
						<el-input v-model="ruleFormDetail.updated_at" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="删除时间" prop="delete_at">
						<el-input v-model="ruleFormDetail.delete_at" placeholder=""></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>
<script>
import * as namespace from "../../../store/namespace";
import { mapGetters, mapActions } from "vuex";
export default {
    props: ["ruleFormDetail"],
    data() {
        return {
            uploadObj: {
                token: JSON.parse(localStorage.getItem("localData")).user.info.token
            },
            importForm: {
                title: "",
                version: "",
                release_tm: "",
                routersList: [],
                productsList: [],
                download_url_object: "",
                img_url_object: "",
                download_file_md5: "",
                file_size: "",
                force: 0,
                brand_id: "",
                type_id: "",
                product_id: "",
                description: "",
                note: ""
            },
            rulesImport: {
                version: [{ required: true, message: "请输入版本号" }],
                title: [{ required: true, message: "请输入版本标题" }],
                description: [{ required: true, message: "请输入概要描述" }],
                note: [{ required: true, message: "请输入详细事项" }],
                product_id: [{ required: false, message: "请输入子设备" }],
                release_tm: [{ required: true, message: "请选择发布时间" }],
                routersList: [{ required: false, message: "请选择支持版本" }],
                productsList: [{ required: false, message: "请选择支持版本" }],
                download_url_object: [{ required: true, message: "请上传固件包" }],
                img_url_object: [{ required: true, message: "请上传img图片" }],
                force: [{ required: true, message: "请选择是否强制升级" }]
            }
        };
    },
    mounted() {},
    methods: {
        resetImportForm() {
            let form = this.importForm;
            for (let attr in form) {
                switch (attr) {
                    case "routersList":
                    case "productsList":
                        form[attr] = [];
                        break;
                    case "force":
                        form[attr] = 0;
                        break;
                    default:
                        form[attr] = "";
                        break;
                }
            }
        },
        closeParentFlow() {
            this.$emit("closeImportBox");
        }
    },
    computed: {
        ...mapGetters({
            subset: namespace.SUBSET
        })
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
.el-input.is-disabled .el-input__inner {
    color: #333;
}
</style>
