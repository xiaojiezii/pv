<template>
    <div id="demo">
     <el-dialog :title="$t('project.njt')" :visible.sync="event" :before-close="closeDialog" style="text-align:center;border-radius:5px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="250px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item :label="$t('project.name')" prop="name">
                    <el-input v-model="ruleForm.name" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <!-- <el-form-item :label="$t('project.stage')" prop="stages">
                    <el-input v-model="ruleForm.stages" class="ipts" type="number" placeholder="请输入数字"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item> -->
                <el-form-item :label="$t('project.stage')" prop="stages">
                      <el-radio v-model="ruleForm.stages" label="1">Ⅰ 期</el-radio>
                      <el-radio v-model="ruleForm.stages" label="2">Ⅱ 期</el-radio>
                      <el-radio v-model="ruleForm.stages" label="3">Ⅲ 期</el-radio>
                      <el-radio v-model="ruleForm.stages" label="4">Ⅳ 期</el-radio>
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
                    value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
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
                    <el-select v-model="ruleForm.siteId" class="ipts" :placeholder="$t('btn.selects')" @change="site" >
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
                 <el-form-item :label="$t('project.drus')" prop="medicine">
                    <el-input v-model="ruleForm.medicine" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('project.inci')" prop="type">
                    <el-select v-model="ruleForm.type" :placeholder="$t('btn.enter')" class="ipts">
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
            status:'',
            time:'',
            look:"",
            siteId:'',
            num:'',
            medicine:'',
            type:'',
            classify:'',
            characteristic:''
        },
        option:[],
        rules: {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          stages: [{ required: true, message: '请输入周期', trigger: 'blur' }],
          siteId: [{ required: true, message: '请选择中心', trigger: 'change' }],
          characteristic: [{ required: true, message: '请选择特征', trigger: 'change' }],
          medicine: [{ required: true, message: '请输入药品名称', trigger: 'blur' }],
        }
      };
    },
    props:[
       "event"
    ],
    watch:{
       event(val){
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
               
        //   点击确认后向服务器传参
           var url=this.global.url+"/project/addProject?";
            url+="name="+this.ruleForm.name;
            url+="&stages="+this.ruleForm.stages;
            url+="&time="+this.ruleForm.time;
            url+="&look="+this.ruleForm.look;
            url+="&siteId="+this.ruleForm.siteId;
            url+="&status="+this.ruleForm.status;
            url+="&num="+this.ruleForm.num;
            url+="&medicine="+this.ruleForm.medicine;
            url+="&type="+this.ruleForm.type;
            url+="&classify="+this.ruleForm.classify;
            url+="&characteristic="+this.ruleForm.characteristic;

        this.$axios.post(url).then((res)=>{
            if(res.data.status==200){
                this.$message({
                    type: 'success',
                    message: this.$t('project.prsusuccess1'),
                });
                this.closeDialog();
                this.$parent.get();
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
           this.$parent.closeTagDialog();
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
    height:30px;
  }
</style>
