<template>
	<div :class="className">
		<div class="chooseFileButton">
			<span class="buttonText">上传文件</span>
			<input type="file" value="" id="file" ref="fileGet" v-on:change="fileUpLoad">
		</div>
		<div class="successObj" v-if="success">
			<p class="objText">{{back_file_name}}</p>
			<P class="closeImg" @click="cutFile"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAARtJREFUOBGtk0sSwUAQhnsoVarYOI9g7wocQxjFkvK+hSuwyY7kBLaOYa35kwxjIjMUvZjMo/8v048h+qdJOatJOep8y4QGWugKifjSvhJvB8PR6lMYfKEhurShKWIIw+Op7rUqROx7jWY1Co8B9vOsL8dL+Aoh1ov5dAO/GIRJFB6CT2AJ5JpAZlMfWtgDhIULlgfJgGwwGwQ6geGd6UJmwUTZcHRdLghOCoZ5nFgtJ9jTLS2/vvWcC8HWHz09jWTrB+gTZu7hJvd2i1yt8VI1BUpCSvvkHo6rmtBlQCovZk5csBdQHkTd1AZ7gFwQFywG4RUz8cYMR4nNr36zhtc8462m5a/uCyS6C0ufmLDlfNKHplwu7cyzn9Y3Uj+/+/tFAJkAAAAASUVORK5CYII=" />
			</P>
		</div>
		<div class="hidingPath" v-if="!success && (showStatus || showAgainButton)">
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
import SparkMD5 from "spark-md5";
import axios from "axios";
import * as URL from "~/lib/api";

