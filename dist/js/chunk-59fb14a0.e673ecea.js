(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-59fb14a0"],{"13a1":function(e,t,a){"use strict";a.r(t);var i={components:{},data:function(){return{list:[{id:"",ip:"127.0.0.1",hostname:"access_svr_01",cpu:"2C4G",user:"张三",expire:"2017-10-13",createTime:"2017-10-13",creater:"张三",type:"到期"}],filterOptions:[{checked:!0,label:"ip",name:"ip"},{checked:!0,label:"hostname",name:"hostname"},{checked:!0,label:"cpu/mem",name:"cpu"},{checked:!0,label:"使用人",name:"user"},{checked:!0,label:"到期时间",name:"expire"},{checked:!0,label:"创建时间",name:"createTime"},{checked:!0,label:"创建人",name:"creater"},{checked:!0,label:"类型",name:"type"}],importForm:{ip:"",hostname:"",cpu:"",user:"",expire:""},fileList:[],pathList:{first:[{id:1,name:"rwetr",isEdit:!1},{id:2,name:"adf",isEdit:!1}],second:[{id:1,name:"rwetwerqr",isEdit:!1},{id:2,name:"ad123f",isEdit:!1}],third:[{id:1,name:"rwe342tr",isEdit:!1},{id:2,name:"143",isEdit:!1}],fourth:[{id:1,name:"rwet1341r",isEdit:!1},{id:2,name:"14311432",isEdit:!1}]},activedTab:"single",pathTab:"first",importBoxFlag:!1,backyardFlag:!1,filterPopoverFlag:!1,service:"",serviceOptions:[{value:"1",lable:"选项一"}],searchKey:""}},mounted:function(){},methods:{handleRemove:function(){},handlePreview:function(){}}},l=(a("d1ea"),a("2877")),s=Object(l.a)(i,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-content facility-page"},[a("el-row",[a("el-col",[a("el-select",{attrs:{placeholder:"选择服务"},model:{value:e.service,callback:function(t){e.service=t},expression:"service"}},e._l(e.serviceOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),a("el-input",{staticClass:"searchInput",attrs:{type:"text",placeholder:"输入IP/hostname"},model:{value:e.searchKey,callback:function(t){e.searchKey=t},expression:"searchKey"}}),a("el-button",[e._v("查询")]),a("el-button-group",[a("a",{staticClass:"el-button el-button--default",attrs:{href:"#"}},[e._v("导出")]),a("el-button",{on:{click:function(t){e.importBoxFlag=!0}}},[e._v(" 录入 ")]),a("el-button",{on:{click:function(t){e.backyardFlag=!0}}},[e._v(" 后台配置 ")])],1)],1)],1),a("el-popover",{ref:"filterPopover",attrs:{width:"150",placement:"bottom-start"},model:{value:e.filterPopoverFlag,callback:function(t){e.filterPopoverFlag=t},expression:"filterPopoverFlag"}},[a("ul",{staticClass:"filterPopoverList"},e._l(e.filterOptions,(function(t,i){return a("li",{key:i},[a("el-checkbox",{model:{value:t.checked,callback:function(a){e.$set(t,"checked",a)},expression:"item.checked"}},[e._v(" "+e._s(t.label)+" ")])],1)})),0)]),a("p",{staticClass:"btitle"},[a("span",[e._v("设备列表")]),a("el-button",{directives:[{name:"popover",rawName:"v-popover:filterPopover",arg:"filterPopover"}],staticClass:"filterBtn",attrs:{type:"text"}},[e._v(" 列表显示字段选择 ")])],1),a("table",{staticClass:"el-table"},[a("thead",[a("tr",[a("th",{class:{cell:!0,dn:!e.filterOptions[0].checked}},[e._v(" ip ")]),a("th",{class:{cell:!0,dn:!e.filterOptions[1].checked}},[e._v(" hostname ")]),a("th",{class:{cell:!0,dn:!e.filterOptions[2].checked}},[e._v(" cpu/mem ")]),a("th",{class:{cell:!0,dn:!e.filterOptions[3].checked}},[e._v(" 使用人 ")]),a("th",{class:{cell:!0,dn:!e.filterOptions[4].checked}},[e._v(" 到期时间 ")]),a("th",{class:{cell:!0,dn:!e.filterOptions[5].checked}},[e._v(" 创建时间 ")]),a("th",{class:{cell:!0,dn:!e.filterOptions[6].checked}},[e._v(" 创建人 ")]),a("th",{class:{cell:!0,dn:!e.filterOptions[7].checked}},[e._v(" 类型 ")])])]),a("tbody",e._l(e.list,(function(t,i){return a("tr",{key:i},[a("td",{class:{cell:!0,dn:!e.filterOptions[0].checked}},[e._v(" "+e._s(t.ip)+" ")]),a("td",{class:{cell:!0,dn:!e.filterOptions[1].checked}},[e._v(" "+e._s(t.hostname)+" ")]),a("td",{class:{cell:!0,dn:!e.filterOptions[2].checked}},[e._v(" "+e._s(t.cpu)+" ")]),a("td",{class:{cell:!0,dn:!e.filterOptions[3].checked}},[e._v(" "+e._s(t.user)+" ")]),a("td",{class:{cell:!0,dn:!e.filterOptions[4].checked}},[e._v(" "+e._s(t.expire)+" ")]),a("td",{class:{cell:!0,dn:!e.filterOptions[5].checked}},[e._v(" "+e._s(t.createTime)+" ")]),a("td",{class:{cell:!0,dn:!e.filterOptions[6].checked}},[e._v(" "+e._s(t.creater)+" ")]),a("td",{class:{cell:!0,dn:!e.filterOptions[7].checked}},[e._v(" "+e._s(t.type)+" ")])])})),0)]),a("div",{staticClass:"page-line"},[a("el-pagination",{attrs:{total:50,small:"",layout:"prev, pager, next"}})],1),a("el-dialog",{attrs:{visible:e.importBoxFlag},on:{"update:visible":function(t){e.importBoxFlag=t}}},[a("el-tabs",{attrs:{type:"card"},model:{value:e.activedTab,callback:function(t){e.activedTab=t},expression:"activedTab"}},[a("el-tab-pane",{attrs:{label:"录入",name:"single"}},[a("el-form",{ref:"pushForm",attrs:{model:e.importForm,"label-width":"8em"}},[a("el-form-item",{attrs:{label:"ip"}},[a("el-input",{attrs:{type:"text"},model:{value:e.importForm.ip,callback:function(t){e.$set(e.importForm,"ip",t)},expression:"importForm.ip"}})],1),a("el-form-item",{attrs:{label:"hostname"}},[a("el-input",{attrs:{type:"text"},model:{value:e.importForm.hostname,callback:function(t){e.$set(e.importForm,"hostname",t)},expression:"importForm.hostname"}})],1),a("el-form-item",{attrs:{label:"cpu"}},[a("el-input",{attrs:{type:"text"},model:{value:e.importForm.cpu,callback:function(t){e.$set(e.importForm,"cpu",t)},expression:"importForm.cpu"}})],1),a("el-form-item",{attrs:{label:"使用人"}},[a("el-input",{attrs:{type:"text"},model:{value:e.importForm.user,callback:function(t){e.$set(e.importForm,"user",t)},expression:"importForm.user"}})],1),a("el-form-item",{attrs:{label:"到期时间"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.importForm.expire,callback:function(t){e.$set(e.importForm,"expire",t)},expression:"importForm.expire"}})],1)],1)],1),a("el-tab-pane",{attrs:{label:"批量录入",name:"batch"}},[a("div",{staticClass:"import-uploadArea"},[a("el-upload",{staticClass:"upload-demo",attrs:{"on-preview":e.handlePreview,"on-remove":e.handleRemove,"file-list":e.fileList,action:"https://jsonplaceholder.typicode.com/posts/"}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v(" 点击上传 ")])],1)],1)])],1),a("div",{staticClass:"dialog-buttonGroup"},[a("el-button",{attrs:{type:"primary"}},[e._v(" 确定添加 ")]),a("el-button",{on:{click:function(t){e.importBoxFlag=!1}}},[e._v(" 取消 ")])],1)],1),a("el-dialog",{attrs:{visible:e.backyardFlag},on:{"update:visible":function(t){e.backyardFlag=t}}},[a("div",{staticClass:"backyardContent"},[a("el-tabs",{attrs:{type:"card"},model:{value:e.pathTab,callback:function(t){e.pathTab=t},expression:"pathTab"}},[a("el-tab-pane",{attrs:{label:"目录一",name:"first"}},[a("ul",[e._l(e.pathList.first,(function(t,i){return a("li",{key:i},[a("span",[a("i",{staticClass:"el-icon-document"}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"item.name"}],attrs:{disabled:!t.isEdit,type:"text"},domProps:{value:t.name},on:{input:function(a){a.target.composing||e.$set(t,"name",a.target.value)}}})]),a("el-button",{attrs:{type:"text"},on:{click:function(e){t.isEdit=!t.isEdit}}},[e._v(" 编辑 ")])],1)})),a("li",[a("el-button",{attrs:{type:"text"},on:{click:function(t){return e.pathList.first.push({id:"",name:"",isEdit:!0})}}},[e._v(" + 添加新项 ")])],1)],2)]),a("el-tab-pane",{attrs:{label:"目录二",name:"second"}},[a("ul",[e._l(e.pathList.second,(function(t,i){return a("li",{key:i},[a("span",[a("i",{staticClass:"el-icon-document"}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"item.name"}],attrs:{disabled:!t.isEdit,type:"text"},domProps:{value:t.name},on:{input:function(a){a.target.composing||e.$set(t,"name",a.target.value)}}})]),a("el-button",{attrs:{type:"text"},on:{click:function(e){t.isEdit=!t.isEdit}}},[e._v(" 编辑 ")])],1)})),a("li",[a("el-button",{attrs:{type:"text"},on:{click:function(t){return e.pathList.second.push({id:"",name:"",isEdit:!0})}}},[e._v(" + 添加新项 ")])],1)],2)]),a("el-tab-pane",{attrs:{label:"目录三",name:"third"}},[a("ul",[e._l(e.pathList.third,(function(t,i){return a("li",{key:i},[a("span",[a("i",{staticClass:"el-icon-document"}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"item.name"}],attrs:{disabled:!t.isEdit,type:"text"},domProps:{value:t.name},on:{input:function(a){a.target.composing||e.$set(t,"name",a.target.value)}}})]),a("el-button",{attrs:{type:"text"},on:{click:function(e){t.isEdit=!t.isEdit}}},[e._v(" 编辑 ")])],1)})),a("li",[a("el-button",{attrs:{type:"text"},on:{click:function(t){return e.pathList.third.push({id:"",name:"",isEdit:!0})}}},[e._v(" + 添加新项 ")])],1)],2)]),a("el-tab-pane",{attrs:{label:"目录四",name:"fourth"}},[a("ul",[e._l(e.pathList.fourth,(function(t,i){return a("li",{key:i},[a("span",[a("i",{staticClass:"el-icon-document"}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"item.name"}],attrs:{disabled:!t.isEdit,type:"text"},domProps:{value:t.name},on:{input:function(a){a.target.composing||e.$set(t,"name",a.target.value)}}})]),a("el-button",{attrs:{type:"text"},on:{click:function(e){t.isEdit=!t.isEdit}}},[e._v(" 编辑 ")])],1)})),a("li",[a("el-button",{attrs:{type:"text"},on:{click:function(t){return e.fourth.first.push({id:"",name:"",isEdit:!0})}}},[e._v(" + 添加新项 ")])],1)],2)])],1)],1),a("div",{staticClass:"dialog-buttonGroup",attrs:{visible:e.importBoxFlag},on:{"update:visible":function(t){e.importBoxFlag=t}}},[a("el-button",{attrs:{type:"primary"}},[e._v(" 确定添加 ")]),a("el-button",{on:{click:function(t){e.backyardFlag=!1}}},[e._v(" 取消 ")])],1)])],1)}),[],!1,null,null,null);t.default=s.exports},"13ee":function(e,t,a){},d1ea:function(e,t,a){"use strict";var i=a("13ee");a.n(i).a}}]);