(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-200821be"],{"8a8f":function(t,e,i){},afa6:function(t,e,i){"use strict";i.r(e),i("a4d3"),i("4de4"),i("e439"),i("dbb4"),i("b64b"),i("159b");var r=i("ade3"),s=i("b0b0"),a=i("2f62"),n=(i("f1ed"),i("cabf")),o=i("9008"),p=i("0786"),l=i("b333"),u=i("a772"),c=i("6cd5"),b=i("3589"),h=i("8e44");function f(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,r)}return i}function d(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?f(Object(i),!0).forEach((function(e){Object(r.a)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):f(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var g=d({components:{"version-input":o.a,"push-update":p.a,version_detail:l.a,operate_log:u.a,"filter-form":c.a,"version-mapping":b.a},filters:{typeToString:function(t){return 1*t==1?"APP":1*t==2?"路由器":1*t==3?"子设备":"未知"},forceToString:function(t){return t?"是":"否"},statusToString:function(t){return t?"启用":"停用"}},data:function(){return{firstTableShow:!0,info:{},totalItem:0,currentPage:1,filterTypeOptions:[{value:2,label:"路由器"},{value:3,label:"子设备"}],listParams:{method:"list_versions",page:1,limit:10,level:1},versionsFirst:{},versionList:{},inputType:"",rulesDetail:{},suportDevice:[],pushHistoryList:{},pushDataObj:{},secondTitle:"",currentDataObj:{},currentDetailObj:{},operateLogLayer:!1,operateLogList:{},addEditFlag:!0,editDataObj:{},releasedFlag:!1,mappingData:{},router:[],os_type:"",routerPidList:[],os_type_text:{1:"android_app",4:"ios_app",6:"android_pad",13:"lua_app"},device_type_text:{2:"路由器",3:"子设备",5:"H5",7:"android_system",11:"route_app",12:"video_app",13:"旗舰版音箱"},getGrayStatus:{0:"无",1:"白名单",2:"黑名单",3:"全量"},activeName:"devices",tableCopyTableList:{},index:1,size:10}}},Object(a.b)(["getVersions","selectVersion","importSubmitAction","pushUpdateAction","getVersionDetailAction","pubilcCorsAction"]),{computed:d({},Object(a.c)({brand:s.c,type:s.t,product:s.o})),mounted:function(){this.$store.dispatch({type:s.l}),this.getVersionList(1)},methods:{handleSizeChange:function(t){this.size=t,this.versionsFirst.tableData=this.paging(t,this.index)},handleCurrentChange:function(t){this.index=t,this.versionsFirst.tableData=this.paging(this.size,t)},paging:function(t,e){var i=JSON.parse(JSON.stringify(this.tableCopyTableList)),r=[];return i.forEach((function(i,s){t*(e-1)<=s&&s<=t*e-1&&r.push(i)})),r},formatTime:function(t){return t||"------"},pageChange:function(){this.getVersionList(this.currentPage)},getVersionList:function(t){this.listParams.page=t,this.versionsFirst=Object.assign({},n),this.tableCopyTableList=JSON.parse(JSON.stringify(this.versionsFirst.tableData)),this.versionsFirst.tableData=this.paging(this.size,this.index);var e=this;h.a.getVersions(e.listParams).then((function(t){0===t.code&&(e.firstTableShow=!0,e.$nextTick((function(){var i=t.result;e.versionsFirst.tableData&&e.versionsFirst.tableData.length||e.setFirstVersionList(i)})))}))},setFirstVersionList:function(t){this.versionsFirst.tableData=[];var e={router:2,h5:5,device:3};for(var i in t)if("android"===i||"android_pad"===i||"ios"===i||"video_app"===i||"route_app"===i||"lua_app"===i)this.versionsFirst.tableData.push(t[i]);else if("{}"===JSON.stringify(t[i]))this.versionsFirst.tableData.push({type:e[i]});else{for(var r in t[i])this.versionsFirst.tableData.push(t[i][r]);if("router"===i)for(var s in this.routerPidList=[],t[i])this.routerPidList.push({label:s,value:s})}this.tableCopyTableList=JSON.parse(JSON.stringify(this.versionsFirst.tableData)),this.versionsFirst.tableData=this.paging(this.size,this.index)},getTypeText:function(t,e){return 1===t?e:this.device_type_text[t]},getStatusTextPush:function(t){var e="";switch(t){case 1:e="成功";break;case 0:e="失败"}return e},getStatusText:function(t){var e="";switch(t){case 1:e="有效";break;case 0:e="无效"}return e},getForceText:function(t){var e="";switch(t){case 3:e="不弹窗升级";break;case 1:e="强制升级";break;case 0:e="不强制"}return e},getPreReleaseText:function(t){var e="";switch(t){case 1:e="灰度版本";break;case 0:e="正式版本"}return e},gotoHistoryList:function(t){sessionStorage.setItem("CurrentAppInfo",JSON.stringify(t)),this.$router.push({path:"/main/versionManager/".concat(t.id)})},getPidName:function(t){return 3===t.type||8===t.type||5===t.type?t.product_id?"--"+t.product_id:"":2===t.type||7===t.type?t.router_pid?"--"+t.router_pid:"":13===t.type?"--lua_app":""}}}),v=(i("eb6be"),i("2877")),y=Object(v.a)(g,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-content config-page"},[i("el-table",{directives:[{name:"show",rawName:"v-show",value:t.firstTableShow,expression:"firstTableShow"}],staticStyle:{width:"100%"},attrs:{data:t.versionsFirst.tableData}},[t._l(t.versionsFirst.tableColumn,(function(e){return i("el-table-column",{key:e.prop,attrs:{prop:e.prop,label:e.label,width:"auto"},scopedSlots:t._u([{key:"default",fn:function(r){return["type"===e.prop?i("div",[t._v(" "+t._s(t.getTypeText(r.row.type,r.row.os_type)+t.getPidName(r.row))+" ")]):"status"===e.prop?i("div",[t._v(" "+t._s(t.getStatusText(r.row.status))+" ")]):"force"===e.prop?i("div",[t._v(" "+t._s(t.getForceText(r.row.force))+" ")]):"release_time"===e.prop?i("div",[t._v(" "+t._s(t.formatTime(r.row.release_time))+" ")]):i("div",[t._v(" "+t._s(r.row[e.prop])+" ")])]}}],null,!0)})})),i("el-table-column",{attrs:{width:"180",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"text",size:"small"},on:{click:function(i){return t.gotoHistoryList(e.row,1)}}},[t._v(" 查看版本列表 ")])]}}])})],2),i("el-pagination",{staticStyle:{float:"right"},attrs:{"current-page":t.index,"page-size":t.size,total:t.tableCopyTableList.length,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)}),[],!1,null,null,null);e.default=y.exports},cabf:function(t){t.exports=JSON.parse('{"tableColumn":[{"prop":"type","label":"产品类型"},{"prop":"version","label":"版本号"},{"prop":"title","label":"版本Title"},{"prop":"release_time","label":"发布时间"},{"prop":"force","label":"是否强制升级"}],"tableData":[]}')},eb6be:function(t,e,i){"use strict";var r=i("8a8f");i.n(r).a}}]);