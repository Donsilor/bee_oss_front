<template>
	<div class="page-content ops-page">
		<div style="padding-bottom: 30px">
			<el-row type="flex" justify="space-between">
				<el-col :span="18">
					<el-input class="searchInput" v-model="searchKey" :maxlength="11" type="text" placeholder="输入用户手机号码" />
					<el-button @click="search">查询</el-button>
				</el-col>
				<el-col :span="6" style="text-align: right;">
					<el-button v-show="searchedFlag" @click="searchedFlag = false">返回</el-button>
				</el-col>
			</el-row>
			<el-row class="user_msg_con">
				<el-col :span="2">
					<img src="../images/u2978.png">
				</el-col>
				<el-col :span="22">
					<el-form label-width="100px" class="user_msg">
						<el-row>
							<el-col :span="7" v-for="item in user_msg">
								<el-form-item :label="item.name">
									<span>{{item.value}}</span>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-col>
			</el-row>
			<el-row class="terminal_list p_r">
				<h3 class="h3_pp">终端列表</h3>
				<div class="right_button">
					<el-button type="primary">用户行为路径</el-button>
					<el-button type="primary">主查看云平台日志</el-button>
				</div>
				<el-table
						:data="terminalList.tableData"
						style="width: 100%">
					<el-table-column v-for="item in terminalList.tableColumn" :key="item.prop"
									 :prop="item.prop"
									 :label="item.label"
									 :width="'auto'"
					>
						<template scope="scope">
							<div>{{scope.row[item.prop]}}</div>
						</template>
					</el-table-column>
					<el-table-column
							width="180"
							label="操作">
						<template scope="scope">
							<el-button  type="text" size="small" @click="logOutLayer=true">登录登出时间</el-button>
							<el-button  type="text" size="small" @click="errLogLayer=true">错误日志</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!--<pager v-show="false" :data="terminalList.tableData" :display-data="terminalList"></pager>-->
			</el-row>
			<el-row class="p_r">
				<h3 class="h3_pp">家庭详情</h3>
				<el-dropdown class="family_tab" @command="handleCommand">
				    <span class="el-dropdown-link">
					  {{allFamily.length && allFamily[0].name}}<i class="el-icon-arrow-down el-icon--right"></i>
				    </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :command="item.value" v-for="item in allFamily">{{item.name}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<div class="detail_tab_con">
					<el-tabs v-model="activeName" @tab-click="tabClick">
						<el-tab-pane label="基本信息" name="first"></el-tab-pane>
						<el-tab-pane label="成员" name="second"></el-tab-pane>
						<el-tab-pane label="设备" name="third"></el-tab-pane>
					</el-tabs>
					<el-row class="user_msg_con" v-if="activeName=='first'">
						<el-col :span="2">
							<img src="../images/u2978.png">
						</el-col>
						<el-col :span="22">
							<el-form label-width="100px" class="user_msg">
								<el-row>
									<el-col :span="7" v-for="item in user_msg">
										<el-form-item :label="item.name">
											<span>{{item.value}}</span>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-col>
					</el-row>
					<el-row class="user_msg_con" v-if="activeName=='second'">
						<el-table
								:data="memberList.tableData"
								style="width: 100%">
							<el-table-column v-for="item in memberList.tableColumn" :key="item.prop"
											 :prop="item.prop"
											 :label="item.label"
											 :width="'auto'"
							>
							</el-table-column>
						</el-table>
					</el-row>
					<el-row class="user_msg_con" v-if="activeName=='third'">
						<el-table
								:data="deviceList.tableData"
								style="width: 100%">
							<el-table-column v-for="item in deviceList.tableColumn" :key="item.prop"
											 :prop="item.prop"
											 :label="item.label"
											 :width="'auto'"
							>
							</el-table-column>
						</el-table>
					</el-row>
				</div>
			</el-row>
		</div>
		<!--错误日志-->
		<el-dialog
			title="错误日志"
			:visible.sync="errLogLayer">
			<el-form ref="errLogForm" :model="errLogForm">
				<el-form-item label="" class="errSearchForm">
					<el-date-picker
							v-model="errLogForm.date"
							type="daterange"
							placeholder="选择日期范围"
							:default-value="today">
					</el-date-picker>
					<el-select v-model="errLogForm.type">
						<el-option label="uuid" value="uuid"></el-option>
						<el-option label="msg_tag" value="msg_tag"></el-option>
						<el-option label="user_id" value="user_id"></el-option>
						<el-option label="route_id" value="route_id"></el-option>
					</el-select>
					<el-input v-model="errLogForm.inner" placeholder="包含"></el-input>
					<el-input v-model="errLogForm.uid" placeholder="uuid"></el-input>
					<el-button type="primary" @click="searchErrLog">搜 索</el-button>
				</el-form-item>
			</el-form>
			<el-collapse v-model="activeNames" accordion>
				<el-collapse-item :title="item.key" :name="index" v-for="(item, index) in errLogList">
					<div>{{item.value}}</div>
				</el-collapse-item>
			</el-collapse>
			<span slot="footer" class="dialog-footer">
               <el-button @click="errLogLayer = false" style="border:none;">取 消</el-button>
            </span>
		</el-dialog>
		<!--登录登出日志-->
		<el-dialog
			title="登录登出日志"
			:visible.sync="logOutLayer">
			<div style="padding-bottom:15px">
				<el-date-picker
						v-model="logOutForm.date"
						type="daterange"
						placeholder="选择日期范围"
						:default-value="today">
				</el-date-picker>
			</div>
			<el-table
					:data="logOutList.tableData"
					style="width: 100%">
				<el-table-column v-for="item in logOutList.tableColumn" :key="item.prop"
								 :prop="item.prop"
								 :label="item.label"
								 :width="'auto'"
				>
					<template scope="scope">
						<div>{{scope.row[item.prop]}}</div>
					</template>
				</el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
               <el-button @click="logOutLayer = false" style="border:none;">取 消</el-button>
            </span>
		</el-dialog>
	</div>
</template>
<script>
import { PREFIX } from '../lib/util';
import * as namespace from '../store/namespace';
import {mapActions} from 'vuex';
import pager from '../components/pagination/livePagination.vue'
export default {
	computed: {
	},
    components: {
        pager
    },
	data () {
		return {
            logOutForm: {
                date: ''
			},
            logOutList: {},
            logOutLayer: false,
            activeNames: [0],
            errLogList: [
				{
				    key: 'safdasfdsafd',
					value: '大分类的发上来开发家乐福大发的卡机福利发的卡老师附近溜达房' +
					'价大力发动机奥拉夫大家了看法懒得卡附近溜达咖啡啊'
				},
                {
                    key: 'safdasfdsafd',
                    value: '大分类的发上来开发家乐福大发的卡机福利发的卡老师附近溜达房' +
                    '价大力发动机奥拉夫大家了看法懒得卡附近溜达咖啡啊'
                },
                {
                    key: 'safdasfdsafd',
                    value: '大分类的发上来开发家乐福大发的卡机福利发的卡老师附近溜达房' +
                    '价大力发动机奥拉夫大家了看法懒得卡附近溜达咖啡啊'
                }
			],
		    today: '2017-11-20',
            errLogForm: {
                inner: '',
				uid: '',
				type: 'uuid',
                date: ''
			},
            errLogLayer: false,
            activeName: 'first',
            searchedFlag: true,
            searchKey: '',
            user_msg: [
				{name: '昵称', value: '', prop: 'F_nick'},
                {name: '性别', value: '', prop: 'F_gender'},
                {name: '出生日期', value: '', prop: 'F_birthday'},
                {name: '手机号', value: '', prop: 'F_phone_num'},
                {name: '状态', value: '', prop: 'F_state'},
                {name: '创建时间', value: '', prop: 'F_created_at'},
                {name: '最近登录时间', value: '', prop: 'F_last_login_time'},
                {name: '最近登录IP', value: '', prop: 'F_last_login_ip'},
                {name: '最后一次访问的家庭id', value: '', prop: 'F_last_family_id'}
			],
            terminalList: {},
            memberList: {},
			deviceList: {},
            allFamily: [
				{name:'家庭一', value:'1'},
                {name:'家庭二', value:'2'},
                {name:'家庭三', value:'3'}
			]
		}
	},
	mounted () {
		const obj = this
        obj.$store.dispatch('getTerminalList', {}).then((result) => {
            obj.terminalList = result
        })
        obj.$store.dispatch('getMemberList', {}).then((result) => {
            obj.memberList = result
        })
        obj.$store.dispatch('getDeviceList', {}).then((result) => {
            obj.deviceList = result
        })
        obj.$store.dispatch('getLogOutList', {}).then((result) => {
            obj.logOutList = result
        })
	},
	watch: {
	},
	methods: {
        searchErrLog () {
            this.$message.error('123123')
		},
		search () {
		    if (!this.searchKey) {
			  this.$message.error('请输入手机号码')
			  return
			}
			let obj = this
			obj.$store.dispatch('searchUserMsg',{phone_num: obj.searchKey}).then((result) => {
		        obj.setUsermsg(result.info)
			})
		},
        tabClick () {
		    console.log('输出tab')
		},
        handleCommand(command) {
            this.$message('click on item ' + command);
        },
		setUsermsg (data) {
            this.user_msg.forEach((item) => {
                let thisProp = item.prop
				let thisVal = data[thisProp]
				let text = ''
                switch (thisProp) {
					case 'F_state':
                        text = thisVal === 0 ? '有效' : thisVal === 1 ? '禁用' : '删除'
						break
                    case 'F_gender':
                        text = thisVal === 0 ? '未配置' : thisVal === 1 ? '男' : '删除'
                        break
					default:
                        text = thisVal
                        break
				}
                item.value = text || '------'
			})
		}
	},
    ...mapActions([
        'getTerminalList',
		'getMemberList',
		'getDeviceList',
		'getLogOutList',
		'searchUserMsg'
    ])
}
</script>
<style lang="less" scope>
	.p_r{
		position: relative;
	}
	.family_tab{
		position: absolute;
		top: 34px;
		left: 93px;
	}
	.user_msg_con{
		margin-top:30px;
		padding-top: 15px;
	}
	.h3_pp{
		height: 30px;
		line-height: 30px;
		margin:30px 0 15px;
	}
</style>
<style lang="less">
	.errSearchForm{
		.el-input{
			width: 100px;
		}
		.el-select{
			.el-input{
				width: 150px;
			}
		}
		.el-date-editor{
			width: 200px;
		}
	}
	.right_button{
		position: absolute;
		right: 0px;
		top: 15px;
	}
	.user_msg{
		.el-form-item{
			width:100%;
			margin-bottom:2px;
		}
		.el-form-item__label{color: #999}
	}
	.ops-page{
		.el-dropdown-link{
			color: #20a0ff;
		}
	}
	.detail_tab_con{
		padding: 15px;
		border:1px solid #dfe6ec;
		.el-tabs__header{
			border-bottom-color: #eee;
		}
		.el-tabs__nav{
			.el-tabs__active-bar{
				height: 2px !important;
			}
		}
	}
</style>