export default {
    props: {
        className: "" //自定义样式
    },
    data() {
        return {
            status: 0, //进度条的状态，0表示正在切片，1表示正在上传
            percent: 0, //进度条百分比
            file_name: "",
            chunkSize: 10485760, //单词上传的图片大小,10M
            // chunkSize:2097152,//单词上传的图片大小,2M
            chunksCount: 0, //这个文件要上传的次数
            pices: [],
            picesMD5: [],
            shard_index_list: [],
            file_md5: "", //上传问价你的md5值
            dealCount: 0, //上传次数
            success: false,
            showStatus: false, //是否展示进度
            showAgainButton: false, //是否展示重新提交按钮,
            back_file_name: "" //上传成功后返回的文件名
        };
    },
    mounted() {},
    watch: {},
    methods: {
        zeroFile: function() {
            //归零,数据重置
            this.status = 0;
            this.percent = 0;
            this.file_name = "";
            this.chunksCount = 0;
            this.pices = [];
            this.picesMD5 = [];
            this.shard_index_list = [];
            this.file_md5 = "";
            this.dealCount = "";
            this.success = false;
            this.showStatus = false;
            this.showAgainButton = false;
            this.back_file_name = "";
        },
        fileUpLoad: function(e) {
            this.zeroFile();
            this.showStatus = true;
            let file = e.target.files[0];
            this.file_name = file.name || "";
            let fileSize = file.size,
                currentChunk = 0,
                that = this,
                //文件分割方法（注意兼容性）
                blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
            var chunksCount = Math.ceil(fileSize / this.chunkSize);
            this.chunksCount = chunksCount;

            //创建md5对象（基于SparkMD5）
            let spark = new SparkMD5(),
                fileReader = new FileReader();
            //每块文件读取完毕之后的处理
            fileReader.onload = function(e) {
                // console.log("event",e)
                console.log("读取文件", currentChunk + 1, "/", chunksCount);
                //每块交由sparkMD5进行计算
                spark.appendBinary(e.target.result); //总文件MD5的计算

                var spark1 = new SparkMD5(); //单片文件md5的计算
                spark1.appendBinary(e.target.result);
                that.picesMD5.push(spark1.end());

                currentChunk++;
                var percent = (currentChunk / chunksCount * 100).toFixed(2);
                that.percent = percent;

                //如果文件处理完成计算MD5，如果还有分片继续处理
                if (currentChunk < chunksCount) {
                    loadNext(currentChunk, that.chunkSize);
                } else {
                    var md5string = spark.end();
                    that.file_md5 = md5string;
                    // console.info("计算的Hash", md5string);
                    // console.log(9999999999,that.picesMD5)
                    function uploadFileLine() {
                        that.dealCount++;
                        var successPackage = 0; //成功上传的包的计数
                        if (that.dealCount <= 3 && !that.success) {
                            that
                                .getUnuploadShardList({
                                    total_size: fileSize,
                                    shard_size: that.chunkSize,
                                    file_md5: md5string
                                })
                                .then(
                                    function(data) {
                                        if (data.data.code === 0) {
                                            let result = data.data.result;
                                            that.shard_index_list = result.shard_index_list;

                                            if (result.shard_index_list && result.shard_index_list.length === 0) {
                                                //说明这个文件已经上传过，

                                                return that
                                                    .uploadIsSuccess({
                                                        file_md5: that.file_md5
                                                    })
                                                    .then(function(result) {
                                                        if (result.data.code === 0) {
                                                            that.$message("文件已经上传成功!");
                                                            that.success = true;
                                                            that.back_file_name = result.data.result.object;
                                                            that.status = 1;
                                                            that.percent = 100;
                                                            that.$emit("uploadSuccess", {
                                                                download_file_md5: result.data.result.file_md5,
                                                                download_url_object: that.back_file_name,
                                                                size: result.data.result.size
                                                            });
                                                            return;
                                                        } else {
                                                            uploadFileLine();
                                                        }
                                                    })
                                                    .catch(function(err) {
                                                        // console.log("失败",err)
                                                        uploadFileLine();
                                                    });
                                            } else {
                                                // console.log("else",22222222222222222222)
                                                return result.shard_index_list;
                                            }
                                        }
                                    },
                                    function(err) {
                                        // console.log('分片上传失败')
                                        that.$message("任务初始化失败，请重试");
                                        that.showAgainButton = true;
                                        that.status = 0;
                                        that.percent = 0;
                                    }
                                )
                                .then(function(shard_index_list) {
                                    // console.log(111111110,shard_index_list)
                                    that.picesFileUpload(shard_index_list, successPackage, that); //上传分片后的文件
                                });
                        } else if (that.success) {
                            // console.log("已经上传成功")
                            that.$message("文件上传成功!");
                            that.$emit("uploadSuccess", {
                                download_file_md5: that.file_md5,
                                download_url_object: that.back_file_name,
                                size: result.data.result.size
                            });
                            return;
                        } else {
                            // console.log("三次上传后仍然出错，需求重新上传")
                            that.$message("文件上传出错，请重试");
                            that.showAgainButton = true;
                            that.status = 0;
                            that.percent = 0;
                        }
                    }
                    uploadFileLine();
                }
            };
            //处理单片文件的上传
            function loadNext(currentChunk, chunkSize) {
                var start = currentChunk * chunkSize,
                    end = start + chunkSize >= file.size ? file.size : start + chunkSize;
                that.pices.push(blobSlice.call(file, start, end));

                fileReader.readAsBinaryString(blobSlice.call(file, start, end));
            }
            loadNext(currentChunk, that.chunkSize);
        },
        getUnuploadShardList: function(params) {
            //分片任务初始化接口
            return axios.post(URL.getUnuploadShardList, params);
        },
        uploadShard: function(query, blob) {
            // var xhr = new XMLHttpRequest()
            // xhr.open('POST', URL.uploadShard + '?file_md5=' + query.file_md5 +"&shard_index="+ query.shard_index+'&shard_md5='+query.shard_md5, true);
            // xhr.send(blob);
            return axios.post(
                URL.uploadShard +
                    "?file_md5=" +
                    query.file_md5 +
                    "&shard_index=" +
                    query.shard_index +
                    "&shard_md5=" +
                    query.shard_md5 +
                    "&file_name=" +
                    query.file_name +
                    "&noToken=true",
                blob
            );
        },
        uploadIsSuccess: function(params) {
            return axios.post(URL.uploadIsSuccess, params, { async: true }); //同步上传
        },
        picesFileUpload: function(shard_index_list, successPackage, that) {
            if (shard_index_list && shard_index_list.length !== 0) {
                var promiseAll = [];
                shard_index_list.forEach((item, index) => {
                    var promise = new Promise((resolve, reject) => {
                        // console.log("that.picesMD5[item]",that.picesMD5[item])
                        that
                            .uploadShard(
                                {
                                    file_md5: that.file_md5,
                                    shard_index: item,
                                    shard_md5: that.picesMD5[item],
                                    file_name: that.file_name
                                },
                                that.pices[item]
                            )
                            .then(function(data) {
                                if (data.data.code === 0) {
                                    successPackage++;
                                    that.status = 1;
                                    that.percent = (successPackage / that.shard_index_list.length * 100).toFixed(2); //上传成功百分比
                                    resolve(data);
                                }
                            })
                            .catch(function(err) {
                                reject(err);
                            });
                    });
                    promiseAll.push(promise);
                });
                Promise.all(promiseAll)
                    .then(function(resultAllData) {
                        if (resultAllData) {
                            if (successPackage === that.shard_index_list.length) {
                                console.log("所有待上传的包都上传成功了");
                                that
                                    .uploadIsSuccess({
                                        file_md5: that.file_md5
                                    })
                                    .then(function(result) {
                                        if (result.data.code === 0) {
                                            that.success = true;
                                            that.back_file_name = result.data.result.object;
                                            that.success = true;
                                            that.$emit("uploadSuccess", {
                                                download_file_md5: result.data.result.file_md5,
                                                download_url_object: that.back_file_name,
                                                size: result.data.result.size
                                            });
                                            that.$message("全部分片已经上传成功了");
                                            return;
                                        }
                                    })
                                    .catch(function(err) {
                                        that.$message(err);
                                        // that.$message("任务初始化失败，请重试");
                                        that.showAgainButton = true;
                                        that.status = 0;
                                        that.percent = 0;
                                    });
                            } else {
                                // console.log("重新上传一次uploadFileLine()")
                                uploadFileLine();
                            }
                        }
                    })
                    .catch(function(err) {
                        console.log("err", err);
                        that.zeroFile();
                        that.showAgainButton = true;
                        that.status = 0;
                        that.percent = 0;
                    });
            } else {
                return;
            }
        },
        submitFile: function() {
            this.$refs.fileGet.value = "";
            this.$refs.fileGet.click.call(this.$refs.fileGet, this.$refs.fileGet.$event);
        },
        cutFile: function() {
            this.zeroFile();
            this.$refs.fileGet.value = "";
            this.$emit("uploadSuccess", { download_file_md5: "", download_url_object: "", size: 0 });
        }
    }
};
</script>
<style lang="less">
.submitButton {
    width: 80px;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    background-color: #0c57a1;
    color: #fff;
    text-align: center;
    margin-top: 10px;
    font-size: 13px;
}
.hidingPath {
    width: 80%;
    height: auto;
    padding: 10px 20px 20px 20px;
    border: 1px solid #cccc;
    border-radius: 0 0 10px 10px;
    background-color: #f4f4f8;
}
.chooseFileButton {
    width: 100px;
    height: 45px;
    color: #fff;
    background-color: #a0cfff;
    border-radius: 10px;
    text-align: center;
    line-height: 55px;
    position: relative;
    font-size: 16px;
    margin-bottom: 10px;
    .buttonText {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 45px;
    }
}
#file {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0;
}
.successObj {
    width: 100%;
    height: 20px;
    line-height: 20px;
    background-color: #f4f4f8;
    box-sizing: border-box;
    padding: 0px 10px;
    position: relative;
    .objText {
        font-size: 14px;
        color: #606266;
    }
    .closeImg {
        width: 12px;
        height: 12px;
        position: absolute;
        top: 4px;
        right: 5px;
        img {
            display: block;
            width: 12px;
            height: 12px;
        }
    }
}
// .deal{
// 	position: fixed;
// 	width:auto;
// 	padding:0 10px;
// 	box-sizing:border-box;
// 	top:50%;
// 	left:50%;
// 	transform: translate(-50%,-50%)
// }
</style>
