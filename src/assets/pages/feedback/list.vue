<template>
    <div class="page-content config-page">
        <div>
            <el-row style="line-height:36px;">
                <el-col :span="8">
                    <el-checkbox v-model="unRead" @change="seeUnRead">只看未读</el-checkbox>
                </el-col>
                <el-col :span="8">
                    <span>日期：</span>
                    <el-date-picker v-model="date" :default-value="value2" 
                    @change="changeDate" type="daterange" placeholder="请选择日期范围"></el-date-picker>
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
                        <img :src="scope.row.small_img" alt="" class="avatar">
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <span class="summary point" @click="goDetail(scope.row.id)" :class="{unRead: scope.row.is_read === '1'}">{{ scope.row.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column width="150">
                    <template slot-scope="scope">
                        <span>{{ scope.row.app_version }}</span>
                    </template>
                </el-table-column>
                <el-table-column width="180">
                    <template slot-scope="scope">
                        <ul>
                            <li>{{ scope.row.terminal_type }}</li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column width="150" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.uname }}1212121212</span>
                    </template>
                </el-table-column>
                <el-table-column width="180">
                    <template slot-scope="scope">
                        <span>{{ scope.row.create_time }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <span class="info gray">共xxx条记录，其中xx条未读</span>
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
            pageSize: 2,
            total: null,
            currentPage: 1,
            value2: []
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
            this.queryOption = this.queryOptionStorage;
            this.currentPage = this.queryOption.page;
            this.searchKey = this.queryOption.keyword;
            this.unRead = Boolean(this.queryOption.is_read);
            this.date[0] = new Date(this.queryOption.start_time);
            this.date[1] = new Date(this.queryOption.end_time);
            this.$store.dispatch('feedback/setNeedQueryOptionStorage', false);
        } else {
            this.queryOption = {
                page: this.currentPage,
                limit: '', 
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
            this.$store.dispatch('feedback/setQueryOptionStorage', this.queryOption).then(() => {
                this.updateStatus(id).then(() => {
                    this.$router.push({ name: 'feedbackDetail', params: { id: id }});
                });
            });
        },
        search () {
            this.queryOption.keyword = this.searchKey;
            this.queryOption.page = 1;
            this.getFeedbackList();
        },
        seeUnRead () {
            console.log(12);
            this.queryOption.is_read = this.unRead ? 1 : 0;
            this.queryOption.page = 1;
            this.getFeedbackList();
        },
        changeDate (val) {
            const start = this.date[0] ? this.date[0].getTime() : '';
            const end = this.date[1] ? this.date[1].getTime() : '';
            this.queryOption.start_time = start;
            this.queryOption.end_time = end;
            this.queryOption.page = 1;
            this.getFeedbackList();
        },
        handleCurrentChange(val) {
            this.queryOption.page = val;
            this.getFeedbackList();
        },
        getFeedbackList () {
            console.log(this.queryOption);
            axios.post(URL.feedbackList, this.queryOption).then((res) => {
                const result = res.data.result;
                this.total = result.total;
                this.tableData = result.data;
            });
        },
        updateStatus (id) {
            // console.log({ id: id });
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

