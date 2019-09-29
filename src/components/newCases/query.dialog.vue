<template>
    <div>
     <el-dialog :title="$t('case.que')" width="60%" :visible.sync="query" :before-close="closeDialog">
        <div style="text-align:right;margin-right:15px;">
           <el-button type="primary" @click="locks" v-show="lock && suo!==3" :title="$t('case.casesta3')" style="width:100px;" >{{$t('case.casesta3')}}</el-button>
           <el-button type="primary" @click="excel" title="Excel" style="width:100px;" >Excel</el-button>
        </div>
      <div style="width:100%;margin:0 auto;">
        <template>
            <el-table
              :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
               stripe
               style="width: 100%">
             <el-table-column
                prop="reason"
                :label="$t('case.iss')"
                width="350">
             </el-table-column>
             <el-table-column
                prop="textAfter"
                :label="$t('case.ans')"
                width="400">
             </el-table-column>
             <el-table-column
                :label="$t('btn.oper')"
                width="100">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.textAfter==null" class="el-icon-edit" @click="querys(scope.row)" :title="$t('case.answer')" size="small"> {{$t('case.answer')}}</el-button>
                    <el-button v-else :title="$t('case.sol')" type="success" @click="querys(scope.row)" icon="el-icon-check">{{$t('case.sol')}}</el-button>
                </template>
             </el-table-column>
            </el-table>
        </template>
        <div style="margin:10px 20px 0 0;text-align:right;">
               <el-pagination
                    :page-size="pagesize"
                     @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    layout=" prev, pager, next"
                    :total="list.length+1">
              </el-pagination>
          </div> 



        <el-dialog width="40%" :title="$t('case.ansque')" :visible.sync="innerVisible" append-to-body>
            <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="200px" class="demo-ruleForm">
            <el-form-item :label="$t('case.ansque')+'：'" prop="reason">
                <!-- <el-input type="textarea" style="width:300px;" placeholder="请输入质疑内容" row="2" v-model="ruleForm.textBefore"></el-input> -->
                <p style="font-size:13px;color:#909399">{{ruleForm.reason}}</p>
            </el-form-item>
            <el-form-item :label="$t('case.opin')+'：'" prop="suggestion">
                <!-- <el-input type="textarea" style="width:300px;" placeholder="请输入质疑内容" row="2" v-model="ruleForm.textBefore"></el-input> -->
                <p style="font-size:13px;color:#909399">{{ruleForm.suggestion}}</p>
            </el-form-item>
            <el-form-item :label="$t('case.ttime')+'：'" prop="time">
                <el-date-picker style="width:250px;" disabled v-model="ruleForm.time"    placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('case.cause')+'：'" prop="textBefore">
                <el-input type="textarea" style="width:300px;" :placeholder="$t('case.cause')" row="2" v-model="ruleForm.textBefore"></el-input>
            </el-form-item>
            <el-form-item :label="$t('case.answ')+'：'" prop="textAfter">
                <el-input type="textarea" style="width:300px;" row="2" :placeholder="$t('case.answ')" v-model="ruleForm.textAfter"></el-input>
            </el-form-item>
            <el-form-item style="margin-left:100px;">
                 <el-button type="primary" @click="sub('ruleForm')">{{$t('case.answer')}}</el-button>
            </el-form-item>
            </el-form>
        </el-dialog>
        </div>
      </el-dialog>
    </div>
</template>


<script>
  export default {
    data() {
      return {
           currentPage:1,
           total:0,
           pages:'',
           pagesize:10,
           lock:false,
            innerVisible:false,
            ruleForm:{
                textAfter:'',
                textBefore:'',
            },
            list:[],
            rId:'',
            rules:{
                textAfter:[{ required: true, message: '请输入原因', trigger: 'blur' },],
                textBefore:[{ required: true, message: '请输入内容', trigger: 'blur' },],
            }
      }
    },
    props:[
      "query",
      "caId",
      "suo"
    ],
    watch:{
       caId(val){
           if(val!==undefined){
               this.gets()
           }
       }, 
    },
    methods:{
        // 解答疑问
       querys(row){
           var url=this.global.url+"/question/findById?id="+row.id
           this.$axios.get(url).then((res)=>{
               console.log(res)
               if(res.data.status==200){
                   this.ruleForm=res.data.data
               }
           })
           this.rId=row.id
           this.innerVisible=true
       },
    //    关闭弹出框
       closeDialog(){
           this.$parent.closequeryDialog();
       },
    // 导出excel表格
       excel(){
        // 转换excel表格的index,time,status样式
           var list=this.list
           var index=1
           for(var item of list){
              item.status==1 ? item.status="待解决" : item.status="已解决";
              item.index=index++;
              let date=new Date(item.time)
               let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                item.time=y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
           }
           this.list=list
            require.ensure([], () => {
                const { export_json_to_excel } = require('../../excel/Export2Excel');
                const tHeader = ["序号",'时间','状态','质疑疑问','意见建议','疑问原因','解答内容',];  // 设置Excel的表格第一行的标题
                const filterVal = ['index','time',"status",'reason','suggestion', 'textBefore','textAfter'];  // index、nickName、name是tableData里对象的属性
                const list = this.list;  //把data里的tableData存到list
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '质疑疑问');  //导出Excel 文件名
            })
            },
        formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
        },
        sub(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
               var url=this.global.url+"/question/updateOfEditor?";
                var postData=this.qs.stringify({
                    id:this.rId,
                    textBefore:this.ruleForm.textBefore,
                    textAfter:this.ruleForm.textAfter,
                })
           this.$axios.post(url+postData).then((res)=>{
               console.log(res)
               if(res.data.status==200){
                    this.$message({
                        type: 'success',
                        message: '解答成功!',
                     });
                   this.innerVisible=false 
                   this.gets()
               }
           })          
            } else {
                console.log('error submit!!');
                return false;
               }
            });
        },
        // 数据锁定
        locks(){
            if(this.suo!==2){   
                this.$message.error("数据尚未审核，请先进行审核！")
            }else{
            this.$confirm(this.$t('case.casuoding'), this.$t('case.catishi'), {
                confirmButtonText: this.$t('case.cayes'),
                cancelButtonText: this.$t('case.cano'),
                type: 'warning'
            }).then(() => {
               var url=this.global.url+"/case/update?id="+this.caId;
                    url+="&status=3";
                this.$axios.post(url).then((res)=>{
                    console.log(res)
                    if(res.data.status==200){
                        this.$parent.get()
                        this.$parent.closequeryDialog();      
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
            }
        },
       gets(){
        var url=this.global.url+"/question/selectAll?id="+this.caId
            // url+="&page="+this.currentPage
        this.$axios.get(url).then((res)=>{
            console.log(res)
            if(res.data.status==200){
                this.list=res.data.data
                var lo=[]
                for(var item of this.list){
                    if(item.textAfter==null){
                       lo.push(item.textAfter)
                    }  
                }
                lo.length>0 ? this.lock=false : this.lock=true
            }
        })
       },
       handleCurrentChange(currentPage){
           this.currentPage=currentPage
       },
    }
  };
</script>
<style scoped>
 /* *{margin: 0;padding: 0;} */
.customWidth{
    width:65%;
}
.query_ul{
    list-style: none;
    margin:15px auto;
    width:95%;
    padding: 10px;
}
.query_li{
    display: flex;
    padding:10px 5px;
    border-bottom:1px solid #EBEEF5; 
    justify-content: space-between;
}
.query_li:hover{
    background:#f6faff;
}
.el-dialog{
    margin-top:30vh;
}
</style>
