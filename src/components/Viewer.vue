<template>
  <div id="app">
    <div class="header" :md="24">
      老师·好 &nbsp;&nbsp;观影者画像
    </div>
    <div class="main container" :md="20">
      <div class="genderChart">
        <div class=genderTitle>受众性别占比</div>
        <div class="chartSize" ref="myEchart"></div>
      </div>
      <div class="genderChart">
        <div class=genderTitle>教育程度</div>
        <div class="chartSize" ref="eduEchart"></div>
      </div>
    </div>
    <div class="main container" :md="20">
      <div class="ageChart">
        <div class=genderTitle>受众年龄比例</div>
        <div class="ageChartSize" ref="ageEchart"></div>
      </div>
      <div class="ageChart">
        <div class=genderTitle>活跃地区</div>
        <div class="ageChartSize" ref="areaEchart"></div>
      </div>
    </div>
    <div class="main container" :md="20">
      <div class="ageChart">
        <div class=genderTitle>职业</div>
        <div class="ageChartSize" ref="occupyEchart"></div>
      </div>
      <div class="ageChart">
        <div class=genderTitle>电影类型偏好</div>
        <div class="ageChartSize" ref="preferEchart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../base/api.js"
import echarts from "echarts"

export default {
  data () {
    return {
      activeIndex2: '1',
      isCollapse: true,
      chart: null,
      genderData:[{
            name: '男生53.2%',            // First tree
            value: 53.2,
        }, {
            name: '女生46.8%',            // Second tree
            value: 46.8
      }],
      eduData:[{
            name: '本科及以上53.2%',            // First tree
            value: 53.2,
        }, {
            name: '本科以下46.8%',            // Second tree
            value: 46.8
      }],
      ageData:[4.3, 33.9, 30, 15.8, 8.4, 7.6],
      areaData:[14.6,41.9,23.1,20.4],
      occupyData:[
              {value:12.2, name:'学生'},
              {value:55.6, name:'白领'},
              {value:32.2, name:'其他'},
          ],
      preferData:[
              {value:12.2, name:'喜剧'},
              {value:55.6, name:'动作'},
              {value:32.2, name:'爱情'},
      ]
    }
  },
  mounted(){
    this.initGenderChart()
    this.initEduChart()
    this.initAgeChart()
    this.initAreaChart()
    this.initOccupyChart()
    this.initPreferChart()
  },
  methods: {
    initGenderChart(){
      let self = this
      self.chart = echarts.init(self.$refs.myEchart);
      self.chart.setOption({
        series:[{
        type: 'treemap',
        data: self.genderData
        }]
      })
    },
    initEduChart(){
      let self = this
      self.chart = echarts.init(self.$refs.eduEchart);
      self.chart.setOption({
        series:[{
        type: 'treemap',
        data: self.eduData
        }]
      })
    },
    initAgeChart(){
      let self = this
      self.chart = echarts.init(self.$refs.ageEchart);
      self.chart.setOption({
        tooltip:{
          trigger: 'item',
          formatter:'{c}%'
        },
        xAxis: {
            type: 'category',
            data: ['20岁以下', '20~24', '25~29', '30~34', '35~39', '40岁以上']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} %'
                },
            show: true
        },
        series: [{
            data: self.ageData,
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}%'
                }
            }
        }]
      })
    },
    initAreaChart(){
      let self = this
      self.chart = echarts.init(self.$refs.areaEchart);
      self.chart.setOption({
        tooltip:{
          trigger: 'item',
          formatter:'{c}%'
        },
        xAxis: {
            type: 'category',
            data: ['一线城市', '二线城市', '三线城市', '四线城市']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} %'
                },
            show: true
        },
        series: [{
            data: self.areaData,
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}%'
                }
            }
        }]
      })
    },
    initOccupyChart(){
      let self = this
      self.chart = echarts.init(self.$refs.occupyEchart);
      self.chart.setOption({
        tooltip:{
          trigger: 'item',
          formatter:'{a} <br/>{b}{c}%'
        },
      series : [
        {
          name:'职业占比',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:self.occupyData,
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
        }
      ]
      })
    },
    initPreferChart(){
      let self = this
      self.chart = echarts.init(self.$refs.preferEchart);
      self.chart.setOption({
        tooltip:{
          trigger: 'item',
          formatter:'{a} <br/>{b}{c}%'
        },
      series : [
        {
          name:'偏好',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:self.preferData,
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
        }
      ]
      })
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header{
  height: 60px;
  background: rgb(84, 92, 100);
  color:#fff;
  line-height: 60px;
}
body{
  background: #f2f2f2;
}
.main{
  background: #fff;
  margin:20px auto;
  display: flex;
  flex-wrap: nowrap
}
.genderChart{
  height: 150px;
  width: 50%;
}
.chartSize{
  height: 100px;
  width: 100%;
}
.ageChartSize{
  height: 300px;
  width: 100%;
}
.ageChart{
  height: 320px;
  width: 50%;
}
</style>
