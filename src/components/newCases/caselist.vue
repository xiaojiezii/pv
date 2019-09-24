<template>
 <div>
 <!-- 打印病例html -->
     <div style="display:none;" v-for="(prt,i) of printer" :key="i">
        <div class="pranit">
         <div style="text-align:center;width:1075px;height:1566.95px;">
            <h2 style="margin-bottom:30px;">严重不良事件报告表（SAE）- {{i+1}}</h2>
            <p style="width: 90%;padding:0 40px 0 20px;display:flex;justify-content: space-between;">
                <span style="text-align: left;"> 新药临床研究批准文号： </span>
                <span>编号：</span>
            </p>
            <table border="1" cellspacing="0" cellpadding="12" width="97%" style="font-size:20px;">
                <tr>
                    <td width="21%" align="left">报告类型</td>
                    <td align="left">  
                        <span v-if="prt.type!==1">
                            <input  type="checkbox">首次报告
                        </span>
                        <span v-else>
                            <input  type="checkbox" checked=true>首次报告
                        </span>
                        <span v-if="prt.type!==2">
                            <input  type="checkbox">随访报告
                        </span>
                        <span v-else>
                            <input  type="checkbox" checked=true>随访报告
                        </span>
                        <span v-if="prt.type!==3">
                            <input  type="checkbox">总结报告
                        </span>
                        <span v-else>
                            <input  type="checkbox" checked=true>总结报告
                        </span>
                    </td>
                    <td width="35%" align="left" colspan="4">
                        报告时间：{{prt.time | filterTime }}
                    </td>
                </tr>
                <tr>
                    <td align="left">医疗机构/专业名称</td>
                    <td align="left">{{prt.siteName}}</td>
                    <td align="left" colspan="4">电话：{{prt.telephone}}</td>
                </tr>
                <tr>
                    <td align="left">申报单位名称</td>
                    <td align="left">{{prt.companyName}}</td>
                    <td align="left" colspan="4">电话：{{prt.phone}}</td>
                </tr>
                <tr>
                    <td align="left">研究监查单位名称 </td>
                    <td aligin="left"></td>
                    <td align="left" colspan="4"></td>
                </tr>
                <tr>
                    <td align="left" rowspan="2">试验用药品名称</td>
                    <td align="left" colspan="5">中文名称：{{prt.medicine}}</td>
                </tr>
                <tr>
                    <td align="left" colspan="6">英文名称：</td>
                    
                </tr>
                <tr>
                    <td align="left">药品注册分类及剂型</td>
                    <td align="left" colspan="5">
                        <p>
                            分类：
                            <span v-if="prt.product!==1">
                               <input type="checkbox">药品 
                            </span>
                            <span v-else>
                               <input type="checkbox" checked=true>药品 
                            </span>
                            <span v-if="prt.product!==2">
                               <input type="checkbox">疫苗 
                            </span>
                            <span v-else>
                               <input type="checkbox" checked=true>疫苗 
                            </span>
                            <span v-if="prt.product!==3">
                               <input type="checkbox">医疗器械 
                            </span>
                            <span v-else>
                               <input type="checkbox" checked=true>医疗器械 
                            </span>
                            <span v-if="prt.product!==4">
                               <input type="checkbox">化妆品 
                            </span>
                            <span v-else>
                               <input type="checkbox" checked=true>化妆品 
                            </span>
                            <span v-if="prt.product!==5">
                               <input type="checkbox">组合物 
                            </span>
                            <span v-else>
                               <input type="checkbox" checked=true>组合物 
                            </span>
                            <span v-if="prt.product!==6">
                               <input type="checkbox">其它 
                            </span>
                            <span v-else>
                               <input type="checkbox" checked=true>其它 
                            </span>
                        </p>
                        <p>注册分类：     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                            剂型：
                        </p>
                    </td>
                </tr>
                <tr>
                    <td align="left">临床研究分类</td>
                    <td align="left">
                        <span v-if="prt.stages!==1">
                            <input type="checkbox">Ⅰ期
                        </span>
                        <span v-else>
                            <input type="checkbox" checked=true>Ⅰ 期
                        </span>
                        <span v-if="prt.stages!==2">
                            <input type="checkbox">Ⅱ期
                        </span>
                        <span v-else>
                            <input type="checkbox" checked=true>Ⅱ 期
                        </span>
                        <span v-if="prt.stages!==3">
                            <input type="checkbox">Ⅲ 期 
                        </span>
                        <span v-else>
                            <input type="checkbox" checked=true>Ⅲ 期 
                        </span>
                        <span v-if="prt.stages!==4">
                            <input type="checkbox">Ⅳ 期
                        </span>
                        <span v-else>
                            <input type="checkbox" checked=true>Ⅳ 期
                        </span><br><br>
                        <span v-if="prt.stages!==5">
                            <input type="checkbox">生物等效性试验 
                        </span>
                        <span v-else>
                            <input type="checkbox" checked=true>生物等效性试验
                        </span>
                        <span v-if="prt.stages!==6">
                            <input type="checkbox">临床验证 
                        </span>
                        <span v-else>
                            <input type="checkbox" checked=true>临床验证
                        </span>
                    </td>
                    <td align="left"  valign="top" colspan="4">
                        临床试验适应症：{{prt.indicationNames}}
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" align="left"  valign="top" >受试者基本情况</td>
                    <td  align="left" width="35%"  valign="top">姓名拼音缩写：{{prt.subjectName}}<br></td>
                    <td align="left" width="14%" valign="top">出生日期：{{prt.birthday}}<br></td>
                    <td align="left"  width="12%" valign="top">
                        性别 <br>
                        <span v-if="prt.sex!==1">
                            <input type="checkbox">男
                        </span>
                        <span v-else>
                            <input type="checkbox" checked=true>男
                        </span>
                        <span v-if="prt.sex!==0">
                            <input type="checkbox">女
                        </span>
                        <span v-else>
                            <input type="checkbox" checked=true>女
                        </span>
                    </td>
                    <td align="left" width="11%"  valign="top">身高(cm) <br>{{prt.height}}</td>
                    <td align="left"  width="11%" valign="top">体重(Kg) <br>{{prt.weight}}</td>
                </tr>
                <tr>
                    <td colspan="6" align="left"   valign="top">
                        合并疾病及治疗：
                          <span v-if="prt.combined!==1">
                              <input type="checkbox">有 
                          </span>
                          <span v-else>
                              <input type="checkbox" checked=true>有 
                          </span>
                          <span v-if="prt.combined!==2">
                              <input type="checkbox">无 
                          </span>
                          <span v-else>
                              <input type="checkbox" checked=true>无 
                          </span>
                        <p>
                            <span v-for="(dis,i) of prt.diseases" :key="i">
                                 {{i+1}}.疾病：{{dis}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                治疗药物：             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                用法用量：
                                <br>
                            </span> 
                            
                        </p>
                    </td>
                </tr>
                <tr>
                    <td  align="left" >SAE的医学术语(诊断)</td>
                    <td align="left"   valign="top" colspan="5">{{prt.incidentNames}}</td>
                </tr>
                <tr>
                    <td align="left">SAE情况</td>
                    <td align="left"   valign="top" colspan="5">
                        <span v-if="prt.saeType!==1">
                             <input type="checkbox">死亡，  时间：
                        </span>
                        <span v-else>
                             <input type="checkbox" checked=true>死亡，  时间：{{prt.dieDate | filterTime }} 
                        </span>  <br> <br>
                        <span v-if="prt.saeType!=='2'">
                            <input type="checkbox">导致入院
                        </span>
                        <span v-else>
                            <input type="checkbox" checked=true>导致入院
                        </span>
                        <span v-if="prt.saeType!==5">
                            <input type="checkbox">功能障碍
                        </span>
                        <span v-else>
                            <input type="checkbox" checked=true>功能障碍
                        </span> <br><br>
                        <span v-if="prt.saeType!==6">
                            <input type="checkbox">先天畸形
                        </span>
                        <span v-else>
                            <input type="checkbox" checked=true>先天畸形
                        </span>
                        <span v-if="prt.saeType!==8">
                            <input type="checkbox">危及生命
                        </span>
                        <span v-else>
                            <input type="checkbox" checked=true>危及生命
                        </span>
                        <span v-if="prt.saeType!==0">
                            <input type="checkbox">其它
                        </span>
                        <span v-else>
                            <input type="checkbox" checked=true>其它
                        </span>
                    </td>
                </tr>
                <tr>
                    <td align="left">SAE发生时间： <br>
                        {{prt.dates | filterTime }}
                    <td align="left" valign="top" colspan="5">
                            研究者获知SAE时间：{{prt.dates | filterTime }}
                    </td>
                </tr>
                <tr>
                    <td align="left">对试验用药采取的措施
                    <td align="left" valign="top" colspan="5">
                        <span v-if="prt.measuress!=='1'">
                           <input type="checkbox">停药
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>停药
                        </span>
                        <span v-if="prt.measuress!=='2'">
                           <input type="checkbox">降低剂量
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>降低剂量
                        </span>
                        <span v-if="prt.measuress!=='3'">
                           <input type="checkbox">增加剂量
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>增加剂量
                        </span>
                        <span v-if="prt.measuress!=='4'">
                           <input type="checkbox">未改变剂量
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>未改变剂量
                        </span>
                        <span v-if="prt.measuress!=='0'">
                           <input type="checkbox">未知
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>未知
                        </span>
                        <span v-if="prt.measuress!=='9'">
                           <input type="checkbox">不适用
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>不适用
                        </span>
                    </td>
                </tr>
                <tr>
                    <td align="left">SAE转归
                    <td align="left" valign="top" colspan="5">
                        <span v-if="prt.results!=='1'">
                           <input type="checkbox">好转/缓解 
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>好转/缓解 
                        </span>
                        <span v-if="prt.results!=='2'">
                           <input type="checkbox">好转中/缓解
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>好转中/缓解
                        </span>
                        <span v-if="prt.results!=='3'">
                           <input type="checkbox">未见好转/未见缓解/仍在进行
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>未见好转/未见缓解/仍在进行
                        </span> <br><br>
                        <span v-if="prt.results!=='4'">
                           <input type="checkbox">好转/缓解但伴有后遗症但有
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>好转/缓解但伴有后遗症但有
                        </span>
                        <span v-if="prt.results!=='5'">
                           <input type="checkbox">致死
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>致死     
                        </span>
                        <span v-if="prt.results!=='0'">
                           <input type="checkbox">未知
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>未知
                        </span>
                    </td>
                </tr>
            </table>
            <p>第 1 页/共 2 页</p>
        </div>
        <div style="text-align:center;width:1075px;height:1566.95px;">
            <table border="1" cellspacing="0" cellpadding="15" width="97%" style="font-size:20px;table-layout:fixed;">
                <tr>
                    <td width="21%" align="left">SAE与试验药的关系</td>
                    <td align="left"> 
                          <span v-if="prt.assesss!=='肯定有关'">
                           <input type="checkbox">肯定有关 
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>肯定有关
                        </span>
                        <span v-if="prt.assesss!=='肯定无关'">
                           <input type="checkbox">肯定无关
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>肯定无关
                        </span>
                        <span v-if="prt.assesss!=='可能有关'">
                           <input type="checkbox">可能有关
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>可能有关
                        </span>
                        <span v-if="prt.assesss!=='很可能有关'">
                           <input type="checkbox">很可能有关
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>很可能有关
                        </span>
                        <span v-if="prt.assesss!=='可能无关'">
                           <input type="checkbox">可能无关
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>可能无关     
                        </span> <br><br>
                        <span v-if="prt.assesss!=='无评价'">
                           <input type="checkbox">无评价
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>无评价
                        </span>
                        <span v-if="prt.assesss!=='无法判断'">
                           <input type="checkbox">无法判断
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>无法判断
                        </span>
                        <span v-if="prt.assesss!=='未报告'">
                           <input type="checkbox">未报告
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>未报告     
                        </span>
                        <span v-if="prt.assesss!=='不明'">
                           <input type="checkbox">不明
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>不明
                        </span>
                        <span v-if="prt.assesss!=='无'">
                           <input type="checkbox">无
                        </span>
                        <span v-else>
                           <input type="checkbox" checked=true>无
                        </span>
                    </td>
                </tr>
                <tr>
                    <td align="left">SAE报道情况</td>
                    <td align="left">
                        国内： <input type="checkbox">有 
                                <input type="checkbox">无
                                <input type="checkbox">不详
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        国外： <input type="checkbox">有 
                                <input type="checkbox">无
                                <input type="checkbox">不详
                    </td>
                </tr>
                <tr style="height:1000px;">
                    <td colspan="2" align="left" valign="top" style="word-wrap:break-word;position:relative;"> 
                         SAE发生及处理的详细情况：
                            <p style="text-indent:35px;">
                                {{prt.narrate}}
                            </p>
                        <span style="position:absolute;right:20px;bottom:10px;">
                                受试者编号：
                                <span style="text-decoration:underline">
                                     &nbsp;&nbsp;&nbsp;&nbsp;{{prt.ranNum4}} 
                                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 
                        </span>
                    </td>
                </tr>
            </table>
            <p style="width:95%;display: flex;justify-content: space-between;">
                <span>报告单位：{{prt.institution}}</span>
                <span>报告人职务：{{prt.title}}</span>
                <span style="padding-right: 100px;">报告人签名：</span>
            </p>
            <p style="margin-top:200px;">第 2 页/共 2 页</p>
        </div>
     </div>
   </div>


<!-- 病例列表 -->

      <div class="crumbs" style="margin-bottom:10px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('case.cali')}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
          <div style="margin:15px;">             
               <el-button type="primary" @click="newcase" :title="$t('case.newCase')" style="width:100px" >+{{$t('case.newCase')}}</el-button>
               <el-button type="success" @click="sendcase" :title="$t('case.send')" style="width:70px;">
                   <i class="el-icon-position"></i>  {{$t('case.send')}}</el-button>
                    <el-button type="warning"  @click="print" :title="$t('case.prain')"> 
                             <i class="el-icon-printer"></i> {{$t('case.prain')}}
                   </el-button>
               <el-button type="info" @click="casedia" style="width:50px;margin-right:10px;" :title="$t('case.stat')" icon="el-icon-s-data"></el-button>
                <el-popover 
                    placement="right-start"
                    width="200"
                    trigger="manual"
                    :content="err.join(', ')"
                    v-model="visible">
                    <el-button slot="reference" @click="visible = !visible" :title="$t('case.fail')">{{$t('case.fail')}}</el-button>
                </el-popover>
                <div class="seach">
                    <el-input v-model="creatro" :placeholder="$t('case.creator')" style="width:85px;margin:0 0 0 20px"></el-input>
                    <el-input v-model="patient" :placeholder="$t('case.pat')" style="width:85px;margin:0 10px 0 10px"></el-input>
                      <div style="display:inline;margin-right:10px;">
                     <el-date-picker
                        v-model="value1"
                        type="monthrange"
                        :range-separator="$t('case.to')"
                        :start-placeholder="$t('case.staM')"
                        :end-placeholder="$t('case.endM')">
                        </el-date-picker>
                    </div>
                    <el-button style="clear:both;padding:8px 8px;" type="info" icon="el-icon-search" @click="seach">{{$t("case.sea")}}</el-button>
                </div>
          </div>
          <template>
            <el-table
             ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
      type="selection"
      width="55">
    </el-table-column>
            <el-table-column
                :label="$t('case.cre')"
                prop="username"
                width='110'>
            </el-table-column>
            <el-table-column
                :label="$t('case.patient')"
                prop="name"
                width="110">
            </el-table-column>
            <el-table-column
                :label="$t('case.num')"
                prop="num"
                width="300">
            </el-table-column>
            <el-table-column
                :label="$t('case.sta')"
                width="100"
                >
                 <template slot-scope="scope">
                     <p>{{scope.row.status | sta}}</p>
                </template>
            
            </el-table-column>
            <el-table-column
                :label="$t('case.time')"
                >
              <template slot-scope="scope">
                     <p>{{scope.row.time | filterTime }}</p>
                </template>
            </el-table-column>
            <el-table-column
                align="right"
                width="350">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handlexml(scope.row)">xml</el-button>
                    <el-button
                    size="mini"
                    v-show="scope.row.status=='1'"
                    @click="handleaudit(scope.row)">{{$t('case.shen')}}</el-button>
                    <el-button
                    size="mini"
                    v-show="scope.row.status==2 || 3"
                    @click="handleQuery(scope.row)">{{$t('case.que')}}</el-button>
                    <el-button
                    size="mini"
                    @click="handlstatus(scope.row)">{{$t('case.sta')}}</el-button>
                    <el-button
                    size="mini"
                    @click="handlemodify(scope.row)">{{$t('btn.dateils')}}</el-button>
                <el-button
                    size="mini"
                    type="danger"
                    v-show="scope.row.status!==3"
                    @click="handleDelete(scope.row)">{{$t('btn.delete')}}</el-button>
                </template>
            </el-table-column>
            </el-table>
            </template>
            <div style="margin:20px;text-align:right;">
               <el-pagination
                    :page-size="20"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    layout="prev, pager, next"
                    :total="total">
              </el-pagination>
          </div>
      </div>
      <case-dialog :casedia="caseDialog" @closeTagDialog="closecaseDialog" :siteId="sid">              
    </case-dialog>
      <status-dialog :status="statusdialog" @closeTagDialog="closestatusDialog" :caseId="cId2">              
    </status-dialog>
      <query-dialog :query="querydialog" @closeTagDialog="closequeryDialog" :caId="cId" :suo="suo">              
    </query-dialog>
 </div>
</template>
<script>
import statusDialog from "./status.dialog.vue"
import queryDialog from "./query.dialog.vue"
import caseDialog from "./case.dialog.vue"
import bus from '../common/bus';
export default {
    data(){
        return{
            printer:[], //打印病例的不良事件
            visible:false,
            querydialog:false,
            statusdialog:false,
            cId:'',
            cId2:'',
            caseDialog:false,
           url:this.global.url,
           sid:'',
           tableData: [],
           search: '',
           currentPage:1,
           total:0,
           send:[],
           suo:'',
           value1:'',
           creatro:'',
           patient:'',
           err:[],
        }
    },
    filters:{
      sta(val){
          if(val==1){
              return "数据录入"
          }else if(val==2){
              return "数据核查"
          }else if(val==3){
              return "数据锁定"
          }
      },
    },
    components:{
        caseDialog,
        statusDialog,
        queryDialog
    },
    methods: {
        // 状态弹出框
        handlstatus(row){
          this.statusdialog=true
          this.cId2=row.id
        },
        // 关闭状态弹出框
        closestatusDialog(){
            this.statusdialog=false
        },
        // 报表弹出框
        casedia(){
            this.caseDialog=true
        },
        closecaseDialog(){
            this.caseDialog=false
        },
        // 疑问弹框
        handleQuery(row){
            this.suo=row.status
            this.cId=row.id
            this.querydialog=true
        },
        closequeryDialog(){
            this.querydialog=false
        },
        // 审核按钮
        handleaudit(row){
            console.log(row.id)
             this.$confirm(this.$t('case.care2'), this.$t('case.catishi'), {
                confirmButtonText: this.$t('case.cayes'),
                cancelButtonText: this.$t('case.cano'),
                type: 'warning'
            }).then(() => {
            var url=this.global.url+"/case/update?id="+row.id;
                    url+="&status=2";
                this.$axios.post(url).then((res)=>{
                    console.log(res)
                    if(res.data.status==200){
                        this.get()
                    }else{
                        this.$message.error(this.$t('case.caerro1'))
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: this.$t('case.cadeaft1')
                });          
            }); 
        },
        get(){
           var projectId=sessionStorage.getItem("siteId")
           this.sid=projectId
           var url=this.url+"/case/getCaseList?projectId="+projectId;
               url+="&page="+this.currentPage
            this.$axios.get(url).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                    this.tableData=res.data.data.list
                }else{
                    this.$message.error(this.$t('case.caerro2'));
                }
        })
        },
        newcase(){
            var sid=this.sid
            console.log(sid)
            var nav=2
            sessionStorage.setItem("nav",nav)
            bus.$emit("nav",nav)
         this.$router.push({path:'/details',query:{sid:sid}})
        },
      //   查看按钮
          handleEdit(row) {
            var siteId=row.id
            console.log(siteId)
            sessionStorage.setItem("caseId",siteId)
            this.$router.push({path:'/patient'})
        },
    //   删除按钮
          handleDelete(row) {
           var caseId=row.id
           console.log(caseId)
            this.$confirm(this.$t('case.care3'), this.$t('case.catishi'), {
                confirmButtonText: this.$t('case.cayes'),
                cancelButtonText: this.$t('case.cano'),
                type: 'warning'
            }).then(() => {
           var url=this.global.url+"/case/delete?caseId="+caseId
           this.$axios.delete(url).then((res)=>{
               console.log(res)
               if(res.data.status==200){
                    this.$message({
                        type: 'success',
                        message: this.$t('case.casuccess3'),
                    })   
                    this.get()          
               }else{
                   this.$message.error(this.$t('case.caerro2'));
               }
           })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: this.$t('case.cadeaft2')
                });          
            });
         
         },
         handlexml(row){
             console.log(row)
            var caseId=row.id
            var userId=sessionStorage.getItem("usid")
            var url=this.global.url+"/caseToXML/selectCaseXML?caseId="+caseId;
                url+="&userId="+userId
            // this.$axios.get(url).then((res)=>{
            //     console.log(res)
            // })
            window.open(url)
         },
