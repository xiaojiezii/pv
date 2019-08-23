<template>
 <div>
      <div class="crumbs" style="margin-bottom:10px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('send.sendlist')}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
          <div style="margin:15px;" v-show="save">
                 <el-button type="primary" @click="newsend" style="width:100px" >{{$t('send.sendcreate')}}</el-button>    
          </div>
          <template>
            <el-table
            :data="tableData">
            <el-table-column
                :label="$t('send.sendname')"
                prop="lastname">
            </el-table-column>
            <el-table-column
                :label="$t('send.sendtype')"
                prop="type">
                 <template slot-scope="scope">
                     <p>{{scope.row.type | types}}</p>
                </template>
            </el-table-column>
            <el-table-column
                :label="$t('send.sendorg')"
                prop="institution">
            </el-table-column>
            <el-table-column
                :label="$t('send.sendphone')"
                prop="phone">
            </el-table-column>
            <el-table-column 
                align="right">
                
                <template slot-scope="scope">
                     <el-button
                    size="mini"
                    @click="handlemodify(scope.row)">{{$t('btn.edtiot')}}</el-button>      
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">{{$t('btn.delete')}}</el-button>
                </template>
            </el-table-column>
            </el-table>
            </template>
           
      </div>
 </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            save:true,
           tableData: [],
           search: '',
		   url:this.global.url,
        }
    },
    filters:{
        types(val){
            if(val==1){
                return "制药公司"
            }else if(val==2){
                return "监管机构"
            }else if(val==3){
                return "医疗保健专业人士"
            }else if(val==4){
                return "地区药物警戒中心"
            }else if(val==5){
                return "WHO国际药物监测中心"
            }else if(val==6){
                return "其他(例如:经销商或其他机构)"
            }else if(val==7){
                return "患者/消费者"
            }
        }
    },
    methods: {
        // 获取列表数据
        get(){
			var userId=sessionStorage.getItem("userId")
			console.log(userId)
             var url=this.url
             this.$axios.get(url+"/sender/selectSender?userId="+userId).then((res)=>{
                 console.log(res)
                if(res.data.status==200){
                    this.save=false
                    this.tableData.push(res.data.data)
                  }   
             })
        },
        newsend(){
			var userId=this.$route.query.userId
			console.log(userId)
           this.$router.push({path:"/newsend",query:{userId:userId}})
        },
       //  删除按钮
          handleDelete(row) {
           var id=row.id
                   this.$confirm(this.$t('send.senddelete'), this.$t('send.sendtishi'), {
                       confirmButtonText: this.$t('send.sendyes'),
                cancelButtonText: this.$t('send.sendno'),
                type: 'warning'
            }).then(() => {
                var url=this.global.url+"/sender/delete?senderId="+id
                this.$axios.delete(url).then((res)=>{
		       console.log(res)
                 if(res.data.status==200){
                    this.$message({
                type: 'success',
                message: this.$t('send.senddesuccess'),
                });
                this.$router.go(0)
                 }
                })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('send.senddeexit')
                }); 
            });  
          
         },
//    编辑修改按钮
         handlemodify(row){
			 console.log(row)
            var sendId=row.id
            console.log(sendId)
            this.$router.push({path:'/modifsend', query:{sendId:sendId}})
         }
    },
    created(){
       this.get()
    }
}
</script>
<style scoped>
</style>

