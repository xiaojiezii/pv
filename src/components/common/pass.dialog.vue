<template>
    <div id="pass">
      <el-dialog :title="$t('header.pass')" :visible.sync="passTagdialog" :before-close="closeDialog" style="text-align:center;">
       <el-form :model="ruleForm" status-icon style="margin-left:100px;" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item :label="$t('user.opas')+'：'" prop="jpass">
                <el-input type="password" :placeholder="$t('user.s10')" class="ipts" v-model="ruleForm.jpass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('user.npas')+'：'" prop="pass">
                <el-input type="password" :placeholder="$t('user.s11')" class="ipts" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('user.afpas')+'：'" prop="checkPass">
                <el-input type="password" :placeholder="$t('user.s3')" class="ipts" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="margin:20px 0 0 -200px;" @click="submitForm('ruleForm')">{{$t('btn.save')}}</el-button>
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
          callback(new Error(this.$t('user.s2')));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('user.s3')));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error(this.$t('user.s12')));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          jpass:'',
          pass: '',
          checkPass: '',
        },
        rules: {
          jpass: [
            { validator: validatePass, trigger: 'blur'}
          ],
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
      "passTagdialog"
    ],
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('user.usre'), this.$t('user.ustishi'), {
                confirmButtonText: this.$t('user.usyes'),
                cancelButtonText: this.$t('user.usno'),
                type: 'warning'
            }).then(() => {          
        //   点击确认后向服务器传参
           var url=this.global.url+"/user/updatePassword?";
           var postData=this.qs.stringify({
               oldPassword:this.ruleForm.jpass,
               password:this.ruleForm.pass
           })
           this.$axios.post(url+postData).then((res)=>{
               console.log(res)
               if(res.data.status==200){
                   this.$message({
                      type: 'success',
                      message: this.$t('user.ussuccess'),
                   });
                    sessionStorage.removeItem('user')
                    sessionStorage.removeItem('token')                   
                    this.$router.push("/Login")
                    this.closeDialog();
                 }else if(res.data.status==500){
                   this.$message.error(this.$t('user.userro'))
                   this.ruleForm.jpass=""
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
        this.$parent.closepassDialog();
      },
    }
  };
</script>
<style scoped>
 .ipts{
     width:250px;
     /* margin-right: 30px; */
 }
</style>
