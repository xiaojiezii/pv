<template>
 <div>
      <div class="crumbs" style="margin-bottom:10px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('inst.cen')}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
          <div style="margin:15px;">
              <el-button type="primary" @click="news" style="width:100px" >{{$t('inst.newcen')}}</el-button>       
          </div>
          <template>
            <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
            <el-table-column
                :label="$t('project.name')"
                prop="name">
            </el-table-column>
            <el-table-column
                :label="$t('case.sta')">
                <template slot-scope="scope">
                     <p>{{scope.row.status | sta}}</p>
                </template>
            </el-table-column>
            <el-table-column
                :label="$t('inst.pran')"
                prop="respo">
            </el-table-column>
            <el-table-column
                :label="$t('user.phone')"
                prop="telephone">
            </el-table-column>
            <el-table-column
                align="right">
                <template slot="header" slot-scope="scope">
                <el-input
                    v-model="search"
                    size="mini"
                    :placeholder="$t('btn.select')"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.row)">{{$t("inst.rep")}}</el-button>
                    <el-button
                    size="mini"
                    @click="handlemodify(scope.row)">{{$t('btn.dateils')}}</el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">{{$t('btn.delete')}}</el-button>
                </template>
            </el-table-column>
            </el-table>
            </template>
			<div style="font-size: 13px;float: left;margin: 27px;color: gray">
				<span>{{$t('btn.gon')}} {{total}} {{$t('btn.strip')}}</span>
			</div>
			<div style="font-size: 13px;float: right;margin: 27px;color: gray">
				<span>{{$t('btn.gon')}} {{pages}} {{$t('btn.page')}} </span>
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
      <center-dialog :center="newcenter" @closeTagDialog="closecenterDialog"></center-dialog>
      <modify-dialog :modify="modify" @closeTagDialog="closemodifyDialog" :centerId="cenId"></modify-dialog>
 </div>
</template>
<script>
import centerDialog from '../center/center.dialog'
import modifyDialog from "../center/modify.dialog.vue"
export default {
    data(){
        return{
           newcenter:false,
           cenId:"",
           modify:false,
           pager:1,
           url:this.global.url,
           tableData: [],
           search: '',
		   currentPage:1,//初始页码
		   total:0,//数据总条数
		   pages:'',//数据总页数
        }
    },
    filters:{
      sta(val){
          return val==0 ? "关闭" : "开启"
      }
    },
     components:{
       centerDialog,
       modifyDialog
    },
    methods: {
        news(){
           this.newcenter=true
        },
        closecenterDialog(){
            this.newcenter=false
        },
        closemodifyDialog(){
            this.modify=false
        },
		//页码跳转
		handleCurrentChange: function(currentPage){
		        this.currentPage = currentPage;
		        console.log(this.currentPage)
				var url=this.url
				this.$axios.get(url+"/site/selectAllSite?page="+this.currentPage).then((res)=>{
				    console.log(res)
					// console.log(pager)
				   if(res.status==200){
				       this.tableData=res.data.data.list
				   }
				})
		},
     get(){
          var url=this.url
            this.$axios.get(url+"/site/selectAllSite?page="+this.currentPage).then((res)=>{
                console.log(res)
                if(res.data.status==200){
					this.total=res.data.data.total
					this.pages=res.data.data.pages
                    this.tableData=res.data.data.list
                }
        })
     },
      //   报告者信息按钮
          handleEdit(row) {
            var siteId=row.id
			console.log(siteId)
            this.$router.push({path:'/reporter', query:{sid:siteId}})
        },
    //   删除按钮
          handleDelete(row) {
           var siteId=row.id
                    this.$confirm(this.$t('inst.indelete'), this.$t('inst.intishi'), {
                        confirmButtonText: this.$t('inst.indeyes'),
                                cancelButtonText: this.$t('inst.inno'),
                                type: 'warning'
                            }).then(() => {
                                this.$message({
                                    type: 'success',
                                    message: this.$t('inst.insuccess1'),
                                })   
           var url=this.global.url+"/site/delete?siteId="+siteId
           this.$axios.delete(url).then((res)=>{
               if(res.data.status==200){
                                this.get()
                               }
                           })
                           }).catch(() => {
                                    this.$message({
                                    type: 'info',
                                    message: this.$t('inst.indeaft1')
                                    }); 
                     });  
         },
//    编辑修改按钮
         handlemodify(row){
            this.cenId=row.id
            this.modify=true
         }
    },
    created(){
       this.get();
       console.log(this.currentPage)
    }
}
</script>
<style scoped>
.el-button--mini{
    padding:7px 10px;
}
</style>

