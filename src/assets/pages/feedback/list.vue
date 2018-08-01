<template>
    <div class="page-content config-page">
        <div>
            <el-row style="line-height:36px;">
                <el-col :span="6">
                    <el-checkbox v-model="unRead" @change="seeUnRead">只看未读</el-checkbox>
                </el-col>
                <el-col :span="12">
                    <span>日期：</span>
                    <el-date-picker v-model="date" @change="changeDate" type="daterange" placeholder="请选择日期范围"></el-date-picker>
                </el-col>
                <el-col :span="6">
                    <el-input
                    placeholder="搜索关键字"
                    icon="search"
                    v-model="searchKey"
                    @change="search"
                    :on-icon-click="search">
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <div style="margin: 20px 0">
            <el-table :data="tableData" style="width: 100%" :show-header="false">
                <el-table-column width="80">
                    <template slot-scope="scope">
                        <img v-if="scope.row.img_list" :src="scope.row.img_list.split(',')[0]" alt="" class="avatar">
                        <img v-else src="../../images/device.png" alt="" class="avatar">
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <span class="summary point" @click="goDetail(scope.row.id)" :class="{unRead: scope.row.is_read === 0}">{{ scope.row.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column width="150">
                    <template slot-scope="scope">
                        <span style="margin-right: 15px">{{ scope.row.os_type}}</span>
                        <span>{{ scope.row.app_version}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="180">
                    <template slot-scope="scope">
                        <ul>
                            <li>{{ scope.row.terminal_type }}</li>
                            <li>{{ scope.row.client_version }}</li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column width="150" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <ul>
                            <li>用户名</li>
                            <li>{{ scope.row.uname }}</li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column width="180">
                    <template slot-scope="scope">
                        <span>{{ scope.row.created_at }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block" style="overflow: hidden">
            <span class="info gray">共{{ total }}条记录，其中{{ unReadTotal }}条未读</span>
            <el-pagination
            class="pull-right"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import axios from "~/assets/lib/http";
import * as URL from "~/assets/lib/api";
import { mapGetters } from 'vuex';
export default {
    components: { 
    },
    data() {
        return {
            unRead: false,
            date: [],
            searchKey: '',
            queryOption: {},
            tableData: [],
            pageSize: 20,
            total: null,
            currentPage: 1,
            unReadTotal: null
        };
    },
    computed: {
        ...mapGetters('feedback', [
            'queryOptionStorage',
            'needQueryOptionStorage'
        ])
    },
    created () {
        if (this.needQueryOptionStorage) {
            // 如果是从详情页跳回列表页的 needQueryOptionStorage是true 拿出存在store的筛选条件queryOptionStorage
            this.queryOption = this.queryOptionStorage;
            this.currentPage = this.queryOption.page;
            this.searchKey = this.queryOption.keyword;
            this.unRead = Boolean(this.queryOption.is_read);
            this.date[0] = this.queryOption.start_time ? new Date(this.queryOption.start_time * 1000) : '';
            this.date[1] = this.queryOption.end_time ? new Date(this.queryOption.end_time * 1000) : '';
            this.$store.dispatch('feedback/setNeedQueryOptionStorage', false);
        } else {
            // 点击侧栏导航进来的
            this.queryOption = {
                page: this.currentPage,
                limit: this.pageSize, 
                keyword: '',
                is_read: '',
                start_time: '',
                end_time: ''  
            }
        }
        this.getFeedbackList();
    },
    watch: {
    },
    methods: {
        goDetail (id) {
            // 去详情页 store存入筛选条件queryOptionStorage
            this.$store.dispatch('feedback/setQueryOptionStorage', this.queryOption).then(() => {
                this.$router.push({ name: 'feedbackDetail', params: { id: id }});
            });
        },
        search () {
            this.queryOption.keyword = this.searchKey;
            this.queryOption.page = 1;
            this.getFeedbackList();
        },
        seeUnRead () {
            this.queryOption.is_read = this.unRead ? 1 : 0;
            this.queryOption.page = 1;
            this.getFeedbackList();
        },
        changeDate (val) {
            // 后端需要的时间戳是秒 前端UI组件的是毫秒 除以1000处理
            const start = this.date && this.date[0] ? this.date[0].getTime() / 1000 : '';
            const end = this.date && this.date[1] ? this.date[1].getTime() / 1000 : '';
            this.queryOption.start_time = start;
            this.queryOption.end_time = end;
            this.queryOption.page = 1;
            this.getFeedbackList();
        },
        handleCurrentChange (val) {
            this.queryOption.page = val;
            this.getFeedbackList();
        },
        getFeedbackList () {
            // console.log(this.queryOption);
            // this.queryOption全页面共享这个筛选条件
            axios.post(URL.feedbackList, this.queryOption).then((res) => {
                const result = res.data.result;
                this.total = result.total;
                this.unReadTotal = result.un_read_total || 0;
                this.tableData = result.data;
            });
        },
        updateStatus (id) {
            return axios.post(URL.feedbackUpdateStatus, { id: id });
        }
    }
}
</script>

<style lang="less" scoped>
.summary {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: block;
    padding: 20px 0;
}
.avatar {
    width: 50px; 
    height: 50px;
    margin: 8px 0 0 0;
}
.info {
    float: left;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
}
.unRead {
    font-weight: bold;
}
</style>

