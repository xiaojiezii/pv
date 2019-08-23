<template>
    <div>
      <el-dialog title="选择症状" :visible.sync="event" :before-close="closeDialog">
        <el-table
    :data="gridData"
    style="width: 100%">
    <el-table-column
      label="lltName"
      prop="lltName">
    </el-table-column>
    <el-table-column
      label="ptName"
      prop="ptName">
    </el-table-column>
    <el-table-column
      label="hltName"
      prop="hltName">
    </el-table-column>
    <el-table-column
      label="hlgtName"
      prop="hlgtName">
    </el-table-column>
    <el-table-column
      label="socName"
      prop="socName">
    </el-table-column>
    <el-table-column align="right">
      <template slot-scope="scope">
        <el-button
          size="mini"
           type="danger"
          @click="handleEdit(scope.row)">选择</el-button>
      </template>
    </el-table-column>
  </el-table>
        <div style="font-size: 13px;float: left;margin: 27px;color: gray">
				<span>共{{total}}条</span>
		</div>
         <div style="margin:20px;text-align:center;">
               <el-pagination
                    :page-size="10"
                     @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    layout=" prev, pager, next"
                    :total="total">
              </el-pagination>
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
        gridData:[],

      };
    },
    props:[
        "event",
        "name",
    ],
    // props:{
    //     event:{
    //          type: Boolean,
    //     default: false
    //     },
    //     form:{type:object},
    //     grid:{type:Array}
    // },
    watch:{
      event:function(val){
          if(val){
              this.gets()
          }
      }
    },
    methods:{
        closeDialog(){
            this.$parent.closeTagDialog()
        },
        handleCurrentChange: function(currentPage){
		        this.currentPage = currentPage;
		        console.log(this.currentPage)
				 var url=this.global.url+"/meddra/selectMeddra?";
        var postData=this.qs.stringify({
            name:this.name,
            page:this.currentPage
        })
        this.$axios.get(url+postData).then((res)=>{
            console.log(res)
            if(res.data.status==200){
                this.gridData=res.data.data.list
                this.total=res.data.data.total
                this.pages=res.data.data.pages
                this.currentPage=res.data.data.page
            }
        })
        },
       handleEdit(row){
              var row={id:row.hltId,name:row.lltName}
            this.$emit("hand",row)
            this.closeDialog();
        },
        gets(){
           var url=this.global.url+"/meddra/selectMeddra?";
            var postData=this.qs.stringify({
            name:this.name,
            page:this.currentPage
        })
        this.$axios.get(url+postData).then((res)=>{
            console.log(res)
            if(res.data.status==200){
                this.gridData=res.data.data.list
                this.total=res.data.data.total
                this.pages=res.data.data.pages
                this.currentPage=res.data.data.page
            }
        })
        }
    }
  };
</script>
<style scoped>
.el-dialog{
    width:60%;
}
</style>


