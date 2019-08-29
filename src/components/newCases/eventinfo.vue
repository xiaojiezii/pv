<template>
    <div>
       <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('event.evevent')}}</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
          
           <div style="font-size:20px;padding:10px; color:#777ab2;width:1200px;height:30px;border-bottom:1px solid #ececff;text-align:center;">
             <div v-show="!save && lock" style="float:left">
                 <el-button type="primary" @click="newcase" style="width:150px" >{{$t('event.evnew')}}</el-button>
             </div>
             <span>{{$t('event.evevent')}}</span>
             <div style="float:right">
                   <el-select v-model="caseIncidentId" @change="hand" :placeholder="$t('btn.selectother')">
                     <el-option
                       v-for="item in options"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
                     </el-option>
                   </el-select>
             </div>
           </div>
           <el-form v-show="mains" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="450px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item :label="$t('event.evname')" prop="name">
                    <el-input v-model="ruleForm.name" class="ipts"
                    @keyup.enter.native="queryAdminRole" :placeholder="$t('event.eventername')"></el-input>
                   <el-button type="primary" @click="search" icon="el-icon-search" circle title="点击搜索"></el-button>
                    <!-- <i class="el-icon-s-order lii" title="编写中"></i> -->
                     
                </el-form-item>
<!-- 创建 -->
               <el-form-item :label="$t('event.evdate')" prop="date" v-if="save">
                    <el-date-picker class="ipts" v-model="ruleForm.date" 
                    value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                     :placeholder="$t('btn.entime')"></el-date-picker>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
<!-- 修改 -->
               <el-form-item :label="$t('event.evdate')" prop="date" v-else>
                    <el-date-picker class="ipts" v-model="ruleForm.date" :placeholder="$t('btn.entime')"></el-date-picker>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               
                <el-form-item :label="$t('event.evmeddraVersions')" prop="meddraVersions">
                    <el-input v-model="ruleForm.meddraVersions" class="ipts" :disabled="true" placeholder="请输入版本"></el-input>
                    <el-tooltip :content="$t('tishi.Q1')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('event.evmeddraNum')" prop="meddraNum">
                    <el-input v-model="ruleForm.meddraNum" class="ipts" :disabled="true" :placeholder="$t('event.eventer')"></el-input>
                    <el-tooltip :content="$t('tishi.Q2')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                  <el-form-item :label="$t('event.ret')" prop="reporterTerm">
                    <el-select v-model="ruleForm.reporterTerm" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('event.r1')" value="1"></el-option>
                       <el-option :label="$t('event.r2')" value="2"></el-option>                       
                       <el-option :label="$t('event.r3')" value="3"></el-option>
                       <el-option :label="$t('event.r4')" value="4"></el-option>                       
                    </el-select>
                    <el-tooltip :content="$t('tishi.Q3')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>


   <!-- 创建 -->
                <el-form-item :label="$t('event.evstartTime')" prop="startTime" v-if="save">
                    <el-date-picker class="ipts"
                    value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                     v-model="ruleForm.startTime"    :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.Q4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
    <!-- 修改 -->
                <el-form-item :label="$t('event.evstartTime')" prop="startTime" v-else v-show="ss">
                    <el-date-picker class="ipts" v-model="ruleForm.startTime"    :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.Q4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
				<el-form-item :label="$t('event.evstartTime')" prop="startTime" v-show="!ss">
				    <el-date-picker class="ipts" value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
					v-model="ruleForm.startTime"    :placeholder="$t('btn.entime')"></el-date-picker>
				    <el-tooltip :content="$t('tishi.Q4')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
				</el-form-item>
<!-- 创建 -->
                <el-form-item :label="$t('event.evendTime')" prop="endTime" v-if="save">
                    <el-date-picker class="ipts"
                    value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
                     v-model="ruleForm.endTime"    :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.Q5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
