<template>
  <div>
    <h3 style="padding-left: 20px;">操作日志查询条件</h3>
    <el-form ref="searchForm" :model="searchForm" label-width="130px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="操作门户" prop="system">
            <el-select v-model="searchForm.system" clearable style="width: 180px;" placeholder="请选择操作门户" v-on:change="systemChanged">
              <el-option label="系统门户" value="1"></el-option>
              <el-option label="商家门户" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="模块：" prop="moduleId">
            <el-select v-model="searchForm.moduleId" clearable style="width: 180px;" placeholder="请选择模块">
              <el-option v-for="(item, key) in moduleList" :key="key" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="操作类型：" prop="operType">
            <el-select v-model="searchForm.operType" clearable style="width: 180px;" placeholder="请选择操作类型">
              <el-option v-for="(item, key) in operTypeList" :key="key" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="操作人账号：" prop="loginName">
            <el-input v-model="searchForm.loginName" clearable style="width: 180px;" placeholder="请输入操作人账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="内容关键字：" prop="operContent">
            <el-input v-model="searchForm.operContent" clearable style="width: 180px;" placeholder="请输入内容关键字"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="操作时间：" prop="createTime">
            <el-date-picker v-model="searchForm.createTime" type="date" value-format="yyyy-MM-dd" style="width: 180px;" placeholder="请选择操作时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3" :offset="8">
          <el-button type="primary" @click.native.prevent="queryOLogList">查询</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <h3 style="padding-left: 20px;">操作日志列表</h3>
    <el-table :data="list" v-loading.body="loading" element-loading-text="Loading" border stripe fit highlight-current-row style="padding-left:10px">
      <el-table-column label='流水号' prop="id" width="100" align="center"></el-table-column>
      <el-table-column label="操作门户" prop="system" :formatter="systemFormat" width="120" align="center"></el-table-column>
      <el-table-column label="操作人账号" prop="loginName" width="150" align="center"></el-table-column>
      <el-table-column label="操作模块" prop="moduleId" width="180" align="center"></el-table-column>
      <el-table-column label="操作类型" prop="operType" width="120" align="center"></el-table-column>
      <el-table-column label="耗时（毫秒）" prop="timed" width="120" align="center"></el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="180" align="center"></el-table-column>
      <el-table-column label="操作" width="90" align="center">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small">详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" align="right" style="padding-right:20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
        :current-page="currentPage" :page-sizes="pagesizes" :page-size="pagesize" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    getAllOLogs,
    getOLogList,
    getModuleList,
    getOperTypeList
  } from '@/api/log'

  export default {
    data() {
      return {
        list: [],
        moduleList: [],
        operTypeList: [],
        searchForm: {
          system: '', // 操作门户
          loginName: '', // 操作人账号
          moduleId: '', // 操作模块
          operType: '', // 操作类型
          operContent: '', // 操作内容
          createTime: '' // 操作时间
        },
        pagesizes: [10, 20, 30, 50],
        pagesize: 10,
        currentPage: 1,
        total: 0,
        dialogVisible: false,
        loading: true
      }
    },
    created() {
      this.initOLogList()
      getModuleList().then(response => {
        if (response.status === 200) {
          for (var i in response.data) {
            this.moduleList.push({
              'label': response.data[i],
              'value': i
            })
          }
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
      getOperTypeList().then(response => {
        if (response.status === 200) {
          for (var i in response.data) {
            this.operTypeList.push({
              'label': response.data[i],
              'value': i
            })
          }
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    methods: {
      queryOLogList() {
        this.loading = true
        var params = this.searchForm
        params['page'] = this.currentPage
        params['pageSize'] = this.pagesize
        // 按操作时间降序排序
        params['sort'] = 'createTime'
        params['order'] = 'desc'
        getOLogList(params).then(response => {
          if (response.status === 200) {
            this.list = response.data
            this.total = response.total
          } else {
            this.$message.error(response.msg)
          }
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$message.error(error)
        })
      },
      initOLogList() {
        this.loading = true
        var params = {}
        params['page'] = this.currentPage
        params['pageSize'] = this.pagesize
        // 按操作时间降序排序
        params['sort'] = 'createTime'
        params['order'] = 'desc'
        getAllOLogs(params).then(response => {
          if (response.status === 200) {
            this.list = response.data
            this.total = response.total
          } else {
            this.$message.error(response.msg)
          }
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$message.error(error)
        })
      },
      systemChanged() {
        var params = {
          'system': this.searchForm.system
        }
        getModuleList(params).then(response => {
          if (response.status === 200) {
            this.moduleList = []
            for (var i in response.data) {
              this.moduleList.push({
                'label': response.data[i],
                'value': i
              })
            }
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error)
        })
        getOperTypeList(params).then(response => {
          if (response.status === 200) {
            this.operTypeList = []
            for (var i in response.data) {
              this.operTypeList.push({
                'label': response.data[i],
                'value': i
              })
            }
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error)
        })
      },
      resetForm(formname) {
        this.searchForm.system = ''
        this.searchForm.loginName = ''
        this.searchForm.moduleId = ''
        this.searchForm.operType = ''
        this.searchForm.operContent = ''
        this.searchForm.createTime = ''
      },
      detail(olog) {
        this.$router.push({
          path: '/log/olog/detail',
          query: {
            id: olog.id
          }
        })
      },
      systemFormat(row, column, cellValue) {
        if (cellValue === undefined || cellValue === null) {
          return ''
        } else {
          switch (cellValue) {
            case '1':
              return '系统门户'
            case '2':
              return '商家门户'
          }
        }
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.queryOLogList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.queryOLogList()
      }
    }
  }

</script>
