<template>
<div id="app">
  <main-header></main-header>
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
        <el-select v-model="value9" filterable placeholder="类型">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="col-md-3 input-wrapper">
        <el-input
          size="medium"
          placeholder="搜索"
          prefix-icon="el-icon-search"
          v-model="input21">
        </el-input>
        <el-button icon="el-icon-search" circle></el-button>
      </div>
    </div>
    <div class="col-md-12 movie-item" v-for="movie in movies" :key="movie" @click="chooseMovie(movie)">
      <div class="col-md-3">
        <img :src="movie.imgUrl" style="height:80px">
      </div>
      <div class="col-md-3">
        <div class="movie-name">
          {{movie.title}}
        </div>
        <div class="movie-enName">
          ￥票房：{{movie.box_offic_all}}<span v-if="parseFloat(movie.box_offic_all)>100">万</span>
          <span v-else>亿</span>
        </div>
      </div>
      <div class="col-md-2">
        <div class="type">{{movie.types}}</div>
      </div>
    </div>
  </div>
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
      types:[{
        value: '选项1',
        label: '动作'
      }, {
        value: '选项2',
        label: '爱情'
      }, {
        value: '选项3',
        label: '喜剧'
      }, {
        value: '选项4',
        label: '战争'
      }, {
        value: '选项5',
        label: '科幻'
      }],
      value8: '',
      value9: '',
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
.type{
  height: 80px;
  vertical-align: center;
  line-height: 80px;
}
.input-wrapper{
  display: flex;
  flex-wrap: nowrap;
}
</style>
