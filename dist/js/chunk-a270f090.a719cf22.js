(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-a270f090"],{"335b":function(t,e,r){"use strict";var n=r("515b");r.n(n).a},"515b":function(t,e,r){},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,r){function n(t){return function(e){var r=String(a(e));return 1&t&&(r=r.replace(i,"")),2&t&&(r=r.replace(s,"")),r}}var a=r("1d80"),o="["+r("5899")+"]",i=RegExp("^"+o+o+"*"),s=RegExp(o+o+"*$");t.exports={start:n(1),end:n(2),trim:n(3)}},"5aa7":function(t,e,r){"use strict";r("a4d3"),r("4de4"),r("e439"),r("dbb4"),r("b64b"),r("159b");var n=r("ade3"),a=r("1e04"),o=r("46f1");function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function s(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var l="/api.php";e.a={agreementSave:function(t){return a.a.post(o.m.agreementSave,t).then((function(t){return t.data}))},agreementdel:function(t){return a.a.post(o.m.agreementdel,t).then((function(t){return t.data}))},pubilcCorsAction:function(t){return a.a.post(l,t).then((function(t){return t.data}))},getVersions:function(t){return t.method="list_versions",a.a.post(l,t).then((function(t){return t.data}))},getVersionsForSC:function(t){return t.method="list_versions_community",a.a.post(l,t).then((function(t){return t.data}))},selectVersion:function(t){return a.a.post(o.m.selectVersion,t).then((function(t){return t.data}))},pushUpdateAction:function(t){return a.a.post(o.m.pushUpdateAction,t).then((function(t){return t.data}))},getPushHistoryList:function(t){return a.a.post(o.m.getPushHistoryList,t).then((function(t){return t.data}))},getChoseList:function(t){return a.a.post(l,t).then((function(t){return t.data}))},getAgreementList:function(t){return a.a.post(o.m.agreementList,t).then((function(t){return t.data}))},getAppList:function(t){return a.a.post(l,s({method:"list_applications"},t))},getAppInfo:function(t){return a.a.post(l,s({method:"info_applications"},t))},delApp:function(t){return a.a.post(l,s({method:"del_applications"},t))},saveApp:function(t){return a.a.post(l,s({method:"save_applications"},t))},getAppVerList:function(t){return a.a.post(l,s({method:"list_versions_commom"},t))},getAppVerInfo:function(t){return a.a.post(l,s({method:"info_versions_commom"},t))},delAppVer:function(t){return a.a.post(l,s({method:"del_version_commom"},t))},saveAppVer:function(t){return a.a.post(l,s({method:"save_app_version_commom"},t))},setAppVerStatus:function(t){return a.a.post(l,s({method:"set_status_commom"},t))},setAppVerUuids:function(t){return a.a.post(l,s({method:"set_uuids_commom"},t))},getAppVerUuids:function(t){return a.a.post(l,s({method:"get_uuids_commom"},t))}}},"82b7":function(t,e,r){"use strict";var n=r("8606");r.n(n).a},8606:function(t,e,r){},a9e3:function(t,e,r){"use strict";function n(t){var e,r,n,a,o,i,s,l,u=f(t,!1);if("string"==typeof u&&2<u.length)if(43===(e=(u=g(u)).charCodeAt(0))||45===e){if(88===(r=u.charCodeAt(2))||120===r)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:n=2,a=49;break;case 79:case 111:n=8,a=55;break;default:return+u}for(i=(o=u.slice(2)).length,s=0;s<i;s++)if((l=o.charCodeAt(s))<48||a<l)return NaN;return parseInt(o,n)}return+u}var a=r("83ab"),o=r("da84"),i=r("94ca"),s=r("6eeb"),l=r("5135"),u=r("c6b6"),c=r("7156"),f=r("c04e"),p=r("d039"),d=r("7c73"),m=r("241c").f,b=r("06cf").f,h=r("9bf2").f,g=r("58a8").trim,v="Number",y=o[v],w=y.prototype,_=u(d(w))==v;if(i(v,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var O,P=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof P&&(_?p((function(){w.valueOf.call(r)})):u(r)!=v)?c(new y(n(e)),r,P):n(e)},j=a?m(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),A=0;j.length>A;A++)l(y,O=j[A])&&!l(P,O)&&h(P,O,b(y,O));(P.prototype=w).constructor=P,s(o,v,P)}},b64b:function(t,e,r){var n=r("23e7"),a=r("7b0b"),o=r("df75");n({target:"Object",stat:!0,forced:r("d039")((function(){o(1)}))},{keys:function(t){return o(a(t))}})},dbb4:function(t,e,r){var n=r("23e7"),a=r("83ab"),o=r("56ef"),i=r("fc6a"),s=r("06cf"),l=r("8418");n({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(t){for(var e,r,n=i(t),a=s.f,u=o(n),c={},f=0;u.length>f;)void 0!==(r=a(n,e=u[f++]))&&l(c,e,r);return c}})},e439:function(t,e,r){var n=r("23e7"),a=r("d039"),o=r("fc6a"),i=r("06cf").f,s=r("83ab"),l=a((function(){i(1)}));n({target:"Object",stat:!0,forced:!s||l,sham:!s},{getOwnPropertyDescriptor:function(t,e){return i(o(t),e)}})},e66e:function(t,e,r){"use strict";r.r(e),r("a4d3"),r("4de4"),r("a9e3"),r("e439"),r("dbb4"),r("b64b"),r("159b");var n=r("ade3");function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}var o={name:"List",props:{isBorder:{type:Boolean,default:!0},size:{type:String,default:""},showPagination:{type:Boolean,default:!1},tableWidth:{type:String,default:"100%"},tableData:{type:Array,default:function(){return[]}},total:{type:Number,default:0},tableItems:{type:Array,default:function(){return[]}},formData:{type:Object,default:function(){return{}}},requestFunc:{type:Function,default:null},paginationLeft:{type:String,default:"300px"}},data:function(){return{localForm:this.formData,currentPage:1,pageSize:10,localTotal:this.total,localTableData:this.tableData}},watch:{tableData:function(t){this.localTableData=t},total:function(t){this.localTotal=t}},mounted:function(){0<this.tableData.length&&this.requestFunc&&this.requestData(1)},methods:{requestData:function(t){var e=this,r=t||this.currentPage;this.currentPage=r;var o=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},this.localForm,{currentPage:this.currentPage,pageSize:this.pageSize});this.requestFunc(o).then((function(t){e.localTotal=t.data.total||0,e.localTableData=e.pickRows(t.data)}))},pickRows:function(t){if(t.rows&&t.rows instanceof Array)return t.rows;var e=[];for(var r in t)if(t[r]instanceof Array){e=t[r];break}return e},handleSizeChange:function(t){this.currentPage=1,this.pageSize=t,this.requestData()},handleCurrentChange:function(t){this.currentPage=t,this.requestData()}}},i=(r("82b7"),r("2877")),s=Object(i.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"table-list-view"},[r("el-table",{style:{width:t.tableWidth},attrs:{size:t.size,data:t.localTableData,border:t.isBorder}},[t._l(t.tableItems,(function(e,n){return[e.shouldCustom?t._e():r("el-table-column",{key:e.prop+n,attrs:{type:e.type,prop:e.prop,label:e.label,width:e.width,"show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(r){return[t._v(" "+t._s(t._f("format")(r.row[e.prop],e.label,e.options))+" ")]}}],null,!0)}),e.shouldCustom?r("el-table-column",{key:e.prop+n,attrs:{label:e.label,width:e.width},scopedSlots:t._u([{key:"default",fn:function(r){return[t._t(e.prop,null,{row:r.row})]}}],null,!0)}):t._e()]}))],2),t.showPagination?r("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,30,50],"page-size":t.pageSize,total:t.localTotal,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}):t._e()],1)}),[],!1,null,"3b469262",null).exports,l=r("5aa7"),u={name:"AddNewProtocal",props:{type:{type:String,default:"add"},info:{type:Object,default:function(){return{}}},dialogFormVisible:{type:Boolean,default:!1}},data:function(){return{formLabelWidth:"120px",form:Object.assign({name:"",url:"",remark:"",version:""},this.info),rules:{name:[{required:!0,message:"请输入协议名称",trigger:"blur"}],url:[{required:!0,message:"请输入协议链接",trigger:"blur"},{validator:function(t,e,r){/(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%$#_]*)?/.test(e)?r():r("请输入正确的url地址")},trigger:"blur"}]}}},watch:{info:function(t){this.form=Object.assign({},t)}},methods:{close:function(){this.$emit("update:dialogFormVisible",!1)},confirm:function(){var t=this;l.a.agreementSave(this.form).then((function(e){t.$emit("refreshData"),t.$message.success("".concat("add"===t.type?"新增":"更新","协议成功")),t.close()}))}}},c={name:"ProtocolManage",components:{List:s,addNewProtocal:Object(i.a)(u,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{attrs:{visible:t.dialogFormVisible,"before-close":t.close,title:"add"===t.type?"新增协议":"更新协议",center:""},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[r("el-form",{attrs:{rules:t.rules,model:t.form,"label-width":t.formLabelWidth}},[r("el-form-item",{attrs:{prop:"name",label:"协议名称:"}},[r("el-input",{attrs:{maxlength:50},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),r("el-form-item",{attrs:{prop:"url",label:"协议连接:"}},[r("el-input",{model:{value:t.form.url,callback:function(e){t.$set(t.form,"url",e)},expression:"form.url"}})],1),r("el-form-item",{attrs:{label:"备注:"}},[r("el-input",{attrs:{maxlength:50},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1),r("el-form-item",{attrs:{label:"版本号:"}},[t._v(" "+t._s(t.form.version)+" ")])],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:t.close}},[t._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:t.confirm}},[t._v("确 定 ")])],1)],1)}),[],!1,null,"4f3973f7",null).exports},data:function(){return{info:{},type:"add",recordVisible:!1,dialogFormVisible:!1,tableData:[],tableItems:[{label:"协议Id",prop:"id",width:"70"},{label:"协议名称",prop:"name",width:""},{label:"协议连接",prop:"url",width:"350"},{label:"备注",prop:"remark",width:""},{label:"版本号",prop:"version",width:"90"},{label:"更新时间",prop:"updated_at",width:"160"},{label:"操作",prop:"handle",width:"",shouldCustom:!0}]}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;l.a.getAgreementList().then((function(e){t.tableData=e.result.data}))},addProtocal:function(){this.type="add",this.info={},this.dialogFormVisible=!0},refresh:function(t){this.dialogFormVisible=!0,this.info=t,this.type="refresh"},deleteProtocal:function(t){var e=this;this.$confirm("确认删除此协议, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){l.a.agreementdel({id:t.id}).then((function(t){e.$message.success("删除成功"),e.getList()}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))}}},f=(r("335b"),Object(i.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"form-header"},[r("el-button",{attrs:{type:"primary"},on:{click:t.addProtocal}},[t._v("新增协议 ")])],1),r("List",{attrs:{"table-items":t.tableItems,"table-data":t.tableData},scopedSlots:t._u([{key:"handle",fn:function(e){return[r("el-button",{attrs:{type:"text"},on:{click:function(r){return t.refresh(e.row)}}},[t._v("更新 ")]),r("el-button",{attrs:{type:"text"},on:{click:function(r){return t.deleteProtocal(e.row)}}},[t._v("删除 ")])]}}])}),t.dialogFormVisible?r("add-new-protocal",{attrs:{type:t.type,info:t.info,"dialog-form-visible":t.dialogFormVisible},on:{"update:dialogFormVisible":function(e){t.dialogFormVisible=e},"update:dialog-form-visible":function(e){t.dialogFormVisible=e},refreshData:t.getList}}):t._e()],1)}),[],!1,null,"13241096",null));e.default=f.exports}}]);