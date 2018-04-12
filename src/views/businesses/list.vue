<template>
  <div style="padding-left: 20px;">
    <h4>企业查询条件</h4>
    <el-form ref="searchForm" :model="searchForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="10">
          <el-form-item label="企业名称：">
            <el-input v-model="searchForm.businessesName" clearable style="width: 300px;" placeholder="请输入企业名称"></el-input>
          </el-form-item>  
        </el-col>
        <el-col :span="10">
          <el-form-item label="所属区域：">
            <el-input v-model="searchForm.locationname" style="width: 300px;" @focus="handleLocationFocus" placeholder="请选择归属区域"></el-input>
          </el-form-item>  
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="录入来源：">
            <el-select v-model="searchForm.createsource" clearable placeholder="请选择录入来源" style="width: 300px;">
              <el-option label="商家注册" value="1"></el-option>
              <el-option label="管理员添加" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <!-- state审核状态：0-正常 1-暂停 2-企业审核 3-未通过  4- 过期 5-网店待审核 6-待付款 -->
          <!-- status审核状态：0-正常 1-暂停 2-企业审核 3-未通过  4- 过期 5-网店待审核 6-待付款 -->
          <el-form-item label="企业状态：">
            <el-select v-model="searchForm.state" clearable placeholder="请选择企业状态" style="width: 300px;">
              <el-option label="待审核" value="0"></el-option>
              <el-option label="正常" value="1"></el-option>
              <el-option label="驳回" value="2"></el-option>
              <el-option label="暂停" value="3"></el-option>
              <!-- <el-option label="停用" value="3"></el-option>
              <el-option label="过期" value="4"></el-option>
              <el-option label="网店待审核" value="5"></el-option>
              <el-option label="待付款" value="6"></el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="16">
          <el-button type="primary" @click.native.prevent="queryBusinessesList">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click.native.prevent="addBusinesses">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="请选择区域" :visible.sync="dialogVisible" width="440px">
      <locationselector @locationSelected="getLocationInfo"></locationselector>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelectedRegion">确 定</el-button>
      </span>
    </el-dialog>
    <br/>
    <div class="list">企业列表</div>
    <el-table :data="list" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="width: 100%">
      <el-table-column label='企业名称' prop="businessesName" align="center">
      </el-table-column>
      <el-table-column label="区域" prop="locationName" align="center">
      </el-table-column>
      <el-table-column label="有效时间" prop="validdate" :formatter="timedateFormat" align="center">
      </el-table-column>
      <el-table-column label="企业状态" prop="state" :formatter="stateFormat" align="center">
      </el-table-column>
      <el-table-column label="录入来源" prop="createsource" :formatter="sourceFormat" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small">详细</el-button>
          <el-button @click="updateBusinesse(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="disableBusiness(scope.row)" v-if="scope.row.state === '1'" type="text" size="small">暂停</el-button>
          <el-button @click="enableBusinesse(scope.row)" v-if="scope.row.state === '3'" type="text" size="small">激活</el-button>
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

import { getAllBusinesses, getBusinessesList, enableOrPauseBusiness } from '@/api/businesses'
import locationselector from '@/components/LocationSelector/index'

export default {
  data() {
    return {
      list: [],
      searchForm: {
        businessesName: '',
        locationCode: '',
        locationname: '',
        createsource: '',
        state: ''
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
  components: {
    locationselector
  },
  created() {
    this.initBusinessesList()
  },
  methods: {
    handleLocationFocus() {
      this.dialogVisible = true
      this.searchForm.locationid = ''
      this.searchForm.locationname = ''
    },
    getLocationInfo: function (data) {
      this.locationInfo = data
    },
    confirmSelectedRegion() {
      this.searchForm.locationCode = this.locationInfo.id
      this.searchForm.locationname = this.locationInfo.label
      this.dialogVisible = false
      this.locationInfo = {}
    },
    queryBusinessesList() {
      this.loading = true
      getBusinessesList(this.searchForm, this.currentPage, this.pagesize).then(response => {
        if (response.status === 200) {
          this.list = response.data.list
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
    addBusinesses() {
      this.$router.push({ path: '/businesses/add' })
    },
    initBusinessesList() {
      this.loading = true
      getAllBusinesses(this.currentPage, this.pagesize).then(response => {
        if (response.status === 200) {
          this.list = response.data.list
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
    resetForm(formname) {
      // this.$refs[formname].resetFields()
      this.searchForm.businessesName = ''
      this.searchForm.locationCode = ''
      this.searchForm.locationname = ''
      this.searchForm.createsource = ''
      this.searchForm.state = ''
    },
    timedateFormat(row, column, cellValue) {
      // 截取年月日
      if (cellValue !== null) {
        return cellValue.substr(0, 10)
      } else {
        return ''
      }
    },
    stateFormat(row, column, cellValue) {
      var state = ''
      switch (cellValue) {
        case '0':
          state = '企业待审核'
          break
        case '1':
          state = '正常'
          break
        case '2':
          state = '驳回'
          break
        case '3':
          state = '暂停'
          break
        // case '4':
        //   state = '过期'
        //   break
        // case '5':
        //   state = '网店待审核'
        //   break
        // case '6':
        //   state = '待付款'
        //   break
        default:
          break
      }
      return state
    },
    sourceFormat(row, column, cellValue) {
      var source = ''
      switch (cellValue) {
        case '1':
          source = '商家注册'
          break
        case '2':
          source = '管理员添加'
          break
        default:
          // source = '未知'
          break
      }
      return source
    },
    detail(businesses) {
      this.$router.push({ path: '/businesses/detail', query: { id: businesses.id }})
    },
    updateBusinesse(businesses) {
      this.$router.push({ path: '/businesses/update', query: { id: businesses.id }})
    },
    disableBusiness(businesses) {
      var params = {
        'businessesid': `${businesses.id}`,
        'state': '3'
      }
      enableOrPauseBusiness(params).then(response => {
        if (response.status === 200) {
          this.$message.success('暂停企业成功')
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error.msg)
      })
    },
    enableBusiness(businesses) {
      var params = {
        'businessesid': `${businesses.id}`,
        'state': '3'
      }
      enableOrPauseBusiness(params).then(response => {
        if (response.status === 200) {
          this.$message.success('激活企业成功')
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error.msg)
      })
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.queryBusinessesList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryBusinessesList()
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