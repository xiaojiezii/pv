<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('summary.susummary')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;"><span> {{$t('summary.susummary')}}</span></div>
           <el-form v-show="mains" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="420px" style="margin-top:20px;" class="demo-ruleForm">
             
               <el-form-item :label="$t('summary.sunarrate')" prop="narrate">
                    <el-input
                        :rows="4"
                        type="textarea"
                        :placeholder="$t('btn.enter')"
                        v-model="ruleForm.narrate" class="ipts">
                        </el-input>
                    <el-tooltip :content="$t('tishi.S1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
               <el-form-item :label="$t('summary.sureporter')" prop="reporter">
                    <el-input
                        :rows="4"
                        type="textarea"
                        :placeholder="$t('btn.enter')"
                        v-model="ruleForm.reporter" class="ipts">
                        </el-input>
                    <el-tooltip :content="$t('tishi.S2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
               <el-form-item :label="$t('summary.susender')" prop="sender">
                    <el-input
                        :rows="4"
                        type="textarea"
                        :placeholder="$t('btn.enter')"
                        v-model="ruleForm.sender" class="ipts">
                        </el-input>
                    <el-tooltip :content="$t('tishi.S3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>          
<!-- 新建 -->
                <el-form-item style="margin:30px 0 0 50px;" v-if="save">
                   <el-button type="primary" @click="mitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                   <el-button @click="Form('ruleForm')">{{$t('btn.empty')}}</el-button>
                </el-form-item>
<!-- 修改 -->
                <el-form-item style="margin:30px 0 0 50px;" v-else v-show="!ss && lock">
                   <el-button type="primary" @click="submitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                   <!-- <el-button @click="resetForm('ruleForm')">修改</el-button> -->
                </el-form-item>
<!-- 单独新建 -->
                <el-form-item style="margin:30px 0 0 70px;" v-show="ss && lock">
                   <el-button type="primary" @click="submit('ruleForm')">{{$t('btn.save')}}</el-button>
                </el-form-item>
                </el-form>
                  <div style="width:1200px;font-size: 30px;color: #777;margin: 30px auto;text-align:center;" v-show="info">
                    <div style="margin-bottom:30px; line-height: 1;
                         font-size: 60px;font-weight: bolder;color: #2d8cf0;">很<span style="color:#00a854;">抱</span>歉</div>
                    暂无数据请创建
                     <div style="margin-top:30px;">
                         <el-button type="primary" v-show="lock" @click="newcase" style="width:100px" >{{$t('summary.sunew')}}</el-button>
                     </div>
              </div>
       </div>
    </div>
</template>
<script>
import bus from '../common/bus';
export default {
    data() {
      return {
        lock:true,
        caseId:"",  //病例Id
        id:"",
        ss:false,
        info:false,
        mains:true,
        save:true,
        ruleForm: {
          narrate:'',
          reporter:'',
          sender:'',
        },
        rules: {
          narrate: [{ required: true, message: '请输入内容', trigger: 'blur' }],
          reporter: [{ required: true, message: '请输入内容', trigger: 'blur' }],
          sender: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        }
      };
    },
    methods: {
      mitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('summary.sure'), this.$t('summary.sutishi'), {
                confirmButtonText: this.$t('summary.suyes'),
                cancelButtonText: this.$t('summary.suno'),
                type: 'warning'
            }).then(() => {
        //   点击确认后向服务器传参
           var url=this.global.url+"/caseAnalyze/addCaseAnalyze?";
           var postData=this.qs.stringify({
                caseId:this.caseId,
                narrate:this.ruleForm.narrate,
                reporter:this.ruleForm.reporter,
                sender:this.ruleForm.sender,
           })
           this.$axios.post(url+postData).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                  this.$message({
                    type: 'success',
                    message: this.$t('summary.susuccess'),
                  });
                  let newlist=true
                   bus.$emit("newList",newlist)
                this.$router.push({path:"/caselist"})
                 
              }else{
                this.$message.error(this.$t('summary.suerro'));
              }
           })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('summary.sudeaft')
                }); 
            });  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      Form(formName) {
        this.$refs[formName].resetFields();
      },



// -----------------------------------------修改
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('summary.sure'), this.$t('summary.sutishi'), {
                confirmButtonText: this.$t('summary.suyes'),
                cancelButtonText: this.$t('summary.suno'),
                type: 'warning'
            }).then(() => {
        
        //   点击确认后向服务器传参
            var url=this.global.url+"/caseAnalyze/update?"
            var postData=this.qs.stringify({
                  id:this.id,  
                  narrate:this.ruleForm.narrate,
                  reporter:this.ruleForm.reporter,
                  sender:this.ruleForm.sender, 
                })
            this.$axios.post(url+postData).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                    this.$message({
                      type: 'success',
                      message: this.$t('summary.susuccess1'),
                    });
                // this.$router.go(0)
              }else{
                this.$message.error(this.$t('summary.suerro1'))
              }
            })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('summary.sudeaft')
                }); 
        
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      get(){
        if(sessionStorage.getItem("lock")==3){
           this.lock=false
         }
        this.save=false;
        console.log(this.caseId)
        var url=this.global.url+"/caseAnalyze/selectCaseAnalyze?caseId="+this.caseId;
        this.$axios.get(url).then((res)=>{
          console.log(res)
           if(res.data.status==200){
               this.info=false
               this.mains=true
                this.ruleForm=res.data.data
              this.id=res.data.data.id            
           }else{
              this.info=true
               this.mains=false
           }
        })
      },
      newcase(){
        this.ss=true
        this.info=false
        this.mains=true
      },
      submit(){
          var url=this.global.url+"/caseAnalyze/addCaseAnalyze?";
           var postData=this.qs.stringify({
                caseId:this.caseId,
                narrate:this.ruleForm.narrate,
                reporter:this.ruleForm.reporter,
                sender:this.ruleForm.sender,
           })
           this.$axios.post(url+postData).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                  this.$message({
                    type: 'success',
                    message: this.$t('summary.susuccess2'),
                  });
                // this.$router.push({path:"/caselist"})
              }else{
                this.$message.error(this.$t('summary.suerro'));
              }
           })
      }
    },
    created(){
      var nav=sessionStorage.getItem("nav")
      if(nav==1){
        this.caseId=sessionStorage.getItem("caseId")
        this.get();
      }else{
            var caseId=sessionStorage.getItem("caseId")
        if(caseId==undefined){
               this.$message({
              showClose: true,
              message: this.$t('summary.sufirst'),
              type: 'error'
            });
          setTimeout(()=>{
             this.$router.push({path:"/details"})
          },2000)
        }else{
            this.caseId=caseId
        }
      }
    }
}
</script>
<style scoped>
 /* *{margin: 0;padding: 0;} */
.ipts{
  width: 300px;
  margin:0 30px 0 100px;
}

  .lii{ text-align: center;
      color:#838ab6;
      line-height: 30px;
      width:30px;border: 1px solid #ececff;
      height:30px;}
</style>




