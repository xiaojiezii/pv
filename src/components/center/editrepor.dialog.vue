<template>
    <div id="demo">
     <el-dialog :title="$t('repo.reinfo')" :visible.sync="editrepor" :before-close="closeDialog" style="text-align:center;border-radius:5px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="250px" style="margin-top:20px;" class="demo-ruleForm">
               
                <el-form-item :label="$t('repo.rerepost')" prop="post">
                  <el-input v-model="ruleForm.post" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                  <i class="el-icon-s-order lii" title="编写中"></i>
              </el-form-item>
            <el-form-item :label="$t('repo.rerename')" prop="name">
                <el-input v-model="ruleForm.name" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                <i class="el-icon-s-order lii" title="编写中"></i>
            </el-form-item>
            <el-form-item :label="$t('repo.rerefirstname')" prop="nameOne">
                <el-input v-model="ruleForm.nameOne" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                <i class="el-icon-s-order lii" title="编写中"></i>
            </el-form-item>
            <el-form-item :label="$t('repo.rerelastname')" prop="nameTow">
                <el-input v-model="ruleForm.nameTow" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                <i class="el-icon-s-order lii" title="编写中"></i>
            </el-form-item>
            <el-form-item :label="$t('repo.rereorg')">
                <el-input v-model="siName" class="ipts" :disabled="true" :placeholder="$t('btn.selects')"></el-input>
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
                 <el-form-item :label="$t('repo.rereemail')" prop="email">
                    <el-input v-model="ruleForm.email" class="ipts" :placeholder="$t('btn.enter')"></el-input>
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
                <el-button type="primary" @click="submitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                <el-button @click="resetForm('ruleForm')">{{$t('btn.reset')}}</el-button>
                </el-form-item>
                </el-form>
      </el-dialog>
    </div>
</template>


<script>
  export default {
    data() {
      return {
         rId:'',
         option:[],
        ruleForm: {
          post:"",
          name:'',
          nameOne:'',
          nameTow:'',
          siteId:'',
          branch:'',
          street:'',
          city:'',
          province:'',
          postcode:'',
          phone:'',
          email:'',
          state:'',
          profession:'',
          source:'',
        },
         rules:{
           state: [{ required: true, message: '请选择国家', trigger: 'change' }],
           profession: [{ required: true, message: '请选择职业', trigger: 'change' }],
           siteId: [{ required: true, message: '请选择机构', trigger: 'change' }],
           name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
      },
       
      };
    },
    props:[
       "editrepor",
        "rowId",
        "siName",
        "siteId"
    ],
    watch:{
       editrepor(val){
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
             var url=this.global.url+"/siteReporter/update?";
            var postData=this.qs.stringify({
                id:this.rowId,
                post:this.ruleForm.post,
                name:this.ruleForm.name,
                nameOne:this.ruleForm.nameOne,
                nameTow:this.ruleForm.nameTow,
                siteId:this.siteId,
                branch:this.ruleForm.branch,
                street:this.ruleForm.street,
                city:this.ruleForm.city,
                province:this.ruleForm.province,
                postcode:this.ruleForm.postcode,
                phone:this.ruleForm.phone,
                email:this.ruleForm.email,
                state:this.ruleForm.state,
                profession:this.ruleForm.profession,
                source:this.ruleForm.source,
            })
            this.$axios.post(url+postData).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                    this.$message({
                    type: 'success',
                    message: this.$t('repo.resuccess'),
                });
                this.closeDialog()
                this.$parent.get()
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
          this.$parent.closeeditDialog();
       },
       get(){
        var url=this.global.url+"/site/selectSiteList"
         this.$axios.get(url).then((res)=>{
             console.log(res)
           if(res.data.status==200){
              this.option=res.data.data
           }    
         }) 
        var url=this.global.url+"/siteReporter/selectSiteReporterById?siteReporterId="+this.rowId;
         this.$axios.get(url).then((res)=>{
             console.log(res)
             if(res.data.status==200){
                 this.ruleForm=res.data.data
                 this.ruleForm.profession=JSON.stringify(res.data.data.profession) 
                 
                 if(res.data.data.source==null){
                     this.ruleForm.source=""
                 } else{
                    this.ruleForm.source=JSON.stringify(res.data.data.source)
                 }
             }
         })
       },
       site(id){
            this.ruleForm.siteId=id
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
