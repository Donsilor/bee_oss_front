(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5bceb774"],{"5af4":function(t,e,i){"use strict";var a=i("8cb3"),n=i.n(a);n.a},"6a8d":function(t,e,i){},"8cb3":function(t,e,i){},b64b:function(t,e,i){t.exports=i("1c0f")(313)},d3cb:function(t,e,i){"use strict";var a=i("6a8d"),n=i.n(a);n.a},dbb4:function(t,e,i){t.exports=i("1c0f")(306)},e439:function(t,e,i){t.exports=i("1c0f")(305)},f12b:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-container",[i("el-header",[i("bheader")],1),i("el-container",[i("el-aside",{attrs:{width:"190px"}},[i("bnav")],1),i("el-main",{staticClass:"page",attrs:{id:"page"}},[i("router-view")],1)],1)],1)},n=[],l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"bnheader"},[i("el-row",[i("el-col",{staticClass:"bnh-logo",attrs:{span:16}},[i("h1",[t._v("BeeNet OSS管理后台")])]),i("el-col",{staticClass:"bnh-info",attrs:{span:8}},[i("span",[t._v(t._s(t.user.name))]),i("a",{attrs:{href:"javascript:;"},on:{click:t.logout}},[t._v("退出登录")])])],1)],1)},c=[],o=(i("a4d3"),i("4de4"),i("e439"),i("dbb4"),i("b64b"),i("159b"),i("ade3")),r=i("b0b0"),s=i("f1ed"),p=i("2f62");function h(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function u(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?h(Object(i),!0).forEach((function(e){Object(o["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):h(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var m={data:function(){return{}},computed:u({},Object(p["mapGetters"])({token:r["s"],user:r["u"]})),mounted:function(){},methods:{logout:function(){var t=this;this.$http.post(s["a"]+"auth/logout",{token:this.token}).then((function(e){t.$store.dispatch({type:r["d"]}),t.$router.push("/"),t.$message.success("登出成功")}))}}},d=m,f=(i("5af4"),i("2877")),y=Object(f["a"])(d,l,c,!1,null,null,null),b=y.exports,v=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"left-menu"},[i("el-menu",{staticClass:"menu-list",attrs:{"default-active":t.defaultActive,router:!0}},[t._l(t.menuData,(function(e){return[e.children?[i("el-submenu",{key:e.path,attrs:{index:e.path}},[i("template",{slot:"title"},[i("i",{staticClass:"icon-pp",class:e.icon}),t._v(t._s(e.title)+" ")]),t._l(e.children,(function(e){return i("div",{directives:[{name:"show",rawName:"v-show",value:!e.needAdmin||e.needAdmin&&t.isAdmin,expression:"!subItem.needAdmin || (subItem.needAdmin && isAdmin)"}],key:e.path,staticStyle:{overflow:"hidden"}},[e.elseUrl?i("a",{staticClass:"href-a",attrs:{href:e.path,target:"_blank"}},[t._v(t._s(e.title))]):t._e(),e.elseUrl?t._e():i("el-menu-item",{key:e.path,attrs:{index:e.path,route:{path:e.path}}},[t._v(t._s(e.title)+" ")])],1)}))],2)]:t._e(),e.children?t._e():[i("el-menu-item",{key:e.path,attrs:{index:e.path,route:{path:e.path}}},[i("i",{staticClass:"icon-pp",class:e.icon}),t._v(t._s(e.title)+" ")])]]}))],2)],1)},g=[],w=(i("b0c0"),{title:"升级中心",path:"sjzx",icon:"config",children:[{title:"版本管理",path:"/main/versionManager",icon:""},{title:"社区版本管理",path:"/main/versionManagerForSC",icon:""},{title:"推送管理",path:"/main/pushManager",icon:""},{title:"APP升级",path:"/main/appUpgrade",icon:""},{title:"协议管理",path:"/main/protocolManage",icon:""}]}),_=w,O={title:"业务数据",path:"yhsj",icon:"ops",children:[{title:"路由器管理",path:"/main/routerManager",icon:""},{title:"已绑定路由器",path:"/main/bindRouter",icon:""},{title:"云端设备直连",path:"/main/cloudConnectDevice",icon:""},{title:"用户信息",path:"/main/ops",icon:""},{title:"重点用户信息",path:"/main/muser",icon:""},{title:"家庭信息",path:"/main/familyList",icon:""}]},S=O,j={title:"日志查询",path:"yptrz",icon:"cloud",children:[{path:"/main/rootLog",title:"云平台日志",isSelected:!1},{path:"/main/errLog",title:"错误日志",isSelected:!1},{path:"/main/remoteRouterLog",title:"远程路由器日志",isSelected:!1},{path:"/main/remoteDeviceLog",title:"远程设备日志",isSelected:!1}]},A=j,C={title:"配置管理",path:"pzgl",icon:"cloud",children:[{title:"家庭背景图",path:"/main/familyImgList",icon:"facility"},{title:"策略组",path:"/main/Strategy",icon:"facility"},{title:"策略组用户",path:"/main/StrategyUuid",icon:"facility"},{title:"策略组配置",path:"/main/StrategyConfig",icon:"facility"},{title:"文案配置",path:"/main/CmData",icon:"facility"},{title:"家具组件",path:"/main/appHomeConfig/home",icon:"facility"},{title:"商城配置",path:"/main/mallButtonConfig",icon:"facility"},{title:"场景管理",path:"/main/sceneAdmin",icon:"facility"},{title:"启动模式管理",path:"/main/startMode",icon:"facility"}]},D=C,x={title:"开关生产信息",icon:"family",path:"switchproduct",children:[{title:"导入",path:"/main/switchproduct/import",icon:"facility"},{title:"MAC/SN查询",path:"/main/switchproduct/search",icon:"facility"},{title:"历史查询记录",path:"/main/switchproduct/history",icon:"facility"}]},k=x,z={title:"数据统计",path:"analyzer",icon:"family",children:[{title:"用户运营",path:"/main/analyzer/userData",icon:"facility"},{title:"设备运营",path:"/main/analyzer/deviceData",icon:"facility"},{title:"入网统计",path:"/main/analyzer/accessStatistics",icon:"facility"},{title:"控制分析",path:"/main/analyzer/controlAnalysis",icon:"facility"},{title:"活跃分析",path:"/main/analyzer/activeAnalysis",icon:"facility"},{title:"路由分析",path:"/main/analyzer/routingAnalysis",icon:"facility"},{title:"数据日报",path:"/main/analyzer/dailyData",icon:"facility"}]},P=z,M={title:"权限设置",path:"permission",icon:"family",children:[{title:"用户管理",path:"/main/user",icon:"facility"},{title:"角色管理",path:"/main/role",icon:"facility"},{title:"密码修改",path:"/main/updatePassword",icon:"facility"},{title:"密码重置",path:"/main/resetPassword",icon:"facility",needAdmin:!0}]},$=M,L={title:"告警管理",path:"gjgl",icon:"warn",children:[{path:"/main/warnManage",title:"业务告警统计",isSelected:!1},{path:"/main/warnDataSearch",title:"业务告警查询",isSelected:!1},{path:"http://zabbix.evergrande.me:9999/zabbix/zabbix.php?action=problem.view",title:"系统告警",elseUrl:!0,isSelected:!1}]},E=L,U={title:"经分数据",path:"/main/throughData",icon:"facility"},B=U,I={title:"语义管理",path:"semanticMange",icon:"warn",children:[{path:"/main/semanticMange",title:"交互数据",isSelected:!1}]},N=I,R={props:{actived:{type:String,default:null}},data:function(){return{defaultActive:"",menuData:[{title:"首页",path:"/main",icon:"home"},_,S,B,E,A,D,$,P,N,{title:"用户反馈",path:"/main/feedback/list",icon:"family"},k,{title:"商城预定",path:"/main/mallReservation",icon:"facility"}]}},mounted:function(){console.log("menuData====",this.menuData);var t=this;t.default?t.defaultActive=t.default:/hasParent/.test(t.$route.name)?t.defaultActive=t.$route.name.substr(9):t.defaultActive=t.$route.path},methods:{}},J=R,F=(i("d3cb"),Object(f["a"])(J,v,g,!1,null,null,null)),G=F.exports,H={components:{Bheader:b,Bnav:G},data:function(){return{}},mounted:function(){},methods:{}},q=H,K=Object(f["a"])(q,a,n,!1,null,null,null);e["default"]=K.exports}}]);
//# sourceMappingURL=chunk-5bceb774.80bfa1c6.js.map