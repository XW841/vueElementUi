<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>

      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card"
             shadow="hover">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入用户名搜索"
                    v-model="queryInfo.query"
                    clearable
                    @clear='setUserList'>
            <!-- // this.queryInfo.pagenum = 1; //搜索功能优化：为了保证在任意一页搜索，都能回到第一页，避免数据不够在这一页显示空结果 -->
            <el-button slot="append"
                       icon="el-icon-search"
                       @click=" queryInfo.pagenum = 1;setUserList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary"
                     @click="dialogVisible = true">添加用户</el-button>
          <!-- 用户添加表单 -->
          <el-dialog title="添加用户"
                     :visible.sync="dialogVisible"
                     width="40%"
                     @close='clearForm'>
            <el-form :model="addUser"
                     :rules="addUserRules"
                     ref="addUserRef"
                     label-width="80px">
              <el-form-item label="用户名"
                            prop="username">
                <el-input v-model="addUser.username"></el-input>
              </el-form-item>
              <el-form-item label="密码"
                            prop="password">
                <el-input v-model="addUser.password"></el-input>
              </el-form-item>
              <el-form-item label="邮箱地址"
                            prop="email">
                <el-input v-model="addUser.email"></el-input>
              </el-form-item>
              <el-form-item label="手机号码"
                            prop="mobile">
                <el-input v-model="addUser.mobile"></el-input>
              </el-form-item>

            </el-form>
            <span slot="footer"
                  class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary"
                         @click="submitForm">确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userList"
                style="width: 100%"
                border>
        <el-table-column type="index"
                         label="序号"
                         width='50'>
        </el-table-column>
        <el-table-column prop="username"
                         label="姓名">
        </el-table-column>
        <el-table-column prop="email"
                         label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="电话">
        </el-table-column>
        <el-table-column prop="role_name"
                         label="角色">
        </el-table-column>
        <el-table-column prop="mg_state"
                         label="状态">
          <template slot-scope="scope">
            <!-- {{scope.row.mg_state}} -->
            <el-switch v-model="scope.row.mg_state"
                       @change='changeStatus(scope.row)'
                       active-color="#13ce66">
            </el-switch>
          </template>

        </el-table-column>
        <!--三个 操作按钮 -->
        <el-table-column label="
                       操作"
                         width="190">
          <template slot-scope="scope">

            <!-- 修改按钮 -->
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="small"
                       @click="editInfo(scope.row.id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="small"
                       @click="deleteInfo(scope.row.id)"></el-button>

            <!-- 角色分配按钮 -->
            <el-tooltip :enterable='false'
                        effect="dark"
                        content="角色分配"
                        placement="top">
              <el-button type="warning"
                         icon="el-icon-setting"
                         size="small"></el-button>

            </el-tooltip>
          </template>
        </el-table-column>
        <!-- 修改用户信息对话框 -->
        <el-dialog title="提示"
                   :visible.sync="editDialogVisible"
                   width="30%"
                   :append-to-body="true"
                   @close='clearEditForm'>
          <el-form :model="editInfoForm"
                   :rules="addUserRules"
                   ref="editUserRef"
                   label-width="80px">
            <el-form-item label="用户名"
                          prop="username">
              <el-input v-model="editInfoForm.username"
                        disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址"
                          prop="email">
              <el-input v-model="editInfoForm.email"></el-input>
            </el-form-item>

            <el-form-item label="手机号码"
                          prop="mobile">
              <el-input v-model="editInfoForm.mobile"></el-input>
            </el-form-item>

          </el-form>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="submitEditInfo">确 定</el-button>
          </span>
        </el-dialog>
      </el-table>
      <!-- 分页符 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[1, 2, 5, 7]"
                     :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
import { getUserList } from '../../ajax/api'
import { editUserStatus } from '../../ajax/api'

import { adduser } from '../../ajax/api'

import { personInfo } from '../../ajax/api'

import { editUserinfo } from '../../ajax/api'

import { deleteUser } from '../../ajax/api'




