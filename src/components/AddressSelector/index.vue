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
        <el-input v-model="town_village" clearable placeholder="请输入详细地址" @blur="town_villageChanged"></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">

import { getAllProvinces, getAllCities, getAllCounties, getLocationInfoById } from '@/api/regionselecter'

export default {
  props: {
    grade: {
      type: Number,
      default: 4
    },
    locationId: {
      type: String,
      default: '0'
    },
    detailAddress: {
      type: String,
      default: ''
    },
    index: {
      Number,
      default: -1
    }
  },
  data: function () {
    return {
      province: '',
      city: '',
      county: '',
      town_village: this.detailAddress,
      provinces: [],
      cities: [],
      counties: [],
      locationInfo: {}
    }
  },
  created () {
    if (this.locationId === undefined || this.locationId === '' || this.locationId === '0') {
      this.province = ''
      this.city = ''
      this.county = ''
    } else {
      this.getLocationById(this.locationId)
    }
  },
  mounted () {
    // 默认中国
    this.getProvinces()
  },
  watch: {
    locationId: function() {
      if (this.locationId === undefined || this.locationId === '' || this.locationId === '0') {
        this.province = ''
        this.city = ''
        this.county = ''
      } else {
        if (this.locationInfo === undefined || this.locationInfo.id === undefined || this.locationInfo.id.toString() !== this.locationId) {
          this.province = ''
          this.city = ''
          this.county = ''
          this.getLocationById(this.locationId)
        }
      }
    },
    detailAddress: function () {
      this.town_village = this.detailAddress
    }
  },
  methods: {
    getLocationById (locationId) {
      getLocationInfoById(locationId).then(response => {
        if (response.status === 200) {
          var resultData = response.data.list[0]
          if (resultData !== undefined) {
            switch (resultData.locationLevel) {
              case 3:
                this.county = resultData.id
                getAllCounties(resultData.parentId).then(response => {
                  if (response.status === 200) {
                    this.counties = response.data.list
                    this.getLocationById(resultData.parentId)
                  } else {
                    this.$message.error(response.msg)
                  }
                }).catch(error => {
                  this.$message.error(error)
                })
                break
              case 2:
                this.city = resultData.id
                getAllCities(resultData.parentId).then(response => {
                  if (response.status === 200) {
                    this.cities = response.data.list
                    this.getLocationById(resultData.parentId)
                  } else {
                    this.$message.error(response.msg)
                  }
                }).catch(error => {
                  this.$message.error(error)
                })
                break
              case 1:
                this.province = resultData.id
                getAllProvinces(resultData.parentId).then(response => {
                  if (response.status === 200) {
                    this.provinces = response.data.list
                    this.getLocationById(resultData.parentId)
                  } else {
                    this.$message.error(response.msg)
                  }
                }).catch(error => {
                  this.$message.error(error)
                })
                break
              default:
                break
            }
          }
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    getProvinces() {
      getAllProvinces('0').then(response => {
        if (response.status === 200) {
          this.provinces = response.data.list
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    getCities() {
      getAllCities(this.province).then(response => {
        if (response.status === 200) {
          this.cities = response.data.list
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    getCounties() {
      getAllCounties(this.city).then(response => {
        if (response.status === 200) {
          this.counties = response.data.list
        } else {
          this.$message.error(response.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    provinceChanged() {
      this.city = ''
      this.county = ''
      this.town_village = ''
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
      this.town_village = ''
      if (this.city !== '') {
        this.getCounties()
      } else {
        this.counties = []
      }
      this.getLocationInfo()
    },
    countyChanged() {
      this.town_village = ''
      this.getLocationInfo()
    },
    town_villageChanged() {
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
      if (this.locationInfo !== undefined) {
        this.locationInfo.town_village = this.town_village
      }
      this.locationInfo.index = this.index
      this.$emit('addressChanged', this.locationInfo)
    }
  }
}
</script>