<!-- 修改 -->
                <el-form-item :label="$t('event.evendTime')" prop="endTime" v-else v-show="ss">
                    <el-date-picker class="ipts" v-model="ruleForm.endTime"    :placeholder="$t('btn.entime')"></el-date-picker>
                    <el-tooltip :content="$t('tishi.Q5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
				<el-form-item :label="$t('event.evendTime')" prop="endTime" v-show="!ss">
				    <el-date-picker class="ipts" value-format=" yyyy-MM-dd" format="yyyy-MM-dd"
					v-model="ruleForm.endTime"    :placeholder="$t('btn.entime')"></el-date-picker>
				    <el-tooltip :content="$t('tishi.Q5')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
				</el-form-item>
				
                <el-form-item :label="$t('event.evallTime')" prop="allTime">
                    <el-input v-model="ruleForm.allTime" class="ipts" type="number" :placeholder="$t('btn.enter')"></el-input>
                    <el-tooltip :content="$t('tishi.Q6')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('event.evallTimeUnit')" prop="allTimeUnit">
                    <el-select v-model="ruleForm.allTimeUnit" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('event.evallTimeUnit1')" value="1"></el-option>
                       <el-option :label="$t('event.evallTimeUnit2')" value="2"></el-option>                       
                       <el-option :label="$t('event.evallTimeUnit3')" value="3"></el-option>
                       <el-option :label="$t('event.evallTimeUnit4')" value="4"></el-option>                       
                       <el-option :label="$t('newList.listage6')" value="5"></el-option>
                       <el-option :label="$t('newList.listage7')" value="6"></el-option>                      
                    </el-select>
                    <el-tooltip :content="$t('tishi.Q7')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('event.evlanguage')" prop="language">
                    <el-select v-model="ruleForm.language" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('event.evlanguage1')" value="1"></el-option>
                       <el-option :label="$t('event.evlanguage2')" value="2"></el-option>                                             
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('event.evisDie')" prop="isDie">
                    <el-select v-model="ruleForm.isDie" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('event.evisDie1')" value="1"></el-option>
                       <el-option :label="$t('event.evisDie2')" value="2"></el-option>                                             
                    </el-select>
                    <el-tooltip :content="$t('tishi.Q8')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('event.evisLife')" prop="isLife">
                    <el-select v-model="ruleForm.isLife" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('event.evisLife1')" value="1"></el-option>
                       <el-option :label="$t('event.evisLife2')" value="2"></el-option>                                             
                    </el-select>
                    <el-tooltip :content="$t('tishi.Q9')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>

                <el-form-item :label="$t('event.evisHospital')" prop="isHospital">
                    <el-select v-model="ruleForm.isHospital" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('event.evisHospital1')" value="1"></el-option>
                       <el-option :label="$t('event.evisHospital2')" value="2"></el-option>                                             
                    </el-select>
                    <el-tooltip :content="$t('tishi.Q9')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>

                <el-form-item :label="$t('event.isDisability')" prop="isDisability">
                    <el-select v-model="ruleForm.isDisability" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('event.evverify1')" value="1"></el-option>
                       <el-option :label="$t('event.evverify2')" value="2"></el-option>                                             
                    </el-select>
                    <el-tooltip :content="$t('tishi.Q9')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('event.isCongenital')" prop="isCongenital">
                    <el-select v-model="ruleForm.isCongenital" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('event.evverify1')" value="2"></el-option>                                             
                       <el-option :label="$t('event.evverify2')" value="1"></el-option>
                    </el-select>
                    <el-tooltip :content="$t('tishi.Q9')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('event.isOther')" prop="isOther">
                    <el-select v-model="ruleForm.isOther" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('event.evverify1')" value="1"></el-option>
                       <el-option :label="$t('event.evverify2')" value="2"></el-option>                                             
                    </el-select>
                    <el-tooltip :content="$t('tishi.Q9')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>


                <el-form-item :label="$t('event.evresult')" prop="result">
                    <el-select v-model="ruleForm.result" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('event.evresult1')" value="1"></el-option>
                       <el-option :label="$t('event.evresult2')" value="2"></el-option>                                             
                       <el-option :label="$t('event.evresult3')" value="3"></el-option>
                       <el-option :label="$t('event.evresult4')" value="4"></el-option>                                             
                       <el-option :label="$t('event.evresult5')" value="5"></el-option>                                            
                       <el-option :label="$t('event.evresult6')" value="0"></el-option>                                            
                    </el-select>
                    <el-tooltip :content="$t('tishi.Q10')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>

                <el-form-item :label="$t('event.evverify')" prop="verify">
                    <el-select v-model="ruleForm.verify" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('event.evverify1')" value="1"></el-option>
                       <el-option :label="$t('event.evverify2')" value="2"></el-option>                                             
                    </el-select>
                    <el-tooltip :content="$t('tishi.Q11')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('event.evsource')" prop="source">
                    <el-select v-model="ruleForm.source" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('event.evsource1')" value="1"></el-option>
                       <el-option :label="$t('event.evsource2')" value="2"></el-option>                                             
                    </el-select>
                    <el-tooltip :content="$t('tishi.Q12')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('event.evmethod')" prop="method">
                    <el-select v-model="ruleForm.method" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('event.evmethod1')" value="1"></el-option>
                       <el-option :label="$t('event.evmethod2')" value="2"></el-option>                                             
                       <el-option :label="$t('event.evmethod3')" value="3"></el-option>                                             
                    </el-select>
                    <el-tooltip :content="$t('tishi.Q13')" placement="right-start" effect="light">
                       <i class="el-icon-s-order lii"></i>
                     </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('event.evassess')" prop="assess">
                    <el-select v-model="ruleForm.assess" :placeholder="$t('btn.selects')" class="ipts">
                       <el-option :label="$t('event.evassess1')" value="1"></el-option>
                       <el-option :label="$t('event.evassess2')" value="2"></el-option>                                             
                       <el-option :label="$t('event.evassess3')" value="3"></el-option>                                             
                       <el-option :label="$t('event.evassess4')" value="4"></el-option>                                             
                       <el-option :label="$t('event.evassess5')" value="5"></el-option>                                             
                       <el-option :label="$t('event.evassess6')" value="6"></el-option>                                             
                       <el-option :label="$t('event.evassess7')" value="7"></el-option>                                             
                       <el-option :label="$t('event.evassess8')" value="8"></el-option>                                             
                       <el-option :label="$t('event.evassess9')" value="9"></el-option>                                            
                       <el-option :label="$t('event.evassess10')" value="10"></el-option>                                                                                      
                    </el-select>
                      <el-button v-show="lock" v-if="slock==2" type="primary" class="el-icon-magic-stick" @click="querys" title="提出质疑" round>{{$t('event.evzhiyi')}}</el-button>
                </el-form-item>



