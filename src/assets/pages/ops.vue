<template>
	<div class="page-content ops-page">
		<div style="padding-bottom: 30px">
			<!--搜索框-->
			<el-row type="flex" justify="space-between">
				<el-col :span="18">
					<el-input class="searchInput" v-model="searchKey" :maxlength="11" type="text" placeholder="输入用户手机号码" />
					<el-button @click="search">查询</el-button>
				</el-col>
				<!--<el-col :span="6" style="text-align: right;">-->
					<!--<el-button v-show="searchedFlag" @click="searchedFlag = false">返回</el-button>-->
				<!--</el-col>-->
			</el-row>
			<!--用户信息-->
			<el-row v-if="hasAllMsg" class="user_msg_con">
				<el-col :span="3">
					<div class="first-img">
						<img src="../images/u2978.png" width="95" height="130">
					</div>
				</el-col>
				<el-col :span="21">
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
			<!--终端列表-->
			<el-row v-if="hasAllMsg" class="terminal_list p_r">
				<h3 class="h3_pp">终端列表</h3>
				<div class="right_button">
					<!--<el-button type="primary">用户行为路径</el-button>-->
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
							width="auto"
							label="日志">
						<template scope="scope">
							<el-button  type="text" size="small" @click="openLogOutLayer(scope.row)">登录登出日志</el-button>
							<!--<el-button  type="text" size="small" @click="errLogLayer=true">错误日志</el-button>-->
						</template>
					</el-table-column>
				</el-table>
				<!--<pager v-show="false" :data="terminalList.tableData" :display-data="terminalList"></pager>-->
			</el-row>
			<!--家庭详情-->
			<el-row v-if="hasAllMsg" class="p_r">
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
					<!--家庭-基本信息-->
					<el-row class="user_msg_con" v-if="activeName==='first'">
						<el-col :span="2">
							<img src="../images/u2978.png">
						</el-col>
						<el-col :span="22">
							<el-form label-width="100px" class="user_msg">
								<el-row>
									<el-col :span="7" v-for="item in family_info">
										<el-form-item :label="item.name">
											<span>{{item.value}}</span>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-col>
					</el-row>
					<!--家庭-成员列表-->
					<el-row class="user_msg_con" v-if="activeName==='second'">
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
					<!--家庭-设备列表-->
					<el-row class="user_msg_con" v-if="activeName==='third'">
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
					>
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
			<el-collapse v-model="errActiveName" accordion>
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
						@change="changeSelectLogOutDate"
						placeholder="今天"
				>
				</el-date-picker>
			</div>
			<el-table
					:data="logOutList.tableData"
					style="width: 100%">
				<el-table-column v-for="item in logOutList.tableColumn" :key="item.prop"
								 :prop="item.prop"
								 :label="item.label"
				>
					<template scope="scope">
						<div>{{scope.row[item.prop]}}</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="page-line">
				<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="20" :current-page.sync="currentPage"></el-pagination>
			</div>
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
import terminalLists from '../json/terminalList.json'
import deviceLists from '../json/devices.json'
import logOutLists from '../json/logOut.json'
import memberLists from '../json/members.json'
import '../lib/util'
export default {
	computed: {
	},
    components: {},
	data () {
		return {
            hasAllMsg: false,
            logOutLayer: false,
            errActiveName: [0],
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
		    today: [
                new Date(),
                new Date()
			],
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
			family_info: [
                {name: '内部ID', value: '', prop: 'F_owner_id'},
                {name: '家庭名称', value: '', prop: 'F_name'},
                {name: '户主ID', value: '', prop: 'F_owner_id'},
                {name: '路由器uuid', value: '', prop: 'F_router_id'},
                {name: '省份', value: '', prop: 'F_provice'},
                {name: '城市', value: '', prop: 'F_city'},
                {name: '小区', value: '', prop: 'F_district'},
                {name: '地址', value: '', prop: 'F_addr'},
                {name: '栋', value: '', prop: 'F_building_no'},
                {name: '房号', value: '', prop: 'F_room_no'},
                {name: '创建时间', value: '', prop: 'F_created_at'},
                {name: '更新时间', value: '', prop: 'F_updated_at'}
			],
            terminalList: {},
            memberList: {},
			deviceList: {},
            logOutList: {},
            allFamily: [],
            user_id: '',
            logOutForm: {
                date: new Date(),
                client_id: '',
				uuid: '',
				userId: ''
            },
            totalItem: 0,
			currentPage: 1
		}
	},
	mounted () {
		const obj = this
//        obj.$store.dispatch('getTerminalList', {}).then((result) => {
//            obj.terminalList = result
//        })
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
		        obj.user_id = result.info.F_uid
		        obj.setUsermsg(result.info)
				obj.hasAllMsg = true
				obj.setAllData(result)
			})
		},
		setAllData (dataObj) {
            terminalLists.tableData = dataObj.client_list
			if(dataObj.family_list && dataObj.family_list.length){
                let familys = dataObj.family_list
                this.allFamily = []
                familys.forEach((item, index) => {
                    this.allFamily.push({
						name: '家庭' + (index + 1),
						value: index + 1,
						list: item
					})
				})
				this.changeFamilyData(familys[0])
			}
            this.terminalList = terminalLists
		},
		changeFamilyData (dataObj) {
			memberLists.tableData = dataObj.member_list
            deviceLists.tableData = dataObj.device_list
			this.setFamilyInfo(dataObj.info)
			this.memberList = memberLists
            this.deviceList = deviceLists
		},
        setFamilyInfo (data) {
            this.family_info.forEach((item) => {
                let thisProp = item.prop
                let thisVal = data[thisProp]
                let text = ''
                switch (thisProp) {
                    case 'F_state':
                        text = thisVal === 0 ? '有效' : thisVal === 1 ? '禁用' : '删除'
                        break
                    default:
                        text = thisVal
                        break
                }
                item.value = text || '------'
            })
        },
        tabClick () {
		    // console.log('输出tab')
		},
        handleCommand(command) {
            this.changeFamilyData(this.allFamily[command-1].list)
           // this.$message('click on item ' + command);
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
		},
        openLogOutLayer (data) {
            this.logOutLayer = true
            let form = this.logOutForm
			form.date = new Date()
            form.uuid = data.F_uuid
            form.client_id = data.F_clientId
            form.user_id = this.user_id
            this.changeLogOut(1)
        },
        changeSelectLogOutDate () {
            this.changeLogOut(1)
		},
        changeLogOut (page) {
			// let date = this.logOutForm.date.Format('yyyy-MM-dd')
			let obj = this
			let form = this.logOutForm
			let param = {
                select_date: form.date.Format('yyyy-MM-dd'),
                client_id: form.client_id,
                uuid: form.uuid,
				user_id: obj.user_id,
                current_page: page,
				limit: 10
            }
            obj.$store.dispatch('searchLogOut', param).then((result) => {
                logOutLists.tableData = result.data
                obj.logOutList = logOutLists
            })
		},
        pageChange () {
            this.changeLogOut(this.currentPage)
        },
	},
    ...mapActions([
		'searchUserMsg',
		'searchLogOut'
    ])
}
</script>
<style lang="less" scope>
	.p_r{
		position: relative;
	}
	.family_tab{
		position: absolute;
		top: 45px;
		left: 93px;
	}
	.user_msg_con{
		margin-top:30px;
		padding-top: 15px;
	}
	.h3_pp{
		height: 30px;
		line-height: 30px;
		margin:40px 0 15px;
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
		.first-img{
			width: 95px;
			height: 130px;
			overflow: hidden;
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