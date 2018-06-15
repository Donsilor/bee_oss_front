<template>
    <div>
        <!-- <el-table
            :data="muserList"
            border>
            <el-table-column
                prop="name"
                width="150"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="phone"
                width="150"
                label="手机号码">
            </el-table-column>
            <el-table-column label="家庭">
                <template slot-scope="scope">
                    <el-table
                        :data="scope.row.familyList">
                        <el-table-column
                            prop="isOnline"
                            label="路由器在线与否">
                        </el-table-column>
                        <el-table-column v-for="type in types" :key="type.id"
                            :prop="type.name"
                            :label="type.text">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                    @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table> -->
        
        <div style="margin-top: 30px" v-for="tableItem in muserList" :key="tableItem.id">
            <div class="tab-header">
                <div class="header-item">姓名: {{tableItem.name}}</div>
                <div class="header-item header-item-2">手机号码: {{tableItem.phone}}</div>
                <div class="header-item header-item-3">
                    <el-button size="mini" type="danger" @click="handleDelete(tableItem.id)">删除</el-button>
                </div>
            </div>
            <el-table border :data="tableItem.familyList" style="width: 100%"> 
                <el-table-column prop="isOnline" label="路由器在线与否" width="150"></el-table-column> 
                <el-table-column v-for="type in types" :key="type.id" :prop="type.name" :label="type.text"></el-table-column>
            </el-table>
        </div>

        <div class="page-line">
			<el-pagination small layout="prev, pager, next" :total="config.total" @current-change="onPageChange" :page-size="config.pageSize" :current-page.sync="config.page"></el-pagination>
		</div>
    </div>
</template>

<script>
import API from '../../../service/index.js'
import { getTypes, getConfig, getOnlyUserList } from './dataHandle.js'
// import { muserListMock } from '../../../mockData/muserList.js'

export default {
    name: 'muserList',
    props: ['dataChanged', 'searchMobile'],
    data() {
        return {
            muserList: [],
            types: [],
            config: {

            }
        }
    },
    mounted() {
        this.getMUserList();
    },
    methods: {
        getMUserList () {
            let obj = this;
			API.getMUserList({
                mobile: this.searchMobile.length === 11 ? this.searchMobile : null,
                page: this.config.page,
                limit: this.config.pageSize
            }).then(result => {
                result = result.data.result;
                this.muserList = getOnlyUserList(result.data);
                this.types = getTypes(result.data);
                // 假数据
                // this.muserList = getOnlyUserList(muserListMock.data);
                // this.types = getTypes(muserListMock.data);
                this.config = getConfig(result);
			});
        },
        onPageChange(page) {
            this.getMUserList();
        },
        handleDelete(id) {
            this.$confirm('确定删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const ids = [id];
                API.deleteMUser(JSON.stringify(ids)).then(res => {
                    this.$message('删除成功!');
                    this.getMUserList();
                })
            }).catch(() => {
                
            });
        }
    },
    watch: {
        dataChanged(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.getMUserList(this.searchMobile);
            }
        }
    }
}
</script>

<style lang="less" scoped>
.tab-header {
    width: 100%;
    height: 40px;
    border: 1px solid #dfe6ec;
    box-sizing: border-box;
    border-bottom: none;
}
.header-item {
    width: 40%;
    float:left;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    text-indent: 20px;
}
.header-item-2 {
    float:left;
    border-left: 1px solid #dfe6ec;
    border-right: 1px solid #dfe6ec;
}
.header-item-3 {
    width: 20%;
}
</style>
