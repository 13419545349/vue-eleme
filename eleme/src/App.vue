<template>
  <div id="app">
    <myheader :seller="seller"></myheader>
    <div class="tab">
      <router-link to="/goods" tag="div" class="tab-item">商品</router-link>
      <router-link to="/ratings" tag="div" class="tab-item">评价</router-link>
      <router-link to="/seller" tag="div" class="tab-item">商家</router-link>
    </div>
    <keep-alive>
    <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  const myheader = (resolve)=>{import ('./components/header/header').then((header)=>{resolve(header)})}
  import axios from 'axios'
  const ERR_OK = 0;
  export default {
    name: 'App',
    data() {
      return{
          seller:{}
      };
    },
    created(){
      axios.get('/api/seller').then((response)=>{
        if(response.data.errno == ERR_OK){
          this.seller = response.data.data
          console.log(this.seller)
        }
      })
    },
    components:{
      myheader
    }
  }
</script>

<style lang="less" scoped>
 @import './common/less/mixin.less';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    overflow:hidden;
    .tab{
      display:flex;
      width:100%;
      height:40px;
      line-height:40px;
      font-size:14px;
      color:rgb(77,85,93);
      .border-1px(rgba(7,17,27,0.1));
      .tab-item{
        flex:1;
        text-align: center;
      }
    }
  }
  .router-link-active{
    color:rgb(240,20,20)
  }
</style>
