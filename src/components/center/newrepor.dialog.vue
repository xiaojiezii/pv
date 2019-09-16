<template>
    <div id="demo">
     <el-dialog :title="$t('repo.renew')" :visible.sync="newrepor" :before-close="closeDialog" style="text-align:center;border-radius:5px;">
            <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="300px" style="margin-top:20px;" class="demo-ruleForm">
               
              <el-form-item :label="$t('repo.rerepost')" prop="post">
                  <el-input v-model="ruleForm.post" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                  <i class="el-icon-s-order lii" title="编写中"></i>
              </el-form-item>
            <el-form-item :label="$t('repo.rerename')" prop="name">
                <el-input v-model="ruleForm.name" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                <i class="el-icon-s-order lii" title="编写中"></i>
            </el-form-item>
            <el-form-item :label="$t('repo.rerefirstname')" prop="nameone">
                <el-input v-model="ruleForm.nameone" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                <i class="el-icon-s-order lii" title="编写中"></i>
            </el-form-item>
            <el-form-item :label="$t('repo.rerelastname')" prop="nametow">
                <el-input v-model="ruleForm.nametow" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                <i class="el-icon-s-order lii" title="编写中"></i>
            </el-form-item>
            <el-form-item :label="$t('repo.rereorg')" prop="siteId">
            <el-select v-model="ruleForm.siteId"  @change="site" :placeholder="$t('btn.selects')" class="ipts">
                <el-option
                v-for="(item,i) of option" :key="i"
                :label="item.name" :value="item.id"></el-option>                                         
            </el-select>
            <i class="el-icon-s-order lii" title="编写中"></i>
            </el-form-item>
                <el-form-item :label="$t('repo.rerebranch')" prop="branch">
                    <el-input v-model="ruleForm.branch" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('repo.rereaddress')" prop="street">
                    <el-input v-model="ruleForm.street" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('repo.rerecity')" prop="city">
                    <el-input v-model="ruleForm.city" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('repo.rereprovince')" prop="province">
                    <el-input v-model="ruleForm.province" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('repo.rerecode')" prop="postcode">
                    <el-input v-model="ruleForm.postcode" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('repo.rerephone')" prop="phone">
                    <el-input v-model="ruleForm.phone" class="ipts" type="number" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('repo.rerecountry')" prop="state">
                <el-select v-model="ruleForm.state" :placeholder="$t('btn.selects')" class="ipts">
                    <el-option :label="$t('case.country1')" value="中国"></el-option>
                    <el-option :label="$t('case.country2')" value="美国"></el-option>                                          
                </el-select>
                <i class="el-icon-s-order lii" title="编写中"></i>
            </el-form-item>
                <el-form-item :label="$t('repo.rerejob')" prop="profession">
                <el-select v-model="ruleForm.profession" :placeholder="$t('btn.selects')" class="ipts">
                    <el-option :label="$t('repo.redoctor')" value="1"></el-option>
                    <el-option :label="$t('repo.repharmacist')" value="2"></el-option>                                          
                    <el-option :label="$t('repo.reother')" value="3"></el-option>                                          
                    <el-option :label="$t('repo.relawyer')" value="4"></el-option>                                          
                    <el-option :label="$t('repo.repeople')" value="5"></el-option>                                          
                </el-select>
                <i class="el-icon-s-order lii" title="编写中"></i>
            </el-form-item>
                <el-form-item :label="$t('repo.reresource')" prop="source">
                <el-select v-model="ruleForm.source" :placeholder="$t('btn.selects')" class="ipts">
                    <el-option :label="$t('repo.reisyes')" value="1"></el-option>
                    <el-option :label="$t('repo.reisno')" value="2"></el-option>                                          
                </el-select>
                <i class="el-icon-s-order lii" title="编写中"></i>
            </el-form-item>

            <el-form-item style="margin:30px 0 0 -250px;">
                <el-button type="primary" @click="submitForm('ruleForm')">{{$t('repo.rerecreate')}}</el-button>
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
          post:"",
          name:'',
          nameone:'',
          nametow:'',
          siteId:'',
          branch:'',
          street:'',
          city:'',
          province:'',
          postcode:'',
          phone:'',
          state:'',
          profession:'',
          source:'',
        },
      rules:{
           state: [{ required: true, message: '请选择国家', trigger: 'change' }],
           profession: [{ required: true, message: '请选择职业', trigger: 'change' }],
           siteId: [{ required: true, message: '请选择机构', trigger: 'change' }],
           name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
           phone: [{ min:11, max: 11, message: '请输入正确的手机号码', trigger: 'blur' }]
      },
      };
    },
    props:[
       "newrepor",
        "siteId"
    ],
    watch:{
       newrepor(val){
         if(val){
           this.get();
         }
       }
    },
    methods:{
         submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('repo.redangqian'), this.$t('repo.retishi'), {
                confirmButtonText: this.$t('repo.reyes'),
                cancelButtonText: this.$t('repo.reno'),
                type: 'warning'
            }).then(() => {
               
        //   点击确认后向服务器传参
              var url=this.global.url+"/siteReporter/addSiteReporter?";
                var postData=this.qs.stringify({
                    post:this.ruleForm.post,
                    name:this.ruleForm.name,
                    nameOne:this.ruleForm.nameone,
                    nameTow:this.ruleForm.nametow,
                    siteId:this.ruleForm.siteId,
                    branch:this.ruleForm.branch,
                    street:this.ruleForm.street,
                    city:this.ruleForm.city,
                    province:this.ruleForm.province,
                    postcode:this.ruleForm.postcode,
                    phone:this.ruleForm.phone,
                    state:this.ruleForm.state,
                    profession:this.ruleForm.profession,
                    source:this.ruleForm.source,
                })
            this.$axios.post(url+postData).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                    this.$message({
                    type: 'success',
                    message: this.$t('repo.resccc'),
                });
                this.closeDialog()
                this.$parent.get();
                }else{
                    this.$message.error(this.$t('repo.redeaft'));
                }
             })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('repo.reexit')
                }); 
            });  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       closeDialog(){
          this.$parent.closereporDialog();
       },
       get(){
        var url=this.global.url+"/site/selectSiteList"
         this.$axios.get(url).then((res)=>{
             console.log(res)
           if(res.data.status==200){
              this.option=res.data.data
           }    
         }) 
       },
       site(id){
            this.ruleForm.siteId=id
            console.log(this.ruleForm.siteId)
        },
    }
  };
</script>
<style scoped>
 /* *{margin: 0;padding: 0;} */
.ipts{
    width:250px; margin: 0 30px 0 0px;
}
  .lii{ text-align: center;
  color:#838ab6;
      line-height: 30px;
      width:30px;border: 1px solid #ececff;
      height:30px;}

</style>
