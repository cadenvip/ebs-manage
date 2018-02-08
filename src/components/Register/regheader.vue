<template>
  <div class="header">
    <div class="logo">
      <img :src="logo" width="512" height="70">
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo/logo.png'

export default {
  data () {
    return {
      logo
    }
  }
}
</script>

<style>
  .header {
      height: 70px;
      background-color: #f1f1f1;
      border-bottom: #e5e5e5 solid 1px;
  }
  .logo {
      width: 960px;
      margin: 0 auto;
  }
</style>