<template>
    <div>
        <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('ptsdise.ptdise')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
            
            <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;">
              <div v-show="!save && lock" style="float:left">
                  <el-button type="primary" @click="newcase" style="width:150px" >{{$t('ptsdise.ptnew')}}</el-button>
              </div>
              <span>{{$t('ptsdise.ptdise')}}</span>
              <div style="float:right">
                    <el-select v-model="parentDiseaseId" @change="hand" :placeholder="$t('btn.selectother')">
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
                <el-form-item :label="$t('ptsdise.ptdise')" prop="name">
                    <el-input v-model="ruleForm.name" class="ipts"
                     @keyup.enter.native="queryAdminRole" :placeholder="$t('btn.enter')"></el-input>
                    <el-button type="primary" @click="search" icon="el-icon-search"  circle title="点击搜索"></el-button>
                </el-form-item>
                <el-form-item :label="$t('ptsdise.pthistoryMeddraversion')"  prop="historyMeddraversion">
                     <el-input v-model="ruleForm.historyMeddraversion" class="ipts" :disabled="true" placeholder="请输入版本"></el-input>
                    <el-tooltip :content="$t('tishi.F1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('ptsdise.pthistoryMeddranumber')" prop="historyMeddranumber">
                     <el-input v-model="ruleForm.historyMeddranumber" class="ipts"  :disabled="true" placeholder="请输入疾病名称选择"></el-input>
                    <el-tooltip :content="$t('tishi.F2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
            <!-- 新建 -->
                <el-form-item :label="$t('ptsdise.ptdateStart')" prop="dateStart" v-if="save">
                    <el-date-picker style="width:250px;" class="ipts" v-model="ruleForm.dateStart" 
                      value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                       :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.F3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
          <!-- 修改 -->
                <el-form-item :label="$t('ptsdise.ptdateStart')" prop="dateStart" v-else v-show="ss">
                    <el-date-picker style="width:250px;" class="ipts" v-model="ruleForm.dateStart" 
                       :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.F3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
					<!-- 新增 -->
								<el-form-item :label="$t('ptsdise.ptdateStart')" prop="dateStart"  v-show="!ss">
										<el-date-picker class="ipts"
										value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
										v-model="ruleForm.dateStart" 
											 :placeholder="$t('btn.entime')"></el-date-picker>
										<el-tooltip :content="$t('tishi.F3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
								</el-form-item>
                <el-form-item :label="$t('ptsdise.ptisalive')"  prop="isalive">
                    <el-select v-model="ruleForm.isalive" class="ipts" :placeholder="$t('btn.selects')">
                       <el-option :label="$t('ptsdise.ptisalive1')" value="1"></el-option>
                       <el-option :label="$t('ptsdise.ptisalive2')" value="2"></el-option>                       
                       <el-option :label="$t('ptsdise.ptisalive3')" value="3"></el-option>
                       <el-option :label="$t('ptsdise.ptisalive4')" value="4"></el-option>                       
                       <el-option :label="$t('ptsdise.ptisalive5')" value="5"></el-option>
                       <el-option :label="$t('ptsdise.ptisalive6')" value="6"></el-option>                       
                    </el-select>
                    <el-tooltip :content="$t('tishi.F4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
      <!-- 新建 -->
                <el-form-item :label="$t('ptsdise.ptdateEnd')" prop="dateEnd" v-if="save">
                    <el-date-picker class="ipts" 
                     value-format=" yyyy-MM-dd"  style="width:250px;" format="yyyy-MM-dd"
                    v-model="ruleForm.dateEnd"  :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.F5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
      <!-- 修改 -->
                <el-form-item :label="$t('ptsdise.ptdateEnd')" prop="dateEnd" v-else v-show="ss">
                    <el-date-picker class="ipts"  style="width:250px;" v-model="ruleForm.dateEnd"  :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.F5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
			<!-- 新增 -->
								<el-form-item :label="$t('ptsdise.ptdateEnd')" prop="dateEnd" v-show="!ss">
								    <el-date-picker class="ipts"
										value-format=" yyyy-MM-dd" format="yyyy-MM-dd"  style="width:250px;"
										v-model="ruleForm.dateEnd"  :placeholder="$t('btn.entime')"></el-date-picker>
								    <el-tooltip :content="$t('tishi.F5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
								</el-form-item>
                <el-form-item :label="$t('ptsdise.ptcomment')" prop="comment">
                    <el-input
                        type="textarea"
                        :placeholder="$t('btn.enter')"
                        v-model="ruleForm.comment" class="ipts">
                        </el-input>
                    <el-tooltip :content="$t('tishi.F6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('ptsdise.ptinstruction')" prop="instruction">
                    <el-input
                        type="textarea"
                        :placeholder="$t('btn.enter')"
                        v-model="ruleForm.instruction" class="ipts">
                        </el-input>
                    <el-tooltip :content="$t('tishi.F7')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>


