<template>
  <div>
    <h3 style="padding-left: 20px;">企业查询条件</h3>
    <el-form ref="searchForm" :model="searchForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="10">
          <el-form-item label="企业名称：">
            <el-input v-model="searchForm.businessesName" clearable style="width: 300px;"></el-input>
          </el-form-item>  
        </el-col>
        <el-col :span="10">
          <el-form-item label="所属区域：">
            <el-input v-model="searchForm.locationname" clearable style="width: 300px;" @focus="handleLocationFocus"></el-input>
          </el-form-item>  
        </el-col>
      </el-row>
        <!-- state审核状态：0-正常 1-暂停 2-企业审核 3-未通过  4- 过期 5-网店待审核 6-待付款 -->
        <!-- status审核状态：0-正常 1-暂停 2-企业审核 3-未通过  4- 过期 5-网店待审核 6-待付款 -->
        <el-form-item label="企业状态：">
          <el-select v-model="searchForm.state" clearable placeholder="请选择" style="width: 300px;">
            <el-option label="待审核" value="0"></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="驳回" value="2"></el-option>
            <!-- <el-option label="停用" value="3"></el-option>
            <el-option label="过期" value="4"></el-option>
            <el-option label="网店待审核" value="5"></el-option>
            <el-option label="待付款" value="6"></el-option> -->
          </el-select>
        </el-form-item>
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
    <el-dialog
      title="请选择区域"
      :visible.sync="dialogVisible"
      width="440px"
      :before-close="handleClose">
      <locationselector @locationSelected="getLocationInfo"></locationselector>
    </el-dialog>
    <h3 style="padding-left: 20px;">企业列表</h3>
    <el-table :data="list" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="padding-left:10px">
      <el-table-column label='企业名称' prop="businessesName" width="280" align="center">
      </el-table-column>
      <el-table-column label="区域" prop="locationName" width="110" align="center">
      </el-table-column>
      <el-table-column label="经营范围" prop="createsource" :formatter="sourceFormat" width="100" align="center">
      </el-table-column>
      <el-table-column label="有效时间" prop="validdate" :formatter="timedateFormat" width="110" align="center">
      </el-table-column>
      <el-table-column label="企业状态" prop="state" :formatter="stateFormat" width="100" align="center">
      </el-table-column>
      <el-table-column label="操作" width="190" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state === '0'" @click="adopt(scope.row)" type="text" size="small">通过</el-button>
          <el-button v-if="scope.row.state === '0'" @click="audit(scope.row)" type="text" size="small">审核</el-button>
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
import { getAllBusinesses, getBusinessesList, auditBusinesses } from '@/api/businesses'
import locationselector from '@/components/LocationSelector/index'

export default {
  data() {
    return {
      list: [],
      searchForm: {
        businessesName: '',
        locationCode: '',
        locationname: '',
        state: ''
      },
      pagesizes: [10, 20, 30, 50],
      pagesize: 10,
      currentPage: 1,
      total: 0,
      dialogVisible: false,
      loading: true
    }
  },
  components: {
    locationselector
  },
  created() {
    if (this.$route.query.state !== undefined && this.$route.query.state !== null && this.$route.query.state !== '') {
      this.searchForm.state = this.$route.query.state
      this.queryBusinessesList()
    } else {
      this.initBusinessesList()
    }
  },
  methods: {
    handleLocationFocus() {
      this.dialogVisible = true
      this.searchForm.locationid = ''
      this.searchForm.locationname = ''
    },
    handleClose(done) {
      // this.$confirm('确认关闭？').then(_ => {
      done()
      // }).catch(_ => {})
    },
    getLocationInfo: function(data) {
      this.searchForm.locationCode = data.id
      this.searchForm.locationname = data.label
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
        this.$message.error(error)
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
        this.$message.error(error)
      })
    },
    resetForm(formname) {
      // this.$refs[formname].resetFields()
      this.searchForm.businessesName = ''
      this.searchForm.locationCode = ''
      this.searchForm.locationname = ''
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
        // case '3':
        //   state = '停用'
        //   break
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
    adopt(businesses) {
      auditBusinesses({ 'businessesid': businesses.id, 'state': '1', 'reason': '' }).then(response => {
        if (response.status === 200) {
          businesses.state = '1'
          this.$message.success('审核成功')
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    audit(businesses) {
      this.$router.push({ path: '/businesses/audit', query: { id: businesses.id }})
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