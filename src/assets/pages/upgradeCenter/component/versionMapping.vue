<template>
	<div>
		<div class="title">
			<span class="label-name">{{getTypeName(currentDataObj.type)}}版本图</span>当前版本：{{currentDataObj.version}}
		</div>
		<!--111111-->
		<div class="version-list-line" v-if="inputType === 1 || inputType === 4 || inputType === 6">
			<span class="label-name">适配路由器版本:</span>
			<span class="version-list" v-for="item in currenData.router">{{item}}</span>
		</div>
		<div v-if="inputType === 2">
			<div>
				<span class="label-name">android app版本：</span>
				<span class="version-list" v-for="item in currenData.android">{{item}}</span>
			</div>
			<div>
				<span class="label-name">ios app版本：</span>
				<span class="version-list" v-for="item in currenData.ios">{{item}}</span>
			</div>
			<div>
				<span class="label-name">android pad版本：</span>
				<span class="version-list" v-for="item in currenData.androidPad">{{item}}</span>
			</div>
		</div>
		<!--2222222-->
		<div v-for="item in currenData.device"  v-if="inputType === 1 || inputType === 2 || inputType === 4 || inputType === 6">
			<div class="title">
				<span class="label-name">子设备</span>{{item.product_id}}
			</div>
			<div class="version-list-line">
				<span class="label-name">适配版本号: </span><span class="version-list">{{item.version}}</span>
			</div>
			<div class="version-list-line">
				<span class="label-name">适配H5版本号: </span><span class="version-list" v-for="inner in item.h5">{{inner}}</span>
			</div>
		</div>
	</div>
</template>
<script>
import * as namespace from '../../../store/namespace';
import { mapActions } from 'vuex';
export default {
    props: ['inputType'],
	data () {
		return {
            routersTableData: [],
            productsTableData: {
                "tableColumn":[
                    {"prop": "product_id", "label": "产品id"},
                    {"prop": "version", "label": "版本号"}
                ],
                "tableData":[]
            },
			currentDataObj: {},
			currenData: {}
		}
	},
	watch: {},
	mounted () {
	},
	methods: {
        renderData (dataObj) {
            this.currentDataObj = dataObj
            let obj = this
            let param = {
                version: dataObj.version,
            }
            switch (this.inputType) {
                case 1:
                case 4:
                case 6:
                    param.type = dataObj.type
					param.method = 'app_mapping'
                    break
                case 2:
                    param.method = 'router_mapping'
                    break
                case 3:
                    param.method = 'device_mapping'
                    param.product_id = dataObj.product_id
                    break
                case 5:
                    param.method = 'h5_mapping'
                    param.product_id = dataObj.product_id
                    break
                default:
                    break
            }
            obj.$store.dispatch('pubilcCorsAction', param).then((result) => {


            })

		},
        getTypeName (type) {
            let text = ''
            switch(type) {
                case 1:
                    text = 'Android app'
                    break
                case 6:
                    text = 'Android PAD'
                    break
                case 2:
                    text = '路由器'
                    break
                case 3:
                    text = '子设备'
                    break
                case 4:
                    text = 'IOS APP'
                    break
                default:
                    text = 'H5'
                    break
            }
            return text
		}
	},
    ...mapActions([
        'pubilcCorsAction'
    ]),
	computed: {
	}
}
</script>
<style lang="less">
	.version-list{
		padding: 5px 10px;
		background: #f00;
		color: #fff;
		margin-right: 20px;
	}
</style>