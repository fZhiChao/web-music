<template>
<!-- 发现音乐界面 -->
  <div id="sousuo">
      <div id="result">
          <h3>{{$route.query.name}}</h3>
          <span>共{{ count }}条</span>
      </div>

    <el-tabs v-model="activeName"  id="tab">
        <el-tab-pane label="歌曲" name="first">
             <table class="el-table playlit-table" stripe='true' style="width: 100%">
        <thead>
          <th></th>
          <th>歌曲</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
        </thead>
        <tbody>
          <tr v-for='(item, index) in songList' :key='index' class="el-table__row" @click="play(item.id)">
            <td id="tab-td"> {{ index+1 }}</td>
            <td style="width: 350px" id="new-td">
                <span class="songName" @click="player(item.id)"> {{  item.name }}</span>
               <p v-if="item.alias.length !=0 ">{{ item.alias[0] }}</p>
               <span v-if="item.mvid!=0" class="el-icon-video-camera"></span>
            </td>
            <td style="width: 180px">{{ item.artists[0].name }}</td>
            <td style="width: 250px">{{ item.album.name }}</td>
            <td>{{ item.duration }}</td>
          </tr>
        </tbody>
    </table>
        </el-tab-pane>

        <el-tab-pane label="歌单" name="second">
        <div class="songseet">
            <div v-for="(item,index) in playlist" :key='index' 
                 @click="toPlaylist(item.id)" class="songseetBox" >
            <div class="songseetImg">
                <div class="playtext">播放量：{{ item.playCount }}</div>
                <img :src="item.coverImgUrl" alt="">
                <el-button type="danger" circle class="play-btu">
                    <i class="el-icon-caret-right" circle></i>
                </el-button>
            </div>
            <p class="songseetText" title="">{{ item.name }}</p>
            </div>  
        </div> 
        </el-tab-pane>

        <el-tab-pane label="MV" name="third">
        <div class="mv-box">
          <div v-for='(item,index) in mv' :key='index' class="mv-box-mv" @click='tomv(item.id)'>
            <div class="img-bo">
              <div class="mv-box-mvimg">
                <img :src="item.cover" alt="">
                <div>
                  <div id="playerNum"></div>
                  <span>{{ item.playCount }}</span>
                </div>
                <span class="playtime">{{ item.duration }}</span>
              </div>
              <div id='musicName' title="">{{ item.name }}</div>
              <p>{{ item.artistName }}</p>
            </div>
          </div>
        </div>
        </el-tab-pane>
    </el-tabs>

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
    data() {
      return {
         activeName: 'first',
         limit: 10,
         offset: '',
         type: '1',
         songList: [],
         playlist: [],
         mv: [1],
         count: '',
      };
    },
    created(){
        this.getlist()
    },
    watch:{
        activeName(){
            switch(this.activeName){
                case 'first':
                    this.type=1;
                    this.limit =10;
                    break;
                case 'second':
                    this.type=1000;
                    this.limit =10;
                    break;
                case 'third':
                    this.type=1004;
                    this.limit =8;
                    break;
            };
            this.getlist();
        }
    },
    methods:{
        getlist(){      //获取页面信息
            axios({
                url: 'https://autumnfish.cn/search',
                method: 'get',
                params:{
                    keywords: this.$route.query.name,
                    type: this.type,
                    limit: this.limit
                }                
            }).then(res => {
                 console.log(res)
                if(this.type == 1){     //歌曲搜索结果
                    this.songList = res.data.result.songs
                    for(let i=0; i < this.songList.length; i++){
                    let time = this.songList[i].duration/1000;
                    let fen = parseInt(time/60)
                    if(fen < 10){
                        fen = '0'+ fen;
                    }
                    let s =parseInt(time%60)
                    if( s < 10){
                        s = '0'+s
                    }
                    this.songList[i].duration = `${fen}:${s}`
                    }
                this.count = res.data.result.songCount                    
                }else if(this.type ==1000){     //歌单搜索结果
                    this.playlist = res.data.result.playlists
                    this.count = res.data.result.playlistCount
                    for(let i=0; i<this.playlist.length; i++){
                    if(this.playlist[i].playCount >= 100000){
                      this.playlist[i].playCount = parseInt(this.playlist[i].playCount/10000) + '万'
                    }}
                }else if(this.type ==1004){     //mv搜索的结果
                    this.mv = res.data.result.mvs
                    this.count = res.data.result.mvCount
                    for(let i=0; i<this.mv.length; i++){      //播放次数处理
                    if(this.mv[i].playCount >= 100000){
                      this.mv[i].playCount = parseInt(this.mv[i].playCount/10000) + '万'
                    }}
                    for(let i=0; i <this.mv.length; i++){      //时间处理
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
            })
        },
        player(id){
        axios.get('https://autumnfish.cn/song/url?id='+id).then(
            res =>{
                // console.log(res);
                this.$parent.musicUrl = res.data.data[0].url
            }
        )
      },
      toPlaylist(id){
          this.$router.push('/playlist?name=' + id)
      },
      tomv(id){
          this.$router.push('./mvContent?name=' + id)
      }
    }
}
</script>

<style>
    #sousuo{
        height: 100%;
        /* margin-top: -100px; */
        margin: 20px 50px;
    }
    #tab{
        padding-top: 20px;
        width: 100%;
        margin-bottom: 30px;
    }
    #pageNum{
       text-align: center;
    }
    #result h3{
        display: inline-block;
        font-size: 30px;
        margin-right: 20px;
        font-weight: 500;
    }
    #result span{
        font-size: 14px;
        color: gainsboro;
        letter-spacing: 1px;
    }
    .el-tabs__item{
        font-size: 18px;
    }
    .el-table__row{
        cursor: auto;
    }
    .songName{
        margin-right: 10px;
        font-size: 16px;
    }
    #new-td span {
        cursor: pointer;
    }
    .playtext{
        position: absolute;
        margin: auto;
        color: gainsboro;
        font-size: 14px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.3);
        width: 100%;
        padding: 6px 0;
    }
    .playtime{
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: white;
    }
</style>