(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-24000429"],{3162:function(t){t.exports=JSON.parse('{"tableColumn":[{"prop":"method","label":"method"},{"prop":"msg_tag","label":"msg_tag"},{"prop":"host_name","label":"host_name"},{"prop":"req","label":"req"},{"prop":"svr_id","label":"svr_id"},{"prop":"user_id","label":"user_id"},{"prop":"router_id","label":"router_id"},{"prop":"code","label":"code"},{"prop":"msg","label":"msg"},{"prop":"cost_time","label":"cost_time"},{"prop":"created_time","label":"created_time"}],"tableData":[]}')},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,r){function n(t){return function(e){var r=String(o(e));return 1&t&&(r=r.replace(i,"")),2&t&&(r=r.replace(s,"")),r}}var o=r("1d80"),a="["+r("5899")+"]",i=RegExp("^"+a+a+"*"),s=RegExp(a+a+"*$");t.exports={start:n(1),end:n(2),trim:n(3)}},"59c2":function(t,e,r){},"5aa7":function(t,e,r){"use strict";r("a4d3"),r("4de4"),r("e439"),r("dbb4"),r("b64b"),r("159b");var n=r("ade3"),o=r("1e04"),a=r("46f1");function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function s(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var u="/api.php";e.a={agreementSave:function(t){return o.a.post(a.m.agreementSave,t).then((function(t){return t.data}))},agreementdel:function(t){return o.a.post(a.m.agreementdel,t).then((function(t){return t.data}))},pubilcCorsAction:function(t){return o.a.post(u,t).then((function(t){return t.data}))},getVersions:function(t){return t.method="list_versions",o.a.post(u,t).then((function(t){return t.data}))},getVersionsForSC:function(t){return t.method="list_versions_community",o.a.post(u,t).then((function(t){return t.data}))},selectVersion:function(t){return o.a.post(a.m.selectVersion,t).then((function(t){return t.data}))},pushUpdateAction:function(t){return o.a.post(a.m.pushUpdateAction,t).then((function(t){return t.data}))},getPushHistoryList:function(t){return o.a.post(a.m.getPushHistoryList,t).then((function(t){return t.data}))},getChoseList:function(t){return o.a.post(u,t).then((function(t){return t.data}))},getAgreementList:function(t){return o.a.post(a.m.agreementList,t).then((function(t){return t.data}))},getAppList:function(t){return o.a.post(u,s({method:"list_applications"},t))},getAppInfo:function(t){return o.a.post(u,s({method:"info_applications"},t))},delApp:function(t){return o.a.post(u,s({method:"del_applications"},t))},saveApp:function(t){return o.a.post(u,s({method:"save_applications"},t))},getAppVerList:function(t){return o.a.post(u,s({method:"list_versions_commom"},t))},getAppVerInfo:function(t){return o.a.post(u,s({method:"info_versions_commom"},t))},delAppVer:function(t){return o.a.post(u,s({method:"del_version_commom"},t))},saveAppVer:function(t){return o.a.post(u,s({method:"save_app_version_commom"},t))},setAppVerStatus:function(t){return o.a.post(u,s({method:"set_status_commom"},t))},setAppVerUuids:function(t){return o.a.post(u,s({method:"set_uuids_commom"},t))},getAppVerUuids:function(t){return o.a.post(u,s({method:"get_uuids_commom"},t))}}},"7cb9":function(t,e,r){"use strict";r.r(e),r("a4d3"),r("4de4"),r("e439"),r("dbb4"),r("b64b"),r("e25e"),r("159b");var n=r("ade3"),o=r("2f62"),a=r("3162"),i=(r("f1ed"),r("8e44"));function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}var u=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({components:{},data:function(){var t=(new Date).setHours(0,0,0);return{detailFlag:!1,rootLogForm:{inner:"",uuid:"",select_date:new Date,user_id:"",svr_id:"",router_id:"",msg_tag:"",method:"",code:"",session_id:"",limit:15,start_end_time:[new Date(t),new Date]},totalItem:0,currentPage:1,rootLogData:{},logDetail:{log_type:"",channel:"",method:"",msg_tag:"",session_id:"",host_name:"",client_info:"",svr_id:"",dst_id:"",uuid:"",user_id:"",family_id:"",room_id:"",router_id:"",device_id:"",msg:"",req_time:"",process_time:"",rcv_time:"",rsp_time:"",queue_cost_time:"",process_cost_time:"",net_cost_time:"",code:"",cost_time:"",created_time:"",req_id:"",req:""}}},computed:{},watch:{},mounted:function(){this.getRootLogs(1)},methods:{getDetail:function(t){this.detailFlag=!0;var e=this.logDetail;for(var r in e)e[r]=t[r]},getRootLogs:function(t){var e=this,r={},n={};for(var o in this.rootLogForm)n[o]=this.rootLogForm[o];for(var s in n.code?n.code=parseInt(n.code):delete n.code,n.page=t,n)"start_end_time"===s?n.start_end_time.length&&(r.start_time=n.start_end_time[0].Format("hh:mm:ss"),r.end_time=n.start_end_time[1].Format("hh:mm:ss")):r[s]=n[s];i.a.rootLogs(r).then((function(t){a.tableData=t.data,e.rootLogData=a,e.totalItem=t.total}))},pageChange:function(){this.getRootLogs(this.currentPage)},getWidth:function(t){var e=0;switch(t){case"method":e=100;break;case"user_id":case"msg_tag":e=100;break;case"router_id":case"cost_time":e=110;break;case"host_name":e=120;break;case"created_time":e=130;break;default:e="auto"}return e}}},Object(o.b)(["rootLogs"])),c=(r("85fd"),r("2877")),d=Object(c.a)(u,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"page-content rootLog-page"},[r("div",{staticStyle:{"padding-bottom":"30px"}},[r("el-row",{staticStyle:{"margin-right":"0"},attrs:{gutter:24}},[r("el-col",{staticStyle:{"padding-right":"0"},attrs:{span:3}},[r("el-input",{attrs:{placeholder:"uuid"},model:{value:t.rootLogForm.uuid,callback:function(e){t.$set(t.rootLogForm,"uuid",e)},expression:"rootLogForm.uuid"}})],1),r("el-col",{staticStyle:{"padding-right":"0"},attrs:{span:3}},[r("el-input",{attrs:{placeholder:"msg_tag"},model:{value:t.rootLogForm.msg_tag,callback:function(e){t.$set(t.rootLogForm,"msg_tag",e)},expression:"rootLogForm.msg_tag"}})],1),r("el-col",{staticStyle:{"padding-right":"0"},attrs:{span:3}},[r("el-input",{attrs:{placeholder:"session_id"},model:{value:t.rootLogForm.session_id,callback:function(e){t.$set(t.rootLogForm,"session_id",e)},expression:"rootLogForm.session_id"}})],1),r("el-col",{staticStyle:{"padding-right":"0"},attrs:{span:3}},[r("el-input",{attrs:{placeholder:"method"},model:{value:t.rootLogForm.method,callback:function(e){t.$set(t.rootLogForm,"method",e)},expression:"rootLogForm.method"}})],1),r("el-col",{staticStyle:{"padding-right":"0"},attrs:{span:3}},[r("el-input",{attrs:{placeholder:"svr_id"},model:{value:t.rootLogForm.svr_id,callback:function(e){t.$set(t.rootLogForm,"svr_id",e)},expression:"rootLogForm.svr_id"}})],1),r("el-col",{staticStyle:{"padding-right":"0"},attrs:{span:3}},[r("el-input",{attrs:{placeholder:"user_id"},model:{value:t.rootLogForm.user_id,callback:function(e){t.$set(t.rootLogForm,"user_id",e)},expression:"rootLogForm.user_id"}})],1),r("el-col",{staticStyle:{"padding-right":"0"},attrs:{span:3}},[r("el-input",{attrs:{placeholder:"router_id"},model:{value:t.rootLogForm.router_id,callback:function(e){t.$set(t.rootLogForm,"router_id",e)},expression:"rootLogForm.router_id"}})],1),r("el-col",{staticStyle:{"padding-right":"0"},attrs:{span:3}},[r("el-input",{attrs:{type:"number",placeholder:"code"},model:{value:t.rootLogForm.code,callback:function(e){t.$set(t.rootLogForm,"code",e)},expression:"rootLogForm.code"}})],1)],1),r("el-row",{staticStyle:{"margin-top":"15px"},attrs:{gutter:24}},[r("el-col",{staticStyle:{"padding-right":"0"},attrs:{span:3}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{placeholder:"今天"},model:{value:t.rootLogForm.select_date,callback:function(e){t.$set(t.rootLogForm,"select_date",e)},expression:"rootLogForm.select_date"}})],1),r("el-col",{staticClass:"time-box-col",staticStyle:{"padding-right":"0"},attrs:{span:3}},[r("el-time-picker",{attrs:{"is-range":"","range-separator":"至","start-placeholder":"开始时间","end-placeholder":"结束时间",placeholder:"选择时间范围"},model:{value:t.rootLogForm.start_end_time,callback:function(e){t.$set(t.rootLogForm,"start_end_time",e)},expression:"rootLogForm.start_end_time"}})],1),r("el-col",{staticStyle:{"padding-right":"0"},attrs:{span:2}},[r("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.getRootLogs(1)}}},[t._v(" 查询 ")])],1)],1)],1),r("div",[r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.rootLogData.tableData}},[r("el-table-column",{attrs:{width:60,label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"text"},on:{click:function(r){return t.getDetail(e.row)}}},[t._v(" 详情 ")])]}}])}),t._l(t.rootLogData.tableColumn,(function(e){return r("el-table-column",{key:e.prop,attrs:{prop:e.prop,"show-overflow-tooltip":!0,label:e.label,width:t.getWidth(e.prop),sortable:""},scopedSlots:t._u([{key:"default",fn:function(n){return[r("div",{attrs:{title:n.row[e.prop]}},[t._v(" "+t._s(n.row[e.prop])+" ")])]}}],null,!0)})}))],2),r("div",{staticClass:"page-line"},[r("el-pagination",{attrs:{total:t.totalItem,"page-size":15,"current-page":t.currentPage,small:"",layout:"prev, pager, next"},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"current-change":t.pageChange}})],1)],1),r("el-dialog",{staticClass:"rootLogDetail",attrs:{visible:t.detailFlag,title:"日志详情"},on:{"update:visible":function(e){t.detailFlag=e}}},[r("div",{staticClass:"edit_form"},[r("el-form",{attrs:{"label-width":"125px"}},[r("el-row",t._l(t.logDetail,(function(e,n){return r("el-col",{key:n,attrs:{span:12}},[r("el-form-item",{attrs:{label:n}},[r("span",[t._v(t._s(e))])])],1)})),1)],1)],1),r("div",{staticStyle:{"text-align":"right",margin:"0"}},[r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.detailFlag=!1}}},[t._v(" 关闭 ")])],1)])],1)}),[],!1,null,null,null);e.default=d.exports},"85fd":function(t,e,r){"use strict";var n=r("59c2");r.n(n).a},"8e44":function(t,e,r){"use strict";r("a4d3"),r("4de4"),r("e439"),r("dbb4"),r("b64b"),r("159b");var n=r("ade3"),o=r("1e04"),a=r("46f1"),i={searchUserList:function(t){return o.a.post(a.i.searchUserList,t)},userList:function(t){return o.a.post(a.i.userList,t)},getUser:function(t){return o.a.post(a.i.getUser,t)},addUser:function(t){return o.a.post(a.i.addUser,t)},editUser:function(t){return o.a.post(a.i.editUser,t)},deleteUser:function(t){return o.a.post(a.i.deleteUser,{user_ids:t})},updatePwd:function(t){return o.a.post(a.i.updatePwd,t)},resetPwd:function(t){return o.a.post(a.i.resetPwd,t)},roleList:function(t){return o.a.post(a.i.roleList,t)},getRole:function(t){return o.a.post(a.i.getRole,{role_id:t})},addRole:function(t){return o.a.post(a.i.addRole,t)},editRole:function(t){return o.a.post(a.i.editRole,t)},deleteRole:function(t){return o.a.post(a.i.deleteRole,{role_id:t})},menuList:function(){return o.a.post(a.i.menuList)}},s=r("9a1b");function u(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}var c={getOnlineUser:function(t){return o.a.post("".concat(a.c,"analyzer/online_user"),t)},getRegisterUser:function(t){return o.a.post("".concat(a.c,"analyzer/register_user"),t)},getActiveUser:function(t){return o.a.post("".concat(a.c,"analyzer/active_user"),t)},getActivePercent:function(t){return o.a.post("".concat(a.c,"analyzer/active_percent"),t)},getLoginUser:function(t){return o.a.post("".concat(a.c,"analyzer/login_user"),t)}};Object.assign(c,{getUserAnalyzeData:function(t){var e=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?u(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},t,{province:"",city:""});return o.a.all([c.getOnlineUser(t),c.getRegisterUser(e),c.getActiveUser(t),c.getLoginUser(t)])}});var d=c,l={getMUserList:function(t){return o.a.post("".concat(a.c,"iotuser/muserlist"),t)},addMUser:function(t){return o.a.post("".concat(a.c,"iotuser/savemuser"),t)},deleteMUser:function(t){return o.a.post("".concat(a.c,"iotuser/delmuser"),{user_ids:t})}},p={CmDataList:function(t){return o.a.post(a.d.CmDataList,t).then((function(t){return t.data}))},CmDataAdd:function(t){return o.a.post(a.d.CmDataAdd,t).then((function(t){return t.data}))},CmDataEdit:function(t){return o.a.post(a.d.CmDataEdit,t).then((function(t){return t.data}))},CmDataDel:function(t){return o.a.post(a.d.CmDataDel,t).then((function(t){return t.data}))},ModuleList:function(t){return o.a.post(a.d.ModuleList,t).then((function(t){return t.data}))},input:function(t){return o.a.post(a.d.input,t).then((function(t){return t.data}))}},f={imgList:function(t){return o.a.post(a.g.imgList,t).then((function(t){return t.data}))},addImgs:function(t){return o.a.post(a.g.addImgs,t).then((function(t){return t.data}))},deleteImgs:function(t){return o.a.post(a.g.deleteImgs,t).then((function(t){return t.data}))},editImgs:function(t){return o.a.post(a.g.editImgs,t).then((function(t){return t.data}))},sortImgs:function(t){return o.a.post(a.g.sortImgs,t).then((function(t){return t.data}))}},g={searchUserList:function(t,e,r){var n=1<arguments.length&&void 0!==e?e:0,i=2<arguments.length&&void 0!==r?r:10;return o.a.post(a.h.userList,{phone_num:t,begin:n,size:i})},searchUserMsg:function(t){return o.a.post(a.h.searchUserMsg,t).then((function(t){return t.data.result}))},searchLogOut:function(t){return o.a.post(a.h.searchLogOut,t).then((function(t){return t.data.result}))},operaList:function(t){return o.a.post(a.h.operaList,t).then((function(t){return t.data.result}))},rootLogs:function(t){return o.a.post(a.h.rootLogs,t).then((function(t){return t.data.result}))},errLogs:function(t){return o.a.post(a.h.errLogs,t).then((function(t){return t.data.result}))},deviceLogs:function(t){return o.a.post(a.h.deviceLogs,t).then((function(t){return t.data.result}))},throughDatas:function(t){return o.a.post(a.l.throughDatas,t).then((function(t){return t.data.result}))},deviceTotals:function(t){return o.a.post(a.l.deviceTotal,t).then((function(t){return t.data.result}))},onlineLogs:function(t){return o.a.post(a.l.onlineLog,t).then((function(t){return t.data.result}))},logRegDatas:function(t){return o.a.post(a.l.logRegData,t).then((function(t){return t.data.result}))},qpsDatas:function(t){return o.a.post(a.l.qpsData,t).then((function(t){return t.data.result}))},getwarnDatas:function(t){return o.a.post(a.l.warnData,t).then((function(t){return t.data.result}))},getwarnDataList:function(t){return o.a.post(a.l.warnDataSearch,t).then((function(t){return t.data.result}))},routerList:function(t){return o.a.post(a.h.routerList,t).then((function(t){return t.data.result}))},cancelBindRouterList:function(t){return o.a.post(a.h.bindedlists,t).then((function(t){return t.data.result}))},cancelBind:function(t){return o.a.post(a.h.routerUnbind,t).then((function(t){return t.data.result}))},addRouter:function(t){return o.a.post(a.h.addRouter,t).then((function(t){return t.data.result}))},editRouter:function(t){return o.a.post(a.h.editRouter,t).then((function(t){return t.data}))},deleteRouter:function(t){return o.a.post(a.h.deleteRouter,t).then((function(t){return t.data}))},importRouter:function(t){return o.a.post(a.h.importRouter,t).then((function(t){return t.data.result}))},getFamilyList:function(t){return o.a.post(a.h.familyList,t).then((function(t){return t.data}))},getFamilyDeviceList:function(t){return o.a.post(a.h.familyDeviceList,t).then((function(t){return t.data}))},getDeviceDetail:function(t){return o.a.post(a.h.deviceDetail,t).then((function(t){return t.data}))},directdeviceList:function(t){return o.a.post(a.h.directdeviceList,t).then((function(t){return t.data.result}))},addDirectdevice:function(t){return o.a.post(a.h.addDirectdevice,t).then((function(t){return t.data.result}))},editDirectdevice:function(t){return o.a.post(a.h.editDirectdevice,t).then((function(t){return t.data}))},deleteDirectdevice:function(t){return o.a.post(a.h.deleteDirectdevice,t).then((function(t){return t.data}))},importDirectdevice:function(t){return o.a.post(a.h.importDirectdevice,t).then((function(t){return t.data.result}))}},m={strategyList:function(t){return o.a.post(a.k.strategyList,t).then((function(t){return t.data}))},StrategyAdd:function(t){return o.a.post(a.k.StrategyAdd,t).then((function(t){return t.data}))},StrategyEdit:function(t){return o.a.post(a.k.StrategyEdit,t).then((function(t){return t.data}))},StrategyDel:function(t){return o.a.post(a.k.StrategyDel,t).then((function(t){return t.data}))},StrategyUuidList:function(t){return o.a.post(a.k.StrategyUuidList,t).then((function(t){return t.data}))},StrategyUuidAdd:function(t){return o.a.post(a.k.StrategyUuidAdd,t).then((function(t){return t.data}))},StrategyUuidEdit:function(t){return o.a.post(a.k.StrategyUuidEdit,t).then((function(t){return t.data}))},StrategyUuidDel:function(t){return o.a.post(a.k.StrategyUuidDel,t).then((function(t){return t.data}))},StrategyConfiglists:function(t){return o.a.post(a.k.StrategyConfiglists,t).then((function(t){return t.data}))},StrategyConfigAdd:function(t){return o.a.post(a.k.StrategyConfigAdd,t).then((function(t){return t.data}))},StrategyConfigEdit:function(t){return o.a.post(a.k.StrategyConfigEdit,t).then((function(t){return t.data}))},StrategyConfigDel:function(t){return o.a.post(a.k.StrategyConfigDel,t).then((function(t){return t.data}))}},h=r("5aa7");function b(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}e.a=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?b(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},i,{},s.a,{},d,{},l,{},p,{},f,{},g,{},m,{},h.a)},b64b:function(t,e,r){var n=r("23e7"),o=r("7b0b"),a=r("df75");n({target:"Object",stat:!0,forced:r("d039")((function(){a(1)}))},{keys:function(t){return a(o(t))}})},dbb4:function(t,e,r){var n=r("23e7"),o=r("83ab"),a=r("56ef"),i=r("fc6a"),s=r("06cf"),u=r("8418");n({target:"Object",stat:!0,sham:!o},{getOwnPropertyDescriptors:function(t){for(var e,r,n=i(t),o=s.f,c=a(n),d={},l=0;c.length>l;)void 0!==(r=o(n,e=c[l++]))&&u(d,e,r);return d}})},e25e:function(t,e,r){var n=r("23e7"),o=r("e583");n({global:!0,forced:parseInt!=o},{parseInt:o})},e439:function(t,e,r){var n=r("23e7"),o=r("d039"),a=r("fc6a"),i=r("06cf").f,s=r("83ab"),u=o((function(){i(1)}));n({target:"Object",stat:!0,forced:!s||u,sham:!s},{getOwnPropertyDescriptor:function(t,e){return i(a(t),e)}})},e583:function(t,e,r){var n=r("da84"),o=r("58a8").trim,a=r("5899"),i=n.parseInt,s=/^[+-]?0[Xx]/,u=8!==i(a+"08")||22!==i(a+"0x16");t.exports=u?function(t,e){var r=o(String(t));return i(r,e>>>0||(s.test(r)?16:10))}:i}}]);