<template>
	<div class="page-content cloud-page bg-gray">
		<div>
			<el-date-picker
					v-model="select_date"
					@change="changeSelectDate"
					placeholder="今天"
			>
			</el-date-picker>
		</div>
		<div class="allList">
			<el-row :gutter="24">
				<el-col :span="4" @click="goRouter('app')">
					<div class="con-pp">
						<div class="ico-img">
							<i class="el-icon-upload" style="font-size: 4rem; color: #ccc"></i>
						</div>
						<div><strong>5</strong></div>
						<h3>APP在线数</h3>
					</div>
				</el-col>
				<el-col :span="4" @click="goRouter('app')">
					<div class="con-pp">
						<div class="ico-img">
							<i class="el-icon-upload" style="font-size: 4rem; color: #ccc"></i>
						</div>
						<div><strong>5</strong></div>
						<h3>路由在线数</h3>
					</div>
				</el-col>
			</el-row>
		</div>
		<!--<div class="allThrougtData" style="margin-top: 15px">-->
			<!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
				<!--<el-tab-pane :label="'APP在线 ('+numAll.app_num+')'" name="1"></el-tab-pane>-->
				<!--<el-tab-pane :label="'路由器在线 ('+numAll.router_num+')'" name="2"></el-tab-pane>-->
				<!--<el-tab-pane :label="'用户注册 ('+numAll.registered_total_num+')'" name="3"></el-tab-pane>-->
				<!--<el-tab-pane :label="'用户登录 ('+numAll.logined_total_num+')'" name="4"></el-tab-pane>-->
				<!--<el-tab-pane :label="'家庭统计 ('+numAll.family_total+')'" name="5"></el-tab-pane>-->
				<!--<el-tab-pane :label="'子设备统计 ('+numAll.device_total+')'" name="7"></el-tab-pane>-->
				<!--<el-tab-pane :label="'设备操作统计 ('+numAll.device_op_num+')'" name="8"></el-tab-pane>-->
			<!--</el-tabs>-->
		<!--</div>-->
	</div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
	data () {
		return {
            activeName: '1',
            select_date: new Date(),
            numAll: {
                app_num: 0,
                router_num: 0,
                registered_total_num: 0,
                logined_total_num: 0,
                family_total: 0,
                device_total: 0,
                device_op_num: 0
			}
		}
	},
	mounted () {
	    this.changeSelectDate()
	},
	methods: {
        handleClick () {},
	    getFirstDatas () {
            let obj = this
            obj.$store.dispatch('throughDatas',{select_date: obj.select_date}).then((result) => {
                if (result) {
                    for (let attr in obj.numAll) {
                        if (result[attr]) {
                            obj.numAll[attr] = result[attr]
						}
					}
				}
            })
		},
        changeSelectDate () {
            this.getFirstDatas()
		}
	},
	components: {},
    ...mapActions([
        'throughDatas'
    ])
}
</script>
<style lang="less">
	.allList{
		margin-top: 20px;
		.con-pp{
			.ico-img{
				height: 70px;
				padding-top: 6px;
			}
			i{
				width: 64px;
				height: 64px;
			}
			strong{
				font-size: 1.75em;
				color: #00CC33;
			}
			background: #fff;
			height: 150px;
			text-align: center;
		}
	}
	.bg-gray{
		background: #F2F2F2;
	}
.cloud-page{
	 .el-tabs__active-bar{
		 height: 2px;
	 }

}
</style>