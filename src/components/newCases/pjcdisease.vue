<template>
    <div>
        <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('dise.disedise')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
            <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;">
              <div v-show="!save" style="float:left">
                  <el-button v-show="lock" type="primary" @click="newcase" style="width:150px" >{{$t('dise.disenew')}}</el-button>
              </div>
              <span>{{$t('dise.disedise')}}</span>
              <div style="float:right">
                    <el-select v-model="diseaseId" @change="hand" :placeholder="$t('btn.selectother')">
                      <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.disease"
                        :value="item.id">
                      </el-option>  
                    </el-select>
              </div>
            </div>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="450px" style="margin-top:20px;" class="demo-ruleForm" v-show="mains">
                <el-form-item :label="$t('dise.disename')" prop="disease">
                    <el-input v-model="ruleForm.disease" class="ipts" 
                     @keyup.enter.native="queryAdminRole" :placeholder="$t('btn.enter')"></el-input>
                    <el-button type="primary" @click="search" icon="el-icon-search" circle title="点击搜索"></el-button>
                </el-form-item>
                <el-form-item :label="$t('dise.disemeddraVersion')" prop="meddraVersion">
                     <el-input v-model="ruleForm.meddraVersion" class="ipts" :disabled="true" placeholder="请输入版本"></el-input>
                    <el-tooltip :content="$t('tishi.C1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dise.disemeddraNumber')" prop="meddraNumber">
                     <el-input v-model="ruleForm.meddraNumber" class="ipts" :disabled="true" placeholder="请输入症状名称选择"></el-input>
                    <el-tooltip :content="$t('tishi.C2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <!-- 创建 -->
                <el-form-item :label="$t('dise.disestart')" prop="start" v-if="save">
                    <el-date-picker class="ipts" style="width:250px;" 
                     value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                      v-model="ruleForm.start"    :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.C3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <!-- 修改 -->
                <el-form-item :label="$t('dise.disestart')" prop="start" v-else v-show="ss">
                    <el-date-picker class="ipts" style="width:250px;" 
                     v-model="ruleForm.start"  :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.C3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('dise.disestart')" prop="start" v-show="!ss">
                    <el-date-picker class="ipts" style="width:250px;" 
                     value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                      v-model="ruleForm.start"  :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.C3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dise.diseisgoon')" prop="iscontinuous">
                    <el-select v-model="ruleForm.iscontinuous" class="ipts" :placeholder="$t('btn.selects')">
                       <el-option :label="$t('dise.diseisgoon1')" value="1"></el-option>
                       <el-option :label="$t('dise.diseisgoon2')" value="2"></el-option>                       
                    </el-select>
                    <el-tooltip :content="$t('tishi.C4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <!-- 创建 -->
                <el-form-item :label="$t('dise.diseend')" prop="end" v-if="save">
                    <el-date-picker class="ipts" style="width:250px;" 
                     value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                      v-model="ruleForm.end"  :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.C5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <!-- 修改 -->
                <el-form-item :label="$t('dise.diseend')" prop="end" v-else v-show="ss">
                    <el-date-picker class="ipts" style="width:250px;"  v-model="ruleForm.end"  :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.C5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dise.diseend')" prop="end" v-show="!ss">
                    <el-date-picker class="ipts" style="width:250px;" 
                     value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                      v-model="ruleForm.end"  :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.C5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dise.disecomments')" prop="comments">
                    <el-input
                        type="textarea"
                        :rows="2"
                        :placeholder="$t('btn.enter')"
                        v-model="ruleForm.comments" class="ipts">
                        </el-input>
                    <el-tooltip :content="$t('tishi.C6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dise.disefamilyHistory')" prop="familyHistory">
                    <el-select v-model="ruleForm.familyHistory" class="ipts" :placeholder="$t('btn.selects')">
                       <el-option :label="$t('dise.disefamilyHistory1')" value="1"></el-option>
                       <el-option :label="$t('dise.disefamilyHistory2')" value="2"></el-option>                       
                    </el-select>
                    <el-tooltip :content="$t('tishi.C7')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
<!-- 保存按钮 -->
                <el-form-item style="margin:30px 0 0 50px;" v-if="save">
                  <el-button  type="primary" @click="mitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                  <el-button type="success" @click="submitForm('ruleForm')">{{$t('project.ch')}}</el-button>
                  <el-button @click="Form('ruleForm')">{{$t('btn.next')}}</el-button>
                </el-form-item>
