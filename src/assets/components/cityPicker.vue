<template>
    <el-cascader v-model="selectVal" :options="cityData" :props="cityForProps" placeholder="请选择地区" :clearable="true">
    </el-cascader>
</template>


<script>

import cityData from '../json/city.json'

export default {
    props: ["value"],
    data() {
        return {
            cityData: cityData,
            cityForProps : { 
                value: 'name_py',
                label: 'name',
                children: 'list'
            },
            selectVal: []
        }
    },
    watch: {    
        selectVal(val) {
            this.$emit('input', val[1] ? val[1].replace('shi', '') : '')
        }
    }
}
</script>