// 页码跳转
        handleCurrentChange: function(currentPage){
		       var projectId=sessionStorage.getItem("siteId")
               this.sid=projectId
               this.currentPage=currentPage
               var url=this.url+"/case/getCaseList?projectId="+projectId;
                   url+="&page="+this.currentPage
               this.$axios.get(url).then((res)=>{
                    console.log(res)
                   if(res.data.status==200){
                       this.tableData=res.data.data.list
                   }else{
                       this.$message.error(this.$t('case.caerro2'));
                   }
               })
          },
        // 表格复选框选中病例
        handleSelectionChange(val){
            this.send=val
        },
        // 发送病例
         sendcase(){
             this.err=[]
             console.log(this.send)
             var send=this.send
             for(var item of send){
                 var url=this.global.url+"/caseToXML/sendXML?"
                 var po=this.qs.stringify({
                     userId:sessionStorage.getItem("usid"),
                     caseIds:item.id  
                 })
                this.$axios.get(url+po).then((res)=>{
                    console.log(res)
                    if(res.data.status==200){
                        var se=res.data.data
                        console.log(se)
                        for(var it of se){
                            var file=it.name
                            var pro=it.company
                            var username=it.username
                             this.$axios.post(
                                    "https://pv.yikeen.cn:4080/rssbus/api.rsc/sendFile",
                                    {PortId:pro,File:file},
                                    {headers: { "x-rssbus-authtoken": "6e4M5k6x7H9v4u8H7t4m"}}
                                  ).then((res)=>{
                                      console.log(res)
                                      if(res.data.value.length>0){
                                           this.$message({
                                            message: `"患者" ${username} "已发送!"`,
                                            type: 'success'
                                         });
                                      }
                                }).catch(error=>{
                                    if(error.response.status!==200){
                                        this.$message.error(`${username} 发送失败!`)
                                        this.err.push(username)
                                    }  
                             })      
                        }                
                    }
                })
             }
        },
 //   打印病例
        print(){
            console.log(this.send)
           if(this.send.length>1){
               this.$message.error("只能打印单个患者病例，请勿多选！")
           }else if(this.send.length==0){
               this.$message.error("请选择病例！") 
           }else{
                const loading = this.$loading({
                    lock: true,
                    text: '正在生成中....',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.5)'
                });
               var url=this.global.url+"/sae/getSAE?caseId="+this.send[0].id
               this.$axios.get(url).then((res)=>{
                   console.log(res)
                   if(res.data.status==200){
                       this.printer=res.data.data
                       console.log(this.printer)
                       setTimeout(function(){
                            var pra=document.getElementsByClassName("pranit")
                            var pr=""
                            for(var item of pra){
                                pr+=item.innerHTML
                            }
                            var wid = window.open('blank', '_blank', 'width=500px,left=0px');
                                wid.document.write(pr);
                                setTimeout(function () {
                                    wid.print();
                                    wid.close();
                                }, 500);
                           loading.close();
                      },1500)
                   }else{
                        this.$message.error("打印失败，数据传输错误！") 
                        loading.close();
                   }
               })
           }
        },
