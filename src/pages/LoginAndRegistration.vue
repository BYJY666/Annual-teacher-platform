<template>
  <div class="registration">
    <div class="m">
      <div class="registrationBox">
        <div class="left">
          <p>严于律己&emsp;以身作则&emsp;为人师表</p>
        </div>
        <div class="right">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb.vue'

export default {
  name: 'LoginAndRegistration',
  components: { Breadcrumb },
}
</script>

<style lang="less" scoped>
.registration {
  width: 100%;
  height: 700px;
  padding-top: 65px;
  background-color: #f6f7f9;
  .registrationBox {
    display: flex;
    border: 1px solid #e8e8e8;
    border-radius: 3px;
    .left,
    .right {
      width: 615px;
      height: 560px;
      background-color: #fff;
      border-radius: 3px;
    }
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .left {
      position: relative;
      background: url(../assets/images/registration.jpg) no-repeat 0 center;
      p {
        width: 100%;
        position: absolute;
        bottom: 30px;
        color: #fff;
        font-size: 20px;
        font-style: italic;
        text-align: center;
      }
    }
  }
}

.mod-copyright {
  text-align: center;
  padding-top: 20px;
  font-size: 12px;
  color: #666;
}

.mod-copyright .links {
  margin-bottom: 15px;
}

.mod-copyright .copyright {
  line-height: 20px;
}

.mod-copyright .links a {
  margin: 0 3px;
}

.mod-copyright .links a:hover {
  color: #c81623;
}
</style>