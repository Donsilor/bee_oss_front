<template>
	<div class="home-page">
		<el-row class="hp-dataArea" :gutter="40">
			<el-col :span="8">
				<header class="hp-header">
					<h2>路由器信息</h2>
					<!-- <span>截止时间{{homeData.statistics_time}}</span> -->
				</header>
				<el-row :gutter="15">
					<el-col :span="12">
						<div class="hp-dataBox hp-icon01">
							<p>{{homeData.router_count}}</p>
							<p>设备安装总量</p>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="hp-dataBox hp-icon02">
							<p>{{homeData.router_online_percent}}</p>
							<p>设备在线比例</p>
						</div>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="8">
				<header class="hp-header">
					<h2>APP信息</h2>
					<!-- <span>截止时间{{homeData.statistics_time}}</span> -->
				</header>
				<el-row :gutter="15">
					<el-col :span="12">
						<div class="hp-dataBox hp-icon03">
							<p>{{homeData.app_count}}</p>
							<p>APP安装总量</p>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="hp-dataBox hp-icon02">
							<p>{{homeData.app_online_percent}}</p>
							<p>设备在线比例</p>
						</div>
					</el-col>
				</el-row>
			</el-col>
			<!--<el-col :span="8">-->
				<!--<header class="hp-header">-->
					<!--<h2>活跃度</h2>-->
					<!--&lt;!&ndash; <span>截止时间{{homeData.statistics_time}}</span> &ndash;&gt;-->
				<!--</header>-->
				<!--<el-row :gutter="15">-->
					<!--<el-col :span="12">-->
						<!--<div class="hp-dataBox hp-icon04">-->
							<!--<p>{{homeData.pv}}</p>-->
							<!--<p>PV</p>-->
						<!--</div>-->
					<!--</el-col>-->
					<!--<el-col :span="12">-->
						<!--<div class="hp-dataBox hp-icon05">-->
							<!--<p>{{homeData.uv}}</p>-->
							<!--<p>UV</p>-->
						<!--</div>-->
					<!--</el-col>-->
				<!--</el-row>-->
			<!--</el-col>-->
		</el-row>
		<header class="hp-header">
			<h2>报警趋势图</h2>
			<!-- <span>截止时间2017-10-13 14:50</span> -->
		</header>
		<section class="hp-alertTable">
			<div class="hpat-dateRangeArea">
				<el-date-picker v-model="range" range-separator=" ~ " type="daterange" align="left" placeholder="时间段选择" :picker-options="pickerOption" v-on:change="changeDate"></el-date-picker>
			</div>
			<div id="echart-area" class="echart-area">
				
			</div>
		</section>
	</div>
</template>
<script>
import echarts from 'echarts/lib/echarts';
import * as namespace from '../store/namespace';
import {mapGetters} from 'vuex';
import { PREFIX } from '../lib/util.js';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title'; 