<!-- 创建 -->
               <el-form-item style="margin:30px 0 0 50px;" v-if="save">
                  <el-button type="primary" @click="mitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                  <el-button type="success" @click="submitForm('ruleForm')">{{$t('project.ch')}}</el-button>
                  <el-button @click="Form">{{$t('btn.next')}}</el-button>
               </el-form-item>
 <!-- 修改按钮 -->
            <el-form-item style="margin:30px 0 0 50px;" v-else v-show="ss && lock">
                <el-button type="primary" @click="submitForm('ruleForm')">{{$t('btn.save')}}</el-button>
                <el-button type="danger" @click="handleDelete('ruleForm')" v-show="sc">{{$t('btn.delete')}}</el-button>
            </el-form-item>
                <el-form-item style="margin:50px 0 0 50px;" v-show="!ss && lock">
                <el-button type="primary" @click="submit('ruleForm')">{{$t('btn.save')}}</el-button>
            </el-form-item>
            </el-form>
              <div style="width:1200px;font-size: 30px;color: #777;margin: 30px auto;text-align:center;" v-show="info">
                    <div style="margin-bottom:30px; line-height: 1;
                         font-size: 60px;font-weight: bolder;color: #2d8cf0;">很<span style="color:#00a854;">抱</span>歉</div>
                    暂无数据请创建
              </div>
       </div>
      <pjc-dialog :event="pjcDialog" @closeTagDialog="closeTagDialog" @hand="fn($event)" :name="ruleForm.name">
       </pjc-dialog>
      <event-dialog :events="eventdilog" @closeTagDialog="closeeventDialog" :caseId="caseId">
       </event-dialog>
    </div>
