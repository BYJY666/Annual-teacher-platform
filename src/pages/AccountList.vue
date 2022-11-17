<template>
  <div>
    <Breadcrumb firstName="作品管理" secondName="作品详情"></Breadcrumb>
    <WorkList url="/user/userList">
      <template v-slot:AddBtn>
        <el-button type="primary" @click="addDialogVisible = true"
          >新增账号</el-button
        >
      </template>
      <template v-slot:List="{ workList }">
        <el-table :data="workList" border stripe>
          <el-table-column prop="id" width="50px"></el-table-column>
          <el-table-column label="账号" prop="phone"></el-table-column>
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="学校" prop="school"></el-table-column>
        </el-table>
      </template>
      <template v-slot:AddDialog>
        <el-dialog
          title="添加用户"
          :visible.sync="addDialogVisible"
          width="50%"
          @close="addDialogClosed"
        >
          <el-form
            :model="addForm"
            :rules="addFromRules"
            ref="addFormRef"
            label-width="70px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="addForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="学校" prop="school">
              <el-input v-model="addForm.school"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
        </el-dialog>
      </template>
    </WorkList>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb.vue'
import WorkList from '../components/WorkList.vue'

export default {
  name: 'AccountList',
  components: { Breadcrumb, WorkList },
  data() {
    var checkPhone = (rule, value, cb) => {
      const regPhone =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (regPhone.test(value.trim())) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }

    var checkPassword = (rule, value, cb) => {
      const regPassword = /^[a-zA-Z]\w{5,17}$/
      if (regPassword.test(value.trim())) {
        return cb()
      }
      cb(new Error('以字母开头，长度在6~18之间，只能包含字母、数字和下划线'))
    }

    return {
      addForm: {
        username: '',
        phone: '',
        password: '',
        school: '',
      },
      addFromRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur',
          },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: checkPhone,
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            validator: checkPassword,
            trigger: 'blur',
          },
        ],
        school: [{ required: true, message: '请输入学校名', trigger: 'blur' }],
      },
      addDialogVisible: false,
    }
  },
  methods: {
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('用户信息格式不正确!')
        const { data: res } = await this.$http.post(
          '/user/addUser',
          this.addForm
        )
        if (res.status !== 201 && res.status !== 412) {
          return this.$message.error('添加用户失败！')
        } else if (res.status == 412) {
          return this.$message.warning(res.message)
        } else if (res.status == 201) {
          this.$message.success(res.message)
          this.addDialogVisible = false
        }
      })
    },
  },
}
</script>

<style scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
  max-height: 68vh;
  overflow: auto;
}
</style>