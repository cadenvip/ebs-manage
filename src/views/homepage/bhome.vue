<template>
  <el-container style="width:1000px;margin:0 auto 20px">
    <el-main>
      <div style="color: #606266;font-size:14px;width:960px;overflow:auto;border:#E6E6E6 solid 1px;">
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
          <el-col :span="6" style="text-align:right">
            <span class="d9">
              <strong>
                截止{{ deadTime }}
              </strong>
            </span> 
          </el-col>
        </el-row>
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
          <el-col :span="4" style="text-align:right">
            <span>
              <strong>
                订单总量：
              </strong>
            </span> 
          </el-col>
          <el-col :span="8">
            <span class="col_r">
              <router-link :to="{ path: '/order/index', query: { tab: 'tab5' }}">
                {{ homeInfo.orderNum !== null ? homeInfo.orderNum : '&nbsp;' }}
              </router-link>
            </span> 
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              <strong>
                销售总额：
              </strong>
            </span> 
          </el-col>
          <el-col :span="8">
            <span class="col_r col_r1">
              ￥{{ homeInfo.totalPrice !== null ? homeInfo.totalPrice : '&nbsp;' }}
            </span> 
          </el-col>
        </el-row>
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
          <el-col :span="4" style="text-align:right">
            <span>
              <strong>
                订单情况：
              </strong>
            </span> 
          </el-col>
          <el-col :span="8">
            <span>
              待发货订单：
              <span class="col_r">
                <router-link :to="{ path: '/order/index', query: { tab: 'tab3' }}">
                  {{ homeInfo.deliveredOrder !== null ? homeInfo.deliveredOrder : '&nbsp;' }}
                </router-link>
              </span>
            </span> 
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              待退货订单：
            </span> 
          </el-col>
          <el-col :span="8">
            <span class="col_r">
              <router-link :to="{ path: '/order/index', query: { tab: 'tab7' }}">
                {{ homeInfo.returnOrder !== null ? homeInfo.returnOrder : '&nbsp;' }}                
              </router-link>              
            </span> 
          </el-col>
        </el-row>
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;margin-bottom:20px">
          <el-col :span="4" style="text-align:right">
            <span>
              <strong>
              商品情况：
              </strong>
            </span> 
          </el-col>
          <el-col :span="8">
            <span>
              在售商品：
              <span class="col_r">        
                <router-link :to="{ path: '/goodsmanage/onsalegoods', query: { tab: 'tab1' }}">
                  {{ homeInfo.sellGoods !== null ? homeInfo.sellGoods : '&nbsp;' }}
                </router-link>                 
              </span>
            </span>
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              缺货商品：
            </span> 
          </el-col>
          <el-col :span="8">
            <span class="col_r">
              <router-link :to="{ path: '/goodsmanage/onsalegoods', query: { tab: 'tab2' }}">
                {{ homeInfo.defectGoods !== null ? homeInfo.defectGoods : '&nbsp;' }}                
              </router-link>                
            </span> 
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import { getHomeInfo } from '@/api/homepage'
  export default {
    data() {
      return {
        deadTime: new Date().toLocaleString(),
        homeInfo: {
          orderNum: '',
          totalPrice: '',
          deliveredOrder: '',
          returnOrder: '',
          sellGoods: '',
          defectGoods: ''
        }
      }
    },
    created() {
      getHomeInfo().then(response => {
        if (response.status === 200) {
          this.homeInfo = response.data
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    }
  }
</script>

<style>
  .col_r {
    color: #ff6600;
  }
  .col_r1 {
    font-size: 16px;
    font-weight: bold;
  }
  .d9 {
    color: #d99e00;
  }
</style>