</template>
<script>
import pjcDialog from "./pjc.dialog.vue"
import eventDialog from "./event.dialog.vue"
export default {
    data() {
      return {
          slock:'',//数据核查
          lock:true,
          eventdilog:false,
          mains:true,
          pjcDialog:false,
          info:false,
          caseId:"",   //病例ID
          save:true,
		  ss:true,//新建和修改的切换
          sc:true,//删除按钮，如果数据少于两条就会隐藏
          is:"",//修改id
        ruleForm: {
          name:'',
          date:'',
          meddraVersions:'18.1',
          meddraNum:'',
          reporterTerm:'',
          startTime:'',
          endTime:'',
          allTime:'',
          allTimeUnit:'',
          language:'',
          isDie:'',
          isLife:'',
          isHospital:'',
          isDisability:'',
          isCongenital:'',
          isOther:'',
          result:'',
          verify:'',
          source:'',
          method:'',
          assess:'',
        },
        rules: {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          meddraVersions: [{ required: true, message: '请输入版本号', trigger: 'blur' }],
          meddraNum: [{ required: true, message: '请输入编号', trigger: 'blur' }],
          date:[{required: true, message: '请选择日期', trigger: 'change'}],
          language:[{ required: true, message: '请选择语言', trigger: 'change' }],
          isDie:[{ required: true, message: '请选择', trigger: 'change' }],
          isDisability:[{ required: true, message: '请选择', trigger: 'change' }],
          isCongenital:[{ required: true, message: '请选择', trigger: 'change' }],
          isOther:[{ required: true, message: '请选择', trigger: 'change' }],
          isLife:[{ required: true, message: '请选择', trigger: 'change' }],
          isHospital:[{ required: true, message: '请选择', trigger: 'change' }],
          result:[{ required: true, message: '请选择结果', trigger: 'change' }],
        },
		options: [],
		 caseIncidentId:""
      };
    },
    methods: {
        // 搜索名称
        queryAdminRole(){
            this.pjcDialog=true
        },
        search(){
            this.pjcDialog=true
  
        },
        closeTagDialog(){
            this.pjcDialog=false
        },
        fn(msg){
            this.ruleForm.meddraNum=msg.id
            this.ruleForm.name=msg.name
        },
      mitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('event.evre'), this.$t('event.evtishi'), {
                confirmButtonText: this.$t('event.evyes'),
                cancelButtonText: this.$t('event.evno'),
                type: 'warning'
            }).then(() => {
               
        //   点击确认后向服务器传参
             var url=this.global.url+"/caseIncident/addCaseIncident?"
             var postData=this.qs.stringify({
                    caseId:this.caseId, 
                    name:this.ruleForm.name,
                    date:this.ruleForm.date,
                    meddraVersions:this.ruleForm.meddraVersions,
                    meddraNum:this.ruleForm.meddraNum,
                    startTime:this.ruleForm.startTime,
                    endTime:this.ruleForm.endTime,
                    allTime:this.ruleForm.allTime,
                    allTimeUnit:this.ruleForm.allTimeUnit,
                    language:this.ruleForm.language,
                    isDie:this.ruleForm.isDie,
                    isLife:this.ruleForm.isLife,
                    isHospital:this.ruleForm.isHospital,
                    result:this.ruleForm.result,
                    verify:this.ruleForm.verify,
                    source:this.ruleForm.source,
                    method:this.ruleForm.method,
                    assess:this.ruleForm.assess,
                    isDisability:this.ruleForm.isDisability,
                    isCongenital:this.ruleForm.isCongenital,
                    isOther:this.ruleForm.isOther,
                    reporterTerm:this.ruleForm.reporterTerm, 
             })
             this.$axios.post(url+postData).then((res)=>{
                 if(res.data.status==200){
                        this.$message({
                            type: 'success',
                            message: this.$t('event.evsuccess'),
                         });
                         this.option()
                     
                  }else{
                     this.$message.error(this.$t('event.everro'));
                     
                  }
             })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('event.evdeaft')
                }); 
            });  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      Form() { 
        this.$router.push({path:"/laboratory"})
      },
      option(){
           var url=this.global.url+"/caseIncident/selectCaseIncident?caseId="+this.caseId;
          this.$axios.get(url).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                this.options=res.data.data   
              }else{
                  this.$message.error(this.$t('event.everro'))
              }
          })
      },



