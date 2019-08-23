<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('autopsy.auautopsy')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
          <!-- 详情修改页面显示 -->
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;">
             <div v-show="!save && lock" style="float:left">
                 <el-button type="primary" @click="newcase" style="width:150px" >{{$t('autopsy.aunew')}}</el-button>
             </div>
             <span>{{$t('autopsy.auautopsy')}}</span>
             <div style="float:right">
                   <el-select v-model="subjectAutopsyId" @change="hand" :placeholder="$t('btn.selectother')">
                     <el-option
                       v-for="item in options"
                       :key="item.id"
                       :label="item.deathCause"
                       :value="item.id">
                     </el-option>
                   </el-select>
             </div>
           </div>
           <el-form v-show="mains" :model="ruleForm" ref="ruleForm" label-width="480px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item :label="$t('autopsy.audeathCause')" prop="deathCause">
                     <el-input class="ipts" v-model="ruleForm.deathCause" @keyup.enter.native="queryAdminRole" :placeholder="$t('btn.enter')"></el-input>
                    <el-button type="primary" @click="search" icon="el-icon-search" circle title="点击搜索"></el-button>
                </el-form-item>
                <el-form-item :label="$t('autopsy.aumeddraVersion')" prop="meddraVersion">
                    <el-input class="ipts" v-model="ruleForm.meddraVersion" :disabled="true" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.I1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('autopsy.aumeddraNum')" prop="meddraNum">
                    <el-input class="ipts" v-model="ruleForm.meddraNum" :disabled="true" placeholder="请输入死因名称选择"></el-input>
                    <el-tooltip :content="$t('tishi.I2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>              
<!-- 保存新创建 -->
               <el-form-item style="margin:30px 0 0 50px;" v-if="save">
                  <el-button type="primary" @click="mitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                  <el-button type="success" @click="submitForm('ruleForm')">{{$t('project.ch')}}</el-button>
                  <el-button @click="Form">{{$t('btn.next')}}</el-button>
               </el-form-item>
 <!-- 修改按钮 -->
							 <el-form-item style="margin:30px 0 0 50px;" v-else v-show="ss">
                  <el-button type="primary" v-show="lock" @click="submitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                  <el-button type="danger" @click="handleDelete('ruleForm')" v-show="sc && lock">{{$t('btn.delete')}}</el-button>
							 </el-form-item>
<!-- 详情页面进行新建 -->
							 <el-form-item style="margin:50px 0 0 50px;" v-show="!ss">
							    <el-button type="primary" v-show="lock" @click="submit('ruleForm')">{{$t('btn.save')}}</el-button>
							 </el-form-item>
           </el-form>
              <div style="width:1200px;font-size: 30px;color: #777;margin: 30px auto;text-align:center;" v-show="info">
                    <div style="margin-bottom:30px; line-height: 1;
                         font-size: 60px;font-weight: bolder;color: #2d8cf0;">很<span style="color:#00a854;">抱</span>歉</div>
                    暂无数据请创建
              </div>
       </div>
       <pjc-dialog :event="pjcDialog" @closeTagDialog="closeTagDialog" @hand="fn($event)" :name="ruleForm.deathCause">
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
        save:true,
        info:false,
        mains:true,
				ss:true,  // 详情页新建数据下部分按钮
				sc:true,    //删除按钮是否显示
        subjectId:'',   //患者Id 
        id:"", 
        ruleForm: {
          deathCause:'',
          meddraNum:'',
          meddraVersion:'18.1',
        },
        // rules: {
        //   name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        // }
				options: [],
				 subjectAutopsyId:""
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
        // 弹出框
        search(){
            this.pjcDialog=true
        },
        closeTagDialog(){
            this.pjcDialog=false
        },
        fn(msg){
            this.ruleForm.meddraNum=msg.id
            this.ruleForm.deathCause=msg.name
        },
  // 创建新的
        mitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$confirm(this.$t('autopsy.aure'), this.$t('autopsy.autishi'), {
                    confirmButtonText: this.$t('autopsy.auyes'),
                    cancelButtonText: this.$t('autopsy.auno'),
                    type: 'warning'
                }).then(() => {          
                //   点击确认后向服务器传参
                    var url=this.global.url+"/subjectAutopsy/addSubjectAutopsy?";
                    var postData=this.qs.stringify({
                          subjectId:this.subjectId,
                          deathCause:this.ruleForm.deathCause,
                          meddraNum:this.ruleForm.meddraNum,
                          meddraVersion:this.ruleForm.meddraVersion,
                    })
                    this.$axios.post(url+postData).then((res)=>{
                        if(res.data.status==200){
                             this.$message({
                                type: 'success',
                                message: this.$t('autopsy.ausuccess'),
                              });
                             this.option()
                        }else{
                            this.$message.error(this.$t('autopsy.auerro'))
                        }
                    })
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: this.$t('autopsy.audeaft')
                    }); 
                });  
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
        Form(){
            this.$router.push({path:"/druginfo"})
        },
        option(){
            var url=this.global.url+"/subjectAutopsy/selectSubjectAutopsy?subjectId="+this.subjectId
        this.$axios.get(url).then((res)=>{
          console.log(res)
          if(res.data.status==200){
            this.options=res.data.data
          }else{
            this.$message.error(this.$t('autopsy.auerro'));  
          }
         })
        },


