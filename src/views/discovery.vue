<template>
<!-- 发现音乐界面 -->
  <div id="discovery">
    <div id="img">          <!-- 轮播图 -->
      <el-carousel :interval="4000" type="card" height="200px" width='90%'>
       <el-carousel-item v-for="(item ,i ) in banner" :key="i">
        <img class="banners" :src="item.imageUrl" alt="">
      </el-carousel-item>
      </el-carousel>
    </div> 
<!-- 推荐歌单 -->
    <div id="recommend">
      <h3>推荐歌单</h3>
      <div class="songseet">
        <div v-for="(item,index) in list" :key='index' class="songseetBox" @click="toPlaylist(item.id)">
          <div class="songseetImg">
              <div class="showtext" :title="list[index].copywriter">{{ list[index].copywriter }}</div>
              <img :src="list[index].picUrl" alt="">
              <el-button type="danger" circle class="play-btu">
                  <i class="el-icon-caret-right" circle></i>
              </el-button>
          </div>
          <p class="songseetText" :title="list[index].name">{{ list[index].name }}</p>
        </div>  
      </div> 
    </div>
<!-- 最新音乐 -->
    <div class="newmusic">
      <h3>最新音乐</h3>
      <div class="newmusic-box" v-for="(item,index) in img" :key="index"> 
        <div class="newmusic-box-music" @click="playmusic(item.id)">
          <div class="newmusic-box-img">
            <img :src="img[index].picUrl" >
          </div>
          <div class="newmusic-box-text">
              {{ img[index].name }}
              <div class="author">{{ img[index].song.album.artists[0].name }}</div>
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
<!-- 推荐MV -->
    <div id="discovery-MV">
      <h3>推荐mv</h3>
      <div class="discovery-MV-box" v-for="(item, index) in mv" :key="index" @click="tomv(item.id)">
        <div class="discovery-MV-box-mv">
          <img :src="mv[index].picUrl" alt="" class="discovery-MV-box-mvs">
          <div class="triangle-box">
              <div class="triangle"></div><span>{{ mv[index].playCount }}</span>
          </div>
        </div>
        <div class="discovery-MV-box-music">{{ mv[index].name }}</div>
        <div class="discovery-MV-box-name">{{ mv[index].artistName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
      name: 'discovery',
      data(){
        return{
          banner:[],
          img:[],
          list:[],
          mv:[],
        }
      },
      methods:{
        playmusic(id){      //播放地址
          axios.get('https://autumnfish.cn/song/url?id='+id).then(
            res => {
              let url= res.data.data[0].url;
              
              console.log(this.$parent.musicUrl);
              this.$parent.musicUrl = url;
            }
          )
        },
        toPlaylist(id){
            this.$router.push('/playlist?name='+ id)
        },
        tomv(id){
          this.$router.push('/mvContent?name=' + id)
        }
      },
      created(){
        // 轮播图接口
        axios.get('https://autumnfish.cn/banner').then(
          res => {
            this.banner = res.data.banners;
            // console.log(this.banner);
          }
        ),
        axios.get('https://autumnfish.cn/personalized?limit=10').then(
          res => {      //歌单
            this.list = res.data.result;
            // console.log(this.list);
          }
        ),
        axios.get('https://autumnfish.cn/personalized/newsong').then(
          res =>{
            this.img = res.data.result;
            // console.log(this.img);
          }
        ),
        axios.get('https://autumnfish.cn/personalized/mv').then(
          res =>{         //mv
            this.mv = res.data.result;
            // console.log(res);
          }
        )
      }
}
</script>

<style scoped>
    #discovery{
        height: 100%;
        text-align: center;
    }
    #img{
      width: 800px;
      margin: auto;
      padding-top: 20px;
    }
    .banners{
      width: 100%;
      height: 100%;
      border-radius: 15px;
    }
    #recommend{
      margin: 30px 80px;
      /* background-color: gold; */
      text-align: left;
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
    .songseetImg:hover .play-btu{
      display: block;
    }
    .el-icon-caret-right{
      font-size: 15px;
    }
    .play-btu{
      position: absolute;
      bottom: 15px;
      right: 15px;
      display: none;
    }
    .songseetText{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      padding: 10px;
      width: 150px;
      margin-top: -10px;
    }
    #recommend h3{
      margin-left: 62px;
      margin-top: 20px;
    }
    img{
      width: 100%;
      height: 100%;
    }
    .newmusic{
      margin:10px 130px;
      padding: 10px;
      text-align: left;
    }
    .newmusic-box{
      margin-top: 30px;
      float: left;
      text-align: left;
    }
    .newmusic-box:hover{
      background: rgba(0, 0, 0, 0.1);
      cursor:pointer;
    }
    .newmusic-box-music{
      width: 404px;
      height: 100px;
      margin-right: 30px;
    }
    .newmusic-box-img{
      width: 100px;
      height: 100px;
      background-color: silver;
      float: left;
      margin-right: 20px;
    }
    .newmusic-box-text{
      font-size: 19px;
      line-height: 50px;
    }
    .author{
      font-size: 16px;
      color: rgb(139, 119, 119);
    }
    .clear{
      clear: both;
      display: block;
    }
    #discovery-MV{
      width: 900px;
      margin:  20px 0 50px 130px;
      position: relative;
      height: 200px;
    }
    .discovery-MV-box{
      margin-top: 50px;
      float: left;
      cursor: pointer;
      text-align: left;
    }
    #discovery-MV h3{
      position: absolute;
      left: 10px;
      margin-top: 10px;
    }
    .discovery-MV-box-mv{
      height: 120px;
      width: 200px;
      border-radius: 7px;
      margin: 10px;
      text-align: right;
      position: relative;
      overflow: hidden;
    }
    .triangle{
      border-top: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 6px white solid;
      display: inline-block;
      margin-top: 5px;
    }
    .discovery-MV-box span{
       padding-right: -5px;
       color: white;
    }
    .triangle-box{
      position: absolute;
      right: 5px;
      top: 1px;
    }
    .discovery-MV-box-music{
      margin-left: 10px;
      width: 200px;
    }
    .discovery-MV-box-name{
      margin-bottom: 60px;
      margin-left: 10px;
      color: rosybrown;
      font-size: 14px;
      padding-top: 10px;
    }
    .discovery-MV-box-mv:hover{
      background:rgba(0, 0, 0, 0.2)
    }
</style>
