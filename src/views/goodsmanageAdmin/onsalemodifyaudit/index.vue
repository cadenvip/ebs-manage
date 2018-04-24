<template>
  <div style="padding: 20px;">
    <el-form style="height: 75px;" :model="searchForm" status-icon ref="searchForm" label-width="0">
      <el-col :span="4">
        <el-form-item>
          <el-input size="medium" style="width: 80%" @focus="openDialog" v-model="searchForm.businessName" placeholder="请选择商家"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="pass">
          <el-input size="medium" style="width: 80%" v-model="searchForm.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item prop="pass">
          <el-input size="medium" style="width: 80%" v-model="searchForm.goodsCode" placeholder="请输入商品编码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item>
          <el-button size="medium" type="primary" @click="submitForm()">查询</el-button>
          <el-button size="medium" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <div>
      <div class="goods-list">商品列表</div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="goodsCode" label="商品编码" align="center"></el-table-column>
        <el-table-column prop="goodsName" label="名称" align="center"></el-table-column>
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
              {{scope.row.applyStatus ==='1' ? '修改待审批':scope.row.applyStatus ==='2' ? '修改审核通过':scope.row.applyStatus ==='3' ? '修改审核驳回':'暂无'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
              <el-button @click="audit(scope.row)" type="text" size="small">审核</el-button>
              <el-button @click="goPreview(scope.row)" type="text" size="small">预览</el-button>
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
    <!-- 弹出框 -->
    <el-dialog title="选择商家" :visible.sync="dialogVisible" center>
      <el-form :model="dialogForm">
        <el-form-item>
          <el-col :span="8">
            <el-input size="medium" v-model="dialogForm.name" auto-complete="off" placeholder="请输入商家名称"></el-input>
          </el-col>
          <el-col :span="8" style="padding-left: 20px;">
            <el-button type="primary" size="medium" @click="dialogSearch">查询</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <el-table @current-change="handleCurrentChange3" :data="tableData2" highlight-current-row border style="width: 100%">
        <el-table-column prop="businessesName" label="名称" align="center"></el-table-column>
        <el-table-column prop="businessType" label="商家类型" align="center"></el-table-column>
      </el-table>      
      <div class="block" style="text-align: right;margin-top: 10px;">
        <el-pagination
          @current-change="handleCurrentChange2"
          :current-page="currentPage2"
          :page-size="pageSize2"
          layout="total, prev, pager, next, jumper"
          :total="total2">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getApply, getBusiness } from '@/api/admin/onsalemodifyaudit.js'
  export default {
    created() {
      this._getApply()
    },
    data() {
      return {
        dialogVisible: false,
        dialogForm: {
          name: ''
        },
        currentPage: 1,
        pageSize: 10,
        total: 0,
        currentPage2: 1,
        pageSize2: 10,
        total2: 0,
        searchForm: {
          merchantId: '',
          businessName: '',
          name: '',
          goodsCode: ''
        },
        tableData: [],
        tableData2: []
      }
    },
    methods: {
      _getApply(obj) {
        var defaultParam = {
          order: 'desc',
          sort: 'applyTime',
          page: this.currentPage,
          pageSize: this.pageSize
        }
        var params = Object.assign(defaultParam, obj)
        this.tableData = []
        getApply(params).then(res => {
          if (res.status === 200) {
            this.tableData = res.data
            this.total = res.total
            this.pageSize = res.pageSize
            this.currentPage = res.page
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        })
      },
      _getBusiness(obj) {
        var defaultParam = {
          'businessesName': this.dialogForm.name,
          'limit': '10',
          'page': this.currentPage2
        }
        var params = Object.assign(defaultParam)
        this.tableData2 = []
        getBusiness(params).then(res => {
          if (res.status === 200) {
            this.tableData2 = res.data.list
            this.total2 = res.data.total
            this.pageSize2 = res.data.pagesize
            this.currentPage2 = res.data.pagenum
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        })
      },
      goPreview(val) {
        if (val.goodsId) {
          this.$router.push({ name: 'preview', query: { goodsId: val.goodsId }})
        }
      },
      submitForm() {
        this.currentPage = 1
        this._getApply(this.searchForm)
      },
      resetForm() {
        this.searchForm = {
          merchantId: '',
          businessName: '',
          name: '',
          goodsCode: ''
        }
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this._getApply(this.searchForm)
      },
      handleCurrentChange2(val) {
        this.currentPage2 = val
        this._getBusiness()
      },
      handleCurrentChange3(val) {
        if (val) {
          this.currentBusiness = val.businessesName
          this.currentBusinessId = val.id
        }
      },
      openDialog() {
        this.dialogForm.name = ''
        this.currentPage2 = 1
        this.dialogVisible = true
        this._getBusiness()
      },
      confirmDialog() {
        this.dialogVisible = false
        this.searchForm.businessName = this.currentBusiness
        this.searchForm.merchantId = this.currentBusinessId
      },
      dialogSearch() {
        this.currentPage2 = 1
        this._getBusiness()
      },
      audit(row) {
        this.$router.push({ name: '在售商品修改审核', query: { gid: row.goodsId }})
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
