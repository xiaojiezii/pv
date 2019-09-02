<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('dead.deadinfo')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
		   <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;">
		     <div v-show="!save" style="float:left">
		         <el-button v-show="lock" type="primary" @click="newcase" style="width:150px" >{{$t('dead.deadnew')}}</el-button>
		     </div>
		     <span>{{$t('dead.deadinfo')}}</span>
		     <div style="float:right">
		           <el-select v-model="subjectDieId" @change="hand" :placeholder="$t('btn.selectother')">
		             <el-option
		               v-for="item in options"
		               :key="item.id"
		               :label="item.reportingEnglish"
		               :value="item.id">
		             </el-option>
		           </el-select>
		     </div>
		   </div>
           <el-form v-show="mains" :model="ruleForm" ref="ruleForm" label-width="450px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item :label="$t('dead.deadmeddraVersion')" prop="meddraVersion">
                    <el-input class="ipts" v-model="ruleForm.meddraVersion" :disabled="true" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.H1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dead.deadmeddraNum')" prop="meddraNum">
                    <el-input class="ipts" v-model="ruleForm.meddraNum"  :disabled="true" placeholder="请输入死因名称选择"></el-input>
                    <el-tooltip :content="$t('tishi.H2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dead.deadreportingEnglish')" prop="reportingEnglish">
                    <el-input class="ipts" v-model="ruleForm.reportingEnglish" @keyup.enter.native="queryAdminRole" :placeholder="$t('btn.enter')"></el-input>
                    <el-button type="primary" @click="search" icon="el-icon-search" circle title="点击搜索"></el-button>
                </el-form-item>
                <el-form-item :label="$t('dead.deadpreferredterm')" prop="preferredterm">
                    <el-input class="ipts" v-model="ruleForm.preferredterm" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('dead.deadisAutopsy')" prop="isAutopsy">
                    <el-select class="ipts" v-model="ruleForm.isAutopsy" :placeholder="$t('btn.selects')">
                       <el-option :label="$t('dead.deadisAutopsy1')" value="1"></el-option>
                       <el-option :label="$t('dead.deadisAutopsy2')" value="2"></el-option>                       
                    </el-select>
                    <el-tooltip :content="$t('tishi.H3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
<!-- 创建 -->
               <el-form-item style="margin:30px 0 0 50px;" v-if="save">
                   <el-button type="primary" @click="mitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                   <el-button type="success" @click="submitForm('ruleForm')">{{$t('project.ch')}}</el-button>
                   <el-button @click="Form">{{$t('btn.next')}}</el-button>
               </el-form-item>
<!-- 修改按钮 -->
                <el-form-item style="margin:30px 0 0 50px;" v-else v-show="ss">
                  <el-button type="primary" @click="submitForm('ruleForm')" v-show="lock">{{$t('btn.save')}}</el-button>
                  <el-button type="danger" @click="handleDelete('ruleForm')" v-show="sc && lock">{{$t('btn.delete')}}</el-button>
                </el-form-item>
