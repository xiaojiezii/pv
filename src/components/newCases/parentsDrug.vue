<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('ptsdrug.ptdrug')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
         <div  style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;">
           <div v-show="!save && lock" style="float:left">
               <el-button type="primary" @click="newcase" style="width:200px" >{{$t('ptsdrug.ptnew')}}</el-button>
           </div>
           <span>{{$t('ptsdrug.ptdrug')}}</span>
           <div style="float:right">
                 <el-select v-model="parentMedicineId" @change="hand" :placeholder="$t('btn.selectother')">
                   <el-option
                     v-for="item in options"
                     :key="item.id"
                     :label="item.medicineName"
                     :value="item.id">
                   </el-option>
                 </el-select>
           </div>
         </div>
           <el-form v-show="mains" :model="ruleForm" ref="ruleForm" label-width="450px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item :label="$t('ptsdrug.ptmedicineName')" prop="medicineName">
                    <el-input v-model="ruleForm.medicineName" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.G1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('ptsdrug.ptmpidNunber')" prop="mpidNunber">
                    <el-input v-model="ruleForm.mpidNunber" class="ipts" :placeholder="$t('btn.enterno')"></el-input>
                    <el-tooltip :content="$t('tishi.G2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('ptsdrug.ptmpidMedicine')" prop="mpidMedicine">
                    <el-input v-model="ruleForm.mpidMedicine" class="ipts" :placeholder="$t('btn.enterMPID')"></el-input>
                    <el-tooltip :content="$t('tishi.G3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('ptsdrug.ptphpidNumber')" prop="phpidNumber">
                    <el-input v-model="ruleForm.phpidNumber" class="ipts" :placeholder="$t('btn.enterno')"></el-input>
                    <el-tooltip :content="$t('tishi.G4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('ptsdrug.ptphpidPreparation')" prop="phpidPreparation">
                    <el-input v-model="ruleForm.phpidPreparation" class="ipts" :placeholder="$t('btn.enterPhPID')"></el-input>
                    <el-tooltip :content="$t('tishi.G5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
   <!-- 创建 -->
                <el-form-item :label="$t('ptsdrug.ptstartDate')" prop="startDate" v-if="save">
                    <el-date-picker class="ipts" v-model="ruleForm.startDate"
                      value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                    :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.G6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
    <!-- 修改 -->
                <el-form-item :label="$t('ptsdrug.ptstartDate')" prop="startDate" v-else v-show="ss">
                    <el-date-picker class="ipts" v-model="ruleForm.startDate"    :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.G6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
								<!-- 新增 -->
								<el-form-item :label="$t('ptsdrug.ptstartDate')" prop="startDate" v-show="!ss">
								    <el-date-picker style="width:250px;" 
										value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
										v-model="ruleForm.startDate"  class="ipts"  :placeholder="$t('btn.entime')"></el-date-picker>
								    <el-tooltip :content="$t('tishi.G6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
								</el-form-item>
       <!-- 创建 -->
                <el-form-item :label="$t('ptsdrug.ptendDate')" prop="endDate" v-if="save">
                    <el-date-picker class="ipts" v-model="ruleForm.endDate" 
                     value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                     :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.G7')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
        <!-- 修改 -->
                <el-form-item :label="$t('ptsdrug.ptendDate')" prop="endDate" v-else v-show="ss">
                    <el-date-picker class="ipts" v-model="ruleForm.endDate"  :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.G7')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <!-- 新增 -->
								<el-form-item :label="$t('ptsdrug.ptendDate')" prop="endDate" v-show="!ss">
								    <el-date-picker class="ipts"
										 value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
										 v-model="ruleForm.endDate"  :placeholder="$t('btn.entime')"></el-date-picker>
								    <el-tooltip :content="$t('tishi.G7')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
								</el-form-item>
									<!-- 保存按钮 -->
                <el-form-item style="margin:30px 0 0 50px;" v-if="save">
                  <el-button type="primary" @click="mitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                  <el-button type="success" @click="submitForm('ruleForm')">{{$t('project.ch')}}</el-button>
                  <el-button @click="Form('ruleForm')">{{$t('btn.next')}}</el-button>
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
        parId:'',//创建事件父母Id
        info:false,
        mains:true,
        save:true,
				ss:true,
        sc:true,
        id:"",
        ruleForm: {
          medicineName:'',
          mpidNunber:'',
          mpidMedicine:'',
          phpidNumber:'',
          phpidPreparation:'',
          startDate: '',
          endDate:'',
        },
        // rules: {
        //   name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        // }
				options: [],
				 parentMedicineId:""
      };
	
    },
    methods: {
        mitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$confirm(this.$t('ptsdise.ptre'), this.$t('ptsdise.pttishi'), {
                    confirmButtonText: this.$t('ptsdise.ptyes'),
                    cancelButtonText: this.$t('ptsdise.ptno'),
                    type: 'warning'
                }).then(() => {
                  
            //   点击确认后向服务器传参
                var url=this.global.url+"/parentMedicine/addParentMedicine?";
                var postDate=this.qs.stringify({
                     parentId:this.parId,
                      medicineName:this.ruleForm.medicineName,
                      mpidNunber:this.ruleForm.mpidNunber,
                      mpidMedicine:this.ruleForm.mpidMedicine,
                      phpidNumber:this.ruleForm.phpidNumber,
                      phpidPreparation:this.ruleForm.phpidPreparation,
                      startDate: this.ruleForm.startDate,
                      endDate:this.ruleForm.endDate,
                })
                this.$axios.post(url+postDate).then((res)=>{
                  console.log(res)
                  if(res.data.status==200){
                         this.$message({
                             type: 'success',
                             message: this.$t('ptsdise.ptsuccess'),
                          });
                          this.option()
                    
                  }else{
                    this.$message.error(this.$t('ptsdise.pterro'));
                    
                  }
                })
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: this.$t('ptsdise.ptdeaft')
                    }); 
                });  
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          Form(formName) {
            this.$router.push({path:"/deadinfo"})
          },

  // 搜索框中数据
    option(){
         var url=this.global.url+"/parentMedicine/selectParentMedicine?parentId="+this.parId;
         this.$axios.get(url).then((res)=>{
           if(res.data.status==200){
             this.options=res.data.data
           }else{
             this.$message.error(this.$t('ptsdise.pterro'))
           }
         })
    },


