<template>
  <div>
    <h3>
      待办待审
    </h3>

  </div>
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
      if (response.state === 200) {
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
