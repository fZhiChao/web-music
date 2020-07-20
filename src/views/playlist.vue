<template>
  <div id="playlist">
    <div id="playlist-top">
      <div class="playlist-top-img">
        <img :src="playlist.coverImgUrl" alt="">
      </div>
      <div class="playlist-top-right">
        <div class="playlist-top-music">
          {{ playlist.name }}
        </div>
        <div class="playlist-top-name">
            <div class="Headphoto">
            <img :src="playlist.creator.avatarUrl" alt="">              
            </div>
            <h5>{{ playlist.creator.nickname }}</h5>
            <span>{{ playlist.createTime }}</span>
        </div>
        <div class="playlist-top-button">
            <div class="circle">
              <div class="playbtu"></div>
            </div>
            全部播放
        </div>
        <div class="playlist-top-label">
          <span class="playlist-top-text">标签：</span>
          <ul>
            <li v-for='(item,index) in playlist.tags' :key="index" >{{item}}</li>
          </ul>
        </div>
        <div class="playlist-top-info">
          <span class="playlist-top-text">简介：</span>
          <span>{{ playlist.description }}</span>
        </div>        
      </div>
    </div>

    <div class="playlist-bottom">
      <el-tabs v-model="activeName" >
        <el-tab-pane label="歌曲列表" name="first">
            <table class="el-table playlit-table" stripe='true' style="width: 100%">
              <thead>
                <th></th>
                <th></th>
                <th>歌曲</th>
                <th>歌手</th>
                <th>专辑</th>
                <th>时长</th>
              </thead>
          <tbody>
            <tr v-for='(item, index) in musics' :key='index' class="el-table__row" @click="play(item.id)">
              <td id="tab-td"> {{ index+1 }}</td>
              <td style="width: 150px">
                <div class="table-img">
                  <img :src="musics[index].al.picUrl" alt="">
                </div>
              </td>
              <td style="width: 250px" id="new-td">
                {{ item.name }}

              </td>
              <td style="width: 180px">{{ item.ar[0].name }}</td>
              <td style="width: 250px">{{ item.al.name }}</td>
              <td>{{ item.dt }}</td>
            </tr>
          </tbody>
          </table>
      </el-tab-pane>

      <el-tab-pane label="评论" name="second">
        <ul class="comment">
          <h3>热门评论&nbsp;（{{ comment.length }}）</h3>
          <li class="newcomment-box" v-for="(item, index) in comment" :key="index">
            <div class="newcomment-img">
              <img :src="comment[index].user.avatarUrl" alt="">
            </div>
            <div class="newcomment-data">
              <span class="newcomment-name">{{ item.user.nickname }}：</span>
              <span>{{ item.content }}</span>
              <div class="reply" v-if="item.beReplied!=0">
                <div class="reply-img">
                  <img :src="item.beReplied[0].user.avatarUrl" alt="">
                </div>
                <span class="newcomment-name">{{ item.beReplied[0].user.nickname }}：</span>
                {{ item.beReplied[0].content }}
              </div>
              <p>2018-09-12 </p>
            </div>
          </li>
        </ul>

        <ul class="newcomment">
          <h3>最新评论（{{ total }}）</h3>
          <li class="newcomment-box" v-for="(item, index) in newComment" :key="index">
            <div class="newcomment-img">
              <img :src="item.user.avatarUrl" alt="">
            </div>
            <div class="newcomment-data">
              <span class="newcomment-name">{{ item.user.nickname }}：</span>
              <span>{{ item.content }}</span>
              <div class="reply" v-if="item.beReplied.length!=0">
                <div class="reply-img">
                  <img :src="item.beReplied[0].user.avatarUrl" alt="">
                </div>
                <span class="newcomment-name">{{ item.beReplied[0].user.nickname }}：</span>
                {{ item.beReplied[0].content }}
              </div>
              <p>2018-09-12 </p>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      </el-tabs>
    </div>
        
     <dir class="page">
       <el-pagination
        @current-change="handleCurrentChange"
        :page-size="5"
        :current-page='page'
        layout="prev, pager, next"
        :total="total">
        </el-pagination>
     </dir>   
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
      return{
        activeName: 'first',
        playlist:{},          //歌单详情数据
        musics:[],            //歌曲列表
        comment: [],          //热门评论
        newComment:[],       //最新评论
        total: 0,
        page: 1,
      }
    },
    methods:{
      handleCurrentChange(cal){
          this.page = cal 

          axios.get(`https://autumnfish.cn/comment/playlist?id=${this.$route.query.name}&limit=10&offset=${(this.page-1)*10}`).then(
          res => {
                      // console.log(res);
                      this.newComment = res.data.comments
                      this.total = res.data.total
                    })
      },
      handleClick(){

      }
    },
    created(){
      // 获取歌单详情
        axios.get('https://autumnfish.cn/playlist/detail?id='+ this.$route.query.name).then(
            res => {
                // console.log(res);
                this.playlist = res.data.playlist;
                this.musics = res.data.playlist.tracks;

                for(let i=0; i<this.musics.length; i++){
                    let time = this.musics[i].dt/1000;
                    let fen = parseInt(time/60)
                    if(fen < 10){
                      fen = '0'+ fen;
                    }

                    let s =parseInt(time%60)
                    if( s < 10){
                      s = '0'+s
                    }
                    this.musics[i].dt = `${fen}:${s}`
                }
                // this.playlist.createTime = 
            }
        )
        // 获取评论详情
        axios.get(`https://autumnfish.cn/comment/hot?id=${this.$route.query.name}&type=2`).then(
            res =>{
              // console.log(res);
              this.comment = res.data.hotComments
            }
        )
        //获取最新评论
        axios.get(`https://autumnfish.cn/comment/playlist?id=${this.$route.query.name}&limit=10&offset=0`).then(
          res => {
                      // console.log(res);
                      this.newComment = res.data.comments
                      this.total = res.data.total
                    })
    }
}
</script>