<!-- 修改按钮 -->
                <el-form-item style="margin:30px 0 0 50px;" v-else v-show="ss">
                <el-button v-show="lock" type="primary" @click="submitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                <el-button  type="danger" v-show="sc && lock" @click="handleDelete('ruleForm')">{{$t('btn.delete')}}</el-button>
                </el-form-item>
                <el-form-item style="margin:50px 0 0 50px;" v-show="!ss">
                <el-button  type="primary" @click="submit('ruleForm')">{{$t('btn.save')}}</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">65656</el-button> -->
                </el-form-item>
                </el-form>
                <div style="width:1200px;font-size: 30px;color: #777;margin: 30px auto;text-align:center;" v-show="info">
                    <div style="margin-bottom:30px; line-height: 1;
                         font-size: 60px;font-weight: bolder;color: #2d8cf0;">很<span style="color:#00a854;">抱</span>歉</div>
                    暂无数据请创建
              </div>
       </div>
        <pjc-dialog :event="pjcDialog" @closeTagDialog="closeTagDialog" @hand="fn($event)" :name="ruleForm.disease">
       </pjc-dialog>
    </div>
</template>
<script>
import pjcDialog from "./pjc.dialog.vue"
export default {
    data() {
      return {
        lock:true,
        pjcDialog:false,
        sc:true,
         //通过Id进行修改信息
          save:true,
          ss:true,
          mains:true,
          info:false,
          subjectId:'',
          id:"",
          ruleForm: {
            disease: '',
            meddraVersion:'18.1',
            meddraNumber:'',
            start: '',
            iscontinuous: '',
            end:'',
            comments:'',
            familyHistory:'',
        },
        rules: {
          disease: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        },
         options: [],
          diseaseId:""
      };
    },
    components:{
        pjcDialog
    },
    methods: {
       // 搜索名称
        queryAdminRole(){
            this.pjcDialog=true
            console.log(this.ruleForm.indicationName)
        },
        search(){
            this.pjcDialog=true
        },
        closeTagDialog(){
            this.pjcDialog=false
        },
        fn(msg){
            this.ruleForm.meddraNumber=msg.id
            this.ruleForm.disease=msg.name
        },
    

//    新建患者病史
    mitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('dise.dire'), this.$t('dise.ditishi'), {
                confirmButtonText: this.$t('dise.diyes'),
                cancelButtonText: this.$t('dise.dino'),
                type: 'warning'
            }).then(() => {
                
        //   点击确认后向服务器传参
        var url=this.global.url+"/subjectDisease/addSubjectDisease?"
        var postData=this.qs.stringify({
            subjectId:this.subjectId,
            disease: this.ruleForm.disease,
            meddraVersion   :this.ruleForm.meddraVersion,
            meddraNumber:this.ruleForm.meddraNumber,
            start: this.ruleForm.start,
            iscontinuous:this.ruleForm.iscontinuous,
            end:this.ruleForm.end,
            comments:this.ruleForm.comments,
            familyHistory:this.ruleForm.familyHistory
        })
        console.log(postData)
        this.$axios.post(url+postData).then((res)=>{
          console.log(res)
            this.$message({
                type: 'success',
                message: this.$t('dise.disuccess'),
                });   
                this.option()        
         })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('dise.dideaft')
                }); 
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      Form(formName) {
         this.$router.push({path:"/Drug"})
      },
    // 创建完成在搜索框中调用
    option(){
      var url=this.global.url+"/subjectDisease/selectSubjectDisease?subjectId="+this.subjectId;
      this.$axios.get(url).then((res)=>{
        console.log(res)
         if(res.data.status==200){
           this.options=res.data.data
         }
      })
    },

// 删除事件
	  handleDelete(){
		  this.save=false;
		           this.$confirm(this.$t('dise.didelete'), this.$t('dise.ditishi'), {
                 confirmButtonText: this.$t('dise.dideyes'),
		                       cancelButtonText: this.$t('dise.dino'),
		                       type: 'warning'
		                   }).then(() => {
                         this.$message({
                           type: 'success',
		                           message: this.$t('dise.disuccess1'),
		                       })   
		  var url=this.global.url+"/subjectDisease/delete?subjectDiseaseId="+this.id
		  this.$axios.delete(url).then((res)=>{
		      if(res.data.status==200){
		                       this.get()
                        }
                    })
		                  }).catch(() => {
		                           this.$message({
		                           type: 'info',
		                           message: this.$t('dise.dideaft1')
		                           }); 
		            });  
	  },


// ------------------------------------------修改新建缓则病史
      get(){
         if(this.$store.state.lock=="3"){
           this.lock=false
         }
        this.save=false
        console.log(this.subjectId)
        var url=this.global.url+"/subjectDisease/selectSubjectDisease?subjectId="+this.subjectId;
        this.$axios.get(url).then((res)=>{
          console.log(res)
          if(res.data.status==200){
            if(res.data.data.length==0){
               this.mains=false
               this.info=true
            }else if(res.data.data.length==1){
                 this.sc=false;
                 this.mains=true
                 this.info=false;
                 this.ruleForm=res.data.data[0]
                 this.id=res.data.data[0].id
                 this.subjectId=res.data.data[0].subjectId
                 this.diseaseId=res.data.data[0].disease
                 this.options=res.data.data
            }else{
              this.mains=true
              this.info=false;
              this.ss=true
              this.ruleForm=res.data.data[0]
              this.id=res.data.data[0].id
              this.sc=true;
              this.subjectId=res.data.data[0].subjectId
               this.diseaseId=res.data.data[0].disease
              this.options=res.data.data
						}          
          }else{
            this.$message.error(this.$t('dise.dierro'));
          }    
        })
      },
  // 新建病例
    newcase(){
          this.ss=false;
          this.mains=true;
          this.info=false;
          this.resetForm('ruleForm')
          console.log(this.diseaseId)
      },
       submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('dise.dire'), this.$t('dise.ditishi'), {
                confirmButtonText: this.$t('dise.diyes'),
                cancelButtonText: this.$t('dise.dino'),
                type: 'warning'
            }).then(() => {
                
        //   点击确认后向服务器传参

        var url=this.global.url+"/subjectDisease/addSubjectDisease?";
        var postData=this.qs.stringify({
            subjectId:this.subjectId,
            disease:this.ruleForm.disease,
            meddraVersion:   this.ruleForm.meddraVersion,
            meddraNumber:this.ruleForm.meddraNumber,
            start:this.ruleForm.start,
            iscontinuous:this.ruleForm.iscontinuous,
            end:this.ruleForm.end,
            comments:this.ruleForm.comments,
            familyHistory:this.ruleForm.familyHistory,
        })
        this.$axios.post(url+postData).then((res)=>{
          console.log(res)
          if(res.data.status==200){
              // this.$router.go(0)
               this.$message({
                  type: 'success',
                  message: this.$t('dise.disuccess'),
                });
              this.get()
          }
        })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('dise.dideaft')
                }); 
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      hand(){
        console.log(this.diseaseId)
        var url=this.global.url+"/subjectDisease/selectSubjectDiseaseById?subjectDiseaseId="+this.diseaseId
        this.$axios.get(url).then((res)=>{
          console.log(res)
          if(res.data.status==200){
            this.ruleForm=res.data.data
            this.id=res.data.data.id
          }
        })
      },
