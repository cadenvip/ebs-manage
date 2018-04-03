<template>
  <div class="app-container">
    <h4 class="title">区域管理</h4>
    <locationselector v-model="locationid" :grade="3" v-on:regionCodeChanged="getRegionCode" :showCountry="false"></locationselector>
  </div>
</template>

<script>
  import locationselector from '@/components/LocationSelector/index'

  export default {
    data() {
      return {
        locationid: ''
      }
    },
    components: {
      locationselector
    },
    methods: {
      getRegionCode: function (data) {
        this.regioncode = data
      }
    }
  }

</script>
