<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('druginfo.drdruginfo')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
         
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;">
             <div v-show="!save && lock" style="float:left">
                 <el-button type="primary" @click="newcase" style="width:150px" >{{$t('druginfo.drnew')}}</el-button>
             </div>
             <span>{{$t('druginfo.drdruginfo')}}</span>
             <div style="float:right">
                   <el-select v-model="medicinesId" @change="hand" :placeholder="$t('btn.selectother')">
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
                 <el-form-item :label="$t('druginfo.drname')" prop="name">
                    <el-input v-model="ruleForm.name" class="ipts" placeholder="请输入药品名称"></el-input>
                    <el-tooltip :content="$t('tishi.J1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('druginfo.drfeature')" prop="feature">
                   <el-select v-model="ruleForm.feature" :placeholder="$t('btn.selects')" class="ipts">
                        <el-option :label="$t('druginfo.drfeature1')" value="1"></el-option>
                        <el-option v-show="firId==id ? false : true" :label="$t('druginfo.drfeature2')" value="2"></el-option>
                        <el-option :label="$t('druginfo.drfeature3')" value="3"></el-option>
                        <el-option :label="$t('druginfo.drfeature4')" value="4"></el-option>
                   </el-select>
                         <el-tooltip :content="$t('tishi.J2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                   </el-form-item>
               
               
               
               
               
                <el-form-item :label="$t('druginfo.drmpidNumber')" prop="mpidNumber">
                    <el-input v-model="ruleForm.mpidNumber" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.J3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('druginfo.drmpid')" prop="mpid">
                    <el-input v-model="ruleForm.mpid" class="ipts" :placeholder="$t('btn.enterno')"></el-input>
                    <el-tooltip :content="$t('tishi.J4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('druginfo.drphpidNumber')" prop="phpidNumber">
                    <el-input v-model="ruleForm.phpidNumber" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.J5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('druginfo.drphpid')" prop="phpid">
                    <el-input v-model="ruleForm.phpid" class="ipts" :placeholder="$t('btn.enterno')"></el-input>
                    <el-tooltip :content="$t('tishi.J6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
               
                 <el-form-item :label="$t('druginfo.drconfirm')" prop="confirm">
                   <el-select v-model="ruleForm.confirm" :placeholder="$t('btn.selects')" class="ipts">
                        <el-option :label="$t('druginfo.drconfirm1')" value="1"></el-option>
                        <el-option :label="$t('druginfo.drconfirm2')" value="2"></el-option>
                   </el-select>
                         <el-tooltip :content="$t('tishi.J7')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                   </el-form-item>
                 <el-form-item :label="$t('druginfo.drproduct')" prop="product">
                   <el-select v-model="ruleForm.product" :placeholder="$t('btn.selects')" class="ipts">
                        <el-option :label="$t('druginfo.drproduct1')" value="1"></el-option>
                        <el-option :label="$t('druginfo.drproduct2')" value="2"></el-option>
                   </el-select>
                         <el-tooltip :content="$t('tishi.J8')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                   </el-form-item>
                  <el-form-item :label="$t('druginfo.drlistedNumber')" prop="listedNumber">
                      <el-input v-model="ruleForm.listedNumber" class="ipts" :placeholder="$t('btn.enterno')"></el-input>
                      <el-tooltip :content="$t('tishi.J9')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                  </el-form-item>
                  <el-form-item :label="$t('druginfo.drlistedCountry')" prop="listedCountry">
                   <el-select v-model="ruleForm.listedCountry" :placeholder="$t('btn.selects')" class="ipts">
                        <el-option :label="$t('druginfo.drlistedCountry1')" value="1"></el-option>
                        <el-option :label="$t('druginfo.drlistedCountry2')" value="2"></el-option>
                   </el-select>
                         <el-tooltip :content="$t('tishi.J10')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                   </el-form-item>
                   <el-form-item :label="$t('druginfo.drholder')" prop="holder">
                      <el-input v-model="ruleForm.holder" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                      <el-tooltip :content="$t('tishi.J11')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                  </el-form-item>
                 <el-form-item :label="$t('druginfo.drholderAddress')" prop="holderAddress">
                      <el-input v-model="ruleForm.holderAddress" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                      <i class="el-icon-s-order lii" title="编写中"></i>
                  </el-form-item>
                 <el-form-item :label="$t('druginfo.drdoseCount')" prop="doseCount">
                      <el-input v-model="ruleForm.doseCount" type="number" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                      <el-tooltip :content="$t('tishi.J12')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                  </el-form-item>
                 <el-form-item :label="$t('druginfo.drdoseUnit')" prop="doseUnit">
                      <el-input v-model="ruleForm.doseUnit" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                      <el-tooltip :content="$t('tishi.J13')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                  </el-form-item>
                 <el-form-item :label="$t('druginfo.drpregnancyCount')" prop="pregnancyCount">
                      <el-input v-model="ruleForm.pregnancyCount" class="ipts" type="number" :placeholder="$t('btn.enter')"></el-input>
                      <el-tooltip :content="$t('tishi.J14')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                  </el-form-item>
                  <el-form-item :label="$t('druginfo.drpregnancyUnit')" prop="pregnancyUnit">
                   <el-select v-model="ruleForm.pregnancyUnit" :placeholder="$t('btn.selects')" class="ipts">
                        <el-option :label="$t('druginfo.drpregnancyUnit1')" value="1"></el-option>
                        <el-option :label="$t('druginfo.drpregnancyUnit2')" value="2"></el-option>
                        <el-option :label="$t('druginfo.drpregnancyUnit3')" value="3"></el-option>
                        <el-option :label="$t('druginfo.drpregnancyUnit4')" value="4"></el-option>
                   </el-select>
                         <el-tooltip :content="$t('tishi.J15')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                   </el-form-item>
                  <el-form-item :label="$t('druginfo.drmeasures')" prop="measures">
                   <el-select v-model="ruleForm.measures" :placeholder="$t('btn.selects')" class="ipts">
                        <el-option :label="$t('druginfo.drmeasures1')" value="1"></el-option>
                        <el-option :label="$t('druginfo.drmeasures2')" value="2"></el-option>
                        <el-option :label="$t('druginfo.drmeasures3')" value="3"></el-option>
                        <el-option :label="$t('druginfo.drmeasures4')" value="4"></el-option>
                        <el-option :label="$t('druginfo.drmeasures5')" value="0"></el-option>
                        <el-option :label="$t('druginfo.drmeasures6')" value="9"></el-option>
                   </el-select>
                         <el-tooltip :content="$t('tishi.J16')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                   </el-form-item>

                <el-form-item :label="$t('druginfo.drindicationName')" prop="indicationName">
                    <el-input
                        type="textarea"
                        :placeholder="$t('btn.enter')"
                        v-model="ruleForm.indicationName" class="ipts">
                        </el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('druginfo.drothers')" prop="others">
                    <el-input
                        type="textarea"
                        :placeholder="$t('btn.enter')"
                        v-model="ruleForm.others" class="ipts">
                        </el-input>
                    <el-tooltip :content="$t('tishi.J17')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>