<style>
    #playlist{
        height: 100%;
        margin: 20px 50px;
    }
    #playlist-top{
      width: 100%;
      /* height: 20%; */
      padding: 20px 0 20px 20px;
      /* background-color: red; */
    }
    .playlist-top-music{
      margin-top: 10px;
      font-size: 18px;
    }
    .playlist-top-img{
      width: 230px;
      height: 230px;
      border-radius: 5px;
      overflow: hidden;  
      /* display: inline-block; */
      float: left;
    }
    .playlist-top-right{
      margin-left: 270px;
      /* background-color: aqua; */
    }
    .playlist-top-button{
      background-color: crimson;
      width: 120px;
      height: 30px;
      border-radius: 8px;
      margin-top: 20px;
      cursor: pointer;
      color: white;
    }
    .circle{
      margin-left: 10px;
      line-height: 50px;
      width: 16px;
      height: 16px;
      border-radius: 20px;
      border: 2px white solid;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      display: inline-block;
      margin-right: 5px;
    }
    .playbtu{
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-right: 5px solid transparent;
      border-left: 5px white solid;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-25%, -50%);
    }
    .playlist-top-label{
      margin-top: 20px;
    }
    .playlist-top-info{
      margin-top: 20px;
      /* word-break:break-all; */
      display:-webkit-box;
      -webkit-line-clamp:3;
      -webkit-box-orient:vertical;
      overflow:hidden;
    }
    .playlist-bottom{
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .el-tabs__item{
      font-size: 16px !important;
    }
    .Headphoto{
      width: 40px;
      height: 40px;
      border-radius: 40px;
      float: left;
      margin-top: -10px;
      margin-right: 10px;
      overflow: hidden;
    }
    .playlist-top-name{
      margin-top: 30px;
      margin-bottom: 30px;
    }
    .playlist-top-name h5{
      display: inline-block;
      margin-right: 10px;
    }
    .comment{
      margin-bottom: 60px;
    }
    .playlist-top-text{
      font-weight:bold;
      float: left;
    }
    .playlist-top-label ul>li{
      display: inline;
    }
    .playlist-top-label ul>li:not(:last-child)::after{
      content: '/';
      margin: 0 5px;
    }
    .newcomment-img{
      width: 50px;
      height: 50px;
      float: left;
      margin: 0 5px;
      border-radius: 50px;
      overflow: hidden;
    }
    .newcomment-box{
      margin-top: 40px;
      font-size: 15px;
      
    }
    .newcomment-name{
      color: lightblue;
      padding-bottom: 20px;
    }
    .newcomment-data p{
      margin-top: 10px;
      color: lightgray;
      padding-bottom: 10px;
      border-bottom: lightgray 1px solid;
    }
    .newcomment-data{
      margin-left: 70px;
    }
    .reply{
      background-color: rgb(247, 245, 245);
      padding: 10px 10px;
      border-radius: 5px;
      margin-top: 5px;
    }
    .reply-img{
      width: 30px;
      height: 30px;
      float: left;
      overflow: hidden;
      border-radius: 30px;
      margin-top: -5px; 
      margin-right: 5px;
    }
    .el-table__row{
      cursor: pointer;
    }
    .page{
      text-align: center;
      margin-top: 50px;
    }
    
</style>