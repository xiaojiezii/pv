<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('substance.subsubstance')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
         
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;">
             <div v-show="!save && lock" style="float:left">
                 <el-button type="primary" @click="newcase" style="width:150px" >{{$t('substance.subnew')}}</el-button>
             </div>
             <span>{{$t('substance.subsubstance')}}</span>
             <div style="float:right">
                   <el-select v-model="medicineMatterId" @change="hand" :placeholder="$t('btn.selectother')">
                     <el-option
                       v-for="item in options"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
                     </el-option>
                   </el-select>
             </div>
           </div>
           <el-form v-show="mains" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="480px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item :label="$t('substance.subname')" prop="name">
                    <el-input v-model="ruleForm.name" class="ipts" :placeholder="$t('substance.entername')"></el-input>
                    <el-tooltip :content="$t('tishi.K1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('substance.subnum')" prop="num">
                    <el-input v-model="ruleForm.num" class="ipts" :placeholder="$t('substance.enterno')"></el-input>
                    <el-tooltip :content="$t('tishi.K2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('substance.submatter')" prop="matter">
                    <el-input v-model="ruleForm.matter" class="ipts" :placeholder="$t('substance.enterID')"></el-input>
                    <el-tooltip :content="$t('tishi.K3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('substance.subspecificationValue')" prop="specificationValue">
                    <el-input v-model="ruleForm.specificationValue" class="ipts" type="number" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.K4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('substance.subspecificationUnit')" prop="specificationUnit">
                    <el-input v-model="ruleForm.specificationUnit" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.K5')" placement="right-start" effect="light">
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
<!-- 在详情页面进行修改 -->
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
        info:false,
        mains:true,
        save:true,
				ss:true,
        sc:true,
        id:"",  //通过id修改信息
        medicineId:'',
        ruleForm: {
          name:'',
          num:'',
          matter:'',
          specificationValue:'',
          specificationUnit:'',
        },
        rules: {
          name: [{ required: true, message: '请输入名称或无', trigger: 'blur' }],
        },
				options: [],
				 medicineMatterId:""
      };
    },
    methods: {
    // 新建---------------------------------
        mitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$confirm(this.$t('substance.sure'), this.$t('substance.sutishi'), {
                    confirmButtonText: this.$t('substance.suyes'),
                    cancelButtonText: this.$t('substance.suno'),
                    type: 'warning'
                }).then(() => {                  
            //   点击确认后向服务器传参
                 var url=this.global.url+"/medicinesMatter/addMedicinesMatter?";
                 var postData=this.qs.stringify({
                      medicineId:this.medicineId,
                       name:this.ruleForm.name,
                        num:this.ruleForm.num,
                        matter:this.ruleForm.matter,
                        specificationValue:this.ruleForm.specificationValue,
                        specificationUnit:this.ruleForm.specificationUnit,
                 }) 
                 this.$axios.post(url+postData).then((res)=>{
                     console.log(res)
                     if(res.data.status==200){
                          this.$message({
                              type: 'success',
                              message: this.$t('substance.susuccess'),
                          });
                          this.option()
                     
                     }else{
                       this.$message.error(this.$t('substance.suerro'))
                     }
                 })
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: this.$t('substance.sudeaft')
                    }); 
                });  
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
      Form() { 
          this.$router.push({path:"/dose"}) 
      },
      option(){
          var url=this.global.url+"/medicinesMatter/selectMedicinesMatter?medicineId="+this.medicineId;
        this.$axios.get(url).then((res)=>{
          if(res.data.status==200){
            this.options=res.data.data
          }else{
            this.$message.error(this.$t('substance.suerro')); 
          }
        })
      },