<!-- 创建新的 -->
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
    </div>
</template>
<script>
export default {
    data() {
      return {
        lock:true,
          caseId:'',   //病例Id
          id:"",     //患者
          firId:'',
          save:true,
					ss:true,
          sc:true,
          info:false,
          mains:true,
        ruleForm: {
          mpidNumber:'',
          mpid:'',
          phpidNumber:'',
          phpid:'',
          name:'',
          confirm:'',
          product:'',
          listedNumber:'',
          listedCountry:'',
          holder:'',
          holderAddress:'',
          feature:'',
          doseCount:'',
          doseUnit:'',
          pregnancyCount:'',
          pregnancyUnit:'',
          measures:'',
          indicationName:'',
          others:'',
        },
        rules: {
           feature: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
           name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
        },
				options: [],
				 medicinesId:""
      };
    },
    methods: {
  // 新建信息
        mitForm(formName){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$confirm(this.$t('druginfo.drre'), this.$t('druginfo.drtishi'), {
                    confirmButtonText: this.$t('druginfo.dryes'),
                    cancelButtonText: this.$t('druginfo.drno'),
                    type: 'warning'
                }).then(() => {
                   
            //   点击确认后向服务器传参
            console.log(this.caseId)
                  var url=this.global.url+"/projectMedicines/addProjectMedicines?";
                  var postData=this.qs.stringify({
                          caseId:this.caseId,
                          mpidNumber:this.ruleForm.mpidNumber,
                          mpid:this.ruleForm.mpid,
                          phpidNumber:this.ruleForm.phpidNumber,
                          phpid:this.ruleForm.phpid,
                          name:this.ruleForm.name,
                          confirm:this.ruleForm.confirm,
                          product:this.ruleForm.product,
                          listedNumber:this.ruleForm.listedNumber,
                          listedCountry:this.ruleForm.listedCountry,
                          holder:this.ruleForm.holder,
                          holderAddress:this.ruleForm.holderAddress,
                          feature:this.ruleForm.feature,
                          doseCount:this.ruleForm.doseCount,
                          doseUnit:this.ruleForm.doseUnit,
                          pregnancyCount:this.ruleForm.pregnancyCount,
                          pregnancyUnit:this.ruleForm.pregnancyUnit,
                          measures:this.ruleForm.measures,
                          indicationName:this.ruleForm.indicationName,
                          others:this.ruleForm.others,
                        })
                        console.log(postData)
                      this.$axios.post(url+postData).then((res)=>{
                        console.log(res)
                        if(res.data.status==200){
                           this.$message({
                               type: 'success',
                               message: this.$t('druginfo.drsuccess'),
                            });
                          var medicineId=res.data.data.id
                          sessionStorage.setItem("medicineId",medicineId)
                          this.option()
                        }
                      })
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: this.$t('druginfo.drdeaft')
                    }); 
                });  
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          Form() { 
             this.$router.push({path:"/substance"})
          },
          option(){
            var url=this.global.url+"/projectMedicines/selectProjectMedicines?caseId="+this.caseId;
        this.$axios.get(url).then((res)=>{
          console.log(res)
          if(res.data.status==200){
            this.options=res.data.data
          }else{
            this.$message.error(this.$t('druginfo.drerro')); 
          }
        })
          },
// ------------------------------------------修改
    
			// 新建药物信息
			newcase(){
              this.ss=false
              this.info=false
              this.mains=true
              this.firId=""
			        this.resetForm('ruleForm')
			        console.log(this.caseId)
			    },
			     submit(formName) {
			      this.$refs[formName].validate((valid) => {
			        if (valid) {
			           this.$confirm(this.$t('druginfo.drcreate'), this.$t('druginfo.drtishi'), {
			              confirmButtonText: this.$t('druginfo.dryes'),
			              cancelButtonText: this.$t('druginfo.drno'),
			              type: 'warning'
			          }).then(() => {
			      //   点击确认后向服务器传参
			      var url=this.global.url+"/projectMedicines/addProjectMedicines?"
			      var postData=this.qs.stringify({
			          caseId:this.caseId,
			          mpidNumber:this.ruleForm.mpidNumber,
			          mpid:this.ruleForm.mpid,
			          phpidNumber:this.ruleForm.phpidNumber,
			          phpid:this.ruleForm.phpid,
			          name:this.ruleForm.name,
			          confirm:this.ruleForm.confirm,
			          product:this.ruleForm.product,
			          listedNumber:this.ruleForm.listedNumber,
			          listedCountry:this.ruleForm.listedCountry,
			          holder:this.ruleForm.holder,
			          holderAddress:this.ruleForm.holderAddress,
			          feature:this.ruleForm.feature,
			          doseCount:this.ruleForm.doseCount,
			          doseUnit:this.ruleForm.doseUnit,
			          pregnancyCount:this.ruleForm.pregnancyCount,
			          pregnancyUnit:this.ruleForm.pregnancyUnit,
			          measures:this.ruleForm.measures,
			          indicationName:this.ruleForm.indicationName,
			          others:this.ruleForm.others,
			      })
			      this.$axios.post(url+postData).then((res)=>{
			        console.log(res)
			        if(res.data.status==200){
                  // this.$router.go(0)
                  var medicineId=res.data.data.id
                   sessionStorage.setItem("medicineId",medicineId)
                 this.$router.push({path:"/substance",query:{ncs:1}})
			        }
			      })
			          }).catch(() => {
			              this.$message({
			              type: 'info',
			              message: this.$t('druginfo.drdeaft')
			              }); 
			          });
			        } else {
			          console.log('error submit!!');
			          return false;
			        }
			      });
			    },
			    hand(){
			      console.log(this.medicinesId)
			      var url=this.global.url+"/projectMedicines/selectProjectMedicinesById?medicinesId="+this.medicinesId;
			      this.$axios.get(url).then((res)=>{
			        console.log(res)
			        if(res.data.status==200){
                this.ruleForm=res.data.data
                this.id=res.data.data.id
                    var medicineId=res.data.data.id
                console.log(medicineId)
                sessionStorage.setItem("medicineId",medicineId)
			        }
			      })
			    },
					// 删除事件
					handleDelete(){
                this.save=false;
                if(this.firId===this.id){
                  this.$message.error("此药物信息不可删除！")
                }else{
                    this.$confirm(this.$t('druginfo.drdelete'), this.$t('druginfo.drtishi'), {
                        confirmButtonText: this.$t('druginfo.drdeyes'),
                                  cancelButtonText: this.$t('druginfo.drno'),
                                  type: 'warning'
                              }).then(() => {
                                this.$message({
                                  type: 'success',
                                      message: this.$t('druginfo.drsuccess1'),
                                  })   
							  var url=this.global.url+"/projectMedicines/delete?projectMedicinesId="+this.id
							  this.$axios.delete(url).then((res)=>{
							      if(res.data.status==200){
                                  this.get()
                              }
                          })
                            }).catch(() => {
                                      this.$message({
                                      type: 'info',
                                      message: this.$t('druginfo.drdeaft1')
                                      }); 
							            });  
                }
                     
					},
      get(){
        sessionStorage.removeItem("medicineIncidentId")
        if(this.$store.state.lock=="3"){
           this.lock=false
         }
        this.save=false;
        var url=this.global.url+"/projectMedicines/selectProjectMedicines?caseId="+this.caseId;
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
            this.firId=res.data.data[0].id
            this.medicinesId=res.data.data[0].name
						this.options=res.data.data
            var medicineId=res.data.data[0].id
            sessionStorage.setItem("medicineId",medicineId)
             }else{
               this.sc=true
               this.info=false
               this.mains=true
              this.ruleForm=res.data.data[0]
               this.firId=res.data.data[0].id
              this.id=res.data.data[0].id
              this.options=res.data.data
              this.medicinesId=res.data.data[0].name
              var medicineId=res.data.data[0].id
              sessionStorage.setItem("medicineId",medicineId)
             }
           
          }else{
            this.$message.error(this.$t('druginfo.drerro')); 
          }
        })
      },
      //修改信息
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('druginfo.drre'), this.$t('druginfo.drtishi'), {
                confirmButtonText: this.$t('druginfo.dryes'),
                cancelButtonText: this.$t('druginfo.drno'),
                type: 'warning'
            }).then(() => {
             
        //   点击确认后向服务器传参
            var url=this.global.url+"/projectMedicines/update?"
            var postData=this.qs.stringify({
                 id:this.id,
                  mpidNumber:this.ruleForm.mpidNumber,
			          mpid:this.ruleForm.mpid,
			          phpidNumber:this.ruleForm.phpidNumber,
			          phpid:this.ruleForm.phpid,
			          name:this.ruleForm.name,
			          confirm:this.ruleForm.confirm,
			          product:this.ruleForm.product,
			          listedNumber:this.ruleForm.listedNumber,
			          listedCountry:this.ruleForm.listedCountry,
			          holder:this.ruleForm.holder,
			          holderAddress:this.ruleForm.holderAddress,
			          feature:this.ruleForm.feature,
			          doseCount:this.ruleForm.doseCount,
			          doseUnit:this.ruleForm.doseUnit,
			          pregnancyCount:this.ruleForm.pregnancyCount,
			          pregnancyUnit:this.ruleForm.pregnancyUnit,
			          measures:this.ruleForm.measures,
			          indicationName:this.ruleForm.indicationName,
			          others:this.ruleForm.others,

            })
            this.$axios.post(url+postData).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                  this.$message({
                      type: 'success',
                      message: this.$t('druginfo.drsuccess'),
                 });
                this.option()
              }
            })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('druginfo.drdeaft')
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
        this.caseId=sessionStorage.getItem("caseId")
        this.get()
      }else{
        var caseId=sessionStorage.getItem("caseId")
        if(caseId==undefined){
               this.$message({
              showClose: true,
              message: this.$t('druginfo.drfirst'),
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
  width: 250px;
  margin: 0 30px 0 100px;
}
.lii{ text-align: center;
  color:#838ab6;
      line-height: 30px;
      width:30px;border: 1px solid #ececff;
      height:30px;}
</style>



    
