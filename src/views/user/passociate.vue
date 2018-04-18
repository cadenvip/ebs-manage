<template>
  <div class="app-container">
    <h4 class="title">人员信息详情</h4>
    <div style="color: #606266;font-size:14px;width:960px;overflow:auto;border:#E6E6E6 solid 1px;">
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
        <el-col :span="4" style="text-align:right">
          <span>
            账号：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.loginname }}
          </span>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            姓名：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ nameFormat }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
        <el-col :span="4" style="text-align:right">
          <span>
            手机号码：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ phonenoFormat }}
          </span>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            账号类型：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ roletypes }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
        <el-col :span="4" style="text-align:right">
          <span>
            归属区域：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.locationname }}
          </span>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            邮件：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.email }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
        <el-col :span="4" style="text-align:right">
          <span>
            地址：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.address ? userForm.address : '&nbsp;' }}
          </span>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            角色：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ rolenames }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;margin-bottom:20px">
        <el-col :span="4" style="text-align:right">
          <span>
            最近登录时间：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.logintime ? userForm.logintime : '&nbsp;' }}
          </span>
        </el-col>
      </el-row>
    </div>
    <div style="width:1000px;">
      <h5>运营的商家</h5>
      <el-button type="primary" @click="selectBusiness">选择商家</el-button>
      <el-table :data="selectedList" border stripe fit highlight-current-row style="width:100%;margin-top:10px" align="center">
        <el-table-column label='商家名称' prop="businessesName" align="center"></el-table-column></el-table-column>
        <el-table-column label="区域" prop="locationName" align="center"></el-table-column>
        <el-table-column label="企业状态" prop="state" :formatter="stateFormat" align="center"></el-table-column>
        <el-table-column label="商家类型" prop="businessType" :formatter="businessTypeFormat" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="deleteBusiness(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br/>
    <div style="text-align: center">
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button type="primary" @click="onCancel">返回</el-button>
    </div>
    <el-dialog title="请选择商家" :visible.sync="unitDialogVisible" width="770px">
      <el-form ref="businessSearchForm" :model="businessSearchForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="商家名称: ">
              <el-input v-model="businessSearchForm.businessesName" style="width: 220px;" placeholder="请输入商家名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-button @click="queryBusinessesList()" type="primary">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <br/>
      <el-table :data="businessList" ref="businessTable" tooltip-effect="dark" @selection-change="businessSelectionChange" border highlight-current-row style="width:100%">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label='商家名称' prop="businessesName" align="center"></el-table-column></el-table-column>
        <el-table-column label="区域" prop="locationName" align="center"></el-table-column>
        <el-table-column label="企业状态" prop="state" :formatter="stateFormat" align="center"></el-table-column>
        <el-table-column label="商家类型" prop="businessType" :formatter="businessTypeFormat" align="center"></el-table-column>
      </el-table>
      <div class="block" align="right" style="padding-right:20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
          :current-page="currentPage" :page-sizes="pagesizes" :page-size="pagesize" :total="total">
        </el-pagination>
      </div>
      <br/>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="unitDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelected">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
  import {
    getUserDetail,
    linkProxyUser,
    getProxyLinkedUnit
  } from '@/api/user'
  import {
    phoneCutSensitive,
    nameCutSensitive
  } from '@/utils/index'
  import {
    getBusinessesList
  } from '@/api/businesses'

  export default {
    data() {
      return {
        roletypes: '',
        userForm: {},
        rolenames: '',
        unitDialogVisible: false,
        businessSearchForm: {
          businessesName: '',
          state: '',
          createsource: '',
          locationCode: ''
        },
        businessList: [],
        // preSelectedBusiness: [],
        selectedList: [],
        pagesizes: [10, 20, 30, 50],
        pagesize: 10,
        currentPage: 1,
        total: 0
      }
    },
    created() {
      this.getUserForm()
    },
    computed: {
      phonenoFormat: function() {
        return phoneCutSensitive(this.userForm.phoneno)
      },
      nameFormat: function() {
        return nameCutSensitive(this.userForm.name)
      }
    },
    mounted() {
      this.queryBusinessesList()
    },
    methods: {
      setRoles(roles) {
        var arrRoleNames = []
        if (roles.length > 0) {
          switch (roles[0].roletype) {
            case '1':
              this.roletypes = '移动人员'
              break
            case '2':
              this.roletypes = '商家人员'
              break
            case '3':
              this.roletypes = '商家人员'
              break
            default:
              break
          }
        }
        for (var i = 0; i < roles.length; i++) {
          arrRoleNames.push(roles[i].rolename)
        }
        this.rolenames = arrRoleNames.join()
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.queryBusinessesList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.queryBusinessesList()
      },
      businessSelectionChange(val) {
        // this.preSelectedBusiness = val
        this.selectedList = val
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
      businessTypeFormat(row, column, cellValue) {
        var businessType = ''
        if (cellValue !== null) {
          switch (cellValue) {
            case '1':
              businessType = '合作商家'
              break
            default:
              break
          }
        }
        return businessType
      },
      selectBusiness() {
        this.unitDialogVisible = true
      },
      deleteBusiness(business) {
        var index = this.selectedList.indexOf(business)
        if (index > -1) {
          this.selectedList.splice(index, 1)
        }
      },
      queryBusinessesList() {
        this.loading = true
        getBusinessesList(this.businessSearchForm, this.currentPage, this.pagesize).then(response => {
          if (response.status === 200) {
            this.businessList = response.data.list
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
      getUserForm() {
        getUserDetail(this.$route.query.id).then(response => {
          if (response.status === 200) {
            this.userForm = response.data
            this.setRoles(this.userForm.role)
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
        var params = {
          'userid': `${this.$route.query.id}`
        }
        getProxyLinkedUnit(params).then(response => {
          if (response.status === 200) {
            this.selectedList = response.data
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      onSubmit() {
        if (this.selectedList.length <= 0) {
          this.$message.error('请至少选择一个商家！')
          return
        }
        var unitidList = []
        this.selectedList.forEach(item => {
          unitidList.push(item.id)
        })
        var params = {
          'userid': `${this.$route.query.id}`,
          'addUnitidList': unitidList
        }
        linkProxyUser(params).then(response => {
          if (response.status === 200) {
            this.$message.success('关联商家成功！')
            this.$router.push({
              path: '/system/user/plist'
            })
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      onCancel() {
        this.$router.push({
          path: '/system/user/plist'
        })
      }
    }
  }

</script>

<style scoped>
  .line {
    text-align: center;
  }

</style>
