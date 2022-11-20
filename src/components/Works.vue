<template>
  <div>
    <div class="m works">
      <span class="title">作品展示</span>
      <br />
      <span>Works show</span>
      <div class="container">
        <div v-for="(item, index) in showWorkList" :key="index" class="box">
          <figure>
            <video
              controls
              :src="'http://127.0.0.1:3007/videos/' + item.video"
              poster="../assets/images/视频封面.jpg"
            />
            <figcaption>
              <p>
                <i class="iconfont icon-xiazai"></i>
                <i class="iconfont icon-aixin"></i>
                <i class="iconfont icon-fenxiang"></i>
                <i class="iconfont icon-biaoqian"></i>
              </p>
            </figcaption>
          </figure>
          <ul class="workContent">
            <li>
              标题：<span>《{{ item.work_name }}》</span>
            </li>
            <li>
              作者：<span>{{ item.user_name }}</span>
            </li>
            <li>
              任教学校：<span>{{ item.school }}</span>
            </li>
            <li>
              作品描述：<br />
              <p>{{ item.work_description }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Works',
  data() {
    return {
      showWorkList: [],
    }
  },
  methods: {
    async getShowWorkList() {
      const { data: res } = await this.$http.get('/work/showWork')
      if (res.meta.status !== 200) return
      this.showWorkList = res.data
    },
  },
  created() {
    this.getShowWorkList()
  },
}
</script>

<style lang="less" scoped>
.works {
  height: 600px;
  color: #2c58b6;
  font-family: KaiTi;
  .title {
    font-size: 32px;
  }
  .container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  figure {
    position: relative;

    height: 250px;
    overflow: hidden;
    background-color: #34495e;
  }

  figcaption {
    color: #fff;
  }

  /* 黑色边框 */
  figcaption::before,
  figcaption::after {
    content: '';
    width: 200%;
    height: 200%;
    position: absolute;
    border-style: solid;
    border-color: #101010;
    /* 设置过渡 */
    transition: transform 0.35s;
    /* 这里需要设置元素不对鼠标事件做出反应，图标的悬停样式才会有效 */
    pointer-events: none;
  }

  /* 右、下边框 */
  figcaption::before {
    right: 0;
    bottom: 0;
    border-width: 0 35px 8px 0;
    transform: translate(35px, 8px);
  }

  /* 左、上边框 */
  figcaption::after {
    top: 0;
    left: 0;
    border-width: 8px 0 0 8px;
    transform: translate(-8px, -8px);
  }

  /* 视频 */
  figure video {
    width: 100%;
    height: 100%;
    object-fit: none;
    position: absolute;
    left: 0;
    top: 0;
    /* 过渡 */
    transition: 0.35s;
    object-fit: cover;
  }

  /* 功能图标区域 */
  figure p {
    position: absolute;
    top: 12px;
    right: 0;
    display: flex;
    flex-direction: column;
    width: 35px;
    justify-content: center;
    align-items: center;
  }

  /* 图标 */
  figure p i {
    margin-bottom: 30px;
    font-size: 16px !important;
    cursor: pointer;
    transform: translate(90px, 0);
    opacity: 0;
    transition: opacity 0.35s, transform 0.35s;
  }

  /* 接下来是鼠标悬停时的样式变化 */
  figure:hover figcaption::before,
  figure:hover figcaption::after {
    transform: translate(0, 0);
  }

  figure:hover video {
    opacity: 0.8;
    width: 91%;
    height: 96.8%;
  }

  figure:hover p i {
    transform: translate(5%, 0);
    opacity: 1;
  }

  figure:hover p i {
    opacity: 1;
  }

  /* 设置各个图标的动画延迟（实现逐个进入） */
  figure:hover p i:nth-child(1) {
    transition-delay: 0.025s;
  }

  figure:hover p i:nth-child(2) {
    transition-delay: 0.05s;
  }

  figure:hover p i:nth-child(3) {
    transition-delay: 0.07s;
  }

  figure:hover p i:nth-child(4) {
    transition-delay: 0.1s;
  }

  figure p i:hover {
    color: #f3cf3f;
  }
}

.box {
  background-color: #fff;
  transition: all 0.25s;
  width: 380px;
  .workContent {
    cursor: pointer;
    padding: 35px 10px;
    height: 230px;
    width: 100%;
    li {
      margin: 5px 0;
      font-weight: 700;
      color: #333;
      span {
        font-weight: 400;
      }
      p {
        text-indent: 2em;
        font-weight: 400;
        overflow: hidden;
        font: 14px 'Microsoft YaHei', '宋体', san-serif;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
    }
  }
}
.box:hover {
  background-color: #f4f0ea;
  box-shadow: 2px 2px 5px #dcdcdc;
  transform: translate(0, -1%);
}
</style>