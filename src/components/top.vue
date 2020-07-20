<template>
    <div class="top">
        <el-input v-model="value" placeholder="请输入歌曲名" @keyup.enter.native='ps'
         id='text'> </el-input>
        <!-- <input type="text" v-model='value' @keyup.enter='ps'> -->
        <el-button type="primary" round @click='ps' v-model='value' id='button'>
            搜索
        </el-button>
    </div>

</template>

<script>
export default {
    data(){
        return{
            value: ''
        }
    },
    methods:{
        ps(){
            if(this.value === ''){
                this.$message('请输入搜索内容')
            }else{
                this.$router.push('/sousuo?name='+ this.value)
            }    
        }
    }
}
</script>

<style>
    .top{
        height: 50px;
        background-color: rgb(226, 226, 226);
        line-height: 50px;
        display: flex;
        align-items: center;
        justify-content: right;
        position: relative;
        z-index: 100;
    }
    .el-input__inner:hover {
    border-color: #C0C4CC;
}
    #text{
        float: right;
        margin-right: 20px;
        width: 200px;
        height: 30px;
    }
    #button {
        border-radius: 20px;
        padding: 8px 13px;
        margin-right: 20px;
    }
</style>