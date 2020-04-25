<template>
  <div class="main-content">
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="400"
      @filter-change="filterChange">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        :filter-multiple=false
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        column-key="date">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
        :render-header="renderHeader">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        :formatter="formatter">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        column-key="tag"
        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
        :filtered-value="['家']"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      layout="total,prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      filterName: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '公司'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '公司'
      }],
      tempTableData: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      bool: true
    }
  },
  mounted: function () {
    this.tempTableData = this.tableData;
  },
  methods: {
    focus () {
      this.bool = false;
      this.renderHeader();
    },
    handleCurrentChange (val) {
      console.log('当前页发生改变');
    },
    formatter (row, column) {
      return row.address;
    },
    filterTag (value, row) {
      return row.tag === value;
    },
    renderHeader () {
      if (this.bool === true) {
        return (<span onClick={this.focus}>姓名</span>);
      } else {
        return (<el-input v-model={this.filterName} placeholder="请输入内容" onBlur={this.fun}></el-input>);
      }
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    fun () {
      console.log(this.filterName);
      this.bool = true;
      this.renderHeader();
      this.filterName = '';
    },
    filterChange (column) {
      this.tableData = [];
      var columnArr = [];
      var columnKey = '';
      for (var item in column){
        columnArr = column[item];
        columnKey = item;
      }
      console.log(columnArr)
      for (var i = 0; i < columnArr.length; i++) {
        var arr = this.tempTableData.filter(item => {
          return item[columnKey] === columnArr[i];
        })
        this.tableData = this.tableData.concat(arr);
      }
      if (columnArr.length === 0) {
        this.tableData = this.tempTableData;
      }
    }
  }
}
</script>
