<template>
    <div>
     <el-dialog :title="$t('project.pjtd')" :visible.sync="mark" width="50%" :before-close="closeDialog" style="text-align:center;border-radius:5px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="250px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item :label="$t('project.name')" prop="name">
                    <el-input v-model="ruleForm.name" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
              <el-form-item :label="$t('project.stage')" prop="stages">
                     <el-radio-group v-model="ruleForm.stages">
                        <el-radio :label="1">Ⅰ 期</el-radio>
                        <el-radio :label="2">Ⅱ 期</el-radio>
                        <el-radio :label="3">Ⅲ 期</el-radio>
                        <el-radio :label="4">Ⅳ 期</el-radio>
                        <el-radio :label="5">其它</el-radio>
                      </el-radio-group>
                </el-form-item>
                 <el-form-item :label="$t('case.casesta')" prop="status">
                    <el-select v-model="ruleForm.status" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('inst.open')" value="0"></el-option>
                       <el-option :label="$t('btn.los')" value="1"></el-option>                                                                                                                                                                                                                                                                        
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('project.pdate')" prop="time">
                    <el-date-picker class="ipts" 
                     v-model="ruleForm.time"    :placeholder="$t('btn.entime')"></el-date-picker>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>  
               <el-form-item :label="$t('project.test')" prop="look">
                     <el-input
                        type="textarea"
                        :rows="4"
                        :placeholder="$t('btn.enter')"
                        v-model="ruleForm.look" class="ipts">
                        </el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('project.site')" prop="siteId">
                    <!-- <el-select v-model="ruleForm.siteId" class="ipts" :placeholder="$t('btn.selects')" @change="site" >
                       <el-option
                        v-for="(item,i) of option" :key="i"
                        :label="item.name" :value="item.id"></el-option>                                                                            
                    </el-select> -->
                    <el-select class="ipts" v-model="ruleForm.siteId"  multiple filterable allow-create default-first-option :placeholder="$t('btn.selects')">
                      <el-option
                        v-for="(item,i) of option" :key="i"
                        :label="item.name" :value="item.id"></el-option>   
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                 <el-form-item :label="$t('project.sponsor')" prop="num">
                    <el-input v-model="ruleForm.num" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                 <el-form-item :label="$t('project.registerNum')" prop="registerNum">
                    <el-input v-model="ruleForm.registerNum" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                 <el-form-item :label="$t('project.drus')" prop="medicine">
                    <el-input v-model="ruleForm.medicine" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('project.inci')" prop="type">
                    <el-select v-model="ruleForm.type" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('project.inci1')" value="1"></el-option>
                       <el-option :label="$t('project.inci2')" value="2"></el-option>                                                                                          
                       <el-option :label="$t('project.inci3')" value="3"></el-option>                                                                                                                                                                                  
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('project.trait')" prop="characteristic">
                    <el-select v-model="ruleForm.characteristic" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('project.trait1')" value="1"></el-option>
                       <el-option :label="$t('project.trait2')" value="2"></el-option>                                                                                          
                       <el-option :label="$t('project.trait3')" value="3"></el-option>                                                                                          
                       <el-option :label="$t('project.trait4')" value="4"></el-option>                                                                                          
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('project.type')" prop="classify">
                    <el-select v-model="ruleForm.classify" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('project.type1')" value="1"></el-option>
                       <el-option :label="$t('project.type2')" value="2"></el-option>                                                                                          
                       <el-option :label="$t('project.type3')" value="3"></el-option>                                                                                                                                                                                  
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               <el-form-item style="margin:30px 0 0 -250px;">
                <el-button type="primary" @click="submitForm('ruleForm')">{{$t('project.set')}}</el-button>
                </el-form-item>
                </el-form>
      </el-dialog>
    </div>
</template>


