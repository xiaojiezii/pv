<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/" v-if="save">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('case.newCase')}}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-breadcrumb separator="/" v-else>
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('case.caseinfo')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;" v-if="save"><span> {{$t('case.newCase')}}</span></div>
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;" v-else><span> {{$t('case.caseinfo')}}</span></div>
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="450px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item :label="$t('case.caseMedDRA')">
                    <el-input :placeholder="$t('case.casesystem')" style="width:250px; margin:0 30px 0 100px;" v-model="ruleForm.num" :disabled="true"></el-input>
                    <el-tooltip :content="$t('tishi.A1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('case.casetime')">
                    <el-date-picker style="width:250px;margin:0 30px 0 100px;" v-model="ruleForm.time"  :placeholder="$t('case.casesystem')" :disabled="true"></el-date-picker>
                    <!-- <el-input placeholder="系统自动生成,无需填写" v-model="ruleForm.time"></el-input> -->
                     <el-tooltip :content="$t('tishi.A2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
               
                <el-form-item :label="$t('case.casetype')" prop="genre">
                    <el-select v-model="ruleForm.genre" :placeholder="$t('btn.selects')" style="margin:0 30px 0 100px;width:250px; ">
                       <el-option :label="$t('case.casetype1')" value="1"></el-option>
                       <el-option :label="$t('case.casetype2')" value="2"></el-option>                       
                       <el-option :label="$t('case.casetype3')" value="3"></el-option>
                       <el-option :label="$t('case.casetype4')" value="4"></el-option>                       
                    </el-select>
                    <el-tooltip :content="$t('tishi.A3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('case.casestartdate')" prop="date" v-if="save">
                    <el-date-picker style="margin:0 30px 0 100px;width:250px;"  v-model="ruleForm.date" 
                    value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                       :placeholder="$t('case.casedate')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.A4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('case.casestartdate')" prop="date" v-else>
                    <el-date-picker style="width:250px;margin:0 30px 0 100px;" v-model="ruleForm.date"  :placeholder="$t('case.casedate')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.A4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>



               <el-form-item :label="$t('case.caseenddate')" prop="newdate" v-if="save">
                    <el-date-picker style="width:250px;margin:0 30px 0 100px;" v-model="ruleForm.newdate"  
                    value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                      :placeholder="$t('case.casedate')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.A5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('case.caseenddate')" prop="newdate" v-else>
                    <el-date-picker style="width:250px;margin:0 30px 0 100px;" v-model="ruleForm.newdate"   :placeholder="$t('case.casedate')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.A5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('case.casefile')" prop="isFile">
                    <el-select v-model="ruleForm.isFile" :placeholder="$t('btn.selects')" style="margin:0 30px 0 100px;width:250px; ">
                       <el-option :label="$t('case.caseisyes')" value="1"></el-option>
                       <el-option :label="$t('case.caseisno')" value="2"></el-option>                                          
                    </el-select>
                    <i class="el-icon-s-order lii" v-show="save" title="编写中"></i>
                    <el-button size="mini" v-show="upload"  @click="file" v-if="ruleForm.isFile=='1'">{{$t('btn.check')}}</el-button>
                    <el-button size="mini" v-show="upload"  @click="newfile" v-if="ruleForm.isFile=='1'">{{$t('btn.add')}}</el-button>
                </el-form-item>
                 <el-form-item :label="$t('case.casefast')" prop="isReport">
                    <el-select v-model="ruleForm.isReport" :placeholder="$t('btn.selects')" style="margin:0 30px 0 100px;width:250px; ">
                       <el-option :label="$t('case.caseisyes')" value="1"></el-option>
                       <el-option :label="$t('case.caseisno')" value="2"></el-option>                                          
                    </el-select>
                    <el-tooltip :content="$t('tishi.A6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('case.casefirst')" prop="oneSend">
                    <el-select v-model="ruleForm.oneSend" :placeholder="$t('btn.selects')" style="margin:0 30px 0 100px;width:250px; ">
                       <el-option :label="$t('case.caseisyes')" value="1"></el-option>
                       <el-option :label="$t('case.caseisno')" value="2"></el-option>                                          
                    </el-select>
                    <el-tooltip :content="$t('tishi.A7')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('case.casepast')" prop="isSend">
                    <el-select v-model="ruleForm.isSend" :placeholder="$t('btn.selects')" style="margin:0 30px 0 100px;width:250px; ">
                       <el-option :label="$t('case.caseisyes')" value="1"></el-option>
                       <el-option :label="$t('case.caseisno')" value="2"></el-option>                                          
                    </el-select>
                    <el-tooltip :content="$t('tishi.A8')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('case.caseand')" prop="combined">
                    <el-select v-model="ruleForm.combined" :placeholder="$t('btn.selects')" style="margin:0 30px 0 100px;width:250px; ">
                       <el-option :label="$t('case.caseisyes')" value="1"></el-option>
                       <el-option :label="$t('case.caseisno')" value="2"></el-option>                                          
                    </el-select>
                    <el-tooltip :content="$t('tishi.A9')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('case.casereport')" prop="report">
                    <el-select v-model="ruleForm.report" :placeholder="$t('btn.selects')" style="margin:0 30px 0 100px;width:250px; ">
                       <el-option :label="$t('case.caseisyes')" value="1"></el-option>
                       <el-option :label="$t('case.caseisno')" value="2"></el-option>                                          
                    </el-select>
                    <el-tooltip :content="$t('tishi.A10')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('case.casereasons')" prop="cause">
                     <el-input v-model="ruleForm.cause" :placeholder="$t('btn.enter')"  style="margin:0 30px 0 100px;width:250px;" ></el-input>
                    <el-tooltip :content="$t('tishi.A11')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
               
               <!-- 新建 -->
               <el-form-item :label="$t('case.caseorg')" prop="reporterSite" v-if="save">
                    <el-select v-model="ruleForm.reporterSite" @change="reports" :placeholder="$t('btn.selects')" style="margin:0 30px 0 100px;width:250px; ">
                       <el-option
                        v-for="(item,i) of option" :key="i"
                        :label="item.name" :value="item.id"></el-option>                                         
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               <!-- 修改 -->
                <el-form-item :label="$t('case.caseorg')" prop="reporterSite" v-else>
                    <el-select v-model="ruleForm.reporterSite" @change="reports"  :placeholder="$t('btn.selects')" style="margin:0 30px 0 100px;width:250px; ">
                       <el-option
                        v-for="(item,i) of option" :key="i"
                        :label="item.name" :value="item.id"></el-option>                                                                            
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
       <el-form-item :label="$t('case.casereporter')" prop="reporterId">
                    <el-select v-model="ruleForm.reporterId" :placeholder="$t('btn.selects')" style="margin:0 30px 0 100px;width:250px; ">
                      <el-option
                        v-for="(item,i) of list" :key="i"
                        :label="item.name" :value="item.id"></el-option>                                       
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               <el-form-item :label="$t('case.casecountry')" prop="state">
                    <el-select v-model="ruleForm.state" :placeholder="$t('btn.selects')" style="margin:0 30px 0 100px;width:250px; ">
                       <el-option label="CN" value="1"></el-option>                                         
                       <el-option label="US" value="2"></el-option>                                         
                    </el-select>
                    <el-tooltip :content="$t('tishi.A12')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
               <el-form-item :label="$t('case.casesource')" prop="source">
                    <el-select v-model="ruleForm.source" :placeholder="$t('btn.selects')" style="margin:0 30px 0 100px;width:250px; ">
                       <el-option :label="$t('case.casesource1')" value="1"></el-option>                                         
                       <el-option :label="$t('case.casesource2')" value="2"></el-option>                                         
                       <el-option :label="$t('case.casesource3')" value="3"></el-option>                                         
                       <el-option :label="$t('case.casesource4')" value="4"></el-option>                                         
                       <el-option :label="$t('case.casesource5')" value="5"></el-option>                                         
                       <el-option :label="$t('case.casesource6')" value="6"></el-option>                                         
                    </el-select>
                    <el-tooltip :content="$t('tishi.A13')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
               <el-form-item :label="$t('case.casestatus')" prop="type">
                    <el-select v-model="ruleForm.type" :placeholder="$t('btn.selects')" style="margin:0 30px 0 100px;width:250px; ">
                       <el-option :label="$t('case.casestatus1')" value="1"></el-option>                                         
                       <el-option :label="$t('case.casestatus2')" value="2"></el-option>                                         
                       <el-option :label="$t('case.casestatus3')" value="3"></el-option>                                                                                 
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               <!-- <el-form-item :label="$t('case.casesta')" prop="status">
                    <el-select v-model="ruleForm.status" :placeholder="$t('btn.selects')" style="margin:0 30px 0 100px;width:250px; ">
                       <el-option :label="$t('case.casesta1')" value="1"></el-option>                                         
                       <el-option :label="$t('case.casesta2')" value="2"></el-option>                                         
                       <el-option :label="$t('case.casesta3')" value="3"></el-option>                                                                                 
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item> -->
               <el-form-item :label="$t('case.caseproduct')" prop="product">
                    <el-select v-model="ruleForm.product" :placeholder="$t('btn.selects')" style="margin:0 30px 0 100px;width:250px; ">
                       <el-option :label="$t('case.caseproduct1')" value="1"></el-option>                                         
                       <el-option :label="$t('case.caseproduct2')" value="2"></el-option>                                         
                       <el-option :label="$t('case.caseproduct3')" value="3"></el-option>                                                                                 
                       <el-option :label="$t('case.caseproduct4')" value="4"></el-option>                                         
                       <el-option :label="$t('case.caseproduct5')" value="5"></el-option>                                         
                       <el-option :label="$t('case.caseproduct6')" value="6"></el-option>                                                                                 
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
<!-- 新建 -->
              <el-form-item style="margin:30px 0 0 50px;" v-if="save">
                <el-button type="primary" @click="mitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                <el-button @click="resetForm('ruleForm')">{{$t('btn.empty')}}</el-button>
              </el-form-item>
 <!-- 修改 -->
               <el-form-item style="margin:30px 0 0 50px;" v-else>
                  <el-button type="primary" @click="submitForm('ruleForm')" v-show="lock">{{$t('btn.save')}}</el-button>
                  <!-- <el-button @click="resetForm('ruleForm')">修改</el-button> -->
               </el-form-item>
            </el-form>
       </div>
    <file-dialog :filedia="fileDialog" @closeTagDialog="closefileDialog" :caseId="ruleForm.id"></file-dialog>
    </div>
