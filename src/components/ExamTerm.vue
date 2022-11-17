<template>
  <div>
    <div class="examTerm">
      <img src="../assets/images/term.png" alt="" />
      <div class="examTermBox">
        <div class="m">
          <div class="termText">
            <div class="termTitle">报考条件</div>
            <div class="termTitleEnglish">Exam term</div>
            <p>
              具有中华人民共和国国籍的公民，并且没有到法定退休年龄;普通高等学校全日制学生需要是在校三年级及以上;遵守宪法和法律，热爱教育事业，具有良好的思想品德;符合认定教师资格的体检标准;具有良好的身体素质，按照体检要求及规定的标准和程序参加体格检查，体检结论为合格;符合《教师法》规定的学历要求;报考教资考试，是有学历要求的，各地教资考试报考学历条件请以当地新报名公告要求为准;
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExamTerm',
}
</script>

<style lang="less" scoped>
.examTerm {
  position: relative;
  margin-bottom: 60px;
  img {
    width: 50%;
    min-width: 600px;
  }
  .examTermBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .m {
      display: flex;
      flex-direction: row-reverse;
      .termText {
        width: 600px;
        height: 300px;
        color: #2c58b6;
        font-family: KaiTi;
        padding-top: 8vh;
        padding-left: 10px;
        .termTitle {
          font-size: 32px;
          margin-left: 24pt;
        }
        .termTitleEnglish {
          margin-left: 24pt;
          margin-bottom: 20px;
        }
        p {
          text-indent: 2em;
          line-height: 22pt;
          font: 16px 'Microsoft YaHei', '宋体', san-serif;
          line-height: 200%;
          color: #646464;
        }
      }
    }
  }
}
</style>