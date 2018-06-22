<template>
    <div class="page-content config-page">
        <div>
            <el-row style="line-height:36px;">
                <el-col :span="8">
                    <el-checkbox v-model="unRead">只看未读</el-checkbox>
                </el-col>
                <el-col :span="8">
                    <span>日期：</span>
                    <el-date-picker v-model="date" type="daterange" placeholder="请选择日期范围"></el-date-picker>
                </el-col>
                <el-col :span="6">
                    <el-input
                    placeholder="搜索关键字"
                    icon="search"
                    v-model="searchKey"
                    :on-icon-click="search">
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <div style="margin: 20px 0">
            <el-table :data="tableData" style="width: 100%" height="70px" :show-header="false">
                <el-table-column width="80">
                    <template slot-scope="scope">
                        <img :src=" scope.row.img" alt="" class="avatar">
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <span class="summary point" @click="goDetail(scope.row.id)">{{ scope.row.summary }}</span>
                    </template>
                </el-table-column>
                <el-table-column width="150">
                    <template slot-scope="scope">
                        <span>{{ scope.row.version }}</span>
                    </template>
                </el-table-column>
                <el-table-column width="150">
                    <template slot-scope="scope">
                        <ul>
                            <li>{{ scope.row.sys }}</li>
                            <li>{{ scope.row.sysVer }}</li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column width="150" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span>{{ scope.row.userName }}1212121212</span>
                    </template>
                </el-table-column>
                <el-table-column width="180">
                    <template slot-scope="scope">
                        <span>{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <span class="info gray">共xxx条记录，其中xx条未读</span>
            <el-pagination
            class="pull-right"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="3"
            layout="prev, pager, next, jumper"
            :total="4">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    components: { 
    },
    data() {
        return {
            unRead: false,
            date: '',
            searchKey: '',
            tableData: [{
                img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg',
                summary: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
                version: 'Ci 1.0.2',
                sys: 'iPhone',
                sysVer: 'IOS 10.3.3',
                userName: 'adominadfsdf',
                date: '2016-05-02 12:11',
                id: 11
            }, {
                img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg',
                summary: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
                version: 'Ci 1.0.2',
                sys: 'iPhone',
                sysVer: 'IOS 10.3.3',
                userName: 'adominadfsdf',
                date: '2016-05-02 12:11',
                id: 12
            }, {
                img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg',
                summary: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
                version: 'Ci 1.0.2',
                sys: 'iPhone',
                sysVer: 'IOS 10.3.3',
                userName: 'adominadfsdf',
                date: '2016-05-02',
                id: 13
            }, {
                img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg',
                summary: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
                version: 'Ci 1.0.2',
                sys: 'iPhone',
                sysVer: 'IOS 10.3.3',
                userName: 'adominadfsdf',
                date: '2016-05-02',
                id: 14
            }],
            currentPage: 1
        };
    },
    methods: {
        search () {
            console.log(12);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        goDetail (id) {
            this.$router.push({ name: 'feedbackDetail', params: { id: id }});
        }
    },
    watch: {
        '$route' (val) {
            console.log(val);
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
</style>

