<template>
<!-- 发现音乐界面 -->
  <div id="newmusic">
    <div id="newmusic-box">
      <span class="actived" @click='tag="0"' :class="{active:tag=='0'}">全部</span>
      <span class="actived" @click='tag="7"' :class="{active:tag=='7'}">华语</span>
      <span class="actived" @click='tag="96"' :class="{active:tag=='96'}">欧美</span>
      <span class="actived" @click='tag="8"' :class="{active:tag=='8'}">日本</span>
      <span class="actived" @click='tag="16"' :class="{active:tag=='16'}">韩国</span>
    </div>
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
          <tr v-for='(item, index) in lists' :key='index' class="el-table__row" @click="play(item.id)">
            <td id="tab-td"> {{index+1}}</td>
            <td style="width: 150px">
              <div class="table-img">
                <img v-lazy="item.album.blurPicUrl" alt="">
              </div>
            </td>
            <td style="width: 250px" id="new-td">
              {{ item.name }}
              <p>{{ item.album.company }}</p>
            </td>
            <td style="width: 180px">{{ item.album.artists[0].name }}</td>
            <td style="width: 250px">{{ item.album.name }}</td>
            <td>{{ item.duration }}</td>
          </tr>
        </tbody>
    </table>

  </div>
</template>

<script>
import axios from 'axios'

export default {
      data() {
      return {
        tag: '0',
        lists:[]
      }
    },
    watch:{
        tag(){
          this.getlist()
          // console.log(this.tag);
        }
    },
    methods:{
      getlist(){
        axios.get('https://autumnfish.cn/top/song?type='+ this.tag).then(
          res => {
            this.lists = res.data.data;

            for(let i=0; i<this.lists.length; i++){
              let time = this.lists[i].duration/1000;
              let fen = parseInt(time/60)
              if(fen < 10){
                fen = '0'+ fen;
              }

              let s =parseInt(time%60)
              if( s < 10){
                s = '0'+s
              }
              this.lists[i].duration = `${fen}:${s}`
            }
        }
      )
      },
      play(id){
        axios.get('https://autumnfish.cn/song/url?id='+id).then(
            res =>{
                // console.log(res);
                this.$parent.musicUrl = res.data.data[0].url
            }
        )
      }
    },
    created(){
      this.getlist()
    }
}
</script>

<style>
    #newmusic{
        height: 100%;
        margin: 0 auto;
        padding: 20px 50px;
    }
    #newmusic-box{
      display: flex;
      justify-content: flex-end;
    }
    .actived{
      margin-right: 20px;
      margin-bottom: 20px;
      color: darkgrey;
      cursor: pointer;
    }
    .active{
      color: red;
    }
    .table-img{
      width: 80px;
      height: 80px;
      background-color: darkkhaki;
    }
    table tr:nth-child(odd){
      background-color: rgb(248, 248, 248); 
    }
    tr{
      cursor: pointer;
    }
    table tr:hover{
      background-color: rgb(237, 238, 237);
    }
    #tab-td{
      padding: 0 20px;
      width: 50px;
    }
    table {
      border: none;
      border-collapse: collapse;
    }
    #new-td{
      color: darkseagreen;
      font-size: 18px;
      padding-right: 20px;
    }
    #new-td p{
      color: gainsboro;
      font-size: 14px;
      margin-top: 10px;
    }
</style>