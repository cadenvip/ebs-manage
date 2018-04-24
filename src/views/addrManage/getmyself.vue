<template>
  <div style="padding: 20px;">
    <div style="border-bottom: 1px dotted #ccc; height: 58px;">
      <el-col :span="6">
        <el-form label-width="50px">
          <el-form-item label="名称:">
            <el-input v-model="searchName" style="width: 80%;" placeholder="请输入名称"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="18">
        <el-button @click="searchByName" type="primary">查询</el-button>
      </el-col>
    </div>
    <el-col style="margin:14px 0 20px 0;">
      <el-button @click="addGetMyself" type="primary">新增自提</el-button>
    </el-col>
    <el-table
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column align="center" prop="name" label="名称">
      </el-table-column>
      <el-table-column align="center" prop="address" label="地址">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="deleteRow(scope.row.id)" type="text">删除</el-button>
          <el-button @click="modifyRow(scope.row.id)" type="text">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加自提信息" :visible.sync="dialogVisible">
      <el-form :model="AddForm">
        <el-form-item class="must" label="名称:" label-width="100px">
          <el-input style="width: 50%;" v-model.trim="AddForm.name"></el-input>
        </el-form-item>
        <el-form-item class="must" label="地址:" label-width="100px">
          <el-input :maxlength="50" style="width: 60%;" v-model.trim="AddForm.address" type="textarea"></el-input>
          <p style="margin: 0;">
            剩余字数: <span style="color:red;">{{getResidualLen}}</span>
          </p>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="30%"
      center>
      <span style="font-weight: bold;">确认删除?</span>
      <span slot="footer" >
        <el-button type="primary" @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="confirmDele">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { saveGetMyself, getGetMyselfList, deleteGetMyself, getGetMyselfListDetail, getGetMyselfByName } from '@/api/addrmanage.js'
export default {
  created() {
    this._getMyselfList()
  },
  data() {
    return {
      tableData: [],
      searchName: '',
      dialogVisible: false,
      dialogVisible2: false,
      AddForm: {
        name: '',
        address: ''
      }
    }
  },
  methods: {
    _getMyselfList() {
      getGetMyselfList().then(res => {
        if (res.status === 200) {
          this.tableData = res.data
        } else if (res.status === 400 && res.error === '暂无数据') {
          this.tableData = []
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    addGetMyself() {
      this.AddForm = {
        name: '',
        address: ''
      }
      this.dialogVisible = true
    },
    confirm() {
      if (this.AddForm.name !== '' && this.AddForm.address !== '') {
        this.dialogVisible = false
        if (this.tid) {
          this.AddForm.id = this.tid
        }
        saveGetMyself(this.AddForm).then(res => {
          this.tid = ''
          delete this.AddForm.id
          if (res.status === 200) {
            this.$message.success('添加自提成功！')
            this._getMyselfList()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        })
      } else {
        this.$message.error('请输入完整信息！')
      }
    },
    deleteRow(id) {
      this.dialogVisible2 = true
      this.id = id
    },
    confirmDele() {
      deleteGetMyself(this.id).then(res => {
        this.dialogVisible2 = false
        if (res.status === 200) {
          this.$message.success('删除自提成功！')
          this._getMyselfList()
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    modifyRow(tid) {
      this.AddForm = {
        name: '',
        address: ''
      }
      this.tid = tid
      this.dialogVisible = true
      getGetMyselfListDetail(tid).then(res => {
        if (res.status === 200) {
          this.AddForm.name = res.data.name
          this.AddForm.address = res.data.address
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    searchByName() {
      const params = {
        name: this.searchName
      }
      getGetMyselfByName(params).then(res => {
        if (res.status === 200) {
          this.tableData = res.data
        } else if (res.status === 400 && res.error === '暂无数据') {
          this.tableData = []
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    }
  },
  computed: {
    getResidualLen() {
      return (50 - this.AddForm.address.length) < 0 ? 0 : (50 - this.AddForm.address.length)
    }
  }
}
</script>

<style>
.dialog-footer{
  text-align: center;
}
.must .el-form-item__label:before {
  content: '*';
  color: red;
}
</style>
