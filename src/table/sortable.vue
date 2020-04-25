<template>
  <div class="main-content">
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="400"
      :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        :formatter="priceFormatter"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
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
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '杯子',
        price: 99,
        address: '北京市朝阳区凤凰置地广场A座5层'
      }, {
        date: '2016-05-03',
        name: '电脑',
        price: 6999,
        address: '北京市朝阳区凤凰置地广场A座5层'
      }, {
        date: '2016-05-02',
        name: '杯子',
        price: 99,
        address: '北京市朝阳区凤凰置地广场A座5层'
      }, {
        date: '2016-05-03',
        name: '电脑',
        price: 6999,
        address: '北京市朝阳区凤凰置地广场A座5层'
      }, {
        date: '2016-05-01',
        name: '笔记本',
        price: 19,
        address: '北京市朝阳区凤凰置地广场A座5层'
      }, {
        date: '2016-05-04',
        name: '水笔',
        price: 49,
        address: '北京市朝阳区凤凰置地广场A座5层'
      }, {
        date: '2016-05-04',
        name: '水笔',
        price: 49,
        address: '北京市朝阳区凤凰置地广场A座5层'
      }, {
        date: '2016-05-04',
        name: '水笔',
        price: 49,
        address: '北京市朝阳区凤凰置地广场A座5层'
      }]
    }
  },
  methods: {
    priceFormatter(row, column) {
      return '¥' + row.price;
    },
    handleCurrentChange(val) {
      console.log('当前页发生改变');
    }
  }
}
</script>
