<template>
	<div class="left-menu">
		<el-menu :default-active="defaultActive" :router=true class="menu-list">
			<template v-for="item in menuData">
				<template v-if="item.children" >
					<el-submenu :index="item.path">
						<template slot="title"><i class="icon-pp" :class="item.icon"></i>{{item.title}}</template>
						<div v-for="subItem in item.children" style="overflow: hidden">
							<a target="_blank" v-if="subItem.elseUrl" class="href-a"  :href="subItem.path">{{subItem.title}}</a>
							<el-menu-item :index="subItem.path" v-else
										  :key="subItem.path"
										  :route="{ path: subItem.path }">{{subItem.title}}
							</el-menu-item>
						</div>
					</el-submenu>
				</template>
				<template v-if="!item.children">
					<el-menu-item :index="item.path" :key="item.path" :route="{ path: item.path }"><i class="icon-pp" :class="item.icon"></i>{{item.title}}</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
	<!--<div class="bnav">-->
		<!--<ul>-->
			<!--<li v-for="item in navs" :class="{'active': actived === item.id}">-->
				<!--<div v-if="item.children">-->
					<!--<router-link :to="item.url" :class="item.className">{{item.title}}</router-link>-->
					<!--<ul class="inner-ul">-->
						<!--<li v-for="child in item.children">-->
							<!--<router-link :to="child.url">{{child.title}}</router-link>-->
						<!--</li>-->
					<!--</ul>-->
				<!--</div>-->
				<!--<router-link :to="item.url" :class="item.className" v-else>{{item.title}}</router-link>-->
			<!--</li>-->
		<!--</ul>-->
	<!--</div>-->
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
            defaultActive: '',
		    menuData: [
                {
                    title: '首页',
                    path: '/main',
                    icon: 'home'
                },
                {
                    title: '升级中心',
                    path: 'sjzx',
                    icon: 'config',
                    children: [
                        {
                            title: '版本管理',
                            path: '/main/versionManager',
                            icon: ''
                        },
                        {
                            title: '推送管理',
                            path: '/main/pushManager',
                            icon: ''
                        }
                    ]

                },
                {
                    title: '业务数据',
                    path: 'yhsj',
                    icon: 'ops',
                    children: [
                        {
                            title: '路由器管理',
                            path: '/main/routerManager',
                            icon: ''
                        },
                        {
                            title: '用户信息',
                            path: '/main/ops',
                            icon: ''
                        },
                        {
                            title: '家庭信息',
                            path: '/main/familyList',
                            icon: ''
                        }
                    ]
                },
                {
                    title: '经分数据',
                    path: '/main/throughData',
                    icon: 'facility'
                },
                {
                    title: '告警管理',
                    path: 'gjgl',
                    icon: 'warn',
                    children: [
                        {
                            path: '/main/warnManage',
                            title: '业务告警统计',
                            isSelected: false
                        },
                        {
                            path: '/main/warnDataSearch',
                            title: '业务告警查询',
                            isSelected: false
                        },
                        {
                            path: 'http://zabbix.evergrande.me:9999/zabbix/zabbix.php?action=problem.view',
                            title: '系统告警',
							elseUrl: true,
                            isSelected: false
                        }
                    ]
                },
                {
                    title: '日志查询',
                    path: 'yptrz',
                    icon: 'cloud',
					children: [
                        {
                            path: '/main/rootLog',
                            title: '云平台日志',
                            isSelected: false
                        },
                        {
                            path: '/main/errLog',
                            title: '错误日志',
                            isSelected: false
                        }
					]
                },
                {
                    title: '家庭背景图',
                    path: '/main/familyImgList',
                    icon: 'facility'
                }
			],
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
					title: '设备OPS',
					id: 'ops',
					className: 'ops',
					url: '/main/ops'
				},
//				{
//					title: '设备管理',
//					id: 'facility',
//					className: 'facility',
//					url: '/main/facility'
//				},
				{
					title: '经分数据',
					id: 'throughData',
					className: 'cloud',
					url: '/main/throughData'
				},
                {
                    title: '告警管理',
                    id: 'warnManage',
                    className: 'cloud',
                    url: '/main/warnManage',
					children: [
                        {
                            title: '萨芬的大幅',
                            id: 'dddd',
                            className: '',
                            url: '/main/ewewe'
                        },
                        {
                            title: '沙发sad',
                            id: 'ssss',
                            className: '',
                            url: '/main/sddf'
                        },
					]
                },
//				{
//					title: 'CMDB',
//					id: 'cmdb',
//					className: 'cmdb',
//					url: '/main/cmdb'
//				},
                {
                    title: '云平台日志',
                    id: 'rootLog',
                    className: 'cmdb',
                    url: '/main/rootLog'
                }
			]
		};
	},
	mounted () {
	    let obj = this
        if (obj.default) {
            obj.defaultActive = obj.default
        } else {
	        if (/hasParent/.test(obj.$route.name)) {
                obj.defaultActive = obj.$route.name.substr(9)
			} else {
                obj.defaultActive = obj.$route.path
			}

        }
	},
	methods: {

	}
}
</script>
<style lang="less">
.href-a{
	font-size: 14px;
	padding-left: 45px;
	height: 50px;
	line-height: 50px;
	color: #95959b;
	display: block;
	width: 100%;
}
.href-a:hover{
	background: #3b3b53;

}
.iconStyle(@width: 16px, @height: 16px){
	width: @width;
	height: @height;
	background-size: @width @height;
}
.left-menu {
	.el-menu{
		border-radius: 0;
	}
}
.menu-list{
	.el-submenu__title{
		font-size: 16px;
		color: #95959b;
		padding-left: 33px !important;
	}
	.el-submenu__title:hover{
		background: #3b3b53;
	}
	.el-submenu .el-menu{
		background:none;
	}
	.el-submenu .el-menu-item{
		font-size: 14px;
		min-width: auto;
		padding-left: 45px !important;
	}
	.el-menu-item{
		font-size: 16px;
		padding-left: 33px !important;
		color: #95959b
	}
	.el-menu-item:hover{
		background: #3b3b53;
	}
	.is-active{
		color: #fff;
		background: #3b3b53;
	}
	height: 100vh;
	background: #2B2B37;

	li{
		.icon-pp:before{
			content: '';
			display: inline-block;
			position: relative;
			left: -8px;
		}
		.home:before{
			background-image: url('../images/home.png');
			.iconStyle(20px, 20px)
		}

		.config:before{
			background-image: url('../images/upgrade.png');
			.iconStyle(20px, 20px);
		}

		.ops:before{
			background-image: url('../images/dev.png');
			.iconStyle(20px, 20px);
		}

		.facility:before{
			background-image: url('../images/through.png');
			.iconStyle(20px, 20px);
		}

		.cloud:before{
			background-image: url('../images/log.png');
			.iconStyle(20px, 20px);
		}

		.warn:before{
			background-image: url('../images/warn.png');
			.iconStyle(20px, 20px);
		}


		.cmdb:before{
			background-image: url('../images/u59.png');
			.iconStyle(20px, 20px);
		}
	}

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
		.inner-ul{
			a{
				font-size: 14px;
				padding-left: 42px;
			}
		}
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