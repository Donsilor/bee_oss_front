<template>
    <div class="page-content feedback-detail">
        <el-breadcrumb separator="/" class="item">
            <el-breadcrumb-item :to="{ path: '../list' }">用户反馈中心</el-breadcrumb-item>
            <el-breadcrumb-item>反馈详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="item infos">
            <el-col :span="8" class="col col1">
                <div>
                    <ul>
                        <li>反馈用户名：zac</li>
                        <li>反馈用户ID: {{ detailId }}</li>
                        <li>反馈时间：2017-08-08 12:22</li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="8" class="col col2">
                <div>
                    <ul>
                        <li>终端名：zac‘s iphone</li>
                        <li>终端类型: iphone iOS 12.33</li>
                        <li>客户端版本号：1.2.22</li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="8" class="col col3">
                <div>
                    <el-button>上一条</el-button>
                    <el-button type="primary">下一条</el-button>
                </div>
            </el-col>
        </el-row>
        <div class="item content">
            <p style="line-height: 30px;">
                反馈内容：<br>
                地方是范德地方是范德萨发的地萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发方是范德萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发的地方是范德萨发的萨发的
            </p>
        </div>
        <div class="item imgs">
            <img preview="1" preview-text="" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg" alt="">
            <img preview="1" preview-text="" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg" alt="">
            <img preview="1" preview-text="" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg" alt="">
            <img preview="1" preview-text="" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg" alt="">
            <img preview="1" preview-text="" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg" alt="">
            <img preview="1" preview-text="" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg" alt="">
            <img preview="1" preview-text="" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529588094405&di=567ad120af4e66490ab854d77a122a00&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8b13632762d0f703c0e7705104fa513d2797c5e2.jpg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    components: { 
    },
    data() {
        return {
            detailId: this.$route.params.id
        };
    },
    mounted () {
        console.log(this.detailId);
    },
    methods: {
    },
    watch: {
    }
}
</script>

<style lang="less">
@import '../../styles/_var.less';
.feedback-detail {
    font-size: 14px;
}
.item {
    overflow: hidden;
    margin: 0 0 30px 0;
}
.col li:nth-child(2) {
    margin: 20px 0
}
.col2 {
    border-left: 1px solid @borderColor;
    padding: 0 0 0 40px;
}
.imgs img {
    float: left;
    width: 18%;
    margin: 0 2% 20px 0;
    cursor: pointer;
}

</style>

