<template>
  <div>
    <h3 style="padding-left: 20px;">企业查询条件</h3>
    <el-form ref="searchForm" :model="searchForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="10">
          <el-form-item label="企业名称：">
            <el-input v-model="searchForm.enterpriseName" style="width: 300px;"></el-input>
          </el-form-item>  
        </el-col>
        <el-col :span="10">
          <el-form-item label="所属区域：">
            <el-input v-model="searchForm.locationId" style="width: 300px;"></el-input>
          </el-form-item>  
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="录入来源：">
            <el-select v-model="searchForm.createUserId" clearable placeholder="请选择" style="width: 300px;">
              <el-option label="基地账户" value="1"></el-option>
              <el-option label="分公司账户" value="2"></el-option>
              <el-option label="企业管理" value="3"></el-option>
              <el-option label="经销商账户" value="4"></el-option>
              <el-option label="企业申请" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <!-- auditState审核状态：0-正常 1-暂停 2-企业审核 3-未通过  4- 过期 5-网店待审核 6-待付款 -->
          <!-- status审核状态：0-正常 1-暂停 2-企业审核 3-未通过  4- 过期 5-网店待审核 6-待付款 -->
          <el-form-item label="企业状态：">
            <el-select v-model="searchForm.auditState" clearable placeholder="请选择" style="width: 300px;">
              <el-option label="正常" value="0"></el-option>
              <el-option label="停用" value="1"></el-option>
              <el-option label="企业待审核" value="2"></el-option>
              <el-option label="驳回" value="3"></el-option>
              <el-option label="过期" value="4"></el-option>
              <el-option label="网店待审核" value="5"></el-option>
              <el-option label="待付款" value="6"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="16">
          <el-button type="primary" @click.native.prevent="queryEnterpriseList">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click.native.prevent="addEnterprise">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <h3 style="padding-left: 20px;">企业列表</h3>
    <el-table :data="list" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="padding-left:10px">
      <el-table-column label='企业名称' prop="enterpriseName" width="240">
      </el-table-column>
      <el-table-column label="区域" prop="locationId" width="110">
      </el-table-column>
      <el-table-column label="有效时间" prop="validDateEnd" :formatter="timedateFormat" width="110" align="center">
      </el-table-column>
      <el-table-column label="企业状态" prop="auditState" :formatter="auditStateFormat" width="80" align="center">
      </el-table-column>
      <el-table-column label="录入来源" prop="createUserId" width="100" align="center">
      </el-table-column>
      <el-table-column align="center" label="操作" width="190">
      <template slot-scope="scope">
        <el-button @click="detail(scope.row)" type="text" size="small">详细</el-button>
      </template>
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

import { getAllEnterprises, getEnterpriseList } from '@/api/enterprise'

export default {
  data() {
    return {
      list: [],
      searchForm: {
        enterpriseName: '',
        locationId: '',
        createUserId: '',
        auditState: ''
      },
      pagesizes: [10, 20, 30, 50],
      pagesize: 10,
      currentPage: 1,
      total: 0,
      loading: true
    }
  },
  created() {
    this.initEnterpriseList()
  },
  methods: {
    queryEnterpriseList() {
      console.log(this.searchForm)
      this.loading = true
      getEnterpriseList(this.searchForm, this.currentPage, this.pagesize).then(response => {
        this.list = response.list
        this.total = response.total
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    addEnterprise() {
      this.$router.push({ path: '/enterprise/add' })
    },
    initEnterpriseList() {
      this.loading = true
      getAllEnterprises(this.currentPage, this.pagesize).then(response => {
        this.list = response.list
        this.total = response.total
        this.loading = false
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    timedateFormat(row, column, cellValue) {
      // 截取年月日
      return cellValue.substr(0, 9)
    },
    auditStateFormat(row, column, cellValue) {
      var auditState = ''
      switch (cellValue) {
        case 0:
          auditState = '正常'
          break
        case 1:
          auditState = '停用'
          break
        case 2:
          auditState = '企业待审核'
          break
        case 3:
          auditState = '驳回'
          break
        case 4:
          auditState = '过期'
          break
        case 5:
          auditState = '网店待审核'
          break
        case 6:
          auditState = '待付款'
          break
        default:
          break
      }
      return auditState
    },
    detail(enterprise) {
      this.$router.push({ path: '/enterprise/detail', query: { id: enterprise.id }})
    },
    handleSizeChange(val) {
      this.pagesize = this.pagesize === val ? this.pagesize : val
      this.queryEnterpriseList()
    },
    handleCurrentChange(val) {
      this.queryEnterpriseList()
    }
  }
}
</script>