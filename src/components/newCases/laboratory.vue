<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('labo.lalabo')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
         
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;">
             <div v-show="!save && lock" style="float:left">
                 <el-button type="primary" @click="newcase" style="width:100px" >{{$t('labo.lanew')}}</el-button>
             </div>
             <span>{{$t('labo.lalabo')}}</span>
             <div style="float:right">
                   <el-select v-model="caseLabId" @change="hand" :placeholder="$t('btn.selectother')">
                     <el-option
                       v-for="item in options"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
                     </el-option>
                   </el-select>
             </div>
           </div>
           <el-form v-show="mains" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="450px" style="margin-top:20px;" class="demo-ruleForm">
                           
              <!-- 创建 -->
               <el-form-item :label="$t('labo.ladate')" prop="date"  v-if="save">
                         <el-date-picker class="ipts"
                         value-format=" yyyy-MM-dd" format="yyyy-MM-dd" v-model="ruleForm.date" type="datetime" :placeholder="$t('btn.entime')"> </el-date-picker>
                   <el-tooltip :content="$t('tishi.R1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>  
                <!--修改  -->
             
                    <el-form-item :label="$t('labo.ladate')" prop="date" v-else v-show="ss">
                         <el-date-picker class="ipts"
                          v-model="ruleForm.date" type="datetime" :placeholder="$t('btn.entime')"> </el-date-picker>
                   <el-tooltip :content="$t('tishi.R1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>  
				<!-- 新建 -->
				<el-form-item :label="$t('labo.ladate')" prop="date" v-show="!ss">
				    <el-date-picker class="ipts"  value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
					v-model="ruleForm.date" :placeholder="$t('btn.entime')"></el-date-picker>
				    <el-tooltip :content="$t('tishi.R1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
				</el-form-item>  
                 <el-form-item :label="$t('labo.laname')" prop="name">
                    <el-input v-model="ruleForm.name" class="ipts"  @keyup.enter.native="queryAdminRole" :placeholder="$t('btn.enter')"></el-input>
                    <el-button type="primary" @click="search" icon="el-icon-search" circle title="点击搜索"></el-button>
                </el-form-item>
                <el-form-item :label="$t('labo.lanameMed')" prop="nameMed">
                    <el-input v-model="ruleForm.nameMed" class="ipts" :disabled="true" placeholder="请输入版本"></el-input>
                    <el-tooltip :content="$t('tishi.R2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('labo.lanameMedcode')" prop="nameMedcode">
                    <el-input v-model="ruleForm.nameMedcode" class="ipts"  :disabled="true" :placeholder="$t('labo.laenter')"></el-input>
                    <el-tooltip :content="$t('tishi.R3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('labo.laresultValue')" prop="resultValue">
                    <el-input v-model="ruleForm.resultValue" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.R4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('labo.laresultUnit')" prop="resultUnit">
                    <el-input v-model="ruleForm.resultUnit" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.R5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('labo.launstructuredResult')" prop="unstructuredResult">
                    <el-input v-model="ruleForm.unstructuredResult" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.R6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>


                <el-form-item :label="$t('labo.laresult')" prop="result">
                    <el-select v-model="ruleForm.result" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('labo.laresult1')" value="1"></el-option>
                       <el-option :label="$t('labo.laresult2')" value="2"></el-option>                                             
                       <el-option :label="$t('labo.laresult3')" value="3"></el-option>
                       <el-option :label="$t('labo.laresult4')" value="4"></el-option>                                             
                    </el-select>
                    <el-tooltip :content="$t('tishi.R7')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('labo.lalowValue')" prop="lowValue">
                    <el-input v-model="ruleForm.lowValue" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.R8')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('labo.lahighValue')" prop="highValue">
                    <el-input v-model="ruleForm.highValue" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.R9')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
              
               <el-form-item :label="$t('labo.lamoreInfo')" prop="moreInfo">
                    <el-select v-model="ruleForm.moreInfo" class="ipts" :placeholder="$t('btn.selects')" >
                       <el-option :label="$t('labo.lamoreInfo1')" value="1"></el-option>
                       <el-option :label="$t('labo.lamoreInfo2')" value="2"></el-option>                                                                                          
                    </el-select>
                    <el-tooltip :content="$t('tishi.R10')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
             
               <el-form-item :label="$t('labo.lacomment')" prop="comment">
                    <el-input
                        type="textarea"
                        :rows="2"
                        :placeholder="$t('btn.enter')"
                        v-model="ruleForm.comment" class="ipts">
                        </el-input>
                    <el-tooltip :content="$t('tishi.R11')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
             
                
