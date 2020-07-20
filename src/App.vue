<template>
  <div id="app">
    <top>
        <!-- 头部区域 -->
    </top>   
    <index>
      <!-- 主体区域 -->
    </index>

  </div>
</template>

<script>
import top from './components/top'
import index from './components/index'


export default {
  name: 'App',
  components: {
   top,
   index
  }
}
</script>

<style>
*,li{
  margin: 0;
  padding: 0;
  list-style: none;
}
body{
  height: 100%;
  overflow-x: hidden;
  font-weight: 400;
  color: rgb(82, 82, 82);
}
</style>
