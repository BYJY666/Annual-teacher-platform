<template>
  <el-container>
    <!-- 头部 -->
    <el-header height="80px">
      <div>
        <img src="../assets/images/教育.png" alt="" />
        <span>后台管理系统</span>
      </div>
      <el-button @click="outLogin" type="info">退出登录</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="iscollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="iscollapse = !iscollapse">
          <i
            :class="iscollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"
          ></i>
        </div>
        <el-menu
          :default-active="activePath ? activePath : '/home/welcome'"
          class="el-menu-vertical-demo"
          background-color="#33495d"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="iscollapse"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="/home/welcome" @click="keepActive">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单 -->
            <template slot="title">
              <i :class="iconlist[item.id]"></i>
              <span>{{ item.menusName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="keepActive"
            >
              <i class="el-icon-menu"></i>
              <span>{{ subItem.menusName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容栏 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      menulist: [],
      iconlist: {
        101: 'el-icon-reading',
        102: 'el-icon-s-custom',
      },
      iscollapse: false,
      activePath: '',
    }
  },
  methods: {
    outLogin() {
      window.sessionStorage.clear()
      this.$router.push('/index/firstPage')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('/jurisdiction/menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.message)
      this.menulist = res.data
    },
    keepActive() {
      window.sessionStorage.setItem('path', this.$route.path)
    },
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('path')
  },
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}

.el-header {
  background-color: #38bfd4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  color: white;
  div {
    display: flex;
    align-items: center;
    img {
      width: 30px;
    }
    span {
      margin-left: 10px;
    }
  }
}

.el-aside {
  background-color: #33495d;
  transform: width 1s;
  .toggle-button {
    height: 24px;
    line-height: 24px;
    background-color: #4a6885;
    color: white;
    letter-spacing: 0.2em;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }
  .toggle-button:hover {
    color: #ffd04b;
  }
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #f4f4f4;
}
</style>