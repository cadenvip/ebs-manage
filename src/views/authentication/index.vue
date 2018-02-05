<template>
  <div class="Authenticater" style="margin: 20px">
    <h3 class="title">授权管理</h3>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :highlight-current="true"
      :default-expand-all="false"
      :props="defaultProps"
      v-loading="loading"
      ref="tree">
    </el-tree>
    <br/>
    <div class="buttons" >
      <!-- <el-button type="primary" @click="getCheckedNodes">提交</el-button> -->
      <el-button type="primary" @click="submitSelected">提交</el-button>
      <el-button type="primary" @click="resetChecked">清空</el-button>
    </div>
  </div>
</template>

<script>
  // import store from '../../store'
  import { getAllResources, givePermission } from '@/api/authentication'

  export default {
    data() {
      return {
        data: [],
        aliveResources: [],
        defaultCheckedKeys: [],
        filterText: '',
        defaultProps: {
          id: '',
          label: 'label',
          children: 'children',
          parentid: ''
        },
        loading: false
      }
    },
    mounted () {
      this.getAllPermissions()
    },
    methods: {
      getAllPermissions() {
        this.loading = true
        return new Promise((resolve, reject) => {
          // console.log(store.getters.userinfos)
          // 1系统管理 2企业 （roletype: 1----> issystem: 0, roletype: 2---->issystem: 1)
          getAllResources(1).then(response => {
            response.data.forEach(v => {
              v.label = v.name
              delete v.type
              delete v.url
              delete v.permission
              delete v.ordernum
              delete v.createdate
              delete v.statusdate
              delete v.isdisplay
              delete v.image
              delete v.typestr
              delete v.rootNode
              this.aliveResources.push(v)
              if (v.status === 0) {
              // status: 0-激活，1-禁用（激活后页面可见，功能可用）
                this.defaultCheckedKeys.push(v.id)
              }
            })

            // 整理数据
            // 如果有id=-1的根目录，则删除
            console.log(this.aliveResources[0])
            this.data = this.list2Tree(this.aliveResources, { 'idKey': 'id', 'parentKey': 'parentid', 'childrenKey': 'children' })
            // 设置选中
            this.$refs.tree.setCheckedKeys(this.defaultCheckedKeys)
            this.loading = false
            resolve(response)
          }).catch(error => {
            this.loading = false
            reject(error)
          })
        })
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
          // 顶层节点
          if (parent !== 0) {
            // init its parent's children
            childrenOf[parent] = childrenOf[parent] || []
            // push it into its parent's children
            childrenOf[parent].push(item)
          } else {
            tree.push(item)
          }
        }
        return tree
      },
      submitSelected() {
        var checkedKeys = this.$refs.tree.getCheckedKeys()
        console.log(checkedKeys)
        var changedKeys = []
        // 对比前后状态
        for (let i = 0; i < this.defaultCheckedKeys.length; i++) {
          let j = 0
          for (; j < checkedKeys.length; j++) {
            if (this.defaultCheckedKeys[i] === checkedKeys[j]) {
              break
            }
          }
          if (j === checkedKeys.length) {
            // 选中变为未选中
            changedKeys.push({ 'id': `${this.defaultCheckedKeys[i]}`, 'status': '1' })
          }
        }
        for (let i = 0; i < checkedKeys.length; i++) {
          let j = 0
          for (; j < this.defaultCheckedKeys.length; j++) {
            if (checkedKeys[i] === this.defaultCheckedKeys[j]) {
              break
            }
          }
          if (j === this.defaultCheckedKeys.length) {
            // 未选中变为选中
            changedKeys.push({ 'id': `${checkedKeys[i]}`, 'status': '0' })
          }
        }
        // 提交状态变化的项
        console.log(changedKeys)
        givePermission(changedKeys).then(response => {
          this.$message({ type: 'success', message: '授权成功!' })
          // 更新
          this.defaultCheckedKeys = checkedKeys
        }).catch(error => {
          this.$message({ type: 'error', message: '授权失败!' })
          console.log(error)
        })
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([])
      }
    }
  }
</script>