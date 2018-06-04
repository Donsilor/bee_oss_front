<template>
    <el-cascader v-model="value" :options="cityData" :props="cityForProps" placeholder="请选择地区">
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
            }
        }
    },
    watch: {    
        value(val) {   
            this.$emit('input', val)
        }
    }
}
</script>
