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
                        <!-- 控制设备家庭统计 -->
                        <!-- <el-tooltip placement="right">
                            <div slot="content">统计截止到某一天，在各<br/>个端App中注册的用户总数</div>
                            <i class="el-icon-question"></i>
                        </el-tooltip> -->
                    </div>
                    <div>单位: 户</div>
                </el-col>
            </el-row>
            <ve-histogram :data="chartData1" :extend="chartExtend" :settings="chartSettings"></ve-histogram>
        </el-card>
    </div>
    <div style="margin: 20px">
        <el-card shadow="never">
            <el-row :gutter="24">
                <el-col :span="16">
                    <div>
                        <span>控制设备家庭比重</span>
                    </div>
                    <div>单位: %</div>
                </el-col>
            </el-row>
            <ve-histogram :data="chartData2" :extend="chartExtend" :settings="chartSettings"></ve-histogram>
        </el-card>
    </div>
    <div style="margin: 20px">
        <el-card shadow="never">
            <el-row :gutter="24">
                <el-col :span="16">
                    <div>
                        <span>控制设备次数</span>
                    </div>
                    <div>单位: 次</div>
                </el-col>
            </el-row>
            <ve-histogram :data="chartData3" :extend="chartExtend" :settings="chartSettings"></ve-histogram>
        </el-card>
    </div>
</div>
</template>

<script>
import CityPicker from '../../components/cityPicker.vue'
import API from "../../service/index.js";
import axios from 'axios';

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
            series: {
                barWidth: 40,
                itemStyle: {
                    normal: {
                        label: {show: true, position: 'top'}
                    }
                }
            }
            // series: {
            //     barWidth: 40,
            //     label: {show: true, position: 'top'}
            // }
        };
        this.chartSettings = {
            labelMap: {
                'oper_num': '次数',
                'family_num': '户数',
                'family_rate': '比重'
            }
        };
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
            chartData1: {
                columns: ['category_title', 'family_num'],
                rows: [
                    { "category_title": "电视", "family_num": 21, "family_rate": 0.12 },
                    { "category_title": "窗帘", "family_num": 21, "family_rate": 0.11 },
                    { "category_title": "空调", "family_num": 15, "family_rate": 0.08 },
                    { "category_title": "吊灯", "family_num": 7, "family_rate": 0.22 },
                    { "category_title": "灯带", "family_num": 10, "family_rate": 0.13 },
                    { "category_title": "晾衣架", "family_num": 14, "family_rate": 0.15 }
                ]
            },
            chartData2: {
                columns: ['category_title', 'family_rate'],
                rows: [
                    { "category_title": "电视", "family_num": 21, "family_rate": 0.12 },
                    { "category_title": "窗帘", "family_num": 21, "family_rate": 0.11 },
                    { "category_title": "空调", "family_num": 15, "family_rate": 0.08 },
                    { "category_title": "吊灯", "family_num": 7, "family_rate": 0.22 },
                    { "category_title": "灯带", "family_num": 10, "family_rate": 0.13 },
                    { "category_title": "晾衣架", "family_num": 14, "family_rate": 0.15 }
                ]
            },
            chartData3: {
                columns: ['category_title', 'oper_num'],
                rows: [
                    { "category_title": "电视", "oper_num": 21 },
                    { "category_title": "窗帘", "oper_num": 13 },
                    { "category_title": "空调", "oper_num": 15 },
                    { "category_title": "吊灯", "oper_num": 7 },
                    { "category_title": "灯带", "oper_num": 10 },
                    { "category_title": "晾衣架", "oper_num": 14 }
                ]
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
        getUserAnalyzeData (obj) {
            console.log(obj);
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
</style>
