<template>
  <div class="left-menu">
    <el-menu
      :default-active="defaultActive"
      :router="true"
      class="menu-list">
      <template v-for="item in menuData">
        <template v-if="item.children">
          <el-submenu
            :index="item.path"
            :key="item.path">
            <template slot="title">
              <i
                :class="item.icon"
                class="icon-pp" />{{ item.title }}
            </template>
            <div
              v-for="subItem in item.children"
              v-show="!subItem.needAdmin || (subItem.needAdmin && isAdmin)"
              :key="subItem.path"
              style="overflow: hidden">
              <a
                v-if="subItem.elseUrl"
                :href="subItem.path"
                target="_blank"
                class="href-a">{{ subItem.title }}</a>
              <el-menu-item
                v-if="!subItem.elseUrl"
                :index="subItem.path"
                :key="subItem.path"
                :route="{ path: subItem.path }">{{ subItem.title }}
              </el-menu-item>
            </div>
          </el-submenu>
        </template>
        <template v-if="!item.children">
          <el-menu-item
            :index="item.path"
            :key="item.path"
            :route="{ path: item.path }">
            <i
              :class="item.icon"
              class="icon-pp" />{{ item.title }}</el-menu-item>
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
  data() {
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
              title: '社区版本管理',
              path: '/main/versionManagerForSC',
              icon: ''
            },
            {
              title: '推送管理',
              path: '/main/pushManager',
              icon: ''
            },
            {
              title: 'APP升级',
              path: '/main/appUpgrade',
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
            },
            {
              title: '文案配置',
              path: '/main/CmData',
              icon: 'facility'
            },
            {
              title: '商城配置',
              path: '/main/mallButtonConfig',
              icon: 'facility'
            },
            {
              title: '场景管理',
              path: '/main/sceneAdmin',
              icon: 'facility'
            },
            // {
            //   title: '情景管理',
            //   path: '/main/sightManage',
            //   icon: 'facility'
            // },
            {
              title: '启动模式管理',
              path: '/main/startMode',
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
            }
          ]
        },
        {
          title: '数据统计',
          path: 'analyzer',
          icon: 'family',
          children: [
            {
              title: '用户运营',
              path: '/main/analyzer/userData',
              icon: 'facility'
            },
            {
              title: '设备运营',
              path: '/main/analyzer/deviceData',
              icon: 'facility'
            },
            {
              title: '入网统计',
              path: '/main/analyzer/accessStatistics',
              icon: 'facility'
            },
            {
              title: '控制分析',
              path: '/main/analyzer/controlAnalysis',
              icon: 'facility'
            },
            {
              title: '活跃分析',
              path: '/main/analyzer/activeAnalysis',
              icon: 'facility'
            },
            {
              title: '路由分析',
              path: '/main/analyzer/routingAnalysis',
              icon: 'facility'
            },
            {
              title: '数据日报',
              path: '/main/analyzer/dailyData',
              icon: 'facility'
            }
          ]
        },
        {
          title: '用户反馈',
          path: '/main/feedback/list',
          icon: 'family'
        },
        {
          title: '开关生产信息',
          icon: 'family',
          path: 'switchproduct',
          children: [
            {
              title: '导入',
              path: '/main/switchproduct/import',
              icon: 'facility'
            },
            {
              title: 'MAC/SN查询',
              path: '/main/switchproduct/search',
              icon: 'facility'
            },
            {
              title: '历史查询记录',
              path: '/main/switchproduct/history',
              icon: 'facility'
            }
          ]
        },
        {
          title: '商城预定',
          path: '/main/mallReservation',
          icon: 'facility'
        }
      ]
    }
  },
  mounted() {
    const obj = this
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
  methods: {}
}
</script>
<style lang="less">
.href-a {
  font-size: 14px;
  padding-left: 45px;
  height: 50px;
  line-height: 50px;
  color: #95959b;
  display: block;
  width: 100%;
}
.href-a:hover {
  background: #3b3b53;
}
.iconStyle(@width: 16px, @height: 16px) {
  width: @width;
  height: @height;
  background-size: @width @height;
}
.left-menu {
  overflow-y: auto;
  height: calc(~"100vh - 80px");
  background-color: #2b2b37;

  .el-menu {
    border-radius: 0;
  }
}
.menu-list {
  .el-submenu__title {
    font-size: 16px;
    color: #95959b;
    padding-left: 33px !important;
  }
  .el-submenu__title:hover {
    background: #3b3b53;
  }
  .el-submenu .el-menu {
    background: none;
  }
  .el-submenu .el-menu-item {
    font-size: 14px;
    min-width: auto;
    padding-left: 45px !important;
  }
  .el-menu-item {
    font-size: 16px;
    padding-left: 33px !important;
    color: #95959b;
  }
  .el-menu-item:hover {
    background: #3b3b53;
  }
  .is-active {
    color: #fff;
    background: #3b3b53;
  }
  // min-height: 100vh;
  background: #2b2b37;

  li {
    .icon-pp:before {
      content: "";
      display: inline-block;
      position: relative;
      left: -8px;
    }
    .home:before {
      background-image: url("../images/home.png");
      .iconStyle(20px, 20px);
    }

    .config:before {
      background-image: url("../images/upgrade.png");
      .iconStyle(20px, 20px);
    }

    .ops:before {
      background-image: url("../images/dev.png");
      .iconStyle(20px, 20px);
    }

    .facility:before {
      background-image: url("../images/through.png");
      .iconStyle(20px, 20px);
    }

    .cloud:before {
      background-image: url("../images/log.png");
      .iconStyle(20px, 20px);
    }

    .warn:before {
      background-image: url("../images/warn.png");
      .iconStyle(20px, 20px);
    }

    .cmdb:before {
      background-image: url("../images/u59.png");
      .iconStyle(20px, 20px);
    }

    .family:before {
      background-image: url("../images/family.png");
      .iconStyle(20px, 20px);
    }
  }
}
</style>
