<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('evalua.evevalua')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;">
             <div v-show="!save && lock" style="float:left">
                 <el-button type="primary" @click="newcase" style="width:170px" >{{$t('evalua.evnew')}}</el-button>
             </div>
             <span>{{$t('evalua.evevalua')}}</span>
             <div style="float:right">
                   <el-select v-model="medicineIncidentAssessId" @change="hand" :placeholder="$t('btn.selectother')">
                     <el-option
                       v-for="item in options"
                       :key="item.id"
                       :label="item.source"
                       :value="item.id">
                     </el-option>
                   </el-select>
             </div>
           </div>
           <el-form v-show="mains" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="450px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item :label="$t('evalua.evsource')" prop="source">
                    <el-input v-model="ruleForm.source" class="ipts" :placeholder="$t('evalua.eventer')"></el-input>
                    <el-tooltip :content="$t('tishi.O1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('evalua.evmethod')" prop="method">
                    <el-input v-model="ruleForm.method" class="ipts" :placeholder="$t('evalua.eventermethod')"></el-input>
                    <el-tooltip :content="$t('tishi.O2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('evalua.evresult')" prop="result">
                    <el-input v-model="ruleForm.result" class="ipts" :placeholder="$t('evalua.eventerresult')"></el-input>
                    <el-tooltip :content="$t('tishi.O3')" placement="right-start" effect="light">
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
import { truncate } from 'fs';
export default {
    data() {
      return {
        lock:true,
        ncs:"",
        save:true,
        info:false,
        mains:true,
				ss:true,
        sc:true,
        id:"",
        medicineIncidentId:"",
        medicineId:"",
        ruleForm: {
          result:'',
          method:'',
          source:'',
        },
        rules: {
          source: [{ required: true, message: '请输入来源或无', trigger: 'blur' }],
        },
				options: [],
				 medicineIncidentAssessId:""
      };
    },
    methods: {
        mitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$confirm(this.$t('evalua.evre'), this.$t('evalua.evtishi'), {
                  confirmButtonText: this.$t('evalua.evyes'),
                  cancelButtonText: this.$t('evalua.evno'),
                  type: 'warning'
              }).then(() => {
                 
          //   点击确认后向服务器传参
              var url=this.global.url+"/medicinesIncidentAssess/addMedicinesIncidentAssess?"
              var postData=this.qs.stringify({
                    medicineIncidentId:this.medicineIncidentId,
                    result:this.ruleForm.result,
                    method:this.ruleForm.method,
                    source:this.ruleForm.source,
              })
              console.log(postData)
              this.$axios.post(url+postData).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                     this.$message({
                        type: 'success',
                        message: this.$t('evalua.evsuccess'),
                      });
                      this.option()
                }
              })
              }).catch(() => {
                  this.$message({
                  type: 'info',
                  message: this.$t('evalua.evdeaft')
                  }); 
              });  
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        Form(fomName) { 
          this.$router.push({path:"/otherinfo"})
        },
        option(){
           var url=this.global.url+"/medicinesIncidentAssess/selectMedicinesIncidentAssess?medicineIncidentId="+this.medicineIncidentId;
        this.$axios.get(url).then((res)=>{
          console.log(res)
          if(res.data.status==200){
           this.options=res.data.data
          }else{
            this.$message.error(this.$t('evalua.everro'));  
          }
         })
        },





