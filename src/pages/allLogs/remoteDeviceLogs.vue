<template>
	<div>
		<el-row>
			<el-col :span="6">
				<div class="block">
					<el-date-picker
						v-model="romoteRouterTime"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
					</el-date-picker>
				</div>
			</el-col>
			<el-col :span="5">
				<el-input v-model="routerUuid" placeholder="请输入路由器uuid"></el-input>
			</el-col>
			<el-col :span="5" style="margin-left: 10px;">
				<el-input v-model="deviceUuid" placeholder="请输入设备uuid"></el-input>
			</el-col>
			<el-col :span="2" style="padding-left: 20px;">
				<el-button type="primary" @click="getLogs">抓取</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import API from "../../service/index"
	export default {
		data () {
			return {
				romoteRouterTime: [],
				routerUuid: '',
				deviceUuid: ''
			}
		},
		methods: {
			getLogs () {
				let obj = {
					start_time: this.romoteRouterTime.length && this.getDateTime(this.romoteRouterTime[0], 'fulltime') || '',
					end_time: this.romoteRouterTime.length && this.getDateTime(this.romoteRouterTime[1], 'fulltime') || '',
					type: 'router',
					router_uuid: this.routerUuid,
					deviceUuid: this.deviceUuid
				}
				API.deviceLogs(obj).then(res => {
					// var a = document.createElement('a')
					// a.setAttribute('href', res.url)
					// a.setAttribute('target', '_blank')
					// a.setAttribute('id', '123')
					// // 防止反复添加
					// if(!document.getElementById('123')) document.body.appendChild(a)
					// a.click()
					// window.open(res.url, '_self')
					//newWin.location.href = res.url
					// this.newWin(res.url)
					let info =
						(localStorage.getItem('localData') &&
							JSON.parse(localStorage.getItem('localData')).user &&
							JSON.parse(localStorage.getItem('localData')).user.info) || {}
					window.open('/api/index.php/monitor/download?token='+ info.token, '_self')
				})
			},
			newWin(url){ //新窗口打开
				var a = document.createElement('a')
				a.setAttribute('href', url)
				a.setAttribute('style', 'display:none')
				a.setAttribute('target', '_blank')
				document.body.appendChild(a)
				a.click()
				a.parentNode.removeChild(a)
			},
			getDateTime(date, type) {
				// 时间格式获取
				if (!date) return
				let d = new Date(+date)
				let year = d.getFullYear()
				let month =
					d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
				let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
				let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
				let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
				let seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
				if (type === 'fulltime') {
					return (
						year +
						'-' +
						month +
						'-' +
						day +
						' ' +
						hours +
						':' +
						minutes +
						':' +
						seconds
					)
				} {
					return year + '-' + month + '-' + day
				}
			}
		}
	}
</script>

<style scoped>

</style>
