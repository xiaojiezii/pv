<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('drug.drugdrug')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
		   <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;">
		     <div v-show="!save" style="float:left">
		         <el-button v-show="lock" type="primary" @click="newcase" style="width:150px" >{{$t('drug.drugnew')}}</el-button>
		     </div>
		     <span>{{$t('drug.drugdrug')}}</span>
		     <div  style="float:right">
		           <el-select v-model="subjectMedicineId" @change="hand" :placeholder="$t('btn.selectother')">
		             <el-option
		               v-for="item in options"
		               :key="item.id"
		               :label="item.medicineName"
		               :value="item.id">
		             </el-option>
		           </el-select>
		     </div>
		   </div>
           <!-- <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;"><span> 患者相关药史</span></div> -->
           <el-form v-show="mains" :model="ruleForm"  ref="ruleForm" label-width="450px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item :label="$t('drug.drugname')" prop="medicineName">
                    <el-input class="ipts" v-model="ruleForm.medicineName" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.D1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('drug.drugmpidNumber')" prop="mpidNumber">
                    <el-input  class="ipts" v-model="ruleForm.mpidNumber" :placeholder="$t('btn.enterno')"></el-input>
                    <el-tooltip :content="$t('tishi.D2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('drug.drugmpid')" prop="mpid">
                    <el-input class="ipts" v-model="ruleForm.mpid" :placeholder="$t('btn.enterMPID')"></el-input>
                    <el-tooltip :content="$t('tishi.D3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('drug.drugphpidNumber')" prop="phpidNumber">
                    <el-input class="ipts" v-model="ruleForm.phpidNumber" :placeholder="$t('btn.enterno')"></el-input>
                    <el-tooltip :content="$t('tishi.D4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('drug.drugphpid')" prop="phpid">
                    <el-input class="ipts" v-model="ruleForm.phpid" :placeholder="$t('btn.enterPhPID')"></el-input>
                    <el-tooltip :content="$t('tishi.D5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
<!-- 创建 -->
                <el-form-item :label="$t('drug.drugdateStart')" prop="dateStart" v-if="save">
                    <el-date-picker class="ipts"
                    value-format=" yyyy-MM-dd" format="yyyy-MM-dd" 
                     v-model="ruleForm.dateStart" :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.D6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
            <!-- 修改 -->
                <el-form-item :label="$t('drug.drugdateStart')" prop="dateStart" v-else v-show="ss">
                    <el-date-picker  class="ipts" v-model="ruleForm.dateStart" :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.D6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
				<!-- 新增 -->
				<el-form-item :label="$t('drug.drugdateStart')" prop="dateStart" v-show="!ss">
				    <el-date-picker class="ipts"
					value-format=" yyyy-MM-dd" format="yyyy-MM-dd" 
					v-model="ruleForm.dateStart" :placeholder="$t('btn.entime')"></el-date-picker>
				    <el-tooltip :content="$t('tishi.D6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
				</el-form-item>
				<!--创建  -->
                <el-form-item :label="$t('drug.drugdateEnd')" prop="dateEnd" v-if="save">
                    <el-date-picker class="ipts"
                    value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                    v-model="ruleForm.dateEnd"  :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.D7')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
               <!--修改  -->
                <el-form-item :label="$t('drug.drugdateEnd')" prop="dateEnd" v-else v-show="ss">
                    <el-date-picker class="ipts"  v-model="ruleForm.dateEnd"  :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.D7')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
				 <!--新增  -->
				 <el-form-item :label="$t('drug.drugdateEnd')" prop="dateEnd" v-show="!ss">
				     <el-date-picker  class="ipts"
					  value-format=" yyyy-MM-dd" format="yyyy-MM-dd" 
					  v-model="ruleForm.dateEnd"  :placeholder="$t('btn.entime')"></el-date-picker>
				     <el-tooltip :content="$t('tishi.D7')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
				 </el-form-item>
								
                <el-form-item :label="$t('drug.drugindicationName')" prop="indicationName">
                    <el-input class="ipts" v-model="ruleForm.indicationName"
                    @keyup.enter.native="queryAdminRole" :placeholder="$t('btn.enter')"></el-input>
                    <el-button type="primary" @click="search" icon="el-icon-search" circle title="点击搜索"></el-button>
                </el-form-item>
                <el-form-item :label="$t('drug.drugindicationMeddraversion')" prop="indicationMeddraversion">
                    <el-input class="ipts" v-model="ruleForm.indicationMeddraversion" :disabled="true" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.D8')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('drug.drugindicationMeddranumber')" prop="indicationMeddranumber">
                    <el-input class="ipts" v-model="ruleForm.indicationMeddranumber" :disabled="true" placeholder="请输入症状名称选择"></el-input>
                    <el-tooltip :content="$t('tishi.D9')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('drug.drugreactionName')" prop="reactionName">
                    <el-input class="ipts" v-model="ruleForm.reactionName" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('drug.drugreactionMeddraversion')" prop="reactionMeddraversion">
                    <el-input class="ipts" v-model="ruleForm.reactionMeddraversion" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.D10')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('drug.drugreactionMeddranumber')" prop="reactionMeddranumber">
                    <el-input class="ipts" v-model="ruleForm.reactionMeddranumber" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.D11')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                
