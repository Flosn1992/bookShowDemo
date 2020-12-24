<template>
  <div id="main">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="序号"
        width="150"
      ></el-table-column>
      <el-table-column prop="name" label="书名" width="120"></el-table-column>
      <el-table-column
        prop="bookid"
        label="书名号"
        width="120"
      ></el-table-column>
      <el-table-column prop="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.row)" type="text">修改</el-button>
          <el-button @click="removeClick(scope.row)" size="small" type="text"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev,pager,next"
      :page-size="6"
      :total="total"
      @current-change="page"
    >
    </el-pagination>
  </div>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
#main {
  position: relative;
  height: 475px;
  width: 100%;
}
.el-pagination {
  position: absolute;
  top: 439px;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 5px;
}
</style>

<script>
export default {
  created() {
    const _this = this//指向this
    axios.get('http:localhost:8181/bppk/findAll/1/6').then(function(regp) {
     _this.tableData = resp.data.content;
     _this.total = resp.data.totalElement;
    })

    // var fromJavaJSON =
    //   '[{"id":1,"name":"高等数学","bookid":"3117003718"},{"id":2,"name":"数据结构", "bookid":"3117003719"},{"id":3,"name":"网络原理" ,"bookid":"3117003720"},{"id":4,"name":"JAVA语法","bookid":"3117003721"},{"id":5,"name":"Web语法","bookid":"3117003722"},{"id":6,"name":"时间简史","bookid":"3117003723"}]';
    // window.eval("var books = " + fromJavaJSON);
    // this.tableData = books;
    // this.total = 15;
  },
  data() {
    return {
      total: null,
      tableData: [],
    };
  },
  methods: {
    editClick(row) {
      this.$router.push({
        path: "/bookUpdate",
        query: {
          id: row.id,
        },
      });
      //console.log(row);
    },
    removeClick(row) {
      const _this = this; //指向this
      axios
        .delete("http:localhost:8181/book/deleteByid/" + row.id)
        .then(function (resp) {
          //console.log(resp);
          _this.$alert("《" + row.name + "》删除成功", "消息", {
            confirmButtonText: "确定",
            callback: (action) => {
              window.location.reload();
            },
          });
        });
    },
    page(currentPage) {
        const _this = this//指向this
       axios.get('http:localhost:8181/book/findAll/'+currentPage+'/6').then(function(regp) {
       _this.tableData = resp.data.content;
       _this.total = resp.data.totalElement;
      })
      // if (currentPage == 1) {
      //   var fromJavaJSON =
      //     '[{"id":1,"name":"高等数学","bookid":"3117003718"},{"id":2,"name":"数据结构", "bookid":"3117003719"},{"id":3,"name":"网络原理" ,"bookid":"3117003720"},{"id":4,"name":"JAVA语法","bookid":"3117003721"},{"id":5,"name":"Web语法","bookid":"3117003722"},{"id":6,"name":"时间简史","bookid":"3117003723"}]';
      //   window.eval("var books = " + fromJavaJSON);
      //   this.tableData = books;
      //   this.total = 15;
      // }
      // if (currentPage == 2) {
      //   var fromJavaJSON =
      //     '[{"id":7,"name":"高等数学","bookid":"3117003718"},{"id":8,"name":"数据结构", "bookid":"3117003719"},{"id":9,"name":"网络原理" ,"bookid":"3117003720"},{"id":10,"name":"JAVA语法","bookid":"3117003721"},{"id":11,"name":"Web语法","bookid":"3117003722"},{"id":12,"name":"时间简史","bookid":"3117003723"}]';
      //   window.eval("var books = " + fromJavaJSON);
      //   this.tableData = books;
      //   this.total = 15;
      // }
      // if (currentPage == 3) {
      //   var fromJavaJSON =
      //     '[{"id":13,"name":"高等数学","bookid":"3117003718"},{"id":14,"name":"数据结构", "bookid":"3117003719"},{"id":15,"name":"网络原理" ,"bookid":"3117003720"}]';
      //   window.eval("var books = " + fromJavaJSON);
      //   this.tableData = books;
      //   this.total = 15;
      // }
      // fromJavaJSON = null;
      // books = null;
    },
  },
};
</script>