</template>
<script>
import fileDialog from "./file.dialog"
export default {
    data() {
      return {
        lock:true,
          fileDialog:false,
          caseId:'',  //病例Id  通过id在详情页查询病例详情
          save:true,
          upload:false,
          option:[],    //选择机构
          list:[],      //选择机构用户
        ruleForm: {
            id:'',
            num:'',
            time:'',
            genre:'',
            date:'',
            newdate:'',
            ifFile:'',
            isReport:'',
            onesend:'',
            isSend:'',
            combined:'',
            report:'',
            cause:'',
            reporterSite:"",
            reporterId:'',
            state:'',
            source:'',
            type:'',
            status:'',
            product:'',
        },
        // 正则
        rules: {
          genre: [{ required: true, message: '请选择', trigger: 'change' }],
          isFile: [{ required: true, message: '请选择', trigger: 'change' }],
          isReport: [{ required: true, message: '请选择', trigger: 'change' }],
          oneSend: [{ required: true, message: '请选择', trigger: 'change' }],
          isSend: [{ required: true, message: '请选择', trigger: 'change' }],
          rePorterSite: [{ required: true, message: '请选择', trigger: 'change' }],
          reporterId: [{ required: true, message: '请选择', trigger: 'change' }],
          source: [{ required: true, message: '请选择', trigger: 'change' }],
          reporterSite: [{ required: true, message: '请选择', trigger: 'change' }],
          type: [{ required: true, message: '请选择', trigger: 'change' }],
          status: [{ required: true, message: '请选择', trigger: 'change' }],
          product: [{ required: true, message: '请选择', trigger: 'change' }],
          hist14: [{ required: true, message: '请选择', trigger: 'change' }],
          date: [{ required: true, message: '请选择日期', trigger: 'change' }],
          newdate: [{ required: true, message: '请选择日期', trigger: 'change' }],
        }
      };
    },
     components:{
        fileDialog
    },
    methods: {
    // 创建新的病例
        mitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$confirm(this.$t('case.care'), this.$t('case.catishi'), {
                    confirmButtonText: this.$t('case.cayes'),
                    cancelButtonText: this.$t('case.cano'),
                    type: 'warning'
                }).then(() => {
            //   点击确认后向服务器传参
                var url=this.global.url+"/case/addCase?";
                    url+="projectId="+this.ruleForm.id;
                    url+="&genre="+this.ruleForm.genre;
                    url+="&date="+this.ruleForm.date;
                    url+="&newdate="+this.ruleForm.newdate;
                    url+="&isFile="+this.ruleForm.isFile;
                    url+="&isReport="+this.ruleForm.isReport;
                    url+="&oneSend="+this.ruleForm.oneSend;
                    url+="&isSend="+this.ruleForm.isSend;
                    url+="&combined="+this.ruleForm.combined;
                    url+="&report="+this.ruleForm.report;
                    url+="&cause="+this.ruleForm.cause;
                    url+="&reporterSite="+this.ruleForm.reporterSite;
                  //  url+="&projectId="+this.ruleForm.projectId;
                    url+="&reporterId="+this.ruleForm.reporterId;
                    url+="&state="+this.ruleForm.state;
                    url+="&source="+this.ruleForm.source;
                    url+="&type="+this.ruleForm.type;
                    // url+="&status="+this.ruleForm.status;
                    url+="&status=1";
                    url+="&product="+this.ruleForm.product;
                this.$axios.post(url).then((res)=>{
                    console.log(res)
                    if(res.data.status==200){
                        this.$message({
                          type: 'success',
                          message: this.$t('case.casuccess'), 
                        });
                    this.caseId=res.data.data
                    console.log(this.caseId)
                    sessionStorage.setItem("caseId",this.caseId)
                    if(this.ruleForm.isFile==1){
                      this.$router.push({path:'/onchuan'})
                    }else{
                      this.$router.push({path:"/newlist",query:{caseId:this.caseId}})
                    }
                    }else{
                      this.$message.error(this.$t('case.caerro'));
                    } 
                  })
                })
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },

    // 清空按钮
        resetForm(formName) { 
        this.$confirm(this.$t('case.care1'), this.$t('case.catishi'), {
                confirmButtonText: this.$t('case.cayes'),
                cancelButtonText: this.$t('case.cano'),
                type: 'warning'
            }).then(() => {
                this.$message({
                type: 'success',
                message: this.$t('case.casuccess1'),
                });
                this.$refs[formName].resetFields();
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('case.cadeaft')
                }); 
            });  
      },
      // 获取所属报告者
        reports(id){
          this.ruleForm.reporterId=""
          var url=this.global.url+"/siteReporter/selectSiteReporter?siteId="+id
          this.$axios.get(url).then((res)=>{
             console.log(res)
             if(res.data.status==200){
                this.list=res.data.data
             }           
          })  
      },



















