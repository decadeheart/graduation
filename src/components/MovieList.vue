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
  <div class="main container">
    <div class="col-md-12 search">
      <div class="col-md-3">
        <el-select v-model="value8" filterable placeholder="地区">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="col-md-3">
        <el-select v-model="value8" filterable placeholder="类型">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="col-md-3">
        <el-input
          size="medium"
          placeholder="搜索"
          prefix-icon="el-icon-search"
          v-model="input21">
        </el-input>
      </div>
    </div>
    <div class="col-md-12 movie-item" v-for="movie in movies" :key="movie" @click="chooseMovie(movie)">
      <div class="col-md-3">
        <img :src="movie.address" style="height:80px">
      </div>
      <div class="col-md-5">
        <div class="movie-name">
          {{movie.title}}
        </div>
        <div class="movie-enName">
          {{movie.englishTitle}}￥票房：{{movie.grade}}
        </div>
      </div>
    </div>
  </div>
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
      movies:'',
      options: [{
        value: '选项1',
        label: '大陆'
      }, {
        value: '选项2',
        label: '港台'
      }, {
        value: '选项3',
        label: '美国'
      }, {
        value: '选项4',
        label: '韩国'
      }, {
        value: '选项5',
        label: '日本'
      }],
      types:[
        {value:"1",
        leble:'动作',
        },
        {
          value:'2',
          lable:'喜剧',
        },
        {
          value:'3',
          lable:'纪录片'
        }
      ],
      value8: '',
      input21:'',
    }
  },
  mounted(){
    let self=this
    api.getMovieList()
    .onSuccess(function(resp){
      console.log(resp)
      self.movies=resp.movies
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
    chooseMovie(movie){
      location.href=`/html/detail.html?movieId=${movie.id}`
    }
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
body{
  background: #f2f2f2;
}
.main{
  padding:0 10px;
  background: #fff;
  margin:20px auto;
}
.movie-item{
  margin:10px 20px;
  height: 80px;
  cursor: pointer;
}
.movie-name{
  height: 40px;
  line-height: 40px;
  text-align: left;
}
.movie-enName{
  height: 40px;
  line-height: 40px;
  text-align: left;
  font-size: 12px;
  color:#999;
}
.search{
  height: 60px;
  border-bottom: 1px solid #999;
  padding: 10px 0;
}
</style>
