<template>
  <el-container style="min-width: 800px;">
    <el-header>
      <el-steps :active="3" simple>
        <el-step title="选择类别" icon="el-icon-document"></el-step>
        <el-step title="填写商品详情" icon="el-icon-edit"></el-step>
        <el-step title="提交入库" icon="el-icon-upload"></el-step>
        <el-step title="审核上架" icon="el-icon-circle-check-outline"></el-step>
      </el-steps>
    </el-header>
    <el-main>
      <div>
        <p class="congratulation">恭喜！商品已经提交成功！如立即进行销售，审核需要30分钟，请耐心等待。</p>
        <div class="btn-list">
          <div class="mt10">
            <span>商品已成功入库，查看请前往</span>
            <el-button type="success" size="mini" @click="goNoShelf">未上架商品</el-button>
          </div>
          <div class="mt10">
            <span>查看已发布商品，请前往</span>
            <el-button type="success" size="mini" @click="goOnSale">销售中商品</el-button>
          </div>
          <div class="mt10">
            <span>还可以</span>
            <el-button type="success" size="mini" @click="goPublic">继续发布</el-button>
          </div>
        </div>
      </div>
    </el-main>
    
  </el-container>
</template>
<script>
  export default {
    methods: {
      goNoShelf() {
        this.$router.push({ path: '/goodsmanage/noshelfgoods' })
      },
      goOnSale() {
        this.$router.push({ path: '/goodsmanage/onsalegoods' })
      },
      goPublic() {
        this.$router.push({ path: '/goodsmanage/publishgoods' })
      }
    }
  }
</script>
<style scoped>
  .app-main{
    min-width: 1000px;
  }
  .mt10{
    margin-top: 10px;
  }
  .congratulation{
    text-align: center;
    color: #f30;
    font-size: 14px;
  }
  .el-main{
    background: url(./images/step3-bg.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .btn-list{
    width: 60%;
    display: inline-block;
    text-align: right;
  }
  .btn-list span{
    color: #656565;
    font-size: 12px;
  }
</style>
