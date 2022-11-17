<template>
  <div>
    <div class="rightBox">
      <h4 class="title">登录</h4>
      <div class="changeLogin">
        <div
          class="userlogin"
          :class="isactive ? 'current' : ''"
          @click="isactive = true"
        >
          用户登录
        </div>
        <div
          class="adminlogin"
          :class="isactive ? '' : 'current'"
          @click="isactive = false"
        >
          管理员登录
        </div>
      </div>
      <!-- 用户登录 -->
      <el-form
        :model="userinfo"
        :rules="userinfoRules"
        ref="userinfoFormRef"
        label-width="85px"
        v-show="isactive"
      >
        <el-form-item label="手机号:" prop="username">
          <el-input v-model="userinfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            type="password"
            v-model="userinfo.password"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="registerBtn" @click="loginIn">登录</el-button>
          <p>
            <router-link to="/index/loginAndRegistration/findPassword"
              >找回密码</router-link
            >
            |
            <router-link to="/index/loginAndRegistration/register"
              >注册新账号</router-link
            >
          </p>
        </el-form-item>
      </el-form>
      <!-- 管理员登录 -->
      <el-form
        :model="admininfo"
        :rules="admininfoRules"
        ref="admininfoFormRef"
        label-width="85px"
        v-show="!isactive"
      >
        <el-form-item label="账号名:" prop="username">
          <el-input v-model="admininfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            type="password"
            v-model="admininfo.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="registerBtn" @click="loginIn1">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    let checkPhone = (rule, value, cb) => {
      const regPhone =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (regPhone.test(value.trim())) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }

    let checkPassword = (rule, value, cb) => {
      const regPassword = /^[a-zA-Z]\w{5,17}$/
      if (regPassword.test(value.trim())) {
        return cb()
      }
      cb(new Error('字母开头，长度6~18之间，只包含字母、数字和下划线'))
    }
    return {
      userinfo: {
        username: '',
        password: '',
      },
      admininfo: {
        username: '',
        password: '',
      },
      userinfoRules: {
        username: [
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
      },
      admininfoRules: {
        username: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      isactive: true,
    }
  },
  methods: {
    loginIn() {
      this.$refs.userinfoFormRef.validate(async (valid) => {
        if (!valid) {
          this.$message.closeAll()
          return this.$message.warning('请输入手机号或密码!')
        }
        window.sessionStorage.clear()
        const { data: res } = await this.$http.post(
          '/login/user',
          this.userinfo
        )
        if (res.status !== 0) return this.$message.error(res.message)
        window.sessionStorage.setItem('token', res.token)
        window.sessionStorage.setItem('phone', this.userinfo.username)
        this.$router.push('/index/personal')
      })
    },
    async loginIn1() {
      if (
        this.admininfo.username.trim() == '' &&
        this.admininfo.password.trim() == ''
      ) {
        this.$message.closeAll()
        return this.$message.warning('请输入账号或密码')
      }
      window.sessionStorage.clear()
      const { data: res } = await this.$http.post(
        '/login/manager',
        this.admininfo
      )
      if (res.status !== 0) return this.$message.error(res.message)
      window.sessionStorage.setItem('token', res.token)
      this.$router.push('/home')
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
    border-bottom: 1px solid #e8e8e8d2;
  }

  .changeLogin {
    display: flex;
    height: 30px;
    .userlogin,
    .adminlogin {
      width: 50%;
      text-align: center;
      color: #bbbbbb;
      line-height: 30px;
      font-size: 12px;
      background-color: #f6f7f9;
      cursor: pointer;
      user-select: none;
    }
    .current {
      background-color: #fff;
      color: #606266;
    }
  }

  .el-form {
    width: 380px;
    margin: 15px auto 0;
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
      font-size: 16px;
    }

    p {
      text-align: center;
      margin-top: 5px;
      height: 20px;
      line-height: 20px;
      color: #606266;
      a {
        color: #028ec2;
        cursor: pointer;
      }
    }
  }
}
</style>