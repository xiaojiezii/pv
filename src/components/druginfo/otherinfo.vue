<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('other.otother')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
        
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;">
             <div v-show="!save && lock" style="float:left">
                 <el-button type="primary" @click="newcase" style="width:150px" >{{$t('other.otnew')}}</el-button>
             </div>
             <span>{{$t('other.otother')}}</span>
             <div style="float:right">
                   <el-select v-model="medicineOthersId" @change="hand" :placeholder="$t('btn.selectother')">
                     <el-option
                       v-for="item in options"
                       :key="item.id"
                       :label="item.others | other"
                       :value="item.id">
                     </el-option>
                   </el-select>
             </div>
           </div>
           <el-form v-show="mains" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="450px" style="margin-top:20px;" class="demo-ruleForm">
               
              <el-form-item :label="$t('other.otothers')" prop="others">
                    <el-select v-model="ruleForm.others" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('other.otothers1')" value="0"></el-option>
                       <el-option :label="$t('other.otothers2')" value="1"></el-option>
                       <el-option :label="$t('other.otothers3')" value="2"></el-option>                       
                       <el-option :label="$t('other.otothers4')" value="3"></el-option>
                       <el-option :label="$t('other.otothers5')" value="4"></el-option>                       
                       <el-option :label="$t('other.otothers6')" value="5"></el-option>                      
                       <el-option :label="$t('other.otothers7')" value="6"></el-option>
                       <el-option :label="$t('other.otothers8')" value="7"></el-option>                       
                       <el-option :label="$t('other.otothers9')" value="8"></el-option>
                       <el-option :label="$t('other.otothers10')" value="9"></el-option>                       
                       <el-option :label="$t('other.otothers11')" value="10"></el-option>                      
                       <el-option :label="$t('other.otothers12')" value="11"></el-option>                      
                                          
                    </el-select>
                    <el-tooltip :content="$t('tishi.P1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>


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
        ncs:"",
        mains:true,
        info:false,
        medicineId:"",
				ss:true,
        sc:true,
        id:'',
        save:true,
        ruleForm: {
          others:'',
        },
        rules: {
          others: [{ required: true, message: '请选择', trigger: 'blur' }],
        },
				options: [],
				 medicineOthersId:""
      };
    },
    filters:{
      other(val){
        if(val=="0"){
          return "无"
        }else if(val=="1"){
          return "假药"
        }else if(val=="2"){
          return "药物过量药物过量"
        }else if(val=="3"){
          return "父亲服用的药物"
        }else if(val=="4"){
          return "服用超过有效期的药物过"
        }else if(val=="5"){
          return "经检测合格的批次和批号"
        }else if(val=="6"){
          return "经检测不合格的批次和批号"
        }else if(val=="7"){
          return "用药错误"
        }else if(val=="8"){
          return "误用"
        }else if(val=="9"){
          return "滥用"
        }else if(val=="10"){
          return "职业暴漏"
        }else if(val=="11"){
          return "超说明书用药"
        }
      }
    },
    methods: {
  // 创建新的
      mitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('other.otre'), this.$t('other.ottishi'), {
                confirmButtonText: this.$t('other.otyes'),
                cancelButtonText: this.$t('other.otno'),
                type: 'warning'
            }).then(() => {
               
        //   点击确认后向服务器传参
        var url=this.global.url+"/medicinesOthers/addMedicinesOthers?";
        var postData=this.qs.stringify({
              medicineId:this.medicineId,
              others:this.ruleForm.others
        })
        this.$axios.post(url+postData).then((res)=>{
          if(res.data.status==200){
               this.$message({
                  type: 'success',
                  message: this.$t('other.otsuccess'),
                });
                this.option()
                
          }else{
            this.$message.error(this.$t('other.oterro'));
          }
        })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('other.otdeaft')
                }); 
            });  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      Form() { 
        this.$router.push({path:"/eventinfo"})
      },
      option(){
         var url=this.global.url+"/medicinesOthers/selectMedicinesOthers?medicineId="+this.medicineId;
        this.$axios.get(url).then((res)=>{
					console.log(res)
          if(res.data.status==200){
             this.options=res.data.data
          }else{
            this.$message.error(this.$t('other.oterro'))
          }
        })
      },


