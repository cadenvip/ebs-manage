<template>
  <div style="padding: 20px;">
    <el-button @click="addFreight" size="medium" type="primary">新增运费模板</el-button>
    <div v-if="!(arrData.length === 0)" style="margin-top: 20px;" v-for="(item, index) in arrData">
      <div style="border: 1px solid #ebeef5; height: 45px;border-bottom: none;background: #f5f7fa;">
        <el-col :span="22">
          <p style="color: #909399; font-size: 14px;font-weight: bold; padding-left: 10px;">{{item.templateName}}</p>
        </el-col>
        <el-col :span="1">
          <el-button @click="modifyTemplate(item.id)" style="margin-top: 8px;" size="mini" type="text">修改</el-button>
        </el-col>
        <el-col :span="1">
          <el-button @click="_deleteTemplate(item.id)" style="margin-top: 8px;" size="mini" type="text">删除</el-button>
        </el-col>
      </div>
      <el-table
        border
        :data="item.transportList"
        style="width: 100%">
        <el-table-column align="center" prop="tranportType" label="运费方式">
          <template slot-scope="scope">
            {{scope.row.tranportType === '2' ? '快递' : '无'}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="arrivalLocationName" label="发送到">
        </el-table-column>
        <el-table-column align="center" prop="defaultUnit" label="首件(千克)">
        </el-table-column>
        <el-table-column align="center" prop="defaultMoney" label="运费(元)">
        </el-table-column>
        <el-table-column align="center" prop="incrementalUnit" label="续件(千克)">
        </el-table-column>
        <el-table-column align="center" prop="incrementalMoney" label="运费(元)">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <span style="font-weight: bold;">{{tipInfo}}</span>
      <span slot="footer" >
        <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getTemplateList, deleteTemplate } from '@/api/addrmanage.js'
  export default {
    created() {
      this._getTemplateList()
    },
    data() {
      return {
        dialogVisible: false,
        tipInfo: '',
        arrData: []
      }
    },
    methods: {
      addFreight() {
        // 如果模板长度 小于 10
        this.$router.push({ path: '/addrmanage/freighttemp' })
      },
      _getTemplateList() {
        getTemplateList().then(res => {
          if (res.status === 200) {
            this.arrData = res.data
          } else if (res.status === 400) {
            this.arrData = []
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        })
      },
      _deleteTemplate(id) {
        this.id = id
        this.tipInfo = '确认删除物流模板？'
        this.dialogVisible = true
      },
      confirm() {
        this.dialogVisible = false
        deleteTemplate(this.id).then(res => {
          if (res.status === 200) {
            this.$message.success('删除模板成功！')
            this._getTemplateList()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        })
      },
      modifyTemplate(id) {
        this.$router.push({ path: '/addrmanage/freighttemp', query: { tid: id }})
      }
    }
  }
</script>

<style scoped>

</style>

