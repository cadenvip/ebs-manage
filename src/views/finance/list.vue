<template>
  <div style="padding-left: 20px;">
    <h4>账目查询条件</h4>
    <el-form ref="searchForm" :model="searchForm" label-width="130px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="企业名称：" prop="merchantname">
            <el-input v-model="searchForm.merchantname" clearable style="width: 180px;" placeholder="请输入企业名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="归属区域：">
            <el-input v-model="searchForm.locationname" style="width: 180px;" @focus="handleLocationFocus" placeholder="请选择所属区域"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对账状态：" prop="status">
            <el-select v-model="searchForm.status" clearable style="width: 180px;" placeholder="请选择对账状态">
              <!-- // 对账状态(0 待确认 1 已确认 2 待调账 3 已结算 ) -->
              <el-option label="待确认" value="0"></el-option>
              <el-option label="已确认" value="1"></el-option>
              <el-option label="待调账" value="2"></el-option>
              <el-option label="已结算" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="到账时间：" prop="yearmonth">
            <el-date-picker v-model="searchForm.yearmonth" type="month" value-format="yyyyMM" style="width: 180px;" placeholder="请选择到账时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="" prop="greater500">
            <el-checkbox v-model="searchForm.greater500">显示不足500的</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3" :offset="8">
          <el-button type="primary" @click.native.prevent="queryBillList">查询</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <br/>
    <div class="list">账目列表</div>
    <el-table :data="billlist" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row
      style="width:100%">
      <el-table-column label='企业名称' prop="merchantname" align="center"></el-table-column>
      <el-table-column label="区域" prop="locationname" align="center"></el-table-column>
      <el-table-column label="出账周期" prop="startmonth" :formatter="formatPeriod" align="center"></el-table-column>
      <el-table-column label="应结算合计" prop="totalpay" :formatter="formatUnit" align="center"></el-table-column>
      <el-table-column label="对账状态" prop="status" :formatter="formatStatus" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small">明细</el-button>
          <el-button @click="confirmBill(scope.row)" v-if="scope.row.status === '1'" type="text" size="small">结账</el-button>
          <el-button @click="adjustBill(scope.row)" v-if="scope.row.status === '2'" type="text" size="small">调账</el-button>
          <el-button @click="clearBill(scope.row)" v-if="scope.row.payable === '1'" type="text" size="small">清账</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" align="right" style="padding-right:20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
        :current-page="currentPage" :page-sizes="pagesizes" :page-size="pagesize" :total="total">
      </el-pagination>
    </div>
    <br/>
    <el-row :gutter="20" style="margin-left:0px;margin-right:0px;margin-top:20px;">
      <el-col :span="3" :offset="6" style="text-align:right">
        <span>
          <el-button @click="downloadSettlement" type="text">下载结算总结</el-button>
        </span>
      </el-col>
      <el-col :span="3">
        <span>
          <el-button @click="downloadHistorySettlement" type="text">下载更多历史结算总结</el-button>
        </span>
      </el-col>
    </el-row>
    <el-dialog title="请选择区域" :visible.sync="dialogVisible" width="440px">
      <locationselector @locationSelected="getLocationInfo"></locationselector>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelectedRegion">确 定</el-button>
      </span>      
    </el-dialog>
  </div>
</template>

<script>
  import {
    getAllBills,
    getBillList,
    downloadBillList,
    adminDealBill,
    adminClearBill
  } from '@/api/finance'
  import locationselector from '@/components/LocationSelector/index'

  export default {
    data() {
      return {
        billlist: [],
        searchForm: {
          merchantname: '',
          yearmonth: '',
          status: '',
          greater500: false,
          locationcode: '',
          locationname: ''
        },
        pagesizes: [10, 20, 30, 50],
        pagesize: 10,
        currentPage: 1,
        total: 0,
        dialogVisible: false,
        loading: true,
        locationInfo: {}
      }
    },
    created() {
      this.initBillList()
    },
    components: {
      locationselector
    },
    methods: {
      queryBillList() {
        this.loading = true
        getBillList(this.searchForm, this.currentPage, this.pagesize).then(response => {
          if (response.status === 200) {
            this.billlist = response.data.list
            this.total = response.data.total
          } else {
            this.$message.error(response.msg)
          }
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$message.error(error.msg)
        })
      },
      initBillList() {
        this.loading = true
        getAllBills(this.currentPage, this.pagesize).then(response => {
          if (response.status === 200) {
            this.billlist = response.data.list
            this.total = response.data.total
          } else {
            this.$message.error(response.msg)
          }
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$message.error(error.msg)
        })
      },
      getLocationInfo: function (data) {
        this.locationInfo = data
      },
      confirmSelectedRegion() {
        this.searchForm.locationcode = this.locationInfo.locationCode
        this.searchForm.locationname = this.locationInfo.label
        this.dialogVisible = false
        this.locationInfo = {}
      },
      resetForm(formname) {
        this.searchForm.merchantname = ''
        this.searchForm.yearmonth = ''
        this.searchForm.status = ''
        this.searchForm.greater500 = false
        this.searchForm.locationcode = ''
        this.searchForm.locationname = ''
      },
      detail(bill) {
        this.$router.push({
          path: '/finance/detail',
          query: {
            id: bill.id
          }
        })
      },
      confirmBill(bill) {
        var params = {
          'billid': `${bill.id}`
        }
        adminDealBill(params).then(response => {
          if (response.status === 200) {
            this.$message.success('确认结账成功！')
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      adjustBill(bill) {
        this.$router.push({
          path: '/finance/update',
          query: {
            id: bill.id
          }
        })
      },
      clearBill(bill) {
        var params = {
          'billid': `${bill.id}`
        }
        adminClearBill(params).then(response => {
          if (response.status === 200) {
            this.$message.success('清账成功！')
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.queryBillList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.queryBillList()
      },
      handleLocationFocus() {
        this.dialogVisible = true
        this.searchForm.locationid = ''
        this.searchForm.locationname = ''
      },
      formatPeriod(row, column, cellValue) {
        return row.startmonth + '--' + row.endmonth
      },
      formatStatus(row, column, cellValue) {
        // 对账状态(0 待确认 1 已确认 2 待调账 3 已结算 )
        var type = ''
        switch (cellValue) {
          case '0':
            type = '待确认'
            break
          case '1':
            type = '已确认'
            break
          case '2':
            type = '待调账'
            break
          case '3':
            type = '已结算'
            break
          default:
            type = ''
            break
        }
        return type
      },
      formatUnit(row, column, cellValue) {
        if (cellValue !== null) {
          return '￥' + (cellValue / 100).toFixed(2)
        } else {
          return ''
        }
      },
      downloadSettlement() {
        downloadBillList().then(response => {
          if (response.status === 200) {
            this.$message.success('下载成功')
          } else {
            this.$message.error(response.msg)
          }
        })
      },
      downloadHistorySettlement() {
        this.$router.push({
          path: '/finance/moreHistory'
        })
      }
    }
  }

</script>

<style scoped>
  .list{
    height: 30px;
    line-height: 30px;
    background: #6ebfec;
    font-size: 14px;
    color:#fff;
    padding-left: 20px;
    font-weight: bold;
  }
</style>