export default {

  data () {
    var checkEamil = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (regEmail.test(value)) return callback()
      callback(new Error('请输入正确的邮箱地址'))
    }
    var checkmobile = (rule, value, callback) => {
      const regmobile = /^1\d{10}$/
      if (regmobile.test(value)) return callback()
      callback(new Error('请输入正确的手机号码'))
    }
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0,
      dialogVisible: false,
      editDialogVisible: false,
      //添加用户表单数据
      addUser: {
        username: "",
        password: '',
        email: '',
        mobile: ''
      },
      //用户表单数据验证
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { validator: checkEamil, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkmobile, trigger: 'blur' }
        ]


      },
      editInfoForm: {}

    };
  },
  created () {
    this.setUserList()


  },
  components: {},

  computed: {},

  methods: {
    async setUserList () {
      // getUserList(this.queryInfo.pagenum, this.queryInfo.pagesize).then(res => {
      //   console.log(res)

      //   if (res.meta.status != 200) return this.$message.error('获取用户列表失败！')
      //   this.userList = res.data.users
      //   this.total = res.data.total
      //   // console.log(this.userList)


      // })
      const res = await getUserList(this.queryInfo)
      console.log(res)
      if (res.meta.status != 200) return this.$message.error('获取用户列表失败！')
      this.userList = res.data.users
      this.total = res.data.total


    },
    handleSizeChange (val) {

      this.queryInfo.pagesize = val
      this.setUserList()
    },
    handleCurrentChange (val) {

      this.queryInfo.pagenum = val
      getUserList(this.queryInfo)
      this.setUserList()

    },
    //修改用户状态
    async changeStatus (userInfo) {
      console.log(userInfo)
      const res = await editUserStatus(userInfo.id, userInfo.mg_state);
      console.log(res)
      if (res.meta.status != 200) return this.$message.error(`${res.meta.msg}`)
      this.$message.success(`${res.meta.msg}`)
    },
    //关闭添加用户框，重置表单
    clearForm () {
      this.$refs.addUserRef.resetFields()
    },
    //提交添加用户表单
    submitForm () {
      // console.log({ ...this.addUser })
      // console.log(this.addUser)
      // adduser(this.addUser.username, this.addUser.password, this.addUser.email, this.addUser.mobile).then(res => {
      //   console.log(res)
      // })
      this.$refs.addUserRef.validate(async vaild => {
        if (!vaild) return
        const res = await adduser(this.addUser)

        this.$message.success('用户添加成功')
        this.dialogVisible = false
        this.setUserList()

      })

    },
    //展示修改信息对话框
    editInfo (userId) {
      this.editDialogVisible = true
      // console.log(userId)
      personInfo(userId).then(res => {
        this.editInfoForm = res.data
        console.log(this.editInfoForm)

      })
    },
    //重置修改
    clearEditForm () {
      this.$refs.editUserRef.resetFields()

    },
    //提交信息修改
    submitEditInfo () {
      console.log(this.editInfoForm.id, this.editInfoForm.email, this.editInfoForm.mobile,)
      this.$refs.editUserRef.validate(valid => {
        if (!valid) return this.$message.warning('请正确填写信息')
        this.editDialogVisible = false
        editUserinfo(this.editInfoForm.id, this.editInfoForm.email, this.editInfoForm.mobile).then(res => {
          this.$message.success('用户信息更新成功')
          this.setUserList()

        })
      })

    },
    //删除用户
    async deleteInfo (userId) {
      const confirmRes = await this.$confirm('此操作将永久删除该用户, 是否确认?', {
        confirmButtonText: '确认',
        cancelButtonText: '再想想',
        type: 'warning'
      }).catch(err => err)   //等于(err=>{return err}),只有一行可以简写，并且省略return
      // console.log(confirmRes)
      if (confirmRes == 'confirm') {
        deleteUser(userId).then(res => {
          if (res.meta.status !== 200) return this.$message.error(`${res.meta.msg}`)
          this.$message.success('用户删除成功')
          this.setUserList()
          // console.log(res)
        })
      }

    },

  }
}
</script>
<style lang='scss' scoped>
.box-card {
  margin-top: 12px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
.el-table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 15px;
}
</style>