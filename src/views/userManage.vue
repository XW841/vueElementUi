<template>
  <div>
    <el-main>
      <el-table :data="userlist">
        <el-table-column prop="role"
                         label="角色"
                         width="140">
        </el-table-column>
        <el-table-column prop="username"
                         label="用户名"
                         width="140">
        </el-table-column>
        <el-table-column prop="phone"
                         label="手机号码"
                         width="150">
        </el-table-column>
        <el-table-column prop="email"
                         label="邮箱"
                         width="180">
        </el-table-column>
        <el-table-column prop="status"
                         label="状态"
                         width="120px">
        </el-table-column>
        <el-table-column prop="registTime"
                         label="创建时间"
                         width="120px">
        </el-table-column>
      </el-table>
      <el-pagination background
                     layout="prev, pager, next"
                     :total="80"
                     @current-change="handleCurrentChange">
      </el-pagination>
    </el-main>
  </div>
</template>

<script>
import { getUserList } from '../ajax/api'
export default {
  data () {
    const useritem = Array.apply(null, { length: 7 }).map(() => ({
      role: '',
      username: '',
      phone: '',
      email: '',
      status: '',
      registTime: ''
    }));
    return {
      pagenum: '1',
      pagesize: '5',

      currentIndex: 1,
      userlist: useritem,
      flag: false
    };
  },
  mounted () {
    console.log(this.userlist)
    getUserList(this.pagenum, this.pagesize).then(data => {
      console.log(data)
      this.setValue(data)
    })


  },

  components: {},

  computed: {},

  methods: {
    handleCurrentChange (currentIndex) {

      this.currentIndex = currentIndex + 2
      this.pagenum = this.currentIndex;
      getUserList(this.pagenum).then(data => {

        this.setValue(data)
      })
    },
    //赋值
    setValue (data) {

      const users = data.data.users


      users.forEach((item, index) => {
        // console.log(item.goods_name)

        this.userlist[index].role = item.role_name
        this.userlist[index].username = item.username
        this.userlist[index].phone = item.mobile
        this.userlist[index].email = item.email
        this.userlist[index].status = item.mg_state == 'true' ? '在线' : '离线'
        this.userlist[index].registTime = item.create_time
      })

    },
  }
}
</script>
<style lang="scss" scoped>
>>> .el-pagination {
  margin: 5px 200px;
}
>>> .cell {
  height: 50px;
  overflow: hidden;
}
</style>