// --------------------------------------------修改------------------------------
     
			// 新建药史
			newcase(){
              this.ss=false
              this.info=false,
              this.mains=true
			        this.resetForm('ruleForm')
			        console.log(this.parId)
			    },
			     submit(formName) {
			      this.$refs[formName].validate((valid) => {
			        if (valid) {
			           this.$confirm(this.$t('ptsdise.ptre'), this.$t('ptsdise.pttishi'), {
			              confirmButtonText: this.$t('ptsdise.ptyes'),
			              cancelButtonText: this.$t('ptsdise.ptno'),
			              type: 'warning'
			          }).then(() => {
			      //   点击确认后向服务器传参
			      var url=this.global.url+"/parentMedicine/addParentMedicine?"
			      var postData=this.qs.stringify({
			           parentId:this.parId,
			           medicineName:this.ruleForm.medicineName,
			           mpidNunber:this.ruleForm.mpidNunber,
			           mpidMedicine:this.ruleForm.mpidMedicine,
			           phpidNumber:this.ruleForm.phpidNumber,
			           phpidPreparation:this.ruleForm.phpidPreparation,
			           startDate: this.ruleForm.startDate,
			           endDate:this.ruleForm.endDate,
			      })
			      this.$axios.post(url+postData).then((res)=>{
			        console.log(res)
			        if(res.data.status==200){
			             this.$message({
                      type: 'success',
                      message: this.$t('ptsdise.ptsuccess'),
                    });
                  this.get()
			        }
			      })
			          }).catch(() => {
			              this.$message({
			              type: 'info',
			              message: this.$t('ptsdise.ptdeaft')
			              }); 
			          });
			        } else {
			          console.log('error submit!!');
			          return false;
			        }
			      });
			    },
			    hand(){
			      var url=this.global.url+"/parentMedicine/selectParentMedicineById?parentMedicineId="+this.parentMedicineId;
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
							           this.$confirm(this.$t('ptsdise.ptdelete'), this.$t('ptsdise.pttishi'), {
                           confirmButtonText: this.$t('ptsdise.ptdeyes'),
							                       cancelButtonText: this.$t('ptsdise.ptno'),
							                       type: 'warning'
							                   }).then(() => {
                                   this.$message({
                                     type: 'success',
							                           message: this.$t('ptsdise.ptsuccess1'),
							                       })   
							  var url=this.global.url+"/parentMedicine/delete?parentMedicineId="+this.id
							  this.$axios.delete(url).then((res)=>{
							      if(res.data.status==200){
							                       this.get()
                                  }
                              })
							                  }).catch(() => {
							                           this.$message({
							                           type: 'info',
							                           message: this.$t('ptsdise.ptdeaft1')
							                           }); 
							            });  
					},
      get(){
        if(sessionStorage.getItem("lock")==3){
           this.lock=false
         }
         this.save=false;
         var url=this.global.url+"/parentMedicine/selectParentMedicine?parentId="+this.parId;
         this.$axios.get(url).then((res)=>{
           console.log(res)
           if(res.data.status==200){
              if(res.data.data.length==0){
                this.info=true
                this.mains=false
              }else if(res.data.data.length==1){
                this.info=false,
                this.mains=true
                this.sc=false
                this.ruleForm=res.data.data[0]
                this.id=res.data.data[0].id
                this.parentMedicineId=res.data.data[0].medicineName
                this.options=res.data.data
              }else{
                this.info=false,
                this.mains=true
                this.sc=true
                this.ss=true
                this.ruleForm=res.data.data[0]
                this.id=res.data.data[0].id
                this.parentMedicineId=res.data.data[0].medicineName
                this.options=res.data.data
              }
        
           }else{
             this.$message.error(this.$t('ptsdise.pterro'))
           }
         })
      },
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('ptsdise.ptre'), this.$t('ptsdise.pttishi'), {
                confirmButtonText: this.$t('ptsdise.ptyes'),
                cancelButtonText: this.$t('ptsdise.ptno'),
                type: 'warning'
            }).then(() => {
        //   点击确认后向服务器传参
              if(this.ruleForm.startDate==""){
                var time=""
              }else{
                  var date = new Date(this.ruleForm.startDate);  
                  var time=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ; 
                  if(time=="1970-1-1"){time=""}
              }
              if(this.ruleForm.endDate==""){
                var time1=""
              }else{
                 var date1 = new Date(this.ruleForm.endDate);  
                  var time1=date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate() ; 
                  if(time1=="1970-1-1"){time1=""}
              }
                 
                  var url=this.global.url+"/parentMedicine/update?"
                  var  postData=this.qs.stringify({
                        id:this.id,
                          medicineName:this.ruleForm.medicineName,
                          mpidNunber:this.ruleForm.mpidNunber,
                          mpidMedicine:this.ruleForm.mpidMedicine,
                          phpidNumber:this.ruleForm.phpidNumber,
                          phpidPreparation:this.ruleForm.phpidPreparation,
                          startDate: time,
                          endDate:time1,
                  })
                  this.$axios.post(url+postData).then((res)=>{
                    if(res.data.status==200){
                         this.$message({
                            type: 'success',
                            message: this.$t('ptsdise.ptsuccess2'),
                          });
                          this.option()
                      // this.$router.go(0)
                    }else{
                      this.$message.error(this.$t('ptsdise.pterro1'))
                    }
                  })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('ptsdise.ptdeaft')
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
         var parId=sessionStorage.getItem("parentId")
         if(parId==undefined){
           this.$message({
              showClose: true,
              message: this.$t('ptsdise.ptfirst'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/ptsInfo"})
            },1000)
         }else{
           this.parId=parId
         }
         this.get();
       }else{
           var par=sessionStorage.getItem("parentId")
           var cas=sessionStorage.getItem("caseId")
           if(cas==undefined){
             this.$message({
              showClose: true,
              message: this.$t('ptsdise.ptsecond'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/details"})
            },2000)
           }else if(par==undefined){
             this.$message({
              showClose: true,
              message: this.$t('ptsdise.ptthird'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/ptsInfo"})
            },2000)
           }else{
              this.parId=sessionStorage.getItem("parentId")
            console.log(this.parentId)
            this.option();
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



