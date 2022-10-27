<template>
  <div>
    <button @click="outLogin">退出登录</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    outLogin() {
      window.sessionStorage.clear('token')
      this.$router.push('/login')
    },
  },
}
</script>

<style>
</style>