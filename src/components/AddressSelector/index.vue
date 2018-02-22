<template>
  <div class="AddressSelector">
    <el-row :gutter="4">
      <el-col :span="4" v-if="grade >= 2">
        <el-select v-model="province" placeholder="请选择省" clearable filterable v-on:change="provinceChanged">
          <el-option v-for="(item, key) in provinces" :key="key" :label="item.locationName" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="grade >= 3">
        <el-select v-model="city" placeholder="请选择市" clearable filterable v-on:change="cityChanged">
          <el-option v-for="(item,key) in cities" :key="key" :label="item.locationName" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="grade >= 4">
        <el-select v-model="county" placeholder="请选择区县" clearable filterable v-on:change="countyChanged">
          <el-option v-for="(item,key) in counties" :key="key" :label="item.locationName" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="10">
        <el-input v-model="detailAddress" clearable placeholder="请输入详细地址"></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">

import { getAllProvinces, getAllCities, getAllCounties, getLocationInfoById, getLocationInfoByCode } from '@/api/regionselecter'

export default {
  props: {
    grade: {
      type: Number,
      default: 4
    },
    locationCode: {
      type: String,
      default: ''
    },
    locationId: {
      type: Number,
      default: 0
    },
    detailAddress: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      province: '',
      city: '',
      county: '',
      provinces: [],
      cities: [],
      counties: [],
      locationInfo: {}
    }
  },
  created () {
    if (this.code !== undefined && this.code !== '') {
      // 根据locationCode获取区域信息
      this.getLocationByCode(this.code)
    } else if (this.locationId !== undefined && this.locationId !== '') {
      // 根据id获取区域信息
      this.getLocationById(this.locationId)
    }
  },
  mounted () {
    // 默认中国
    this.getProvinces()
  },
  methods: {
    getLocationByCode (locationCode) {
      return new Promise((resolve, reject) => {
        getLocationInfoByCode(locationCode).then(response => {
          var resultData = response.data.list[0]
          this.getLocationById(resultData.id).then(response => {
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        }).catch(error => {
          console.log(error)
        })
      })
    },
    getLocationById (locationId) {
      return new Promise((resolve, reject) => {
        getLocationInfoById(locationId).then(response => {
          var resultData = response.data.list[0]
          switch (resultData.locationLevel) {
            case 3:
              this.county = resultData.id
              getAllCounties(resultData.parentId).then(response => {
                this.counties = response.data.list
                this.getLocationById(resultData.parentId)
              }).catch(error => {
                console.log(error)
              })
              break
            case 2:
              this.city = resultData.id
              getAllCities(resultData.parentId).then(response => {
                this.cities = response.data.list
                this.getLocationById(resultData.parentId)
              }).catch(error => {
                console.log(error)
              })
              break
            case 1:
              this.province = resultData.id
              getAllProvinces(resultData.parentId).then(response => {
                this.provinces = response.data.list
                this.getLocationById(resultData.parentId)
              }).catch(error => {
                console.log(error)
              })
              break
            default:
              break
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    getProvinces() {
      return new Promise((resolve, reject) => {
        getAllProvinces('0').then(response => {
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
    provinceChanged() {
      this.city = ''
      this.county = ''
      if (this.province !== '') {
        this.getCities()
      } else {
        this.cities = []
      }
      this.counties = []
      this.getLocationInfo()
    },
    cityChanged() {
      this.county = ''
      if (this.city !== '') {
        this.getCounties()
      } else {
        this.counties = []
      }
      this.getLocationInfo()
    },
    countyChanged() {
      this.getLocationInfo()
    },
    getLocationInfo () {
      if (this.county !== '') {
        for (let i = 0; i < this.counties.length; i++) {
          if (this.counties[i].id === this.county) {
            this.locationInfo = this.counties[i]
            break
          }
        }
      } else if (this.city !== '') {
        for (let i = 0; i < this.cities.length; i++) {
          if (this.cities[i].id === this.city) {
            this.locationInfo = this.cities[i]
            break
          }
        }
      } else if (this.province !== '') {
        for (let i = 0; i < this.provinces.length; i++) {
          if (this.provinces[i].id === this.province) {
            this.locationInfo = this.provinces[i]
            break
          }
        }
      } else {
        this.locationInfo = {}
      }
      this.locationInfo.detailAddress = this.detailAddress
      this.$emit('addressChanged', this.locationInfo)
    }
  }
}
</script>