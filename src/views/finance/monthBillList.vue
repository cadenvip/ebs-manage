<template>
  <div style="padding-left: 20px;">
    <div class="list">{{ formatYearMonth }}账目列表</div>
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
        </template>
      </el-table-column>
    </el-table>
    <div class="block" align="right" style="padding-right:20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
        :current-page="currentPage" :page-sizes="pagesizes" :page-size="pagesize" :total="total">
      </el-pagination>
    </div>
    <br/>
  </div>
</template>

<script>
  import {
    adminGetMoreHisBillByYearmonth
  } from '@/api/finance'

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
        loading: false
      }
    },
    created() {
      this.queryBillList()
    },
    computed: {
      formatYearMonth: function() {
        if (this.$route.query.yearmonth !== undefined && this.$route.query.yearmonth !== null && this.$route.query.yearmonth !== '') {
          return this.$route.query.yearmonth.substr(0, 4) + '年' + this.$route.query.yearmonth.substr(4, 2) + '月'
        } else {
          return '年' + '月'
        }
      }
    },
    methods: {
      queryBillList() {
        this.loading = true
        // var params = {
        //   'merchantname': '',
        //   'yearmonth': `${this.$route.query.yearmonth}`,
        //   'status': '',
        //   'locationcode': '',
        //   'greater500': true
        // }
        var params = {
          'yearmonth': `${this.$route.query.yearmonth}`,
          'page': `${this.currentPage}`,
          'limit': `${this.pagesize}`
        }
        adminGetMoreHisBillByYearmonth(params).then(response => {
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
      detail(bill) {
        this.$router.push({
          path: '/finance/detail',
          query: {
            id: bill.id
          }
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
