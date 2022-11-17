<template>
  <div>
    <div class="m instructions">
      <span class="title">报名须知</span>
      <br />
      <span>Instructions</span>
      <div class="box">
        <div class="miniBox" v-for="(item, index) in rule" :key="index">
          <div class="konwTitle">
            <i class="iconfont" :class="item.iconfont"></i>
            <span>{{ item.title }}</span>
          </div>
          <div class="rule">{{ item.ruleText }}</div>
          <div>
            <div class="xiangxi" @click="toRule">详细>></div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="考试须知" :visible.sync="dialogVisible" width="50%">
      <p>
        1．考前三十分钟，考生需持符合报考规定的并与准考证显示信息一致的有效证件，进入规定的考场。
      </p>
      <p>
        2．考试期间考生可携带物品：签字笔、铅笔、橡皮、二十四色彩笔（包含黑色、蓝色、棕色、绿色、灰色、橙色、粉色、紫色、红色、黄色）铅笔盒、塑料瓶装水、药品、纸巾和准考证
      </p>
      <p>
        3．考试期间需放在指定区域的禁止携带物品：处于关闭状态下的手机、相机或任何其他电子产品、字典、笔记本、修正液/修正带等、纸张、书包、手提包、行李箱。
      </p>
      <p>4．考场内不得相互借用文具。严禁在考场内饮食。</p>
      <p>5．考生入场后，按号入座，将本人《准考证》放在课桌上，以便核验。</p>
      <p>6．统一开考信号发出后才能开始答题。</p>
      <p>
        7．笔试开考10分钟内，允许迟到考生进入考场参加考试，考试结束时间按照统一规定结束。开考10分钟后，禁止迟到考生入场考试。提前离场考生离场后不得进场续考。考试最后十分钟内考生不得离场。
      </p>
      <p>
        8．考生领到试卷后，必须先在指定位置准确，清楚地填写姓名，准考证号，座位号等栏目。
      </p>
      <p>
        9．考生遇试卷分发错误及试题字迹不清等问题可举手询问，监考人员应当众答复；涉及试题内容的疑问，不得向监考人员询问。
      </p>
      <p>
        10．考生在考场内必须保持安静，严格遵守考场纪律，不准交头接耳，左顾右盼；不准偷看，抄袭他人答案；不准夹带，冒名或换卷，对于违反考场规则，不服从监考人员管理和舞弊者按违反考场规则处理，情节严重的将取消本次考试资格或限期停考。
      </p>
      <p>
        11．考生离开考场时必须交卷，不准携带试卷离开考场。离开考场后不准在考场附近逗留和交谈。
      </p>
      <p>
        12．考试结束铃声响后考生立即停止答卷，并将试卷按顺序整理好放在桌上，待监考人员允许后方可离场。
      </p>
      <p>13．笔试结束后，考生应服从监考人员的管理，在口试候考室候考。</p>
      <p>
        14．等待口试考试。口试完毕后，考生应迅速离开口试考场，不得与候考室考生接触。
      </p>
      <p>
        15．考生应自觉服从监考人员管理，任何人不得以任何理由妨碍监考人员进行正常工作。监考人员有权对考场内发生的问题，按规定做出处理。
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Instructions',
  data() {
    return {
      rule: [
        {
          iconfont: 'icon-first-circle',
          title: '规定一',
          ruleText:
            '考前三十分钟，考生需持符合报考规定的并与准考证显示信息一致的有效证件，进入规定的考场。考试期间考生可携带物品：签字笔、铅笔、橡皮、二十四色彩笔（包含黑色、蓝色、棕色、绿色、灰色、橙色、粉色、紫色、红色、黄色）铅笔盒、塑料瓶装水、药品、纸巾和准考证。考试期间需放在指定区域的禁止携带物品：处于关闭状态下的手机、相机或任何其他电子产品、字典、笔记本、修正液/修正带等、纸张、书包、手提包、行李箱。考场内不得相互借用文具。严禁在考场内饮食。考生入场后，按号入座，将本人《准考证》放在课桌上，以便核验。',
        },
        {
          iconfont: 'icon-second-circle',
          title: '规定二',
          ruleText:
            '统一开考信号发出后才能开始答题。笔试开考10分钟内，允许迟到考生进入考场参加考试，考试结束时间按照统一规定结束。开考10分钟后，禁止迟到考生入场考试。提前离场考生离场后不得进场续考。考试最后十分钟内考生不得离场。考生领到试卷后，必须先在指定位置准确，清楚地填写姓名，准考证号，座位号等栏目。考生遇试卷分发错误及试题字迹不清等问题可举手询问，监考人员应当众答复；涉及试题内容的疑问，不得向监考人员询问。考生在考场内必须保持安静，严格遵守考场纪律，不准交头接耳，左顾右盼；不准偷看，抄袭他人答案；不准夹带，冒名或换卷，对于违反考场规则，不服从监考人员管理和舞弊者按违反考场规则处理，情节严重的将取消本次考试资格或限期停考。',
        },
        {
          iconfont: 'icon-third-circle',
          title: '规定三',
          ruleText:
            '考生离开考场时必须交卷，不准携带试卷离开考场。离开考场后不准在考场附近逗留和交谈。考试结束铃声响后考生立即停止答卷，并将试卷按顺序整理好放在桌上，待监考人员允许后方可离场。笔试结束后，考生应服从监考人员的管理，在口试候考室候考。等待口试考试。口试完毕后，考生应迅速离开口试考场，不得与候考室考生接触。考生应自觉服从监考人员管理，任何人不得以任何理由妨碍监考人员进行正常工作。监考人员有权对考场内发生的问题，按规定做出处理。',
        },
      ],
      dialogVisible: false,
    }
  },
  methods: {
    toRule() {
      this.dialogVisible = true
    },
  },
}
</script>

<style lang="less" scoped>
.instructions {
  font-family: KaiTi;
  color: #2c58b6;
  margin-bottom: 60px;
  .title {
    font-size: 32px;
  }
  .box {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .miniBox {
      width: 380px;
      height: 310px;
      border: 1px solid #e4e4e4;
      .konwTitle {
        text-align: center;
        display: flex;
        justify-content: center;
        height: 70px;
        align-items: center;
        margin: 0 10px;
        border-bottom: 1px solid #e4e4e4;
        .iconfont {
          font-size: 50px;
        }
        span {
          margin-left: 10px;
          color: #000;
          font-size: 30px;
          line-height: 50px;
        }
      }
      .rule {
        font: 14px 'Microsoft YaHei', '宋体', san-serif;
        height: 185px;
        color: #646464;
        margin: 0 40px;
        padding-top: 20px;
        line-height: 200%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
      }
      .xiangxi {
        text-align: right;
        margin: 15px 40px 0 0;
        cursor: pointer;
      }
      .xiangxi:hover {
        text-decoration: underline;
      }
    }
  }
}

.el-dialog p {
  text-indent: 2em;
  color: #000;
  font-family: '微软雅黑';
  line-height: 25px;
  margin-bottom: 5px;
  .el-dialog__title {
    font-size: 24px;
  }
}
</style>