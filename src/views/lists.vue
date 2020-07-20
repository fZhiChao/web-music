<template>
<!-- 发现音乐界面 -->
  <div id="lists">
      <div id="listsrecommend">
        <div class="listsrecommend-img">
          <img :src="toplist.coverImgUrl" alt="" >
        </div>
        <div class="listsrecommend-recom-box">
          <span class="listsrecommend-recom">精品歌单</span>
          <div class="listsrecommend-recom-title">{{ toplist.name }}</div>
          <p>{{ toplist.description }}</p>
        </div>
        <img :src="toplist.coverImgUrl" alt="" class="listsrecommendBgimg">
        <div class="Bgimg"></div>
      </div>
<!-- 类型选择 -->
      <div id="style">
        <ul>
          <li class="style-li" @click='da("治愈")' :class='{active:tag=="治愈"}'>治愈  </li>
          <li class="style-li" @click='da("怀旧")' :class='{active:tag=="怀旧"}'>怀旧  </li>
          <li class="style-li" @click='da("ACG")' :class='{active:tag=="ACG"}'> ACG   </li>
          <li class="style-li" @click='da("影视原声")' :class='{active:tag=="影视原声"}'>影视原声 </li>
          <li class="style-li" @click='da("轻音乐")' :class='{active:tag=="轻音乐"}'>轻音乐 </li>
          <li class="style-li" @click='da("电子")' :class='{active:tag=="电子"}'>电子   </li>
          <li class="style-li" @click='da("民谣")' :class='{active:tag=="民谣"}'>民谣   </li>
          <li class="style-li" @click='da("摇滚")' :class='{active:tag=="摇滚"}'>摇滚   </li>
          <li class="style-li" @click='da("说唱")' :class='{active:tag=="说唱"}'>说唱   </li>
          <li class="style-li" @click='da("流行")' :class='{active:tag=="流行"}'>流行   </li>
          <li class="style-li" @click='da("华语")' :class='{active:tag=="华语"}'>华语   </li>
          <li class="style-li" @click='da("欧美")' :class='{active:tag=="欧美"}'>欧美   </li>
          <li class="style-li" @click='da("全部")' :class='{active:tag=="全部"}'>全部   </li>
        </ul>
      </div>
<!-- 精品歌单 -->
      <div id="recommend">
      <div class="songseet">
        <div v-for="(item,index) in list" :key='index' class="songseetBox" @click="toplaylist(item.id)">
          <div class="songseetImg">
              <div class="showtext">播放量：{{ item.playCount }}</div>
              <img :src="item.coverImgUrl" alt="">
              <el-button type="danger" circle id="play-btu">
                  <i class="el-icon-caret-right" circle></i>
              </el-button>
            </div>
            <p class="songseetText" :title="item.name">{{ item.name }}</p>
          </div>  
        </div> 
      </div>
<!-- 分页 -->
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="sum" 
          :page-size="10" :current-page='page' @current-change="handleCurrentChange">
        </el-pagination>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
      data(){
        return{
            toplist:{},  //顶部的精品歌单
            list:[],      //推荐歌单
            tag: '全部',
            sum: 0,       //分页总数
            page: 1,       //页码
        }
      },
      created(){
          this.topData()
          this.listData()
      },
      methods:{
          da(cla){        //点击类型获取类型名
              this.tag = cla;
              this.page = 1
          },
          topData(){
            axios.get('https://autumnfish.cn/top/playlist/highquality?limit=1&cat='+this.tag).then(
              res => {      //精品歌单
                this.toplist = res.data.playlists[0];
                // console.log(res);
              }
            )
          },
          listData(){
            axios.get(`https://autumnfish.cn/top/playlist/?limit=10&offset=${(this.page-1)*10}&cat=${this.tag}`).then(
            res => {        //歌单列表
                this.list = res.data.playlists;
                this.sum = res.data.total;
                // console.log(this.page);
              }
            )
          },
          handleCurrentChange(val){
            this.page = val;
            this.listData()
          },
          toplaylist(id){
            this.$router.push('/playlist?name='+ id)
          }
      },
      watch:{
        tag(){ 
          this.topData();
          this.listData();
         } //当数据发生改变时触发
      }
}
</script>

<style>
    #lists{
        height: 100%;
        width: 100%;
        /* background-color: violet; */
        text-align: center;
    }
    #listsrecommend{
      width: 870px;
      height: 150px;
      /* background-color: rosybrown; */
      margin-left: 140px;
      border-radius: 8px;
      margin-top: 20px;
      margin-bottom: 30px;
      text-align: left;
      display: flex;
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }
    .listsrecommend-img{
      width: 100px;
      height: 110px;
      background-color: saddlebrown;
      margin-left: 20px;
      margin-top: 20px;
      margin-right: 20px;
      z-index: 100;
    }
    img{
      width: 100%;
      height: 100%;
    }
    .listsrecommendBgimg{
      position: absolute;
      z-index: 0;
      width: 100%;
      filter: blur(20px);
    }
    .Bgimg{
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .listsrecommend-recom{
      border:sandybrown 1px solid;
      padding: 5px 10px;
      border-radius: 3px;
      font-size: 14px;
      color: sandybrown;
    }
    .listsrecommend-recom-box{
      height: 110px;
      width: 100%;
      margin: 22px 10px 0 0  ;
      float: right;
      color: rgb(197, 190, 190);
      z-index: 10;
    }
    .listsrecommend-recom-title{
      margin: 8px 0;
    }
    .listsrecommend-recom-box p{
      font-size: 13px;
      color: rgb(219, 214, 214);
      overflow:hidden;
      /* word-break:break-all; */
      display:-webkit-box;
      -webkit-line-clamp:3;
      -webkit-box-orient:vertical;
    }
    #style{
      margin-right: 135px;
      height: 20px;
    }
    .style-li{
      float: right;
      margin-right: 10px;
      font-size: 14px;
      cursor: pointer;
      color: rgb(219, 208, 208);
    }
    .style ul{
      margin-top: 0px;

    }
    #recommend{
      margin: 30px 80px;
      /* background-color: gold; */
      text-align: left;
    }
    .active{
      color: red;
    }
    .songseet{
      margin-top: 30px;
      text-align: center;
    }
    .songseetImg{
      margin: 10px 15px;
      height: 150px;
      width: 150px;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
    }
    .songseetBox{
      display:inline-block;
      cursor:pointer;
    }
    .showtext{
      background: rgba(31, 31, 22, 0.3);
      font-size: 14px;
      margin: 4px auto;
      color: white;
      position: absolute;
      padding: 0 10px;
      margin-top: -40px;
      width: 130px;
      height: 40px;
      letter-spacing:2px;
      word-break:break-all;
      display:-webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient:vertical;
      overflow:hidden;
    }
    .songseetImg:hover .showtext{
      transform: translateY(40px);
      transition: all 0.4s ease-in-out;
    }
    .el-icon-caret-right{
      font-size: 15px;
    }
    #play-btu{
      position: absolute;
      bottom: 15px;
      right: 15px;
      display: none;
    }
    .songseetImg:hover #play-btu{
      display: block;
    }
    .songseetText{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      padding: 10px;
      width: 150px;
      margin-top: -10px;
    }
    .block{
      margin-bottom: 50px;
    }
</style>