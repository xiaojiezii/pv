<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/" v-if="save">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('newList.newlist')}}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-breadcrumb separator="/" v-else>
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('newList.baselist')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;" v-if="save"><span> {{$t('newList.newlist')}}</span></div>
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;" v-else><span> {{$t('newList.baselist')}}</span></div>
               <el-form v-show="mains" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="480px" style="margin-top:20px;" class="demo-ruleForm">
                 <el-form-item :label="$t('newList.listname')" prop="name">
                    <el-input v-model="ruleForm.name" class="ipts" :placeholder="$t('btn.entername')"></el-input>
                    <el-tooltip :content="$t('tishi.B1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listGP')" prop="ranNum1">
                    <el-input v-model="ruleForm.ranNum1" class="ipts" placeholder="22.MSK、25ASKU、26.NASK、23.UNK"></el-input>
                    <el-tooltip :content="$t('tishi.B2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listpro')" prop="ranNum2">
                    <el-input v-model="ruleForm.ranNum2" class="ipts" placeholder="22.MSK、25ASKU、26.NASK、23.UNK"></el-input>
                    <el-tooltip :content="$t('tishi.B3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listhos')" prop="ranNum3">
                    <el-input v-model="ruleForm.ranNum3" class="ipts" placeholder="22.MSK、25ASKU、26.NASK、23.UNK"></el-input>
                    <el-tooltip :content="$t('tishi.B3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.liststudy')" prop="ranNum4">
                    <el-input v-model="ruleForm.ranNum4" class="ipts" placeholder="22.MSK、25ASKU、26.NASK、23.UNK"></el-input>
                    <el-tooltip :content="$t('tishi.B3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listbir')" prop="birthday" v-if="save">
                    <el-date-picker style="width:250px;" class="ipts" v-model="ruleForm.birthday"
                      value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                      :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.B4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listbir')"  prop="birthday" v-else>
                    <el-date-picker class="ipts" v-model="ruleForm.birthday"
                      :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.B4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('newList.nation')" prop="newUnit">
                    <el-select v-model="ruleForm.nation" filterable :placeholder="$t('btn.selects')" class="ipts">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                     </el-select>
                    <el-tooltip :content="$t('tishi.B14')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.race')" prop="race">
                    <el-select v-model="ruleForm.race" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('newList.race1')" value="1"></el-option>                
                       <el-option :label="$t('newList.race2')" value="2"></el-option>                
                       <el-option :label="$t('newList.race3')" value="3"></el-option>                
                       <el-option :label="$t('newList.race4')" value="4"></el-option>                
                    </el-select>
                    <el-tooltip :content="$t('tishi.B15')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.medicalName')" prop="medicalName">
                    <el-input v-model="ruleForm.medicalName"  onkeyup="this.value=this.value.replace(/[^\u4e00-\u9fa5]/g,'')" class="ipts" :placeholder="$t('btn.chinese')"></el-input>
                    <el-tooltip :content="$t('tishi.B16')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('newList.nationality')" prop="nationality">
                    <el-select v-model="ruleForm.nationality" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('case.country1')" value="中国"></el-option>                
                       <el-option :label="$t('case.country2')" value="美国"></el-option>                            
                    </el-select>
                    <el-tooltip :content="$t('tishi.B17')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.iphone')" prop="iphone">
                    <el-input v-model="ruleForm.iphone"  class="ipts" :placeholder="$t('btn.iphone')"></el-input>
                    <el-tooltip :content="$t('tishi.B18')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.pregnancyDescribe')" prop="pregnancyDescribe">
                    <el-input
                        :rows="2"
                        type="textarea"
                        :placeholder="$t('btn.chinese')"
                        onkeyup="this.value=this.value.replace(/[^\u4e00-\u9fa5]/g,'')"
                        v-model="ruleForm.pregnancyDescribe" class="ipts">
                        </el-input>
                    <el-tooltip :content="$t('tishi.B19')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listagenum')" prop="newTime">
                    <el-input v-model="ruleForm.newTime" class="ipts" type="number" :placeholder="$t('btn.enternum')"></el-input>
                    <el-tooltip :content="$t('tishi.B5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
 
                <el-form-item :label="$t('newList.listage')" prop="newUnit">
                    <el-select v-model="ruleForm.newUnit" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('newList.listage1')" value="a"></el-option>
                       <el-option :label="$t('newList.listage2')" value="mo"></el-option>                       
                       <el-option :label="$t('newList.listage3')" value="wk"></el-option>
                       <el-option :label="$t('newList.listage4')" value="d"></el-option>                       
                       <el-option :label="$t('newList.listage5')" value="h"></el-option>                      
                    </el-select>
                    <el-tooltip :content="$t('tishi.B6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
               <el-form-item :label="$t('newList.listbabynum')" prop="twoTime">
                    <el-input v-model="ruleForm.twoTime" class="ipts" type="number" :placeholder="$t('btn.enternum')"></el-input>
                    <el-tooltip :content="$t('tishi.B7')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
               <el-form-item :label="$t('newList.listbaby')" prop="twoUnit">
                    <el-select v-model="ruleForm.twoUnit" :placeholder="$t('btn.selects')" class="ipts">
                         <el-option :label="$t('newList.listage2')" value="mo"></el-option>
                        <el-option :label="$t('newList.listage3')" value="wk"></el-option>
                        <el-option :label="$t('newList.listage4')" value="d"></el-option>                                    
                    </el-select>
                    <el-tooltip :content="$t('tishi.B8')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
               <el-form-item :label="$t('newList.listtype')" prop="type">
                    <el-select v-model="ruleForm.type" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('newList.listtype1')" value="1"></el-option>
                       <el-option :label="$t('newList.listtype2')" value="2"></el-option>                       
                       <el-option :label="$t('newList.listtype3')" value="3"></el-option>
                       <el-option :label="$t('newList.listtype4')" value="4"></el-option>                                            
                       <el-option :label="$t('newList.listtype5')" value="5"></el-option>                                            
                       <el-option :label="$t('newList.listtype6')" value="6"></el-option>                                            
                       <el-option :label="$t('newList.listtype7')" value="7"></el-option>                                            
                    </el-select>
                    <el-tooltip :content="$t('tishi.B9')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('newList.listkg')" prop="weight">
                    <el-input v-model="ruleForm.weight" class="ipts" type="number" :placeholder="$t('btn.enterweight')"></el-input>
                    <el-tooltip :content="$t('tishi.B10')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                 <el-form-item :label="$t('newList.listcm')" prop="height">
                    <el-input v-model="ruleForm.height" class="ipts" type="number" :placeholder="$t('btn.enterheight')"></el-input>
                    <el-tooltip :content="$t('tishi.B11')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listsex')" prop="sex">
                    <el-select v-model="ruleForm.sex" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('newList.listsex1')" value="1"></el-option>
                       <el-option :label="$t('newList.listsex2')" value="2"></el-option>
                    </el-select>
                    <el-tooltip :content="$t('tishi.B12')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listmean')" prop="instructions">
                    <el-input v-model="ruleForm.instructions" class="ipts"   placeholder="22.MSK、25ASKU、26.NASK、23.UNK"></el-input>
                    <el-tooltip :content="$t('tishi.B13')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('newList.listisdeath')" prop="die">
                    <el-select v-model="ruleForm.die" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('newList.listisdeath1')" value="1"></el-option>
                       <el-option :label="$t('newList.listisdeath2')" value="2"></el-option>
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item v-if="ruleForm.die==1" :label="$t('newList.diet')" prop="dieDate">
                         <el-date-picker class="ipts" v-model="ruleForm.dieDate" type="datetime" :placeholder="$t('newList.diep')"> </el-date-picker>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