//   搜索按钮
        seach(){
            var projectId=sessionStorage.getItem("siteId")
            var list=[]
            for(var item of this.value1){
                //  var date1 =Date.parse(new Date(item));  
                 var date1 =new Date(item);  
                  var time1=date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate() ; 
                  list.push(time1)
            }
            console.log(list)
            var url=this.global.url+"/case/getCaseList?"
            var postData=this.qs.stringify({
                projectId:projectId,
                create:this.creatro,
                name:this.patient,
                staTime:list[0],
                endTime:list[1]
            })
            this.$axios.get(url+postData).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                    this.tableData=res.data.data.list
                }
            })
            console.log(this.value1,this.creatro,this.patient)
             this.value1=""
             this.creatro=""
             this.patient=""
        }, 
//    详情按钮
         handlemodify(row){
            var caseId=row.id
            sessionStorage.setItem("caseId",caseId)
            this.$store.state.lock=row.status
            var nav=1
            bus.$emit("nav",nav)
            sessionStorage.setItem("nav",nav)
        this.$router.push({path:'/details'})
         } 
    },
    created(){
       this.get();
    //  删除sessionStorage中的值
       sessionStorage.removeItem("caseId")
       sessionStorage.removeItem("subjectId") 
       sessionStorage.removeItem("parentId")
       sessionStorage.removeItem("medicineId")
       sessionStorage.removeItem("medicineIncidentId")
    }
}
</script>
<style scoped>
.el-button{
    padding: 7px 7px;
}
.el-button+.el-button {
    margin-left: 6px;
}
.seach{
    float:right;
}
</style>


