<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('model.momodel')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
        
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;">
             <div v-show="!save && lock" style="float:left">
                 <el-button type="primary" @click="newcase" style="width:150px" >{{$t('model.monew')}}</el-button>
             </div>
             <span>{{$t('model.momodel')}}</span>
             <div style="float:right">
                   <el-select v-model="medicineIncidentId" @change="hand" :placeholder="$t('btn.selectother')">
                     <el-option
                       v-for="item in options"
                       :key="item.id"
                       :label="item.event"
                       :value="item.id">
                     </el-option>
                   </el-select>
             </div>
           </div>
           <el-form v-show="mains" :model="ruleForm" ref="ruleForm" label-width="450px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item :label="$t('model.moevent')" prop="event">
                    <el-input v-model="ruleForm.event" class="ipts" :placeholder="$t('model.moenternone')"></el-input>
                    <el-tooltip :content="$t('tishi.N1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('model.mostartNum')" prop="startNum">
                    <el-input v-model="ruleForm.startNum" class="ipts" type="number" :placeholder="$t('model.moenternum')"></el-input>
                    <el-tooltip :content="$t('tishi.N2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('model.mostartUnit')" prop="startUnit">
                   <el-select v-model="ruleForm.startUnit" class="ipts" :placeholder="$t('model.moentertime')">
                        <el-option :label="$t('newList.listage2')" value="M"></el-option>
                        <el-option :label="$t('newList.listage4')" value="d"></el-option>
                        <el-option :label="$t('newList.listage5')" value="H"></el-option>
                        <el-option :label="$t('newList.listage6')" value="m"></el-option>
                        <el-option :label="$t('newList.listage7')" value="s"></el-option>
                   </el-select>
                     <el-tooltip :content="$t('tishi.N3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                   </el-form-item>
                <el-form-item :label="$t('model.molastNum')" prop="lastNum">
                    <el-input v-model="ruleForm.lastNum" class="ipts" type="number" :placeholder="$t('model.moentertimenum')"></el-input>
                    <el-tooltip :content="$t('tishi.N4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('model.molastUnit')" prop="lastUnit">
                   <el-select v-model="ruleForm.lastUnit" class="ipts" :placeholder="$t('model.moenterunit')">
                        <el-option :label="$t('newList.listage2')" value="M"></el-option>
                        <el-option :label="$t('newList.listage4')" value="d"></el-option>
                        <el-option :label="$t('newList.listage5')" value="H"></el-option>
                        <el-option :label="$t('newList.listage6')" value="m"></el-option>
                        <el-option :label="$t('newList.listage7')" value="s"></el-option>
                   </el-select>
                     <el-tooltip :content="$t('tishi.N5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                   </el-form-item>
                <el-form-item :label="$t('model.moisRepeat')" prop="isRepeat">
                    <el-select v-model="ruleForm.isRepeat" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('model.moisRepeat1')" value="1"></el-option>
                       <el-option :label="$t('model.moisRepeat2')" value="2"></el-option>                       
                       <el-option :label="$t('model.moisRepeat3')" value="3"></el-option>
                       <el-option :label="$t('model.moisRepeat4')" value="4"></el-option>                       
                    </el-select>
                    <el-tooltip :content="$t('tishi.N6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>

<!-- 新创建 -->
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
<!-- 在详情修改页面新建按钮 -->
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
        ncs:'',  //判断在详情界面中连续创建药物信息
        save:true, 
        mains:true,
        info:false,    
        ss:true,    //判断使用
        sc:true,
        id:"",
        medicineId:"",
        ruleForm: {
          event:'',
          startNum:'',
         startUnit:'',
          lastNum:'',
          lastUnit:'',
          isRepeat:'',
        },
        // rules: {
        //   event: [{ required: true, message: '请输入事件或无', trigger: 'blur' }],
        // },
		options: [],
		 medicineIncidentId:""
      };
    },
    methods: {
      mitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('event.evre'), this.$t('event.evtishi'), {
                confirmButtonText: this.$t('event.evyes'),
                cancelButtonText: this.$t('event.evno'),
                type: 'warning'
            }).then(() => {
             
        //   点击确认后向服务器传参
           var url=this.global.url+"/medicinesIncident/addMedicinesIncident?";
           var postData=this.qs.stringify({
                 medicineId:this.medicineId,
                  event:this.ruleForm.event,
                  startNum:this.ruleForm.startNum,
                  startUnit:this.ruleForm.startUnit,
                  lastNum:this.ruleForm.lastNum,
                  lastUnit:this.ruleForm.lastUnit,
                  isRepeat:this.ruleForm.isRepeat
           })
            this.$axios.post(url+postData).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                   this.$message({
                        type: 'success',
                        message: this.$t('event.evsuccess'),
                    });
                    var medicineIncidentId=res.data.data.id
                    sessionStorage.setItem("medicineIncidentId",medicineIncidentId)
                    this.option()
                
              }else{
                this.$message.error(this.$t('event.everro'));
                
              }
            })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('event.evdeaft')
                }); 
            });  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      Form() { 
        this.$router.push({path:"/evalua"})
      },
      option(){
          var url=this.global.url+"/medicinesIncident/selectMedicinesIncident?medicineId="+this.medicineId;
        this.$axios.get(url).then((res)=>{
          if(res.data.status==200){
            this.options=res.data.data
          }else{
            this.$message.error(this.$t('event.everro'))
          }
        })
      },
