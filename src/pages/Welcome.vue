<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row style="margin-bottom: 10px">
        <el-col :span="4">
          <span class="loginName">最新平台数据显示</span>
        </el-col>
      </el-row>
      <hr />
      <el-row style="margin-top: 30px">
        <el-col :span="8"><Echarts1></Echarts1></el-col>
        <el-col :span="12" :offset="4"><Echarts2></Echarts2></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Echarts1 from '../components/Echarts1.vue'
import Echarts2 from '../components/Echarts2.vue'

export default {
  name: 'Welcome',
  components: { Echarts1, Echarts2 },
  methods: {
    hello() {
      if (window.sessionStorage.getItem('loginName')) {
        this.$notify({
          title: window.sessionStorage.getItem('loginName'),
          message: '后台管理系统欢迎你！',
        })
      }
      window.sessionStorage.removeItem('loginName')
    },
  },
  created() {
    this.hello()
  },
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}

.loginName {
  font-size: 14px;
  color: #606266;
}
</style>