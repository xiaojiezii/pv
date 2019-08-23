<template>
 <div>
      <div class="crumbs" style="margin-bottom:10px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('project.pjt')}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
          
          <div style="margin:15px;">
              <el-button  type="primary" style="width:100px" @click="news">{{$t('project.njt')}}</el-button>                
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
                :label="$t('project.date')"
                >
                 <template slot-scope="scope">
                     <p>{{scope.row.time | formDate}}</p>
                </template>
            </el-table-column>
            <el-table-column
                :label="$t('project.drug')"
                prop="medicine">
            </el-table-column>
            <el-table-column
                :label="$t('project.num')"
                prop="num">
            </el-table-column>
            <el-table-column
                align="right">
                <template slot="header">
                <el-input
                :placeholder=" $t('btn.select')"
                    v-model="search"
                    size="mini"/>
                </template>
                <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleEdit(scope.row)">{{$t('btn.dateils')}}</el-button>
                <el-button
                    size="mini"
                    
                    @click="handlego(scope.row)">{{$t('project.look')}}</el-button>
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
     <demo-dialog :event="newdemos" @closeTagDialog="closeTagDialog">              
    </demo-dialog>
     <mark-dialog :mark="markDialog" @closeTagDialog="closeMarkDialog" :pujectId="this.pId">              
    </mark-dialog>
 </div>
</template>
<script>
import demoDialog from "./demo.dialog.vue"
import markDialog from "./mark.dialog.vue"
export default {
    data(){
        return{
          newdemos:false,
          markDialog:false,
           url:this.global.url,
           tableData: [],
           search: '',
           pId:'',
		   currentPage:1,//初始页码
		   total:0,//数据总条数
           pages:'',//数据总页数
        }
    },
    filters:{
         formDate: function (value) {
             if(value==null){
                 return ''
             }else{
 let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;

        return y + '-' + MM + '-' + d + ' ' ;
             }
       
      }
    },
    components:{
        demoDialog,
        markDialog
    },
      methods: {
          news(){
              this.newdemos=true;
              console.log(this.newdemos)
          },
          closeTagDialog(){
              this.newdemos=false
          },
          closeMarkDialog(){
              this.markDialog=false
          },
        get(){
            var url=this.url
                this.$axios.get(url+"/project/selectAllProjectByPage?page="+this.currentPage).then((res)=>{
                    console.log(res)
                    if(res.data.status==200){
						this.total=res.data.data.total
						this.pages=res.data.data.pages
                        this.tableData=res.data.data.list
                    }else{
                         this.$message.error('数据传输错误');
                    }
            })
        },
		//页码跳转
		handleCurrentChange: function(currentPage){
		        this.currentPage = currentPage;
		        console.log(this.currentPage)
				var url=this.url
				this.$axios.get(url+"/project/selectAllProjectByPage?page="+this.currentPage).then((res)=>{
				    console.log(res)
					// console.log(pager)
				   if(res.status==200){
				       this.tableData=res.data.data.list
				   }
				})
		},
        //   查看按钮
      handleEdit(row) {
         this.pId=row.id
         this.markDialog=true
      },
    //   编辑按钮
      handlego(row) {
          var siteId=row.id
          sessionStorage.setItem("siteId",siteId)
           this.$router.push({path:'/caselist'})
       
      },
    //   删除按钮
      handleDelete(row){
          this.$confirm(this.$t('project.prre'), this.$t('project.prtishi'), {
                confirmButtonText: this.$t('project.pryes'),
                cancelButtonText: this.$t('project.prno'),
                type: 'warning'
            }).then(() => {
                this.$message({
                type: 'success',
                message: this.$t('project.prsusuccess'),
                });
        //   点击确认后向服务器传参
              var sid=row.id
              var url=this.global.url+"/project/delete?projectId="+sid
              this.$axios.delete(url).then((res)=>{
                   if(res.data.status==200){
                       this.get();
                }else{
                    this.$message.error(this.$t('project.prerro'));
                }
         })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('project.prdeaft')
                }); 
            });  
       
      }
    },
    created(){
       this.get();
    }
}
</script>
<style scoped>
.el-button--mini{
    padding:7px 10px;
}
.el-button+.el-button {
    margin-left: 8px;
}
</style>

