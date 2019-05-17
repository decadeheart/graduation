<template>
  <div id="app">
  <main-header></main-header>
  <el-container>
    <el-header class="table-head" :md="16">今日({{currentdate}})热映影片票房预测
    </el-header>
    <el-main :md="16">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>电影名字</th>
          <th>上映天数（天）</th>
          <th>本周票房</th>
          <th>当前累计票房</th>
          <th>总计预测</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tableData in tableDatas" :key="tableData" v-show="tableData.days<30&&tableData.box_offic_predict.length>2">
          <td>{{tableData.title}}</td>
          <td>{{tableData.days}}</td>
          <td>{{tableData.box_offic_1w}}{{tableData.box_offic_all}}
             <span v-if="parseFloat(tableData.box_offic_1w)>100">万</span>
          <span v-else>亿</span>
          </td>
          <td>{{tableData.box_offic_all}}{{tableData.box_offic_all}}
             <span v-if="parseFloat(tableData.box_offic_all)>100">万</span>
          <span v-else>亿</span>
          </td>
          <td>{{tableData.box_offic_predict}}<span v-if="parseFloat(tableData.box_offic_predict)>100">万</span>
          <span v-else>亿</span></td>
        </tr>
      </tbody>
    </table>
    </el-main>
  </el-container>
  <el-container>
    <el-header class="table-head" :md="16">历史预测
    </el-header>
    <el-main :md="16">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>上映日期</th>
          <th>电影名字</th>
          <th>总计预测</th>
          <th>实际统计</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tableData in tables" :key="tableData" v-show="tableData.box_offic_predict.length>2&&tableData.days>30">
          <td>{{tableData.releaseTime}}</td>
          <td>{{tableData.title}}</td>
          <td>{{tableData.box_offic_predict}}
          <span v-if="parseFloat(tableData.box_offic_predict)>100">万</span>
          <span v-else>亿</span>
          </td>
          <td>{{tableData.box_offic_all}}
            <span v-if="parseFloat(tableData.box_offic_all)>100">万</span>
            <span v-else>亿</span>
          </td>
        </tr>
      </tbody>
    </table>
    </el-main>
  </el-container>
  </div>
</template>

<script>
import api from "../base/api.js"
import Header from "./Header.vue"

export default {
  components: {
    "main-header": Header,
  },
  data () {
    return {
      isCollapse: true,
      currentdate:'',
      tableDatas:'',
      tables: '',
    }
  },
  mounted(){
       //获取今日日期
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    this.currentdate = year + seperator1 + month + seperator1 + strDate;
    let self = this
    api.getMovieList()
    .onSuccess(function(resp){
      console.log(resp)
      self.tables=resp.movies
      self.tableDatas=resp.movies
    })
    .onFail(function(){
      console.log("error2")
    })
  },
  methods: {
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

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
  text-decoration: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.table-head{
  line-height: 60px;
  font-weight: bold;
  font-size: 40px;
}
th{
  text-align: center;
}
</style>
