<template>
  <div class="app-container">
    <h3 class="title">授权管理</h3>
    <authenticator></authenticator>
  </div>
</template>

<script>

import authenticator from '@/components/authentication/index'

export default {
  components: {
    authenticator
  }
}
</script>