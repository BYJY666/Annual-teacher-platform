<template>
  <div>
    <div ref="main" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
])

export default {
  name: 'Echarts1',
  methods: {
    async echarts() {
      let chartDom = this.$refs.main
      let myChart = echarts.init(chartDom)

      const { data: res } = await this.$http.get('/work/examine')
      if (res.meta.status !== 200) return this.$message.error(res.meta.message)

      let option

      option = {
        title: {
          text: '作品审核概况',
          left: 'left',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'right',
        },
        color: ['#43CD80', '#FFA07A'],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '70%',
            data: [
              { value: res.data.reviewed, name: '已审核' },
              { value: res.data.unapproved, name: '未审核' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }

      option && myChart.setOption(option)
    },
  },
  mounted() {
    this.echarts()
  },
}
</script>

<style>
</style>