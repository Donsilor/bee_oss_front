<template>
	<div class="page-content ops-page">
		<el-popover ref="filterPopover" width="440" v-model="filterPopoverFlag" placement="bottom-start">
			<div class="ops-filterFormBox">
				<el-row class="ops-line" :gutter="20">
					<el-col :span="5">
						<label>推送设备</label>
					</el-col>
					<el-col :span="7">
						<el-select v-model="filterForm.facility" placeholder="全部">
							<el-option
						      v-for="item in facilityOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<label>设备厂商</label>
					</el-col>
					<el-col :span="7">
						<el-select v-model="filterForm.firm" placeholder="全部">
							<el-option
						      v-for="item in firmOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row class="ops-line" :gutter="20">
					<el-col :span="5">
						<label>升级类型</label>
					</el-col>
					<el-col :span="7">
						<el-select v-model="filterForm.type" placeholder="全部">
							<el-option
						      v-for="item in typeOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<label>子设备</label>
					</el-col>
					<el-col :span="7">
						<el-select v-model="filterForm.child" placeholder="全部">
							<el-option
						      v-for="item in childOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row type="flex" justify="end">
					<el-col :span="4">
						<el-button @click="filterPopoverFlag = false" type="primary">查询</el-button>
					</el-col>
				</el-row>
			</div>
		</el-popover>
		<div v-show="!statisticsFlag">
			<el-row type="flex" justify="space-between">
				<el-col :span="18">
					<el-button-group v-show="!searchedFlag">
						<el-button @click="pushBoxFlag = true">推送升级</el-button>
						<el-button @click="statisticsFlag = true">设备版本统计</el-button>
						<el-button v-popover:filterPopover>筛选 <i class="el-icon-caret-bottom"></i></el-button>
					</el-button-group>
					<el-input class="searchInput" v-model="searchKey" :maxlength="11" type="text" placeholder="输入用户手机号码" />
					<el-button @click="searchedFlag = true">查询</el-button>
				</el-col>
				<el-col :span="6" style="text-align: right;">
					<el-button v-show="searchedFlag" @click="searchedFlag = false">返回</el-button>
				</el-col>
			</el-row>
			
			<p v-show="!searchedFlag" class="btitle">设备升级记录</p>

			<el-table :data="list" v-show="!searchedFlag" style="width: 100%" v-on:row-click="rowChoosed">
				<el-table-column prop="facility" label="推送设备"></el-table-column>
				<el-table-column prop="type" label="类型"></el-table-column>
				<el-table-column prop="time" label="时间" width="200"></el-table-column>
				<el-table-column prop="version" label="版本号"></el-table-column>
				<el-table-column prop="batch" label="批次"></el-table-column>
				<el-table-column prop="success" label="成功与否" :formatter="changeString"></el-table-column>
				<el-table-column prop="rate" label="推送到达率"></el-table-column>
			</el-table>
		</div>
		<div v-show="statisticsFlag">
			<el-row>
				<el-col :span="18">
					<p class="btitle">设备版本分布情况统计</p>
				</el-col>
				<el-col :span="6" style="text-align: right;">
					<el-button @click="statisticsFlag = false">返回</el-button>
				</el-col>
			</el-row>
			<el-tabs v-model="activedTab" type="card" @tab-click="changeTab">
				<el-tab-pane label="路由器" name="router">
					<p class="statisticsHeader"><em>各版本情况</em><span>单位 个</span></p>
					<div id="routerEchart-area" class="statisticsEchart-area"></div>
				</el-tab-pane>
				<el-tab-pane label="app" name="app">
					<p class="statisticsHeader"><em>各版本情况</em><span>单位 个</span></p>
					<div id="appEchart-area" class="statisticsEchart-area"></div>
				</el-tab-pane>
				<el-tab-pane label="子设备" name="child">
					<div class="statisticsHeader">
						<el-select v-model="statisticsFilter.category" placeholder="品类">
							<el-option
						      v-for="item in categoryOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
						<el-select v-model="statisticsFilter.brand" placeholder="品牌">
							<el-option
						      v-for="item in brandOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</div>
					<div id="childEchart-area" class="statisticsEchart-area"></div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="cp-searchResult" v-show="searchedFlag">
			<p class="btitle">查询结果</p>
			<div class="cp-personBox">
				<div class="cppb-infoArea">
					<div><img :src="person.image" /></div>
					<div><h2>{{person.name}}</h2>
						<p>{{person.sex}} {{person.birth}} {{person.mobile}}</p>
						<p>{{person.city}} {{person.address}} {{person.unit}}</p>
						<p>共{{facilitysTotal}}个关联设备 {{unusualfacilitysTotal}}个异常</p></div>
				</div>
				<el-table :data="person.facilitys" style="width: 100%">
					<el-table-column prop="name" label="设备名称"></el-table-column>
					<el-table-column prop="brand" label="品牌"></el-table-column>
					<el-table-column prop="category" label="品类"></el-table-column>
					<el-table-column prop="type" label="型号"></el-table-column>
					<el-table-column prop="UUID" label="UUID"></el-table-column>
					<el-table-column prop="status" label="状态"></el-table-column>
					<el-table-column prop="guarantee" label="保修状态"></el-table-column>
					<el-table-column  label="操作" width="180" >
						<template slot-scope="scope">
							<el-button @click="console.log(scope.row)" type="text">查看日志</el-button>
							<el-button @click="console.log(scope.row)" type="text">下载日志</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<el-dialog :visible.sync="rateTableFlag">
			<div class="rateTable">
				<div class="rateTable-header">
					<h2>版本升级的比率情况</h2>
					<span>统计截止2017-10-12 18:23 (单位：%)</span>
				</div>
				<div id="rateEchart-area" class="rateEchart-area">
					
				</div>
			</div>
		</el-dialog>
		<el-dialog title="推送升级" :visible.sync="pushBoxFlag">
			<el-form :model="pushForm" ref="pushForm" label-width="8em">
				<el-form-item label="设备类型" >
					<el-row>
						<el-col :span="7">
							<el-select v-model="pushForm.terminal" placeholder="终端">
								<el-option
							      v-for="item in terminalOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</el-col>
						<el-col :span="7" :offset="1">
							<el-select v-model="pushForm.os" placeholder="操作系统">
								<el-option
							      v-for="item in osOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</el-col>
						<el-col :span="8"  :offset="1">
							<el-select v-model="pushForm.version" placeholder="版本号">
								<el-option
							      v-for="item in versionOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item label="版本号">
					 <el-input type="text" v-model="pushForm.number" />
				</el-form-item>
				<el-form-item label="推送时间">
					 <el-date-picker
				      v-model="pushForm.time"
				      type="datetime"
				      placeholder="选择日期时间">
				    </el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" native-type="submit">确定</el-button>
					<el-button @click="pushBoxFlag = false;">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		
	</div>
