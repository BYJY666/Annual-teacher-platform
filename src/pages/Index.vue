<template>
  <div>
    <div class="header">
      <div class="m nav">
        <span>年度教师评选平台</span>
        <div class="navUl">
          <router-link to="/index/firstPage" active-class="current"
            >网站首页</router-link
          >
          <router-link to="/index/loginAndRegistration" active-class="current"
            >登录注册</router-link
          >
          <router-link to="/index/uploadWorks" active-class="current"
            >上传作品</router-link
          >
          <router-link to="/index/personal" active-class="current"
            >个人信息</router-link
          >
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div class="footer">
      <div class="m">
        <div class="footer-top">
          <ul>
            <li>
              <i class="iconfont icon-dianhuatianchong"></i>
              <span>客服电话：17665698471</span>
            </li>
            <li>
              <i class="iconfont icon-weixin"></i>
              <span>微信：B_Y_666</span>
            </li>
          </ul>
        </div>
        <div class="footer-linner">
          <span>友情链接：</span>
          <ul>
            <li v-for="(item, index) in firends" :key="index">
              {{ item }}&emsp;|
            </li>
          </ul>
        </div>
        <div class="footer-major">
          <span
            >专业的全面评价、考核制度、保密流程、公平公正、技术先进、社会保障、作品审核的综合人才教育平台</span
          >
        </div>
        <div class="footer-bottom">
          <span
            >地址：广东省广州市增城区荔城街道广州华商学院崇德楼710房2号床
            邮编：528000 电话：17665698471 传真：010-17665698471
            邮箱：m13923121637@163.com<br />广ICP备08001421号广公网安备110108007702</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      firends: [
        '星火教育',
        '黑马培训',
        '尚硅谷培训',
        'CSDN',
        '广州华商学院',
        '百度百科',
        '祎购商城',
        '英雄联盟 ',
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.header {
  border-bottom: 1px solid #e8e8e8;
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 75px;
    span {
      font-family: KaiTi;
      font-weight: 700;
      color: #2c58b6;
      font-size: 32px;
    }
    .navUl {
      display: flex;
      justify-content: space-between;
      width: 45%;
      height: 100%;
      a {
        text-decoration: none;
        color: #333;
        font-size: 18px;
        letter-spacing: 4px;
        font-family: NSimSun;
        font-weight: 600;
        display: block;
        height: 40px;
        line-height: 76px;
        height: 100%;
        border-bottom: 3px solid transparent;
        transition: all 0.15s linear;
      }
      a:hover {
        border-bottom: 3px solid #2c58b6;
        color: #2c58b6 !important;
      }
      .current {
        border-bottom: 3px solid #2c58b6;
        color: #2c58b6;
      }
    }
  }
}

.footer {
  background-color: #fff;
  font-size: 12px;
  color: #666;
  border-top: 1px solid #e8e8e8;
  .footer-top {
    margin: 25px 0;
    ul {
      display: flex;
      li {
        margin-right: 20px;
        span {
          margin-left: 5px;
        }
      }
    }
  }
  .footer-linner {
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgb(145, 145, 145);
    ul {
      margin-left: 10px;
      display: flex;
      li {
        margin-right: 15px;
      }
    }
  }
  .footer-major {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
  .footer-bottom {
    height: 50px;
    margin-top: 10px;
    line-height: 20px;
    text-align: center;
  }
}
</style>