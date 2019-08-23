<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/" v-if="save">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('newList.newlist')}}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-breadcrumb separator="/" v-else>
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('newList.baselist')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;" v-if="save"><span> {{$t('newList.newlist')}}</span></div>
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;" v-else><span> {{$t('newList.baselist')}}</span></div>
               <el-form v-show="mains" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="480px" style="margin-top:20px;" class="demo-ruleForm">
                 <el-form-item :label="$t('newList.listname')" prop="name">
                    <el-input v-model="ruleForm.name" class="ipts" :placeholder="$t('btn.entername')"></el-input>
                    <el-tooltip :content="$t('tishi.B1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listGP')" prop="ranNum1">
                    <el-input v-model="ruleForm.ranNum1" class="ipts" placeholder="22.MSK、25ASKU、26.NASK、23.UNK"></el-input>
                    <el-tooltip :content="$t('tishi.B2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listpro')" prop="ranNum2">
                    <el-input v-model="ruleForm.ranNum2" class="ipts" placeholder="22.MSK、25ASKU、26.NASK、23.UNK"></el-input>
                    <el-tooltip :content="$t('tishi.B3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listhos')" prop="ranNum3">
                    <el-input v-model="ruleForm.ranNum3" class="ipts" placeholder="22.MSK、25ASKU、26.NASK、23.UNK"></el-input>
                    <el-tooltip :content="$t('tishi.B3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.liststudy')" prop="ranNum4">
                    <el-input v-model="ruleForm.ranNum4" class="ipts" placeholder="22.MSK、25ASKU、26.NASK、23.UNK"></el-input>
                    <el-tooltip :content="$t('tishi.B3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listbir')" prop="birthday" v-if="save">
                    <el-date-picker style="width:250px;" class="ipts" v-model="ruleForm.birthday"
                      value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                      :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.B4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listbir')"  prop="birthday" v-else>
                    <el-date-picker class="ipts" v-model="ruleForm.birthday"
                      :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.B4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listagenum')" prop="newTime">
                    <el-input v-model="ruleForm.newTime" class="ipts" type="number" :placeholder="$t('btn.enternum')"></el-input>
                    <el-tooltip :content="$t('tishi.B5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
 
                <el-form-item :label="$t('newList.listage')" prop="newUnit">
                    <el-select v-model="ruleForm.newUnit" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('newList.listage1')" value="1"></el-option>
                       <el-option :label="$t('newList.listage2')" value="2"></el-option>                       
                       <el-option :label="$t('newList.listage3')" value="3"></el-option>
                       <el-option :label="$t('newList.listage4')" value="4"></el-option>                       
                       <el-option :label="$t('newList.listage5')" value="5"></el-option>                      
                    </el-select>
                    <el-tooltip :content="$t('tishi.B6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
               <el-form-item :label="$t('newList.listbabynum')" prop="twoTime">
                    <el-input v-model="ruleForm.twoTime" class="ipts" type="number" :placeholder="$t('btn.enternum')"></el-input>
                    <el-tooltip :content="$t('tishi.B7')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
               <el-form-item :label="$t('newList.listbaby')" prop="twoUnit">
                    <el-select v-model="ruleForm.twoUnit" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('newList.listbaby1')" value="1"></el-option>
                       <el-option :label="$t('newList.listbaby2')" value="2"></el-option>                       
                       <el-option :label="$t('newList.listbaby3')" value="3"></el-option>
                       <el-option :label="$t('newList.listbaby4')" value="4"></el-option>                                            
                    </el-select>
                    <el-tooltip :content="$t('tishi.B8')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
               <el-form-item :label="$t('newList.listtype')" prop="type">
                    <el-select v-model="ruleForm.type" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('newList.listtype1')" value="1"></el-option>
                       <el-option :label="$t('newList.listtype2')" value="2"></el-option>                       
                       <el-option :label="$t('newList.listtype3')" value="3"></el-option>
                       <el-option :label="$t('newList.listtype4')" value="4"></el-option>                                            
                       <el-option :label="$t('newList.listtype5')" value="5"></el-option>                                            
                       <el-option :label="$t('newList.listtype6')" value="6"></el-option>                                            
                       <el-option :label="$t('newList.listtype7')" value="7"></el-option>                                            
                    </el-select>
                    <el-tooltip :content="$t('tishi.B9')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('newList.listkg')" prop="weight">
                    <el-input v-model="ruleForm.weight" class="ipts" type="number" :placeholder="$t('btn.enterweight')"></el-input>
                    <el-tooltip :content="$t('tishi.B10')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('newList.listcm')" prop="height">
                    <el-input v-model="ruleForm.height" class="ipts" type="number" :placeholder="$t('btn.enterheight')"></el-input>
                    <el-tooltip :content="$t('tishi.B11')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listsex')" prop="sex">
                    <el-select v-model="ruleForm.sex" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('newList.listsex1')" value="1"></el-option>
                       <el-option :label="$t('newList.listsex2')" value="0"></el-option>
                    </el-select>
                    <el-tooltip :content="$t('tishi.B12')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listmean')" prop="instructions">
                    <el-input v-model="ruleForm.instructions" class="ipts"   placeholder="22.MSK、25ASKU、26.NASK、23.UNK"></el-input>
                    <el-tooltip :content="$t('tishi.B13')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listisdeath')" prop="die">
                    <el-select v-model="ruleForm.die" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('newList.listisdeath1')" value="1"></el-option>
                       <el-option :label="$t('newList.listisdeath2')" value="2"></el-option>
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('newList.diet')" prop="dieDate">
                         <el-date-picker class="ipts" v-model="ruleForm.dieDate" type="datetime" :placeholder="$t('newList.diep')"> </el-date-picker>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
