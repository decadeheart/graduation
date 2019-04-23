<template>
  <div id="app">
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">票房预测</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3">消息中心</el-menu-item>
    <el-menu-item index="4">影库</el-menu-item>
  </el-menu>
  <el-container>
    <el-header class="table-head" :md="16">本周( 2019-04-01~2019-04-07 )热映影片票房预测
    </el-header>
    <el-main :md="16">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>电影名字</th>
          <th>首映日期</th>
          <th>上映天数（天）</th>
          <th>总计预测（万）</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tableData in tableDatas" :key="tableData">
          <td>{{tableData.name}}</td>
          <td>{{tableData.date}}</td>
          <td>{{tableData.days}}</td>
          <td>{{tableData.number}}</td>
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
          <th>总计预测（万）</th>
          <th>实际统计（万）</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tableData in tables" :key="tableData">
          <td>{{tableData.date}}</td>
          <td>{{tableData.name}}</td>
          <td>{{tableData.number}}</td>
          <td>{{tableData.actual}}</td>
        </tr>
      </tbody>
    </table>
    </el-main>
  </el-container>
  </div>
</template>

<script>
import api from "../base/api.js"

export default {
  name: 'app',
  data () {
    return {
      activeIndex2: '1',
      isCollapse: true,
      tableDatas: [{
          date: '2016-05-02',
          name: '王小虎',
          days: '19',
          number:'10',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          days: '19',
          number:'10',
        }, {
          date: '2016-05-01',
          name: '王小虎',
          days: '19',
          number:'10',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          days: '19',
          number:'10',
      }],
      tables: [{
          date: '2016-05-02',
          name: '王小虎',
          actual: '19',
          number:'10',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          actual: '19',
          number:'10',
        }, {
          date: '2016-05-01',
          name: '王小虎',
          actual: '19',
          number:'10',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          actual: '19',
          number:'10',
      }],
    }
  },
  mounted(){
    api.getMovieList()
    .onSuccess(function(resp){
      console.log(resp)
    })
    .onFail(function(){
      console.log("error2")
    })
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if(key==4){
        this.activeIndex2=4;
        location.replace("/html/movieList.html");

      }
      if(key==3){
        this.activeIndex2=3;
        location.href="/html/movieList.html";

      }
      if(key==2){
        this.activeIndex2=2;
        location.href="/html/movieList.html";

      }
      if(key==1){
        this.activeIndex2=1;
        location.href="/html/index.html";

      }
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
