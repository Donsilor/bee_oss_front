<template>
	<div class="home-page">
		<el-row class="hp-dataArea" :gutter="40">
			<el-col :span="8">
				<header class="hp-header">
					<h2>路由器信息</h2>
					<span>截止时间2017-10-13 14:50</span>
				</header>
				<el-row :gutter="15">
					<el-col :span="12">
						<div class="hp-dataBox hp-icon01">
							<p>127225</p>
							<p>设备安装总量</p>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="hp-dataBox hp-icon02">
							<p>78.23</p>
							<p>设备安装总量</p>
						</div>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="8">
				<header class="hp-header">
					<h2>APP信息</h2>
					<span>截止时间2017-10-13 14:50</span>
				</header>
				<el-row :gutter="15">
					<el-col :span="12">
						<div class="hp-dataBox hp-icon03">
							<p>997823</p>
							<p>APP安装总量</p>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="hp-dataBox hp-icon02">
							<p>87.39</p>
							<p>设备在线比例</p>
						</div>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="8">
				<header class="hp-header">
					<h2>活跃度</h2>
					<span>截止时间2017-10-13 14:50</span>
				</header>
				<el-row :gutter="15">
					<el-col :span="12">
						<div class="hp-dataBox hp-icon04">
							<p>997823</p>
							<p>PV</p>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="hp-dataBox hp-icon05">
							<p>76777</p>
							<p>UV</p>
						</div>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<header class="hp-header">
			<h2>报警趋势图</h2>
			<span>截止时间2017-10-13 14:50</span>
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
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title'; 

export default {
	data () {
		return {
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
		this.echartInit();
	},
	methods: {
		changeDate (value) {
			
		},
		echartInit () {
			const alertChart = echarts.init(document.getElementById('echart-area'));
			alertChart.setOption({
				xAxis: {
					data: ["09-10", "09-11", "09-12", "09-13", "09-14", "09-15", "09-16", "09-17", "09-18", "09-19", "09-20"]
				},
				yAxis: {},
				series: [
					{
						name: '次数',
						type: 'line',
						data: [23, 23, 34, 32, 56, 23, 32, 42, 22, 33, 24]
					}
				]
			})
		}
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