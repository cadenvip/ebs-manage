<template>
  <div class="app-container">
    <h4 class="title">角色信息详情</h4>
    <div style="color: #606266;font-size:14px;width:960px;overflow:auto;">
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
        <el-col :span="4" style="text-align:right">
          <span>
            角色名称：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ roleForm.rolename }}
          </span>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            角色类型：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ formatRoleType }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
        <el-col :span="4" style="text-align:right">
          <span>
            是否隐藏：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ roleForm.ishidden === '1' ? '是' : '否' }}
          </span>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            角色描述：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ roleForm.description }}
          </span>
        </el-col>
      </el-row>
    </div>
    <el-tree style="text-align:center;margin-top:20px;margin-left:320px" :data="data" show-checkbox node-key="id" :highlight-current="true"
      :default-expand-all="false" :props="defaultProps" v-loading="loading" ref="tree">
    </el-tree>
    <br/>
    <div style="text-align: center">
      <el-button type="primary" @click="onCancel">返回</el-button>
    </div>
  </div>
</template>

<script>
  import {
    getRoleDetail
  } from '@/api/role'
  import {
    getAllResources
  } from '@/api/authentication'

  export default {
    data() {
      return {
        roleForm: {
          id: this.$route.query.id,
          rolename: '',
          roletype: '',
          ishidden: false,
          description: '',
          resourceids: []
        },
        data: [],
        resources: [],
        filterText: '',
        defaultProps: {
          id: '',
          label: 'label',
          children: 'children',
          parentId: ''
        },
        loading: false
      }
    },
    created() {
      this.getRoleInfo()
    },
    computed: {
      formatRoleType: function () {
        var type = ''
        switch (this.roleForm.roletype) {
          case '1':
            type = '管理角色'
            break
          case '2':
            type = '商家角色'
            break
          case '3':
            type = '商家角色'
            break
          default:
            type = ''
            break
        }
        return type
      }
    },
    methods: {
      getRoleInfo() {
        getRoleDetail(this.$route.query.id).then(response => {
          if (response.status === 200) {
            this.roleForm.rolename = response.data.rolename
            this.roleForm.roletype = response.data.roletype
            this.roleForm.ishidden = response.data.ishidden === '1'
            this.roleForm.description = response.data.description
            if (response.data.resourceids !== null && response.data.resourceids !== '') {
              this.roleForm.resourceids = response.data.resourceids.split(',')
            }
            this.getAllPermissions()
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      getAllPermissions() {
        this.data = []
        var issystem = ''
        // 1系统管理 2企业 （roletype: 1----> issystem: 1, roletype: 2(2)---->issystem: 0)
        if (this.roleForm.roletype === '1') {
          issystem = 0
        } else {
          issystem = 1
        }
        this.loading = true
        getAllResources(issystem).then(response => {
          if (response.status === 200) {
            var aliveResources = []
            response.data.forEach(v => {
              v.disabled = true
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
              this.resources.push(v)
              if (v.status === 0) {
                // status: 0-激活，1-禁用（激活后页面可见，功能可用）
                aliveResources.push(v)
              }
            })
            // 只要子节点展示，则父节点要展示
            for (let k = 0; k < aliveResources.length; k++) {
              let m = 0
              for (; m < aliveResources.length; m++) {
                if (aliveResources[k].parentid === aliveResources[m].id) {
                  aliveResources[m].status = 0
                  break
                }
              }
              if (m === aliveResources.length) {
                let n = 0
                for (; n < this.resources.length; n++) {
                  if (this.resources[n].id === aliveResources[k].parentid) {
                    this.resources[n].status = 0
                    aliveResources.push(this.resources[n])
                    break
                  }
                }
              }
            }
            // 排序（id从小到）
            aliveResources.sort(this.compare('id'))
            // 整理数据
            this.data = this.list2Tree(aliveResources, {
              'idKey': 'id',
              'parentKey': 'parentid',
              'childrenKey': 'children'
            })
            // 设置选中
            this.$refs.tree.setCheckedKeys(this.roleForm.resourceids)
            this.loading = false
          } else {
            this.$message.error(response.msg)
          }
        }).catch(error => {
          this.loading = false
          this.$message.error(error.msg)
        })
      },
      compare(property) {
        return function (a, b) {
          var value1 = a[property]
          var value2 = b[property]
          return value1 - value2
        }
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
      onCancel() {
        this.$router.go(-1)
      }
    }
  }

</script>

<style scoped>
  .line {
    text-align: center;
  }

</style>
