<template>
    <div>
        <div class="crumbs" style="margin-bottom:10px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> 数据监控</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
                <div style="width:1200px;font-size: 30px;color: #777;margin: 30px auto;text-align:center;">
                   是否返回首页？
                     <div style="margin-top:30px;">
                         <el-button type="primary" @click="newcase" style="width:100px" >返回首页</el-button>
                     </div>
              </div>
      </div>
    </div>
</template>

<script>
export default {
   methods:{
       newcase(){
           this.$router.push({path:"/table"})
       }
   },
   created(){
        var url=this.global.url
       window.open(url+"/druid/spring.html")
    }
}
</script>

