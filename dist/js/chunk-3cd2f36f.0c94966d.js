(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3cd2f36f"],{"5aa7":function(t,e,n){"use strict";n("a4d3"),n("4de4"),n("e439"),n("dbb4"),n("b64b"),n("159b");var r=n("ade3"),a=n("1e04"),o=n("46f1");function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var c="/api.php";e.a={agreementSave:function(t){return a.a.post(o.m.agreementSave,t).then((function(t){return t.data}))},agreementdel:function(t){return a.a.post(o.m.agreementdel,t).then((function(t){return t.data}))},pubilcCorsAction:function(t){return a.a.post(c,t).then((function(t){return t.data}))},getVersions:function(t){return t.method="list_versions",a.a.post(c,t).then((function(t){return t.data}))},getVersionsForSC:function(t){return t.method="list_versions_community",a.a.post(c,t).then((function(t){return t.data}))},selectVersion:function(t){return a.a.post(o.m.selectVersion,t).then((function(t){return t.data}))},pushUpdateAction:function(t){return a.a.post(o.m.pushUpdateAction,t).then((function(t){return t.data}))},getPushHistoryList:function(t){return a.a.post(o.m.getPushHistoryList,t).then((function(t){return t.data}))},getChoseList:function(t){return a.a.post(c,t).then((function(t){return t.data}))},getAgreementList:function(t){return a.a.post(o.m.agreementList,t).then((function(t){return t.data}))},getAppList:function(t){return a.a.post(c,u({method:"list_applications"},t))},getAppInfo:function(t){return a.a.post(c,u({method:"info_applications"},t))},delApp:function(t){return a.a.post(c,u({method:"del_applications"},t))},saveApp:function(t){return a.a.post(c,u({method:"save_applications"},t))},getAppVerList:function(t){return a.a.post(c,u({method:"list_versions_commom"},t))},getAppVerInfo:function(t){return a.a.post(c,u({method:"info_versions_commom"},t))},delAppVer:function(t){return a.a.post(c,u({method:"del_version_commom"},t))},saveAppVer:function(t){return a.a.post(c,u({method:"save_app_version_commom"},t))},setAppVerStatus:function(t){return a.a.post(c,u({method:"set_status_commom"},t))},setAppVerUuids:function(t){return a.a.post(c,u({method:"set_uuids_commom"},t))},getAppVerUuids:function(t){return a.a.post(c,u({method:"get_uuids_commom"},t))}}},"5e5c":function(t,e,n){},"8c79":function(t,e,n){"use strict";n.r(e),n("a4d3"),n("4de4"),n("e439"),n("dbb4"),n("b64b"),n("159b");var r=n("ade3"),a=n("313e"),o=n.n(a),i=n("2f62"),u=(n("f1ed"),n("8e44"));function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}var s=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({components:{},data:function(){return{channel:"Router",select_date:new Date}},mounted:function(){this.initEchart(),this.changeSelectDate()},methods:{channelChange:function(){this.changeSelectDate()},changeSelectDate:function(){var t=this;u.a.logRegDatas({select_date:t.select_date,channel:t.channel}).then((function(e){if(e.data&&e.data.result.data){var n=e.data.result.data,r=[],a={login:{title:"阶段用户登录数",value:[]},login_all:{title:"用户登录总数",value:[]},register:{title:"阶段用户注册数",value:[]},register_all:{title:"用户注册总数",value:[]}};n.forEach((function(t){var e=new Date(t.start_stat_time);r.push(e.Format("hh:mm:ss")),a.login.value.push(t.logined_total_num),a.login_all.value.push(t.logined_total_num_all),a.register.value.push(t.registered_total_num),a.register_all.value.push(t.registered_total_num_all)})),t.renderEchart(r,a)}}))},initEchart:function(){this.alertChart=o.a.init(document.getElementById("charts-con"))},renderEchart:function(t,e){var n=[],r=[];for(var a in e)r.push(e[a].title),n.push({name:e[a].title,type:"line",data:e[a].value,markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},markLine:{data:[{type:"average",name:"平均值"}]}});this.alertChart.setOption({tooltip:{trigger:"axis",axisPointer:{animation:!1}},xAxis:{type:"category",data:t,splitLine:{show:!1}},yAxis:{name:"数量",type:"value",splitLine:{show:!0}},toolbox:{show:!0,feature:{dataZoom:{yAxisIndex:"none"},dataView:{readOnly:!1},magicType:{type:["line","bar"]},restore:{},saveAsImage:{}}},legend:{show:!0,data:r},series:n})},goBack:function(){history.go(-1)}}},Object(i.b)(["logRegDatas"])),d=(n("9119"),n("2877")),f=Object(d.a)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-content cloud-page"},[n("div",{staticStyle:{position:"relative","margin-bottom":"30px"}},[n("el-date-picker",{attrs:{placeholder:"今天"},on:{change:t.changeSelectDate},model:{value:t.select_date,callback:function(e){t.select_date=e},expression:"select_date"}}),n("el-select",{attrs:{placeholder:"频道"},on:{change:t.channelChange},model:{value:t.channel,callback:function(e){t.channel=e},expression:"channel"}},[n("el-option",{attrs:{label:"Router",value:"Router"}}),n("el-option",{attrs:{label:"Cloud",value:"Cloud"}})],1),n("el-button",{staticClass:"btn-right",attrs:{type:"text"},on:{click:t.goBack}},[t._v(" 返回 ")])],1),n("el-row",{attrs:{gutter:24}},[n("div",{staticStyle:{width:"100%",height:"500px"},attrs:{id:"charts-con"}})])],1)}),[],!1,null,null,null);e.default=f.exports},"8e44":function(t,e,n){"use strict";n("a4d3"),n("4de4"),n("e439"),n("dbb4"),n("b64b"),n("159b");var r=n("ade3"),a=n("1e04"),o=n("46f1"),i={searchUserList:function(t){return a.a.post(o.i.searchUserList,t)},userList:function(t){return a.a.post(o.i.userList,t)},getUser:function(t){return a.a.post(o.i.getUser,t)},addUser:function(t){return a.a.post(o.i.addUser,t)},editUser:function(t){return a.a.post(o.i.editUser,t)},deleteUser:function(t){return a.a.post(o.i.deleteUser,{user_ids:t})},updatePwd:function(t){return a.a.post(o.i.updatePwd,t)},resetPwd:function(t){return a.a.post(o.i.resetPwd,t)},roleList:function(t){return a.a.post(o.i.roleList,t)},getRole:function(t){return a.a.post(o.i.getRole,{role_id:t})},addRole:function(t){return a.a.post(o.i.addRole,t)},editRole:function(t){return a.a.post(o.i.editRole,t)},deleteRole:function(t){return a.a.post(o.i.deleteRole,{role_id:t})},menuList:function(){return a.a.post(o.i.menuList)}},u=n("9a1b");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}var s={getOnlineUser:function(t){return a.a.post("".concat(o.c,"analyzer/online_user"),t)},getRegisterUser:function(t){return a.a.post("".concat(o.c,"analyzer/register_user"),t)},getActiveUser:function(t){return a.a.post("".concat(o.c,"analyzer/active_user"),t)},getActivePercent:function(t){return a.a.post("".concat(o.c,"analyzer/active_percent"),t)},getLoginUser:function(t){return a.a.post("".concat(o.c,"analyzer/login_user"),t)}};Object.assign(s,{getUserAnalyzeData:function(t){var e=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},t,{province:"",city:""});return a.a.all([s.getOnlineUser(t),s.getRegisterUser(e),s.getActiveUser(t),s.getLoginUser(t)])}});var d=s,f={getMUserList:function(t){return a.a.post("".concat(o.c,"iotuser/muserlist"),t)},addMUser:function(t){return a.a.post("".concat(o.c,"iotuser/savemuser"),t)},deleteMUser:function(t){return a.a.post("".concat(o.c,"iotuser/delmuser"),{user_ids:t})}},l={CmDataList:function(t){return a.a.post(o.d.CmDataList,t).then((function(t){return t.data}))},CmDataAdd:function(t){return a.a.post(o.d.CmDataAdd,t).then((function(t){return t.data}))},CmDataEdit:function(t){return a.a.post(o.d.CmDataEdit,t).then((function(t){return t.data}))},CmDataDel:function(t){return a.a.post(o.d.CmDataDel,t).then((function(t){return t.data}))},ModuleList:function(t){return a.a.post(o.d.ModuleList,t).then((function(t){return t.data}))},input:function(t){return a.a.post(o.d.input,t).then((function(t){return t.data}))}},p={imgList:function(t){return a.a.post(o.g.imgList,t).then((function(t){return t.data}))},addImgs:function(t){return a.a.post(o.g.addImgs,t).then((function(t){return t.data}))},deleteImgs:function(t){return a.a.post(o.g.deleteImgs,t).then((function(t){return t.data}))},editImgs:function(t){return a.a.post(o.g.editImgs,t).then((function(t){return t.data}))},sortImgs:function(t){return a.a.post(o.g.sortImgs,t).then((function(t){return t.data}))}},h={searchUserList:function(t,e,n){var r=1<arguments.length&&void 0!==e?e:0,i=2<arguments.length&&void 0!==n?n:10;return a.a.post(o.h.userList,{phone_num:t,begin:r,size:i})},searchUserMsg:function(t){return a.a.post(o.h.searchUserMsg,t).then((function(t){return t.data.result}))},searchLogOut:function(t){return a.a.post(o.h.searchLogOut,t).then((function(t){return t.data.result}))},operaList:function(t){return a.a.post(o.h.operaList,t).then((function(t){return t.data.result}))},rootLogs:function(t){return a.a.post(o.h.rootLogs,t).then((function(t){return t.data.result}))},errLogs:function(t){return a.a.post(o.h.errLogs,t).then((function(t){return t.data.result}))},deviceLogs:function(t){return a.a.post(o.h.deviceLogs,t).then((function(t){return t.data.result}))},throughDatas:function(t){return a.a.post(o.l.throughDatas,t).then((function(t){return t.data.result}))},deviceTotals:function(t){return a.a.post(o.l.deviceTotal,t).then((function(t){return t.data.result}))},onlineLogs:function(t){return a.a.post(o.l.onlineLog,t).then((function(t){return t.data.result}))},logRegDatas:function(t){return a.a.post(o.l.logRegData,t).then((function(t){return t.data.result}))},qpsDatas:function(t){return a.a.post(o.l.qpsData,t).then((function(t){return t.data.result}))},getwarnDatas:function(t){return a.a.post(o.l.warnData,t).then((function(t){return t.data.result}))},getwarnDataList:function(t){return a.a.post(o.l.warnDataSearch,t).then((function(t){return t.data.result}))},routerList:function(t){return a.a.post(o.h.routerList,t).then((function(t){return t.data.result}))},cancelBindRouterList:function(t){return a.a.post(o.h.bindedlists,t).then((function(t){return t.data.result}))},cancelBind:function(t){return a.a.post(o.h.routerUnbind,t).then((function(t){return t.data.result}))},addRouter:function(t){return a.a.post(o.h.addRouter,t).then((function(t){return t.data.result}))},editRouter:function(t){return a.a.post(o.h.editRouter,t).then((function(t){return t.data}))},deleteRouter:function(t){return a.a.post(o.h.deleteRouter,t).then((function(t){return t.data}))},importRouter:function(t){return a.a.post(o.h.importRouter,t).then((function(t){return t.data.result}))},getFamilyList:function(t){return a.a.post(o.h.familyList,t).then((function(t){return t.data}))},getFamilyDeviceList:function(t){return a.a.post(o.h.familyDeviceList,t).then((function(t){return t.data}))},getDeviceDetail:function(t){return a.a.post(o.h.deviceDetail,t).then((function(t){return t.data}))},directdeviceList:function(t){return a.a.post(o.h.directdeviceList,t).then((function(t){return t.data.result}))},addDirectdevice:function(t){return a.a.post(o.h.addDirectdevice,t).then((function(t){return t.data.result}))},editDirectdevice:function(t){return a.a.post(o.h.editDirectdevice,t).then((function(t){return t.data}))},deleteDirectdevice:function(t){return a.a.post(o.h.deleteDirectdevice,t).then((function(t){return t.data}))},importDirectdevice:function(t){return a.a.post(o.h.importDirectdevice,t).then((function(t){return t.data.result}))}},g={strategyList:function(t){return a.a.post(o.k.strategyList,t).then((function(t){return t.data}))},StrategyAdd:function(t){return a.a.post(o.k.StrategyAdd,t).then((function(t){return t.data}))},StrategyEdit:function(t){return a.a.post(o.k.StrategyEdit,t).then((function(t){return t.data}))},StrategyDel:function(t){return a.a.post(o.k.StrategyDel,t).then((function(t){return t.data}))},StrategyUuidList:function(t){return a.a.post(o.k.StrategyUuidList,t).then((function(t){return t.data}))},StrategyUuidAdd:function(t){return a.a.post(o.k.StrategyUuidAdd,t).then((function(t){return t.data}))},StrategyUuidEdit:function(t){return a.a.post(o.k.StrategyUuidEdit,t).then((function(t){return t.data}))},StrategyUuidDel:function(t){return a.a.post(o.k.StrategyUuidDel,t).then((function(t){return t.data}))},StrategyConfiglists:function(t){return a.a.post(o.k.StrategyConfiglists,t).then((function(t){return t.data}))},StrategyConfigAdd:function(t){return a.a.post(o.k.StrategyConfigAdd,t).then((function(t){return t.data}))},StrategyConfigEdit:function(t){return a.a.post(o.k.StrategyConfigEdit,t).then((function(t){return t.data}))},StrategyConfigDel:function(t){return a.a.post(o.k.StrategyConfigDel,t).then((function(t){return t.data}))}},m=n("5aa7");function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}e.a=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},i,{},u.a,{},d,{},f,{},l,{},p,{},h,{},g,{},m.a)},9119:function(t,e,n){"use strict";var r=n("5e5c");n.n(r).a},b64b:function(t,e,n){var r=n("23e7"),a=n("7b0b"),o=n("df75");r({target:"Object",stat:!0,forced:n("d039")((function(){o(1)}))},{keys:function(t){return o(a(t))}})},dbb4:function(t,e,n){var r=n("23e7"),a=n("83ab"),o=n("56ef"),i=n("fc6a"),u=n("06cf"),c=n("8418");r({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(t){for(var e,n,r=i(t),a=u.f,s=o(r),d={},f=0;s.length>f;)void 0!==(n=a(r,e=s[f++]))&&c(d,e,n);return d}})},e439:function(t,e,n){var r=n("23e7"),a=n("d039"),o=n("fc6a"),i=n("06cf").f,u=n("83ab"),c=a((function(){i(1)}));r({target:"Object",stat:!0,forced:!u||c,sham:!u},{getOwnPropertyDescriptor:function(t,e){return i(o(t),e)}})}}]);