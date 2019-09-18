<template>
 <div>
      <div class="crumbs" style="margin-bottom:10px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('oper.operlog')}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
        
		  <el-button style="float:right;"
			  size="mini"
			  type="danger"
			  @click="deleteAll()" :title="$t('oper.operdelete')">{{$t('btn.delete')}}</el-button>
          <template>
            <el-table
            :data="tableData.filter(data => !search || data.operation.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
            <el-table-column
                :label="$t('oper.operid')"
                prop="id" width="180">
            </el-table-column>
            <el-table-column
                :label="$t('oper.operation')"
				prop="operation">
            </el-table-column>
            <el-table-column 
               :label="$t('oper.operusername')" 
               prop="username">
            </el-table-column>
            <el-table-column
                :label="$t('oper.opertime')"
                prop="time">
            </el-table-column>
            <el-table-column :label="$t('oper.operationtime')">
                <template slot-scope="scope">
                     <p>{{scope.row.createTime | filterTime}}</p>
                </template>
            </el-table-column>
            <el-table-column
                :label="$t('oper.operip')"
                prop="ip">
            </el-table-column>
            <el-table-column
                :label="$t('oper.operinfo')"
                prop="info">
            </el-table-column>
			<!-- <el-table-column
			    label="请求方法"
			    prop="method">
			</el-table-column>
			<el-table-column
			    label="请求参数"
			    prop="params">
			</el-table-column> -->
            <el-table-column 
                align="right">
                <template slot-scope="scope">
                     <el-button 
                    size="mini"
                    @click="handlemodify(scope.row)">{{$t('btn.dateils')}}</el-button>

                </template>
            </el-table-column>
            </el-table>
            </template>
			<div style="font-size: 13px;float: left;margin: 27px;color: gray">
				<span>{{$t('btn.gon')}} {{total}} {{$t('btn.strip')}}</span>
			</div>
			<div style="font-size: 13px;float: right;margin: 27px;color: gray">
				<span>{{$t('btn.gon')}} {{pages}} {{$t('btn.page')}}</span>
			</div>
            <div style="margin:20px;text-align:right;">
				
               <el-pagination
                    :page-size="10"
					 @current-change="handleCurrentChange"
					:current-page="currentPage"
                    layout=" prev, pager, next"
                    :total="total">
              </el-pagination>
          </div>
      </div>
       <li8n-dialog :li8n="li8nDialog" @closeTagDialog="closeli8nDialog" :userId="userId">              
    </li8n-dialog>
 </div>
</template>
<script>
import li8nDialog from "./li8n.dialog"
export default {
    data(){
        return{
           li8nDialog:false,
           userId:'',
           url:this.global.url,
           tableData: [],
           search: '',
		  currentPage:1,//初始页码
		  total:0,//数据总条数
		  pages:'',//数据总页数
        }
    },
    components:{
       li8nDialog
    },
	filters:{
	  sta(val){
	      return val==0 ? "关闭" : "开启"
      },
	},

    methods: {
		//页码跳转
		handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)
				var url=this.url
				this.$axios.get(url+"/log/selectLog?page="+this.currentPage).then((res)=>{
				    console.log(res)
					// console.log(pager)
				   if(res.status==200){
				       this.tableData=res.data.data.list
				   }
				})
		},

//    编辑修改按钮
         handlemodify(row){
            this.userId=row.id
		    this.li8nDialog=true
         },
         closeli8nDialog(){
             this.li8nDialog=false
         },
        // 删除近一个月的
         deleteAll(){
              var url=this.global.url+"/log/delAMonthSys";
              this.$axios.delete(url).then((res)=>{
              console.log(res)     
          })
         },
        get(){
             var url=this.url
            this.$axios.get(url+"/log/selectLog?page="+this.currentPage).then((res)=>{
            console.log(res)
			console.log(res.data.data.total)
			console.log(res.data.data.pages)
			// console.log(pager)
           if(res.status==200){
			   this.total=res.data.data.total
			   this.pages=res.data.data.pages
               this.tableData=res.data.data.list
           }else{
               this.$message.error("数据传输错误");          
           }     
        })
        }
	},
    created(){
        this.get();
    }
}
</script>
<style scoped>

</style>


