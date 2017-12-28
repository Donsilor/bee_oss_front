<template>
	<div class="page-content cloud-page">
		<div style="position: relative; margin-bottom: 30px">
			<el-date-picker
					v-model="select_date"
					placeholder="今天"
			>
			</el-date-picker>
			<el-time-picker
					is-range
					v-model="start_end_time"
					range-separator="至"
					start-placeholder="开始时间"
					end-placeholder="结束时间"
					placeholder="选择时间范围">
			</el-time-picker>
			<!--<el-select placeholder="请选择" value="monitor_name">-->
				<!--&lt;!&ndash;<el-option label="svr_id" value="svr_id"></el-option>&ndash;&gt;-->
				<!--<el-option label="monitor_name" value="monitor_name"></el-option>-->
			<!--</el-select>-->
			<!--<el-input type="text" v-model="group_by" style="width: 15%"></el-input>-->
			<el-button type="primary" @click="changeSelectDate">&nbsp;&nbsp;查询&nbsp;&nbsp;</el-button>
			<el-button class="btn-right" type="text" @click="goBack"><<&nbsp;返回</el-button>
		</div>
		<el-row :gutter="24">
			<div id="charts-con" style="width: 100%; height: 500px"></div>
		</el-row>
	</div>
</template>
<script>
import echarts from 'echarts';
import {mapActions} from 'vuex';
import '../../lib/util'
export default {
	data () {
		return {
            start_end_time: [],
            select_date: new Date(),
            group_type: 'svr_id',
			group_by: ''
		}
	},
	mounted () {
        this.initEchart()
	    this.changeSelectDate()
	},
	methods: {
        changeSelectDate () {
			let obj = this
			let param = {
                select_date: obj.select_date,
                group_by: obj.group_by,
				start_time: obj.start_end_time[0] && obj.start_end_time[0].Format('hh:mm:ss') || '',
				end_time: obj.start_end_time[1] && obj.start_end_time[1].Format('hh:mm:ss') || ''
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
        typeChange () {
            this.changeSelectDate()
		},
        initEchart () {
            this.alertChart = echarts.init(document.getElementById('charts-con'));
        },
		randomColor (num) {
            let colors = ['#336666','#642100','#930000','#0000E3','#0066CC','#333','#81C0C0',
                '#20A0FF','#d9006c','#467500','#616130','#424200','#f00']
            // let index = Math.floor((Math.random()*colors.length))
			return colors[num]
        },
        renderEchart (xObj, datasObj) {
            let curSeries = []
			let legendArr = []
			let num = 0
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
                        },
                        itemStyle: {
                            normal: {
                                color: this.randomColor(num++)
                            }
                        }
                    })
				}


			}
            this.alertChart.setOption({
                grid : {
                    top: 90,
                    left: 70
				},
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
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
                    data: legendArr,
					top: 35
                },
                xAxis: {
                    type: 'category',
					data: xObj,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    left: 200,
                    name: "数量",
                    type: 'value',
                    splitLine: {
                        show: true
                    }
                },
                series: curSeries
            })
        },
        goBack () {
            history.go(-1)
        }
	},
	components: {},
    ...mapActions([
        'getwarnDatas'
    ])
}
</script>
<style lang="less">
.cloud-page{
	.btn-right{
		position: absolute;
		right: 0px;
		top:10px
	}
}
</style>