<!-- 保存按钮 -->
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
        info:false,
        mains:true,
        parId:"",//父母Id
        save:true,
				ss:true,
				sc:true,
        id:"",
        ruleForm: {  
          name: '',
          historyMeddraversion:18.1,
          historyMeddranumber:'',
          dateStart: '',
          isalive: '',
          dateEnd:'',
          comment:'',
          instruction:'',
        },
        rules: {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        },
				options: [],
				 parentDiseaseId:""
      };
    },
    components:{
       pjcDialog
    },
    methods: {
            // 搜索名称
        queryAdminRole(){
            this.pjcDialog=true
        },
        search(){
            this.pjcDialog=true
  
        },
        closeTagDialog(){
            this.pjcDialog=false
        },
        fn(msg){
            this.ruleForm.historyMeddranumber=msg.id
            this.ruleForm.name=msg.name
        },


//------------------------------------------------新建   
        mitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('ptsdise.ptre'), this.$t('ptsdise.pttishi'), {
                confirmButtonText: this.$t('ptsdise.ptyes'),
                cancelButtonText: this.$t('ptsdise.ptno'),
                type: 'warning'
            }).then(() => {
        //   点击确认后向服务器传参
              var url=this.global.url+"/parentDisease/addParentDisease?"
              var postData=this.qs.stringify({
                      parentId:this.parId,
                      name: this.ruleForm.name,
                      historyMeddraversion:this.ruleForm.historyMeddraversion,
                      historyMeddranumber:this.ruleForm.historyMeddranumber,
                      dateStart: this.ruleForm.dateStart,
                      isalive: this.ruleForm.isalive,
                      dateEnd:this.ruleForm.dateEnd,
                      comment:this.ruleForm.comment,
                      instruction:this.ruleForm.instruction,
              })
              this.$axios.post(url+postData).then((res)=>{
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
      Form() {
         this.$router.push({path:"/ptsDrug"})
      },
      option(){
 var url=this.global.url+"/parentDisease/selectParentDisease?parentId="+this.parId;
       this.$axios.get(url).then((res)=>{
         if(res.data.status==200){
           this.options=res.data.data
         }else{
           this.$message.error(this.$t('ptsdise.pterro'))
         }
       })
      },
     
     
 //  ---------------------------------------------修改
     
			// 新建病史
			newcase(){
              this.ss=false;
              this.info=false,
              this.mains=true,
			        this.resetForm('ruleForm')
			        console.log(this.parentDiseaseId)
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
				  
			      var url=this.global.url+"/parentDisease/addParentDisease?";
			      var postData=this.qs.stringify({
			          parentId:this.parId,
			          name: this.ruleForm.name,
			          historyMeddraversion:this.ruleForm.historyMeddraversion,
			          historyMeddranumber:this.ruleForm.historyMeddranumber,
			          dateStart: this.ruleForm.dateStart,
			          isalive: this.ruleForm.isalive,
			          dateEnd:this.ruleForm.dateEnd,
			          comment:this.ruleForm.comment,
			          instruction:this.ruleForm.instruction,
			      })
			      this.$axios.post(url+postData).then((res)=>{
			        console.log(res)
			        if(res.data.status==200){
                  // this.$router.go(0)
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
			      console.log(this.parentDiseaseId)
			      var url=this.global.url+"/parentDisease/selectParentDiseaseById?parentDiseaseId="+this.parentDiseaseId;
			      this.$axios.get(url).then((res)=>{
			        console.log(res)
			        if(res.data.status==200){
                this.ruleForm=res.data.data
                 if(res.data.data.isalive==null){
                this.ruleForm.isalive=""
              }else{
                 this.ruleForm.isalive=JSON.stringify(res.data.data.isalive)
              }
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
							  var url=this.global.url+"/parentDisease/delete?parentDiseaseId="+this.id
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
      if(this.$store.state.lock=="3"){
           this.lock=false
         }
       this.save=false
       var url=this.global.url+"/parentDisease/selectParentDisease?parentId="+this.parId;
       console.log(this.parId)
       this.$axios.get(url).then((res)=>{
         console.log(res)
            console.log(res.data.data[0].isalive)
         if(res.data.status==200){
            if(res.data.data.length==0){
              this.mains=false,
              this.info=true
            }else if(res.data.data.length==1){
              this.sc=false
              this.info=false
              this.mains=true
              this.ruleForm=res.data.data[0]
             
              if(res.data.data[0].isalive==null){
                this.ruleForm.isalive=""
              }else{
                 this.ruleForm.isalive=JSON.stringify(res.data.data[0].isalive)
              }
              this.id=res.data.data[0].id
              this.parentDiseaseId=res.data.data[0].name
              this.options=res.data.data
            }else{
              this.sc=true
              this.ss=true
              this.info=false
              this.mains=true
              this.ruleForm=res.data.data[0]
               if(res.data.data[0].isalive==null){
                this.ruleForm.isalive=""
              }else{
                 this.ruleForm.isalive=JSON.stringify(res.data.data[0].isalive)
              }
              this.id=res.data.data[0].id
              this.parentDiseaseId=res.data.data[0].name
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
             if(this.ruleForm.dateStart==""){
                var time=""
             }else{
                var date = new Date(this.ruleForm.dateStart);  
              var time=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ; 
              if(time=="1970-1-1"){time=""}
             }
             if(this.ruleForm.dateEnd==""){
                var time1=""
             }else{
                  var date1 = new Date(this.ruleForm.dateEnd);  
              var time1=date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate() ;
              if(time1=="1970-1-1"){time1=""}
             }
              
              var url=this.global.url+"/parentDisease/update?"
              var postData=this.qs.stringify({
                   id:this.id,
                    name: this.ruleForm.name,
                    historyMeddraversion:this.ruleForm.historyMeddraversion,
                    historyMeddranumber:this.ruleForm.historyMeddranumber,
                    dateStart:time,
                    isalive: this.ruleForm.isalive,
                    dateEnd:time1,
                    comment:this.ruleForm.comment,
                    instruction:this.ruleForm.instruction,
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
  //-------------------------------修改--------------------------------------
  
    created(){
       var nav=sessionStorage.getItem("nav");
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
            this.option()
           }
       }
    }
}
</script>
<style>
  *{margin: 0;padding: 0;}
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
