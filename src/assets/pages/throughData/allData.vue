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
				<el-col :span="4">
					<div class="con-pp pontiner" @click="goRouter('appRouterData')">
						<div class="ico-img">
							<i class="icon-user"></i>
						</div>
						<div><strong>{{numAll.app_num}}/{{numAll.router_num}}</strong></div>
						<h3>APP/路由在线数</h3>
					</div>
				</el-col>
				<el-col :span="4" :offset="1">
					<div class="con-pp pontiner" @click="goRouter('logRegData')">
						<div class="ico-img">
							<i class="icon-register"></i>
						</div>
						<div><strong>{{numAll.registered_total_num}}/{{numAll.logined_total_num}}</strong></div>
						<h3>用户注册/登录数</h3>
					</div>
				</el-col>
				<el-col :span="4" :offset="1">
					<div class="con-pp pontiner" @click="goRouter('devicesData')">
						<div class="ico-img">
							<i class="icon-device"></i>
						</div>
						<div><strong>{{numAll.device_total}}</strong></div>
						<h3>子设备统计</h3>
					</div>
				</el-col>
				<el-col :span="4" :offset="1">
					<div class="con-pp pontiner" @click="goRouter('0')">
						<div class="ico-img">
							<i class="icon-family"></i>
						</div>
						<div><strong>{{numAll.family_total}}</strong></div>
						<h3>家庭统计</h3>
					</div>
				</el-col>
				<el-col :span="4" :offset="1">
					<div class="con-pp pontiner" @click="goRouter('0')" >
						<div class="ico-img">
							<i class="icon-device"></i>
						</div>
						<div><strong>{{numAll.device_op_num}}</strong></div>
						<h3>设备操作统计</h3>
					</div>
				</el-col>
			</el-row>
			<el-row style="margin-top: 3rem" :gutter="24">
				<el-col :span="4" >
					<div class="con-pp pontiner" @click="goRouter('qpsData')">
						<div class="ico-img">
							<i class="icon-qps"></i>
						</div>
						<div><strong>{{numAll.access_msg_num}}</strong></div>
						<h3>QPS</h3>
					</div>
				</el-col>
			</el-row>
		</div>
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
                device_op_num: 0,
                access_msg_num: 0
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
		},
        goRouter (val) {
            if (val !== '0') {
                this.$router.push({path: '/main/throughData/' + val})
			}
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
		margin-top: 40px;
		.con-pp{
			.ico-img{
				height: 2.5rem;
				padding-top: 1rem;
			}
			strong{
				font-size: 1.75em;
				color: #00CC33;
			}
			border: 1px solid #eee;
			height: 150px;
			text-align: center;
		}
		.con-pp:hover{
			background: #eee;
		}
		.pontiner{
			cursor: pointer;
			min-width: 180px;
		}
		.icon-pp(@width, @height){
			margin: auto;
			width: @width;
			height: @height;
			display: block;
			background-size: @width @height;
			background-repeat: no-repeat;
		}
		.icon-user{
			background-image: url("../../images/login.png");
			.icon-pp(2rem, 2rem)
		}
		.icon-register{
			background-image: url("../../images/register.png");
			.icon-pp(2rem, 2rem)
		}
		.icon-device{
			background-image: url("../../images/device.png");
			.icon-pp(2rem, 2rem)
		}
		.icon-family{
			background-image: url("../../images/family.png");
			.icon-pp(2rem, 2rem)
		}
		.icon-qps{
			background-image: url("../../images/QPS.png");
			.icon-pp(2rem, 2rem)
		}
	}
	.bg-gray{
		padding-right: 5rem;
	}
.cloud-page{
	 .el-tabs__active-bar{
		 height: 2px;
	 }

}
</style>