//事件评估提出质疑按钮
    querys(){
        this.eventdilog=true
    }, 
// 关闭弹窗
    closeeventDialog(){
        this.eventdilog=false
    },



//---------------------------------------------------修改
	  // 新建反应事件
	  newcase(){
              this.ss=false
              this.info=false
              this.mains=true
	          this.resetForm('ruleForm')
	      },
	       submit(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	             this.$confirm(this.$t('event.evre'), this.$t('event.evtishi'), {
	                confirmButtonText: this.$t('event.evyes'),
	                cancelButtonText: this.$t('event.evno'),
	                type: 'warning'
	            }).then(() => {
	        //   点击确认后向服务器传参
	        var url=this.global.url+"/caseIncident/addCaseIncident?"
	        var postData=this.qs.stringify({
	             caseId:this.caseId, 
	             name:this.ruleForm.name,
	             date:this.ruleForm.date,
	             meddraVersions:this.ruleForm.meddraVersions,
	             meddraNum:this.ruleForm.meddraNum,
	             startTime:this.ruleForm.startTime,
	             endTime:this.ruleForm.endTime,
	             allTime:this.ruleForm.allTime,
	             allTimeUnit:this.ruleForm.allTimeUnit,
	             language:this.ruleForm.language,
	             isDie:this.ruleForm.isDie,
	             isLife:this.ruleForm.isLife,
	             isHospital:this.ruleForm.isHospital,
	             result:this.ruleForm.result,
	             verify:this.ruleForm.verify,
	             source:this.ruleForm.source,
	             method:this.ruleForm.method,
                 assess:this.ruleForm.assess,
                 isDisability:this.ruleForm.isDisability,
                isCongenital:this.ruleForm.isCongenital,
                isOther:this.ruleForm.isOther,
                reporterTerm:this.ruleForm.reporterTerm, 
	        })
	        this.$axios.post(url+postData).then((res)=>{
	          console.log(res)
	          if(res.data.status==200){
                //   this.$router.go(0)
                 this.$message({
                    type: 'success',
                    message: this.$t('event.evsuccess'),
                  });
                  this.get()
	          }
	        })
	            }).catch(() => {
	                this.$message({
	                type: 'info',
	                message: this.$t('event.evdeaft')
	                }); 
	            });
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
		  // 选择框
	      hand(){
	        console.log(this.caseIncidentId)
	        var url=this.global.url+"/caseIncident/selectCaseIncidentById?caseIncidentId="+this.caseIncidentId;
	        this.$axios.get(url).then((res)=>{
	          console.log(res)
	          if(res.data.status==200){
                this.ruleForm=res.data.data
                this.id=res.data.data.id
                console.log(this.id)
				if(res.data.data.allTimeUnit==null){
					 this.ruleForm.allTimeUnit="";
				}else{
					this.ruleForm.allTimeUnit=JSON.stringify(res.data.data.allTimeUnit)
        }
        if(res.data.data.reporterTerm==null){
          this.ruleForm.reporterTerm="";
        }else{
					this.ruleForm.reporterTerm=JSON.stringify(res.data.data.reporterTerm)
        }
				if(res.data.data.assess==null){
					 this.ruleForm.assess="";
				}else{
					this.ruleForm.assess=JSON.stringify(res.data.data.assess)
				}
				if(res.data.data.source==null){
					 this.ruleForm.source="";
				}else{
					this.ruleForm.source=JSON.stringify(res.data.data.source)
				}
				if(res.data.data.verify==null){
					 this.ruleForm.verify="";
				}else{
					this.ruleForm.verify=JSON.stringify(res.data.data.verify)
        }
        if(res.data.data.isDie==null){
          this.ruleForm.isDie="";
        }else{
        this.ruleForm.isDie=JSON.stringify(res.data.data.isDie)
        }
        if(res.data.data.isHospital==null){
          this.ruleForm.isHospital="";
        }else{
        this.ruleForm.isHospital=JSON.stringify(res.data.data.isHospital)
        }
        if(res.data.data.isLife==null){
          this.ruleForm.isLife="";
        }else{
        this.ruleForm.isLife=JSON.stringify(res.data.data.isLife)
        }
        if(res.data.data.language==null){
          this.ruleForm.language="";
        }else{
        this.ruleForm.language=JSON.stringify(res.data.data.language)
        }
        if(res.data.data.isDisability==null){
          this.ruleForm.isDisability="";
        }else{
        this.ruleForm.isDisability=JSON.stringify(res.data.data.isDisability)
        }
        if(res.data.data.isCongenital==null){
          this.ruleForm.isCongenital="";
        }else{
        this.ruleForm.isCongenital=JSON.stringify(res.data.data.isCongenital)
        }
        if(res.data.data.isOther==null){
          this.ruleForm.isOther="";
        }else{
        this.ruleForm.isOther=JSON.stringify(res.data.data.isOther)
        }
        
	          }
	        })
	      },
		  // 删除事件
		  handleDelete(){
		  		  this.save=false;
		  		           this.$confirm(this.$t('event.evdelete'), this.$t('event.evtishi'), {
                                 confirmButtonText: this.$t('event.evdeyes'),
		  		                       cancelButtonText: this.$t('event.evno'),
		  		                       type: 'warning'
		  		                   }).then(() => {
                                         this.$message({
                                             type: 'success',
		  		                           message: this.$t('event.evsuccess1'),
		  		                       })   
		  		  var url=this.global.url+"/caseIncident/delete?caseIncidentId="+this.id
		  		  this.$axios.delete(url).then((res)=>{
		  		      if(res.data.status==200){
		  		                       this.get()
                                        }
                                    })
		  		                  }).catch(() => {
		  		                           this.$message({
		  		                           type: 'info',
		  		                           message: this.$t('event.evdeaft1')
		  		                           }); 
		  		            });  
		  },
      get(){
          this.slock=sessionStorage.getItem("lock")
          if(this.slock==3){
           this.lock=false
         }
          this.save=false;
          var url=this.global.url+"/caseIncident/selectCaseIncident?caseId="+this.caseId;
          this.$axios.get(url).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                  if(res.data.data.length==0){
                      this.info=true
                      this.mains=false
                  }else if(res.data.data.length==1){
                     this.sc=false
                     this.info=false
                     this.mains=true
                      this.ruleForm=res.data.data[0] 
                      this.id=res.data.data[0].id
                    if(res.data.data[0].allTimeUnit==null){
                      this.ruleForm.allTimeUnit="";
                    }else{
                      this.ruleForm.allTimeUnit=JSON.stringify(res.data.data[0].allTimeUnit)
                    }
                    if(res.data.data[0].reporterTerm==null){
                      this.ruleForm.reporterTerm="";
                    }else{
                      this.ruleForm.reporterTerm=JSON.stringify(res.data.data[0].reporterTerm)
                    }
                    if(res.data.data[0].assess==null){
                      this.ruleForm.assess="";
                    }else{
                      this.ruleForm.assess=JSON.stringify(res.data.data[0].assess)
                    }
                    if(res.data.data[0].source==null){
                      this.ruleForm.source="";
                    }else{
                      this.ruleForm.source=JSON.stringify(res.data.data[0].source)
                    }
                    if(res.data.data[0].verify==null){
                      this.ruleForm.verify="";
                    }else{
                      this.ruleForm.verify=JSON.stringify(res.data.data[0].verify)
                    }
                    if(res.data.data[0].isDie==null){
                      this.ruleForm.isDie="";
                    }else{
                    this.ruleForm.isDie=JSON.stringify(res.data.data[0].isDie)
                    }
                    if(res.data.data[0].isHospital==null){
                      this.ruleForm.isHospital="";
                    }else{
                    this.ruleForm.isHospital=JSON.stringify(res.data.data[0].isHospital)
                    }
                    if(res.data.data[0].isLife==null){
                      this.ruleForm.isLife="";
                    }else{
                    this.ruleForm.isLife=JSON.stringify(res.data.data[0].isLife)
                    }
                    if(res.data.data[0].language==null){
                      this.ruleForm.language="";
                    }else{
                    this.ruleForm.language=JSON.stringify(res.data.data[0].language)
                    }
                    if(res.data.data[0].isDisability==null){
                      this.ruleForm.isDisability="";
                    }else{
                    this.ruleForm.isDisability=JSON.stringify(res.data.data[0].isDisability)
                    }
                    if(res.data.data[0].isCongenital==null){
                      this.ruleForm.isCongenital="";
                    }else{
                    this.ruleForm.isCongenital=JSON.stringify(res.data.data[0].isCongenital)
                    }
                    if(res.data.data[0].isOther==null){
                      this.ruleForm.isOther="";
                    }else{
                    this.ruleForm.isOther=JSON.stringify(res.data.data[0].isOther)
                    }
                    
                    
                  this.options=res.data.data
                  }else{
                       this.sc=true
                       this.ss=true
                     this.info=false
                     this.mains=true
                      this.ruleForm=res.data.data[0] 
                     this.id=res.data.data[0].id
                     this.caseIncidentId=res.data.data[0].name
                    if(res.data.data[0].allTimeUnit==null){
                      this.ruleForm.allTimeUnit="";
                    }else{
                      this.ruleForm.allTimeUnit=JSON.stringify(res.data.data[0].allTimeUnit)
                    }
                    if(res.data.data[0].reporterTerm==null){
                      this.ruleForm.reporterTerm="";
                    }else{
                      this.ruleForm.reporterTerm=JSON.stringify(res.data.data[0].reporterTerm)
                    }
                    if(res.data.data[0].assess==null){
                      this.ruleForm.assess="";
                    }else{
                      this.ruleForm.assess=JSON.stringify(res.data.data[0].assess)
                    }
                    if(res.data.data[0].source==null){
                      this.ruleForm.source="";
                    }else{
                      this.ruleForm.source=JSON.stringify(res.data.data[0].source)
                    }
                    if(res.data.data[0].verify==null){
                      this.ruleForm.verify="";
                    }else{
                      this.ruleForm.verify=JSON.stringify(res.data.data[0].verify)
                    }
                    if(res.data.data[0].isDie==null){
                      this.ruleForm.isDie="";
                    }else{
                    this.ruleForm.isDie=JSON.stringify(res.data.data[0].isDie)
                    }
                    if(res.data.data[0].isHospital==null){
                      this.ruleForm.isHospital="";
                    }else{
                    this.ruleForm.isHospital=JSON.stringify(res.data.data[0].isHospital)
                    }
                    if(res.data.data[0].isLife==null){
                      this.ruleForm.isLife="";
                    }else{
                    this.ruleForm.isLife=JSON.stringify(res.data.data[0].isLife)
                    }
                    if(res.data.data[0].language==null){
                      this.ruleForm.language="";
                    }else{
                    this.ruleForm.language=JSON.stringify(res.data.data[0].language)
                    }
                    if(res.data.data[0].isDisability==null){
                      this.ruleForm.isDisability="";
                    }else{
                    this.ruleForm.isDisability=JSON.stringify(res.data.data[0].isDisability)
                    }
                    if(res.data.data[0].isCongenital==null){
                      this.ruleForm.isCongenital="";
                    }else{
                    this.ruleForm.isCongenital=JSON.stringify(res.data.data[0].isCongenital)
                    }
                    if(res.data.data[0].isOther==null){
                      this.ruleForm.isOther="";
                    }else{
                    this.ruleForm.isOther=JSON.stringify(res.data.data[0].isOther)
                    }
                  this.options=res.data.data
                  }
              }
          })
      },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$confirm(this.$t('event.evre'), this.$t('event.evtishi'), {
                    confirmButtonText: this.$t('event.evyes'),
                    cancelButtonText: this.$t('event.evno'),
                    type: 'warning'
                }).then(() => {
                 
            //   点击确认后向服务器传参
                  var date = new Date(this.ruleForm.date);  
                  var time=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() ; 
                  if(time=="1970-1-1"){time=""}

                  if(this.ruleForm.startTime==""){
                      var time1=""
                  }else{
                    var date1 = new Date(this.ruleForm.startTime);  
                    var time1=date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate() ; 
                    if(time1=="1970-1-1"){time1=""}
                  }
                   if(this.ruleForm.endTime==""){
                      var time2=""
                  }else{
                   var date2 = new Date(this.ruleForm.endTime);  
                  var time2=date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() ; 
                  if(time2=="1970-1-1"){time2=""}
                  }
                  
                  var url=this.global.url+"/caseIncident/update?"
                  console.log(this.id)
                  var  postData=this.qs.stringify({
                        id:this.id,
                        name:this.ruleForm.name,
                        date:time,
                        meddraVersions:this.ruleForm.meddraVersions,
                        meddraNum:this.ruleForm.meddraNum,
                        startTime:time1,
                        endTime:time2,
                        allTime:this.ruleForm.allTime,
                        allTimeUnit:this.ruleForm.allTimeUnit,
                        language:this.ruleForm.language,
                        isDie:this.ruleForm.isDie,
                        isLife:this.ruleForm.isLife,
                        isHospital:this.ruleForm.isHospital,
                        result:this.ruleForm.result,
                        verify:this.ruleForm.verify,
                        source:this.ruleForm.source,
                        method:this.ruleForm.method,
                        assess:this.ruleForm.assess,
                         isDisability:this.ruleForm.isDisability,
                            isCongenital:this.ruleForm.isCongenital,
                            isOther:this.ruleForm.isOther,
                            reporterTerm:this.ruleForm.reporterTerm, 
                  })
                  this.$axios.post(url+postData).then((res)=>{
                      console.log(res)
                    if(res.data.status==200){
                         this.$message({
                            type: 'success',
                            message: this.$t('event.evsuccess'),
                          });
                      this.option()
                    }else{
                      this.$message.error(this.$t('event.everro1'))
                    }
                  })
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: this.$t('event.evdeaft')
                    }); 
                });  
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
        var nav=sessionStorage.getItem("nav");
        if(nav==1){
            this.caseId=sessionStorage.getItem("caseId")
            this.get()
        }else{
             var caseId=sessionStorage.getItem("caseId")
            if(caseId==undefined){
               this.$message({
              showClose: true,
              message: this.$t('event.evsecond'),
              type: 'error'
            });
            setTimeout(()=>{
             this.$router.push({path:"/details"})
            },2000)
           }else{
            this.caseId=caseId
            this.option()
        }
        }
    },
    components:{
        pjcDialog,
        eventDialog
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



    
