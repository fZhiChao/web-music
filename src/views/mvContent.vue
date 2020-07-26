<template>
  <div id="mvContent">
      <div class="mvContent-mvplay">
          <div>
              
          </div>
          <h3>MV详情</h3> 
          <div class="video">
              <video :src="mvplay" controls autoplay></video>
          </div>
          <div class="mv-author">
              <div id="author-img">
                  <img :src="icon" alt="">
              </div>
              <h4>{{ author.artistName }}</h4>
          </div>
          <h1><b>{{ author.name }}</b></h1>

          <div class="time">
              <span>发布时间：{{ author.publishTime }}</span>
              <span>观看次数：{{ author.playCount }}</span>
          </div>
          <p>{{ author.desc }}</p>
<!-- 评论 -->
            <ul class="comment">
          <h3>热门评论&nbsp;（{{ hotconment.length }}）</h3>
          <li class="newcomment-box" v-for="(item, index) in hotconment" :key="index">
            <div class="newcomment-img">
              <img :src="hotconment[index].user.avatarUrl" alt="">
            </div>
            <div class="newcomment-data">
              <span class="newcomment-name">{{ item.user.nickname }}：</span>
              <span>{{ item.content }}</span>
              <div class="reply" v-if="item.beReplied!=0">
                <div class="reply-img">
                  <img :src="item.beReplied[0].user.avatarUrl" alt="">
                </div>
                <span class="newcomment-name">{{ item.beReplied[0].user.nickname }}：</span>
                <div class="mv-text-talk">{{ item.beReplied[0].content }}</div>
              </div>
              <p>2018-09-12 </p>
            </div>
          </li>
        </ul>

        <ul class="newcomment">
          <h3>最新评论（{{ total }}）</h3>
          <li class="newcomment-box" v-for="(item, index) in newconment" :key="index">
            <div class="newcomment-img">
              <img :src="item.user.avatarUrl" alt="">
            </div>
            <div class="newcomment-data">
              <span class="newcomment-name">{{ item.user.nickname }}：</span>
              <span>{{ item.content }}</span>
              <div class="reply" v-if="item.beReplied.length!=0">
                <div class="reply-imgs">
                  <img :src="item.beReplied[0].user.avatarUrl" alt="">
                </div>
                <div class="mv-text-content">
                    <span class="newcomment-name">{{ item.beReplied[0].user.nickname }}：</span>
                    <span class='mv-text-talk'> {{ item.beReplied[0].content }}</span>
                </div>
                
              </div>
              <p>2018-09-12 </p>
            </div>
          </li>
        </ul>
      </div>
<!-- 右侧MV推荐 -->
      <div class="recommend-mv">
          <h3>相关推荐</h3>
          <div class="recommend-mvs">
              <ul>
                  <li>
                      <div>
                          <div v-for='(item,index) in mv' :key='index' class="mv-box-mvs" @click='tomv(item.id)'>
                            <div class="img-bos">
                            <div class="mv-box-mvimg">
                                <img :src="item.cover" alt="">
                                <div>
                                <div id="playerNum"></div>
                                <span>{{ item.playCount }}</span>
                                </div>
                                <span class="playtime">{{ item.duration }}</span>
                            </div>
                            <div class="mv-text">
                                <div id='musicname' title="">{{ item.name }}</div>
                                <p>{{ item.artistName }}</p>
                            </div>
                            
                            </div>
                          </div>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
<!-- 分页 -->
    <div class="block" id="pageNum">
        <el-pagination layout="prev, pager, next" 
        :total="1000">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            mvplay: '',
            mv:[],
            author:{},
            icon:'',
            hotconment:[],
            newconment:[],
            total:0
        }
    },
    created(){
        axios.get(`https://autumnfish.cn/mv/url?id=${this.$route.query.name}`).then(
            res =>{         //MV播放地址
                // console.log(res);
                this.mvplay = res.data.data.url
            }
        ),
        axios.get(`https://autumnfish.cn/mv/detail?mvid=${this.$route.query.name}`).then(
            res =>{         //当前MV信息
                // console.log(res);
                this.author = res.data.data
                // 获取歌手信息
                axios.get(`https://autumnfish.cn/artists?id=${this.author.artists[0].id}`).then(
                    res => {    //歌手头像获取
                        // console.log(res);
                        this.icon = res.data.artist.picUrl
                    }
                )
            }
        ),
        axios.get(`https://autumnfish.cn/simi/mv?mvid=${this.$route.query.name}`).then(
            res =>{     //MV推荐列表
                // console.log(res);
                this.mv = res.data.mvs

                for(let i=0; i<this.mv.length; i++){      //播放次数处理
                    if(this.mv[i].playCount >= 100000){
                      this.mv[i].playCount = parseInt(this.mv[i].playCount/10000) + '万'
                    }}

                for(let i=0; i < this.mv.length; i++){      //时间处理
                    let time = this.mv[i].duration/1000;
                    let fen = parseInt(time/60)
                    if(fen < 10){
                        fen = '0'+ fen;
                    }
                    let s =parseInt(time%60)
                    if( s < 10){
                        s = '0'+s
                    }
                    this.mv[i].duration = `${fen}:${s}`
                    }
            }
        ),
        axios.get(`https://autumnfish.cn/comment/mv?id=${this.$route.query.name}&limit=20&offset=0`).then(
            res =>{         //mv评论
                console.log(res);
                this.hotconment = res.data.hotComments
                this.newconment = res.data.comments
                this.total = res.data.total
            }
        )
    }
}
</script>

<style>
    #mvContent{
        display: flex;
        /* background-color: lightcoral; */
        margin: 50px 50px;
        flex-wrap: wrap;
    }
    .mvContent-mvplay{
        float: left;
        width: 600px;
        /* background-color: lightgreen; */
        margin-right: 50px;
    }
    .mvContent-mvplay h3{
        margin-bottom: 20px;
    }
    .video{
        width: 600px;
        height: 400px;
    }
    video{
        width: 100%;
        height: 100%;
        background-color: black;
    }
    .recommend-mv h3{
        margin-bottom: 20px;
    }
    .recommend-mvs{
        width: 300px;
        /* float: right; */
    }
    .mv-box-mvimg{
        float: left;
        width: 220px;
    }
    .img-bos{
        width: 400px;
        display: flex;
        align-items: center;
    }
    .recommend-mv{
         width: 300px;
    }
    .mv-text{
       margin-left: 10px;
       width: 120px;
    }
    .mv-box-mvs{
        margin-bottom: 20px;
    }
    .mv-author{
        display: flex;
        align-items: center;
        margin-top: 40px;
    }
    #author-img{
        /* background-color: black; */
        border-radius: 80px;
        width: 80px;
        height: 80px;
        margin-right: 20px;
        overflow: hidden;
    }
    .mvContent-mvplay h1{
        margin-top: 40px;
    }
    .time{
        color: darkgrey;
        margin: 20px 0;
        font-size: 14px;

    }
    .time span{
        margin-right: 20px;
    }
    .mv-text-talk{
        font-size: 14px;
    }
    .mvContent-mvplay p{
        margin-bottom: 40px;
    }
    .mv-text-content{
        margin-left: 35px;
    }
    .reply-imgs{
        float: left;
        width: 30px;
        height: 30px;
        border-radius: 30px;
        overflow: hidden;
        margin-top: -5px;
    }
    .recommend-mv::after{
        clear: both;
    }
    #pageNum{
        margin: auto;
    }
</style>