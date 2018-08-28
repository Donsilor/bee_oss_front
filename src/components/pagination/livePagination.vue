<template>
	<pagination :config="config"></pagination>
</template>
<script>
import { mapGetters } from "vuex";
import pagination from "./pagination.vue";
export default {
    name: "pager",
    props: [
        "data", // 源数据
        "displayData", // 显示的数组
        "keyword" // 关键字
    ],
    components: {
        pagination
    },
    data() {
        return {
            config: {
                currentPage: 1,
                pageSize: 5,
                pageSizes: [5, 10],
                total: 0
            }
        };
    },
    computed: {
        ...mapGetters(["pageSize"])
    },
    watch: {
        "config.currentPage": function(newValue, oldValue) {
            // console.log('config.currentPage', newValue)
            this.filterData();
        },
        "config.pageSize": function(newValue, oldValue) {
            // console.log('config.pageSize', newValue)
            this.filterData();
        },
        keyword(newValue, oldValue) {
            this.config.currentPage = 1;
            this.filterData();
        },
        data(newValue, oldValue) {
            this.filterData();
        }
    },
    methods: {
        // 排序函数(升序排列)
        handleSortFun(sortSource, aim) {
            let by = name => {
                return (o, p) => {
                    let a, b;
                    if (typeof o === "object" && typeof p === "object" && o && p) {
                        a = o[name].toString().replace(",", "");
                        b = p[name].toString().replace(",", "");
                        if (a === b) {
                            return 0;
                        }
                        if (typeof a === typeof b) {
                            return a - b < 0 ? -1 : 1;
                        }
                        return typeof a < typeof b ? -1 : 1;
                    } else {
                        throw new Error("error");
                    }
                };
            };
            sortSource.sort(by(aim));
        },
        filterData(column, aim, order) {
            let obj = this;
            if (order) {
                obj.paixu = order;
                obj.aimName = aim;
            } else if (order === null) {
                obj.paixu = false;
            }
            let source = [];
            if (obj.keyword !== undefined && obj.keyword.trim() !== "") {
                let keyword = obj.keyword.trim();
                source = obj.data.filter(v => {
                    let keys = Object.keys(v);
                    let exist = false;
                    keys.forEach(subV => {
                        if (typeof v[subV] !== "function") {
                            if (typeof v[subV] === "object") {
                            } else {
                                if (
                                    v[subV]
                                        .toString()
                                        .toLowerCase()
                                        .indexOf(keyword.toLowerCase()) > -1
                                ) {
                                    exist = true;
                                    return;
                                }
                            }
                        }
                    });

                    return exist;
                });
            } else {
                source = obj.data.slice(0);
            }
            let sortSource = source.slice(0);
            // 根据order选择排序的顺序
            if (obj.paixu) {
                obj.handleSortFun(sortSource, obj.aimName);
                if (obj.paixu === "ascending") {
                    source = sortSource;
                } else if (obj.paixu === "descending") {
                    source = sortSource.reverse();
                }
            }
            let begin = (this.config.currentPage - 1) * this.config.pageSize;
            let end = begin + this.config.pageSize;
            let temp = source.slice(begin, end);
            if (obj.displayData.length > 0) {
                obj.displayData.splice(0, obj.displayData.length);
            }
            temp.forEach(v => {
                obj.displayData.push(v);
            });
            obj.config.total = source.length;
        }
    },
    mounted() {
        this.filterData();
    }
};
</script>