<!-- 新建 -->
               <el-form-item style="margin:30px 0 0 50px;" v-if="save">
                  <el-button type="primary" @click="mitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                  <el-button @click="Form('ruleForm')">{{$t('btn.empty')}}</el-button>
               </el-form-item>
<!-- 修改 -->
               <el-form-item style="margin:30px 0 0 50px;" v-else v-show="ss">
                  <el-button v-show="lock" type="primary" @click="submitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                  <!-- <el-button @click="resetForm('ruleForm')">修改</el-button> -->
               </el-form-item>
               <el-form-item style="margin:30px 0 0 50px;" v-show="!ss">
                  <el-button v-show="lock" type="primary" @click="submit('ruleForm')">{{$t('btn.save')}}</el-button>
               </el-form-item>
            </el-form>
            <div style="width:1200px;font-size: 30px;color: #777;margin: 30px auto;text-align:center;" v-show="info">
                <div style="margin-bottom:30px; line-height: 1;
                    font-size: 60px;font-weight: bolder;color: #2d8cf0;">很<span style="color:#00a854;">抱</span>歉</div>
                暂无数据请创建
                <div style="margin-top:30px;">
                    <el-button v-show="lock" type="primary" @click="newcase" style="width:100px" >+新建</el-button>
                </div>
          </div>
       </div>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
    data() {
      return {
        ss:true,
        lock:true,
        info:false,
        mains:true,
         caseId:"",   //病例Id 进行创建患者信息
         save:true,
          ruleForm: {
          name:'',
          ranNum1:'',
          ranNum2:'',
          ranNum3:'',
          ranNum4:'',          
          sex:'',
          birthday: '',
          weight:'',
          height:'',
          die:"",
          instructions:'',
          newUnit:'',
          newTime:'',
          twoTime:'',
          twoUnit:'',
          type:'',
          dieDate:'',
        },
        rules: {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        }
      };
    },
    methods: {
// 创建患者
        mitForm(formName) {
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.$confirm('是否保存当前信息?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                  }).then(() => {
              //   点击确认后向服务器传参
            if(this.ruleForm.birthday==""){
              var times=""
            }else{
               var date = new Date(this.ruleForm.birthday);  
              var times=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ; 
              if(times=="1970-1-1"){times=""}
            }
            console.log(this.ruleForm.dieDate)
               if(this.ruleForm.dieDate==""){
              var time=""
            }else{
                 var date = new Date(this.ruleForm.dieDate);  
                  var time=date.getFullYear() + '-' + (date.getMonth() + 1)+ '-' + date.getDate() + ' ' + date.getHours()+ ':' + date.getMinutes() + ':' + date.getSeconds() ; 
                    if(time=="1970-1-1"){
                          time=""
                    }
            }
              var url=this.global.url+"/subject/addSubject?";
                  var postData=this.qs.stringify({
                          caseId:this.caseId,
                          name:this.ruleForm.name,
                          ranNum1:this.ruleForm.ranNum1,
                          ranNum2:this.ruleForm.ranNum2,
                          ranNum3:this.ruleForm.ranNum3,
                          ranNum4:this.ruleForm.ranNum4,          
                          sex:this.ruleForm.sex,
                          birthday: this.ruleForm.birthday,
                          weight:this.ruleForm.weight,
                          height:this.ruleForm.height,
                          die:this.ruleForm.die,
                          instructions:this.ruleForm.instructions,
                          newUnit:this.ruleForm.newUnit,
                          newTime:this.ruleForm.newTime,
                          twoTime:this.ruleForm.twoTime,
                          twoUnit:this.ruleForm.twoUnit,
                          type:this.ruleForm.type,
                          dieDate:time
                  })
                    this.$axios.post(url+postData).then((res)=>{
                      var subjectId=res.data.data
                      sessionStorage.setItem("subjectId",subjectId)
                      this.$router.push({path:"/dise",query:{subjectId:subjectId}}) 
                    })

                      this.$message({
                      type: 'success',
                      message: '保存成功!',
                      });
            
                  }).catch(() => {
                      this.$message({
                      type: 'info',
                      message: '已取消保存'
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
     
     
     
     
     
     
     
     
     
     
     
     
     
//---------------------------------------------详情/修改  
     newcase(){
        this.ss=false
        this.info=false
        this.mains=true
     },
     submit(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.$confirm('是否保存当前信息?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                  }).then(() => {
              //   点击确认后向服务器传参
             if(this.ruleForm.birthday==""){
              var times=""
            }else{
               var date = new Date(this.ruleForm.birthday);  
              var times=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ; 
              if(times=="1970-1-1"){times=""}
            }
            console.log(this.ruleForm.dieDate)
               if(this.ruleForm.dieDate==""){
              var time=""
            }else{
                 var date = new Date(this.ruleForm.dieDate);  
                  var time=date.getFullYear() + '-' + (date.getMonth() + 1)+ '-' + date.getDate() + ' ' + date.getHours()+ ':' + date.getMinutes() + ':' + date.getSeconds() ; 
                    if(time=="1970-1-1"){
                          time=""
                    }
            }
              var url=this.global.url+"/subject/addSubject?";
                  var postData=this.qs.stringify({
                          caseId:this.caseId,
                          name:this.ruleForm.name,
                          ranNum1:this.ruleForm.ranNum1,
                          ranNum2:this.ruleForm.ranNum2,
                          ranNum3:this.ruleForm.ranNum3,
                          ranNum4:this.ruleForm.ranNum4,          
                          sex:this.ruleForm.sex,
                          birthday: this.ruleForm.birthday,
                          weight:this.ruleForm.weight,
                          height:this.ruleForm.height,
                          die:this.ruleForm.die,
                          instructions:this.ruleForm.instructions,
                          newUnit:this.ruleForm.newUnit,
                          newTime:this.ruleForm.newTime,
                          twoTime:this.ruleForm.twoTime,
                          twoUnit:this.ruleForm.twoUnit,
                          type:this.ruleForm.type,
                          dieDate:time
                  })
                    this.$axios.post(url+postData).then((res)=>{
                      console.log(res)
                      var subjectId=res.data.data
                      sessionStorage.setItem("subjectId",subjectId)
                    })

                      this.$message({
                      type: 'success',
                      message: '保存成功!',
                      });
            
                  }).catch(() => {
                      this.$message({
                      type: 'info',
                      message: '已取消保存'
                      }); 
                  });  
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
     },
     get(){
         if(sessionStorage.getItem("lock")==3){
           this.lock=false
         }
       this.save=false
         var caseId=sessionStorage.getItem("caseId")
         this.caseId=caseId
         var url=this.global.url+"/subject/selectSubject?caseId="+caseId;
         this.$axios.get(url).then((res)=>{
        console.log(res)
        if(res.data.status==200){
             this.info=false
             this.mains=true
             this.ruleForm=res.data.data
           if(res.data.data.type==null){
             this.ruleForm.type=""
           }else{
             this.ruleForm.type=JSON.stringify(res.data.data.type)
           }
            if(res.data.data.sex==null){
             this.ruleForm.sex=""
           }else{
             this.ruleForm.sex=JSON.stringify(res.data.data.sex)
           }
            if(res.data.data.die==null){
             this.ruleForm.die=""
           }else{
             this.ruleForm.die=JSON.stringify(res.data.data.die)
           }
           if(res.data.data.birthday==""){
             this.ruleForm.birthday=""
           }
           sessionStorage.setItem("subjectId",res.data.data.id)
        }else{
          this.info=true
          this.mains=false
           this.$message.error('数据传输错误');
        }
      })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm('是否保存当前信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
        //   点击确认后向服务器传参
            if(this.ruleForm.birthday==""){
              var times=""
            }else{
               var date = new Date(this.ruleForm.birthday);  
              var times=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ; 
              if(times=="1970-1-1"){times=""}
            }
            console.log(this.ruleForm.dieDate)
               if(this.ruleForm.dieDate==""){
              var time=""
            }else{
                 var date = new Date(this.ruleForm.dieDate);  
                  var time=date.getFullYear() + '-' + (date.getMonth() + 1)+ '-' + date.getDate() + ' ' + date.getHours()+ ':' + date.getMinutes() + ':' + date.getSeconds() ; 
                    if(time=="1970-1-1"){
                          time=""
                    }
            }
        var url=this.global.url+"/subject/update?";
        var postData=this.qs.stringify({
              id:sessionStorage.getItem("subjectId"),
              name:this.ruleForm.name,
              ranNum1:this.ruleForm.ranNum1,
              ranNum2:this.ruleForm.ranNum2,
              ranNum3:this.ruleForm.ranNum3,
              ranNum4:this.ruleForm.ranNum4,          
              sex:this.ruleForm.sex,
              birthday: times,
              weight:this.ruleForm.weight,
              height:this.ruleForm.height,
              die:this.ruleForm.die,
              instructions:this.ruleForm.instructions,
              newUnit:this.ruleForm.newUnit,
              newTime:this.ruleForm.newTime,
              twoTime:this.ruleForm.twoTime,
              twoUnit:this.ruleForm.twoUnit,
              type:this.ruleForm.type,
              dieDate:time
        })
        this.$axios.post(url+postData).then((res)=>{
          console.log(res)
          if(res.data.status=200){
            this.$message({
                type: 'success',
                message: '修改成功!',
                });
          }else{
            this.$message.error("修改失败，数据传输错误!")
          }
        })
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created(){
      var nav=sessionStorage.getItem("nav")
      if(nav==1){
        this.get()
      }else{
        var caseId=sessionStorage.getItem("caseId")
        if(caseId==undefined){
               this.$message({
              showClose: true,
              message: '请先创建病例',
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
.ipts{
  width:250px;margin:0 30px 0 100px;
}
  .lii{ 
      text-align: center;
      color:#838ab6;
      line-height: 30px;
      width:30px;
      border: 1px solid #ececff;
      height:30px;
    }
</style>


