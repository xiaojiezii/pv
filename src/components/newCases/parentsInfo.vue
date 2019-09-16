<template>
    <div>
        <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('ptsinfo.ptinfo')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
            <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;"><span>{{$t('ptsinfo.ptinfo')}}</span></div>
              <el-form v-show="mains" :model="ruleForm"   ref="ruleForm" label-width="450px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item :label="$t('ptsinfo.ptparentname')" prop="parentname">
                    <el-input v-model="ruleForm.parentname" class="ipts" placeholder="请输入姓名"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <!-- 创建日期 -->
                <el-form-item :label="$t('ptsinfo.ptparentbirthday')" prop="parentbirthday" v-if="save">
                    <el-date-picker style="width:250px;"
                     value-format=" yyyy-MM-dd" format="yyyy-MM-dd" class="ipts"
                     v-model="ruleForm.parentbirthday" type="date" placeholder="选择日期"></el-date-picker>
                    <el-tooltip :content="$t('tishi.E1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
              <!-- 修改日期 -->
                <el-form-item :label="$t('ptsinfo.ptparentbirthday')" prop="parentbirthday" v-else>
                    <el-date-picker class="ipts"  style="width:250px;" v-model="ruleForm.parentbirthday" type="date" placeholder="选择日期"></el-date-picker>
                    <el-tooltip :content="$t('tishi.E1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('ptsinfo.ptweight')" prop="weight">
                    <el-input v-model="ruleForm.weight" type="number" class="ipts" placeholder="请输入体重（KG）"></el-input>
                    <el-tooltip :content="$t('tishi.E2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('ptsinfo.ptheight')" prop="height">
                    <el-input v-model="ruleForm.height" class="ipts" type="number" placeholder="请输入身高（CM）"></el-input>
                    <el-tooltip :content="$t('tishi.E3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('ptsinfo.ptparensex')" prop="parensex">
                    <el-select v-model="ruleForm.parensex" class="ipts" placeholder="请选择性别">
                       <el-option :label="$t('ptsinfo.ptparensex1')" value="1"></el-option>
                       <el-option :label="$t('ptsinfo.ptparensex2')" value="2"></el-option>
                    </el-select>
                    <el-tooltip :content="$t('tishi.E4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
<!-- 新建 -->
                <el-form-item style="margin:30px 0 0 50px" v-if="save">
                    <el-button type="primary" @click="mitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                </el-form-item>
              
<!-- 修改 -->
                <el-form-item style="margin:30px 0 0 50px" v-else v-show="!ss">
                    <el-button type="primary" v-show="lock" @click="submitForm('ruleForm')">{{$t('btn.save')}}</el-button>
     
                </el-form-item>
                </el-form>
                    <div style="width:1200px;font-size: 30px;color: #777;margin: 30px auto;text-align:center;" v-show="info">
                    <div style="margin-bottom:30px; line-height: 1;
                         font-size: 60px;font-weight: bolder;color: #2d8cf0;">很<span style="color:#00a854;">抱</span>歉</div>
                    暂无数据请创建
                     <div style="margin-top:30px;">
                         <el-button type="primary" v-show="lock" @click="newcase" style="width:100px" >+新建</el-button>
                     </div>
              </div>
       </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
        lock:true,
        save:true,
        mains:true,
        info:false,
        ss:false,
        subId:'',//创建新患者Id
        id:'', //患者Id
        ruleForm: {
          parensex: '',
          parentname: '',
          parentbirthday: '',
          weight:'',
          height:'',
        },
        // rules: {
        //   name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        //   weight: [{ required: true, message: '请输入体重', trigger: 'blur' }],
        //   height: [{ required: true, message: '请输入身高', trigger: 'blur' }],
        //   region: [{ required: true, message: '请选择性别', trigger: 'change' }],
        //   date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
        // }
      };
    },
    methods: {
  // 创建新的
      mitForm(formName) {
         this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$confirm(this.$t('ptsdise.ptre'), this.$t('ptsdise.pttishi'), {
                  confirmButtonText: this.$t('ptsdise.ptyes'),
                  cancelButtonText: this.$t('ptsdise.ptno'),
                  type: 'warning'
              }).then(() => {
                 
          //   点击确认后向服务器传参
              var url=this.global.url+"/parent/addParent?"
              var postData=this.qs.stringify({
                      subjectId:this.subId,
                      parensex: this.ruleForm.parensex,
                      parentname: this.ruleForm.parentname,
                      parentbirthday: this.ruleForm.parentbirthday,
                      weight:this.ruleForm.weight,
                      height:this.ruleForm.height,
              })
             this.$axios.post(url+postData).then((res)=>{
               console.log(res)
               if(res.data.status==200){
                  this.$message({
                     type: 'success',
                     message: this.$t('ptsdise.ptsuccess'),
                   });
                   var parentId=res.data.data
                   sessionStorage.setItem("parentId",parentId)
                   this.$router.push({path:"/ptsdise",query:{parId:parentId}})
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









// -------------------修改-------------
      get(){
         if(this.$store.state.lock=="3"){
           this.lock=false
         }
        this.save=false
        console.log(this.subId)
        var url=this.global.url+"/parent/selectParent?subjectId="+this.subId;
        this.$axios.get(url).then((res)=>{
          console.log(res)
          if(res.data.status==200){
            this.info=false
            this.mains=true
            this.ruleForm=res.data.data
            if(res.data.data.parensex==null){
              this.ruleForm.parensex=""
            }else{
              this.ruleForm.parensex=JSON.stringify(res.data.data.parensex)
            }
            if(res.data.data.parentbirthday==""){
              this.ruleForm.parentbirthday=''
            }
            this.id=res.data.data.id
            console.log(this.id)
            sessionStorage.setItem("parentId",this.id)
          }else{
            this.mains=false
            this.info=true
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
                if(this.ruleForm.parentbirthday==""){
                  var time=""
                }else{
                    var date = new Date(this.ruleForm.parentbirthday);  
                    var time=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); 
                    if(time=="1970-1-1"){time=""}
                }
               
               var url=this.global.url+"/parent/update?"
               console.log(this.id)
               var postData=this.qs.stringify({
                     id:this.id,
                   parensex:this.ruleForm.parensex,
                    parentname: this.ruleForm.parentname,
                    parentbirthday: time,
                    weight:this.ruleForm.weight,
                    height:this.ruleForm.height,
               })
               this.$axios.post(url+postData).then((res)=>{
                 if(res.data.status==200){
                        this.$message({
                            type: 'success',
                            message: this.$t('ptsdise.ptsuccess'),
                        });
                 }else{
                   this.$message.error(this.$t('ptsdise.pterro'))
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
      newcase(){
        this.save=true
        this.ss=true
        this.mains=true,
        this.info=false
      }
    },
    created(){
      var nav=sessionStorage.getItem("nav")
      if(nav==1){
          var subId=sessionStorage.getItem("subjectId")
          if(subId==undefined){
            this.$router.push({path:'/newList'})
          }else{
            this.subId=subId
            console.log(this.subId)
          }
         this.get();
      }else{
        var sub=sessionStorage.getItem("subjectId")
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
          }else if(sub==undefined){
             this.$message({
              showClose: true,
              message: this.$t('ptsdise.ptfourth'),
              type: 'error'
            });
            setTimeout(()=>{
               this.$router.push({path:"/newlist"})
            },2000)
          }else{
             this.subId=sessionStorage.getItem("subjectId")
        console.log(this.subId)
          }
       
      }
     
    }
}
</script>
<style>
  *{margin: 0;padding: 0;}
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
