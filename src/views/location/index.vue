<template>
  <div class="app-container">
    <h3 class="title">区域管理</h3>
    <el-form label-width="120px">
      <el-form-item label="名称：">
        <el-input v-model="locationname" style="width: 300px;"></el-input>
      </el-form-item> 
      <el-form-item label="地址：" prop="regioncode">
        <regionselector :grade="4" v-on:regionCodeChanged="getRegionCode" :showCountry="true"></regionselector>
      </el-form-item>
      <el-row>
        <el-col :span="2" :offset="12">
          <el-button type="primary" @click.native.prevent="queryLocationList">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <h3 style="padding-left: 20px;">地区列表</h3>
    <el-table :data="list" border stripe fit highlight-current-row style="padding-left:10px">
      <el-table-column label='国' prop="country" width="172" align="center">
      </el-table-column>
      <el-table-column label="省" prop="province" width="172" align="center">
      </el-table-column>
      <el-table-column label="市" prop="city" width="172" align="center">
      </el-table-column>
      <el-table-column label="区县" prop="county" width="172" align="center">
      </el-table-column>
      <el-table-column label="镇" prop="town" width="172" align="center">
      </el-table-column>
      <el-table-column label="村" prop="village" width="172" align="center">
      </el-table-column>
    </el-table>
    <div class="block" align="right" style="padding-right:20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="currentPage"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import regionselector from '@/components/RegionSelector/index'
import { getLocationList } from '@/api/regionselecter'

export default {
  data() {
    return {
      list: [],
      locationname: '',
      regioncode: '',
      pagesizes: [10, 20, 30, 50],
      pagesize: 10,
      currentPage: 1,
      total: 0
    }
  },
  components: {
    regionselector
  },
  methods: {
    queryLocationList() {
      getLocationList(this.searchForm).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.pagesize = response.data.pagesize
        this.current = response.data.pages
      })
    },
    getRegionCode: function(data) {
      this.regioncode = data
    }
  },
  handleSizeChange(val) {
    return
  },
  handleCurrentChange(val) {
    return
  }
}
</script>