// -------------------------------------修改页面---------------------------------
// 详情页面获取信息
        closefileDialog(){
            this.fileDialog=false
        },
        file(row){
            this.fileDialog=true
        },
        newfile(){
          var caseId=this.ruleForm.id
          
          this.$router.push({path:'/onchuan',query:{caseId:caseId}})
        },
        get(){
           var sid=sessionStorage.getItem("caseId")
            console.log(sid)
            var url=this.global.url+"/case/selectCase?caseId="+sid
            this.$axios.get(url).then((res)=>{
                console.log(res)
                var list=res.data.data
                this.ruleForm=list
                if(this.ruleForm.status==3){
                  this.lock=false
                }
                this.ruleForm.isFile=JSON.stringify(list.isFile)
                this.ruleForm.isReport=JSON.stringify(list.isReport)
                this.ruleForm.oneSend=JSON.stringify(list.oneSend)
                this.ruleForm.isSend=JSON.stringify(list.isSend)
                 if(list.combined==null){
                    this.ruleForm.combined=""
                 }else{
                    this.ruleForm.combined=JSON.stringify(list.combined)
                 }
                 if(list.report==null){
                    this.ruleForm.report=""
                 }else{
                    this.ruleForm.report=JSON.stringify(list.report)
                 }
                  // this.ruleForm.reporterSite=list.reporterSite
                //   console.log(this.ruleForm.reporterSite)
                  this.ruleForm.source=JSON.stringify(list.source)
                  this.ruleForm.type=JSON.stringify(list.type)
                  this.ruleForm.status=JSON.stringify(list.status)
                  this.ruleForm.product=JSON.stringify(list.product)
                  var url=this.global.url+"/siteReporter/selectSiteReporterById?siteReporterId="+this.ruleForm.reporterId
                  this.$axios.get(url).then((res)=>{
                    console.log(res)
                    if(res.data.status==200){
                      this.list.push(res.data.data)
                    }
                  })       
             })
        },
