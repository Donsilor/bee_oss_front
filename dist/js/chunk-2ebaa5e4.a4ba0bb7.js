(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2ebaa5e4"],{"0a03":function(t,e,n){"use strict";n.r(e),n("a4d3"),n("4de4"),n("e439"),n("dbb4"),n("b64b"),n("159b");var r=n("ade3"),a=n("2f62"),o=(n("f1ed"),n("5c96")),i=n("8e44");function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var c=s({data:function(){return{addEditLayer:!1,hostList:[],totalItem:0,currentPage:1,listParams:{page:1},imgList:{tableColumn:[{prop:"F_strategy_id",label:"id"},{prop:"F_strategy_name",label:"名称"},{prop:"F_version",label:"版本"},{prop:"F_region",label:"地区"},{prop:"F_os_type",label:"终端类型"},{prop:"F_create_time",label:"创建时间"}],tableData:[]},addEditFlag:!0,AddEditForm:{F_strategy_name:"",F_version:"",F_type:"",F_region:"",F_os_type:"",F_host_list:""},rulesAddEdit:{},sortArr:[]}}},Object(a.b)(["StrategyConfiglists"]),{computed:s({},Object(a.c)({})),mounted:function(){this.getImgList(1),this.getHostList()},methods:{getdata:function(){},openAddEditLayer:function(){var t=this;this.addEditFlag=!0,this.addEditLayer=!0,this.$nextTick((function(){var e=t.AddEditForm;for(var n in e)e[n]=""}))},pageChange:function(){this.getImgList(this.currentPage)},deleteImg:function(t){var e=this;this.$confirm("确定删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){i.a.StrategyDel({F_strategy_id:t.F_strategy_id}).then((function(t){200===t.code&&(e.$message({type:"success",message:"删除成功!"}),e.getImgList(e.currentPage))}))})).catch((function(){}))},openEditLayer:function(t){var e=this;this.addEditFlag=!1,this.addEditLayer=!0,this.$nextTick((function(){var n=e.AddEditForm;for(var r in n)n[r]=t[r];e.fileListObj=[{name:t.image_url_object,url:t.image_url_object}]}))},addEditConfirm:function(t){var e=this;e.$refs[t].validate((function(t){if(!t)return!1;var n=JSON.parse(JSON.stringify(e.AddEditForm));delete n.image_url,e.addEditFlag&&delete n.id,e.addEditFlag?i.a.StrategyAdd(n).then((function(t){t&&200===t.code?(Object(o.Message)({message:"新增成功",type:"success"}),e.addEditLayer=!1,e.getImgList(e.currentPage)):Object(o.Message)({message:t.list[0].detail,type:"error"})})):i.a.StrategyEdit(n).then((function(t){t&&200===t.code&&(Object(o.Message)({message:"编辑成功",type:"success"}),e.addEditLayer=!1,e.getImgList(e.currentPage))}))}))},getImgList:function(t){this.listParams.page=t,this.listParams.limit=10;var e=this;i.a.strategyList(e.listParams).then((function(t){if(t&&t.result&&t.result.data.length){var n=t.result.data;e.imgList.tableData=n,e.totalItem=t.result.total||0,e.sortArr=[],n.forEach((function(t){e.sortArr.push(t.id)}))}}))},getHostList:function(){var t=this,e={F_type:"gray_host"};i.a.StrategyConfiglists(e).then((function(e){e&&e.result&&(t.hostList=e.result)}))}}}),d=(n("9203"),n("2877")),l=Object(d.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-content config-page"},[n("div",{staticStyle:{position:"relative"}},[n("el-row",{attrs:{gutter:24}},[n("el-col",{staticStyle:{"padding-right":"0"},attrs:{span:2}},[n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.openAddEditLayer()}}},[t._v(" 添加策略组 ")])],1)],1)],1),n("div",{staticStyle:{"margin-top":"20px"}},[n("el-table",{staticStyle:{width:"100%","border-top":"0 none"},attrs:{data:t.imgList.tableData}},[t._l(t.imgList.tableColumn,(function(e){return n("el-table-column",{key:e.prop,attrs:{prop:e.prop,label:e.label,width:"auto"},scopedSlots:t._u([{key:"default",fn:function(r){return[n("div",[t._v(t._s(r.row[e.prop]))])]}}],null,!0)})})),n("el-table-column",{attrs:{width:"180",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.openEditLayer(e.row)}}},[t._v(" 编辑 ")]),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.deleteImg(e.row)}}},[t._v(" 删除 ")])]}}])})],2),n("div",{staticClass:"page-line"},[n("el-pagination",{attrs:{total:t.totalItem,"page-size":10,"current-page":t.currentPage,small:"",layout:"prev, pager, next"},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"current-change":t.pageChange}})],1)],1),n("el-dialog",{attrs:{title:t.addEditFlag?"添加策略组":"编辑策略组",visible:t.addEditLayer},on:{"update:visible":function(e){t.addEditLayer=e}}},[n("div",{staticClass:"edit_form"},[n("el-form",{ref:"AddEditForm",attrs:{model:t.AddEditForm,rules:t.rulesAddEdit,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"策略组名称"}},[n("el-input",{model:{value:t.AddEditForm.F_strategy_name,callback:function(e){t.$set(t.AddEditForm,"F_strategy_name",e)},expression:"AddEditForm.F_strategy_name"}})],1),n("el-form-item",{attrs:{label:"字段类型"}},[n("el-select",{attrs:{placeholder:"请选择"},model:{value:t.AddEditForm.F_type,callback:function(e){t.$set(t.AddEditForm,"F_type",e)},expression:"AddEditForm.F_type"}},[n("el-option",{attrs:{label:"uuid",value:"uuid"}}),n("el-option",{attrs:{label:"common",value:"common"}})],1)],1),n("el-form-item",{attrs:{label:"版本"}},[n("el-input",{model:{value:t.AddEditForm.F_version,callback:function(e){t.$set(t.AddEditForm,"F_version",e)},expression:"AddEditForm.F_version"}})],1),n("el-form-item",{attrs:{label:"地区"}},[n("el-input",{model:{value:t.AddEditForm.F_region,callback:function(e){t.$set(t.AddEditForm,"F_region",e)},expression:"AddEditForm.F_region"}})],1),n("el-form-item",{attrs:{label:"终端类型"}},[n("el-select",{attrs:{placeholder:"请选择"},model:{value:t.AddEditForm.F_os_type,callback:function(e){t.$set(t.AddEditForm,"F_os_type",e)},expression:"AddEditForm.F_os_type"}},[n("el-option",{attrs:{label:"Android ",value:"Android "}}),n("el-option",{attrs:{label:"IOS",value:"Ios "}})],1)],1),n("el-form-item",{attrs:{label:"host列表"}},[n("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:t.AddEditForm.F_host_list,callback:function(e){t.$set(t.AddEditForm,"F_host_list",e)},expression:"AddEditForm.F_host_list"}},t._l(t.hostList,(function(t){return n("el-option",{key:t.F_value,attrs:{label:t.F_value,value:t.F_value}})})),1)],1)],1)],1),n("div",{staticStyle:{"text-align":"right",margin:"0"}},[n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addEditConfirm("AddEditForm")}}},[t._v(" 确定 ")]),n("el-button",{on:{click:function(e){t.addEditLayer=!1}}},[t._v(" 取消 ")])],1)])],1)}),[],!1,null,null,null);e.default=l.exports},"5aa7":function(t,e,n){"use strict";n("a4d3"),n("4de4"),n("e439"),n("dbb4"),n("b64b"),n("159b");var r=n("ade3"),a=n("1e04"),o=n("46f1");function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var s="/api.php";e.a={agreementSave:function(t){return a.a.post(o.m.agreementSave,t).then((function(t){return t.data}))},agreementdel:function(t){return a.a.post(o.m.agreementdel,t).then((function(t){return t.data}))},pubilcCorsAction:function(t){return a.a.post(s,t).then((function(t){return t.data}))},getVersions:function(t){return t.method="list_versions",a.a.post(s,t).then((function(t){return t.data}))},getVersionsForSC:function(t){return t.method="list_versions_community",a.a.post(s,t).then((function(t){return t.data}))},selectVersion:function(t){return a.a.post(o.m.selectVersion,t).then((function(t){return t.data}))},pushUpdateAction:function(t){return a.a.post(o.m.pushUpdateAction,t).then((function(t){return t.data}))},getPushHistoryList:function(t){return a.a.post(o.m.getPushHistoryList,t).then((function(t){return t.data}))},getChoseList:function(t){return a.a.post(s,t).then((function(t){return t.data}))},getAgreementList:function(t){return a.a.post(o.m.agreementList,t).then((function(t){return t.data}))},getAppList:function(t){return a.a.post(s,u({method:"list_applications"},t))},getAppInfo:function(t){return a.a.post(s,u({method:"info_applications"},t))},delApp:function(t){return a.a.post(s,u({method:"del_applications"},t))},saveApp:function(t){return a.a.post(s,u({method:"save_applications"},t))},getAppVerList:function(t){return a.a.post(s,u({method:"list_versions_commom"},t))},getAppVerInfo:function(t){return a.a.post(s,u({method:"info_versions_commom"},t))},delAppVer:function(t){return a.a.post(s,u({method:"del_version_commom"},t))},saveAppVer:function(t){return a.a.post(s,u({method:"save_app_version_commom"},t))},setAppVerStatus:function(t){return a.a.post(s,u({method:"set_status_commom"},t))},setAppVerUuids:function(t){return a.a.post(s,u({method:"set_uuids_commom"},t))},getAppVerUuids:function(t){return a.a.post(s,u({method:"get_uuids_commom"},t))}}},"5d14":function(t,e,n){},"8e44":function(t,e,n){"use strict";n("a4d3"),n("4de4"),n("e439"),n("dbb4"),n("b64b"),n("159b");var r=n("ade3"),a=n("1e04"),o=n("46f1"),i={searchUserList:function(t){return a.a.post(o.i.searchUserList,t)},userList:function(t){return a.a.post(o.i.userList,t)},getUser:function(t){return a.a.post(o.i.getUser,t)},addUser:function(t){return a.a.post(o.i.addUser,t)},editUser:function(t){return a.a.post(o.i.editUser,t)},deleteUser:function(t){return a.a.post(o.i.deleteUser,{user_ids:t})},updatePwd:function(t){return a.a.post(o.i.updatePwd,t)},resetPwd:function(t){return a.a.post(o.i.resetPwd,t)},roleList:function(t){return a.a.post(o.i.roleList,t)},getRole:function(t){return a.a.post(o.i.getRole,{role_id:t})},addRole:function(t){return a.a.post(o.i.addRole,t)},editRole:function(t){return a.a.post(o.i.editRole,t)},deleteRole:function(t){return a.a.post(o.i.deleteRole,{role_id:t})},menuList:function(){return a.a.post(o.i.menuList)}},u=n("9a1b");function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}var c={getOnlineUser:function(t){return a.a.post("".concat(o.c,"analyzer/online_user"),t)},getRegisterUser:function(t){return a.a.post("".concat(o.c,"analyzer/register_user"),t)},getActiveUser:function(t){return a.a.post("".concat(o.c,"analyzer/active_user"),t)},getActivePercent:function(t){return a.a.post("".concat(o.c,"analyzer/active_percent"),t)},getLoginUser:function(t){return a.a.post("".concat(o.c,"analyzer/login_user"),t)}};Object.assign(c,{getUserAnalyzeData:function(t){var e=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},t,{province:"",city:""});return a.a.all([c.getOnlineUser(t),c.getRegisterUser(e),c.getActiveUser(t),c.getLoginUser(t)])}});var d=c,l={getMUserList:function(t){return a.a.post("".concat(o.c,"iotuser/muserlist"),t)},addMUser:function(t){return a.a.post("".concat(o.c,"iotuser/savemuser"),t)},deleteMUser:function(t){return a.a.post("".concat(o.c,"iotuser/delmuser"),{user_ids:t})}},f={CmDataList:function(t){return a.a.post(o.d.CmDataList,t).then((function(t){return t.data}))},CmDataAdd:function(t){return a.a.post(o.d.CmDataAdd,t).then((function(t){return t.data}))},CmDataEdit:function(t){return a.a.post(o.d.CmDataEdit,t).then((function(t){return t.data}))},CmDataDel:function(t){return a.a.post(o.d.CmDataDel,t).then((function(t){return t.data}))},ModuleList:function(t){return a.a.post(o.d.ModuleList,t).then((function(t){return t.data}))},input:function(t){return a.a.post(o.d.input,t).then((function(t){return t.data}))}},p={imgList:function(t){return a.a.post(o.g.imgList,t).then((function(t){return t.data}))},addImgs:function(t){return a.a.post(o.g.addImgs,t).then((function(t){return t.data}))},deleteImgs:function(t){return a.a.post(o.g.deleteImgs,t).then((function(t){return t.data}))},editImgs:function(t){return a.a.post(o.g.editImgs,t).then((function(t){return t.data}))},sortImgs:function(t){return a.a.post(o.g.sortImgs,t).then((function(t){return t.data}))}},g={searchUserList:function(t,e,n){var r=1<arguments.length&&void 0!==e?e:0,i=2<arguments.length&&void 0!==n?n:10;return a.a.post(o.h.userList,{phone_num:t,begin:r,size:i})},searchUserMsg:function(t){return a.a.post(o.h.searchUserMsg,t).then((function(t){return t.data.result}))},searchLogOut:function(t){return a.a.post(o.h.searchLogOut,t).then((function(t){return t.data.result}))},operaList:function(t){return a.a.post(o.h.operaList,t).then((function(t){return t.data.result}))},rootLogs:function(t){return a.a.post(o.h.rootLogs,t).then((function(t){return t.data.result}))},errLogs:function(t){return a.a.post(o.h.errLogs,t).then((function(t){return t.data.result}))},deviceLogs:function(t){return a.a.post(o.h.deviceLogs,t).then((function(t){return t.data.result}))},throughDatas:function(t){return a.a.post(o.l.throughDatas,t).then((function(t){return t.data.result}))},deviceTotals:function(t){return a.a.post(o.l.deviceTotal,t).then((function(t){return t.data.result}))},onlineLogs:function(t){return a.a.post(o.l.onlineLog,t).then((function(t){return t.data.result}))},logRegDatas:function(t){return a.a.post(o.l.logRegData,t).then((function(t){return t.data.result}))},qpsDatas:function(t){return a.a.post(o.l.qpsData,t).then((function(t){return t.data.result}))},getwarnDatas:function(t){return a.a.post(o.l.warnData,t).then((function(t){return t.data.result}))},getwarnDataList:function(t){return a.a.post(o.l.warnDataSearch,t).then((function(t){return t.data.result}))},routerList:function(t){return a.a.post(o.h.routerList,t).then((function(t){return t.data.result}))},cancelBindRouterList:function(t){return a.a.post(o.h.bindedlists,t).then((function(t){return t.data.result}))},cancelBind:function(t){return a.a.post(o.h.routerUnbind,t).then((function(t){return t.data.result}))},addRouter:function(t){return a.a.post(o.h.addRouter,t).then((function(t){return t.data.result}))},editRouter:function(t){return a.a.post(o.h.editRouter,t).then((function(t){return t.data}))},deleteRouter:function(t){return a.a.post(o.h.deleteRouter,t).then((function(t){return t.data}))},importRouter:function(t){return a.a.post(o.h.importRouter,t).then((function(t){return t.data.result}))},getFamilyList:function(t){return a.a.post(o.h.familyList,t).then((function(t){return t.data}))},getFamilyDeviceList:function(t){return a.a.post(o.h.familyDeviceList,t).then((function(t){return t.data}))},getDeviceDetail:function(t){return a.a.post(o.h.deviceDetail,t).then((function(t){return t.data}))},directdeviceList:function(t){return a.a.post(o.h.directdeviceList,t).then((function(t){return t.data.result}))},addDirectdevice:function(t){return a.a.post(o.h.addDirectdevice,t).then((function(t){return t.data.result}))},editDirectdevice:function(t){return a.a.post(o.h.editDirectdevice,t).then((function(t){return t.data}))},deleteDirectdevice:function(t){return a.a.post(o.h.deleteDirectdevice,t).then((function(t){return t.data}))},importDirectdevice:function(t){return a.a.post(o.h.importDirectdevice,t).then((function(t){return t.data.result}))}},m={strategyList:function(t){return a.a.post(o.k.strategyList,t).then((function(t){return t.data}))},StrategyAdd:function(t){return a.a.post(o.k.StrategyAdd,t).then((function(t){return t.data}))},StrategyEdit:function(t){return a.a.post(o.k.StrategyEdit,t).then((function(t){return t.data}))},StrategyDel:function(t){return a.a.post(o.k.StrategyDel,t).then((function(t){return t.data}))},StrategyUuidList:function(t){return a.a.post(o.k.StrategyUuidList,t).then((function(t){return t.data}))},StrategyUuidAdd:function(t){return a.a.post(o.k.StrategyUuidAdd,t).then((function(t){return t.data}))},StrategyUuidEdit:function(t){return a.a.post(o.k.StrategyUuidEdit,t).then((function(t){return t.data}))},StrategyUuidDel:function(t){return a.a.post(o.k.StrategyUuidDel,t).then((function(t){return t.data}))},StrategyConfiglists:function(t){return a.a.post(o.k.StrategyConfiglists,t).then((function(t){return t.data}))},StrategyConfigAdd:function(t){return a.a.post(o.k.StrategyConfigAdd,t).then((function(t){return t.data}))},StrategyConfigEdit:function(t){return a.a.post(o.k.StrategyConfigEdit,t).then((function(t){return t.data}))},StrategyConfigDel:function(t){return a.a.post(o.k.StrategyConfigDel,t).then((function(t){return t.data}))}},h=n("5aa7");function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}e.a=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},i,{},u.a,{},d,{},l,{},f,{},p,{},g,{},m,{},h.a)},9203:function(t,e,n){"use strict";var r=n("5d14");n.n(r).a},b64b:function(t,e,n){var r=n("23e7"),a=n("7b0b"),o=n("df75");r({target:"Object",stat:!0,forced:n("d039")((function(){o(1)}))},{keys:function(t){return o(a(t))}})},dbb4:function(t,e,n){var r=n("23e7"),a=n("83ab"),o=n("56ef"),i=n("fc6a"),u=n("06cf"),s=n("8418");r({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(t){for(var e,n,r=i(t),a=u.f,c=o(r),d={},l=0;c.length>l;)void 0!==(n=a(r,e=c[l++]))&&s(d,e,n);return d}})},e439:function(t,e,n){var r=n("23e7"),a=n("d039"),o=n("fc6a"),i=n("06cf").f,u=n("83ab"),s=a((function(){i(1)}));r({target:"Object",stat:!0,forced:!u||s,sham:!u},{getOwnPropertyDescriptor:function(t,e){return i(o(t),e)}})}}]);