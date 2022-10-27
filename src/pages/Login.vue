<template>
  <div class="login_container">
    <div :class="current" class="container">
      <transition name="fade" mode="out-in" :duration="50">
        <h1 @click="isState = !isState" :key="isState" ref="loginText">
          {{ isState ? 'User Login' : 'Admin Login' }}
        </h1>
      </transition>
      <div class="form">
        <input
          type="text"
          placeholder="您的账号"
          v-model="username.val"
          @blur="usernameReg"
          ref="usernameRef"
        />
        <input
          type="password"
          placeholder="您的密码"
          v-model="password.val"
          @blur="passwordReg"
          ref="passwordRef"
        />
        <button @click="loginIn" class="btn-login">登录</button>
      </div>
    </div>
    <ul class="bg-squares">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      current: '',
      isState: true,
      username: {
        val: '',
        reg: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
        state: false,
      },
      password: {
        val: '',
        reg: /^[A-Za-z0-9]+$/,
        state: false,
      },
      loginForm: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    usernameReg() {
      if (this.username.val.trim() === '') {
        this.username.val = ''
        this.$refs.usernameRef.style.borderColor = 'rgba(255, 255, 255, 0.4)'
      } else if (this.username.reg.test(this.username.val.trim())) {
        this.username.state = true
        this.loginForm.username = this.username.val
        this.$refs.usernameRef.style.borderColor = '#BCEE68'
      } else {
        this.$message({
          showClose: true,
          message: '帐号不合法(字母开头，允许5-16字节，允许字母数字下划线)',
          type: 'error',
        })
        this.$refs.usernameRef.style.borderColor = '#FF6A6A'
      }
    },
    passwordReg() {
      if (this.password.val.trim() === '') {
        this.password.val = ''
        this.$refs.passwordRef.style.borderColor = 'rgba(255, 255, 255, 0.4)'
      } else if (this.password.reg.test(this.password.val.trim())) {
        this.password.state = true
        this.loginForm.password = this.password.val
        this.$refs.passwordRef.style.borderColor = '#BCEE68'
      } else {
        this.$message({
          showClose: true,
          message:
            '密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)',
          type: 'error',
        })
        this.$refs.passwordRef.style.borderColor = '#FF6A6A'
      }
    },
    loginIn() {
      if (!(this.username.state && this.password.state)) {
        this.$message({
          showClose: true,
          message: '账号密码格式不正确',
          type: 'error',
        })
      } else if (this.username.state && this.password.state) {
        axios({
          url: 'http://127.0.0.1:8888/api/private/v1/login',
          method: 'POST',
          params: this.loginForm,
        }).then(
          (res) => {
            if (res.data.meta.status === 400) {
              this.$message({
                showClose: true,
                message: res.data.meta.msg,
                type: 'error',
              })
            } else if (res.data.meta.status === 200) {
              window.sessionStorage.setItem('token', res.data.data.token)
              this.current = 'success'
              this.$refs.loginText.innerHTML = 'Welcome'
              setTimeout(() => {
                this.$router.push('/home')
              }, 1500)
            } else {
              this.$message({
                showClose: true,
                message: '服务器繁忙',
                type: 'warning',
              })
            }
          },
          (err) => {
            console.log(err)
          }
        )
      }
    },
  },
}
</script>

<style scoped>
.login_container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom left, #ffe29f, #ffa99f, #ff719a);
  overflow: hidden;
  position: relative;
}

.container {
  text-align: center;
  color: #fff;
  z-index: 2;
}

.container h1 {
  font-size: 40px;
  font-weight: 100;
  letter-spacing: 2px;
  margin-bottom: 15px;
  /* 过渡效果 */
  transition: 1s ease-in-out;
  cursor: pointer;
  user-select: none;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  opacity: 1;
  /* 不透明度改变时的过渡效果 */
  transition: opacity 0.5s;
}

.form input {
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.2);
  width: 250px;
  padding: 10px 15px;
  border-radius: 3px;
  margin: 0 auto 10px auto;
  text-align: center;
  color: #fff;
  font-size: 15px;
  transition: 0.25s;
}

.form input::placeholder {
  color: #fff;
  font-size: 14px;
  font-weight: 300;
}

.form input:focus {
  background-color: #fff;
  width: 300px;
  color: #ff719a;
}

.btn-login {
  outline: none;
  background-color: #fff;
  color: #ff719a;
  border: none;
  width: 250px;
  padding: 10px 15px;
  border-radius: 3px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.25s;
}

.btn-login:hover {
  background-color: #f5f7f9;
}

/* 背景方块 */
.bg-squares {
  list-style: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.bg-squares li {
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  position: absolute;
  bottom: -160px;
  /* 执行动画：动画名 时长 线性 无限次播放 */
  animation: square 20s linear infinite;
}

/* 为每一个方块设置不同的位置、大小、动画延迟时间、动画时长、背景色 */
.bg-squares li:nth-child(1) {
  left: 10%;
}

.bg-squares li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  /* 动画延迟时间 */
  animation-delay: 2s;
  /* 动画时长 */
  animation-duration: 17s;
}

.bg-squares li:nth-child(3) {
  left: 25%;
  animation-delay: 4s;
}

.bg-squares li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.25);
  animation-duration: 22s;
}

.bg-squares li:nth-child(5) {
  left: 70%;
}

.bg-squares li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  background-color: rgba(255, 255, 255, 0.2);
  animation-duration: 3s;
}

.bg-squares li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  animation-delay: 7s;
}

.bg-squares li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  animation-delay: 15s;
  animation-duration: 40s;
}

.bg-squares li:nth-child(9) {
  left: 55%;
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  animation-delay: 2s;
  animation-duration: 40s;
}

.bg-squares li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  animation-delay: 11s;
}

.container.success h1 {
  transform: translateY(75px);
  opacity: 1;
}

.container.success .form {
  opacity: 0;
}

/* 定义动画 */
@keyframes square {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-120vh) rotate(600deg);
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>