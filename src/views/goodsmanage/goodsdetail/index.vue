<template>
  <div v-loading="loading" class="content">
    <div class="top-con">
      <div class="inline-block">
        <el-carousel class="banner-con" indicator-position="none">
          <el-carousel-item v-for="item in goodsBean.imageList" :key="item">
            <img :src="item">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    mounted () {
      if (!this.$route.query.goodsId) {
        this.$message.error('something wrong!')
      } else {
        this.getGoodsDetail()
      }
    },
    data() {
      return {
        loading: false,
        goodsBean: {}
      }
    },
    methods: {
      getGoodsDetail() {
        var url = process.env.BASE_API + '/goods/get/' + this.$route.query.goodsId
        this.loading = true
        axios.get(url).then(res => {
          if (res.status === 200) {
            this.loading = false
            this.goodsBean = res.data.data.goodsBean
            console.log(this.goodsBean)
          } else {
            this.loading = false
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style>
  .content{padding: 20px 2%;}
  .banner-con{width: 400px;height: 300px;border: 1px solid #d9d9d9;overflow: hidden;}
  .banner-con img{width: 100%; height: 100%;}
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>