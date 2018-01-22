<template>
  <div class="RegionSelector">
    <el-row :gutter="4">
      <el-col :span="3" v-if="grade >= 1 && showCountry">
        <el-select v-model="country" placeholder="请选择国" clearable filterable v-on:change="countryChanged">
          <el-option v-for="item in countries" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" v-if="grade >= 2">
        <el-select v-model="province" placeholder="请选择省" clearable filterable v-on:change="provinceChanged">
          <el-option v-for="item in provinces" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" v-if="grade >= 3">
        <el-select v-model="city" placeholder="请选择市" clearable filterable v-on:change="cityChanged">
          <el-option v-for="item in cities" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" v-if="grade >= 4">
        <el-select v-model="county" placeholder="请选择县" clearable filterable v-on:change="countyChanged">
          <el-option v-for="item in counties" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" v-if="grade >= 5">
        <el-select v-model="town" placeholder="请选择镇" clearable filterable v-on:change="townChanged">
          <el-option v-for="item in towns" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3" v-if="grade >= 6">
        <el-select v-model="village" placeholder="请选择村" clearable filterable v-on:change="villageChanged">
          <el-option v-for="item in villages" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
    </el-row>
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
      country: '',
      province: '',
      city: '',
      county: '',
      town: '',
      village: '',
      countries: [],
      provinces: [],
      cities: [],
      counties: [],
      towns: [],
      villages: [],
      regionCode: '0000000000'
    }
  },
  mounted () {
    if (this.showCountry) {
      this.getCountries()
    } else {
      this.getProvinces()
    }
  },
  methods: {
    getCountries() {
      this.countries = [{ value: '选项1', label: '黄金糕' }, { value: '选项2', label: '玉米糕' }]
      return new Promise((resolve, reject) => {
        getAllCountries(this.regionCode).then(response => {
          // this.countries = response.data
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getProvinces() {
      this.provinces = [{ value: '选项1', label: '黄金糕' }, { value: '选项2', label: '玉米糕' }]
      return new Promise((resolve, reject) => {
        getAllProvinces(this.regionCode).then(response => {
          // this.provinces = response.data
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCities() {
      this.cities = [{ value: '选项1', label: '黄金糕' }, { value: '选项2', label: '玉米糕' }]
      return new Promise((resolve, reject) => {
        getAllCities(this.regionCode).then(response => {
          // this.cities = response.data
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCounties() {
      this.counties = [{ value: '选项1', label: '黄金糕' }, { value: '选项2', label: '玉米糕' }]
      return new Promise((resolve, reject) => {
        getAllCounties(this.regionCode).then(response => {
          // this.counties = response.data
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getTowns() {
      this.towns = [{ value: '选项1', label: '黄金糕' }, { value: '选项2', label: '玉米糕' }]
      return new Promise((resolve, reject) => {
        getAllTowns(this.regionCode).then(response => {
          // this.towns = response.data
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getVillages() {
      this.villages = [{ value: '选项1', label: '黄金糕' }, { value: '选项2', label: '玉米糕' }]
      return new Promise((resolve, reject) => {
        getAllVillages(this.regionCode).then(response => {
          // this.villages = response.data
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
        this.regionCode = '0000000000'
        this.$emit('regionCodeChanged', this.regionCode)
      }
    }
  }
}
</script>