// 修改按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('case.care'), this.$t('case.catishi'), {
                confirmButtonText: this.$t('case.cayes'),
                cancelButtonText: this.$t('case.cano'),
                type: 'warning'
            }).then(() => {
        //   点击确认后向服务器传参
             var date = new Date(this.ruleForm.date);  
             var times=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ; 
              var dates =new Date(this.ruleForm.newdate)  
               var newtimes=dates.getFullYear() + '-' + (dates.getMonth() + 1) + '-' + dates.getDate() ; 
            var url=this.global.url+"/case/update?";
                url+="id="+this.ruleForm.id;
                url+="&genre="+this.ruleForm.genre;
                url+="&date="+times;
                url+="&newdate="+newtimes;
                url+="&isFile="+this.ruleForm.isFile;
                url+="&isReport="+this.ruleForm.isReport;
                url+="&onesend="+this.ruleForm.onesend;
                url+="&isSend="+this.ruleForm.isSend;
                url+="&combined="+this.ruleForm.combined;
                url+="&report="+this.ruleForm.report;
                url+="&cause="+this.ruleForm.cause;
                url+="&reporterSite="+this.ruleForm.reporterSite;
                url+="&siteReporterId="+this.ruleForm.siteReporterId;
                url+="&state="+this.ruleForm.state;
                url+="&source="+this.ruleForm.source;
                url+="&type="+this.ruleForm.type;
                url+="&status="+this.ruleForm.status;
                url+="&product="+this.ruleForm.product;
            this.$axios.post(url).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                    this.$message({
                    type: 'success',
                    message: this.$t('case.casuccess2'),
                  
                });
                this.$router.push({path:"/caselist"})
                }
            })
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
// 修改清空
      resetForm(formName) { 
        this.$confirm(this.$t('case.care1'), this.$t('case.catishi'), {
                confirmButtonText: this.$t('case.cayes'),
                cancelButtonText: this.$t('case.cano'),
                type: 'warning'
            }).then(() => {
                this.$message({
                type: 'success',
                message: this.$t('case.casuccess1'),
                });
                this.$refs[formName].resetFields();
        //   点击确认后向服务器传参
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('case.cadeaft')
                }); 
            });  
      },
       report(id){
          var url=this.global.url+"/siteReporter/selectSiteReporter?siteId="+id
          this.$axios.get(url).then((res)=>{
                this.list=res.data.data
                console.log(this.list)                  
          })
         
      },
    },
    created(){
        var nav=sessionStorage.getItem("nav")
        if(nav==1){
            this.save=false
            this.upload=true
        var url=this.global.url+"/site/selectSiteList"
         this.$axios.get(url).then((res)=>{
           if(res.data.status==200){
              this.option=res.data.data
           }    
         }) 
        
        this.reports()
           this.get()    
        // 获取报告者所属机构
       
       }else{
           var siteId=sessionStorage.getItem("siteId")
           console.log(siteId)
         this.ruleForm.id=siteId
          //    获取报告机构
       var url=this.global.url+"/site/selectSiteList"
         this.$axios.get(url).then((res)=>{
            this.option=res.data.data
            console.log(this.option)
         })
       }
    }
}
</script>
<style scoped>
 /* *{margin: 0;padding: 0;} */


  .lii{
     text-align: center;
  color:#838ab6;
      line-height: 30px;
      width:30px;border: 1px solid #ececff;
      height:30px;}

</style>



    