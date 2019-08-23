<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i>{{$t('adapt.adadapt')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
       
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;">
             <div v-show="!save && lock" style="float:left">
                 <el-button type="primary" @click="newcase" style="width:180px" >{{$t('adapt.adnew')}}</el-button>
             </div>
             <span>{{$t('adapt.adadapt')}}</span>
             <div style="float:right">
                   <el-select v-model="medicineIndicationId" @change="hand" :placeholder="$t('btn.selectother')">
                     <el-option
                       v-for="item in options"
                       :key="item.id"
                       :label="item.indication"
                       :value="item.id">
                     </el-option>
                   </el-select>
             </div>
           </div>
           <el-form v-show="mains" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="450px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item :label="$t('adapt.adindication')" prop="indication">
                    <el-input v-model="ruleForm.indication" class="ipts"  @keyup.enter.native="queryAdminRole" :placeholder="$t('btn.enter')"></el-input>
                   <el-button type="primary" @click="search" icon="el-icon-search" circle title="点击搜索"></el-button>
                </el-form-item>
                <el-form-item :label="$t('adapt.admeddraVersion')" prop="meddraVersion">
                    <el-input v-model="ruleForm.meddraVersion" class="ipts" :disabled="true" :placeholder="$t('adapt.adenter')"></el-input>
                    <el-tooltip :content="$t('tishi.M1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('adapt.admeddraNum')" prop="meddraNum">
                    <el-input v-model="ruleForm.meddraNum" class="ipts" :disabled="true" :placeholder="$t('adapt.adentername')"></el-input>
                    <el-tooltip :content="$t('tishi.M2')" placement="right-start" effect="light">
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
           <pjc-dialog :event="pjcDialog" @closeTagDialog="closeTagDialog" @hand="fn($event)" :name="ruleForm.indication">
       </pjc-dialog>
    </div>
</template>
<script>
import pjcDialog from "../newCases/pjc.dialog"
export default {
    data() {
      return {
        lock:true,
        pjcDialog:false,
        ncs:'',
        id:"",
        mains:true,
        info:false,
        medicineId:"",
        save:true,
				ss:true,
				sc:true,
        ruleForm: {
          meddraNum:'',
          meddraVersion:'18.1',
          indication:'',
        },
        rules: {
          indication: [{ required: true, message: '请输入姓名或无', trigger: 'blur' }],
        },
				options: [],
				 medicineIndicationId:""
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
            this.ruleForm.meddraNum=msg.id
            this.ruleForm.indication=msg.name
        },
  // 创建新信息
      mitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('adapt.adre'), this.$t('adapt.adtishi'), {
                confirmButtonText: this.$t('adapt.adyes'),
                cancelButtonText: this.$t('adapt.adno'),
                type: 'warning'
            }).then(() => {
           
        //   点击确认后向服务器传参
              var url=this.global.url+"/medicinesIndication/addMedicinesIndication?";
              var postData=this.qs.stringify({
                   medicineId:this.medicineId,
                    meddraNum:this.ruleForm.meddraNum,
                    meddraVersion:this.ruleForm.meddraVersion,
                    indication:this.ruleForm.indication,
              })
              this.$axios.post(url+postData).then((res)=>{
                if(res.data.status=200){
                     this.$message({
                        type: 'success',
                        message: this.$t('adapt.adsuccess'),
                      });
                      this.option()
                }
              })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('adapt.addeaft')
                }); 
            });  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      Form() { 
          this.$router.push({path:"/model"})
      },
      option(){
         var url=this.global.url+"/medicinesIndication/selectMedicinesIndication?medicineId="+this.medicineId;
        this.$axios.get(url).then((res)=>{
          if(res.data.status==200){
           this.options=res.data.data
          }else{
            this.$message.error(this.$t('adapt.aderror'))
          }
        })
      },
			// 新建适应症信息
			newcase(){
              this.ss=false
              this.info=false
              this.mains=true
			        this.resetForm('ruleForm')
			        console.log(this.medicineId)
          },
// 在详情界面新创建内容
			     submit(formName) {
			      this.$refs[formName].validate((valid) => {
			        if (valid) {
			           this.$confirm(this.$t('adapt.adre'), this.$t('adapt.adtishi'), {
			              confirmButtonText: this.$t('adapt.adyes'),
			              cancelButtonText: this.$t('adapt.adno'),
			              type: 'warning'
			          }).then(() => {
			      //   点击确认后向服务器传参
			      var url=this.global.url+"/medicinesIndication/addMedicinesIndication?"
			      var postData=this.qs.stringify({
			           medicineId:this.medicineId,
			            meddraNum:this.ruleForm.meddraNum,
			            meddraVersion:this.ruleForm.meddraVersion,
			            indication:this.ruleForm.indication,
			      })
			      this.$axios.post(url+postData).then((res)=>{
			        console.log(res)
			        if(res.data.status==200){
			            if(this.ncs==1){
                    this.$router.push({path:"/model",query:{ncs:1}})
                  }else{
                    //  this.$router.go(0)
                     this.$message({
                        type: 'success',
                        message: this.$t('adapt.adsuccess'),
                      });
                      this.get()
                  }      
			        }
			      })
			          }).catch(() => {
			              this.$message({
			              type: 'info',
			              message: this.$t('adapt.addeaft')
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
			      var url=this.global.url+"/medicinesIndication/selectMedicinesIndicationById?medicineIndicationId="+this.medicineIndicationId;
			      this.$axios.get(url).then((res)=>{
			        console.log(res)
			        if(res.data.status==200){
                this.ruleForm=res.data.data
                this.id=res.data.data.id
                console.log(this.id)
			        }
			      })
			    },
					// 删除事件
					handleDelete(){
							  this.save=false;
                      this.$confirm(this.$t('adapt.addelete'), this.$t('adapt.adtishi'), {
                        confirmButtonText: this.$t('adapt.addeyes'),
							                       cancelButtonText: this.$t('adapt.adno'),
							                       type: 'warning'
							                   }).then(() => {
                                   this.$message({
                                     type: 'success',
							                           message: this.$t('adapt.adsuccess1'),
							                       })   
							  var url=this.global.url+"/medicinesIndication/delete?medicinesIndicationId="+this.id
							    this.$axios.delete(url).then((res)=>{
                   if(res.data.status==200){
							                       this.get()
                                  }
                                  })
							                  }).catch(() => {
							                           this.$message({
							                           type: 'info',
							                           message: this.$t('adapt.addeaft1')
							                           }); 
							            });  
					},
      get(){
        if(sessionStorage.getItem("lock")==3){
           this.lock=false
         }
        this.save=false
        var url=this.global.url+"/medicinesIndication/selectMedicinesIndication?medicineId="+this.medicineId;
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
            this.medicineIndicationId=res.data.data[0].indication
						this.options=res.data.data
            }else{
               this.sc=true
               this.ss=true
              this.info=false
              this.mains=true
                this.ruleForm=res.data.data[0]
            this.id=res.data.data[0].id
            this.medicineIndicationId=res.data.data[0].indication
						this.options=res.data.data
            }
          
          }
        })
      },
// 修改信息
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('adapt.adre'), this.$t('adapt.adtishi'), {
                confirmButtonText: this.$t('adapt.adyes'),
                cancelButtonText: this.$t('adapt.adno'),
                type: 'warning'
            }).then(() => {
        
        //   点击确认后向服务器传参
            var url=this.global.url+"/medicinesIndication/update?"
                  var  postData=this.qs.stringify({
                        id:this.id,
                        meddraNum:this.ruleForm.meddraNum,
                        meddraVersion:this.ruleForm.meddraVersion,
                        indication:this.ruleForm.indication,
                  })
                  this.$axios.post(url+postData).then((res)=>{
                    if(res.data.status==200){
                         this.$message({
                            type: 'success',
                            message: this.$t('adapt.adsuccess2'),
                          });
                      this.option()
                    }else{
                      this.$message.error(this.$t('adapt.aderro'))
                    }
                  })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('adapt.addeaft')
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
         var medId=sessionStorage.getItem("medicineId")
            if(medId==undefined){
               this.$message({
              showClose: true,
              message: this.$t('adapt.adfirst'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/druginfo"})
            },1000)
            }else{
              this.medicineId=medId
            }
           this.ncs=this.$route.query.ncs;
           if(this.ncs==1){
               this.save=false
               this.ss=false
            }else{
               this.get();
            }
      }else{
       var med=sessionStorage.getItem("medicineId")
        var cas=sessionStorage.getItem("caseId")
         if(cas==undefined){
             this.$message({
              showClose: true,
              message: this.$t('adapt.adsecond'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/details"})
            },2000)
           }else if(med==undefined){
             this.$message({
              showClose: true,
              message: this.$t('adapt.adthird'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/druginfo"})
            },2000)
           }else{
              this.medicineId=sessionStorage.getItem("medicineId")
            console.log(this.medicineId)
            this.option()
           }
      }
    }
}
</script>
<style scoped>
 /* *{margin: 0;padding: 0;} */
.ipts{
  width:250px;margin: 0 30px 0 100px;
}
  .lii{ text-align: center;
  color:#838ab6;
      line-height: 30px;
      width:30px;border: 1px solid #ececff;
      height:30px;}
</style>



    