<script>
  export default {
    data() {
      return {
         ruleForm: {
            id:'',
            name:'',
            stages:'',
            time:'',
            companyId:'',
            look:"",
            siteId:[],
            num:'',
            registerNum:'',
            medicine:'',
            type:'',
            status:'',
            classify:'',
            characteristic:''
        },
        option:[],
        rules: {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          stages: [{ required: true, message: '请选择周期', trigger: 'blur' }],
        //   time: [{ required: true, message: '请选择日期', trigger: 'blur' }],
          siteId: [{ required: true, message: '请选择中心', trigger: 'change' }],
          characteristic: [{ required: true, message: '请选择特征', trigger: 'change' }],
          medicine: [{ required: true, message: '请输入药品名称', trigger: 'blur' }],
        }
      };
    },
    props:[
       "mark",
       "pujectId"
    ],
    watch:{
       mark(val){
         if(val){
           this.get();
         }
       }
    },
    methods:{
         submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('project.prre1'), this.$t('project.prtishi'), {
                confirmButtonText: this.$t('project.pryes'),
                cancelButtonText: this.$t('project.prno'),
                type: 'warning'
            }).then(() => {
                console.log(this.ruleForm)
        //   点击确认后向服务器传参
            if(this.ruleForm.time==""){
              var times=""
            }else{
              var date = new Date(this.ruleForm.time);  
               var times=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ; 
               if(times=="1970-1-1"){times=""}
            }
            
               console.log(times)
                var url=this.global.url+"/project/update?";
                    url+="id="+this.ruleForm.id;
                    url+="&name="+this.ruleForm.name;
                    url+="&stages="+this.ruleForm.stages;
                    url+="&status="+this.ruleForm.status;
                    url+="&time="+times;
                    url+="&look="+this.ruleForm.look;
                    url+="&siteId="+this.ruleForm.siteId;
                    url+="&companyId="+this.ruleForm.companyId;
                    url+="&num="+this.ruleForm.num;
                    url+="&registerNum="+this.ruleForm.registerNum;
                    url+="&medicine="+this.ruleForm.medicine;
                    url+="&type="+this.ruleForm.type;
                    url+="&classify="+this.ruleForm.classify;
                    url+="&characteristic="+this.ruleForm.characteristic;

                this.$axios.post(url).then((res)=>{
                    console.log(res)
                    if(res.data.status==200){
                        this.$message({
                            type: 'success',
                            message: this.$t('project.prsusuccess2'),
                        });
                        this.$parent.get()
                        this.closeDialog()
                    }
                })     
             
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('project.prdeaft1')
                }); 
            });  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      site(id){
         this.ruleForm.siteId=id
          console.log(this.ruleForm.siteId)
      },
       closeDialog(){
           this.$parent.closeMarkDialog();
       },
       get(){
        var url=this.global.url+"/site/selectSiteList"
         this.$axios.get(url).then((res)=>{
             console.log(res)
           if(res.data.status==200){
              this.option=res.data.data
           }    
         })
          var url=this.global.url+"/project/selectProjectById?projectId="+this.pujectId
            this.$axios.get(url).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                    this.ruleForm.id=res.data.data.id
                    this.ruleForm.name=res.data.data.name
                    this.ruleForm.stages=res.data.data.stages
                    this.ruleForm.time=res.data.data.time
                    this.ruleForm.companyId=res.data.data.companyId
                    this.ruleForm.status=res.data.data.status
                    if(this.ruleForm.time=="-28800000"){
                      this.ruleForm.time=''
                    } 
                    this.ruleForm.look=res.data.data.look
                    this.ruleForm.siteId=res.data.data.siteId.split(',')
                    this.ruleForm.num=res.data.data.num
                    this.ruleForm.registerNum=res.data.data.registerNum
                    this.ruleForm.medicine=res.data.data.medicine
                    this.ruleForm.type=JSON.stringify(res.data.data.type) 
                    this.ruleForm.classify=res.data.data.classify
                    this.ruleForm.characteristic= res.data.data.characteristic
                }
            }) 
       },
    reports(id){
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
 .el-radio{
    margin-right: 10px;
  }
</style>
