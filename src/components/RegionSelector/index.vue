<template>
  <div class="RegionSelector">
    <el-row :gutter="4">
      <el-col :span="4" v-if="grade >= 1 && showCountry">
        <el-select v-model="country" placeholder="请选择国" clearable filterable v-on:change="countryChanged">
          <el-option v-for="(item, key) in countries" :key="key" :label="item.locationName" :value="item.id"></el-option>
        </el-select>
      </el-col>
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
      <el-col :span="4" v-if="grade >= 5">
        <el-select v-model="town" placeholder="请选择乡镇" clearable filterable v-on:change="townChanged">
          <el-option v-for="(item,key) in towns" :key="key" :label="item.locationName" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="grade >= 6">
        <el-select v-model="village" placeholder="请选择村街道" clearable filterable v-on:change="villageChanged">
          <el-option v-for="(item,key) in villages" :key="key" :label="item.locationName" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    getAllCountries,
    getAllProvinces,
    getAllCities,
    getAllCounties,
    getAllTowns,
    getAllVillages,
    getLocationInfoById
  } from '@/api/regionselecter'

  export default {
    props: {
      grade: {
        type: Number,
        default: 4
      },
      showCountry: {
        type: Boolean,
        default: false
      },
      locationId: {
        type: String,
        default: '0'
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
        locationInfo: {}
      }
    },
    created() {
      if (this.locationId === undefined || this.locationId === '' || this.locationId === '0') {
        this.province = ''
        this.city = ''
        this.county = ''
      } else {
        this.getLocationById(this.locationId)
      }
    },
    mounted() {
      if (this.showCountry) {
        this.getCountries()
      } else {
        // 默认中国
        this.country = '0'
        this.getProvinces()
      }
    },
    watch: {
      locationId: function () {
        if (this.locationId === undefined || this.locationId === '' || this.locationId === '0') {
          this.province = ''
          this.city = ''
          this.county = ''
        } else {
          if (this.locationInfo === undefined || this.locationInfo.id === undefined || this.locationInfo.id.toString() !==
            this.locationId) {
            this.province = ''
            this.city = ''
            this.county = ''
            this.getLocationById(this.locationId)
          }
        }
      }
    },
    methods: {
      getLocationById(locationId) {
        getLocationInfoById(locationId).then(response => {
          if (response.status === 200) {
            var resultData = response.data.list[0]
            switch (resultData.locationLevel) {
              case 5:
                this.village = resultData.id
                getAllVillages(resultData.parentId).then(response => {
                  if (response.status === 200) {
                    this.villages = response.data.list
                    this.getLocationById(resultData.parentId)
                  } else {
                    this.$message.error(response.msg)
                  }
                }).catch(error => {
                  this.$message.error(error)
                })
                break
              case 4:
                this.town = resultData.id
                getAllTowns(resultData.parentId).then(response => {
                  if (response.status === 200) {
                    this.towns = response.data.list
                    this.getLocationById(resultData.parentId)
                  } else {
                    this.$message.error(response.msg)
                  }
                }).catch(error => {
                  this.$message.error(error)
                })
                break
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
              case 0:
                this.country = resultData.id
                getAllCountries(resultData.parentId).then(response => {
                  if (response.status === 200) {
                    this.countries = response.data.list
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
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error)
        })
      },
      getCountries() {
        getAllCountries('-1').then(response => {
          if (response.status === 200) {
            this.countries = response.data.list
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error)
        })
      },
      getProvinces() {
        getAllProvinces(this.country).then(response => {
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
      getTowns() {
        getAllTowns(this.county).then(response => {
          if (response.status === 200) {
            this.towns = response.data.list
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error)
        })
      },
      getVillages() {
        getAllVillages(this.town).then(response => {
          if (response.status === 200) {
            this.villages = response.data.list
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error)
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
        this.getLocationInfo()
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
        this.getLocationInfo()
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
        this.getLocationInfo()
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
        this.getLocationInfo()
      },
      townChanged() {
        this.village = ''
        if (this.town !== '') {
          this.getVillages()
        } else {
          this.getVillages = []
        }
        this.getLocationInfo()
      },
      villageChanged() {
        this.getLocationInfo()
      },
      getLocationInfo() {
        if (this.village !== '') {
          for (let i = 0; i < this.villages.length; i++) {
            if (this.villages[i].id === this.village) {
              this.locationInfo = this.villages[i]
              break
            }
          }
        } else if (this.town !== '') {
          for (let i = 0; i < this.towns.length; i++) {
            if (this.towns[i].id === this.town) {
              this.locationInfo = this.towns[i]
              break
            }
          }
        } else if (this.county !== '') {
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
        } else if (this.country !== '') {
          if (this.showCountry) {
            for (let i = 0; i < this.provinces.length; i++) {
              if (this.provinces[i].id === this.province) {
                this.locationInfo = this.provinces[i]
                break
              }
            }
          } else {
            this.locationInfo = {}
          }
        } else {
          this.locationInfo = {}
        }
        this.$emit('locationChanged', this.locationInfo)
      }
    }
  }

</script>
