<template>
    <div>
        <el-dialog :title="$t('header.info')" :visible.sync="parsTagdialog" :before-close="closeDialog" style="text-align:center;">
         <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" style="margin:20px 0 0 80px;" class="demo-ruleForm">
                <el-form-item :label="$t('user.uname')+'：'" prop="username">
                    <el-input v-model="ruleForm.username" class="ipts" :placeholder="$t('user.s1')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('user.use')+'：'" prop="loginName">
                    <el-input v-model="ruleForm.loginName" class="ipts" :placeholder="$t('user.s4')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               <el-form-item :label="$t('user.comm')+'：'" prop="companyId">
                    <el-select v-model="ruleForm.companyId" :disabled="true"  class="ipts" @change="reports" :placeholder="$t('user.s5')">
                       <el-option
                        v-for="(item,i) in option" :key="i"
                        :label="item.name" :value="item.id"></el-option>                      
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
             
               <el-form-item :label="$t('user.role')+'：'" prop="role">
                    <el-select v-model="ruleForm.role" :disabled="true"  class="ipts" :placeholder="$t('user.s5')" >                      
                       <el-option :label="$t('header.registrar')" value="2"></el-option>                      
                       <el-option :label="$t('header.assessor')" value="3"></el-option>                      
                       <el-option :label="$t('header.manager')" value="4"></el-option>                      
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item> 
                 <el-form-item :label="$t('user.sex')+'：'" prop="sex">
                    <el-select v-model="ruleForm.sex" class="ipts" :placeholder="$t('user.s5')" >
                       <el-option :label="$t('user.sex1')" value="1"></el-option>                      
                       <el-option :label="$t('user.sex2')" value="0"></el-option>                                        
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               <el-form-item :label="$t('user.email')+'：'" prop="email">
                    <el-input v-model="ruleForm.email" class="ipts" :placeholder="$t('user.s6')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               <el-form-item :label="$t('user.phone')+'：'" prop="phone">
                    <el-input v-model="ruleForm.phone" class="ipts" type="number" :placeholder="$t('user.s7')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
              <el-form-item :label="$t('user.bz')+'：'" prop="remark">
                    <el-input v-model="ruleForm.remark" class="ipts" :placeholder="$t('user.s8')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
              </el-form-item>
              <el-form-item style="margin:30px 0 0 -200px;">
                  <el-button type="primary" @click="submitForm('ruleForm')">{{$t('btn.save')}}</el-button>
              </el-form-item>
          </el-form>
      </el-dialog>
    </div>
</template>


<script>
  export default {
    data() {
      return {
     option:[],
        ruleForm: {
         username:'',
         email:'',
         phone:'',
         remark:'',//备注
         sex:'',
         companyId:'', //选择公司
         role:'',//角色
         loginName:'',
        },
        rules: {
            names:[ { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }],
            pwds:[ { required: true, message: '请输入密码', trigger: 'blur' },
                   { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }],
             companyId:[{required: true, message: '请选择公司', trigger: 'change'}],
             role:[{required: true, message: '请选择角色', trigger: 'blur'}],
             email:[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
             phone:[{ min: 11, max: 11, message: '请输入正确的手机号码格式', trigger: 'blur'}],
          }
       
      };
    },
    props:[
    "parsTagdialog"
    ],
    watch:{
        parsTagdialog:function(val){
            if(val){
                this.get()
                this.reports()
            }
        }
    },
    methods:{
         submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('user.ussave'), this.$t('user.ustishi'), {
                confirmButtonText: this.$t('user.usyes'),
                cancelButtonText: this.$t('user.usno'),
                type: 'warning'
            }).then(() => {
               
        //   点击确认后向服务器传参
              var url=this.global.url+"/user/updateUser?";
              var postData=this.qs.stringify({
                  username:this.ruleForm.username,
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
                      message: this.$t('user.ussccc'),
                   });
                   this.closeDialog();
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
           this.$parent.closeTagDialog();
       },
       get(){
            var url=this.global.url+"/user/selectUser";
             this.$axios.get(url).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                  this.ruleForm=res.data.data
                  this.ruleForm.role=JSON.stringify(res.data.data.role)
              }
          })
        var url=this.global.url+"/sysCompany/selectAllSysCompany";
        this.$axios.get(url).then((res)=>{
            console.log(res)
            if(res.data.status==200){
            this.option=res.data.data
            }else{
            this.$message.error("获取公司信息失败"); 
            }
        })
       },
    reports(id){
        this.ruleForm.companyId=id
      },
    }
  };
</script>
<style scoped>
 .ipts{
     width:250px;
     margin-right: 30px;
 }
</style>
