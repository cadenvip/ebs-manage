<template>
  <div style="padding: 40px;">
    <h1 style="font-size: 15px; font-weight: bold;">基础信息</h1>
    <div class="detail">
      <p>商品分类名称：<span>{{detailObj.caption}}</span></p>
      <p>上级商品分类：<span>{{detailObj.parentCaption}}</span></p>
      <p>商品分类编码：<span>{{detailObj.csid}}</span></p>
      <p>商品分类等级：<span>{{detailObj.cLevel}}级</span></p>
      <p>商品分类描述：<span>{{detailObj.cDesc}}</span></p>
    </div>
    <div>
      <el-button @click="goBack" style="margin-left: 30%; margin-top: 20px;">返 回</el-button>
    </div>
  </div>
</template>

<script>
  import { getCategoryDetail } from '@/api/goodstype'
  export default {
    created() {
      this.csid = this.$route.query.csid
      getCategoryDetail.get(this.csid).then(res => {
        if (res.data.status === 200) {
          this.detailObj = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    data() {
      return {
        detailObj: {}
      }
    },
    methods: {
      goBack() {
        this.$router.push({ path: '/goodstypemanage/index' })
      }
    }
  }
</script>

<style scoped>
.detail{
  width: 80%;
  padding: 15px 20px;
  border: 1px solid #E6E6E6;
}
.detail p {
  color: #5e5e66;
  font-size: 14px;
}
</style>
