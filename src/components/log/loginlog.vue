<template>
 <div>
      <div class="crumbs" style="margin-bottom:10px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('log.lo')}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
		  <template > 
		  <el-button style="float:right;"
			  size="mini"
			  type="danger"
			  @click="deleteAll()" :title="$t('log.mo')">{{$t('btn.delete')}}</el-button>
		  </template>
          <template>
                <el-table
                    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                    <el-table-column
                    :label="$t('log.num')"
                    prop="id">
                    </el-table-column>
                    <el-table-column
                    :label="$t('log.loname')"
                    prop="name">
                    </el-table-column>
                    <el-table-column
                    :label="$t('log.site')"
                    prop="info">
                    </el-table-column>
                    <el-table-column
                    :label="$t('log.ip')"
                    prop="ip">
                    </el-table-column>
                    <el-table-column
                    :label="$t('log.tiem')"
                    prop="time">
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
 </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
    data(){
        return{
           url:this.global.url,
           tableData: [],
           search: '',
		   currentPage:1,//初始页码
		   total:0,//数据总条数
		   pages:'',//数据总页数
        }
		multipleSelection: []
    },

    methods: {
		//页码跳转
		handleCurrentChange: function(currentPage){
		        this.currentPage = currentPage;
		        console.log(this.currentPage)
				var url=this.url
				this.$axios.get(url+"/log/selectLoginLog?page="+this.currentPage).then((res)=>{
				    console.log(res)
					// console.log(pager)
				   if(res.status==200){
				       this.tableData=res.data.data.list
				   }
				})
		},
		// 取消全选
		toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
	  
	  handleSelectionChange(rows){
		  console.log(100)
		  console.log(this.res)
		  console.log(this.tableData)
	  },

        // 删除一个月记录
        deleteAll(){
          var url=this.global.url+"/log/delAMonthAgo";
          this.$axios.delete(url).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                  this.$message("删除成功")
                  this.get();
              }else{
                  this.$message.error("无一个月之外记录");
                  
              }
          })
        },
        get(){
        var url=this.global.url
                this.$axios.get(url+"/log/selectLoginLog",{page:1}).then((res)=>{
                    console.log(res)
                if(res.status==200){
                    this.total=res.data.data.total
                    this.pages=res.data.data.pages
                    this.tableData=res.data.data.list
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


