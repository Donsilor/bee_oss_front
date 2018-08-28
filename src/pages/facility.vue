<template>
	<div class="page-content facility-page">

		<el-row>
			<el-col>
				<el-input class="searchInput" v-model="searchKey" type="text" placeholder="支持UUID搜索" />
				<el-button>查询</el-button>
				<el-button @click="importBoxFlag = true">导入</el-button>

			</el-col>
		</el-row>

		<p class="btitle">设备列表</p>

		<el-table :data="list" style="width: 100%" v-on:row-click="rowChoosed">
			<el-table-column prop="mac" label="MAC地址"></el-table-column>
			<el-table-column prop="sn" label="SN"></el-table-column>
			<el-table-column prop="uuid" label="UUID"></el-table-column>
			<el-table-column prop="status" label="状态"></el-table-column>
			<el-table-column label="升级历史">
				<template slot-scope="scope">
					<el-button @click="console.log(scope.row)" type="text">详情</el-button>
				</template>
			</el-table-column>

		</el-table>

		<el-dialog :visible.sync="importBoxFlag">
			<el-tabs type="card">
				<el-tab-pane label="导入">
					<div class="import-uploadArea">
						<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList">
							<el-button size="small" type="primary">点击上传</el-button>
						</el-upload>
					</div>
				</el-tab-pane>
			</el-tabs>

			<div class="dialog-buttonGroup">
				<el-button type="primary" native-type="submit">确定</el-button>
				<el-button @click="importBoxFlag = false;">取消</el-button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="historyBoxFlag">
			<el-table :data="historyList" style="width: 100%">
				<el-table-column prop="time" label="时间"></el-table-column>
				<el-table-column prop="version" label="版本"></el-table-column>
				<el-table-column prop="flag" label="成功与否"></el-table-column>
			</el-table>
		</el-dialog>

	</div>
</template>
<script>
export default {
    data() {
        return {
            list: [
                {
                    id: "",
                    mac: "320.210.234.234",
                    sn: "134137889798",
                    uuid: "1234123",
                    status: "库存中"
                }
            ],
            historyList: [
                {
                    time: "2017-12-12 12:32",
                    version: "1.2.1",
                    flag: "成功"
                }
            ],
            fileList: [],
            searchKey: "",
            importBoxFlag: false,
            historyBoxFlag: false
        };
    },
    mounted() {},
    methods: {
        rowChoosed(row, event) {
            this.historyBoxFlag = true;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    },
    components: {}
};
</script>
<style lang="less">
.import-uploadArea {
    padding: 20px 0 30px;
}
.dn {
    display: none;
}
</style>
