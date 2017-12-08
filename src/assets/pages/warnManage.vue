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
			<el-select v-model="group_type" placeholder="请选择">
				<el-option label="svr_id" value="svr_id"></el-option>
				<el-option label="monitor_name" value="monitor_name"></el-option>
			</el-select>
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
import '../lib/util'
export default {
	data () {
		return {
            start_end_time: [],
            select_date: new Date(),
            group_type: 'svr_id'
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
                group_by: obj.group_type,
				start_time: obj.start_end_time[0] && obj.start_end_time[0].Format('hh:mm:ss') || '',
				end_time: obj.start_end_time[1] && obj.start_end_time[1].Format('hh:mm:ss') || ''
			}
            obj.$store.dispatch('getwarnDatas',param).then((result) => {
                if (result.data) {
                    let datas = result.data
					let Xarrs = []
					let Valuearrs = []
					if (result.data.length) {
                        datas.forEach((item) => {
                            for (let attr in item) {
                                if (attr !== 'count') {
                                    Xarrs.push(item[attr])
                                }
                            }
                            Valuearrs.push(item['count'])
                        })
					}
                    obj.renderEchart(Xarrs, Valuearrs)
				}
            })
		},
        typeChange () {
            this.changeSelectDate()
		},
        initEchart () {
            this.alertChart = echarts.init(document.getElementById('charts-con'));
        },
        renderEchart (Xarrs, Valuearrs) {
            this.alertChart.setOption({
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
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
                    data: [this.group_type]
                },
                xAxis: {
                    type: 'category',
					data: Xarrs,
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
                series: [
                    {
                        name: this.group_type,
                        type: 'line',
                        data: Valuearrs,
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