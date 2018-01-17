<template>
  <div class="jieti">
        <span>一次性购买 </span><el-input v-model="item.num" size="mini" style="width: 80px;"></el-input><span> 件,商品价格优惠为</span>
        <el-input v-model="item.dollar" size="mini" style="width: 80px;"></el-input> 元  
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      item: {
        type: Object
      }
    }
  }
</script>
<style>
.jieti {display: inline-block;margin-top: 15px;}
</style>