// 修改信息
    submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$confirm(this.$t('dise.dire'), this.$t('dise.ditishi'), {
                    confirmButtonText: this.$t('dise.diyes'),
                    cancelButtonText: this.$t('dise.dino'),
                    type: 'warning'
                }).then(() => {
                    
            //   点击确认后向服务器传参
            if(this.ruleForm.start==""){
              var time=""
            }else{
                 var date = new Date(this.ruleForm.start);  
                  var time=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ; 
                    if(time=="1970-1-1"){
                          time=""
                        }
            }
            
            if(this.ruleForm.end==""){
              var time1=""
            }else{
              var date1 = new Date(this.ruleForm.end);  
                  var time1=date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate() ; 
                  if(time1=="1970-1-1"){
                          time1=""
                        }
            }
                  
                  var url=this.global.url+"/subjectDisease/update?"
                  var  postData=this.qs.stringify({
                        id:this.id,
                          disease: this.ruleForm.disease,
                          meddraVersion   :this.ruleForm.meddraVersion,
                          meddraNumber:this.ruleForm.meddraNumber,
                          start: time,
                          iscontinuous:this.ruleForm.iscontinuous,
                          end:time1,
                          comments:this.ruleForm.comments,
                          familyHistory:this.ruleForm.familyHistory
                  })
                  this.$axios.post(url+postData).then((res)=>{
                    if(res.data.status==200){
                         this.$message({
                            type: 'success',
                            message: this.$t('dise.disuccess'),
                          });
                          this.option();
                      // this.$router.go(0)
                    }else{
                      this.$message.error(this.$t('dise.dierro1'))
                    }
                  })
                });  
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          resetForm(formName){
            this.$refs[formName].resetFields();
          },
    },
   created(){
        var nav=sessionStorage.getItem("nav")
        if(nav==1){
          var subId=sessionStorage.getItem("subjectId")
          if(subId==undefined){
            this.$message({
              showClose: true,
              message: this.$t('dise.difirst'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/newlist"})
            },1000)
          }else{
            this.subjectId=subId
            console.log(this.subjectId)
          }
          this.get();
        }else{
          var sub=sessionStorage.getItem("subjectId")
          var cas=sessionStorage.getItem("caseId")
          if(cas==undefined){
             this.$message({
              showClose: true,
              message: this.$t('dise.disecond'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/details"})
            },2000)
          }else if(sub==undefined){
             this.$message({
              showClose: true,
              message: this.$t('dise.dithird'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/newlist"})
            },2000)
          }else{
             this.subjectId=sessionStorage.getItem("subjectId")
             console.log(this.subjectId)
             this.option()   
          }         
        }
    }
}
</script>
<style>
  *{
    margin: 0;
    padding: 0;
   }
  .ipts{
     width:250px;
     margin:0 30px 0 100px;
   }
  .lii{ 
      text-align: center;
      color:#838ab6;
      line-height: 30px;
      width:30px;
      border: 1px solid #ececff;
      height:30px;
    }
  .error-desc{
      width:300px;
      font-size: 30px;
      color: #777;
      margin: 30px auto;
    }
</style>