// ----------------------------------修改
     
			// 新建其他信息
			newcase(){
              this.ss=false
              this.info=false
              this.mains=true
			        this.resetForm('ruleForm')
			        console.log(this.medicineId)
			    },
			     submit(formName) {
			      this.$refs[formName].validate((valid) => {
			        if (valid) {
			           this.$confirm(this.$t('other.otre'), this.$t('other.ottishi'), {
			              confirmButtonText: this.$t('other.otyes'),
			              cancelButtonText: this.$t('other.otno'),
			              type: 'warning'
			          }).then(() => {
			      //   点击确认后向服务器传参
			      var url=this.global.url+"/medicinesOthers/addMedicinesOthers?"
			      var postData=this.qs.stringify({
			          medicineId:this.medicineId,
			          others:this.ruleForm.others
			      })
			      this.$axios.post(url+postData).then((res)=>{
			        console.log(res)
			        if(res.data.status==200){
			            if(this.ncs==1){
                    this.$router.push({path:"/druginfo"})
                  }else{
                    //  this.$router.go(0)
                     this.$message({
                        type: 'success',
                        message: this.$t('other.otsuccess'),
                      });
                      this.get()
                  }
			        }
			      })
			          }).catch(() => {
			              this.$message({
			              type: 'info',
			              message: this.$t('other.otdeaft')
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
			      var url=this.global.url+"/medicinesOthers/selectMedicinesOthersById?medicineOthersId="+this.medicineOthersId;
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
							           this.$confirm(this.$t('other.otdelete'), this.$t('other.ottishi'), {
                           confirmButtonText: this.$t('other.otdeyes'),
							                       cancelButtonText: this.$t('other.otno'),
							                       type: 'warning'
							                   }).then(() => {
                                   this.$message({
                                     type: 'success',
							                           message: this.$t('other.otsuccess1'),
							                       })   
							  var url=this.global.url+"/medicinesOthers/delete?medicinesOthersId="+this.id
							  this.$axios.delete(url).then((res)=>{
							      if(res.data.status==200){
							                       this.get()
                                  }
                              })
							                  }).catch(() => {
							                           this.$message({
							                           type: 'info',
							                           message: this.$t('other.otdeaft1')
							                           }); 
							            });  
					},
      get(){
        if(sessionStorage.getItem("lock")==3){
           this.lock=false
         }
        this.save=false;
        var url=this.global.url+"/medicinesOthers/selectMedicinesOthers?medicineId="+this.medicineId;
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
              this.medicineOthersId=res.data.data[0].id
						  this.options=res.data.data
            }else{
              this.sc=true
              this.ss=true
              this.info=false
              this.mains=true
              this.ruleForm=res.data.data[0]
              this.id=res.data.data[0].id
              this.medicineOthersId=res.data.data[0].id
						  this.options=res.data.data
            }
  
          }else{
            this.$message.error(this.$t('other.oterro'))
          }
        })
      },
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('other.otre'), this.$t('other.ottishi'), {
                confirmButtonText: this.$t('other.otyes'),
                cancelButtonText: this.$t('other.otno'),
                type: 'warning'
            }).then(() => {
                
        //   点击确认后向服务器传参
              var url=this.global.url+"/medicinesOthers/update?"
              var postData=this.qs.stringify({
                  id:this.id,   
                  others:this.ruleForm.others
              })
            this.$axios.post(url+postData).then((res)=>{
              if(res.data.status==200){
                    this.$message({
                      type: 'success',
                      message: this.$t('other.otsuccess2'),
                    });
                this.option()
              }else{
                this.$message.error(this.$t('other.oterro1'))
              }
             })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('other.otdeaft')
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
              message: this.$t('other.otfirst'),
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
              message: this.$t('other.otsecond'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/details"})
            },2000)
           }else if(med==undefined){
             this.$message({
              showClose: true,
              message: this.$t('other.otthird'),
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
  width:250px;
  margin: 0 30px 0 100px;
}
  .lii{ text-align: center;
  color:#838ab6;
      line-height: 30px;
      width:30px;border: 1px solid #ececff;
      height:30px;}
</style>



    