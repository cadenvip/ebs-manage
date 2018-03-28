<template>
  <div style="padding: 20px;">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item>
        <el-input size="medium" v-model="searchForm.goodsName" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="medium" v-model="searchForm.goodsCode" placeholder="请输入商品编码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="onSubmit">查询</el-button>
        <el-button size="medium" type="primary" @click="onSubmit">重置</el-button>
      </el-form-item>
    </el-form>
    <div>
      <div class="goods-list">商品列表</div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="goodsCode" label="商品编码" align="center"></el-table-column>
        <el-table-column prop="goodsName" label="名称" align="center"></el-table-column>
        <el-table-column prop="businessesName" label="商品类型" align="center"></el-table-column>
        <el-table-column prop="businessesName" label="所属商户" align="center"></el-table-column>
        <el-table-column prop="applyPerson" label="申请人" align="center"></el-table-column>
        <el-table-column prop="applyTime" label="申请时间" align="center" width="180"></el-table-column>
        <el-table-column label="商品状态" align="center">
          <template slot-scope="scope">
              {{scope.row.goodsStatus ==='1'?'正常':scope.row.goodsStatus ==='2'?'上架':scope.row.goodsStatus ==='3'?'缺货':scope.row.goodsStatus ==='4'?'停售':'暂无'}}
          </template>
        </el-table-column>
        <el-table-column label="审批状态" align="center">
          <template slot-scope="scope">
              {{scope.row.applyStatus ==='1' ? '修改待审批':'暂无'}}
          </template>
        </el-table-column>
        <el-table-column label="审批意见" align="center">
          <template slot-scope="scope">
              <el-button type="text" size="small">审核</el-button>
              <el-button @click="goPreview" type="text" size="small">预览</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="text-align: right;margin-top: 10px;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>    
  </div>
</template>

<script>
import { getHistoryApply } from '@/api/admin/onsalemodifyaudit.js'
export default {
  created() {
    this._getHistoryApply()
  },
  data() {
    return {
      searchForm: {
        goodsName: '',
        goodsCode: ''
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    _getHistoryApply(obj) {
      var defaultParam = {
        order: 'desc',
        sort: 'applyTime',
        page: this.currentPage,
        pageSize: this.pageSize
      }
      var params = Object.assign(defaultParam, obj)
      this.tableData = []
      getHistoryApply(params).then(res => {
        if (res.status === 200) {
          this.tableData = res.data
          this.total = res.total
          this.pageSize = res.pageSize
          this.currentPage = res.page
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this._getHistoryApply(this.searchForm)
    },
    goPreview(val) {
      if (val.goodsId) {
        this.$router.push({ name: 'preview', query: { goodsId: val.goodsId }})
      }
    },
    onSubmit() {
      console.log('test')
    }
  }
}
</script>

<style scoped>
  .goods-list{
    height: 30px;
    line-height: 30px;
    background: #6ebfec;
    font-size: 14px;
    color:#fff;
    padding-left: 20px;
    font-weight: bold;
  }
</style>
