<template>
    <div id="demo">
     <el-dialog :title="$t('user.usin')" :visible.sync="userdit"  width="50%" :before-close="closeDialog" style="text-align:center;border-radius:5px;">
           <div style="width:100%;text-align:right;">
               <el-button type="primary" @click="pwd" round>{{$t('user.cpwd')}}</el-button>
           </div>
           <el-form :model="ruleForm" ref="ruleForm" label-width="200px" style="margin-top:20px" class="demo-ruleForm">
                <el-form-item :label="$t('user.uname')" prop="username">
                    <el-input v-model="ruleForm.username" class="ipts"  :placeholder="$t('user.s1')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('user.use')" prop="loginName">
                    <el-input v-model="ruleForm.loginName" class="ipts"  :placeholder="$t('user.s4')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
             
               <el-form-item :label="$t('user.role')" prop="role">
                    <el-select v-model="ruleForm.role" :placeholder="$t('user.s5')"  class="ipts">                      
                       <el-option v-show="rl=='1'" :label="$t('header.admin')" value="1"></el-option>                      
                       <el-option :label="$t('header.registrar')" value="2"></el-option>                      
                       <el-option :label="$t('header.assessor')" value="3"></el-option>                      
                       <el-option v-show="rl=='1'" :label="$t('header.manager')" value="4"></el-option>                  
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item> 
                 <el-form-item :label="$t('user.sex')" prop="sex">
                    <el-select v-model="ruleForm.sex" :placeholder="$t('user.s5')"  class="ipts">
                       <el-option :label="$t('user.sex1')" value="1"></el-option>                      
                       <el-option :label="$t('user.sex2')" value="0"></el-option>                                        
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               <el-form-item :label="$t('user.email')" prop="email">
                    <el-input v-model="ruleForm.email" class="ipts"  :placeholder="$t('user.s6')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               <el-form-item :label="$t('user.phone')" prop="phone">
                    <el-input v-model="ruleForm.phone" class="ipts"  type="number" :placeholder="$t('user.s7')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
              <el-form-item :label="$t('user.bz')" prop="remark">
                    <el-input v-model="ruleForm.remark" class="ipts"  :placeholder="$t('user.s8')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
              </el-form-item> 
               <el-form-item style="margin:30px 0 0 -200px;">
                    <el-button type="primary" @click="submit('ruleForm')">{{$t('project.ch')}}</el-button>
                    <!-- <el-button type="primary" @click="submitForm">关闭</el-button> -->
                </el-form-item>
                </el-form>
                <el-dialog
                    width="40%"
                    :title="$t('user.cpwd')"
                    :visible.sync="innerVisible"
                    append-to-body>
                    <el-form :model="ruleForm" status-icon style="margin-left:100px;" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                      <el-form-item :label="$t('user.pwd')" prop="pass">
                          <el-input type="password" :placeholder="$t('user.s2')" class="ipts" v-model="ruleForm.pass" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('user.conp')" prop="checkPass">
                          <el-input type="password" :placeholder="$t('user.s3')" class="ipts" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item>
                          <el-button type="primary" style="margin:20px 0 0 70px;" @click="Form('ruleForm')">{{$t("project.set")}}</el-button>
                      </el-form-item>
                </el-form>
                 </el-dialog>
      </el-dialog>
    </div>
</template>


<script>
  export default {
    data() {
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
          return {
            innerVisible:false,
        option:[],
        rl:sessionStorage.getItem('role'),
        ruleForm: {
         username:'',
         email:'',
         phone:'',
         remark:'',//备注
         sex:'',
         role:'',//角色
         loginName:'',
         createBy:'',//创建者
         pass:'',
         checkPass:'',
        },
         rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    props:[
       "userdit",
       "userId"
    ],
    watch:{
       userdit(val){
         if(val){
           this.get();
         }
       }
    },
    methods:{
      pwd(){
        this.innerVisible=true;
      },
       closeDialog(){
           this.$parent.closeuserditDialog();
       },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('user.userre2'), this.$t('user.usertishi'), {
                confirmButtonText: this.$t('user.useryes'),
                cancelButtonText: this.$t('user.userno'),
                type: 'warning'
            }).then(() => {
            var url=this.global.url+"/user/updateUserMsg?"
            var postData=this.qs.stringify({
                 id:this.userId,
                 username:this.ruleForm.username,
                 email:this.ruleForm.email,
                 phone:this.ruleForm.phone,
                 remark:this.ruleForm.remark,
                 sex:this.ruleForm.sex,
                 role:this.ruleForm.role,
                 loginName:this.ruleForm.loginName
            })
            this.$axios.post(url+postData).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                 this.$message({
                      type: 'success',
                      message: this.$t('user.usersuccess1'),
                   });
                   this.$parent.get()
                  this.closeDialog()
              }else{
                this.$message.error(this.$t('user.usererro'))
              }
            })
            }).catch(() => {
                this.$message({
                  type: 'info',
                  message: this.$t('user.userdeaft1')
                }); 
            });  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 修改别人密码
      Form(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           var url=this.global.url+"/user/updatePassword02?"
        var postData=this.qs.stringify({
            userId:this.userId,
            password:this.ruleForm.pass
        })
        this.$axios.post(url+postData).then((res)=>{
          console.log(res)
          if(res.data.status==200){
            this.$message({
                  type: 'success',
                  message: this.$t('user.usersuccess2'),
              });
              this.innerVisible=false;
          }else{
            this.$message.error(this.$t('user.usererro1'))
          }
        })
          } else {
            this.$message.error(this.$t('user.userinput2'))
            console.log('error submit!!');
            return false;
          }
        });
      },
       get(){
            var url=this.global.url+"/sysCompany/selectAllSysCompany";
            this.$axios.get(url).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                this.option=res.data.data
                }else{
                this.$message.error(this.$t('user.userusercom')); 
                }
            })
        var url=this.global.url+"/user/selectUserById?userId="+this.userId
              this.$axios.get(url).then((res)=>{
          console.log(res)
          if(res.status==200){
            this.ruleForm=res.data
            this.ruleForm.role=JSON.stringify(res.data.role)
          }
        })
      },
    }
  };
</script>
<style scoped>
 /* *{margin: 0;padding: 0;} */
  .ipts{
      width:250px; margin: 0 30px 0 0px;
  }
  .lii{ 
      text-align: center;
      color:#838ab6;
      line-height: 30px;
      width:30px;border: 1px solid #ececff;
      height:30px;
    }
</style>
