<template>
	<div class="bnav">
		<ul>
			<li v-for="item in navs" :class="{'active': actived === item.id}">
				<router-link :to="item.url" :class="item.className">{{item.title}}</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	props: {
		actived: {
			type: String,
			default: null
		}
	},
	data () {
		return {
			navs: [
				{
					title: '首页',
					id: 'home',
					className: 'home',
					url: '/main'
				},
				{
					title: '升级中心',
					id: 'config',
					className: 'config',
					url: '/main/config'
				},
                {
                    title: '推送',
                    id: 'upgrade',
                    className: 'upgrade',
                    url: '/main/upgrade'
                },
				{
					title: '设备OPS',
					id: 'ops',
					className: 'ops',
					url: '/main/ops'
				},
				{
					title: '设备管理',
					id: 'facility',
					className: 'facility',
					url: '/main/facility'
				},
				{
					title: '云端OPS',
					id: 'cloud',
					className: 'cloud',
					url: '/main/cloud'
				},
				{
					title: 'CMDB',
					id: 'cmdb',
					className: 'cmdb',
					url: '/main/cmdb'
				}
			]
		};
	},
	mounted () {},
	methods: {

	}
}
</script>
<style lang="less">
.iconStyle(@width: 16px, @height: 16px){
	width: @width;
	height: @height;
	background-size: @width @height;
}
.bnav{
	height: 100vh;
	background: #2B2B37;
	position: relative;
	margin-top: -80px;
	&:before{
		content: ' ';
		display: block;
		height: 80px;
	}
	li{
		height: 45px;
		
		&.actived{
			background: #3B3B53;
			a {
				color: #ffffff;
			}
		}
		a{
			color: #95959b;
			padding-left: 1.5em;
			display: block;
			height: 45px;
			width: 100%;
			box-sizing: border-box;
			line-height: 45px;
			&.router-link-exact-active{
				background: #3B3B53;
				color: #ffffff;
			}
			&:before{
				display: inline-block;
				content: ' ';
				background-repeat: no-repeat;
				background-position: 0 0;
				margin-right: .75em;
				vertical-align: middle;
			}

			&.home{
				&:before{
					background-image: url('../images/u48.png');
					.iconStyle;
				}
			}

			&.config{
				&:before{
					background-image: url('../images/u50.png');
					.iconStyle(16px, 18px);
				}
			}

			&.ops{
				&:before{
					background-image: url('../images/u43.png');
					.iconStyle;
				}
			}

			&.facility{
				&:before{
					background-image: url('../images/u65.png');
					.iconStyle(16px, 16px);
				}
			}

			&.cloud{
				&:before{
					background-image: url('../images/u52.png');
					.iconStyle;
				}
			}

			&.cmdb{
				&:before{
					background-image: url('../images/u59.png');
					.iconStyle(14px, 16px);
				}
			}

		}
	}
}
</style>