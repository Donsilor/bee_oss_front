<template>
	<div class="page-content cloud-page">
		<div style="position: relative; margin-bottom: 30px">
			<el-date-picker
					v-model="select_date"
					@change="changeSelectDate"
					placeholder="今天"
			>
			</el-date-picker>
			<el-select v-model="svr_id" placeholder="svr_id" @change="typeChange">
				<el-option label="Access_All" value="Access_All"></el-option>
			</el-select>
			<el-button class="btn-right" type="text" @click="goBack"><<&nbsp;返回</el-button>
		</div>
		<el-row :gutter="24">
			<div id="charts-con" style="width: 100%; height: 500px"></div>
		</el-row>
	</div>
</template>
<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import {mapActions} from 'vuex';
import '../../lib/util';
import API from '../../service/index'
export default {
	data () {
		return {
            svr_id: 'Access_All',
            select_date: new Date()
		}
	},
	mounted () {
        this.initEchart()
	    this.changeSelectDate()
	},
	methods: {
        typeChange () {
            this.changeSelectDate()
		},
        changeSelectDate () {
			let obj = this
            API.qpsDatas({select_date: obj.select_date, svr_id: obj.svr_id}).then((result) => {
                if (result.data && result.data.result.data) {
                    let datas = result.data.result.data
					let Xarrs = []
					let dataArrs = []
                    datas.forEach((item) => {
                        Xarrs.push(item['start_stat_time'])
                        dataArrs.push(item['access_msg_num'])
					})
                    obj.renderEchart(Xarrs, dataArrs)
				}
            })
		},
        initEchart () {
            this.alertChart = echarts.init(document.getElementById('charts-con'));
        },
        renderEchart (Xarrs, dataArrs) {
            this.alertChart.setOption({
                tooltip: {
                    position: [10, 10],
                    trigger: 'axis',
//                    formatter: function (params) {
//                        params = params[0];
//                        var date = new Date(params.name);
//                        return `${date.Format('yyyy/MM/dd hh:mm')} ${params.value[1]}`;
//                    },
                    axisPointer: {
                        animation: false
                    }
                },
                toolbox: {
                    show: true,
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
                    data: ['OPS数量']
                },
                xAxis: {
                    type: 'category',
					data: Xarrs,
//                    splitLine: {
//                        show: false
//                    }
                },
                yAxis: {
                    name: "数量",
                    type: 'value',
				    // boundaryGap: [0, '100%'],
                    splitLine: {
                        show: true
                    }
                },
                series: [
                    {
                        name: 'OPS数量',
                        type: 'line',
                        data: dataArrs,
                        itemStyle: {
                            normal: {
                                color: '#81c0c0'
                            }
                        },
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
                    }
                ]
            })
        },
        goBack () {
            history.go(-1)
		}
	},
	components: {},
    ...mapActions([
        'qpsDatas'
    ])
}
</script>
<style lang="less">
.cloud-page{
	.btn-right{
		position: absolute;
		right: 20px;
		top:10px
	}
}
</style>