<!-- 新建 -->
                <el-form-item style="margin:30px 0 0 50px;" v-if="save">
                   <el-button type="primary" @click="mitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                   <el-button type="success" @click="submitForm('ruleForm')">{{$t('project.ch')}}</el-button>
                   <el-button @click="Form">{{$t('btn.next')}}</el-button>
                </el-form-item>
 <!-- 修改按钮 -->
							 <el-form-item style="margin:30px 0 0 50px;" v-else v-show="ss && lock">
							 <el-button type="primary" @click="submitForm('ruleForm')">{{$t('btn.save')}}</el-button>
							 <el-button type="danger" @click="handleDelete('ruleForm')" v-show="sc">{{$t('btn.delete')}}</el-button>
							 </el-form-item>
							 <!-- 新建按钮 -->
							 <el-form-item style="margin:50px 0 0 50px;" v-show="!ss && lock">
							 <el-button type="primary" @click="submit('ruleForm')">{{$t('btn.save')}}</el-button>
							 </el-form-item>
            </el-form>
             <div style="width:1200px;font-size: 30px;color: #777;margin: 30px auto;text-align:center;" v-show="info">
                    <div style="margin-bottom:30px; line-height: 1;
                         font-size: 60px;font-weight: bolder;color: #2d8cf0;">很<span style="color:#00a854;">抱</span>歉</div>
                    暂无数据请创建
              </div>
       </div>
         <pjc-dialog :event="pjcDialog" @closeTagDialog="closeTagDialog" @hand="fn($event)" :name="ruleForm.name">
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
          caseId:"",//病例Id
          save:true,
          mains:true,
          info:false,
          id:"",
          ss:true,//新建和修改的切换
          sc:true,//删除按钮，如果数据少于两条就会隐藏
          ruleForm: {
            date:'',
            name:'',
            nameMed:'18.1',
            nameMedcode:'',
            resultValue:'',
            resultUnit:'',
            unstructuredResult:'',
            result:'',
            lowValue: '',
            highValue:'',
            moreInfo:'',
            comment:''
        },
        rules: {
          name: [{ required: true, message: '如果没此信息请填无', trigger: 'blur' }],
        },
		options: [],
		 caseLabId:""
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
            this.ruleForm.nameMedcode=msg.id
            this.ruleForm.name=msg.name
        },
    // 新建
      mitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm('是否保存当前信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
        //   点击确认后向服务器传参

         if(this.ruleForm.date==""){
              var time=""
            }else{
                 var date = new Date(this.ruleForm.date);  
                   var dateNumFun = (num) => num < 10 ? `0${num}` : num   
                  var time=date.getFullYear() + '-' + (dateNumFun(date.getMonth() + 1))+ '-' + dateNumFun(date.getDate()) + ' ' + dateNumFun(date.getHours())+ ':' + dateNumFun(date.getMinutes()) + ':' + dateNumFun(date.getSeconds()) ; 
                    if(time=="1970-1-1"){
                          time=""
                    }
            }
           var url=this.global.url+"/caseLab/addCaseLab?";
           var postData=this.qs.stringify({
                caseId:this.caseId,
                date:time,
                name:this.ruleForm.name,
                nameMed:this.ruleForm.nameMed,
                nameMedcode:this.ruleForm.nameMedcode,
                resultValue:this.ruleForm.resultValue,
                resultUnit:this.ruleForm.resultUnit,
                unstructuredResult:this.ruleForm.unstructuredResult,
                result:this.ruleForm.result,
                lowValue: this.ruleForm.lowValue,
                highValue:this.ruleForm.highValue,
                moreInfo:this.ruleForm.moreInfo,
                comment:this.ruleForm.comment,
           })
           this.$axios.post(url+postData).then((res)=>{
               console.log(res)  
              if(res.data.status==200){
                  this.$message({
                    type: 'success',
                    message: '保存成功!',
                  });
                  this.option()
               
              }else{
                  this.$message.error("数据传输错误");
                  
              }
           })
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
      Form() {
        this.$router.push({path:"/summary"})
      },
      option(){
         var url=this.global.url+"/caseLab/selectCaseLab?caseId="+this.caseId;
          this.$axios.get(url).then((res)=>{
              if(res.data.status==200){
                this.options=res.data.data
              }else{
                  this.$message.error("数据传输错误")
              }
          })
      },


// -------------------------------------修改
     
	  // 新建实验室检查
	  newcase(){
            this.ss=false
            this.mains=true
            this.info=false
	          this.resetForm('ruleForm')
	          console.log(this.caseId)
	      },
	       submit(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	             this.$confirm('是否保存当前信息?', '提示', {
	                confirmButtonText: '确定',
	                cancelButtonText: '取消',
	                type: 'warning'
	            }).then(() => {
          //   点击确认后向服务器传参
           if(this.ruleForm.date==""){
              var time=""
            }else{
                 var date = new Date(this.ruleForm.date);  
                   var dateNumFun = (num) => num < 10 ? `0${num}` : num   
                  var time=date.getFullYear() + '-' + (dateNumFun(date.getMonth() + 1))+ '-' + dateNumFun(date.getDate()) + ' ' + dateNumFun(date.getHours())+ ':' + dateNumFun(date.getMinutes()) + ':' + dateNumFun(date.getSeconds()) ; 
                    if(time=="1970-1-1"){
                          time=""
                    }
            }
	        var url=this.global.url+"/caseLab/addCaseLab?"
	        var postData=this.qs.stringify({
	             caseId:this.caseId,
	             date:time,
	             name:this.ruleForm.name,
	             nameMed:this.ruleForm.nameMed,
	             nameMedcode:this.ruleForm.nameMedcode,
	             resultValue:this.ruleForm.resultValue,
	             resultUnit:this.ruleForm.resultUnit,
	             unstructuredResult:this.ruleForm.unstructuredResult,
	             result:this.ruleForm.result,
	             lowValue: this.ruleForm.lowValue,
	             highValue:this.ruleForm.highValue,
	             moreInfo:this.ruleForm.moreInfo,
	             comment:this.ruleForm.comment,
	        })
	        this.$axios.post(url+postData).then((res)=>{
	          console.log(res)
	          if(res.data.status==200){
                // this.$router.go(0)
               this.$message({
                  type: 'success',
                  message: '保存成功!',
                });
                this.get()
	          }
	        })
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
		  // 选择框
	      hand(){
	        console.log(this.caseLabId)
	        var url=this.global.url+"/caseLab/selectCaseLabById?caseLabId="+this.caseLabId;
	        this.$axios.get(url).then((res)=>{
	          console.log(res)
	          if(res.data.status==200){
              this.ruleForm=res.data.data
              this.id=res.data.data.id
				if(res.data.data.result==null){
					 this.ruleForm.result="";
				}else{
					this.ruleForm.result=JSON.stringify(res.data.data.result);
				}
	          }
	        })
	      },
		  // 删除事件
		  handleDelete(){
		  		  this.save=false;
		  		  var url=this.global.url+"/caseLab/delete?caseLabId="+this.id
		  		  this.$axios.delete(url).then((res)=>{
		  		      if(res.data.status==200){
		  		           this.$confirm('是否删除当前信息?', '提示', {
		  		                confirmButtonText: '删除',
		  		                       cancelButtonText: '取消',
		  		                       type: 'warning'
		  		                   }).then(() => {
		  		                       this.$message({
		  		                           type: 'success',
		  		                           message: '删除成功!',
		  		                       })   
		  		                       this.get()
		  		                  }).catch(() => {
		  		                           this.$message({
		  		                           type: 'info',
		  		                           message: '已取消'
		  		                           }); 
		  		            });  
		  		      }
		  		  })
		  },
      get(){
        if(sessionStorage.getItem("lock")==3){
           this.lock=false
         }
          this.save=false;
          var url=this.global.url+"/caseLab/selectCaseLab?caseId="+this.caseId;
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
                  this.id=res.data.data[0].id
                  this.caseLabId=res.data.data[0].name
				          this.options=res.data.data		 
                      if(res.data.data[0].result==null){
                          this.resetForm.result=""
                      }else{
                         this.ruleForm.result=JSON.stringify(res.data.data[0].result);
                      }
                }else{
                  this.sc=true
                  this.ss=true
                  this.info=false
                  this.mains=true
                  this.ruleForm=res.data.data[0]
                  this.id=res.data.data[0].id
                   this.caseLabId=res.data.data[0].name
				          this.options=res.data.data		 
                      if(res.data.data[0].result==null){
                          this.resetForm.result=""
                      }else{
                         this.ruleForm.result=JSON.stringify(res.data.data[0].result);
                      }
                }
              }else{
                  this.$message.error("数据传输错误")
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
        console.log(this.ruleForm.date)
            if(this.ruleForm.date==""){
              var time=""
            }else{
                 var date = new Date(this.ruleForm.date);
                 var dateNumFun = (num) => num < 10 ? `0${num}` : num   
                  var time=date.getFullYear() + '-' + (dateNumFun(date.getMonth() + 1))+ '-' + dateNumFun(date.getDate()) + ' ' + dateNumFun(date.getHours())+ ':' + dateNumFun(date.getMinutes()) + ':' + dateNumFun(date.getSeconds()) ; 
                    if(time=="1970-1-1"){
                          time=""
                    }
            }
                 
                  var url=this.global.url+"/caseLab/update?"
                  console.log(this.id)
                  var  postData=this.qs.stringify({
                        id:this.id,
                        date:time,
                        name:this.ruleForm.name,
                        nameMed:this.ruleForm.nameMed,
                        nameMedcode:this.ruleForm.nameMedcode,
                        resultValue:this.ruleForm.resultValue,
                        resultUnit:this.ruleForm.resultUnit,
                        unstructuredResult:this.ruleForm.unstructuredResult,
                        result:this.ruleForm.result,
                        lowValue: this.ruleForm.lowValue,
                        highValue:this.ruleForm.highValue,
                        moreInfo:this.ruleForm.moreInfo,
                        comment:this.ruleForm.comment, 
                  })
                  this.$axios.post(url+postData).then((res)=>{
                      console.log(res)
                    if(res.data.status==200){
                         this.$message({
                            type: 'success',
                            message: '保存成功!',
                          });
                      this.option()
                    }else{
                      this.$message.error("修改失败，数据传输错误！")
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
      },
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
              message: '请先创建病例',
              type: 'error'
            });
          setTimeout(()=>{
             this.$router.push({path:"/details"})
          },2000)
        }else{
            this.caseId=caseId
            this.option()
        }
        }
    }
}
</script>
<style scoped>
 /* *{margin: 0;padding: 0;} */
.ipts{
  width:250px; margin: 0 30px 0 100px;
}
  .lii{ text-align: center;
  color:#838ab6;
      line-height: 30px;
      width:30px;border: 1px solid #ececff;
      height:30px;}
</style>




