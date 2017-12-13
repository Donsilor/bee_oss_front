<template>
	<div class="home-page">
		<el-row class="hp-dataArea" :gutter="24">
			<el-col :span="7" class="no-padding">
				<header class="hp-header">
					<h2>路由器信息</h2>
					<!-- <span>截止时间{{homeData.statistics_time}}</span> -->
				</header>
				<el-row :gutter="24">
					<el-col :span="8" class="no-padding">
						<div class="hp-dataBox hp-icon01">
							<p>{{homeData.router_num}}</p>
							<p>路由器在线数</p>
						</div>
					</el-col>
					<el-col :span="8" class="no-padding">
						<div class="hp-dataBox hp-icon01">
							<p>{{homeData.router_num_all}}</p>
							<p>路由器总数</p>
						</div>
					</el-col>
					<el-col :span="8" class="no-padding">
						<div class="hp-dataBox hp-icon02" style="padding-left: 0">
							<p>{{homeData.router_num_percent}}</p>
							<p>路由器在线比例</p>
						</div>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="7" :offset="1" class="no-padding">
				<header class="hp-header">
					<h2>用户信息</h2>
				</header>
				<el-row :gutter="24">
					<el-col :span="8" class="no-padding">
						<div class="hp-dataBox hp-icon01">
							<p>{{homeData.app_num}}</p>
							<p>用户在线数</p>
						</div>
					</el-col>
					<el-col :span="8" class="no-padding">
						<div class="hp-dataBox hp-icon01">
							<p>{{homeData.app_num_all}}</p>
							<p>用户总数</p>
						</div>
					</el-col>
					<el-col :span="8" class="no-padding">
						<div class="hp-dataBox hp-icon02" style="padding-left: 10px">
							<p>{{homeData.app_num_percent}}</p>
							<p>用户在线比例</p>
						</div>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="7" :offset="1" class="no-padding">
				<header class="hp-header">
					<h2>请求信息</h2>
				</header>
				<el-row :gutter="24">
					<el-col :span="8" class="no-padding">
						<div class="hp-dataBox hp-icon01">
							<p>{{homeData.access_msg_num}}</p>
							<p>QPS访问量</p>
						</div>
					</el-col>
					<el-col :span="9" class="no-padding" >
						<div class="hp-dataBox hp-icon01">
							<p>{{homeData.access_msg_num_all}}</p>
							<p>请求总数</p>
						</div>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<el-row :gutter="24">
			<header class="hp-header">
				<h2>报警趋势图</h2>
			</header>
			<section class="hp-alertTable">
				<!--<div class="hpat-dateRangeArea">-->
				<!--<el-date-picker v-model="range" range-separator=" ~ " type="daterange" align="left" placeholder="时间段选择" :picker-options="pickerOption" v-on:change="changeDate"></el-date-picker>-->
				<!--</div>-->
				<div id="charts-con" class="echart-area" style="padding-top: 20px"></div>
			</section>
		</el-row>
	</div>
</template>
<script>
import echarts from 'echarts/lib/echarts';
import * as namespace from '../store/namespace';
import {mapGetters, mapActions} from 'vuex';
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

        const obj = this;
        if (obj && !obj._isDestroyed) {
            obj.getDataInterval = setInterval(() => {
                if (obj && !obj._isDestroyed)
                    obj.getHomeData();
            }, 60000);
        } else {
            clearInterval(obj.getDataInterval)
		}
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
            this.$store.dispatch('throughDatas',{}).then((result) => {
                if (result) {
                    this.homeData = result;
                }
            })
		},
		getAlarmst() {
//			const handleData =  x => {
//				const curDate = new Date(x.statistics_time);
//				return {
//					name: curDate.toString(),
//					value: [
//						curDate.Format('yyyy/MM/dd hh:mm'),
//						x.count
//					]
//				}
//			}
//			let params = {
//				token: this.token
//			};
//            params.start_time = (new Date()).Format('yyyy/MM/dd') + ' 00:00';
//            params.end_time = (new Date()).Format('yyyy/MM/dd') + ' 23:59';
//
//			this.$http.post(PREFIX + 'homepage/alarmst', params).then(res => {
//				const json = res.data;
//				if (json.code === 200) {
//					const data = json.result.data.map(handleData);
//					this.renderEchart(data);
//				} else {
//					this.$message.error(json.msg);
//				}
//
//			})
            let obj = this
            let param = {
                select_date: new Date(),
                group_by: ''
            }
            obj.$store.dispatch('getwarnDatas',param).then((result) => {
                if (result.data) {
                    let data = result.data
                    let datas = data.result.data
                    let datasObj = {}
                    let xObj = []
                    if (datas.length) {
                        datas.forEach((item) => {
                            xObj.push(item.start_stat_time)
                            if (!datasObj[item.monitor_name]) {
                                datasObj[item.monitor_name] = []
                            } else {
                                datasObj[item.monitor_name].push(item.report_num)
                            }
                        })
                        xObj = Array.from(xObj)
                    }
                    obj.renderEchart(xObj, datasObj)
                }
            })
		},
        initEchart () {
            this.alertChart = echarts.init(document.getElementById('charts-con'));
        },
        renderEchart (xObj, datasObj) {
            let curSeries = []
            let legendArr = []
            if (datasObj) {
                for (let attr in datasObj) {
                    legendArr.push(attr)
                    curSeries.push({
                        name: attr,
                        type: 'line',
                        data: datasObj[attr],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    })
                }


            }
            this.alertChart.setOption({
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
				grid: {
                    top: 80,
                    left:45
				},
                toolbox: {
                    show: true,
                    top: 0,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                legend: {
                    show: true,
					top: 40,
                    data: legendArr
                },
                xAxis: {
                    type: 'category',
                    data: xObj,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    name: "数量",
                    type: 'value',
                    splitLine: {
                        show: true
                    }
                },
                series: curSeries
            })
        },
	},
	computed: {
        ...mapGetters({
        	token: namespace.TOKEN
        })
    },
    ...mapActions([
        'throughDatas',
		'getwarnDatas'
    ])
}
</script>
<style lang="less">
.no-padding{
	padding: 0 !important;
}
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
	position: relative;
	margin-left: -0.8rem;
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
	box-sizing: border-box;
	padding: 15px 0px 32px 20px;
	position: relative;
	/*
	&:hover{
		box-shadow:  2px 2px 10px rgba(0, 0, 0, .15)
	}*/
	p{
		&:first-child{
			color: #00CC33;
			font-size: 1.75em;
			height: 42px;
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
		/*
		&:before{
			background-image: url("../images/u71.png");
			.iconStyle(36px, 27px);
		}
		*/
	}

	&.hp-icon02 {
		/*
		&:before{
			background-image: url("../images/u91.png");
			.iconStyle(32px, 32px);
		}
		*/
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
	position: relative;
	margin-left: -0.8rem;
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
		&:before{
			display: none;
		}
	}
}
.border-top{border-top:1px solid #d8d8d8}
</style>