(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-65020aa5"],{"0997":function(t,e,a){},"390d":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-content config-page"},[a("el-row",[a("el-col",{staticClass:"col-280"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"data-list"},[a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:16}},[a("span",[t._v(t._s(t.equipmentAnalyzer.text))])])],1),a("div",[t._v(t._s(t.equipmentAnalyzer.totalCount))]),a("div",[t._v("截止到 "+t._s(t.equipmentAnalyzer.lastDate))])],1)])],1),a("el-col",{staticClass:"col-280"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"data-list"},[a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:16}},[a("span",[t._v(t._s(t.homeAnalyzer.text))])])],1),a("div",[t._v(t._s(t.homeAnalyzer.totalCount))]),a("div",[t._v("截止到 "+t._s(t.homeAnalyzer.lastDate))])],1)])],1),a("el-col",{staticClass:"col-280"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"data-list"},[a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:16}},[a("span",[t._v(t._s(t.familyAnalyzer.text))])])],1),a("div",[t._v(t._s(t.familyAnalyzer.totalCount))]),a("div",[t._v("截止到 "+t._s(t.familyAnalyzer.lastDate))])],1)])],1)],1),a("div",{staticClass:"network-equipment"},[a("el-card",{attrs:{shadow:"hover"}},[a("el-row",[a("el-col",{staticClass:"datePicker",attrs:{span:24}},[a("el-date-picker",{attrs:{"picker-options":t.pickerOptions,type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.dateRange,callback:function(e){t.dateRange=e},expression:"dateRange"}})],1)],1),a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:12}},[a("simple-chart",{staticStyle:{height:"400px",width:"100%"},attrs:{id:"chart1",result:t.allEquipmentNum,title:"累计入网设备数（单位:个）",rotate:"45"}})],1),a("el-col",{attrs:{span:12}},[a("mix-bar-chart",{staticStyle:{height:"400px",width:"100%"},attrs:{id:"chart2",result:t.newAddEquipmentNum}})],1)],1)],1)],1)],1)},s=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:t.className,style:{height:t.height,width:t.width},attrs:{id:t.id}})},l=[],r=(a("99af"),a("159b"),a("313e")),o=a.n(r),c={props:{className:{type:String,default:"chart"},result:{type:Object,default:function(){return{}}},width:{type:String,default:"100%"},id:{type:String,default:"chart"},height:{type:String,default:"300px"}},data:function(){return{chart:null,xAxisData:[],legendData:[],seriesData:[{name:"",type:"bar",stack:"vistors",barWidth:"13%",data:[]}]}},watch:{result:function(){var t=this,e={};function a(t){return t.reduce((function(t,e){return t+e}))}for(var i in this.xAxisData=[],this.legendData=[],this.seriesData=[{name:"",type:"bar",stack:"vistors",barWidth:"13%",data:[]}],this.result)this.xAxisData.push(i),this.result[i].forEach((function(t,a){e[t.F_category_id_map]?e[t.F_category_id_map].push(t.F_cnt):(e[t.F_category_id_map]=[],e[t.F_category_id_map].push(t.F_cnt))}));for(var s in e){var n=a(e[s]),l="".concat(s,"(").concat(n,")");n>0&&(this.legendData.push(l),this.seriesData.push({name:l,type:"bar",stack:"vistors",barWidth:"13%",data:e[s]}))}this.chart.dispose(),this.$nextTick((function(){t.initChart()}))}},mounted:function(){this.initChart()},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{initChart:function(){this.chart=o.a.init(document.getElementById(this.id)),this.chart.setOption({title:{text:"新增入网设备数（单位:个）",textStyle:{fontWeight:"bolder",fontSize:14,color:"#666666"},left:"1%"},tooltip:{trigger:"axis",axisPointer:{type:"line"}},legend:{bottom:0,icon:"rect",itemWidth:14,itemHeight:5,itemGap:13,data:this.legendData,left:"4%",textStyle:{fontSize:12}},grid:{top:50,left:"2%",right:"2%",align:"left",containLabel:!0},xAxis:[{type:"category",data:this.xAxisData,axisTick:{alignWithLabel:!0},axisLine:{lineStyle:{color:"#CCCCCC"}},axisLabel:{textStyle:{color:"#5D5D5D"}}}],yAxis:[{type:"value",axisTick:{show:!1},axisLine:{lineStyle:{color:"#CCCCCC"},show:!1},axisLabel:{textStyle:{color:"#5D5D5D"}},splitLine:{show:!0,lineStyle:{type:"dashed"}}}],series:this.seriesData})}}},h=c,u=a("2877"),d=Object(u["a"])(h,n,l,!1,null,null,null),m=d.exports,p=a("47e9"),y=a("bc3a"),f=a.n(y),g=a("46f1"),x={components:{SimpleChart:p["a"],MixBarChart:m},data:function(){return{pickerOptions:{shortcuts:[{text:"昨天",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-864e5),t.$emit("pick",[a,e])}},{text:"最近7天",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近30天",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}}]},value7:"",equipmentAnalyzer:{totalCount:0,lastDate:null,text:"累计入网设备数"},homeAnalyzer:{totalCount:0,lastDate:null,text:"累计家居用户数"},familyAnalyzer:{totalCount:0,lastDate:null,text:"累计入网家庭数"},formdata:{date:""},dateRange:"",equipment:"0",room:"0",roomOptions:[],equipmentOptions:[],allEquipmentNum:[],newAddEquipmentNum:{},allRoomEquipmentNum:[]}},watch:{dateRange:function(t){console.log(8989,t);var e={"new_cat:start_time":t[0].Format("yyyy-MM-dd"),"new_cat:end_time":t[1].Format("yyyy-MM-dd")};this.getAccessStatistics(e)}},mounted:function(){var t=new Date,e=new Date;t.setTime(t.getTime()-864e5),e.setTime(e.getTime()-2592e6),this.formdata.date=[e,t],this.equipmentAnalyzer.lastDate=this.formatDate(this.formdata.date[1]),this.homeAnalyzer.lastDate=this.formatDate(this.formdata.date[1]),this.familyAnalyzer.lastDate=this.formatDate(this.formdata.date[1]),this.getAccessStatistics()},methods:{getAccessStatistics:function(t){var e=this;f.a.post(g["a"],t).then((function(t){if(200===t.data.code){var a=t.data.result.data;console.log(a,"res"),e.equipmentAnalyzer.totalCount=a.summary.F_device,e.homeAnalyzer.totalCount=a.summary.F_family_member,e.familyAnalyzer.totalCount=a.summary.F_family,e.allEquipmentNum=a.all_cat,e.newAddEquipmentNum=a.new_cat,e.allRoomEquipmentNum=a.all_room}}))},formatDate:function(t){var e=function(t){return t+="",1===t.length?"0"+t:t};return t?t.getFullYear()+"-"+e(t.getMonth()+1)+"-"+e(t.getDate()):""}}},C=x,D=(a("5066"),Object(u["a"])(C,i,s,!1,null,"9ac0b87e",null));e["default"]=D.exports},"47e9":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:t.className,style:{height:t.height,width:t.width},attrs:{id:t.id,title:t.title,barColor:t.barColor,rotate:t.rotate}})},s=[],n=a("313e"),l=a.n(n),r={props:{className:{type:String,default:"chart"},title:{type:String,default:""},barColor:{type:String,default:"#3AA0FF"},rotate:{type:String,default:"0"},result:{type:Array,default:function(){return[]}},width:{type:String,default:"100%"},id:{type:String,default:"chart"},height:{type:String,default:"300px"}},data:function(){return{chart:null,xAxisData:[],seriesData:[]}},watch:{result:function(){this.xAxisData=[],this.seriesData=[];for(var t=0;t<this.result.length;t++)this.xAxisData.push(this.result[t].F_category_id_map),this.seriesData.push(this.result[t].count);this.initChart()}},mounted:function(){},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{initChart:function(){this.chart=l.a.init(document.getElementById(this.id)),this.chart.setOption({title:{text:this.title,textStyle:{fontWeight:"bolder",fontSize:14,color:"#666666"},left:"1%"},tooltip:{trigger:"axis",axisPointer:{type:"line"}},grid:{top:50,left:"2%",right:"2%",bottom:"2%",containLabel:!0},xAxis:[{type:"category",data:this.xAxisData,axisTick:{alignWithLabel:!0},axisLine:{lineStyle:{color:"#CCCCCC"}},axisLabel:{interval:0,nameLocation:"center",rotate:this.rotate,textStyle:{color:"#5D5D5D"}}}],yAxis:[{type:"value",axisTick:{show:!1},axisLine:{lineStyle:{color:"#CCCCCC"},show:!1},axisLabel:{textStyle:{color:"#5D5D5D"}},splitLine:{show:!0,lineStyle:{type:"dashed"}}}],series:[{type:"bar",stack:"vistors",barWidth:"30%",itemStyle:{normal:{color:this.barColor}},data:this.seriesData}]})}}},o=r,c=a("2877"),h=Object(c["a"])(o,i,s,!1,null,null,null);e["a"]=h.exports},5066:function(t,e,a){"use strict";var i=a("0997"),s=a.n(i);s.a}}]);
//# sourceMappingURL=chunk-65020aa5.214f027b.js.map