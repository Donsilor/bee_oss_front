<template>
	<div class="page-content ops-page">
		<div style="padding-bottom: 30px">
			<!--搜索框-->
			<el-row type="flex" justify="space-between">
				<el-col :span="18">
					<el-autocomplete 
						ref="input"
						class="searchInput" 
						v-model="searchKey" 
						:maxlength="11" 
						type="text" 
						placeholder="输入用户手机号码" 
						:fetch-suggestions="querySearch" 
						:trigger-on-focus="false"
						value-key="phone"
						@select="handleSelect">
						<template slot-scope="{ item }">
							<div class="name">{{ item.phone }}</div>
							<span class="addr">{{ item.user_name }}</span>
						</template>
					</el-autocomplete>
					<el-button type="primary" @click="search">&nbsp;&nbsp;查询&nbsp;&nbsp;</el-button>
				</el-col>
				<!--<el-col :span="6" style="text-align: right;">-->
					<!--<el-button v-show="searchedFlag" @click="searchedFlag = false">返回</el-button>-->
				<!--</el-col>-->
			</el-row>
			<div v-if="!hasAllMsg" style="height: 400px; color: #999; width: 100%; text-align: center; line-height: 400px">
				请输入手机号码查询用户信息
			</div>
			<div v-if="hasAllMsg">
				<!--用户信息-->
				<el-row class="user_msg_con">
					<el-col :span="3">
						<div class="first-img">
							<img src="../../images/u2978.png" width="95" height="130">
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
				<el-row class="terminal_list p_r">
					<h3 class="h3_pp">终端列表</h3>
					<!--<div class="right_button">-->
						<!--<el-button type="primary" @click="toRootLog">主查看云平台日志</el-button>-->
					<!--</div>-->
					<el-table
							:data="terminalListPage"
							style="width: 100%">
						<el-table-column v-for="item in terminalList.tableColumn" :key="item.prop"
										 :prop="item.prop"
										 :label="item.label"
										 :width="'auto'"
						>
							<template slot-scope="scope">
								<div v-if="item.prop === 'F_device_state'">
									{{getStatusText(scope.row['F_status'])}}
								</div>
								<div v-else>{{scope.row[item.prop]}}</div>
							</template>
						</el-table-column>
						<el-table-column
								width="auto"
								label="日志">
							<template slot-scope="scope">
								<el-button  type="text" size="small" @click="openLogOutLayer(scope.row)">登录登出日志</el-button>
								<!--<el-button  type="text" size="small" @click="errLogLayer=true">错误日志</el-button>-->
							</template>
						</el-table-column>
					</el-table>
					<pager v-if="terminalList.tableData && terminalList.tableData.length" :data="terminalList.tableData" :display-data="terminalListPage"></pager>
				</el-row>
				<!--家庭详情-->
				<el-row class="p_r">
					<h3 class="h3_pp">家庭详情</h3>
					<el-dropdown class="family_tab" @command="handleCommand" trigger="click">
						<el-button type="" size="small">
							{{allFamily.length && allFamily[allFamilyIndex].name}}<i class="el-icon-arrow-down el-icon--right"></i>
						</el-button>
						<!--<span class="el-dropdown-link">-->
						  <!--{{allFamily.length && allFamily[0].name}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
						<!--</span>-->
						<el-dropdown-menu slot="dropdown" style="max-height:250px;overflow-y:auto">
							<el-dropdown-item :command="item.value" v-for="item in allFamily">{{item.name}}</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<div class="detail_tab_con p_r">
						<el-button @click="openOperListLayer" class="operation-list" size="small" type="primary">用户操作轨迹</el-button>
						<el-tabs v-model="activeName" @tab-click="tabClick">
							<el-tab-pane label="基本信息" name="first"></el-tab-pane>
							<el-tab-pane label="成员" name="second"></el-tab-pane>
							<el-tab-pane label="设备" name="third"></el-tab-pane>
						</el-tabs>
						<!--家庭-基本信息-->
						<el-row class="user_msg_con" v-show="activeName==='first'">
							<el-col :span="2">
								<img src="../../images/u2978.png">
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
						<el-row class="user_msg_con" v-show="activeName==='second'">
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
						<el-row class="user_msg_con" v-show="activeName==='third'" style="padding-top: 0">
							<h3 class="h3_inner">路由器</h3>
							<el-table
									:data="routerList.tableData"
									style="width: 100%; margin-bottom: 15px">
								<el-table-column v-for="item in routerList.tableColumn" :key="item.prop"
												 :prop="item.prop"
												 :label="item.label"
												 :width="'auto'"
								>
									<template slot-scope="scope">
										<div v-if="item.prop === 'F_device_state'">
											{{getRouterStatusText(scope.row['F_device_state'])}}
										</div>
										<div v-else>{{scope.row[item.prop]}}</div>
									</template>
								</el-table-column>
							</el-table>
							<h3 class="h3_inner">子设备</h3>
							<div class="childDevice">
								<el-table
										:data="deviceList.tableData"
										style="width: 100%">
									<el-table-column v-for="item in deviceList.tableColumn" :key="item.prop"
													 :prop="item.prop"
													 :label="item.label"
													 :width="'auto'"
													 sortable
									>
										<template slot-scope="scope">
											<div v-if="item.prop === 'F_device_state'">
												{{getStatusText(scope.row['F_device_state'])}}
											</div>
											<div :title="scope.row[item.prop]" v-else>{{scope.row[item.prop]}}</div>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</el-row>
					</div>
				</el-row>
			</div>
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
			<div class="childDevice">
				<el-table
						:data="logOutList.tableData"
						style="width: 100%">
					<el-table-column v-for="item in logOutList.tableColumn" :key="item.prop"
									 :prop="item.prop"
									 :label="item.label"
					>
						<template slot-scope="scope">
							<div :title="scope.row[item.prop]">{{scope.row[item.prop]}}</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="page-line">
				<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="10" :current-page.sync="currentPage"></el-pagination>
			</div>
			<span slot="footer" class="dialog-footer">
               <el-button @click="logOutLayer = false" style="border:none;">取 消</el-button>
            </span>
		</el-dialog>
		<!--子设备操作流水-->
		<el-dialog
				title="子设备操作流水"
				:visible.sync="operListLayer">
			<div style="padding-bottom:15px">
				<el-date-picker
						v-model="operListForm.date"
						@change="changeSelectOperList"
						placeholder="今天"
				>
				</el-date-picker>
			</div>
			<div class="childDevice">
				<el-table
						:data="operList.tableData"
						style="width: 100%">
					<el-table-column v-for="item in operList.tableColumn" :key="item.prop"
									 :prop="item.prop"
									 :label="item.label"
					>
						<template slot-scope="scope">
							<div v-if="scope.row[item.prop]==='created_time'" :title="scope.row[item.prop].Format('yyyy-MM-dd')">{{scope.row[item.prop].Format('yyyy-MM-dd')}}</div>
							<div v-else-if="scope.row[item.prop]==='rsp_time'" :title="scope.row[item.prop].Format('yyyy-MM-dd')">{{scope.row[item.prop].Format('yyyy-MM-dd')}}</div>
							<div v-else :title="scope.row[item.prop]">{{scope.row[item.prop]}}</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="page-line">
				<el-pagination small layout="prev, pager, next" :total="totalItemOper" @current-change="pageOperChange" :page-size="10" :current-page.sync="currentOperPage"></el-pagination>
			</div>
			<span slot="footer" class="dialog-footer">
               <el-button @click="operListLayer = false" style="border:none;">取 消</el-button>
            </span>
		</el-dialog>
	</div>
</template>
<script>
import { PREFIX } from '../../lib/util';
import * as namespace from '../../store/namespace';
import {mapActions} from 'vuex';
import terminalLists from '../../json/terminalList.json'
import deviceLists from '../../json/devices.json'
import logOutLists from '../../json/logOut.json'
import memberLists from '../../json/members.json'
import routerLists from '../../json/routers.json'
import operLists from '../../json/operList.json'
import '../../lib/util'
import pager from '../../components/pagination/livePagination.vue'
import API from '../../service/index'
export default {
	computed: {
	},
    components: {
        pager
	},
	data () {
		return {
            hasAllMsg: false,
            operListLayer: false,
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
                {name: '注册时间', value: '', prop: 'F_created_at'},
                {name: '最近登录时间', value: '', prop: 'F_last_login_time'},
                {name: '最近登录IP', value: '', prop: 'F_last_login_ip'},
                {name: '最后一次访问的家庭id', value: '', prop: 'F_last_family_id'},
                {name: '在线状态', value: '', prop: 'F_status_name'}
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
			routerList: {},
            operList: {},
            allFamily: [],
			allFamilyIndex: 0,
            user_id: '',
            logOutForm: {
                date: new Date(),
                client_id: '',
				uuid: '',
				userId: ''
            },
			operListForm: {
                date: new Date()
			},
            totalItem: 0,
			currentPage: 1,
            totalItemOper: 0,
			currentOperPage: 1,
			terminalListPage: [],
			suggestionData: [],
			suggestionMore: 0,
			suggestionBegin: 0,
			suggestionSize: 10
		}
	},
	mounted () {
		if (this.$route.params.id) {
		    this.searchKey = this.$route.params.id
            this.getUserData(this.searchKey)
		}
		//element的auto complete不支持分页加载，在这里hack添加支持
		this.$suggestionMoreBtn = document.createElement('div')
		this.$suggestionMoreBtn.className = 'loadmore'
		this.$suggestionMoreBtn.innerHTML = '加载更多'
		this.$suggestionMoreBtn.addEventListener('click', () => {
			const next = this.suggestionBegin + Math.min(this.suggestionMore, this.suggestionSize)
			this.loadSuggestions(next)
		}, false)
		this.$refs.input.$el.querySelector('.el-autocomplete-suggestion').appendChild(this.$suggestionMoreBtn);
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
			this.getUserData(this.searchKey)
		},
		updateSuggestions(result, cb) {
			this.$refs.input.loading = false
			this.suggestionMore = result.more
			this.suggestionBegin = result.begin

			if(result.begin <= 0){	
				this.suggestionData = result.data
			}else{	
				this.suggestionData = this.suggestionData.concat(result.data)
			}

			this.$refs.input.suggestions = this.suggestionData
			this.toggleMoreBtn(result.more)
		},
		toggleMoreBtn(show) {
			this.$suggestionMoreBtn.style.display = show ? '' : 'none'
		},
		loadSuggestions(begin) {	
			API.searchUserList(this.searchKey, begin , this.suggestionSize).then(res => {
				if(res.data.result.list.length){
					this.updateSuggestions({
						data: res.data.result.list,
						more: res.data.result.more,
						begin: begin
					});
				}else{	
					this.updateSuggestions({
						data: [],
						more: 0,
						begin: 0
					})
				}
			})
		},
		querySearch(queryString, cb) {
			var phoneLen = this.searchKey.replace(/\*/g, '').length;
			if(phoneLen >= 5){
				this.loadSuggestions(0)
			}else{
				this.updateSuggestions({
					data: [],
					more: 0,
					begin: 0
				})
			}
		},
		handleSelect(item) {	
			this.getUserData(item.phone)
		},
		// 拉取数据
		getUserData (key) {
            let obj = this
            API.searchUserMsg({phone_num: key}).then((result) => {
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
						list: item,
						family_id: item.info.F_family_id
					})
				})
				this.changeFamilyData(familys[0])
			}
            this.terminalList = terminalLists
		},
		changeFamilyData (dataObj) {
			memberLists.tableData = dataObj.member_list
            deviceLists.tableData = dataObj.device_list
			let arr = []
            arr.push(dataObj.router_info)
			routerLists.tableData = arr
			this.setFamilyInfo(dataObj.info)
			this.memberList = memberLists
            this.deviceList = deviceLists
            this.routerList = routerLists
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
            this.allFamilyIndex = command - 1
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
                page: page,
				limit: 10
            }
            API.searchLogOut(param).then((result) => {
                logOutLists.tableData = result.data
                obj.logOutList = logOutLists
				obj.totalItem = result.total
            })
		},
        pageChange () {
            this.changeLogOut(this.currentPage)
        },
        pageOperChange () {
            this.getOperaList(this.currentOperPage)
        },
		toRootLog () {
            this.$router.push({path: '/main/rootLog/' + this.searchKey})
		},
        getStatusText (type) {
            let text = ''
            switch(type) {
                case 1:
                    text = '有效'
                    break
                case 0:
                    text = '无效'
                    break
                default:
                    text = '未知'
                    break
            }
            return text
        },
        getRouterStatusText (type) {
            let text = ''
            switch(type) {
                case 1:
                    text = '工厂测试'
                    break
                case 2:
                    text = '库存'
                    break
                case 3:
                    text = '销售出'
                    break
                case 5:
                    text = '返修'
                    break
                default:
                    text = '失效'
                    break
            }
            return text
        },
		getOperaList (page) {
            let obj = this
			let param = {
                select_date: this.operListForm.date,
                family_id: 0,
				limit: 5,
                page: page
                // family_id: this.allFamily[this.allFamilyIndex].family_id
			}
            API.operaList(param).then((result) => {
                if (result && result.data) {
                    operLists.tableData = result.data
					obj.totalItemOper = result.total
                }else {
                    operLists.tableData =  []
				}
				obj.operList = operLists
            })
		},
        openOperListLayer () {
            this.operListLayer = true
			this.getOperaList(1)
		},
        changeSelectOperList () {
            this.getOperaList(1)
		}
	},
    ...mapActions([
		'searchUserMsg',
		'searchLogOut',
		'operaList'
    ])
}
</script>
<style lang="less" scope>
	.el-collapse-item__header{height: 250px}
	.p_r{
		position: relative;
	}
	.family_tab{
		position: absolute;
		top: 40px;
		left: 93px;
	}
	.user_msg_con{
		margin-top:10px;
		padding-top: 15px;
	}
	.h3_pp{
		height: 30px;
		line-height: 30px;
		margin:40px 0 15px;
	}
	.h3_inner{
		padding: 0 0 15px;
	}
	.operation-list{
		position: absolute;
		right: 20px;
		z-index: 999;
		top: 15px;
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
	.childDevice, .terminal_list {
		.el-table td>.cell>div{
			overflow:hidden;
			white-space:nowrap;
			text-overflow:ellipsis;
			-o-text-overflow:ellipsis;
			-moz-text-overflow: ellipsis;
			-webkit-text-overflow: ellipsis;
		}
		.el-table .cell, .el-table th>div{
			padding-right: 0;
		}
	}
	.el-autocomplete-suggestion li{	
		position: relative;
	}
	.el-autocomplete-suggestion .nodata,
	.el-autocomplete-suggestion .loadmore{	
		text-align: center;
		font-size: 12px;
		color:#666;
		padding: 10px 0;
		cursor: pointer;
	}
	.el-autocomplete-suggestion li .addr{
		color:#999;
		position: absolute;
		right: 10px;
		top: 1px;
	}
</style>