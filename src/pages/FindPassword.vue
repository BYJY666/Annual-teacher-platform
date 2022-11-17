<template>
  <div>
    <div class="rightBox">
      <h4 class="title">找回密码</h4>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="身份认证"></el-step>
        <el-step title="确认修改"></el-step>
        <el-step title="修改成功"></el-step>
      </el-steps>
      <!-- 身份认证 -->
      <el-form
        :model="userinfo"
        :rules="userinfoRules"
        ref="userinfoFormRef1"
        label-width="85px"
        v-show="!modifyPassword"
      >
        <el-form-item label="手机号:" prop="phone">
          <el-input v-model="userinfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="手机验证:">
          <el-input class="phoneCode"></el-input>
          <el-button
            class="sendPhoneCode"
            @click="sendsms"
            :disabled="disabled"
            >{{ sendPhoneCode }}</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button class="registerBtn" @click="next">下一步</el-button>
        </el-form-item>
      </el-form>
      <!-- 重设密码 -->
      <el-form
        :model="userinfo"
        :rules="userinfoRules"
        ref="userinfoFormRef"
        label-width="85px"
        v-show="modifyPassword"
      >
        <el-form-item label="新密码:" prop="password">
          <el-input
            type="password"
            v-model="userinfo.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="confirmPassword">
          <el-input
            type="password"
            v-model="userinfo.confirmPassword"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item v-show="!btnState">
          <el-button class="registerBtn" @click="sureModify"
            >确认修改</el-button
          >
        </el-form-item>
        <el-form-item v-show="btnState">
          <el-button class="registerBtn" @click="goUserLogin">去登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FindPassword',
  data() {
    var checkPhone = (rule, value, cb) => {
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

    let equalToPassword = (rule, value, cb) => {
      if (this.userinfo.password == value) {
        return cb()
      }
      cb(new Error('两次密码输入不一致'))
    }
    return {
      userinfo: {
        phone: '',
        password: '',
        confirmPassword: '',
      },
      userinfoRules: {
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
      },
      sendPhoneCode: '发送验证码',
      disabled: false,
      modifyPassword: false,
      active: 0,
      btnState: false,
    }
  },
  methods: {
    sendsms() {
      this.$refs.userinfoFormRef1.validateField('phone', (phoneError) => {
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
    next() {
      this.modifyPassword = !this.modifyPassword
      if (this.active++ > 2) this.active = 0
    },
    sureModify() {
      this.$refs.userinfoFormRef.validate(async (valid) => {
        if (!valid) {
          this.$message.closeAll()
          return this.$message.warning('请正确填写密码!')
        }
        const { data: res } = await this.$http.put('/user/changePassword', {
          phone: this.userinfo.phone,
          password: this.userinfo.password,
        })
        if (res.status !== 200) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.btnState = !this.btnState
        if (this.active++ > 2) this.active = 0
        if (this.active++ > 2) this.active = 0
      })
    },
    goUserLogin() {
      this.$router.push('/index/loginAndRegistration/login')
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
  .el-steps {
    margin-top: 15px;
  }
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
  margin: 35px auto 0;
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
}
</style>

<style scoped>
.rightBox >>> .el-step__title {
  font-size: 12px;
  line-height: 20px;
}

.rightBox >>> .el-step__icon {
  width: 20px;
  height: 20px;
}
</style>