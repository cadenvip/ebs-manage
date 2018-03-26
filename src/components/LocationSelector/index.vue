

<template>
  <div class="LocationSelector">
    <el-row :gutter="6">
      <el-col :span="10" :offset="6">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click.native.prevent="queryLocationName">查询</el-button>
      </el-col>
    </el-row>
    <br/>
    <div v-show="showLazyTree" class="Tree">
      <el-tree
        lazy
        :highlight-current="true"
        :load="loadNode"
        :props="defaultProps"
        @node-click="handleNodeClick"
        ref="lazyTree">
      </el-tree>
    </div>
    <div v-show="showQueryResult" class="Tree">
      <el-tree
        :data="data"
        :load="loadNode"
        :highlight-current="true"
        :default-expand-all="true"
        :props="defaultProps"
        @node-click="handleNodeClick"
        v-loading="loading"
        ref="resultTree">
      </el-tree>
    </div>
  </div>
</template>

<script>

  import { // getAllCountries
    getAllProvinces,
    getAllCities,
    getAllCounties,
    getAllTowns,
    getAllVillages,
    queryLocationName,
    getParentInfo
  } from '@/api/regionselecter'

  export default {
    data() {
      return {
        showLazyTree: true,
        showQueryResult: false,
        data: [],
        arrProvinces: [],
        arrCities: [],
        arrCounties: [],
        arrTowns: [],
        arrVillages: [],
        filterText: '',
        defaultProps: {
          id: '',
          label: 'label',
          children: 'children',
          parentId: '',
          locationCode: '',
          locationLevel: ''
        },
        loading: false
      }
    },
    methods: {
      handleNodeClick(data) {
        this.$emit('locationSelected', data)
      },
      queryLocationName() {
        // 切换树
        this.filterText = this.filterText.trim()
        if (this.filterText === '') {
          this.showLazyTree = true
          this.showQueryResult = false
          return
        } else {
          this.showLazyTree = false
          this.showQueryResult = true
        }

        this.data = []
        this.arrProvinces = []
        this.arrCities = []
        this.arrCounties = []
        this.arrTowns = []
        this.arrVillages = []
        this.loading = true
        queryLocationName(this.filterText).then(response => {
          if (response.status === 200) {
            if (response.data.list.length === 0) {
              this.loading = false
              return
            }
            response.data.list.forEach(v => {
              v.label = v.locationName
              if (v.locationLevel === 1) {
                this.arrProvinces.push(v)
              } else if (v.locationLevel === 2) {
                this.arrCities.push(v)
              } else if (v.locationLevel === 3) {
                this.arrCounties.push(v)
              } else if (v.locationLevel === 4) {
                this.arrTowns.push(v)
              } else if (v.locationLevel === 5) {
                this.arrVillages.push(v)
              }
            })
            this.getTowns().then(() => {
              this.getCounties().then(() => {
                this.getCities().then(() => {
                  this.getProvinces().then(() => {
                    this.arrTowns = this.removeDuplicatedItem(this.arrTowns)
                    this.arrCounties = this.removeDuplicatedItem(this.arrCounties)
                    this.arrCities = this.removeDuplicatedItem(this.arrCities)
                    this.arrProvinces = this.removeDuplicatedItem(this.arrProvinces)
                    var dataTemp = [{ 'id': 0, 'locationName': '全国', 'locationCode': '100', 'lastLevelCode': '',
                      'parentId': -1, 'locationLevel': 0, 'description': '中国', 'orderindex': '', 'locationLevelName': '', 'label': '全国' }]
                    dataTemp.push.apply(dataTemp, this.arrProvinces)
                    dataTemp.push.apply(dataTemp, this.arrCities)
                    dataTemp.push.apply(dataTemp, this.arrCounties)
                    dataTemp.push.apply(dataTemp, this.arrTowns)
                    dataTemp.push.apply(dataTemp, this.arrVillages)
                    for (var i = 0; i < dataTemp.length; i++) {
                      delete dataTemp[i].lastLevelCode
                      delete dataTemp[i].locationLevelName
                      delete dataTemp[i].orderindex
                      // delete dataTemp[i].locationCode
                      // delete dataTemp[i].locationLevel
                      delete dataTemp[i].description
                      delete dataTemp[i].locationName
                    }
                    this.data = this.list2Tree(dataTemp, { 'idKey': 'id', 'parentKey': 'parentId', 'childrenKey': 'children' })
                    this.loading = false
                  })
                })
              })
            })
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.loading = false
          this.$message.error(error)
        })
      },
      getTowns() {
        const villagePromises = this.arrVillages.map(village => {
          return getParentInfo(village.parentId, 4).then(response => {
            if (response.status === 200) {
              for (var j = 0; j < response.data.list.length; j++) {
                response.data.list[j].label = response.data.list[j].locationName
                this.arrTowns.push(response.data.list[j])
              }
            } else {
              this.$message.error(response.msg)
            }
          })
        })
        return Promise.all(villagePromises)
      },
      getCounties() {
        const townPromises = this.arrTowns.map(town => {
          return getParentInfo(town.parentId, 3).then(response => {
            if (response.status === 200) {
              for (var j = 0; j < response.data.list.length; j++) {
                response.data.list[j].label = response.data.list[j].locationName
                this.arrCounties.push(response.data.list[j])
              }
            } else {
              this.$message.error(response.msg)
            }
          })
        })
        return Promise.all(townPromises)
      },
      getCities() {
        const countyPromises = this.arrCounties.map(county => {
          return getParentInfo(county.parentId, 2).then(response => {
            if (response.status === 200) {
              for (var j = 0; j < response.data.list.length; j++) {
                response.data.list[j].label = response.data.list[j].locationName
                this.arrCities.push(response.data.list[j])
              }
            } else {
              this.$message.error(response.msg)
            }
          })
        })
        return Promise.all(countyPromises)
      },
      getProvinces() {
        const cityPromises = this.arrCities.map(city => {
          return getParentInfo(city.parentId, 1).then(response => {
            if (response.status === 200) {
              for (var j = 0; j < response.data.list.length; j++) {
                response.data.list[j].label = response.data.list[j].locationName
                this.arrProvinces.push(response.data.list[j])
              }
            } else {
              this.$message.error(response.msg)
            }
          })
        })
        return Promise.all(cityPromises)
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ label: '全国', id: '0', 'parentId': '-1', 'locationCode': '100', 'locationLevel': '0' }])
        }
        // if (node.level === 1) {
        //   getAllCountries('-1').then(response => {
        //     if (response.status === 200) {
        //       var arrCountries = []
        //       response.data.list.forEach(function(v) {
        //         arrCountries.push({ 'id': v.id, 'label': v.locationName, 'parent': v.parentId })
        //         return resolve(arrCountries)
        //       })
        //     } else {
        //       this.$message.error(response.msg)
        //     }
        //   }).catch(error => {
        //     this.$message.error(error)
        //   })
        //   return resolve([])
        // }
        if (node.level === 1) {
          getAllProvinces(node.data.id).then(response => {
            if (response.status === 200) {
              var arrProvinces = []
              response.data.list.forEach(function(v) {
                arrProvinces.push({ 'id': v.id, 'label': v.locationName, 'parent': v.parentId, 'locationCode': v.locationCode, 'locationLevel': v.locationLevel })
                return resolve(arrProvinces)
              })
            } else {
              this.$message.error(response.msg)
              return resolve([])
            }
          }).catch(error => {
            this.$message.error(error)
          })
          return resolve([])
        }
        if (node.level === 2) {
          getAllCities(node.data.id).then(response => {
            if (response.status === 200) {
              var arrCities = []
              response.data.list.forEach(function(v) {
                arrCities.push({ 'id': v.id, 'label': v.locationName, 'parent': v.parentId, 'locationCode': v.locationCode, 'locationLevel': v.locationLevel })
                return resolve(arrCities)
              })
            } else {
              this.$message.error(response.msg)
              return resolve([])
            }
          }).catch(error => {
            this.$message.error(error)
          })
          return resolve([])
        }
        if (node.level === 3) {
          getAllCounties(node.data.id).then(response => {
            if (response.status === 200) {
              var arrCounties = []
              response.data.list.forEach(function(v) {
                arrCounties.push({ 'id': v.id, 'label': v.locationName, 'parent': v.parentId, 'locationCode': v.locationCode, 'locationLevel': v.locationLevel })
                return resolve(arrCounties)
              })
            } else {
              this.$message.error(response.msg)
              return resolve([])
            }
          }).catch(error => {
            this.$message.error(error)
          })
          return resolve([])
        }
        if (node.level === 4) {
          getAllTowns(node.data.id).then(response => {
            if (response.status === 200) {
              var arrTowns = []
              response.data.list.forEach(function(v) {
                arrTowns.push({ 'id': v.id, 'label': v.locationName, 'parent': v.parentId, 'locationCode': v.locationCode, 'locationLevel': v.locationLevel })
                return resolve(arrTowns)
              })
            } else {
              this.$message.error(response.msg)
              return resolve([])
            }
          }).catch(error => {
            this.$message.error(error)
          })
          return resolve([])
        }
        if (node.level === 5) {
          getAllVillages(node.data.id).then(response => {
            if (response.status === 200) {
              var arrVillages = []
              response.data.list.forEach(function(v) {
                arrVillages.push({ 'id': v.id, 'label': v.locationName, 'parent': v.parentId, 'locationCode': v.locationCode, 'locationLevel': v.locationLevel })
                return resolve(arrVillages)
              })
            } else {
              this.$message.error(response.msg)
              return resolve(arrVillages)
            }
          }).catch(error => {
            this.$message.error(error)
          })
          return resolve([])
        }
        if (node.level > 6) {
          return resolve([])
        }
        resolve([])
      },
      removeDuplicatedItem(ar) {
        var ret = []
        for (var i = 0, j = ar.length; i < j; i++) {
          if (ret.indexOf(ar[i]) === -1) {
            ret.push(ar[i])
          }
        }
        return ret
      },
      list2Tree(arr, options) {
        options = options || {}
        var ID_KEY = options.idKey || 'id'
        var PARENT_KEY = options.parentKey || 'parent'
        var CHILDREN_KEY = options.childrenKey || 'children'

        var tree = []
        var childrenOf = {}
        var item, id, parent

        for (var i = 0, length = arr.length; i < length; i++) {
          item = arr[i]
          id = item[ID_KEY]
          parent = item[PARENT_KEY] || 0
          // every item may have children
          childrenOf[id] = childrenOf[id] || []
          // init its children
          item[CHILDREN_KEY] = childrenOf[id]
          if (parent !== -1) {
            // init its parent's children
            childrenOf[parent] = childrenOf[parent] || []
            // push it into its parent's children
            childrenOf[parent].push(item)
          } else {
            tree.push(item)
          }
        }
        return tree
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .Tree {
    margin-left: 20px;
    height: 400px;
    overflow-x: auto
  }
</style>