<template>
  <div>
    <!-- 头部面包屑 -->
    <breadcrumb title="供应商"></breadcrumb>
    <!-- 头部功能栏 -->
    <div class="header-tool">
      <!-- 供应商名称 -->
      <el-input
        v-model="memberForm.name"
        placeholder="供应商名称"
        style="width: 200px; margin-right: 10px"
      ></el-input>
      <!-- 联系人 -->
      <el-input
        v-model="memberForm.linkman"
        placeholder="联系人"
        style="width: 200px; margin-right: 10px"
      ></el-input>
      <!-- 联系电话 -->
      <el-input
        v-model="memberForm.mobile"
        placeholder="联系电话"
        style="width: 200px; margin-right: 10px"
      ></el-input>
      <!-- 查询 -->
      <el-button type="primary" @click="search">查询</el-button>
      <!-- 新增 -->
      <el-button type="primary" @click="addMember">新增</el-button>
      <!-- 重置 -->
      <el-button @click="remake">重置</el-button>
    </div>
    <!-- 表格部分 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%; margin-top: 20px"
      max-height="450"
    >
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="name" label="供应商名称"> </el-table-column>
      <el-table-column prop="linkman" label="联系人"> </el-table-column>
      <el-table-column prop="mobile" label="联系电话"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog
      :title="addEditFlag ? '添加供应商' : '编辑供应商'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="供应商名称" label-width="100px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" label-width="90px" prop="linkman">
          <el-input v-model="form.linkman" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="90px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="90px">
          <el-input type="textarea" v-model="form.remark"> </el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn" style="float: right">
            <el-button @click="resetForm('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >确定</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
import breadcrumb from "../components/headBreacrumb.vue";
export default {
  name: "",
  components: {
    breadcrumb,
  },
  data() {
    return {
      // 当前页码
      page: 1,
      // 每页条数
      pageSize: 10,
      // 总数
      total: 0,
      // 头部功能栏数据
      memberForm: {
        name: "", //供应商名称
        linkman: "", //联系人
        mobile: "", //联系电话
      },
      // 表格数据
      tableData: [],
      // 对话框状态
      dialogFormVisible: false,
      // 对话框表单
      form: {
        name: "", //供应商名称
        linkman: "", //联系人
        mobile: "", //联系电话
        remark: "", //备注
      },
      // 对话框表单规则
      rules: {
        name: { required: true, message: "请输入供应商名称", trigger: "blur" },
        linkman: { required: true, message: "请输入联系人", trigger: "blur" },
      },
      // 添加编辑的状态
      addEditFlag: false, // false 为编辑 true 为添加
      // 暂缓编辑ID
      editID: "",
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    // 重置
    remake(){
      this.memberForm = {
        name: "", //供应商名称
        linkman: "", //联系人
        mobile: "", //联系电话
      }
      this.getList()
    },
    // 新增
    addMember() {
      this.form = {
        name: "", //供应商名称
        linkman: "", //联系人
        mobile: "", //联系电话
      };
      this.addEditFlag = true;
      this.dialogFormVisible = true;
    },
    // 请求列表
    getList() {
      this.$axios
        .post(`/supplier/list/search/${this.page}/${this.pageSize}`)
        .then((res) => {
          if (res.data.code == 2000) {
            // 请求成功
            this.tableData = res.data.data.rows;
            this.total = res.data.data.total;
          }
        });
    },
    // 编辑
    handleEdit(index, row) {
      this.addEditFlag = false;
      this.dialogFormVisible = true;
      // 暂缓id
      this.editID = row.id;
      console.log(this.editID);
      axios.get(`/supplier/${this.editID}`).then((res) => {
        this.form = res.data.data;
      });
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.delete(`/supplier/${row.id}`).then((res) => {
            if (res.data.code == 2000) {
              // 提示
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              // 渲染
              this.getList();
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    // 查询
    search() {
      (this.memberForm = {
        name: "", //供应商名称
        linkman: "", //联系人
        mobile: "", //联系电话
      }),
        this.getList();
    },
    // 对话框表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 判断添加或编辑
          if (this.addEditFlag) {
            // 添加
            axios.post("supplier", this.form).then((res) => {
              if (res.data.code == 2000) {
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            // 编辑
            axios.put(`/supplier/${this.editID}`, this.form).then((res) => {
              if (res.data.code == 2000) {
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 对话框表单取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
  },
};
</script>

// 样式
<style scoped lang='scss'>
.header-tool {
  margin-top: 20px;
  width: 100%;
}
</style>
