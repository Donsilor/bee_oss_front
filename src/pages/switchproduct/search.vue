<template>
  <div class="page-content">
    <el-form :inline="true">
      <el-form-item label="">
        <el-input v-model="searchVal" :placeholder="placeholderText"></el-input>

        <el-radio v-model="searchType" label="sn"></el-radio>
        <el-radio v-model="searchType" label="mac"></el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="searchResult" style="width: 100%">
      <el-table-column prop="sn" label="sn">
      </el-table-column>
      <el-table-column prop="mac" label="mac">
      </el-table-column>

      <el-table-column prop="product_name" label="product_name">
      </el-table-column>
      <el-table-column prop="product_type" label="product_type">
      </el-table-column>
    </el-table>

  </div>
</template>


<script>
import { switchProductSearch } from "../../lib/api.js";
import axios from "../../lib/http.js";
import familys from "../../service/familys.js";
export default {
    data() {
        return {
            searchVal: "",
            searchType: "sn",
            searchResult: []
        };
    },
    computed: {
        placeholderText() {
            return `请输入${this.searchType}`;
        }
    },
    methods: {
        search() {
            if (!this.searchVal) {
                return;
            }
            axios
                .post(switchProductSearch, {
                    [this.searchType]: this.searchVal
                })
                .then(res => {
                    this.searchResult = res.data.result.data;
                })
                .catch(res => {});
        }
    }
};
</script>