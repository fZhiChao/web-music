<template>
<!-- 发现音乐界面 -->
  <div id="mvs">
      <div id="mvs-box">
        <div class="mvs-box-address">
          <span>地区：</span>
          <ul class="mvs-box-ul">
            <li><span id="mvs-li" @click='area="全部"' :class="{activeds:area=='全部'}">  全部 </span></li>
            <li><span id="mvs-li" @click='area="内地"' :class="{activeds:area=='内地'}">  内地 </span></li>
            <li><span id="mvs-li" @click='area="港台"' :class="{activeds:area=='港台'}">  港台 </span></li>
            <li><span id="mvs-li" @click='area="欧美"' :class="{activeds:area=='欧美'}">  欧美 </span></li>
            <li><span id="mvs-li" @click='area="日本"' :class="{activeds:area=='日本'}">  日本 </span></li>
            <li><span id="mvs-li" @click='area="韩国"' :class="{activeds:area=='韩国'}">  韩国 </span></li>
          </ul>
        </div>
        <div class="mvs-box-address">
          <span>类型：</span>
          <ul class="mvs-box-ul">
            <li><span id="mvs-li" @click='type="全部"' :class="{activeds:type=='全部'}">  全部 </span></li>
            <li><span id="mvs-li" @click='type="官方版"' :class="{activeds:type=='官方版'}">  官方版 </span></li>
            <li><span id="mvs-li" @click='type="原声"' :class="{activeds:type=='原声'}">  原声 </span></li>
            <li><span id="mvs-li" @click='type="现场版"'  :class="{activeds:type=='现场版'}">  现场版 </span></li>
            <li><span id="mvs-li" @click='type="网易出品"'  :class="{activeds:type=='网易出品'}">  网易出品 </span></li>
          </ul>
        </div>
        <div class="mvs-box-address">
          <span>排序：</span>
          <ul class="mvs-box-ul">
            <li><span id="mvs-li" @click='order="上升最快"' :class="{activeds:order=='上升最快'}">  上升最快 </span></li>
            <li><span id="mvs-li" @click='order="最热"' :class="{activeds:order=='最热'}">  最热 </span></li>
            <li><span id="mvs-li" @click='order="最新"' :class="{activeds:order=='最新'}">  最新 </span></li>
          </ul>
        </div>
      </div>
<!-- mv -->
      <div class="mv-box">
          <div v-for='(item,index) in list' :key='index' class="mv-box-mv" @click="tomv(item.id)">
            <div class="img-bo">
              <div class="mv-box-mvimg">
                <img :src="item.cover" alt="">
                <div>
                  <div id="playerNum"></div>
                  <span>{{ item.playCount }}</span>
                </div>
              </div>
              <div id='musicName' :title="item.name">{{ item.name }}</div>
              <p>{{ item.artistName }}</p>
            </div>
          </div>
      </div>
      <div class="block bloca">
        <el-pagination layout="prev, pager, next"
        :total="total" 
        :page-size="5" 
        :current-page="page"
        @current-change="handleCurrentChange" 
        :limit='limit'>
        </el-pagination>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
      data(){
        return {
          area:'全部',
          type:'全部',
          order:'上升最快',
          limit: 8,
          page: 1,
          total: 20,
          list: [],
        }
      },
      watch: {
        area(){
          this.page = 1
          this.player()
        },
        type(){
          this.page = 1          
          this.player()
        },
        order(){
          this.page = 1          
          this.player()
        }
      },
      methods:{
        player(){
          axios({
            url:'https://autumnfish.cn/mv/all',
            method: 'get',
            params: {
              area: this.area,
              type:  this.type,
              order: this.order,
              limit:  this.limit,
              offset:  (this.page-1)*this.limit,
            }
          }).then(res => {
              // console.log(res);
              this.list = res.data.data;
              //处理播放次数
              for(let i=0; i<this.list.length; i++){
                  if(this.list[i].playCount >= 100000){
                      this.list[i].playCount = parseInt(this.list[i].playCount/10000) + '万'
                  }
              }
              if(res.data.count)
              this.total = res.data.count
            }
          )
        },
        //页码改变的回调函数
        handleCurrentChange(val){
          this.page = val
          this.player()
        },
        tomv(id){
          this.$router.push('/mvContent?name=' + id)
        }
      },
      created(){
        this.player()
      }
}
</script>

<style>
    #mvs{
        height: 100%;
        /* background-color: rgb(241, 241, 232); */
        padding: 30px 50px;
        margin: auto;
    }
    .mvs-box-address{
      display: flex;
      margin-bottom: 20px;
      /* background-color: blue; */
    }
    #mvs-box{
      /* background-color: darkmagenta; */
      margin: auto;
      margin-bottom: 60px;
      padding-left: 10px;
    }
    .mvs-box-ul{
      display: flex;
    }
    .mvs-box-ul li{
      margin: auto;
      color: rgb(204, 211, 210);
      cursor: pointer;
      border-right: rgb(204, 204, 204) 1px solid;
      height: 20px;
      width: 130px;
      text-align: center;
    }
    #mvs-li{
      padding: 2px 10px;
    }
    .mvs-box-ul :last-child{
      border: none;
    }
    .mv-box{
      /* background-color: darkorange; */
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .mv-box-mvimg{
      width: 250px;
      height: 160px;
      background-color:darkslategray;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
    }
    .mv-box-mv{
      float: left;
      height: 100%;
      margin: 0 5px 90px 5px;
      cursor: pointer;
    }
    .img-bo{
      width: 250px;
      height: 160px;
      font-size: 16px;
    }
    .mv-box-mv div p{
      font-size: 12px;
      color: darkgrey;
      margin: 10px 0;
      cursor: pointer;
    }
    #playerNum{
      width: 0;
      height: 0;
      border-right: 5px solid transparent;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 5px white solid;
      margin-right: 12px;
      margin-top: -1px;
    }
    .mv-box-mvimg div{
        position: absolute;
        right: 15px;
        top:4px;
        color: white;
        font-size: 12px;
    }
    .bloca{
      text-align: center;
      margin-top: 10px;
    }
    .el-pagination{
      margin: auto;
    }
    .activeds{
      color: white;
      background-color: tomato;
      border-radius: 15px;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
    #musicName{
      width: 220px;
      height: 42px;
      overflow: hidden;
      word-break:break-all;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
      display:-webkit-box;
      cursor: pointer;
    }
    .el-pagination{
      margin-top: -30px;
    }
</style>