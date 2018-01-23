<template>
  <div class="LocationSelector">
    <el-tree :props="props1" :load="loadNode1" lazy>
    </el-tree>
  </div>
</template>

<script type="text/ecmascript-6">

import { getAllCountries, getAllProvinces, getAllCities, getAllCounties, getAllTowns, getAllVillages } from '@/api/regionselecter'

export default {
  props: {
    grade: {
      type: Number,
      default: 3
    },
    showCountry: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      props1: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      }
    }
  },
  methods: {
    getCountries() {
      return new Promise((resolve, reject) => {
        getAllCountries('-1').then(response => {
          this.countries = response.data.list
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getProvinces() {
      return new Promise((resolve, reject) => {
        getAllProvinces(this.country).then(response => {
          this.provinces = response.data.list
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCities() {
      return new Promise((resolve, reject) => {
        getAllCities(this.province).then(response => {
          this.cities = response.data.list
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCounties() {
      return new Promise((resolve, reject) => {
        getAllCounties(this.city).then(response => {
          this.counties = response.data.list
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getTowns() {
      return new Promise((resolve, reject) => {
        getAllTowns(this.county).then(response => {
          this.towns = response.data.list
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getVillages() {
      return new Promise((resolve, reject) => {
        getAllVillages(this.town).then(response => {
          this.villages = response.data.list
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    countryChanged() {
      this.province = ''
      this.city = ''
      this.county = ''
      this.town = ''
      this.village = ''
      if (this.country !== '') {
        this.getProvinces()
      } else {
        this.provinces = []
      }
      this.cities = []
      this.counties = []
      this.towns = []
      this.villages = []
      this.getRegionCode()
    },
    provinceChanged() {
      this.city = ''
      this.county = ''
      this.town = ''
      this.village = ''
      if (this.province !== '') {
        this.getCities()
      } else {
        this.cities = []
      }
      this.counties = []
      this.towns = []
      this.villages = []
      this.getRegionCode()
    },
    cityChanged() {
      this.county = ''
      this.town = ''
      this.village = ''
      if (this.city !== '') {
        this.getCounties()
      } else {
        this.counties = []
      }
      this.towns = []
      this.villages = []
      this.getRegionCode()
    },
    countyChanged() {
      this.town = ''
      this.village = ''
      if (this.county !== '') {
        this.getTowns()
      } else {
        this.towns = []
      }
      this.villages = []
      this.getRegionCode()
    },
    townChanged() {
      this.village = ''
      if (this.town !== '') {
        this.getVillages()
      } else {
        this.getVillages = []
      }
      this.getRegionCode()
    },
    villageChanged() {
      this.getRegionCode()
    },
    getRegionCode () {
      if (this.village !== '') {
        this.regionCode = this.village
      } else if (this.town !== '') {
        this.regionCode = this.town
      } else if (this.county !== '') {
        this.regionCode = this.county
      } else if (this.city !== '') {
        this.regionCode = this.city
      } else if (this.province !== '') {
        this.regionCode = this.province
      } else if (this.country !== '') {
        this.regionCode = this.country
      } else {
        this.regionCode = ''
      }
      this.$emit('regionCodeChanged', this.regionCode)
    },
    loadNode1(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region' }])
      }
      if (node.level > 1) {
        return resolve([])
      }
      setTimeout(() => {
        const data = [{ name: 'leaf', leaf: true }, { name: 'zone' }]
        resolve(data)
      }, 500)
    }
  }
}
</script>