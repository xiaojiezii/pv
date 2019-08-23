<template>
    <div>
     <el-dialog :title="$t('oper.operdetails')"  customClass="customWidth" :visible.sync="li8n" :before-close="closeDialog">
            <el-table
	           :data="tableData">
				
	           <el-table-column
	               :label="$t('oper.opermethods')"
	               prop="method">
	           </el-table-column>
	          <el-table-column
	              :label="$t('oper.operparams')"
	              prop="params">
	          </el-table-column>
	           </el-table>
                <div style="width:100%;text-align:right;margin-top:30px;">
            <el-button type="danger" @click="closeDialog" round>{{$t('btn.los')}}</el-button>
        </div>
      </el-dialog>
    </div>
</template>


<script>
  export default {
    data() {
      return {
          tableData:[]
      }
    },
    props:[
       "li8n",
       "userId"
    ],
    watch:{
       userId(val){
           if(val!==undefined){
               this.get()
           }
       }
    },
    methods:{
       closeDialog(){
           this.$parent.closeli8nDialog();
           this.tableData=[]
       },
       get(){
          var url=this.global.url
           this.$axios.get(url+"/log/select?id="+this.userId).then((res)=>{
		        console.log(res)
				if(res.data.status==200){
				    this.tableData.push(res.data.data)
				}
		    })
       },
     }
  };
</script>
<style>
 /* *{margin: 0;padding: 0;} */
.customWidth{
    width:60%;
}

</style>
