<template>
  <div class="box">
      <!-- 左侧导航 -->
      <div id="nav-left">
          <ul>
              <li>
                  <router-link to='/discovery'> 发现音乐 </router-link>
              </li>
              <li>
                  <router-link to='/lists'> 推荐歌单</router-link>
              </li>
              <li>
                  <router-link to='/newmusic'> 最新音乐</router-link>
              </li>
              <li>
                   <router-link to='/mvs'>专辑MV</router-link>
              </li>
          </ul>
      </div>

      <!-- 右侧导航 -->
      <div id="nav-right">
          <router-view></router-view>
      </div>

      <div class="play">
        <audio :src="musicUrl" controls autoplay></audio>
      </div>
  </div>
</template>

<script scoped>
export default {
      data(){
        return{
          musicUrl:''
        }
      },
}
</script>

<style>
    #nav-left{
        height: 100%;
        width: 200px;
        background-color: rgb(226, 226, 226);
        position: absolute;
        text-align: center;
        position: fixed;
    }
    #nav-left ul{
        margin-top: 100px;
    }
    #nav-left ul li{
        line-height: 50px;   
    }
    #nav-right{
        flex: 1;
        margin-left: 200px;
        margin-top: 50px;
    }
    .box{
        display: flex;
        width: 100%;
        height: 100%; 
        margin-top: -50px;
        min-height: 300px;
    }
    .router-link-active{
        color: rgb(2, 173, 145);
    }
    a{
        text-decoration: none;
        outline:none;
        color:rgb(0, 117, 226);
    }
    .play{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 40px;
        background: #f1f3f4;
    }
    audio{
        width: 100%;
        height: 40px;
        color: gainsboro;
        outline:none;
    }
</style>