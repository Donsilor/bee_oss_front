<template>
	<div class="edit_form versionDetail">
		<el-form ref="ruleFormDetail" label-width="100px" >
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
					<el-form-item label="概略描述" prop="description">
						<div>{{ruleFormDetail.description}}</div>
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
						<div>{{ruleFormDetail.force ? '是' : '否'}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="版本状态" prop="status">
						<div>{{ruleFormDetail.status ? '启用' : '停用'}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="限制规则" prop="description">
				<div>{{ruleFormDetail.rule}}</div>
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
						<div>{{ruleFormDetail.release_tm}}</div>
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
		</el-form>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    props: ['ruleFormDetail'],
	data () {
		return {
            uploadObj: {
                token: JSON.parse(localStorage.getItem('localData')).user.info.token
            },
            importForm: {
                title: '',
                version: '',
                release_tm: '',
                routersList: [],
                productsList: [],
                download_url_object: '',
                img_url_object: '',
                download_file_md5: '',
                file_size: '',
                force: 0,
                brand_id: '',
                type_id: '',
                product_id: '',
                description: '',
                note: ''
            },
		}
	},
	mounted () {
	},
	methods: {
	},
    computed: {
        ...mapGetters({
        })
    }
}
</script>
<style lang="less">
	.edit_form{
		.el-form-item__label{
			width: 80px;
		}
		.el-select{
			width: 100%;
		}
	}
	.versionDetail{
		.el-form-item__content{
			word-wrap: break-word;
			line-height: 30px;
		}
		.el-form-item{
			margin-bottom: 3px;
		}
		.el-form-item__label{
			line-height: 30px;
			padding-top: 0;
			padding-bottom: 0;
			color: #999;
		}
	}
</style>