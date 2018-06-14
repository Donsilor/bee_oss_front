<template>
	<div class="page-content config-page">
		<div style="position: relative">
			<el-upload
					ref="uploadFileImg"
					class="upload-demo"
					action="/api/index.php/iotrouter/import"
					:before-upload="beforeAvatarUpload"
					:on-success="getUploadData"
					:data="uploadObj"
					:limit="1"
			>
				<el-button size="small" type="primary">点击导入</el-button>
			</el-upload>
			<el-button type="text" @click="goBack" style="position: absolute;top:0; right: 20px">返回</el-button>
		</div>
		<div style="margin-top: 20px">
			<el-table
					:data="importList.tableData"
					style="width: 100%; border-top:0 none">
				<el-table-column v-for="item in importList.tableColumn" :key="item.prop"
								 :prop="item.prop"
								 :label="item.label"
								 :width="'auto'"
				>
					<template slot-scope="scope">
						<div>{{scope.row[item.prop]}}</div>
					</template>
				</el-table-column>
			</el-table>
			<!--<div class="page-line">-->
				<!--<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="10" :current-page.sync="currentPage"></el-pagination>-->
			<!--</div>-->
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { Message } from 'element-ui'
export default {
	data () {
		return {
            uploadObj: {
                token: JSON.parse(localStorage.getItem('localData')).user.info.token
            },
			importList: {
                tableColumn: [
                    {prop: 'router_id', label: '路由ID'},
                    {prop: 'code', label: '错误详细'},
                    {prop: 'detail', label: '错误描述'}
				],
                tableData: []
			}
		}
	},
	watch: {
	},
	mounted () {
	},
	methods: {
        goBack () {
            history.go(-1)
		},
        getUploadData (val) {
            if (val.code === 0 || val.code === 200) {
                Message({
                    message: '导入成功',
                    type: 'success'
                })
			}else {
                Message({
                    message: '导入失败',
                    type: 'error'
                })
                if (val.result && val.result.list && val.result.list.length) {
                    this.hasList = true
                    this.importList.tableData = val.result.list
                }
			}
		},
        beforeAvatarUpload (file) {
            // const isRight = (file.type === 'application/zip' || file.type === 'application/rar');
            const isLt100M = file.size / 1024 / 1024 < 100;

//            if (!isRight) {
//                this.$message.error('上传只能是 zip|rar 格式!');
//            }
            if (!isLt100M) {
                this.$message.error('上传文件大小不能超过 100MB!');
            }
            return isLt100M;
        }
	},
    computed: {

    }
}
</script>
<style lang="less">
	.config-page{
		.el-tabs__active-bar{
			height: 2px;
		}
		.h3_pp{
			height: 30px;
			line-height: 30px;
			margin:30px 0 15px;
		}
		.cpsr-line{
			margin-bottom: 80px;
		}
		.infoBox{
			font-size: 1rem;
			>div{
				margin-bottom: 18px;
			}
		}
		.edit_form{
			.el-form-item__label{
				width: 80px;
			}
			.el-select{
				width: 100%;
			}
		}
		.el-input.is-disabled .el-input__inner{
			color: #333;
		}
		.p-r{
			position: relative;
		}
		.btn-back{
			position: absolute;
			right: 10px;
			top: 10px;
		}
	}
</style>