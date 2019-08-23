<template>
    <div>
         <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-pie-chart"></i>报表展示</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <div class="container">
              <div style="text-align:right;height:40px;">
                    <el-button type="success" @click="zhu" round>{{$t('case.bar')}}</el-button>
                    <el-button type="info" @click="zhe" round>{{$t('case.line')}}</el-button>
                     <el-button type="primary" @click="bing" round>{{$t('case.pie')}}</el-button>
                </div>
            <div class="echarts" v-show="save">
                <div id="age" style="width:400px;height:400px;"></div>
                <div id="ages" style="width:400px;height:400px;"></div>
                <div id="ages1" style="width:400px;height:400px;"></div>
                <div id="ages2" style="width:400px;height:400px;"></div>
            </div> 
            <div class="echarts" v-show="saves">
                <div id="age1" style="width:400px;height:400px;"></div>
                <div id="case" style="width:400px;height:400px;"></div>
                <div id="casetype" style="width:400px;height:400px;"></div>
                <div id="casenum" style="width:400px;height:400px;"></div>
            </div> 
        </div>   
    </div>
</template>
<script>
       // 引入 ECharts 主模块
        var echarts = require('echarts/lib/echarts');
        // 引入柱状图
        require('echarts/lib/chart/bar');
        require('echarts/lib/chart/line');
        require('echarts/lib/chart/pie');
        // 引入提示框和标题组件
        require('echarts/lib/component/tooltip');
        require('echarts/lib/component/title');
export default {
    data(){
        return{
            save:true,
            saves:false,
           type:"bar",
           key1:[],
           key2:[],
           key3:[],
           key4:[],
           data1:[],
           data2:[],
           data3:[],
           data4:[],
           value1:[],
           value2:[],
           value3:[],
           value4:[],
           
        }
    },
    methods:{
        age(){
            let myChart = echarts.init(document.getElementById('age'))
            myChart.setOption({
                   title: { text: this.$t('case.age') },
            tooltip: {},
            xAxis: {
                data: this.key1
            },
            yAxis: {},
            series: [{
                name: this.$t('case.sources'),
                type: this.type,
                data: this.value1
            }]
            })
        },
        // 饼状图
        age1(){
            let myChart = echarts.init(document.getElementById('age1'))
            myChart.setOption({
                  title : {
                    text: this.$t('case.drug'),
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series : [
                    {
                        name: this.$t('case.sources'),
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '40%'],
                        data:this.data1,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
        },
        case(){
            let myChart = echarts.init(document.getElementById('case'))
            myChart.setOption({
                  title : {
                    text: this.$t('case.drug'),
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series : [
                    {
                        name: this.$t('case.sources'),
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '40%'],
                        data:this.data2,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
        },
        casetype(){
            let myChart = echarts.init(document.getElementById('casetype'))
            myChart.setOption({
                  title : {
                    text: this.$t('case.type'),
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series : [
                    {
                        name: this.$t('case.sources'),
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '40%'],
                        data:this.data3,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
        },
        casenum(){
            let myChart = echarts.init(document.getElementById('casenum'))
            myChart.setOption({
                  title : {
                    text: this.$t('case.weekly'),
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series : [
                    {
                        name: this.$t('case.sources'),
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '40%'],
                        data:this.data4,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
        },
        ages(){
            let myChart = echarts.init(document.getElementById('ages'))
            myChart.setOption({
                   title: { text: this.$t('case.drug') },
            tooltip: {},
            xAxis: {
                data: this.key2
            },
            yAxis: {},
            series: [{
                name: this.$t('case.sources'),
                type: this.type,
                data: this.value2
            }]
            })
        },
        ages1(){
            let myChart = echarts.init(document.getElementById('ages1'))
            myChart.setOption({
                   title: { text: this.$t('case.type') },
            tooltip: {},
            xAxis: {
                data: this.key3
            },
            yAxis: {},
            series: [{
                name: this.$t('case.sources'),
                type: this.type,
                data: this.value3
            }]
            })
        },
        ages2(){
            let myChart = echarts.init(document.getElementById('ages2'))
            myChart.setOption({
                   title: { text: this.$t('case.weekly') },
            tooltip: {},
            xAxis: {
                data: this.key4
            },
            yAxis: {},
            series: [{
                name: this.$t('case.sources'),
                type: this.type,
                data: this.value4
            }]
            })
        },
        bing(){ 
            this.save=false
            this.saves=true
            this.age1()
            this.case()
            this.casetype()
            this.casenum()
        },
        zhu(){ 
            this.save=true
            this.saves=false
            this.type="bar"
            this.age()
            this.ages()
            this.ages1()
            this.ages2()
        },
        zhe(){ 
            this.save=true
            this.saves=false
            this.type="line"
            this.age()
            this.ages()
            this.ages1()
            this.ages2()  
        },
        get(){
            var url=this.global.url+"/custom/countAge";
            this.$axios.get(url).then((res)=>{
                console.log(res)
                if(res.status==200){
                    let list=res.data
                    this.data1=res.data
                    let key1=[]
                    let value1=[]
                    for(let item of list){
                       key1.push(item.name)
                       value1.push(item.value)
                    }
                    this.key1=key1
                    this.value1=value1  
                    this.age() 
                }else{
                   this.$message.error("数据传输错误")
                }
            })

            var url1=this.global.url+"/custom/countCharacter";
             this.$axios.get(url1).then((res)=>{
                 console.log(res)
                if(res.status==200){
                    let list=res.data
                    this.data2=res.data
                    let key2=[]
                    let value2=[]
                    for(let item of list){
                       key2.push(item.name)
                       value2.push(item.value)
                    }
                    this.key2=key2
                    this.value2=value2  
                    this.ages()
                }else{
                   this.$message.error("数据传输错误")
                }
            })
             var url2=this.global.url+"/custom/countType";
             this.$axios.get(url2).then((res)=>{
                 console.log(res)
                if(res.status==200){
                    let list=res.data
                    this.data3=res.data
                    let key3=[]
                    let value3=[]
                    for(let item of list){
                       key3.push(item.name)
                       value3.push(item.value)
                    }
                    this.key3=key3
                    this.value3=value3  
                    this.ages1()
                }else{
                   this.$message.error("数据传输错误")
                }
            })

             var url3=this.global.url+"/custom/countWeek";
             this.$axios.get(url3).then((res)=>{
                 console.log(res)
                if(res.status==200){
                    let list=res.data
                    this.data4=res.data
                    let key4=[]
                    let value4=[]
                    for(let item of list){
                       key4.push(item.name)
                       value4.push(item.value)
                    }
                    this.key4=key4
                    this.value4=value4
                    this.ages2()  
                }else{
                   this.$message.error("数据传输错误")
                }
            })
        }
    },
     created(){
       this.get();
    },
   
}
</script>
<style scoped>
 .echarts{
     display: flex;
     width:900px;
     margin: 0 auto;
     flex-wrap: wrap;
     justify-content: space-between;
 }
</style>