//--------------------修改------------------ 
			// 新建按钮
			newcase(){
              this.ss=false
              this.info=false
              this.mains=true
			        this.resetForm('ruleForm')
			        console.log(this.subjectId)
          },
      // 在详情页面创建新的数据
        submit(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.$confirm(this.$t('autopsy.aure'), this.$t('autopsy.autishi'), {
                    confirmButtonText: this.$t('autopsy.auyes'),
                    cancelButtonText: this.$t('autopsy.auno'),
                    type: 'warning'
                }).then(() => {
            //   点击确认后向服务器传参
            var url=this.global.url+"/subjectAutopsy/addSubjectAutopsy?"
            var postData=this.qs.stringify({
                  subjectId:this.subjectId,
                  deathCause:this.ruleForm.deathCause,
                  meddraNum:this.ruleForm.meddraNum,
                  meddraVersion:this.ruleForm.meddraVersion,
            })
            this.$axios.post(url+postData).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                  // this.$router.go(0)
                   this.$message({
                      type: 'success',
                      message: this.$t('autopsy.ausuccess'),
                    });
                  this.get()
               }
            })
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: this.$t('autopsy.audeaft')
                    }); 
                });
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
    // 选择器
      hand(){
        console.log(this.subjectAutopsyId)
        var url=this.global.url+"/subjectAutopsy/selectSubjectAutopsyById?subjectAutopsyId="+this.subjectAutopsyId;
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
        // console.log(subjectAutopsyId)
            this.save=false;
                      this.$confirm(this.$t('autopsy.audelete'), this.$t('autopsy.autishi'), {
                        confirmButtonText: this.$t('autopsy.audeyes'),
                                  cancelButtonText: this.$t('autopsy.auno'),
                                  type: 'warning'
                              }).then(() => {
                                this.$message({
                                  type: 'success',
                                      message: this.$t('autopsy.ausuccess1'),
                                  })   
            var url=this.global.url+"/subjectAutopsy/delete?subjectAutopsyId="+this.id
            this.$axios.delete(url).then((res)=>{
                if(res.data.status==200){
                                  this.get()
                              }
                         })
                            }).catch(() => {
                                this.$message({
                                  type: 'info',
                                  message: this.$t('autopsy.audeaft1')
                                }); 
                      });  
          },
  // 详情页加载数据
      get(){
        if(sessionStorage.getItem("lock")==3){
           this.lock=false
         }
        this.save=false;
        var url=this.global.url+"/subjectAutopsy/selectSubjectAutopsy?subjectId="+this.subjectId
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
                this.subjectAutopsyId=res.data.data[0].deathCause
                this.options=res.data.data
             }else{
                this.sc=true
                this.ss=true
               this.info=false
               this.mains=true
                this.ruleForm=res.data.data[0]
                this.id=res.data.data[0].id
                this.subjectAutopsyId=res.data.data[0].deathCause
                this.options=res.data.data
             }
            
          }else{
            this.$message.error(this.$t('autopsy.auerro'));
          }
        })
      },
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('autopsy.aure'), this.$t('autopsy.autishi'), {
                confirmButtonText: this.$t('autopsy.auyes'),
                cancelButtonText: this.$t('autopsy.auno'),
                type: 'warning'
            }).then(() => {
        //   点击确认后向服务器传参
              var url=this.global.url+"/subjectAutopsy/update?"
              var  postData=this.qs.stringify({
                    id:this.id,
                    deathCause:this.ruleForm.deathCause,
                  meddraNum:this.ruleForm.meddraNum,
                  meddraVersion:this.ruleForm.meddraVersion,
                     
              })
              this.$axios.post(url+postData).then((res)=>{
                if(res.data.status==200){
                      this.$message({
                        type: 'success',
                        message: this.$t('autopsy.ausuccess2'),
                      });
                  this.option()
                }else{
                  this.$message.error(this.$t('autopsy.auerro1'))
                }
              })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('autopsy.audeaft')
                }); 
            });  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       resetForm(formName){
        this.$refs[formName].resetFields();
      },
    },
    created(){
      let nav=sessionStorage.getItem("nav")
      // 进去详情页面
      if(nav==1){
         var subId=sessionStorage.getItem("subjectId")
          if(subId==undefined){
            this.$router.push({path:'/newList'})
          }else{
            this.subjectId=subId
            console.log(this.subjectId)
          }
        this.get();
      }else{
        // 进入新建页面
          var sub=sessionStorage.getItem("subjectId")
          var cas=sessionStorage.getItem("caseId")
          if(cas==undefined){
             this.$message({
              showClose: true,
              message: this.$t('autopsy.aufirst'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/details"})
            },2000)
          }else if(sub==undefined){
             this.$message({
              showClose: true,
              message: this.$t('autopsy.ausecond'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/newlist"})
            },2000)
          }else{
            this.subjectId=sessionStorage.getItem("subjectId")
             console.log(this.subjectId)
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
.lii{ 
    text-align: center;
    color:#838ab6;
    line-height: 30px;
    width:30px;
    border: 1px solid #ececff;
    height:30px;
  }
</style>



    