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
                class="icon-pp"/>{{ item.title }}
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
              class="icon-pp"/>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>

</template>
<script>
import updateManage from './modules/updateManage'
import businessData from './modules/businessData'
import log from './modules/log'
import configManage from './modules/configManage'
import switchInfo from './modules/switchInfo'
import dataStatistics from './modules/dataStatistics'
import permissionSettings from './modules/permissionSettings'
import warningManagement from './modules/warningManagement'
import subData from './modules/subData'
import semanticMange from './modules/semanticMange'

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
        updateManage,
        businessData,
        subData,
        warningManagement,
        log,
        configManage,
        permissionSettings,
        dataStatistics,
        semanticMange,
        {
          title: '用户反馈',
          path: '/main/feedback/list',
          icon: 'family'
        },
        switchInfo,
        {
          title: '商城预定',
          path: '/main/mallReservation',
          icon: 'facility'
        }
      ]
    }
  },
  mounted() {
    console.log('menuData====', this.menuData)
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
		height: 100%;
		background: #2b2b37;

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
				background-image: url("../../images/home.png");
				.iconStyle(20px, 20px);
			}

			.config:before {
				background-image: url("../../images/upgrade.png");
				.iconStyle(20px, 20px);
			}

			.ops:before {
				background-image: url("../../images/dev.png");
				.iconStyle(20px, 20px);
			}

			.facility:before {
				background-image: url("../../images/through.png");
				.iconStyle(20px, 20px);
			}

			.cloud:before {
				background-image: url("../../images/log.png");
				.iconStyle(20px, 20px);
			}

			.warn:before {
				background-image: url("../../images/warn.png");
				.iconStyle(20px, 20px);
			}

			.cmdb:before {
				background-image: url("../../images/u59.png");
				.iconStyle(20px, 20px);
			}

			.family:before {
				background-image: url("../../images/family.png");
				.iconStyle(20px, 20px);
			}
		}
	}
</style>