<!-- 创建按钮 -->
               <el-form-item style="margin:30px 0 0 50px;" v-if="save">
                <el-button type="primary" @click="mitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                <el-button type="success" @click="submitForm('ruleForm')">{{$t('project.ch')}}</el-button>
                <el-button @click="Form">{{$t('btn.next')}}</el-button>
                </el-form-item>
        <!-- 修改按钮 -->
               <el-form-item style="margin:30px 0 0 50px;" v-else v-show="ss">
               <el-button type="primary" v-show="lock" @click="submitForm('ruleForm')">{{$t('btn.save')}}</el-button>
               <el-button type="danger" @click="handleDelete('ruleForm')" v-show="sc && lock">{{$t('btn.delete')}}</el-button>
               </el-form-item>
			   <!-- 新增按钮 -->
               <el-form-item style="margin:30px 0 0 50px;" v-show="!ss">
               <el-button type="primary" v-show="lock" @click="submit('ruleForm')">{{$t('btn.save')}}</el-button>
               </el-form-item>
               </el-form>
				       <div style="width:1200px;font-size: 30px;color: #777;margin: 30px auto;text-align:center;" v-show="info">
                    <div style="margin-bottom:30px; line-height: 1;
                         font-size: 60px;font-weight: bolder;color: #2d8cf0;">很<span style="color:#00a854;">抱</span>歉</div>
                    暂无数据请创建
              </div>
       </div>

        <pjc-dialog :event="pjcDialog" @closeTagDialog="closeTagDialog" @hand="fn($event)" :name="ruleForm.indicationName">
       </pjc-dialog>
    </div>
