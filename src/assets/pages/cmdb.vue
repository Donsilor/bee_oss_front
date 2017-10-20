<template>
	<div class="page-content facility-page">
		
		<el-row>
			<el-col>
				<el-select v-model="service" placeholder="选择服务">
					<el-option
				      v-for="item in serviceOptions"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
				<el-input class="searchInput" v-model="searchKey" type="text" placeholder="输入IP/hostname" />
				<el-button>查询</el-button>
				<el-button-group>
					<a href="#" class="el-button el-button--default">导出</a>
					<el-button @click="importBoxFlag = true">录入</el-button>
					<el-button @click="backyardFlag = true">后台配置</el-button>
				</el-button-group>
				
			</el-col>
		</el-row>
		<el-popover ref="filterPopover" width="150" v-model="filterPopoverFlag" placement="bottom-start">
			<ul class="filterPopoverList">
				<li v-for="item in filterOptions">
					<el-checkbox v-model="item.checked">{{item.label}}</el-checkbox>
				</li>
			</ul>
		</el-popover>
		<p  class="btitle">
			<span>设备列表</span>
			<el-button type="text" class="filterBtn" v-popover:filterPopover>列表显示字段选择</el-button>
		</p>

		<table class="el-table">
			<thead>
				<tr>
					<th :class="{'cell': true, 'dn': !filterOptions[0].checked}">ip</th>
					<th :class="{'cell': true, 'dn': !filterOptions[1].checked}">hostname</th>
					<th :class="{'cell': true, 'dn': !filterOptions[2].checked}">cpu/mem</th>
					<th :class="{'cell': true, 'dn': !filterOptions[3].checked}">使用人</th>
					<th :class="{'cell': true, 'dn': !filterOptions[4].checked}">到期时间</th>
					<th :class="{'cell': true, 'dn': !filterOptions[5].checked}">创建时间</th>
					<th :class="{'cell': true, 'dn': !filterOptions[6].checked}">创建人</th>
					<th :class="{'cell': true, 'dn': !filterOptions[7].checked}">类型</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in list">
					<td :class="{'cell': true, 'dn': !filterOptions[0].checked}">{{item.ip}}</td>
					<td :class="{'cell': true, 'dn': !filterOptions[1].checked}">{{item.hostname}}</td>
					<td :class="{'cell': true, 'dn': !filterOptions[2].checked}">{{item.cpu}}</td>
					<td :class="{'cell': true, 'dn': !filterOptions[3].checked}">{{item.user}}</td>
					<td :class="{'cell': true, 'dn': !filterOptions[4].checked}">{{item.expire}}</td>
					<td :class="{'cell': true, 'dn': !filterOptions[5].checked}">{{item.createTime}}</td>
					<td :class="{'cell': true, 'dn': !filterOptions[6].checked}" >{{item.creater}}</td>
					<td :class="{'cell': true, 'dn': !filterOptions[7].checked}">{{item.type}}</td>
				</tr>
			</tbody>
		</table>
		<div class="page-line">
			<el-pagination
			  small
			  layout="prev, pager, next"
			  :total="50">
			</el-pagination>
		</div>

		<el-dialog :visible.sync="importBoxFlag">
			<el-tabs type="card" v-model="activedTab">
				<el-tab-pane label="录入" name="single">
					<el-form :model="importForm" ref="pushForm" label-width="8em">
						<el-form-item label="ip">
							 <el-input type="text" v-model="importForm.ip" />
						</el-form-item>
						<el-form-item label="hostname">
							 <el-input type="text" v-model="importForm.hostname" />
						</el-form-item>
						<el-form-item label="cpu" >
							<el-input type="text" v-model="importForm.cpu" />
						</el-form-item>
						<el-form-item label="使用人">
							 <el-input type="text" v-model="importForm.user" />
						</el-form-item>
						<el-form-item label="到期时间">
							 <el-date-picker
						      v-model="importForm.expire"
						      type="datetime"
						      placeholder="选择日期时间">
						    </el-date-picker>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="批量录入" name="batch">
					<div class="import-uploadArea">
						<el-upload
						  class="upload-demo"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :on-preview="handlePreview"
						  :on-remove="handleRemove"
						  :file-list="fileList">
						  <el-button size="small" type="primary">点击上传</el-button>
						</el-upload>
					</div>
				</el-tab-pane>
			</el-tabs>
			<div class="dialog-buttonGroup">
				<el-button type="primary">确定添加</el-button>
				<el-button @click="importBoxFlag = false;">取消</el-button>
			</div>
		</el-dialog>

		<el-dialog :visible.sync="backyardFlag">
			<div class="backyardContent">
			<el-tabs type="card" v-model="pathTab">
				<el-tab-pane label="目录一" name="first">
					<ul>
						<li v-for="item in pathList.first">
							<span>
								<i class="el-icon-document"></i>
								<input :disabled="item.isEdit ? false : true" v-model="item.name" type="text" />
							</span>
							<el-button type="text" @click="item.isEdit = !item.isEdit">编辑</el-button>
						</li>
						<li><el-button type="text" @click="pathList.first.push({id:'', name: '', isEdit: true})">+ 添加新项</el-button></li>
					</ul>
				</el-tab-pane>
				<el-tab-pane label="目录二" name="second">
					<ul>
						<li v-for="item in pathList.second">
							<span>
								<i class="el-icon-document"></i>
								<input :disabled="item.isEdit ? false : true" v-model="item.name" type="text" />
							</span>
							<el-button type="text" @click="item.isEdit = !item.isEdit">编辑</el-button>
						</li>
						<li><el-button type="text" @click="pathList.second.push({id:'', name: '', isEdit: true})">+ 添加新项</el-button></li>
					</ul>
				</el-tab-pane>
				<el-tab-pane label="目录三" name="third">
					<ul>
						<li v-for="item in pathList.third">
							<span>
								<i class="el-icon-document"></i>
								<input :disabled="item.isEdit ? false : true" v-model="item.name" type="text" />
							</span>
							<el-button type="text" @click="item.isEdit = !item.isEdit">编辑</el-button>
						</li>
						<li><el-button type="text" @click="pathList.third.push({id:'', name: '', isEdit: true})">+ 添加新项</el-button></li>
					</ul>
				</el-tab-pane>
				<el-tab-pane label="目录四" name="fourth">
					<ul>
						<li v-for="item in pathList.fourth">
							<span>
								<i class="el-icon-document"></i>
								<input :disabled="item.isEdit ? false : true" v-model="item.name" type="text" />
							</span>
							<el-button type="text" @click="item.isEdit = !item.isEdit">编辑</el-button>
						</li>
						<li><el-button type="text" @click="fourth.first.push({id:'', name: '', isEdit: true})">+ 添加新项</el-button></li>
					</ul>
				</el-tab-pane>
			</el-tabs>
			</div>
			<div class="dialog-buttonGroup" :visible.sync="importBoxFlag">
				<el-button type="primary">确定添加</el-button>
				<el-button @click="backyardFlag = false;">取消</el-button>
			</div>
		</el-dialog>
		
		
	</div>
