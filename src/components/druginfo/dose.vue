<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('dose.dodose')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
          
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;">
             <div v-show="!save && lock" style="float:left">
                 <el-button type="primary" @click="newcase" style="width:150px" >{{$t('dose.donew')}}</el-button>
             </div>
             <span>{{$t('dose.dodose')}}</span>
             <div style="float:right">
                   <el-select v-model="medicineDoseId" @change="hand" :placeholder="$t('btn.selectother')">
                     <el-option
                       v-for="item in options"
                       :key="item.id"
                       :label="item.doseValue"
                       :value="item.id">
                     </el-option>
                   </el-select>
             </div>
           </div>
           <el-form v-show="mains" :model="ruleForm" ref="ruleForm" label-width="480px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item :label="$t('dose.dodoseValue')" prop="doseValue">
                    <el-input v-model="ruleForm.doseValue" class="ipts" type="number" :placeholder="$t('dose.doenterdose')"></el-input>
                    <el-tooltip :content="$t('tishi.L1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dose.dodoseUnit')" prop="doseUnit">
                    <el-input v-model="ruleForm.doseUnit" class="ipts" :placeholder="$t('dose.doenterunit')"></el-input>
                    <el-tooltip :content="$t('tishi.L2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dose.dointervalNum')" prop="intervalNum">
                    <el-input v-model="ruleForm.intervalNum" class="ipts" type="number" :placeholder="$t('dose.doenterno')"></el-input>
                    <el-tooltip :content="$t('tishi.L3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dose.dotimeInterval')" prop="timeInterval">
                   <el-select v-model="ruleForm.timeInterval" class="ipts" :placeholder="$t('btn.enter')">
                        <el-option :label="$t('newList.listage1')" value="a"></el-option>
                        <el-option :label="$t('newList.listage2')" value="mo"></el-option>
                        <el-option :label="$t('newList.listage3')" value="wk"></el-option>
                        <el-option :label="$t('newList.listage4')" value="d"></el-option>
                        <el-option :label="$t('newList.listage5')" value="h"></el-option>
                        <el-option :label="$t('newList.listage6')" value="min"></el-option>
                   </el-select>
                      <el-tooltip :content="$t('tishi.L4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                   </el-form-item>
                <el-form-item :label="$t('dose.dostartTime')" prop="startTime" v-if="save">
                    <el-date-picker class="ipts" v-model="ruleForm.startTime"  
                    value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                      :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.L5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dose.dostartTime')" prop="startTime" v-else v-show="ss">
                    <el-date-picker class="ipts" v-model="ruleForm.startTime"    :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.L5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
				<el-form-item :label="$t('dose.dostartTime')" prop="startTime" v-show="!ss">
				    <el-date-picker class="ipts" 
					value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
					v-model="ruleForm.startTime"    :placeholder="$t('btn.entime')"></el-date-picker>
				    <el-tooltip :content="$t('tishi.L5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
				</el-form-item>
                <el-form-item :label="$t('dose.dolastTime')" prop="lastTime" v-if="save">
                    <el-date-picker class="ipts" v-model="ruleForm.lastTime" 
                    value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                       :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.L6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dose.dolastTime')" prop="lastTime" v-else v-show="ss">
                    <el-date-picker class="ipts" v-model="ruleForm.lastTime"    :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.L6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
               <el-form-item :label="$t('dose.dolastTime')" prop="lastTime" v-show="!ss">
                   <el-date-picker class="ipts" 
				   value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
				   v-model="ruleForm.lastTime"    :placeholder="$t('btn.entime')"></el-date-picker>
                   <el-tooltip :content="$t('tishi.L6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
               </el-form-item>
               
               
                <el-form-item :label="$t('dose.dodurationValue')" prop="durationValue">
                    <el-input v-model="ruleForm.durationValue" class="ipts" type="number" :placeholder="$t('dose.doentertime')"></el-input>
                    <el-tooltip :content="$t('tishi.L7')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('dose.dodurationUnit')" prop="durationUnit">
                   <el-select v-model="ruleForm.durationUnit" class="ipts" :placeholder="$t('dose.doentertimeunit')">
                       <el-option :label="$t('newList.listage1')" value="a"></el-option>
                        <el-option :label="$t('newList.listage2')" value="mo"></el-option>
                        <el-option :label="$t('newList.listage3')" value="wk"></el-option>
                        <el-option :label="$t('newList.listage4')" value="d"></el-option>
                        <el-option :label="$t('newList.listage5')" value="h"></el-option>
                        <el-option :label="$t('newList.listage6')" value="min"></el-option>
                   </el-select>
                      <el-tooltip :content="$t('tishi.L8')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                   </el-form-item>
                <el-form-item :label="$t('dose.dobatchNumber')" prop="batchNumber">
                    <el-input v-model="ruleForm.batchNumber"  class="ipts" :placeholder="$t('dose.doenterlot')"></el-input>
                    <el-tooltip :content="$t('tishi.L9')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dose.dodoseText')" prop="doseText">
                    <el-input v-model="ruleForm.doseText" class="ipts" :placeholder="$t('dose.doentertext')"></el-input>
                    <el-tooltip :content="$t('tishi.L10')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dose.dodosimeter')" prop="dosimeter">
                    <el-input v-model="ruleForm.dosimeter" class="ipts" :placeholder="$t('dose.doenterdosimeter')"></el-input>
                    <el-tooltip :content="$t('tishi.L11')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dose.dodosageFormNum')" prop="dosageFormNum">
                    <el-input v-model="ruleForm.dosageFormNum" class="ipts" :placeholder="$t('dose.doenterdate')"></el-input>
                    <el-tooltip :content="$t('tishi.L12')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dose.dodosageForm')" prop="dosageForm">
                    <el-input v-model="ruleForm.dosageForm" class="ipts" :placeholder="$t('dose.doenterID')"></el-input>
                    <el-tooltip :content="$t('tishi.L13')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dose.domedicineWay')" prop="medicineWay">
                    <el-input v-model="ruleForm.medicineWay" class="ipts" :placeholder="$t('dose.doenterinfo')"></el-input>
                    <el-tooltip :content="$t('tishi.L14')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dose.domedicineWayNum')" prop="medicineWayNum">
                    <el-input v-model="ruleForm.medicineWayNum" class="ipts" :disabled="true" :placeholder="$t('dose.doenterinfo')"></el-input>
                    <el-tooltip :content="$t('tishi.L15')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dose.domedicineWayId')" prop="medicineWayId">
                    <el-input v-model="ruleForm.medicineWayId" class="ipts" :placeholder="$t('dose.doenterID')"></el-input>
                    <el-tooltip :content="$t('tishi.L16')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dose.domainWay')" prop="mainWay">
                    <el-input v-model="ruleForm.mainWay" class="ipts" :placeholder="$t('dose.doenterway')"></el-input>
                    <el-tooltip :content="$t('tishi.L17')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dose.domainWayNum')" prop="mainWayNum">
                    <el-input v-model="ruleForm.mainWayNum" class="ipts" :disabled="true" :placeholder="$t('dose.doenterinfo')"></el-input>
                    <el-tooltip :content="$t('tishi.L18')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('dose.domainWayId')" prop="mainWayId">
                    <el-input v-model="ruleForm.mainWayId" class="ipts" :placeholder="$t('dose.doenternone')"></el-input>
                    <el-tooltip :content="$t('tishi.L19')" placement="right-start" effect="light">
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
          ncs:'',
          medicineId:'',
          mains:true,
          info:false,
          save:true,
		  ss:true,
          sc:true,
          id:"",
        ruleForm: {
          doseValue:'',
          doseUnit:'',
          intervalNum:'',
          timeInterval:'',
          startTime:'',
          lastTime:'',
          durationValue:'',
          durationUnit:'',
          batchNumber:'',
          doseText:'',
          dosimeter:'',
          dosageFormNum:'',
          dosageForm:'',
          medicineWay:'',
          medicineWayNum:2.1,
          medicineWayId:'',
          mainWay:'',
          mainWayNum:2.1,
          mainWayId:'',
        },
        // rules: {
        //   mainWayId: [{ required: true, message: '请输入ID或无', trigger: 'blur' }],
        // },
		options: [],
		 medicineDoseId:""
      };
    },
    methods: {
       mitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$confirm(this.$t('dose.dore'), this.$t('dose.dotishi'), {
                    confirmButtonText: this.$t('dose.doyes'),
                    cancelButtonText: this.$t('dose.dono'),
                    type: 'warning'
                }).then(() => {
                  
            //   点击确认后向服务器传参
            console.log(this.subjectId)
               var url=this.global.url+"/medicinesDose/addMedicinesDose?";
               var postData=this.qs.stringify({
                     medicineId:this.medicineId,
                    doseValue:this.ruleForm.doseValue,
                    doseUnit:this.ruleForm.doseUnit,
                    intervalNum:this.ruleForm.intervalNum,
                    timeInterval:this.ruleForm.timeInterval,
                    startTime:this.ruleForm.startTime,
                    lastTime:this.ruleForm.lastTime,
                    durationValue:this.ruleForm.durationValue,
                    durationUnit:this.ruleForm.durationUnit,
                    batchNumber:this.ruleForm.batchNumber,
                    doseText:this.ruleForm.doseText,
                    dosimeter:this.ruleForm.dosimeter,
                    dosageFormNum:this.ruleForm.dosageFormNum,
                    dosageForm:this.ruleForm.dosageForm,
                    medicineWay:this.ruleForm.medicineWay,
                    medicineWayNum:this.ruleForm.medicineWayNum,
                    medicineWayId:this.ruleForm.medicineWayId,
                    mainWay:this.ruleForm.mainWay,
                    mainWayNum:this.ruleForm.mainWayNum,
                    mainWayId:this.ruleForm.mainWayId,
               })
               this.$axios.post(url+postData).then((res)=>{
                   console.log(res)
                   if(res.data.status==200){
                      this.$message({
                        type: 'success',
                        message: this.$t('dose.dosuccess'),
                      });
                    this.option()
                   }else{
                       this.$message.error(this.$t('dose.doerro'));
                       
                   }
               })
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: this.$t('dose.dodeaft')
                    }); 
                });  
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        Form() { 
            this.$router.push({path:"/adapt"})
        },
        option(){
              var url=this.global.url+"/medicinesDose/selectMedicinesDose?medicineId="+this.medicineId;
          this.$axios.get(url).then((res)=>{
              if(res.data.status==200){
                 this.options=res.data.data
              }else{
                  this.$message.error(this.$t('dose.doerro'))
              }
          })
        },




 //-------------------------------修改       
     
	  // 新建剂量信息
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
	             this.$confirm(this.$t('dose.dore'), this.$t('dose.dotishi'), {
	                confirmButtonText: this.$t('dose.doyes'),
	                cancelButtonText: this.$t('dose.dono'),
	                type: 'warning'
	            }).then(() => {
	        //   点击确认后向服务器传参
	        var url=this.global.url+"/medicinesDose/addMedicinesDose?"
	        var postData=this.qs.stringify({
	             medicineId:this.medicineId,
	             doseValue:this.ruleForm.doseValue,
	             doseUnit:this.ruleForm.doseUnit,
	             intervalNum:this.ruleForm.intervalNum,
	             timeInterval:this.ruleForm.timeInterval,
	             startTime:this.ruleForm.startTime,
	             lastTime:this.ruleForm.lastTime,
	             durationValue:this.ruleForm.durationValue,
	             durationUnit:this.ruleForm.durationUnit,
	             batchNumber:this.ruleForm.batchNumber,
	             doseText:this.ruleForm.doseText,
	             dosimeter:this.ruleForm.dosimeter,
	             dosageFormNum:this.ruleForm.dosageFormNum,
	             dosageForm:this.ruleForm.dosageForm,
	             medicineWay:this.ruleForm.medicineWay,
	             medicineWayNum:this.ruleForm.medicineWayNum,
	             medicineWayId:this.ruleForm.medicineWayId,
	             mainWay:this.ruleForm.mainWay,
	             mainWayNum:this.ruleForm.mainWayNum,
	             mainWayId:this.ruleForm.mainWayId,
	        })
	        this.$axios.post(url+postData).then((res)=>{
	          console.log(res)
	          if(res.data.status==200){
	              if(this.ncs==1){
                    this.$router.push({path:"/adapt",query:{ncs:1}})
                  }else{
                    //  this.$router.go(0)
                     this.$message({
                        type: 'success',
                        message: this.$t('dose.dosuccess'),
                    });
                    this.get()
                  }      
	          }
	        })
	            }).catch(() => {
	                this.$message({
	                type: 'info',
	                message: this.$t('dose.dodeaft')
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
	        var url=this.global.url+"/medicinesDose/selectMedicinesDoseById?medicineDoseId="+this.medicineDoseId;
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
		  		           this.$confirm(this.$t('dose.dodelete'), this.$t('dose.dotishi'), {
                                 confirmButtonText: this.$t('dose.dodeyes'),
		  		                       cancelButtonText: this.$t('dose.dono'),
		  		                       type: 'warning'
		  		                   }).then(() => {
                                         this.$message({
                                             type: 'success',
		  		                           message: this.$t('dose.dosuccess1'),
		  		                       })   
		  		  var url=this.global.url+"/medicinesDose/delete?medicinesDoseId="+this.id
		  		  this.$axios.delete(url).then((res)=>{
		  		      if(res.data.status==200){
		  		                       this.get()
                                        }
                                    })
		  		                  }).catch(() => {
		  		                           this.$message({
		  		                           type: 'info',
		  		                           message: this.$t('dose.dodeaft1')
		  		                           }); 
		  		            });  
		  },
      get(){
          if(this.$store.state.lock=="3"){
           this.lock=false
         }
          this.save=false
          var url=this.global.url+"/medicinesDose/selectMedicinesDose?medicineId="+this.medicineId;
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
                        this.medicineDoseId=res.data.data[0].doseValue
                        this.options=res.data.data
                   }else{
                       this.sc=true
                       this.ss=true
                       this.info=false
                       this.mains=true
                       this.ruleForm=res.data.data[0]
                        this.id=res.data.data[0].id
                        this.medicineDoseId=res.data.data[0].doseValue
                        this.options=res.data.data
                   }
                  
              }else{
                  this.$message.error(this.$t('dose.doerro'))
              }
          })
      },
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('dose.dore'), this.$t('dose.dotishi'), {
                confirmButtonText: this.$t('dose.doyes'),
                cancelButtonText: this.$t('dose.dono'),
                type: 'warning'
            }).then(() => {
        
        //   点击确认后向服务器传参
        if(this.ruleForm.startTime==""){
            var time=""
        }else{
            var date = new Date(this.ruleForm.startTime);  
            var time=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ; 
            if(time=="1970-1-1"){time=""}
        }
        if(this.ruleForm.lastTime==""){
            var time1=""
        }else{
            var date1 = new Date(this.ruleForm.lastTime);  
            var time1=date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate() ; 
            if(time1=="1970-1-1"){time1=""}
        }
            
         var url=this.global.url+"/medicinesDose/update?"
                  var  postData=this.qs.stringify({
                        id:this.id,
                        doseValue:this.ruleForm.doseValue,
	             doseUnit:this.ruleForm.doseUnit,
	             intervalNum:this.ruleForm.intervalNum,
	             timeInterval:this.ruleForm.timeInterval,
	             startTime:time,
	             lastTime:time1,
	             durationValue:this.ruleForm.durationValue,
	             durationUnit:this.ruleForm.durationUnit,
	             batchNumber:this.ruleForm.batchNumber,
	             doseText:this.ruleForm.doseText,
	             dosimeter:this.ruleForm.dosimeter,
	             dosageFormNum:this.ruleForm.dosageFormNum,
	             dosageForm:this.ruleForm.dosageForm,
	             medicineWay:this.ruleForm.medicineWay,
	             medicineWayNum:this.ruleForm.medicineWayNum,
	             medicineWayId:this.ruleForm.medicineWayId,
	             mainWay:this.ruleForm.mainWay,
	             mainWayNum:this.ruleForm.mainWayNum,
	             mainWayId:this.ruleForm.mainWayId,
                        
                  })
                  this.$axios.post(url+postData).then((res)=>{
                    if(res.data.status==200){
                         this.$message({
                            type: 'success',
                            message: this.$t('dose.dosuccess2'),
                          });
                      this.option()
                    }else{
                      this.$message.error(this.$t('dose.doerro1'))
                    }
                  })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('dose.dodeaft')
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
              message: this.$t('dose.dofirst'),
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
              message: this.$t('dose.dosecond'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/details"})
            },2000)
           }else if(med==undefined){
             this.$message({
              showClose: true,
              message: this.$t('dose.dothird'),
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
   width: 250px;
   margin:0 30px 0 100px;
  }
 .lii{
      text-align: center;
      color:#838ab6;
      line-height: 30px;
      width:30px;border: 1px solid #ececff;
      height:30px;
    }
</style>



    