<!-- 新建 -->
               <el-form-item style="margin:30px 0 0 50px;" v-if="save">
                  <el-button type="primary" @click="mitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                  <el-button @click="Form('ruleForm')">{{$t('btn.empty')}}</el-button>
               </el-form-item>
<!-- 修改 -->
               <el-form-item style="margin:30px 0 0 50px;" v-else v-show="ss">
                  <el-button v-show="lock" type="primary" @click="submitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                  <!-- <el-button @click="resetForm('ruleForm')">修改</el-button> -->
               </el-form-item>
               <el-form-item style="margin:30px 0 0 50px;" v-show="!ss">
                  <el-button v-show="lock" type="primary" @click="submit('ruleForm')">{{$t('btn.save')}}</el-button>
               </el-form-item>
            </el-form>
            <div style="width:1200px;font-size: 30px;color: #777;margin: 30px auto;text-align:center;" v-show="info">
                <div style="margin-bottom:30px; line-height: 1;
                    font-size: 60px;font-weight: bolder;color: #2d8cf0;">很<span style="color:#00a854;">抱</span>歉</div>
                暂无数据请创建
                <div style="margin-top:30px;">
                    <el-button v-show="lock" type="primary" @click="newcase" style="width:100px" >+新建</el-button>
                </div>
          </div>
       </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
        ss:true,
        lock:true,
        info:false,
        mains:true,
         caseId:"",   //病例Id 进行创建患者信息
         save:true,
          ruleForm: {
          name:'',
          ranNum1:'',
          ranNum2:'',
          ranNum3:'',
          ranNum4:'',          
          sex:'',
          birthday: '',
          nation:'',
          race:'',
          medicalName:'',
          nationality:'',
          iphone:'',
          pregnancyDescribe:'',
          weight:'',
          height:'',
          die:'',
          instructions:'',
          newUnit:'',
          newTime:'',
          twoTime:'',
          twoUnit:'',
          type:'',
          dieDate:'',
        },
        options:[
          {value:'01',label:'汉族'},
          {value:'02',label:'蒙古族'},
          {value:'03',label:'回族'},
          {value:'04',label:'藏族'},
          {value:'05',label:'维吾尔族'},
          {value:'06',label:'苗族'},
          {value:'07',label:'彝族'},
          {value:'08',label:'壮族'},
          {value:'09',label:'布依族'},
          {value:'10',label:'朝鲜族'},
          {value:'11',label:'满族'},
          {value:'12',label:'侗族'},
          {value:'13',label:'瑶族'},
          {value:'14',label:'白族'},
          {value:'15',label:'土家族'},
          {value:'16',label:'哈尼族'},
          {value:'17',label:'哈萨克族'},
          {value:'18',label:'傣族'},
          {value:'19',label:'黎族'},
          {value:'20',label:'傈僳族'},
          {value:'21',label:'佤族'},
          {value:'22',label:'畲族'},
          {value:'23',label:'高山族'},
          {value:'24',label:'拉祜族'},
          {value:'25',label:'水族'},
          {value:'26',label:'东乡族'},
          {value:'27',label:'纳西族'},
          {value:'28',label:'景颇族'},
          {value:'29',label:'柯尔克孜族'},
          {value:'30',label:'土族'},
          {value:'31',label:'达斡尔族'},
          {value:'32',label:'仫佬族'},
          {value:'33',label:'羌族'},
          {value:'34',label:'布朗族'},
          {value:'35',label:'撒拉族'},
          {value:'36',label:'毛难族'},
          {value:'37',label:'仡佬族'},
          {value:'38',label:'锡伯族'},
          {value:'39',label:'阿昌族'},
          {value:'40',label:'普米族'},
          {value:'41',label:'塔吉克族'},
          {value:'42',label:'怒族'},
          {value:'43',label:'乌孜别克族'},
          {value:'44',label:'俄罗斯族'},
          {value:'45',label:'鄂温克族'},
          {value:'46',label:'德昂族'},
          {value:'47',label:'保安族'},
          {value:'48',label:'裕固族'},
          {value:'49',label:'京族'},
          {value:'50',label:'塔塔尔族'},
          {value:'51',label:'独龙族'},
          {value:'52',label:'鄂伦春族'},
          {value:'53',label:'赫哲族'},
          {value:'54',label:'门巴族'},
          {value:'55',label:'珞巴族'},
          {value:'56',label:'基诺族'},
        ],
        rules: {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          die: [{ required: true, message: '请选择是否死亡', trigger: 'change' }],
          dieDate: [{ required: true, message: '请选择死亡时间', trigger: 'change' }],
        }
      };
    },
    methods: {
// 创建患者
        mitForm(formName) {
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.$confirm('是否保存当前信息?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                  }).then(() => {
              //   点击确认后向服务器传参
            if(this.ruleForm.birthday==""){
              var times=""
            }else{
               var date = new Date(this.ruleForm.birthday);  
              var times=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ; 
              if(times=="1970-1-1"){times=""}
            }
            console.log(this.ruleForm.dieDate)
               if(this.ruleForm.dieDate==""){
              var time=""
            }else{
                 var date = new Date(this.ruleForm.dieDate); 
                   var dateNumFun = (num) => num < 10 ? `0${num}` : num   
                  var time=date.getFullYear() + '-' + (dateNumFun(date.getMonth() + 1))+ '-' + dateNumFun(date.getDate()) + ' ' + dateNumFun(date.getHours())+ ':' + dateNumFun(date.getMinutes()) + ':' + dateNumFun(date.getSeconds()) ;   
                    if(time=="1970-1-1"){
                          time=""
                    }
            }
                  if(this.ruleForm.die==2){
                     var time=""
                     this.$store.state.die="2"
                }else{
                  this.$store.state.die="1"
                }
              var url=this.global.url+"/subject/addSubject?";
                  var postData=this.qs.stringify({
                          caseId:this.caseId,
                          name:this.ruleForm.name,
                          ranNum1:this.ruleForm.ranNum1,
                          ranNum2:this.ruleForm.ranNum2,
                          ranNum3:this.ruleForm.ranNum3,
                          ranNum4:this.ruleForm.ranNum4,          
                          sex:this.ruleForm.sex,
                          birthday: this.ruleForm.birthday,
                          nation: this.ruleForm.nation,
                          race: this.ruleForm.race,
                          medicalName: this.ruleForm.medicalName,
                          nationality: this.ruleForm.nationality,
                          iphone: this.ruleForm.iphone,
                          pregnancyDescribe: this.ruleForm.pregnancyDescribe,
                          weight:this.ruleForm.weight,
                          height:this.ruleForm.height,
                          die:this.ruleForm.die,
                          instructions:this.ruleForm.instructions,
                          newUnit:this.ruleForm.newUnit,
                          newTime:this.ruleForm.newTime,
                          twoTime:this.ruleForm.twoTime,
                          twoUnit:this.ruleForm.twoUnit,
                          type:this.ruleForm.type,
                          dieDate:time
                  })
                    this.$axios.post(url+postData).then((res)=>{
                      var subjectId=res.data.data
                      sessionStorage.setItem("subjectId",subjectId)
                      this.$router.push({path:"/dise",query:{subjectId:subjectId}}) 
                    })

                      this.$message({
                      type: 'success',
                      message: '保存成功!',
                      });
            
                  }).catch(() => {
                      this.$message({
                      type: 'info',
                      message: '已取消保存'
                      }); 
                  });  
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
            },
            Form(formName) {
              this.$refs[formName].resetFields();
            },
     
     
     
     
     
     
     
     
     
     
     
     
     
