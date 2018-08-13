<template>
	<div class="main_index">
		<div class="chooseFileButton">
			<span class="buttonText">上传文件</span>
			<input type="file" value=""  id="file" ref="fileGet" v-on:change="fileUpLoad">
		</div>	
		<div class="hidingPath">
			<div class="progressBar" v-if="showStatus">
				<span v-if="status ===0">切片进度:{{percent+"%"}} </span>
				<span v-else>上传进度:{{percent+"%"}} </span>
				<progress max=100 :value="percent" :data-file_file_md5="percent" ref="progress"></progress>
			</div>
			<div v-if="showAgainButton" class="submitButton" @click="submitFile" ref="submit">重新上传</div>
		</div>
		
	</div>
</template>
<script>
import SparkMD5 from 'spark-md5';
import axios from 'axios';
import * as URL from "~/assets/lib/api"; 
export default {
	props: {
		// actived: {
		// 	type: String,
		// 	default: null
		// }
	},
	data () {
		return {
			status:0,//进度条的状态，0表示正在切片，1表示正在上传
			percent:0,
			file_name:'',
			chunkSize:2097152,//单词上传的图片大小,2M
			chunksCount:0,//这个文件要上传的次数
			pices:[],
			picesMD5:[],
			shard_index_list:[],
			file_md5:'',//上传问价你的md5值
			dealCount:0,//上传次数
			picesCountNow:0,//目前待上传的包的数量
			success:false,
			showStatus:false,//是否展示进度
			showAgainButton:true,//是否展示重新提交按钮
		};
	},
	mounted () {
		// while(this.shard_index_list.length!==0){
		// 	console.log('没有上传结束')
		// 	this.shard_index_list.length.pop()
		// }
		//  Object.defineProperty()
	},
	watch:{

	},
	methods: {
		fileUpLoad:function(e){
			this.showStatus = true;
			let file = e.target.files[0];
			this.file_name = file.name;
			let fileSize = file.size,
				chunkSize = 2097152,
				currentChunk = 0, 
				that = this,
				 //文件分割方法（注意兼容性）
    			blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
			var chunksCount =Math.ceil(fileSize/this.chunkSize);
			this.chunksCount = chunksCount;
		
			//创建md5对象（基于SparkMD5）
    		let spark = new SparkMD5(), fileReader = new FileReader();
			 //每块文件读取完毕之后的处理
			fileReader.onload = function(e) {
				// console.log("event",e)
				console.log("读取文件", currentChunk + 1, "/", chunksCount);
				//每块交由sparkMD5进行计算
				spark.appendBinary(e.target.result);//总文件MD5的计算

				var spark1 = new SparkMD5();//单片文件md5的计算
				spark1.appendBinary(e.target.result); 
				that.picesMD5.push(spark1.end())

				currentChunk++;
				var percent = ((currentChunk/chunksCount)*100).toFixed(2);
				that.percent = percent;
				
				//如果文件处理完成计算MD5，如果还有分片继续处理
				if (currentChunk <chunksCount) {
					loadNext();
				} else {
					var md5string = spark.end();
					that.file_md5 = md5string;
					console.info("计算的Hash", md5string);
					console.log(9999999999,that.picesMD5)
					function uploadFileLine(){
						that.dealCount++;
						var successPackage = 0;//成功上传的包的计数
						if(that.dealCount<=3 && !that.success){
							that.getUnuploadShardList({
								total_size:fileSize,
								shard_size:chunkSize,
								file_md5:md5string
							}).then(function(data){
								console.log(111111,data)
								if(data.data.code === 0){
									let result = data.data.result;
									that.shard_index_list = result.shard_index_list;
									// that.resultAllData = result.shard_index_list.length;
									console.log(233333333333333,result.shard_index_list)
									if(result.shard_index_list && result.shard_index_list.length === 0){//说明这个文件已经上传过，
										console.log(11111111111111111111111111)
										return that.uploadIsSuccess({
											file_md5:that.file_md5
										}).then(function(result){
											console.log("ifsuccess",result)
											if(result.data.code === 0){
												alert("该文件已经上传过了！")
												that.success = true;
												that.status = 1;
												that.percent = 100;
												return;
											}else{
												console.log(111111,"uploadFileLine()")
												uploadFileLine();
											}
										}).catch(function(err){
											console.log("失败",err)
											uploadFileLine();
										})
									}else{
										console.log("else",22222222222222222222)
										return result.shard_index_list;
									}
								}
							},function(err){
								console.log('分片上传失败')
								alert("任务初始化失败，请重试");
							}).then(function(shard_index_list){
								console.log(111111110,shard_index_list)
								if(shard_index_list && shard_index_list.length!==0){
									var promiseAll = [];
									shard_index_list.forEach((item,index) => {
										console.log(index,item,that.picesMD5[item])
										var promise = new Promise((resolve,reject)=>{
											that.uploadShard({
												file_md5:that.file_md5,
												shard_index:item,
												shard_md5:that.picesMD5[item],
												file_name:that.file_name
											},that.pices[item]).then(function(data){
												console.log(item,that.picesMD5[item],data)
												if(data.data.code === 0){
													successPackage++;
													that.status = 1;
													that.percent = ((successPackage/that.shard_index_list.length)*100).toFixed(2);//上传成功百分比
													resolve(data)
												}
											}).catch(function(err){
												console.log(item+'上传失败22222')
												reject(err);
											})
										})
										promiseAll.push(promise)
										console.log("promiseall",promiseAll)
									});
									Promise.all(promiseAll).then(function(resultAllData){
										console.log("resultAllData",resultAllData)
										if(resultAllData){
											for(let i=0;i<resultAllData.length;i++){
												let itemCode = resultAllData[i].data.code;
												if(itemCode === 0 ){
													console.log(i+'成功了')
												}
											}
											if(successPackage === that.shard_index_list.length){
												console.log("所有待上传的包都上传成功了")
												that.uploadIsSuccess({
													file_md5:that.file_md5
												}).then(function(result){
													console.log("ifsuccess",result)
													if(result.data.code === 0){
														that.success = true;
														alert("全部分片已经上传成功了")
														return;
													}
												})
											}else{
												console.log("重新上传一次uploadFileLine()")
												uploadFileLine();
											}
										}
									})
								}else{
									console.log(99999999,"")
									return;
								}
							})
						}else if(that.success){
							console.log("已经上传成功")
							alert('文件已经上传成功!')
							return;
						}else{
							console.log("三次上传后仍然出错，需求重新上传")
							alert("文件上传出错，请重试")
							that.showAgainButton = true;
						}
					}
					uploadFileLine();
				}
			};
			//处理单片文件的上传
			function loadNext() {
				var start = currentChunk * chunkSize, 
					end = start + chunkSize >= file.size ? file.size : start + chunkSize;
					console.log(888,blobSlice.call(file, start, end))
					that.pices.push(blobSlice.call(file, start, end));
					
				fileReader.readAsBinaryString(blobSlice.call(file, start, end));
			}
      		loadNext();
		},
		getUnuploadShardList:function(params){//分片任务初始化接口
			return axios.post(URL.getUnuploadShardList, params);
		},
		uploadShard:function(query, blob){
			// var xhr = new XMLHttpRequest()
			// xhr.open('POST', URL.uploadShard + '?file_md5=' + query.file_md5 +"&shard_index="+ query.shard_index+'&shard_md5='+query.shard_md5, true);
            // xhr.send(blob);
			return axios.post(
				URL.uploadShard + '?file_md5=' + query.file_md5 +"&shard_index="+ query.shard_index+'&shard_md5='+query.shard_md5 + "&file_name=" + query.file_name, 
				blob 
			);
		},
		uploadIsSuccess:function(params){
			return axios.post(URL.uploadIsSuccess, params,{async:true});//同步上传
		},
		submitFile:function(){
			// alert(11111)
			console.log(this.$refs.fileGet,this.$refs.submit)
			console.log(6666,this.$refs.fileGet.currentValue)
			this.$refs.fileGet.value = '';
			// this.$refs.fileGet.change.call(this.$refs.fileGet,this.$refs.fileGet.currentValue)
			// this.$refs.submit.apply(this.$refs.fileGet,this.$refs.fileGet.currentValue)
			this.$refs.fileGet.click.call(this.$refs.fileGet,this.$refs.fileGet.$event)
			// this.$emit('change')
		}
	}
}
</script>
<style lang="less">
.submitButton{
	width:80px;
	height: 40px;
	line-height: 40px;
	border-radius:10px;
	background-color:#0c57a1;
	color:#fff;
	text-align: center;
	margin-top:10px;
	font-size:13px;
}
.hidingPath{
	width:35%;
	height: auto;
	padding:10px 20px 20px 20px;
	border:1px solid #999;
	border-radius:0 0 20px 20px;
}
.chooseFileButton{
	width:100px;
	height: 45px;
	color:#fff;
	margin:10px 20px;
	background-color: #a0cfff;
	border-radius:10px;
	text-align: center;
	line-height: 55px;
	position: relative;
	font-size:16px;
	.buttonText{
		display: block;
		width:100%;
		height: 100%;
		line-height: 45px;
	}
}
#file{
	display:block;
	width:100%;
	height: 100%;
	position: absolute;
	top:0;
	left:0;
	z-index:1;
	opacity: 0;
}
</style>