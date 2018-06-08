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
                <template scope="scope">
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
                limit: 5
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
        uiChange() {
            console.log('success');
        },
        handleDelete(id) {
            API.deleteMUser({id}).then(res => {
                this.getMUserList();
            })
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

const getConfig = (result) => {
    return {
        page: result.current_page,
        pageSize: 5,
        total: result.total
    }
}
const getOnlyUserList = (data) => {
    const userList = [];
    data.map(item => {
        const user = {
            id: item.user_id,
            name: item.user_name,
            phone: item.phone,
            familyList: [],
            familyCount: item.family_list.length
        };
        item.family_list.map(fa => {
            const family = {
                isOnline: fa.router_online ? '在线' : '离线',
                total: 0
            };
            if(fa.device_list.length > 0) {
                fa.device_list.map(ca => {
                    family[`type${ca.category_id}`] = ca.num;
                    if (parseInt(ca.num) > 0) {
                        family.total += parseInt(ca.num);
                    }
                });
            }
            user.familyList.push(family);
        });
        userList.push(user);
    });
    return userList;
}
const getUserList = (data) => {
    const userList = [];
    data.map(item => {
        if (item.family_list.length === 0) {
            userList.push({
                id: item.user_id,
                name: item.user_name,
                phone: item.phone,
                isOnline: "离线",
                total: 0
            });
        } else {
            item.family_list.map(it => {
                const user = {
                    id: item.user_id,
                    name: item.user_name,
                    phone: item.phone,
                    isOnline: it.router_online ? '在线' : '离线',
                    total: 0
                };
                if (it.device_list.length > 0) {
                    it.device_list.map(ca => {
                        user[`type${ca.category_id}`] = ca.num;
                        if (parseInt(ca.num) > 0) {
                            user.total += parseInt(ca.num);
                        }
                    })
                }
                userList.push(user);
            })
        }
    });
    return userList;
}

const getTypes = (data) => {
    const types = [];
    const categories = {};
    const datas = data.filter(item => item.family_list.length > 0);
    datas.map(data => {
        data.family_list.map(item => {
            if (item.device_list.length > 0) {
                item.device_list.map(it => {
                    if(!categories[it.category_id] && categories[it.category_id] !== '') {
                        categories[it.category_id] = it.category_name;
                    }
                });
            }
        });
    });
    Object.keys(categories).map(key => {
        types.push({
            id: key,
            name: `type${key}`,
            text: categories[key]
        })
    });
    types.push({
        id: 'heji',
        name: 'total',
        text: '合计'
    });
    return types;
}
</script>
