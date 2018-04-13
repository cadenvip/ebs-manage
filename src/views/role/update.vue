<template>
  <div class="app-container">
    <h4 class="title">修改角色</h4>
    <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
      <el-form-item label="角色名称：" prop="rolename">
        <el-input v-model="roleForm.rolename" :maxlength=16 clearable style="width: 400px;" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色类型：" prop="roletype">
        <el-select v-model="roleForm.roletype" clearable disabled placeholder="请选择" style="width: 200px;" @change="getAllPermissions">
          <el-option label="管理角色" value="1"></el-option>
          <el-option label="商家角色" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否隐藏：" prop="ishidden">
        <el-switch v-model="roleForm.ishidden"></el-switch>
      </el-form-item>
      <el-form-item label="角色描述：" prop="description">
        <el-input type="textarea" v-model="roleForm.description" :maxlength=100 style="width: 600px;" placeholder="请输入角色描述"></el-input>
        <p>剩余字数:
          <span style="color:red;">{{getDescLen}}</span>
        </p>
      </el-form-item>
      <el-form-item label="权限绑定：" prop="resourceids">
        <el-tree :data="data" show-checkbox node-key="id" :highlight-current="true" :default-expand-all="false" :props="defaultProps"
          v-loading="loading" ref="tree">
        </el-tree>
      </el-form-item>
      <br/>
      <div style="text-align: center;font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #f30">
        <span>
          温馨提示：系统角色由系统初始化生成，管理员只能新增自定义角色
        </span>
      </div>
      <br/>
      <div style="text-align: center">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button type="primary" @click="onCancel">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {
    getRoleDetail,
    updateRole
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
        rules: {
          rolename: [{
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }],
          roletype: [{
            required: true,
            message: '请选择角色类型',
            trigger: 'blur'
          }],
          description: [{
            required: false,
            message: '请输入角色描述',
            trigger: 'blur'
          }]
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
      getDescLen() {
        if (this.roleForm.description) {
          return (100 - this.roleForm.description.length) < 0 ? 0 : (100 - this.roleForm.description.length)
        } else {
          return 100
        }
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
      onSubmit() {
        this.$refs.roleForm.validate(valid => {
          if (valid) {
            var checkedKeys = this.$refs.tree.getCheckedKeys()
            this.roleForm.resourceids = checkedKeys.join(',')
            if (this.roleForm.description === null) {
              this.roleForm.description = ''
            }
            updateRole(this.roleForm).then(response => {
              if (response.status === 200) {
                this.$message.success('更新角色成功！')
                this.$router.go(-1)
              } else {
                this.$message.error(response.msg)
              }
            }).catch(error => {
              this.$message.error(error.msg)
            })
          } else {
            this.$message.error('error submit!!')
          }
        })
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
