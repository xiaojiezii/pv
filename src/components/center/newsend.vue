<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('send.sendcreate')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;"><span> {{$t('send.sendcreate')}}</span></div>
           <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="450px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item :label="$t('send.sendsendtype')" prop="type">
                    <el-select v-model="ruleForm.type" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('send.sendcompany')" value="1"></el-option>
                       <el-option :label="$t('send.sendregulator')" value="2"></el-option>                                          
                       <el-option :label="$t('send.sendhealth')" value="3"></el-option>                                          
                       <el-option :label="$t('send.sendpv')" value="4"></el-option>                                          
                       <el-option :label="$t('send.sendcenter')" value="5"></el-option>                                          
                       <el-option :label="$t('send.sendother')" value="6"></el-option>                                          
                       <el-option :label="$t('send.sendpeople')" value="7"></el-option>                                          
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('send.sendsendorg')" prop="institution">
                     <el-input v-model="ruleForm.institution" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('send.sendsenddepartment')" prop="department">
                     <el-input v-model="ruleForm.department" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('send.sendsendtitle')" prop="title">
                     <el-input v-model="ruleForm.title" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('send.sendsendname')" prop="name">
                     <el-input v-model="ruleForm.name" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('send.sendsendmidname')" prop="midName">
                     <el-input v-model="ruleForm.midName" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('send.sendsendlastname')" prop="lastname">
                     <el-input v-model="ruleForm.lastname" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('send.sendsendstreet')" prop="street">
                     <el-input v-model="ruleForm.street" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('send.sendsendcity')" prop="city">
                     <el-input v-model="ruleForm.city" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('send.sendsendprovince')" prop="province">
                     <el-input v-model="ruleForm.province" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('send.sendsendcode')" prop="postalCode">
                     <el-input v-model="ruleForm.postalCode" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('send.sendsendcountry')" prop="countryCode">
                     <el-input v-model="ruleForm.countryCode" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('send.sendsendphone')" prop="phone">
                     <el-input v-model="ruleForm.phone" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('send.sendsendfax')" prop="fax">
                     <el-input v-model="ruleForm.fax" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('send.sendsendemail')" prop="email">
                     <el-input v-model="ruleForm.email" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               <el-form-item style="margin:30px 0 0 50px;">
                <el-button type="primary" @click="submitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                <el-button @click="resetForm('ruleForm')">{{$t('btn.reset')}}</el-button>
                </el-form-item>
                </el-form>
       </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
          userId:'',
        ruleForm: {
          type:"",
          institution:'',
          department:'',
          title:'',
          name:'',
          midName:'',
          lastname:'',
          street:'',
          city:'',
          province:'',
          postalCode:'',
          countryCode:'',
          phone:'',
          fax:'',
          email:'',
        },
      rules:{
           type: [{ required: true, message: '请选择国家', trigger: 'change' }],
           email:[ //{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                 { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur','change']}],
          countryCode:[{ max: 2, message: '长度过长，应不大于2', trigger: 'blur' }]         
      },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('send.sendsave'), this.$t('send.sendtishi'), {
                confirmButtonText: this.$t('send.sendyes'),
                cancelButtonText: this.$t('send.sendno'),
                type: 'warning'
            }).then(() => {
            var url=this.global.url+"/sender/addSender?";
            var postData=this.qs.stringify({
                   type:this.ruleForm.type,
                    institution:this.ruleForm.institution,
                    department:this.ruleForm.department,
                    title:this.ruleForm.title,
                    name:this.ruleForm.name,
                    midName:this.ruleForm.midName,
                    lastname:this.ruleForm.lastname,
                    street:this.ruleForm.street,
                    city:this.ruleForm.city,
                    province:this.ruleForm.province,
                    postalCode:this.ruleForm.postalCode,
                    countryCode:this.ruleForm.countryCode,
                    phone:this.ruleForm.phone,
                    fax:this.ruleForm.fax,
                    email:this.ruleForm.email,
					userId:this.userId,
              })
              this.$axios.post(url+postData).then((res)=>{
				  console.log(res)
                  if(res.data.status==200){
                      this.$message({
                      type: 'success',
                      message: this.$t('send.sendame'),
                  });
                  this.$router.push({path:'/sendlist'})
                  }else{
                      this.$message.error(this.$t('send.senderro'));
                      
                  }
              })
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) { 
        this.$confirm(this.$t('send.sendempty'), this.$t('send.sendtishi'), {
                confirmButtonText: this.$t('send.sendyes'),
                cancelButtonText: this.$t('send.sendno'),
                type: 'warning'
            }).then(() => {
                this.$message({
                type: 'success',
                message: this.$t('send.sendsccc'),
                });
                this.$refs[formName].resetFields();
        //   点击确认后向服务器传参
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('send.sendexit')
                }); 
            });  
      }
    },
	created(){
		console.log(1)
		 this.userId=sessionStorage.getItem("userId")
		console.log(this.userId)
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



    
