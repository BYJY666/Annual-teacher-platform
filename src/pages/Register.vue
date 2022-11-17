<template>
  <div>
    <div class="rightBox">
      <h4 class="title">注册</h4>
      <el-form
        :model="addForm"
        :rules="addFromRules"
        ref="addFormRef"
        label-width="85px"
      >
        <el-form-item label="用户名:" prop="username">
          <el-input
            v-model="addForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册密码:" prop="password">
          <el-input
            type="password"
            v-model="addForm.password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="confirmPassword">
          <el-input
            type="password"
            v-model="addForm.confirmPassword"
            show-password
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-input
            v-model="addForm.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机验证:">
          <el-input class="phoneCode" placeholder="请输入手机验证码"></el-input>
          <el-button
            class="sendPhoneCode"
            @click="sendsms"
            :disabled="disabled"
            >{{ sendPhoneCode }}</el-button
          >
        </el-form-item>
        <el-form-item label="任教学校:" prop="school">
          <el-input
            v-model="addForm.school"
            placeholder="请输入任教学校"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="registerBtn" @click="goRegister"
            >立即注册</el-button
          >
          <p>
            已经注册账号?<router-link to="/index/loginAndRegistration/login"
              >立即登录</router-link
            >
          </p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
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
      cb(new Error('字母开头，长度6~18之间，只包含字母、数字和下划线'))
    }

    var equalToPassword = (rule, value, cb) => {
      if (this.addForm.password == value) {
        return cb()
      }
      cb(new Error('两次密码输入不一致'))
    }
    return {
      addForm: {
        username: '',
        phone: '',
        password: '',
        confirmPassword: '',
        school: '',
      },
      addFromRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '用户名的长度在2~10个字符之间',
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
        confirmPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            validator: equalToPassword,
            trigger: 'blur',
          },
        ],
        school: [{ required: true, message: '请输入学校名', trigger: 'blur' }],
      },
      sendPhoneCode: '发送验证码',
      disabled: false,
    }
  },
  methods: {
    sendsms() {
      this.$refs.addFormRef.validateField('phone', (phoneError) => {
        if (!phoneError) {
          this.disabled = true
          this.sendPhoneCode = 60
          let timer = setInterval(() => {
            if (this.sendPhoneCode == 1) {
              this.sendPhoneCode = '发送验证码'
              clearInterval(timer)
              timer = null
              this.disabled = false
            } else {
              this.sendPhoneCode--
            }
          }, 1000)
        } else {
          return
        }
      })
    },
    goRegister() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('用户信息格式不正确!')
        const { data: res } = await this.$http.post('/user/addUser', {
          username: this.addForm.username,
          phone: this.addForm.phone,
          password: this.addForm.password,
          school: this.addForm.school,
        })
        if (res.status !== 201 && res.status !== 412) {
          return this.$message.error('添加用户失败！')
        } else if (res.status == 412) {
          return this.$message.warning(res.message)
        } else if (res.status == 201) {
          this.$message.success(res.message)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.rightBox {
  width: 422px;
  height: 522px;
  border: 1px solid #e8e8e8d2;
  border-radius: 3px;
  .title {
    height: 55px;
    font-size: 20px;
    font-weight: 400;
    line-height: 55px;
    background-color: #f6f7f9;
    color: #fe7300;
    padding: 0 20px;
  }
}

.el-form {
  width: 380px;
  margin: 15px auto 0;
  .sendPhoneCode {
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    background-color: #ff7d27;
    border: 1px solid #ff7d27;
    border-radius: 1px;
    width: 112px;
  }
  .sendPhoneCode:hover,
  .registerBtn:hover {
    background: #f60;
    border: 1px solid #f60;
  }

  .registerBtn {
    width: 100%;
    background-color: #ff7d27;
    border: 1px solid #ff7d27;
    color: #fff;
    border-radius: 1px;
  }

  p {
    text-align: center;
    margin-top: 5px;
    height: 20px;
    line-height: 20px;
    color: #606266;
    a {
      color: #028ec2;
      padding-left: 4px;
      cursor: pointer;
    }
  }
}
</style>