<template>
  <el-cascader
    :options="cityData"
    :props="cityForProps"
    :clearable="true"
    placeholder="请选择地区"
    change-on-select
    @change="change"/>
</template>


<script>
import cityData from "../json/city.json"

export default {
  props: ["value"],
  data() {
    return {
      cityData: cityData,
      cityForProps: {
        value: "name_py",
        label: "name",
        children: "list"
      }
    }
  },
  methods: {
    change(val) {
      let result = []
      result.push(this.formatProvince(val[0]))
      result.push(this.formatCity(val[1]))
      this.$emit("change", result)
    },
    formatCity(value) {
      if (value) {
        return value.replace("shi", "")
      }
      return ""
    },
    formatProvince(value) {
      switch (value) {
      case "anhuisheng":
        return "Anhui"
      case "zhejiangsheng":
        return "Zhejiang"
      case "jiangxisheng":
        return "Jiangxi"
      case "jiangsusheng":
        return "Jiangsu"
      case "jilinsheng":
        return "Jilin"
      case "qinghaisheng":
        return "Qinghai"
      case "fujiansheng":
        return "Fujian"
      case "heilongjiangsheng":
        return "Heilongjiang"
      case "henansheng":
        return "Henan"
      case "hebeisheng":
        return "Hebei"
      case "hunansheng":
        return "Hunan"
      case "hubeisheng":
        return "Hubei"
      case "xinjiangweiwuerzuzizhiqu":
        return "Xinjiang"
      case "xizangzizhiqu":
        return "Xizang"
      case "gansusheng":
        return "Gansu"
      case "guangxisheng":
        return "Guangxi"
      case "guizhousheng":
        return "Guizhou"
      case "liaoningsheng":
        return "Liaoning"
      case "neimengguzizhiqu":
        return "Nei Mongol"
      case "ningxiahuizuzizhiqu":
        return "Ningxia"
      case "beijingshi":
        return "Beijing"
      case "shanghaishi":
        return "Shanghai"
      case "shanxisheng":
        return "Shanxi"
      case "shandongsheng":
        return "Shandong"
      case "shanaxisheng":
        return "Shaanxi"
      case "tianjinshi":
        return "Tianjin"
      case "yunnansheng":
        return "Yunnan"
      case "guangdongsheng":
        return "Guangdong"
      case "hainansheng":
        return "Hainan"
      case "sichuansheng":
        return "Sichuan"
      case "chongqingshi":
        return "Chongqing"
      default:
        return value
      }
    }
  }
}
</script>
