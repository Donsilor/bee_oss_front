<template>
	<div class="left-menu">
		<el-menu :default-active="defaultActive" :router=true class="menu-list">
			<template v-for="item in menuData">
				<template v-if="item.children" >
					<el-submenu :index="item.path" :key="item.path">
						<template slot="title"><i class="icon-pp" :class="item.icon"></i>{{item.title}}</template>
						<div v-for="subItem in item.children" style="overflow: hidden" :key="subItem.path"
                        v-show="!subItem.needAdmin || (subItem.needAdmin && isAdmin)">
							<a target="_blank" v-if="subItem.elseUrl" class="href-a"  :href="subItem.path">{{subItem.title}}</a>
							<el-menu-item :index="subItem.path" v-if="!subItem.elseUrl" :key="subItem.path" :route="{ path: subItem.path }">{{subItem.title}}
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
                            title: '重点用户信息',
                            path: '/main/muser',
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
                    title: '配置管理',
                    path: 'pzgl',
                    icon: 'cloud',
                    children: [
						{
                            title: '家庭背景图',
                            path: '/main/familyImgList',
                            icon: 'facility'
						},
						{
                            title: '策略组',
                            path: '/main/Strategy',
                            icon: 'facility'
						},
						{
                            title: '策略组用户',
                            path: '/main/StrategyUuid',
                            icon: 'facility'
						},
						{
                            title: '策略组配置',
                            path: '/main/StrategyConfig',
                            icon: 'facility'
						}
                    ]
				},
				{
                    title: '权限设置',
                    path: 'permission',
                    icon: 'family',
                    children: [
						{
                            title: '用户管理',
                            path: '/main/user',
                            icon: 'facility'
						},
						{
                            title: '角色管理',
                            path: '/main/role',
                            icon: 'facility'
						},
						{
                            title: '密码修改',
                            path: '/main/updatePassword',
                            icon: 'facility'
						},
						{
                            title: '密码重置',
                            path: '/main/resetPassword',
							icon: 'facility',
							needAdmin: true
						},
                    ]
				},
				{
                    title: '数据统计',
                    path: 'analyzer',
                    icon: 'family',
                    children: [
						{
                            title: '用户运营',
                            path: '/main/analyzer',
                            icon: 'facility'
						}
                    ]
                },
                {
                    title: '用户反馈',
                    path: '/main/feedback/list',
                    icon: 'family',
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
	overflow-y: auto;
	height: calc(~"100vh - 80px");
	background-color: #2B2B37;

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
	// min-height: 100vh;
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

		.family:before{
			background-image: url('../images/family.png');
			.iconStyle(20px, 20px);
		}

	}

}
</style>