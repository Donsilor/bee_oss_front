(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-147d7f90"],{"0a03":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-content config-page"},[n("div",{staticStyle:{position:"relative"}},[n("el-row",{attrs:{gutter:24}},[n("el-col",{staticStyle:{"padding-right":"0"},attrs:{span:2}},[n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.openAddEditLayer()}}},[t._v(" 添加策略组 ")])],1)],1)],1),n("div",{staticStyle:{"margin-top":"20px"}},[n("el-table",{staticStyle:{width:"100%","border-top":"0 none"},attrs:{data:t.imgList.tableData}},[t._l(t.imgList.tableColumn,(function(e){return n("el-table-column",{key:e.prop,attrs:{prop:e.prop,label:e.label,width:"auto"},scopedSlots:t._u([{key:"default",fn:function(r){return[n("div",[t._v(t._s(r.row[e.prop]))])]}}],null,!0)})})),n("el-table-column",{attrs:{width:"180",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.openEditLayer(e.row)}}},[t._v(" 编辑 ")]),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.deleteImg(e.row)}}},[t._v(" 删除 ")])]}}])})],2),n("div",{staticClass:"page-line"},[n("el-pagination",{attrs:{total:t.totalItem,"page-size":10,"current-page":t.currentPage,small:"",layout:"prev, pager, next"},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"current-change":t.pageChange}})],1)],1),n("el-dialog",{attrs:{title:t.addEditFlag?"添加策略组":"编辑策略组",visible:t.addEditLayer},on:{"update:visible":function(e){t.addEditLayer=e}}},[n("div",{staticClass:"edit_form"},[n("el-form",{ref:"AddEditForm",attrs:{model:t.AddEditForm,rules:t.rulesAddEdit,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"策略组名称"}},[n("el-input",{model:{value:t.AddEditForm.F_strategy_name,callback:function(e){t.$set(t.AddEditForm,"F_strategy_name",e)},expression:"AddEditForm.F_strategy_name"}})],1),n("el-form-item",{attrs:{label:"字段类型"}},[n("el-select",{attrs:{placeholder:"请选择"},model:{value:t.AddEditForm.F_type,callback:function(e){t.$set(t.AddEditForm,"F_type",e)},expression:"AddEditForm.F_type"}},[n("el-option",{attrs:{label:"uuid",value:"uuid"}}),n("el-option",{attrs:{label:"common",value:"common"}})],1)],1),n("el-form-item",{attrs:{label:"版本"}},[n("el-input",{model:{value:t.AddEditForm.F_version,callback:function(e){t.$set(t.AddEditForm,"F_version",e)},expression:"AddEditForm.F_version"}})],1),n("el-form-item",{attrs:{label:"地区"}},[n("el-input",{model:{value:t.AddEditForm.F_region,callback:function(e){t.$set(t.AddEditForm,"F_region",e)},expression:"AddEditForm.F_region"}})],1),n("el-form-item",{attrs:{label:"终端类型"}},[n("el-select",{attrs:{placeholder:"请选择"},model:{value:t.AddEditForm.F_os_type,callback:function(e){t.$set(t.AddEditForm,"F_os_type",e)},expression:"AddEditForm.F_os_type"}},[n("el-option",{attrs:{label:"Android ",value:"Android "}}),n("el-option",{attrs:{label:"IOS",value:"Ios "}})],1)],1),n("el-form-item",{attrs:{label:"host列表"}},[n("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:t.AddEditForm.F_host_list,callback:function(e){t.$set(t.AddEditForm,"F_host_list",e)},expression:"AddEditForm.F_host_list"}},t._l(t.hostList,(function(t){return n("el-option",{key:t.F_value,attrs:{label:t.F_value,value:t.F_value}})})),1)],1)],1)],1),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addEditConfirm("AddEditForm")}}},[t._v(" 确定 ")]),n("el-button",{on:{click:function(e){t.addEditLayer=!1}}},[t._v(" 取消 ")])],1)])],1)},o=[],a=(n("a4d3"),n("4de4"),n("e439"),n("dbb4"),n("b64b"),n("159b"),n("ade3")),i=n("2f62"),u=(n("f1ed"),n("5c96")),s=n("8e44");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){Object(a["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var l=d({data:function(){return{addEditLayer:!1,hostList:[],totalItem:0,currentPage:1,listParams:{page:1},imgList:{tableColumn:[{prop:"F_strategy_id",label:"id"},{prop:"F_strategy_name",label:"名称"},{prop:"F_version",label:"版本"},{prop:"F_region",label:"地区"},{prop:"F_os_type",label:"终端类型"},{prop:"F_create_time",label:"创建时间"}],tableData:[]},addEditFlag:!0,AddEditForm:{F_strategy_name:"",F_version:"",F_type:"",F_region:"",F_os_type:"",F_host_list:""},rulesAddEdit:{},sortArr:[]}}},Object(i["mapActions"])(["StrategyConfiglists"]),{computed:d({},Object(i["mapGetters"])({})),mounted:function(){this.getImgList(1),this.getHostList()},methods:{getdata:function(){console.log("移动中.....")},openAddEditLayer:function(){var t=this;this.addEditFlag=!0,this.addEditLayer=!0,this.$nextTick((function(){var e=t.AddEditForm;for(var n in e)e[n]=""}))},pageChange:function(){this.getImgList(this.currentPage)},deleteImg:function(t){var e=this;this.$confirm("确定删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){s["a"].StrategyDel({F_strategy_id:t.F_strategy_id}).then((function(t){200===t.code&&(e.$message({type:"success",message:"删除成功!"}),e.getImgList(e.currentPage))}))})).catch((function(){}))},openEditLayer:function(t){var e=this;this.addEditFlag=!1,this.addEditLayer=!0,this.$nextTick((function(){var n=e.AddEditForm;for(var r in n)n[r]=t[r];e.fileListObj=[{name:t["image_url_object"],url:t["image_url_object"]}]}))},addEditConfirm:function(t){var e=this;e.$refs[t].validate((function(t){if(!t)return!1;var n=JSON.parse(JSON.stringify(e.AddEditForm));delete n.image_url,e.addEditFlag&&delete n.id,e.addEditFlag?s["a"].StrategyAdd(n).then((function(t){t&&200===t.code?(Object(u["Message"])({message:"新增成功",type:"success"}),e.addEditLayer=!1,e.getImgList(e.currentPage)):Object(u["Message"])({message:t.list[0].detail,type:"error"})})):s["a"].StrategyEdit(n).then((function(t){t&&200===t.code&&(Object(u["Message"])({message:"编辑成功",type:"success"}),e.addEditLayer=!1,e.getImgList(e.currentPage))}))}))},getImgList:function(t){this.listParams.page=t,this.listParams.limit=10;var e=this;s["a"].strategyList(e.listParams).then((function(t){if(t&&t.result&&t.result.data.length){var n=t.result.data;e.imgList.tableData=n,e.totalItem=t.result.total||0,e.sortArr=[],n.forEach((function(t){e.sortArr.push(t.id)}))}}))},getHostList:function(){var t=this,e={F_type:"gray_host"};s["a"].StrategyConfiglists(e).then((function(e){e&&e.result&&(t.hostList=e.result)}))}}}),p=l,f=(n("9203"),n("2877")),g=Object(f["a"])(p,r,o,!1,null,null,null);e["default"]=g.exports},"5aa7":function(t,e,n){"use strict";n("a4d3"),n("4de4"),n("e439"),n("dbb4"),n("b64b"),n("159b");var r=n("ade3"),o=n("1e04"),a=n("46f1");function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){Object(r["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var s="/api.php";e["a"]={agreementSave:function(t){return o["a"].post(a["m"].agreementSave,t).then((function(t){return t.data}))},agreementdel:function(t){return o["a"].post(a["m"].agreementdel,t).then((function(t){return t.data}))},pubilcCorsAction:function(t){return o["a"].post(s,t).then((function(t){return t.data}))},getVersions:function(t){return t.method="list_versions",o["a"].post(s,t).then((function(t){return t.data}))},getVersionsForSC:function(t){return t.method="list_versions_community",o["a"].post(s,t).then((function(t){return t.data}))},selectVersion:function(t){return o["a"].post(a["m"].selectVersion,t).then((function(t){return t.data}))},pushUpdateAction:function(t){return o["a"].post(a["m"].pushUpdateAction,t).then((function(t){return t.data}))},getPushHistoryList:function(t){return o["a"].post(a["m"].getPushHistoryList,t).then((function(t){return t.data}))},getChoseList:function(t){return o["a"].post(s,t).then((function(t){return t.data}))},getAgreementList:function(t){return o["a"].post(a["m"].agreementList,t).then((function(t){return t.data}))},getAppList:function(t){return o["a"].post(s,u({method:"list_applications"},t))},getAppInfo:function(t){return o["a"].post(s,u({method:"info_applications"},t))},delApp:function(t){return o["a"].post(s,u({method:"del_applications"},t))},saveApp:function(t){return o["a"].post(s,u({method:"save_applications"},t))},getAppVerList:function(t){return o["a"].post(s,u({method:"list_versions_commom"},t))},getAppVerInfo:function(t){return o["a"].post(s,u({method:"info_versions_commom"},t))},delAppVer:function(t){return o["a"].post(s,u({method:"del_version_commom"},t))},saveAppVer:function(t){return o["a"].post(s,u({method:"save_app_version_commom"},t))},setAppVerStatus:function(t){return o["a"].post(s,u({method:"set_status_commom"},t))},setAppVerUuids:function(t){return o["a"].post(s,u({method:"set_uuids_commom"},t))},getAppVerUuids:function(t){return o["a"].post(s,u({method:"get_uuids_commom"},t))}}},"5d14":function(t,e,n){},"8e44":function(t,e,n){"use strict";n("a4d3"),n("4de4"),n("e439"),n("dbb4"),n("b64b"),n("159b");var r=n("ade3"),o=n("1e04"),a=n("46f1"),i={searchUserList:function(t){return o["a"].post(a["i"].searchUserList,t)},userList:function(t){return o["a"].post(a["i"].userList,t)},getUser:function(t){return o["a"].post(a["i"].getUser,t)},addUser:function(t){return o["a"].post(a["i"].addUser,t)},editUser:function(t){return o["a"].post(a["i"].editUser,t)},deleteUser:function(t){return o["a"].post(a["i"].deleteUser,{user_ids:t})},updatePwd:function(t){return o["a"].post(a["i"].updatePwd,t)},resetPwd:function(t){return o["a"].post(a["i"].resetPwd,t)},roleList:function(t){return o["a"].post(a["i"].roleList,t)},getRole:function(t){return o["a"].post(a["i"].getRole,{role_id:t})},addRole:function(t){return o["a"].post(a["i"].addRole,t)},editRole:function(t){return o["a"].post(a["i"].editRole,t)},deleteRole:function(t){return o["a"].post(a["i"].deleteRole,{role_id:t})},menuList:function(){return o["a"].post(a["i"].menuList)}},u=i,s=n("9a1b");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){Object(r["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var l={getOnlineUser:function(t){return o["a"].post("".concat(a["c"],"analyzer/online_user"),t)},getRegisterUser:function(t){return o["a"].post("".concat(a["c"],"analyzer/register_user"),t)},getActiveUser:function(t){return o["a"].post("".concat(a["c"],"analyzer/active_user"),t)},getActivePercent:function(t){return o["a"].post("".concat(a["c"],"analyzer/active_percent"),t)},getLoginUser:function(t){return o["a"].post("".concat(a["c"],"analyzer/login_user"),t)}};Object.assign(l,{getUserAnalyzeData:function(t){var e=d({},t,{province:"",city:""});return o["a"].all([l.getOnlineUser(t),l.getRegisterUser(e),l.getActiveUser(t),l.getLoginUser(t)])}});var p=l,f={getMUserList:function(t){return o["a"].post("".concat(a["c"],"iotuser/muserlist"),t)},addMUser:function(t){return o["a"].post("".concat(a["c"],"iotuser/savemuser"),t)},deleteMUser:function(t){return o["a"].post("".concat(a["c"],"iotuser/delmuser"),{user_ids:t})}},g={CmDataList:function(t){return o["a"].post(a["d"].CmDataList,t).then((function(t){return t.data}))},CmDataAdd:function(t){return o["a"].post(a["d"].CmDataAdd,t).then((function(t){return t.data}))},CmDataEdit:function(t){return o["a"].post(a["d"].CmDataEdit,t).then((function(t){return t.data}))},CmDataDel:function(t){return o["a"].post(a["d"].CmDataDel,t).then((function(t){return t.data}))},ModuleList:function(t){return o["a"].post(a["d"].ModuleList,t).then((function(t){return t.data}))},input:function(t){return o["a"].post(a["d"].input,t).then((function(t){return t.data}))}},m={imgList:function(t){return o["a"].post(a["g"].imgList,t).then((function(t){return t.data}))},addImgs:function(t){return o["a"].post(a["g"].addImgs,t).then((function(t){return t.data}))},deleteImgs:function(t){return o["a"].post(a["g"].deleteImgs,t).then((function(t){return t.data}))},editImgs:function(t){return o["a"].post(a["g"].editImgs,t).then((function(t){return t.data}))},sortImgs:function(t){return o["a"].post(a["g"].sortImgs,t).then((function(t){return t.data}))}},h={searchUserList:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10;return o["a"].post(a["h"].userList,{phone_num:t,begin:e,size:n})},searchUserMsg:function(t){return o["a"].post(a["h"].searchUserMsg,t).then((function(t){return t.data.result}))},searchLogOut:function(t){return o["a"].post(a["h"].searchLogOut,t).then((function(t){return t.data.result}))},operaList:function(t){return o["a"].post(a["h"].operaList,t).then((function(t){return t.data.result}))},rootLogs:function(t){return o["a"].post(a["h"].rootLogs,t).then((function(t){return t.data.result}))},errLogs:function(t){return o["a"].post(a["h"].errLogs,t).then((function(t){return t.data.result}))},deviceLogs:function(t){return o["a"].post(a["h"].deviceLogs,t).then((function(t){return t.data.result}))},throughDatas:function(t){return o["a"].post(a["l"].throughDatas,t).then((function(t){return t.data.result}))},deviceTotals:function(t){return o["a"].post(a["l"].deviceTotal,t).then((function(t){return t.data.result}))},onlineLogs:function(t){return o["a"].post(a["l"].onlineLog,t).then((function(t){return t.data.result}))},logRegDatas:function(t){return o["a"].post(a["l"].logRegData,t).then((function(t){return t.data.result}))},qpsDatas:function(t){return o["a"].post(a["l"].qpsData,t).then((function(t){return t.data.result}))},getwarnDatas:function(t){return o["a"].post(a["l"].warnData,t).then((function(t){return t.data.result}))},getwarnDataList:function(t){return o["a"].post(a["l"].warnDataSearch,t).then((function(t){return t.data.result}))},routerList:function(t){return o["a"].post(a["h"].routerList,t).then((function(t){return t.data.result}))},cancelBindRouterList:function(t){return o["a"].post(a["h"].bindedlists,t).then((function(t){return t.data.result}))},cancelBind:function(t){return o["a"].post(a["h"].routerUnbind,t).then((function(t){return t.data.result}))},addRouter:function(t){return o["a"].post(a["h"].addRouter,t).then((function(t){return t.data.result}))},editRouter:function(t){return o["a"].post(a["h"].editRouter,t).then((function(t){return t.data}))},deleteRouter:function(t){return o["a"].post(a["h"].deleteRouter,t).then((function(t){return t.data}))},importRouter:function(t){return o["a"].post(a["h"].importRouter,t).then((function(t){return t.data.result}))},getFamilyList:function(t){return o["a"].post(a["h"].familyList,t).then((function(t){return t.data}))},directdeviceList:function(t){return o["a"].post(a["h"].directdeviceList,t).then((function(t){return t.data.result}))},addDirectdevice:function(t){return o["a"].post(a["h"].addDirectdevice,t).then((function(t){return t.data.result}))},editDirectdevice:function(t){return o["a"].post(a["h"].editDirectdevice,t).then((function(t){return t.data}))},deleteDirectdevice:function(t){return o["a"].post(a["h"].deleteDirectdevice,t).then((function(t){return t.data}))},importDirectdevice:function(t){return o["a"].post(a["h"].importDirectdevice,t).then((function(t){return t.data.result}))}},b={strategyList:function(t){return o["a"].post(a["k"].strategyList,t).then((function(t){return t.data}))},StrategyAdd:function(t){return o["a"].post(a["k"].StrategyAdd,t).then((function(t){return t.data}))},StrategyEdit:function(t){return o["a"].post(a["k"].StrategyEdit,t).then((function(t){return t.data}))},StrategyDel:function(t){return o["a"].post(a["k"].StrategyDel,t).then((function(t){return t.data}))},StrategyUuidList:function(t){return o["a"].post(a["k"].StrategyUuidList,t).then((function(t){return t.data}))},StrategyUuidAdd:function(t){return o["a"].post(a["k"].StrategyUuidAdd,t).then((function(t){return t.data}))},StrategyUuidEdit:function(t){return o["a"].post(a["k"].StrategyUuidEdit,t).then((function(t){return t.data}))},StrategyUuidDel:function(t){return o["a"].post(a["k"].StrategyUuidDel,t).then((function(t){return t.data}))},StrategyConfiglists:function(t){return o["a"].post(a["k"].StrategyConfiglists,t).then((function(t){return t.data}))},StrategyConfigAdd:function(t){return o["a"].post(a["k"].StrategyConfigAdd,t).then((function(t){return t.data}))},StrategyConfigEdit:function(t){return o["a"].post(a["k"].StrategyConfigEdit,t).then((function(t){return t.data}))},StrategyConfigDel:function(t){return o["a"].post(a["k"].StrategyConfigDel,t).then((function(t){return t.data}))}},y=n("5aa7");function v(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function _(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?v(Object(n),!0).forEach((function(e){Object(r["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}e["a"]=_({},u,{},s["a"],{},p,{},f,{},g,{},m,{},h,{},b,{},y["a"])},9203:function(t,e,n){"use strict";var r=n("5d14"),o=n.n(r);o.a},b64b:function(t,e,n){t.exports=n("1c0f")(313)},dbb4:function(t,e,n){t.exports=n("1c0f")(306)},e439:function(t,e,n){t.exports=n("1c0f")(305)}}]);
//# sourceMappingURL=chunk-147d7f90.9fccc68a.js.map