// ---------------------------------修改---------------------------
    
			// 新建物质规格信息
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
			           this.$confirm(this.$t('substance.sure'), this.$t('substance.sutishi'), {
			              confirmButtonText: this.$t('substance.suyes'),
			              cancelButtonText: this.$t('substance.suno'),
			              type: 'warning'
			          }).then(() => {
			      //   点击确认后向服务器传参
			      var url=this.global.url+"/medicinesMatter/addMedicinesMatter?"
			      var postData=this.qs.stringify({
			           medicineId:this.medicineId,
			            name:this.ruleForm.name,
			             num:this.ruleForm.num,
			             matter:this.ruleForm.matter,
			             specificationValue:this.ruleForm.specificationValue,
			             specificationUnit:this.ruleForm.specificationUnit,
			      })
			      this.$axios.post(url+postData).then((res)=>{
			        console.log(res)
			        if(res.data.status==200){
                  
                  if(this.ncs==1){
                    this.$router.push({path:"/dose",query:{ncs:1}})
                  }else{
                    //  this.$router.go(0)
                     this.$message({
                          type: 'success',
                          message: this.$t('substance.susuccess'),
                        });
                      this.get()
                  }      
			        }
			      })
			          }).catch(() => {
			              this.$message({
			              type: 'info',
			              message: this.$t('substance.sudeaft')
			              }); 
			          });
			        } else {
			          console.log('error submit!!');
			          return false;
			        }
			      });
			    },
			    hand(){
			      console.log(this.medicineMatterId)
			      var url=this.global.url+"/medicinesMatter/selectMedicinesMatterById?medicineMatterId="+this.medicineMatterId;
			      this.$axios.get(url).then((res)=>{
			        console.log(res)
			        if(res.data.status==200){
                this.ruleForm=res.data.data
                this.id=res.data.data.id
			        }else{
                this.$message.error(this.$t('substance.suerro'))
              }
			      })
			    },
					// 删除事件
					handleDelete(){
							  this.save=false;
							           this.$confirm(this.$t('substance.sudelete'), this.$t('substance.sutishi'), {
                           confirmButtonText: this.$t('substance.sudeyes'),
							                       cancelButtonText: this.$t('substance.suno'),
							                       type: 'warning'
							                   }).then(() => {
                                   this.$message({
                                     type: 'success',
							                           message: this.$t('substance.susuccess1'),
							                       })   
							  var url=this.global.url+"/medicinesMatter/delete?medicinesMatterId="+this.id
							  this.$axios.delete(url).then((res)=>{
							      if(res.data.status==200){
							                       this.get()
                                  }
                              })
							                  }).catch(() => {
							                           this.$message({
							                           type: 'info',
							                           message: this.$t('substance.sudeaft1')
							                           }); 
							            });  
					},
      get(){
        if(sessionStorage.getItem("lock")==3){
           this.lock=false
         }
        this.save=false;
        var url=this.global.url+"/medicinesMatter/selectMedicinesMatter?medicineId="+this.medicineId;
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
                this.medicineMatterId=res.data.data[0].name
					    	this.options=res.data.data
             }else{
               this.sc=true
               this.ss=true
               this.info=false
               this.mains=true
                this.ruleForm=res.data.data[0]
                this.id=res.data.data[0].id
                 this.medicineMatterId=res.data.data[0].name
                this.options=res.data.data
             }
           
          }else{
            this.$message.error(this.$t('substance.suerro')); 
          }
        })
      },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('substance.sure'), this.$t('substance.sutishi'), {
                confirmButtonText: this.$t('substance.suyes'),
                cancelButtonText: this.$t('substance.suno'),
                type: 'warning'
            }).then(() => {
        //   点击确认后向服务器传参
          var url=this.global.url+"/medicinesMatter/update?"
          var postData=this.qs.stringify({
                id:this.id,
                name:this.ruleForm.name,
                num:this.ruleForm.num,
                matter:this.ruleForm.matter,
                specificationValue:this.ruleForm.specificationValue,
                specificationUnit:this.ruleForm.specificationUnit,         
            })
          this.$axios.post(url+postData).then((res)=>{
            if(res.data.status==200){
                  this.$message({
                    type: 'success',
                    message: this.$t('substance.susuccess'),
                  });
              this.option()
            }else{
              this.$message.error(this.$t('substance.suerro1'))
            }
          })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('substance.sudeaft')
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
              message: this.$t('substance.sufirst'),
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
              message: this.$t('substance.susecond'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/details"})
            },2000)
           }else if(med==undefined){
             this.$message({
              showClose: true,
              message: this.$t('substance.suthird'),
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
  margin:0 30px 0 100px;
}
  .lii{ text-align: center;
  color:#838ab6;
      line-height: 30px;
      width:30px;border: 1px solid #ececff;
      height:30px;}
</style>



    