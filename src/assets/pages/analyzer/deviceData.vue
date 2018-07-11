<template>
<div class="page-content config-page">
    <el-row>
        <el-col>
            <el-form :inline="true">
                <el-form-item>
                    <el-date-picker placeholder="请选择时间段" v-model="formdata.date" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="formdata.platform" placeholder="请选择平台">
                        <el-option label="Android_Pad" value="Android_Pad"></el-option>
                        <el-option label="IOS" value="IOS"></el-option>
                        <el-option label="Android" value="Android"></el-option>
                        <el-option label="IOS_Pad" value="IOS_Pad"></el-option>
                        <el-option label="合计" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <city-picker v-model="formdata.city"></city-picker>
                </el-form-item>
                <el-form-item style="margin-bottom:0">
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>

    <div style="margin: 20px">
        <el-card shadow="never">
            <el-row :gutter="24">
                <el-col :span="16">
                    <div>
                        <span>控制设备家庭户数</span>
                        <span class="histogram" @click="changeCharType('chartSettings1', 'histogram')"></span>
                        <span class="line"  @click="changeCharType('chartSettings1', 'line')"></span>
                    </div>
                    <div>单位: 户</div>
                </el-col>
            </el-row>
             <ve-chart :data="operFamilyCategoryCharData" :extend="chartExtend" :settings="chartSettings1"></ve-chart>
            <!-- <ve-histogram :data="operFamilyCategoryCharData" :extend="chartExtend" :settings="chartSettings"></ve-histogram> -->
        </el-card>
    </div>
    <div style="margin: 20px">
        <el-card shadow="never">
            <el-row :gutter="24">
                <el-col :span="16">
                    <div>
                        <span>控制设备家庭比重</span>
                        <span class="histogram" @click="changeCharType('chartSettings2', 'histogram')"></span>
                        <span class="line"  @click="changeCharType('chartSettings2', 'line')"></span>
                    </div>
                    <div>单位: %</div>
                </el-col>
            </el-row>
            <ve-chart :data="operFamilyCategoryCharData" :extend="chartExtend" :settings="chartSettings2"></ve-chart>
            <!-- <ve-histogram :data="operFamilyCategoryCharData" :extend="chartExtend" :settings="chartSettings"></ve-histogram> -->
        </el-card>
    </div>
    <div style="margin: 20px">
        <el-card shadow="never">
            <el-row :gutter="24">
                <el-col :span="16">
                    <div>
                        <span>控制设备次数</span>
                        <span class="histogram" @click="changeCharType('chartSettings3', 'histogram')"></span>
                        <span class="line"  @click="changeCharType('chartSettings3', 'line')"></span>
                    </div>
                    <div>单位: 次</div>
                </el-col>
            </el-row>
            <ve-chart :data="operStatCharData" :extend="chartExtend" :settings="chartSettings3"></ve-chart>
            <!-- <ve-histogram :data="operStatCharData" :extend="chartExtend" :settings="chartSettings"></ve-histogram> -->
        </el-card>
    </div>
</div>
</template>

<script>
import CityPicker from '../../components/cityPicker.vue'
import API from "../../service/index.js";
import axios from 'axios';
import * as URL from "~/assets/lib/api";

const padZero = (num) => {
    num = num + ''
    return num.length == 1 ? '0' + num : num
}

const formatDate = (d) => {  
    return d.getFullYear() + '-' + padZero(d.getMonth() + 1) + '-' + padZero(d.getDate())
}

export default {
    components: { 
        CityPicker
    },
    data () {
        this.chartExtend = {
            // label设置查看echarts 2.x文档
            series: {
                barWidth: 40,
                itemStyle: {
                    normal: {
                        label: {show: true, position: 'top'}
                    }
                }
            }
        };
        // this.chartSettings = {
        //     // yAxisType: ['percent'],
        //     labelMap: {
        //         'oper_nu': '次数',
        //         'family_num': '户数',
        //         'family_rate': '比重'
        //     }
        // };
        return {
            area: '',
            formdata: {
                date: "",
                platform: "",
                project: "",
                city: ""
            },
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            operFamilyCategoryCharData: {
                columns: ['category_title', 'family_num'],
                rows: []
            },
            operStatCharData: {
                columns: ['category_title', 'oper_num'],
                rows: []
            },
            chartSettings1: {
                type: 'histogram',
                labelMap: {
                    'oper_num': '次数',
                    'family_num': '户数',
                    'family_rate': '比重'
                }
            },
            chartSettings2: {
                type: 'histogram',
                labelMap: {
                    'oper_num': '次数',
                    'family_num': '户数',
                    'family_rate': '比重'
                }
            },
            chartSettings3: {
                type: 'histogram',
                labelMap: {
                    'oper_num': '次数',
                    'family_num': '户数',
                    'family_rate': '比重'
                }
            }
        };
    },
    methods: {
        search: function() {
            const { date, platform, city } = this.formdata;
            this.getUserAnalyzeData({
                start_date: formatDate(date[0]),
                end_date: formatDate(date[1]),
                city,
                os_type: platform || '',
                app_version: ''
            })
        },
        getUserAnalyzeData (params) {
            console.log(params);
            axios.all([this.getOperFamilyCategoryData(params), this.getOperStatData(params)])
            .then(axios.spread((operFamilyCategoryData, operStatData) => {
                this.operFamilyCategoryCharData.rows = operFamilyCategoryData.data.result.list,
                this.operStatCharData.rows = operStatData.data.result.list
            }));
        },
        getOperFamilyCategoryData (params) {
            return axios.post(URL.operFamilyCategory, params);
        },
        getOperStatData (params) {
            return axios.post(URL.operStat, params);
        },
        changeCharType (index, type) {
            this[index].type = type;
        }
    },
    mounted() {
        const end = new Date();
        const start = new Date();
        end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        this.formdata.date = [start, end]
        this.getUserAnalyzeData({
            start_date: formatDate(start),
            end_date: formatDate(end),
            city: ''
        });
    }
};
</script>

<style lang="less">
.analyzer-data {
    .select {
        cursor: pointer;
    }
    .data-list > div {
        margin: 15px 0;
        font-size: 14px;
        &:nth-child(2) {
            color: #409eff;
            font-size: 18px;
        }
    }
}
.icon-information {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-image: url(../../images/icn_explain.png);
    background-size: 100% 100%;
}
.icon-tendency {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-image: url(../../images/tendency.png);
    background-size: 100% 100%;
}
.histogram {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-image: url(../../images/through.png);
    background-size: 100% 100%;
    margin: 0 10px;
    cursor: pointer;
}
.line {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-image: url(../../images/QPS.png);
    background-size: 100% 100%;
    cursor: pointer;
}

</style>
