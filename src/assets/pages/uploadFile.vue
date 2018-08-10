<template>
	<div class="main_index">
		<input type="file" value=""  id="file"  @change="fileUpLoad">
		<div class="progressBar">
			<span v-if="status ===0">切片进度: </span>
			<span v-else>上传进度: </span>
			<progress max=1 :value="progressPercent"></progress>
		</div>
		<div class="submitButton" @click="submitFile">提交文件</div>
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
			progressPercent:0,
			file_name:'',
			chunkSize:2097152,//单词上传的图片大小,
			chunksCount:0,//这个文件要上传的次数
			pices:[],
			picesMD5:[],
			shard_index_list:[],
			file_mds:'',//上传问价你的md5值
		};
	},
	mounted () {
		// while(this.shard_index_list.length!==0){
		// 	console.log('没有上传结束')
		// 	this.shard_index_list.length.pop()
		// }
	},
	watch:{
		shard_index_list(val,oldVal){
			console.log(9999999999,val,oldVal)
		},
		shard_index_list:{//深度监听，可监听到对象、数组的变化
			handler(val, oldVal){
				console.log('val',val);//但是这两个值打印出来却都是一样的
				// var arr = val.split(',');
				console.log(val.length)
				if(val.length!==0){
					let that = this;
					this.shard_index_list.forEach((item,index) => {
						console.log(index,item)
						console.log(item,that.picesMD5[item])
						that.uploadShard({
							file_md5:that.file_md5,
							shard_index:item,
							shard_md5:that.picesMD5[item],
							file_name:that.file_name
						},that.pices[item]).then(function(data){
							console.log(item,that.picesMD5[item])
							console.log("datashard_index_list",that.shard_index_list)
						}).catch(function(err){
							alert("上传出错了");
						})
					});
				}
			},
			deep:true
		}
	},
	methods: {
		fileUpLoad:function(e){
			let file = e.target.files[0];
			this.file_name = file.name;
			let fileSize = file.size,
				chunkSize = 2097152,
				currentChunk = 0, 
				that = this,
				 //文件分割方法（注意兼容性）
    			blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
			var chunksCount =Math.ceil(fileSize/this.chunkSize);
		
			//创建md5对象（基于SparkMD5）
    		let spark = new SparkMD5(), fileReader = new FileReader();
			
			 //每块文件读取完毕之后的处理
			fileReader.onload = function(e) {
				// console.log("event",e)
				console.log("读取文件", currentChunk + 1, "/", chunksCount);
				//每块交由sparkMD5进行计算
				spark.appendBinary(e.target.result);

				var spark1 = new SparkMD5()
				spark1.appendBinary(e.target.result); 
				// console.log(22222,hexHash)   
				that.picesMD5.push(spark1.end())
				
				// console.log(99,e.target.result)//二进制流
				currentChunk++;
				this.progressPercent = currentChunk % chunksCount;
				console.log("this.progressPercent",this.progressPercent)
				//如果文件处理完成计算MD5，如果还有分片继续处理
				if (currentChunk <chunksCount) {
					loadNext();
				} else {
					// console.log("finished loading");
					// console.log(23333333,spark);
					// box.innerText = 'MD5 hash:' + spark.end();
					var md5string = spark.end();
					that.file_md5 = md5string;
					console.info("计算的Hash", md5string);
					// console.log("pices",that.pices)
					console.log(9999999999,that.picesMD5)
					that.getUnuploadShardList({
						total_size:fileSize,
						shard_size:chunkSize,
						file_md5:md5string
					}).then(function(data){
						console.log(111111,data)
						if(data.data.code === 0){
							let result = data.data.result;
							that.shard_index_list = result.shard_index_list;
							// that.file_md5 = result.file_md5;
							console.log(that.shard_index_list,that.file_md5)
						}
					})
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
			console.log(24444,query,blob)
			// var xhr = new XMLHttpRequest()

			// xhr.open('POST', URL.uploadShard + '?file_md5=' + query.file_md5 +"&shard_index="+ query.shard_index+'&shard_md5='+query.shard_md5, true);
            // xhr.send(blob);
			return axios.post(
				URL.uploadShard + '?file_md5=' + query.file_md5 +"&shard_index="+ query.shard_index+'&shard_md5='+query.shard_md5 + "&file_name=" + query.file_name, 
				blob 
			);
		},
		uploadIsSuccess:function(params){
			return axios.post(URL.uploadIsSuccess, params);
		},
		submitFile:function(){
			alert(11111)
		}
	}
}
</script>
<style lang="less">
.submitButton{
	width:100px;
	height: 50px;
	line-height: 50px;
	border-radius:10px;
	background:blue;
	color:#fff;
	text-align: center;
}
</style>