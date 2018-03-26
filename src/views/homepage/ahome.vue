<template>
  <el-container style="width:1000px;margin:0 auto 20px">
    <el-main>
      <h4>
        待办待审
      </h4>
      <div style="color:#606266;font-size:14px;width:960px;overflow:auto;border-top:#E6E6E6 solid 1px;">
        <el-row :gutter="6" v-for="(item, key) in todoList" :key="item.id" style="margin-left:4px;margin-right:0px;margin-top:12px;">
          <el-col :span="18" style="text-align:left">
            <span>
              <router-link :to="{ path: '/businesses/auditlist', query: { state: '0' } }">
                [ 待审核信息 ] {{item.businessesName}}
              </router-link>
            </span> 
          </el-col style="text-align:right">
          <el-col :span="6">
            <span>
              {{item.createdate}}
            </span> 
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { getBusinessesList } from '@/api/businesses'

export default {
  data () {
    return {
      todoList: []
    }
  },
  created () {
    var params = {
      'businessesName': '',
      'state': '0',
      'createsource': '',
      'locationCode': ''
    }
    getBusinessesList(params, 1, 10).then(response => {
      if (response.status === 200) {
        this.todoList = response.data.list
      } else {
        this.$message.error(response.msg)
      }
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