export default {
	data () {


		return {
			//TODO just for test echart
			now: new Date(2007, 10, 24),
			temMinute: 10 * 60 * 1000,
			fakeValue: 50,
			fakeDate: [],


			alertChart: null,
			homeData: {},
			range: "",
			pickerOption: {
				shortcuts: [
					{
			            text: '最近一周',
			            onClick(picker) {
			                const end = new Date();
			                const start = new Date();
			                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			                picker.$emit('pick', [start, end]);
			            }
		          	}, 
		          	{
			            text: '最近一个月',
			            onClick(picker) {
			                const end = new Date();
			                const start = new Date();
			                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			                picker.$emit('pick', [start, end]);
			            }
		            }, 
		            {
			            text: '最近三个月',
			            onClick(picker) {
			                const end = new Date();
			                const start = new Date();
			                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
			                picker.$emit('pick', [start, end]);
			        	}
		        	}
		        ]
			}
		}
	},
	mounted () {

		this.initEchart();
		this.getHomeData();
		for(let i = 0; i < 144; i += 1) {
			this.fakeDate.push(this.randomData());
		}
		this.getAlarmst();
	
	},
	methods: {
		randomData() {
			
			this.now = new Date(this.now.getTime() + this.temMinute);
			this.fakeValue = this.fakeValue + Math.random() * 21 -10;
			
			return {
				name: this.now.toString(),
				value: [
					this.now.Format('yyyy/MM/dd hh:mm'),
					Math.round(this.fakeValue)
				]
			}
		},

		getHomeData () {
			this.$http.post(PREFIX + 'homepage/index', {
				token: this.token
			}).then(res => {
				const json = res.data;
				if (json.code === 200) {
					this.homeData = json.result.data;
				} else {
					this.$message.error(json.msg);
				}
			})
		},

		changeDate (value) {
			this.getAlarmst(value);
		},

		getAlarmst(range) {
			const handleData =  x => {
				const curDate = new Date(x.statistics_time);
				return {
					name: curDate.toString(),
					value: [
						curDate.Format('yyyy/MM/dd hh:mm'),
						x.count
					]
				}
			}
			let params = {
				token: this.token
			};
			if (range) {
				const ranges = range.split(' ~ ');
				params.start_time = ranges[0];
				params.end_time =ranges[1];
			}
			
			this.$http.post(PREFIX + 'homepage/alarmst', params).then(res => {
				const json = res.data;
				if (json.code === 200) {
					const data = json.result.data.map(handleData);
					this.renderEchart(data);
				} else {
					this.$message.error(json.msg);
				}
				
			})
		},
		initEchart () {
			this.alertChart = echarts.init(document.getElementById('echart-area'));
		},

		renderEchart (data) {
			this.alertChart.setOption({
				tooltip: {
			        trigger: 'axis',
			        formatter: function (params) {
			            params = params[0];
			            var date = new Date(params.name);
			            return `${date.Format('yyyy/MM/dd hh:mm')} ${params.value[1]}`;
			        },
			        axisPointer: {
			            animation: false
			        }
			    },
				xAxis: {
			        type: 'time',
			        splitLine: {
			            show: false
			        }
			    },
				yAxis: {
					name: "报警次数",
					type: 'value',
			        boundaryGap: [0, '100%'],
			        splitLine: {
			            show: true
			        }
				},
				series: [
					{
						name: '次数',
						type: 'line',
						data: data
					}
				]
			})
		}
	},
	computed: {
        ...mapGetters({
        	token: namespace.TOKEN
        })
    }
}
</script>
<style lang="less">
.iconStyle(@width: 16px, @height: 16px){
	width: @width;
	height: @height;
	background-size: @width @height;
}
.home-page{
	background: #F2F2F2;
	padding: 75px 60px;
}

.hp-header{
	margin-bottom: 1em;
	h2{
		font-size: 1.125em;
		display: inline-block;
		margin-right: 1em;
	}
	span{
		font-size: .875em;
		color: #999999;
	}
}
.hp-dataArea{
	margin-bottom: 40px;
}
.hp-dataBox{
	background: #ffffff;
	height: 125px;
	box-sizing: border-box;
	padding: 32px 20px 32px 86px;
	position: relative;
	&:hover{
		box-shadow:  2px 2px 10px rgba(0, 0, 0, .15)
	}
	p{
		&:first-child{
			color: #00CC33;
			font-size: 1.75em;
			font-weight: bold;
		}
		&:nth-child(2) {
			color: #999999;
			font-size: .875em;
		}
	}
	&:before{
		content: ' ';
		display: block;
		position: absolute;
		top: 50px;
		left: 30px;
	}
	&.hp-icon01 {
		&:before{
			background-image: url("../images/u71.png");
			.iconStyle(36px, 27px);
		}
	}

	&.hp-icon02 {
		&:before{
			background-image: url("../images/u91.png");
			.iconStyle(32px, 32px);
		}
		p{
			&:first-child {
				&:after{
					content: '%';
					font-size: .5em;
				}
			}
		}

	}

	&.hp-icon03 {
		&:before{
			background-image: url("../images/u95.png");
			.iconStyle(33px, 32px);
		}
	}

	&.hp-icon04 {
		&:before{
			background-image: url("../images/u111.png");
			.iconStyle(33px, 32px);
		}
	}

	&.hp-icon05 {
		&:before{
			background-image: url("../images/u109.png");
			.iconStyle(33px, 32px);
		}
	}
}

.hp-alertTable{
	background: #ffffff;
}

.hpat-dateRangeArea{
	padding: 30px 70px;
}

.echart-area{
	width: 100%;
	height: 400px;
}

@media (max-width: 1690px) {
	.hp-dataBox{
		padding-left: 20px;
		&:before{
			display: none;
		}
	}
}
</style>