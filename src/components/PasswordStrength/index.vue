<template>
  <div>
    <el-rate
      v-model="score"
      disabled
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
      show-text
      :texts="['非常低', '低', '中', '高', '非常高']">
    </el-rate>
  </div>
</template>

<script type="text/ecmascript-6">
  import { containDigit, containLowerCase, containUpperCase, containSymbol } from '@/utils/validate'

  export default {
    props: {
      password: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        score: 0,
        containDigit: 0,
        containLowerCase: 0,
        containUpperCase: 0,
        containSymbol: 0,
        lengthLarger8: 0
      }
    },
    watch: {
      password: function () {
        this.containDigit = containDigit(this.password) ? 1 : 0
        this.containLowerCase = containLowerCase(this.password) ? 1 : 0
        this.containUpperCase = containUpperCase(this.password) ? 1 : 0
        this.containSymbol = containSymbol(this.password) ? 1 : 0
        this.lengthLarger8 = this.password.length >= 8 ? 1 : 0
        this.score = this.containDigit + this.containLowerCase + this.containUpperCase + this.containSymbol + this.lengthLarger8
        this.$emit('scoreChanged', this.score)
      }
    }
  }
</script>