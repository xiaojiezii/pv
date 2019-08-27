<template>
    <div id="demo">
     <el-dialog :title="$t('user.newu')" :visible.sync="user" width="50%" :before-close="closeDialog" style="text-align:center;border-radius:5px;">
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" style="margin-top:20px" class="demo-ruleForm">
                <el-form-item :label="$t('user.uname')" prop="names">
                    <el-input v-model="ruleForm.names" class="ipts" :placeholder="$t('user.s1')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('user.pwd')" prop="pwds">
                    <el-input type="password" :placeholder="$t('user.s2')" class="ipts" v-model="ruleForm.pwds" autocomplete="off"></el-input>
                     <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('user.conp')" prop="checkPass">
                    <el-input type="password" :placeholder="$t('user.s3')" class="ipts" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('user.use')" prop="loginName">
                    <el-input v-model="ruleForm.loginName" class="ipts" :placeholder="$t('user.s4')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               <el-form-item :label="$t('user.comm')" prop="companyId" v-show="role=='1'">
                    <el-select v-model="ruleForm.companyId" @change="reports" :placeholder="$t('user.s5')" class="ipts">
                       <el-option
                        v-for="(item,i) in option" :key="i"
                        :label="item.name" :value="item.id"></el-option>                      
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
             
               <el-form-item :label="$t('user.role')" prop="role">
                    <el-select v-model="ruleForm.role" :placeholder="$t('user.s5')" class="ipts">                      
                       <el-option :label="$t('header.registrar')" value="2"></el-option>                      
                       <el-option :label="$t('header.assessor')" value="3"></el-option>                      
                       <el-option v-show="role=='1'" :label="$t('header.manager')" value="4"></el-option>                      
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item> 
                 <el-form-item :label="$t('user.sex')+':'" prop="sex">
                    <el-select v-model="ruleForm.sex" :placeholder="$t('user.s5')" class="ipts">
                       <el-option :label="$t('user.sex1')" value="1"></el-option>                      
                       <el-option :label="$t('user.sex2')" value="0"></el-option>                                        
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               <el-form-item :label="$t('user.email')" prop="email">
                    <el-input v-model="ruleForm.email" class="ipts" :placeholder="$t('user.s6')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               <el-form-item :label="$t('user.phone')+':'" prop="phone">
                    <el-input v-model="ruleForm.phone" class="ipts" type="number" :placeholder="$t('user.s7')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
              <el-form-item :label="$t('user.bz')" prop="remark">
                    <el-input v-model="ruleForm.remark" class="ipts" :placeholder="$t('user.s8')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
              </el-form-item>
               <el-form-item style="margin:30px 0 0 -200px;">
                   <el-button type="primary" @click="submitForm('ruleForm')">{{$t('project.set')}}</el-button>
               </el-form-item>
            </el-form>
      </el-dialog>
    </div>
</template>


<script>
  export default {
    data() {
       var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('user.userinput')));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('user.userinput1')));
        } else if (value !== this.ruleForm.pwds) {
          callback(new Error(this.$t('user.userinput2')));
        } else {
          callback();
        }
      };
      return {
        option:[],
        ruleForm: {
          checkPass:'',
         names:'',
         pwds:'',
         email:'',
         phone:'',
         remark:'',//备注
         sex:'',
         companyId:'', //选择公司
         role:'',//角色
         loginName:'',
         createBy:'',//创建者
         createTime:''//创建时间
        },
        rules: {
            names:[ { required: true, message: this.$t('user.s1'), trigger: 'blur' },
                    { min: 3, max: 15, message: this.$t('user.s9'), trigger: 'blur' }],
            // pwds:[ { required: true, message: '请输入密码', trigger: 'blur' },
            //        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }],
             pwds: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
            //  companyId:[{required: true, message: '请选择公司', trigger: 'change'}],
             role:[{required: true, message: this.$t('user.s5'), trigger: 'blur'}],
            //  email:[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
            //  phone:[{ min: 11, max: 11, message: '请输入正确的手机号码格式', trigger: 'blur'}],
          }
      };
    },
    props:[
       "user",
       "role"
    ],
    watch:{
       user(val){
         if(val){
           this.get();
         }
       }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('user.ussave'), this.$t('user.usertishi'), {
                confirmButtonText: this.$t('user.useryes'),
                cancelButtonText: this.$t('user.userno'),
                type: 'warning'
            }).then(() => {
               
        //   点击确认后向服务器传参
              var url=this.global.url+"/registerLogin/register?";
              var postData=this.qs.stringify({
                  username:this.ruleForm.names,
                  password:this.ruleForm.pwds,
                  email:this.ruleForm.email,
                  companyId:this.ruleForm.companyId,
                  loginName:this.ruleForm.loginName,
                  phone:this.ruleForm.phone,
                  remark:this.ruleForm.remark,
                  role:this.ruleForm.role,
                  sex:this.ruleForm.sex,
              })
              this.$axios.post(url+postData).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                   this.$message({
                      type: 'success',
                      message: this.$t('user.usersuccess1'),
                   });
                   this.closeDialog()
                   this.$parent.get();
                }else if(res.data.status==500){
                  this.$message.error(this.$t('user.userror'))
                }
              })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('user.usdeaft')
                }); 
            });  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       closeDialog(){
           this.$parent.closeuserDialog();
       },
     reports(id){
        this.ruleForm.companyId=id
      },
       get(){
            var url=this.global.url+"/sysCompany/selectAllSysCompany";
            this.$axios.get(url).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                this.option=res.data.data
                }else{
                this.$message.error(this.$t('user.usercom')); 
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
     width:30px;
     border: 1px solid #ececff;
     height:30px;
    }
</style>