</template>
<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import { PREFIX } from '../lib/util';
import * as namespace from '../store/namespace';
import {mapGetters} from 'vuex';
export default {
	computed: {
		'facilitysTotal' () {
			return this.person.facilitys.length;
		},
		'unusualfacilitysTotal' () {
			return this.person.facilitys.filter(item => item.status === "unusual").length;
		}
	},
	data () {
		return {
			list: [
				{
					facility: '路由器',
					type: '主动推送',
					time: '2017-12-18 12:00:00',
					version: '1.9.2',
					batch: '124',
					success: false,
					rate: '100%'
				}
			],
			person: {
				image: '',
				name: "张大民",
				sex: "男",
				birth: '1982-02-13',
				mobile: '13800000000',
				city: '广州',
				address: "恒大山水郡",
				unit: '6栋602',
				facilitys: [
					{
						name: '海尔-SDF334',
						brand: '美的',
						category: '灯',
						type: 'SDFSDF3245656',
						UUID: '2412342345',
						status: 'unusual',
						guarantee: '在保'
					},
					{
						name: '海尔-SDF334',
						brand: '海尔',
						category: '洗衣机',
						type: 'SDFSDF3245656',
						UUID: '2412342345',
						status: 'unusual',
						guarantee: '在保'
					},
					{
						name: '海尔-SDF334',
						brand: 'SONY',
						category: '灯',
						type: 'SDFSDF3245656',
						UUID: '2412342345',
						status: 'normal',
						guarantee: '在保'
					},
					{
						name: '海尔-SDF334',
						brand: '格力',
						category: '空调',
						type: 'SDFSDF3245656',
						UUID: '2412342345',
						status: 'normal',
						guarantee: '在保'
					},
					{
						name: '海尔-SDF334',
						brand: '飞利浦',
						category: '空调',
						type: 'SDFSDF3245656',
						UUID: '2412342345',
						status: 'normal',
						guarantee: '在保'
					},
				]
			},
			searchKey: '',
			pushBoxFlag: false,
			filterPopoverFlag: false,
			searchedFlag: false,
			rateTableFlag: false,
			statisticsFlag: false,
			activedTab: 'router', //router, app, child
			pushForm: {
				terminal: '',
				os: '',
				version: '',
				number: '',
				time: '',
			},
			filterForm: {
				facility: '',
				firm: '',
				type: '',
				child: ''
			},
			statisticsFilter: {
				category: '',
				brand: ''
			},
			categoryOptions: [
				{
					value: '1',
					lable: '选项一'
				}
			],
			brandOptions:  [
				{
					value: '1',
					lable: '选项一'
				}
			],
			terminalOptions: [
				{
					value: '1',
					lable: '选项一'
				}
			],
			osOptions: [
				{
					value: '1',
					lable: '选项一'
				}
			],
			versionOptions: [
				{
					value: '1',
					lable: '选项一'
				}
			],
			facilityOptions: [
				{
					value: '1',
					lable: '选项一'
				}
			],
			firmOptions: [
				{
					value: '1',
					lable: '选项一'
				}
			],
			childOptions: [
				{
					value: '1',
					lable: '选项一'
				}
			],
			typeOptions: [
				{
					value: '1',
					lable: '选项一'
				}
			],
			routerEchart: null,
			appEchart: null,
			childEchart: null

		}
	},
	mounted () {
		//this.initStatisticsEchart();
	},
	watch: {
		'statisticsFlag' (curVal, oldVal) {
			if (curVal) {
				this.renderStatisticsEchart(this.activedTab);
			}
		}
	},
	methods: {
		changeString(row, columen, value) {
			if (value) {
				return '成功';
			} else {
				return '失败';
			}
		},
		rowChoosed (row, event) {
			this.rateTableFlag = true;
			setTimeout(() => {
				this.renderRateEchart();
			}, 100);
			
			//console.log(row);
		},

		changeTab(tab, event) {
			this.renderStatisticsEchart(tab.name);
			
		},

		initStatisticsEchart() {
			this.routerEchart = echarts.init(document.getElementById('routerEchart-area'));
			this.appEchart = echarts.init(document.getElementById('appEchart-area'));
			this.childEchart = echarts.init(document.getElementById('childEchart-area'));
		},

		renderStatisticsEchart(chartName) {
			setTimeout(() => {
				if (!this[`${chartName}Echart`]) {
					this[`${chartName}Echart`] = echarts.init(document.getElementById(`${chartName}Echart-area`));
				}
				this[`${chartName}Echart`].setOption({
					color: ['#3398DB'],
					xAxis: {
						data: ["2.0", "1.8", "1.6", "1.5", "1.3", "1.2", "1.1", "1.0"]
					},
					yAxis:{
						type: 'value',
						interval: 5000
					},
					series: [
						{
							name: 'users',
							type: 'bar',
							barWidth: '40%',
							label: {
				                normal: {
				                    show: true,
				                    position: 'top',
				                    color: '#333'
				                }
				            },
							data: [15087, 18344, 16444, 17789, 0, 0, 0, 20]
						}
					]
				});
			}, 500);
			
		},

		renderRateEchart () {
			const alertChart = echarts.init(document.getElementById('rateEchart-area'));
			alertChart.setOption({
				color: ['#3398DB'],
				xAxis: {
					data: ["推送通知", "升级成功率", "升级失败率", "取消升级率"]
				},
				yAxis: {
					type: 'value',
					interval: 20,
					max: 100,
					min: 0
				},
				series: [
					{
						name: '比率',
						type: 'bar',
						barWidth: '40%',
						label: {
			                normal: {
			                    show: true,
			                    position: 'top',
			                    color: '#333'
			                }
			            },
						data: [
							{
								name: '67.23%',
								value: 67.23
							}, 
							{
								name: '56.24%',
								value: 56.24
							},
							{
								name: '38.42%',
								value: 38.42
							},
							{
								name: '7.25%',
								value: 7.25
							}
						]
					}
				]
			})
		}
	},
	components: {
		
	}
}
</script>
<style lang="less">
.ops-filterFormBox{
	padding: 20px;
	label{
		line-height: 36px;
	}
	.ops-line{
		margin-bottom: 20px;
	}
}
.cp-personBox{
	img{
		box-sizing: border-box;
		width: 120px;
		height: 120px;
		border: 1px solid #999999;
	}
	.cppb-infoArea{
		margin-bottom: 40px;
		overflow: hidden;
		>div{
			float: left;
			margin-right: 40px;
			h2{
				font-size: 1.125em;
				margin-bottom: 8px;
			}
			p{
				font-size: .875em;
				color: #999;
				margin-bottom: 8px;
			}
		}
	}
}
.rateTable{
	.rateTable-header{
		h2{
			font-size: 1.125em;
			display: inline;
			margin-right: 20px;
		}
		span{
			font-size: .875em;
			color: #999999;
		}
	}
	.rateEchart-area{
		width: 100%;
		height: 300px;
	}
}
.statisticsEchart-area{
	height: 400px;
	width: 100%;
}
.statisticsHeader{
	margin: 20px  0 30px;
	em{
		font-style: normal;
		font-size: .875em;
		margin-right: 20px;
	}
	span{
		color: #999999;
		font-size: .875em;
	}
}
</style>