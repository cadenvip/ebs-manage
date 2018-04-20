<template>
  <div style="padding: 30px 15px;">
    <div style="padding-left: 25px;">
      <el-transfer
        style="text-align:left;display: inline-block;"
        :titles="['平台账户', '短信接收人']"
        :button-texts="['删除', '添加']"
        v-model="phones" :data="data">
      </el-transfer>
    </div>
    <div>
      <p class="setting">提醒短信项目配置：</p>
        <el-checkbox-group 
          v-model="reminds">
          <el-checkbox label="1" :key="1">每日定时提醒</el-checkbox>
          <el-checkbox label="2" :key="2">缺货提醒</el-checkbox>
          <el-checkbox label="3" :key="3">新订单提醒</el-checkbox>
          <el-checkbox label="5" :key="5">退款提醒</el-checkbox>
          <el-checkbox label="6" :key="6">上架审核提醒</el-checkbox>
        </el-checkbox-group>
    </div>
    <div style="margin-top: 60px; padding-left: 260px;"><el-button size="medium" type="primary" @click="submit">保存</el-button></div>    
  </div>
</template>

<script>
  import { getSms, savaSms } from '@/api/sms.js'
  import { getBusinessAllUsers } from '@/api/user.js'
  import { phoneCutSensitive } from '@/utils/index.js'
  export default {
    created() {
      this._getSms()
      this._getAllBusinessUsers()
    },
    data() {
      return {
        data: [],
        phones: [],
        reminds: []
      }
    },
    methods: {
      _getSms() {
        getSms().then(res => {
          if (res.status === 200) {
            this.phones = res.data.phones
            this.reminds = res.data.reminds
          }
        })
      },
      _getAllBusinessUsers() {
        getBusinessAllUsers(1, 999).then(res => {
          if (res.status === 200) {
            this.data = this.generateData(res.data.list)
          }
        })
      },
      generateData(arr) {
        var temparr = []
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].name && arr[i].name.length > 4) {
            temparr.push({
              key: arr[i].loginname,
              label: arr[i].name.substring(0, 4) + '.. ' + phoneCutSensitive(arr[i].loginname)
            })
          } else {
            temparr.push({
              key: arr[i].loginname,
              label: arr[i].name + ' ' + phoneCutSensitive(arr[i].loginname)
            })
          }
        }
        return temparr
      },
      submit() {
        savaSms({
          phones: this.phones,
          reminds: this.reminds
        }).then(res => {
          if (res.status === 200) {
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      }
    }
  }
</script>

<style scoped>
.setting {
  padding-left: 30px;
  font-size: 14px;
  color: #25658b;
  line-height: 30px;
  border-bottom: #e7eaef solid 1px;
}
.ptitle{
  display:inline-block;
  width:200px; 
  text-align:right;
  font-size: 14px;
  color:#606266;
  padding-right: 20px;
  margin-top: 0;
}
</style>
