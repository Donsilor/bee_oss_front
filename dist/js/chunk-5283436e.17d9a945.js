(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5283436e"],{"0148":function(t,e,a){t.exports=a.p+"img/device.7988bc64.png"},"46d4":function(t,e,a){},7005:function(t,e,a){"use strict";a.r(e),a("a4d3"),a("4de4"),a("e439"),a("dbb4"),a("b64b"),a("159b");var n=a("ade3"),r=a("1e04"),i=a("46f1"),s=a("2f62");function o(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}var c={components:{},data:function(){return{unRead:!1,unReply:!1,date:[],searchKey:"",queryOption:{},tableData:[],pageSize:20,total:null,currentPage:1,unReadTotal:null,unReplyTotal:null}},computed:function(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?o(Object(a),!0).forEach((function(e){Object(n.a)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}({},Object(s.c)("feedback",["queryOptionStorage","needQueryOptionStorage"])),watch:{},created:function(){this.needQueryOptionStorage?(this.queryOption=this.queryOptionStorage,this.currentPage=this.queryOption.page,this.searchKey=this.queryOption.keyword,this.unRead=Boolean(this.queryOption.is_read),this.date[0]=this.queryOption.start_time?new Date(1e3*this.queryOption.start_time):"",this.date[1]=this.queryOption.end_time?new Date(1e3*this.queryOption.end_time):"",this.$store.dispatch("feedback/setNeedQueryOptionStorage",!1)):this.queryOption={page:this.currentPage,limit:this.pageSize,keyword:"",is_read:"",has_reply:0,start_time:"",end_time:""},this.getFeedbackList()},methods:{goDetail:function(t){var e=this;this.$store.dispatch("feedback/setQueryOptionStorage",this.queryOption).then((function(){e.$router.push({name:"feedbackDetail",params:{id:t}})}))},search:function(){this.queryOption.keyword=this.searchKey,this.queryOption.page=1,this.currentPage=1,this.getFeedbackList()},seeUnRead:function(){this.queryOption.is_read=this.unRead?1:0,this.queryOption.page=1,this.currentPage=1,this.getFeedbackList()},seeUnReply:function(){this.queryOption.has_reply=this.unReply?1:0,this.queryOption.page=1,this.currentPage=1,this.getFeedbackList()},changeDate:function(){var t=this.date&&this.date[0]?this.date[0].getTime()/1e3:"",e=this.date&&this.date[1]?this.date[1].getTime():"",a=new Date(this.getDateTime(e)+" 23:59:59").getTime()/1e3;this.queryOption.start_time=t,this.queryOption.end_time=a,this.queryOption.page=1,this.currentPage=1,this.getFeedbackList()},getDateTime:function(t,e){if(t){var a=new Date(+t),n=a.getFullYear(),r=a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1,i=a.getDate()<10?"0"+a.getDate():a.getDate(),s=a.getHours()<10?"0"+a.getHours():a.getHours(),o=a.getMinutes()<10?"0"+a.getMinutes():a.getMinutes(),c=a.getSeconds()<10?"0"+a.getSeconds():a.getSeconds();return"fulltime"===e?n+"-"+r+"-"+i+" "+s+":"+o+":"+c:n+"-"+r+"-"+i}},handleCurrentChange:function(t){this.queryOption.page=t,this.currentPage=t,this.getFeedbackList()},getFeedbackList:function(){var t=this;r.a.post(i.q,this.queryOption).then((function(e){var a=e.data.result;t.total=a.total,t.unReadTotal=a.un_read_total||0,t.unReplyTotal=a.un_reply_total||0,t.tableData=a.data}))},updateStatus:function(t){return r.a.post(i.s,{id:t})}}},u=(a("c2fc"),a("2877")),l=Object(u.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-content config-page",staticStyle:{height:"600px"}},[n("div",[n("el-row",{staticStyle:{"line-height":"36px"}},[n("el-col",{attrs:{span:3}},[n("el-checkbox",{on:{change:t.seeUnRead},model:{value:t.unRead,callback:function(e){t.unRead=e},expression:"unRead"}},[t._v(" 只看未读 ")])],1),n("el-col",{attrs:{span:3}},[n("el-checkbox",{on:{change:t.seeUnReply},model:{value:t.unReply,callback:function(e){t.unReply=e},expression:"unReply"}},[t._v(" 只看待回复 ")])],1),n("el-col",{attrs:{span:12}},[n("span",[t._v("日期：")]),n("el-date-picker",{attrs:{type:"daterange",placeholder:"请选择日期范围"},on:{change:t.changeDate},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),n("el-col",{attrs:{span:6}},[n("el-input",{attrs:{"on-icon-click":t.search,placeholder:"搜索关键字",icon:"search"},on:{change:t.search},model:{value:t.searchKey,callback:function(e){t.searchKey=e},expression:"searchKey"}})],1)],1)],1),n("div",{staticStyle:{margin:"20px 0"}},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"show-header":!1}},[n("el-table-column",{attrs:{width:"80"},scopedSlots:t._u([{key:"default",fn:function(t){return[t.row.img_list?n("img",{staticClass:"avatar",attrs:{src:t.row.img_list.split(",")[0],alt:""}}):n("img",{staticClass:"avatar",attrs:{src:a("0148"),alt:""}})]}}])}),n("el-table-column",{scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{staticClass:"summary point",class:{unRead:0===e.row.is_read},on:{click:function(a){return t.goDetail(e.row.id)}}},[t._v(t._s(e.row.content))])]}}])}),n("el-table-column",{attrs:{width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{staticStyle:{"margin-right":"15px"}},[t._v(t._s(1===e.row.has_reply?"已回复":"待回复"))])]}}])}),n("el-table-column",{attrs:{width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{staticStyle:{"margin-right":"15px"}},[t._v(t._s(e.row.os_type))]),n("span",[t._v(t._s(e.row.app_version))])]}}])}),n("el-table-column",{attrs:{width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("ul",[n("li",[t._v(t._s(e.row.terminal_type))]),n("li",[t._v(t._s(e.row.client_version))])])]}}])}),n("el-table-column",{attrs:{"show-overflow-tooltip":!0,width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("ul",[n("li",[t._v("用户名")]),n("li",[t._v(t._s(e.row.uname))])])]}}])}),n("el-table-column",{attrs:{width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.created_at))])]}}])})],1)],1),n("div",{staticClass:"page-container"},[t.unReply?t._e():n("span",{staticClass:"info gray"},[t._v("共"+t._s(t.total)+"条记录，其中"+t._s(t.unReadTotal)+"条未读")]),t.unReply?n("span",{staticClass:"info gray"},[t._v("共"+t._s(t.total)+"条记录，其中"+t._s(t.unReadTotal)+"条未读， "+t._s(t.unReplyTotal)+"条待回复")]):t._e(),n("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pageSize,total:t.total,layout:"prev, pager, next, jumper"},on:{"current-change":t.handleCurrentChange}})],1)])}),[],!1,null,"230d14da",null);e.default=l.exports},b64b:function(t,e,a){var n=a("23e7"),r=a("7b0b"),i=a("df75");n({target:"Object",stat:!0,forced:a("d039")((function(){i(1)}))},{keys:function(t){return i(r(t))}})},c2fc:function(t,e,a){"use strict";var n=a("46d4");a.n(n).a},dbb4:function(t,e,a){var n=a("23e7"),r=a("83ab"),i=a("56ef"),s=a("fc6a"),o=a("06cf"),c=a("8418");n({target:"Object",stat:!0,sham:!r},{getOwnPropertyDescriptors:function(t){for(var e,a,n=s(t),r=o.f,u=i(n),l={},p=0;u.length>p;)void 0!==(a=r(n,e=u[p++]))&&c(l,e,a);return l}})},e439:function(t,e,a){var n=a("23e7"),r=a("d039"),i=a("fc6a"),s=a("06cf").f,o=a("83ab"),c=r((function(){s(1)}));n({target:"Object",stat:!0,forced:!o||c,sham:!o},{getOwnPropertyDescriptor:function(t,e){return s(i(t),e)}})}}]);