<!-- 详情页面新建 -->
                <el-form-item style="margin:50px 0 0 50px;" v-show="!ss">
                   <el-button v-show="lock" type="primary" @click="submit('ruleForm')">{{$t('btn.save')}}</el-button>
                </el-form-item>
             </el-form>
             <div style="width:1200px;font-size: 30px;color: #777;margin: 30px auto;text-align:center;" v-show="info">
                    <div style="margin-bottom:30px; line-height: 1;
                         font-size: 60px;font-weight: bolder;color: #2d8cf0;">很<span style="color:#00a854;">抱</span>歉</div>
                    暂无数据请创建
              </div>
       </div>
        <pjc-dialog :event="pjcDialog" @closeTagDialog="closeTagDialog" @hand="fn($event)" :name="ruleForm.reportingEnglish">
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
        subjectId:'', //患者id
        info:false,
        mains:true,
        save:true,
        ss:true,  
        sc:true,
        id:'',
        ruleForm: {
          meddraVersion:"18.1",
          meddraNum:'',
          reportingEnglish:'',
          preferredterm:'',
          isAutopsy:'',
        },
        // rules: {
        //   name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        // }
        options: [], 
        subjectDieId:""
       };
    },
      components:{
        pjcDialog
    },
    methods: {
       // 搜索名称
        queryAdminRole(){
            this.pjcDialog=true
        },
        search(){
            this.pjcDialog=true
  
        },
        closeTagDialog(){
            this.pjcDialog=false
        },
        fn(msg){
            this.ruleForm.meddraNum=msg.id
            this.ruleForm.reportingEnglish=msg.name
        },
    // 创建新的数据
        mitForm(formName) {
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.$confirm(this.$t('dead.dere1'), this.$t('dead.detishi'), {
                      confirmButtonText: this.$t('dead.deyes'),
                      cancelButtonText: this.$t('dead.deno'),
                      type: 'warning'
                  }).then(() => {
                     
              //   点击确认后向服务器传参
              var url=this.global.url+"/subjectDie/addSubjectDie?";
              var postDate=this.qs.stringify({
                    subjectId:this.subjectId,
                    meddraVersion:this.ruleForm.meddraVersion,
                    meddraNum:this.ruleForm.meddraNum,
                    reportingEnglish:this.ruleForm.reportingEnglish,
                    preferredterm:this.ruleForm.preferredterm,
                    isAutopsy:this.ruleForm.isAutopsy,
              })
              this.$axios.post(url+postDate).then((res)=>{
                    if(res.data.status==200){
                         this.$message({
                             type: 'success',
                              message: this.$t('dead.desuccess2'),
                      });
                      this.option()
                    }
              })
                  }).catch(() => {
                      this.$message({
                      type: 'info',
                      message: this.$t('dead.dedeaft1')
                      }); 
                  });  
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
            },
        Form() { 
             this.$router.push({path:"/autopsy"})
        },
        option(){
            var url=this.global.url+"/subjectDie/selectSubjectDie?subjectId="+this.subjectId
        this.$axios.get(url).then((res)=>{
          if(res.data.status==200){
               this.options=res.data.data
          }else{
            this.$message.error(this.$t('dead.deerro'));           
          }
        })
        },

// ---------------------------------------修改-------------------
    
	  // 新建死亡原因
	  newcase(){
            this.ss=false
            this.mains=true
            this.info=false
	          this.resetForm('ruleForm')
	          console.log(this.subjectId)
	      },
	       submit(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	             this.$confirm(this.$t('dead.dere1'), this.$t('dead.detishi'), {
	                confirmButtonText: this.$t('dead.deyes'),
	                cancelButtonText: this.$t('dead.deno'),
	                type: 'warning'
	            }).then(() => {
	        //   点击确认后向服务器传参
	        var url=this.global.url+"/subjectDie/addSubjectDie?"
	        var postData=this.qs.stringify({
	             subjectId:this.subjectId,
	             meddraVersion:this.ruleForm.meddraVersion,
	             meddraNum:this.ruleForm.meddraNum,
	             reportingEnglish:this.ruleForm.reportingEnglish,
	             preferredterm:this.ruleForm.preferredterm,
	             isAutopsy:this.ruleForm.isAutopsy,
	        })
	        this.$axios.post(url+postData).then((res)=>{
	          console.log(res)
	          if(res.data.status==200){
                // this.$router.go(0)
                 this.$message({
                    type: 'success',
                    message: this.$t('dead.desuccess2'),
                  });
                this.get()
	          }
	        })
	            }).catch(() => {
	                this.$message({
	                type: 'info',
	                message: this.$t('dead.dedeaft1')
	                }); 
	            });
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	      hand(){
	        var url=this.global.url+"/subjectDie/selectSubjectDieById?subjectDieId="+this.subjectDieId;
	        this.$axios.get(url).then((res)=>{
	          console.log(res)
	          if(res.data.status==200){
              this.id=res.data.data.id
              this.ruleForm=res.data.data
              
              if(res.data.data.isAutopsy==null){this.resetForm.isAutopsy=""}else{this.ruleForm.isAutopsy=JSON.stringify(res.data.data.isAutopsy)}     
	          }
	        })
	      },
		  // 删除事件
		  handleDelete(){
		  		  this.save=false;
		  		           this.$confirm(this.$t('dead.dere'), this.$t('dead.detishi'), {
                       confirmButtonText: this.$t('dead.dedeyes'),
		  		                       cancelButtonText: this.$t('dead.deno'),
		  		                       type: 'warning'
		  		                   }).then(() => {
                               this.$message({
                                 type: 'success',
		  		                           message: this.$t('dead.desuccess'),
		  		                       })   
		  		  var url=this.global.url+"/subjectDie/delete?subjectDieId="+this.id
		  		  this.$axios.delete(url).then((res)=>{
		  		      if(res.data.status==200){
		  		                       this.get()
                              }
                          })
		  		                  }).catch(() => {
		  		                           this.$message({
		  		                           type: 'info',
		  		                           message: this.$t('dead.dedeaft')
		  		                           }); 
		  		            });  
		  },
      get(){
        if(this.$store.state.lock=="3"){
           this.lock=false
         }
        this.save=false;
        var url=this.global.url+"/subjectDie/selectSubjectDie?subjectId="+this.subjectId
        this.$axios.get(url).then((res)=>{
          console.log(res)
          if(res.data.status==200){
            if(res.data.data.length==0){
              this.info=true
              this.mains=false
            }else if(res.data.data.length==1){
              this.sc=false
              this.info=false
              this.mains=true
              this.ruleForm=res.data.data[0]
              
              if(res.data.data[0].isAutopsy==null){
                this.ruleForm.isAutopsy=""
              }else{
                this.ruleForm.isAutopsy=JSON.stringify(res.data.data[0].isAutopsy) 
              }
              this.id=res.data.data[0].id
              this.subjectDieId=res.data.data[0].reportingEnglish
              // this.id=res.data.data[0].id
		        	this.options=res.data.data
            }else{
              this.sc=true
              this.ss=true
              this.info=false
              this.mains=true
              this.ruleForm=res.data.data[0]
               if(res.data.data[0].isAutopsy==null){
                this.ruleForm.isAutopsy=""
              }else{
                this.ruleForm.isAutopsy=JSON.stringify(res.data.data[0].isAutopsy) 
              }
              this.id=res.data.data[0].id
              this.subjectDieId=res.data.data[0].reportingEnglish
// this.id=res.data.data[0].id
		        	this.options=res.data.data
            }
          }else{
            this.$message.error(this.$t('dead.deerro'));           
          }
        })
      },
  // 修改详情
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('dead.dere1'), this.$t('dead.detishi'), {
                confirmButtonText: this.$t('dead.deyes'),
                cancelButtonText: this.$t('dead.deno'),
                type: 'warning'
            }).then(() => {
            
        //   点击确认后向服务器传参
         var url=this.global.url+"/subjectDie/update?"
                  var  postData=this.qs.stringify({
                        id:this.id,
                         meddraVersion:this.ruleForm.meddraVersion,
                        meddraNum:this.ruleForm.meddraNum,
                        reportingEnglish:this.ruleForm.reportingEnglish,
                        preferredterm:this.ruleForm.preferredterm,
                        isAutopsy:this.ruleForm.isAutopsy,    
                  })
                  this.$axios.post(url+postData).then((res)=>{
                    if(res.data.status==200){
                         this.$message({
                            type: 'success',
                            message: this.$t('dead.desuccess1'),
                          });
                      this.option()
                    }else{
                      this.$message.error(this.$t('dead.deerro1'))
                    }
                  })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('dead.dedeaft1')
                }); 
            });  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) { 
                this.$refs[formName].resetFields();
      },
    },
    created(){
      var nav=sessionStorage.getItem("nav")
      if(nav==1){
        var subId=sessionStorage.getItem("subjectId")
          if(subId==undefined){
            this.$router.push({path:'/newList'})
          }else{
            this.subjectId=subId
            console.log(this.subjectId)
          }

        this.get()
      }else{
         var sub=sessionStorage.getItem("subjectId")
          var cas=sessionStorage.getItem("caseId")
          if(cas==undefined){
             this.$message({
              showClose: true,
              message: this.$t('dead.defirst'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/details"})
            },2000)
          }else if(sub==undefined){
             this.$message({
              showClose: true,
              message: this.$t('dead.desecond'),
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
<style scoped>
 /* *{margin: 0;padding: 0;} */
 .ipts{
   width:250px;
   margin: 0 30px 0 100px;
 }
  .lii{ text-align: center;
  color:#838ab6;
      line-height: 30px;
      width:30px;border: 1px solid #ececff;
      height:30px;}
</style>



    