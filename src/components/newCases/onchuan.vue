<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i>上传文件</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
          <el-upload
              class="upload-demo"
              drag
              action="asd"
              :before-upload="beforeUploadFile"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip" style="color:red;">* 拖拽可连续上传 *</div>
           </el-upload>
           <div style="margin:30px 150px;">
             <router-link to="/newList">
                 <el-button type="primary" plain title="创建患者信息">{{$t('btn.next')}}</el-button>
             </router-link>
              
           </div>
       </div>
    </div>
</template>
 
<script>
 
export default {
  data(){
      return{
        caseId:"",
      }
  },
  methods: {
    beforeUploadFile(file){  
          const data = new FormData();
          data.append('file', file);
          var url=this.global.url+"/user/add?";
          var postData=this.qs.stringify({
              caseId:this.caseId
          })
          this.$axios.post(url+postData,data).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                 this.$message({
                    message: '上传成功！',
                    type: 'success'
                  });
                  // this.$router.push({path:'/newList'})
              }else{
                this.$message.error("上传失败，数据传输错误，请重试！");   
              }
          })
      }
    
  },
  created(){
    var nav=sessionStorage.getItem("nav")
    if(nav==1){
      this.caseId=this.$route.query.caseId
      console.log(this.caseId)
    }else{
      this.caseId=sessionStorage.getItem("caseId")
      console.log(this.caseId)
    }
      
  }
}
</script>