// --------------------------------------修改
			newcase(){
              this.ss=false
              this.info=false
              this.mains=true
			        this.resetForm('ruleForm')
			        console.log(this.medicineIncidentId)
			    },
			     submit(formName) {
			      this.$refs[formName].validate((valid) => {
			        if (valid) {
			           this.$confirm(this.$t('evalua.evre'), this.$t('evalua.evtishi'), {
			              confirmButtonText: this.$t('evalua.evyes'),
			              cancelButtonText: this.$t('evalua.evno'),
			              type: 'warning'
			          }).then(() => {
			      //   点击确认后向服务器传参
			      var url=this.global.url+"/medicinesIncidentAssess/addMedicinesIncidentAssess?"
			      var postData=this.qs.stringify({
			           medicineIncidentId:this.medicineIncidentId,
			           result:this.ruleForm.result,
			           method:this.ruleForm.method,
			           source:this.ruleForm.source,
			      })
			      this.$axios.post(url+postData).then((res)=>{
			        console.log(res)
			        if(res.data.status==200){
			            if(this.ncs==1){
                    this.$router.push({path:"/otherinfo",query:{ncs:1}})
                  }else if(this.ncs==2){
                     this.$router.push({path:"/model"})
                  }else{
                    // this.$router.go(0)
                     this.$message({
                        type: 'success',
                        message: this.$t('evalua.evsuccess'),
                      });
                     this.get()
                  }     
	             }
			      })
			          }).catch(() => {
			              this.$message({
			              type: 'info',
			              message: this.$t('evalua.evdeaft')
			              }); 
			          });
			        } else {
			          console.log('error submit!!');
			          return false;
			        }
			      });
          },

			    hand(){
			      console.log(this.medicineDoseId)
			      var url=this.global.url+"/medicinesIncidentAssess/selectMedicinesIncidentAssessById?medicineIncidentAssessId="+this.medicineIncidentAssessId;
			      this.$axios.get(url).then((res)=>{
			        console.log(res)
			        if(res.data.status==200){
                this.ruleForm=res.data.data
                this.id=res.data.data.id
			        }
			      })
			    },
					// 删除事件
					handleDelete(){
							  this.save=false;
							           this.$confirm(this.$t('evalua.evdelete'), this.$t('evalua.evtishi'), {
                           confirmButtonText: this.$t('evalua.evdeyes'),
							                       cancelButtonText: this.$t('evalua.evno'),
							                       type: 'warning'
							                   }).then(() => {
                                   this.$message({
                                     type: 'success',
							                           message: this.$t('evalua.evsuccess1'),
							                       })   
							  var url=this.global.url+"/medicinesIncidentAssess/delete?medicinesIncidentAssessId="+this.id
							  this.$axios.delete(url).then((res)=>{
							      if(res.data.status==200){
							                       this.get()
                                  }
                              })
							                  }).catch(() => {
							                           this.$message({
							                           type: 'info',
							                           message: this.$t('evalua.evdeaft1')
							                           }); 
							            });  
					},
      get(){
        if(this.$store.state.lock=="3"){
           this.lock=false
         }
        this.save=false
        var url=this.global.url+"/medicinesIncidentAssess/selectMedicinesIncidentAssess?medicineIncidentId="+this.medicineIncidentId;
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
            this.medicineIncidentAssessId=res.data.data[0].source
						this.options=res.data.data
            }else{
               this.sc=true
               this.ss=true
              this.info=false
              this.mains=true
                 this.ruleForm=res.data.data[0]
            this.id=res.data.data[0].id
            this.medicineIncidentAssessId=res.data.data[0].source
						this.options=res.data.data
            }
         
          }else{
            this.$message.error(this.$t('evalua.everro'));
            
          }
        })
      },
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('evalua.evre'), this.$t('evalua.evtishi'), {
                confirmButtonText: this.$t('evalua.evyes'),
                cancelButtonText: this.$t('evalua.evno'),
                type: 'warning'
            }).then(() => {
              
        //   点击确认后向服务器传参
          var url=this.global.url+"/medicinesIncidentAssess/update?"
            var postData=this.qs.stringify({
                  id:this.id,   
                  result:this.ruleForm.result,
			           method:this.ruleForm.method,
			           source:this.ruleForm.source,   
              })
            this.$axios.post(url+postData).then((res)=>{
              if(res.data.status==200){
                    this.$message({
                      type: 'success',
                      message: this.$t('evalua.evsuccess2'),
                    });
                this.option()
              }else{
                this.$message.error(this.$t('evalua.everro1'))
              }
            })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('evalua.evdeaft')
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
        var medinId=sessionStorage.getItem("medicineIncidentId")
        if(medinId==undefined){
           this.$message({
              showClose: true,
              message: this.$t('evalua.evfirst'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/model"})
            },2000)
        }else{
          this.medicineIncidentId=medinId
        }
         this.ncs=this.$route.query.ncs;
         if(this.ncs==1){
               this.save=false
               this.ss=false
            }else if(this.ncs==2){
                 this.save=false
               this.ss=false
            }else{
              this.get()
            }
        }else{
          var medicineId=sessionStorage.getItem("medicineIncidentId")
          var med=sessionStorage.getItem("medicineId")
          var cas=sessionStorage.getItem("caseId")
         if(cas==undefined){
             this.$message({
              showClose: true,
              message: this.$t('evalua.evsecond'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/details"})
            },2000)
           }else if(med==undefined){
             this.$message({
              showClose: true,
              message: this.$t('evalua.evthird'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/druginfo"})
            },2000)
           }else if(medicineId==undefined){
              this.$message({
              showClose: true,
              message: this.$t('evalua.evfirst'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/model"})
            },2000)
           } else{
              this.medicineIncidentId=sessionStorage.getItem("medicineIncidentId")
            console.log(this.medicineIncidentId)
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



    