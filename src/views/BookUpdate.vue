<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
   <el-form-item label="序号" >
      <el-input v-model="ruleForm.id" readOnly></el-input>
    </el-form-item>

    <el-form-item label="图书名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="图书号" prop="bookid">
      <el-input v-model="ruleForm.bookid"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="updateForm('ruleForm')"
        >修改</el-button
      >
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
export default {
  data() {
    var checkBookId = (rule, value, callback) => {
      value = value - 0;
      if (value == "") {
        callback(new Error("图书号不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("图书号必须是数字值"));
        } else {
          value = value + "";
          if (value.length != 10) {
            callback(new Error("必须是10位"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      ruleForm: {
        id:"",
        name: "",
        bookid: "",
      },
      rules: {
        name: [{ required: true, message: "请输入图书名称", trigger: "blur" }],
        classid: [
          { required: true, message: "请选择图书号", trigger: "change" },
          { validator: checkBookId, trigger: "change" },
        ],
      },
    };
  },
  methods: {
    updateForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("校验通过");
          //console.log(_this.ruleForm);
          axios.post("http:localhost:8181/book/update/",this.ruleForm).then(function (resp) {
              //console.log(resp);
              if (response.data == "success") {
                 _this.$alert('《'+_this.ruleForm.name+'》修改成功','消息',{
                 confirmButtonText:'确定',callback:action=>{
                 _this.$router.push('/bookMain');
                 }
               })
              }
            })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created(){
    //console.log(this.$route.query.id);

    const _this = this;
    axios.get('http://localhost:8181/book/findById' + this.$route.query.id).then(function(resp){
      _this.ruleForm = resp.data
    })

    // var fromJavaJSON = "[{\"id\":1,\"name\":\"高等数学\",\"bookid\":\"3117003718\"}]";
    // window.eval("var books = " + fromJavaJSON);
    // this.ruleForm = books[0];
    // console.log(this.ruleForm);

  }
};
</script>