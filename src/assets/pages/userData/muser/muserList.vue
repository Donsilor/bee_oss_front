<template>
    <div>
        <!-- <el-table
            :span-method="uiChange"
            :data="muserList"
            border
            style="width: 100%;margin: 20px 0">
            <el-table-column
            prop="name"
            label="姓名">
            </el-table-column>
            <el-table-column
            prop="phone"
            label="手机号码">
            </el-table-column>
            <el-table-column
            prop="isOnline"
            label="路由器在线与否">
            </el-table-column>
            <el-table-column v-for="type in types" :key="type.id"
                :prop="type.name"
                :label="type.text">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope"> -->
                    <!-- <el-button
                        size="mini"
                    @click="handleEdit(scope.$index, scope.row)">不展示</el-button> -->
                    <!-- <el-button
                        size="mini"
                        type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table> -->
        <el-table
            :data="muserList"
            border>
            <el-table-column
                prop="name"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="phone"
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
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                    @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-line">
			<el-pagination small layout="prev, pager, next" :total="config.total" @current-change="onPageChange" :page-size="config.pageSize" :current-page.sync="config.page"></el-pagination>
		</div>
    </div>
</template>

<script>
import API from '../../../service/index.js'
import { getTypes, getConfig, getOnlyUserList } from './dataHandle.js'

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