</template>
<script>
export default {
	data () {
		return {
			list: [
				{
					id: '',
					ip: '127.0.0.1',
					hostname: 'access_svr_01',
					cpu: "2C4G",
					user: '张三',
					expire: '2017-10-13',
					createTime: '2017-10-13',
					creater: '张三',
					type: '到期'
				}
			],
			filterOptions: [
				{
					checked: true,
					label: 'ip',
					name: 'ip'
				},
				{
					checked: true,
					label: 'hostname',
					name: 'hostname'
				},
				{
					checked: true,
					label: 'cpu/mem',
					name: 'cpu'
				},
				{
					checked: true,
					label: '使用人',
					name: 'user'
				},
				{
					checked: true,
					label: '到期时间',
					name: 'expire'
				},
				{
					checked: true,
					label: '创建时间',
					name: 'createTime'
				},
				{
					checked: true,
					label: '创建人',
					name: 'creater'
				},
				{
					checked: true,
					label: '类型',
					name: 'type'
				},
			],
			importForm: {
				ip: '',
				hostname: '',
				cpu: '',
				user: '',
				expire: ''
			},
			fileList: [
				
			],
			pathList: {
				first: [
					{
						id: 1,
						name: 'rwetr',
						isEdit: false
					},
					{
						id: 2,
						name: 'adf',
						isEdit: false
					}
				],
				second: [
					{
						id: 1,
						name: 'rwetwerqr',
						isEdit: false
					},
					{
						id: 2,
						name: 'ad123f',
						isEdit: false
					}
				],
				third: [
					{
						id: 1,
						name: 'rwe342tr',
						isEdit: false
					},
					{
						id: 2,
						name: '143',
						isEdit: false
					}
				],
				fourth: [
					{
						id: 1,
						name: 'rwet1341r',
						isEdit: false
					},
					{
						id: 2,
						name: '14311432',
						isEdit: false
					}
				]
			},
			activedTab: 'single', //single batch
			pathTab: 'first', //first, second, third, fourth
			importBoxFlag: false,
			backyardFlag: false,
			filterPopoverFlag: false,
			service: '',
			serviceOptions: [
				{
					value: '1',
					lable: '选项一'
				}
			],
			searchKey: '',

			
		}
	},
	mounted () {},
	methods: {
		
		handleRemove(file, fileList) {
        	console.log(file, fileList);
      	},
      	handlePreview(file) {
        	console.log(file);
      	}
	},
	components: {
		
	}
}
</script>
<style lang="less">
.import-uploadArea{
	padding: 20px 0 30px;
}
.dn{
	display: none;
}
.backyardContent{
	li{
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		padding: 0 1.5em;
		input {
			color: #333333;
			background: none;
			border: 1px solid #999999;
			padding: 5px;
			&[disabled] {
				border: none;
			}
		}
	}
}

.filterBtn{
	margin: 0  20px;
	&:before{
		content: ' ';
		display: inline-block;
		width: 16px;
		height: 16px;
		vertical-align: top;
		margin-right: 10px;
		background: url('../images/u2261.png');
	}
}
.filterPopoverList{
	li{
		margin-bottom: 10px;
	}
}
</style>