//---------------------------------------------详情/修改  
     newcase(){
        this.ss=false
        this.info=false
        this.mains=true
     },
     submit(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.$confirm('是否保存当前信息?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                  }).then(() => {
              //   点击确认后向服务器传参
             if(this.ruleForm.birthday==""){
              var times=""
            }else{
               var date = new Date(this.ruleForm.birthday);  
              var times=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ; 
              if(times=="1970-1-1"){times=""}
            }
            console.log(this.ruleForm.dieDate)
           if(this.ruleForm.dieDate==""){
              var time1=""
            }else{
                 var date = new Date(this.ruleForm.dieDate);  
                   var dateNumFun = (num) => num < 10 ? `0${num}` : num   
                  var time=date.getFullYear() + '-' + (dateNumFun(date.getMonth() + 1))+ '-' + dateNumFun(date.getDate()) + ' ' + dateNumFun(date.getHours())+ ':' + dateNumFun(date.getMinutes()) + ':' + dateNumFun(date.getSeconds()) ; 
                    if(time1=="1970-1-1"){
                          time1=""
                    }
            }
                  if(this.ruleForm.die==2){
                     var time1=""
                     this.$store.state.die="2"
                  }else{
                    this.$store.state.die="1"
                    }
              var url=this.global.url+"/subject/addSubject?";
              console.log(this.caseId)
                  var postData=this.qs.stringify({
                          caseId:this.caseId,
                          name:this.ruleForm.name,
                          ranNum1:this.ruleForm.ranNum1,
                          ranNum2:this.ruleForm.ranNum2,
                          ranNum3:this.ruleForm.ranNum3,
                          ranNum4:this.ruleForm.ranNum4,          
                          sex:this.ruleForm.sex,
                          birthday: this.ruleForm.birthday,
                          nation: this.ruleForm.nation,
                          race: this.ruleForm.race,
                          medicalName: this.ruleForm.medicalName,
                          nationality: this.ruleForm.nationality,
                          iphone: this.ruleForm.iphone,
                          pregnancyDescribe: this.ruleForm.pregnancyDescribe,
                          weight:this.ruleForm.weight,
                          height:this.ruleForm.height,
                          die:this.ruleForm.die,
                          instructions:this.ruleForm.instructions,
                          newUnit:this.ruleForm.newUnit,
                          newTime:this.ruleForm.newTime,
                          twoTime:this.ruleForm.twoTime,
                          twoUnit:this.ruleForm.twoUnit,
                          type:this.ruleForm.type,
                          dieDate:time1
                  })
                    this.$axios.post(url+postData).then((res)=>{
                      console.log(res)
                      var subjectId=res.data.data
                      sessionStorage.setItem("subjectId",subjectId)
                    })

                      this.$message({
                      type: 'success',
                      message: '保存成功!',
                      });
            
                  }).catch(() => {
                      this.$message({
                      type: 'info',
                      message: '已取消保存'
                      }); 
                  });  
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
     },
     get(){
         if(this.$store.state.lock=="3"){
           this.lock=false
         }
       this.save=false
         var caseId=sessionStorage.getItem("caseId")
         this.caseId=caseId
         var url=this.global.url+"/subject/selectSubject?caseId="+caseId;
         this.$axios.get(url).then((res)=>{
        console.log(res)
        if(res.data.status==200){
             this.info=false
             this.mains=true
             this.ruleForm=res.data.data
             this.ruleForm.race=JSON.stringify(res.data.data.race)
           if(res.data.data.type==null){
             this.ruleForm.type=""
           }else{
             this.ruleForm.type=JSON.stringify(res.data.data.type)
           }
            if(res.data.data.sex==null){
             this.ruleForm.sex=""
           }else{
             this.ruleForm.sex=JSON.stringify(res.data.data.sex)
           }
            if(res.data.data.die==null){
             this.ruleForm.die=""
           }else{
             this.ruleForm.die=JSON.stringify(res.data.data.die)
           }
           if(res.data.data.birthday==""){
             this.ruleForm.birthday=""
           }
          //  this.ruleForm.nation=res.data.data.nation
            res.data.data.die=="2" ? this.$store.state.die="2" : this.$store.state.die="1"
           sessionStorage.setItem("subjectId",res.data.data.id)
        }else{
          this.info=true
          this.mains=false
           this.$message.error('数据传输错误');
        }
      })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm('是否保存当前信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
        //   点击确认后向服务器传参
            if(this.ruleForm.birthday==""){
              var times=""
            }else{
               var date = new Date(this.ruleForm.birthday);  
              var times=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ; 
              if(times=="1970-1-1"){times=""}
            }
            if(this.ruleForm.dieDate==""){
              var time=""
            }else{
                 var date = new Date(this.ruleForm.dieDate);  
                  var dateNumFun = (num) => num < 10 ? `0${num}` : num   
                  var time=date.getFullYear() + '-' + (dateNumFun(date.getMonth() + 1))+ '-' + dateNumFun(date.getDate()) + ' ' + dateNumFun(date.getHours())+ ':' + dateNumFun(date.getMinutes()) + ':' + dateNumFun(date.getSeconds()) ; 
                    if(time=="1970-1-1"){
                          time=""
                    }
            }
            if(this.ruleForm.die==2){
              var time=""
              this.$store.state.die="2"
            }else{this.$store.state.die="1"}
        var url=this.global.url+"/subject/update?";
        var postData=this.qs.stringify({
              id:sessionStorage.getItem("subjectId"),
              caseId:this.caseId,
              name:this.ruleForm.name,
              ranNum1:this.ruleForm.ranNum1,
              ranNum2:this.ruleForm.ranNum2,
              ranNum3:this.ruleForm.ranNum3,
              ranNum4:this.ruleForm.ranNum4,          
              sex:this.ruleForm.sex,
              birthday: times,
              nation:this.ruleForm.nation,
              race:this.ruleForm.race,
              medicalName:this.ruleForm.medicalName,
              nationality: this.ruleForm.nationality,
              iphone: this.ruleForm.iphone,
              pregnancyDescribe: this.ruleForm.pregnancyDescribe,
              weight:this.ruleForm.weight,
              height:this.ruleForm.height,
              die:this.ruleForm.die,
              instructions:this.ruleForm.instructions,
              newUnit:this.ruleForm.newUnit,
              newTime:this.ruleForm.newTime,
              twoTime:this.ruleForm.twoTime,
              twoUnit:this.ruleForm.twoUnit,
              type:this.ruleForm.type,
              dieDate:time
        })
        this.$axios.post(url+postData).then((res)=>{
          console.log(res)
          if(res.data.status=200){
            this.$message({
                type: 'success',
                message: '修改成功!',
                });
          }else{
            this.$message.error("修改失败，数据传输错误!")
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
        this.$refs[formName].resetFields();
      }
    },
    created(){
      var nav=sessionStorage.getItem("nav")
      if(nav==1){
        this.get()
      }else{
        var caseId=sessionStorage.getItem("caseId")
        if(caseId==undefined){
               this.$message({
              showClose: true,
              message: '请先创建病例',
              type: 'error'
            });
          setTimeout(()=>{
             this.$router.push({path:"/details"})
          },2000)
        }else{
            this.caseId=caseId
        }
  
      }
    }
}
</script>
<style scoped>
.ipts{
  width:250px;margin:0 30px 0 100px;
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