</template>
<script>
import pjcDialog from "./pjc.dialog.vue"
export default {
    data() {
      return {
        lock:true,
          subjectId:'', //患者Id
          info:false,
          mains:true,
          save:true,
          ss:true,
          sc:true,
          id:"",
        ruleForm: {
          medicineName:'',
          mpidNumber:'',
          mpid:'',
          phpidNumber:'',
          phpid:'',
          dateStart:'',
          dateEnd:'',
          indicationName:'',
         indicationMeddraversion:'18.1',
         indicationMeddranumber:'',
          reactionName:'',
          reactionMeddraversion: '',
          reactionMeddranumber: '',
        },
        // rules: {
        //   name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        // }
    options: [],
    pjcDialog:false,
		 subjectMedicineId:""
      };
    },
    components:{
        pjcDialog
    },
    methods: {
    // 搜索
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
            this.ruleForm.indicationMeddranumber=msg.id
            this.ruleForm.indicationName=msg.name
        },
    


//    -----------------创建事件
    mitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('dise.dire'), this.$t('dise.ditishi'), {
                confirmButtonText: this.$t('dise.diyes'),
                cancelButtonText: this.$t('dise.dino'),
                type: 'warning'
            }).then(() => {
            
        //   点击确认后向服务器传参
               var url=this.global.url+"/subjectMedicine/addSubjectMedicine?";
               var postData=this.qs.stringify({
                     subjectId:this.subjectId,
                     medicineName:this.ruleForm.medicineName,
                     mpidNumber:this.ruleForm.mpidNumber,
                     mpid:this.ruleForm.mpid,
                     phpidNumber:this.ruleForm.phpidNumber,
                     phpid:this.ruleForm.phpid,
                     dateStart:this.ruleForm.dateStart,
                     dateEnd:this.ruleForm.dateEnd,
                     indicationName:this.ruleForm.indicationName,
                     indicationMeddraversion:this.ruleForm.indicationMeddraversion,
                     indicationMeddranumber:this.ruleForm.indicationMeddranumber,
                     reactionName:this.ruleForm.reactionName,
                     reactionMeddraversion: this.ruleForm.reactionMeddraversion,
                     reactionMeddranumber: this.ruleForm.reactionMeddranumber,
               })
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
      Form() {
         this.$router.push({path:"/ptsInfo"})
      },
      option(){
  var url=this.global.url+"/subjectMedicine/selectSubjectMedicine?subjectId="+this.subjectId       
              this.$axios.get(url).then((res)=>{  
                console.log(res)
               if(res.data.status==200){
                  this.options=res.data.data    
               }else{
                   this.$message.error(this.$t('dise.dierro'));
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
		  var url=this.global.url+"/subjectMedicine/delete?subjectMedicineId="+this.id
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
    

//------------修改事件 
        get(){
           if(sessionStorage.getItem("lock")==3){
           this.lock=false
         }
            this.save=false;
            var url=this.global.url+"/subjectMedicine/selectSubjectMedicine?subjectId="+this.subjectId       
              this.$axios.get(url).then((res)=>{  
                console.log(res)
               if(res.data.status==200){
                 if(res.data.data.length==0){
                    this.mains=false
                    this.info=true
                 }else if(res.data.data.length==1){
                     this.mains=true
                     this.info=false
                     this.sc=false;
                     this.ruleForm=res.data.data[0]
                     this.id=res.data.data[0].id
                    // this.i=res.data.data[0].subjectId
                    this.subjectMedicineId=res.data.data[0].medicineName
                    this.options=res.data.data
                 }else{
                   this.mains=true
                     this.info=false
                     this.sc=true;
                     this.ss=true
                     this.ruleForm=res.data.data[0]
                     this.id=res.data.data[0].id
                    // this.subjectId=res.data.data[0].subjectId
                     this.subjectMedicineId=res.data.data[0].medicineName
                    this.options=res.data.data
                 }
                   
               }else{
                   this.$message.error(this.$t('dise.dierro'));
               }
            })
        },
	  // 新建药史
	  newcase(){
          this.ss=false;
            this.mains=true;
          this.info=false;
	        this.resetForm('ruleForm')
	        console.log(this.subjectMedicineId)
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
		  
	      var url=this.global.url+"/subjectMedicine/addSubjectMedicine?";
	      var postData=this.qs.stringify({
	          subjectId:this.subjectId,
	          medicineName:this.ruleForm.medicineName,
	          mpidNumber:this.ruleForm.mpidNumber,
	          mpid:this.ruleForm.mpid,
	          phpidNumber:this.ruleForm.phpidNumber,
	          phpid:this.ruleForm.phpid,
	          dateStart:this.ruleForm.dateStart,
	          dateEnd:this.ruleForm.dateEnd,
	          indicationName:this.ruleForm.indicationName,
	          indicationMeddraversion:this.ruleForm.indicationMeddraversion,
	          indicationMeddranumber:this.ruleForm.indicationMeddranumber,
	          reactionName:this.ruleForm.reactionName,
	          reactionMeddraversion: this.ruleForm.reactionMeddraversion,
	          reactionMeddranumber: this.ruleForm.reactionMeddranumber,
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
	      console.log(this.subjectMedicineId)
	      var url=this.global.url+"/subjectMedicine/selectSubjectMedicineById?subjectMedicineId="+this.subjectMedicineId;
	      this.$axios.get(url).then((res)=>{
	        console.log(res)
	        if(res.data.status==200){
            this.ruleForm=res.data.data
            this.id=res.data.data.id
	        }else{
            this.$message.error(this.$t('dise.dierro'))
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
                if(this.ruleForm.dateStart==""){
                  var time=""
                }else{
                    var date = new Date(this.ruleForm.dateStart); 
                    var time=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                    if(time=="1970-1-1"){time=""}    
                }
                  if(this.ruleForm.dateEnd==""){
                         var time1=""
                  }else{
                      var date1 = new Date(this.ruleForm.dateEnd);  
                      var time1=date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate();
                      if(time1=="1970-1-1"){time1=""}   
                  }
              var url=this.global.url+"/subjectMedicine/update?";
              var postData=this.qs.stringify({
                   id:this.id,
                   medicineName:this.ruleForm.medicineName,
                    mpidNumber:this.ruleForm.mpidNumber,
                    mpid:this.ruleForm.mpid,
                    phpidNumber:this.ruleForm.phpidNumber,
                    phpid:this.ruleForm.phpid,
                    dateStart:time,
                    dateEnd:time1,
                    indicationName:this.ruleForm.indicationName,
                    indicationMeddraversion:this.ruleForm.indicationMeddraversion,
                    indicationMeddranumber:this.ruleForm.indicationMeddranumber,
                    reactionName:this.ruleForm.reactionName,
                    reactionMeddraversion: this.ruleForm.reactionMeddraversion,
                    reactionMeddranumber: this.ruleForm.reactionMeddranumber,
              })
              this.$axios.post(url+postData).then((res)=>{
                 if(res.data.status==200){
                        this.$message({
                          type: 'success',
                          message: this.$t('dise.disuccess'),
                        });
                        this.option()
                    // this.$router.go(0)
                 }else{
                   this.$message.error(this.$t('dise.dierro1'))
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
      resetForm(formName) {
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
              //  this.$router.push({path:"/details"})
            },2000)
           }else if(sub==undefined){
             this.$message({
              showClose: true,
              message: this.$t('dise.dithird'),
              type: 'error'
            });
            setTimeout(()=>{
              //  this.$router.push({path:"/newlist"})
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
  width: 250px;
  margin:0 30px 0 100px;
}
  .lii{ text-align: center;
  color:#838ab6;
      line-height: 30px;
      width:30px;border: 1px solid #ececff;
      height:30px;}
</style>