//-------------------------------------------修改----------------------------- 
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
	             this.$confirm(this.$t('event.evre'), this.$t('event.evtishi'), {
	                confirmButtonText: this.$t('event.evyes'),
	                cancelButtonText: this.$t('event.evno'),
	                type: 'warning'
	            }).then(() => {
	        //   点击确认后向服务器传参
	        var url=this.global.url+"/medicinesIncident/addMedicinesIncident?"
	        var postData=this.qs.stringify({
	             medicineId:this.medicineId,
	              event:this.ruleForm.event,
	              startNum:this.ruleForm.startNum,
	              startUnit:this.ruleForm.startUnit,
	               lastNum:this.ruleForm.lastNum,
	               lastUnit:this.ruleForm.lastUnit,
	               isRepeat:this.ruleForm.isRepeat
	        })
	        this.$axios.post(url+postData).then((res)=>{
	          console.log(res)
	          if(res.data.status==200){
                 let medicineIncidentId=res.data.data.id
               sessionStorage.setItem("medicineIncidentId",medicineIncidentId)
              if(this.ncs==1){ 
                    this.$router.push({path:"/evalua",query:{ncs:1}})
                  }else{
                     this.$router.push({path:"/evalua",query:{ncs:2}})
                  }      
	             }
	        })
	            }).catch(() => {
	                this.$message({
	                type: 'info',
	                message: this.$t('event.evdeaft')
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
	        var url=this.global.url+"/medicinesIncident/selectMedicinesIncidentById?medicineIncidentId="+this.medicineIncidentId;
	        this.$axios.get(url).then((res)=>{
	          console.log(res)
	          if(res.data.status==200){
              this.ruleForm=res.data.data
              this.id=res.data.data.id
              sessionStorage.setItem("medicineIncidentId",this.id)
	          }
	        })
	      },
		  // 删除事件
		  handleDelete(){
		  		  this.save=false;
		  		           this.$confirm(this.$t('event.evdelete'), this.$t('event.evtishi'), {
                       confirmButtonText: this.$t('event.evdeyes'),
		  		                       cancelButtonText: this.$t('event.evno'),
		  		                       type: 'warning'
		  		                   }).then(() => {
                               this.$message({
                                 type: 'success',
		  		                           message: this.$t('event.evsuccess1'),
		  		                       })   
		  		  var url=this.global.url+"/medicinesIncident/delete?medicinesIncidentId="+this.id
		  		  this.$axios.delete(url).then((res)=>{
		  		      if(res.data.status==200){
		  		                       this.get()
                              }
                          })
		  		                  }).catch(() => {
		  		                           this.$message({
		  		                           type: 'info',
		  		                           message: this.$t('event.evdeaft1')
		  		                           }); 
		  		            });  
		  },
      get(){
        if(this.$store.state.lock=="3"){
           this.lock=false
         }
        this.save=false;
        var url=this.global.url+"/medicinesIncident/selectMedicinesIncident?medicineId="+this.medicineId;
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
            this.options=res.data.data
            this.id=res.data.data[0].id
            this.medicineIncidentId=res.data.data[0].event
            sessionStorage.setItem("medicineIncidentId",this.id)
            }else{
               this.sc=true
              this.info=false
              this.mains=true
              this.ruleForm=res.data.data[0]
            this.options=res.data.data
            this.id=res.data.data[0].id
            this.medicineIncidentId=res.data.data[0].event
            sessionStorage.setItem("medicineIncidentId",this.id)
            }
            
          }else{
            this.$message.error(this.$t('event.everro'))
          }
        })
      },
  //修改信息 
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('event.evre'), this.$t('event.evtishi'), {
                confirmButtonText: this.$t('event.evyes'),
                cancelButtonText: this.$t('event.evno'),
                type: 'warning'
            }).then(() => {
        //   点击确认后向服务器传参
            var url=this.global.url+"/medicinesIncident/update?"
            var postData=this.qs.stringify({
                id:this.id,
                 event:this.ruleForm.event,
	              startNum:this.ruleForm.startNum,
	              startUnit:this.ruleForm.startUnit,
	               lastNum:this.ruleForm.lastNum,
	               lastUnit:this.ruleForm.lastUnit,
	               isRepeat:this.ruleForm.isRepeat        
             })
          this.$axios.post(url+postData).then((res)=>{
            if(res.data.status==200){
                  this.$message({
                    type: 'success',
                    message: this.$t('event.evsuccess2'),
                  });
              this.option()
            }else{
              this.$message.error(this.$t('event.everro1'))
            }
          })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('event.evdeaft')
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
              message: this.$t('event.evfirst'),
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
              message: this.$t('event.evsecond'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/details"})
            },2000)
           }else if(med==undefined){
             this.$message({
              showClose: true,
              message: this.$t('event.evthird'),
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
  width:250px;margin:0 30px 0 100px;
}
  .lii{ text-align: center;
  color:#838ab6;
      line-height: 30px;
      width:30px;border: 1px solid #ececff;
      height:30px;}
</style>



    