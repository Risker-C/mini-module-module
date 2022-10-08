<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      label-width="100px"
    >
      <el-form-item label="供应商代码" prop="counterpartyCode">
        <el-input
          v-model="queryParams.pageData.counterpartyCode"
          placeholder="请输入供应商代码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供应商名称" prop="counterpartyName">
        <el-input
          v-model="queryParams.pageData.counterpartyName"
          placeholder="请输入供应商名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.pageData.status"
          placeholder="请选择"
          clearable
          @keyup.enter.native="handleQuery"
        >
          <el-option label="启用" value="0"></el-option>
          <el-option label="禁用" value="9"></el-option>
        </el-select>
      </el-form-item>
      <template v-if="showSearch">
        <el-form-item label="类型" prop="counterpartyType">
          <el-select
            v-model="queryParams.pageData.counterpartyType"
            placeholder="请选择"
            clearable
            @keyup.enter.native="handleQuery"
          >
            <el-option label="国内" value="1"></el-option>
            <el-option label="国际" value="2"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button
          :icon="showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
          size="mini"
          circle
          @click="showSearch = !showSearch"
        ></el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8" justify="end" type="flex">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          >模板下载</el-button
        >
      </el-col>

      <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-upload2"
            size="mini"
            >导入</el-button
          >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          size="mini"
          :disabled="isDisabled"
          @click="handleEnable()"
          >启用</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          size="mini"
          :disabled="isEnabled"
          @click="handleDisable()"
          >禁用</el-button
        >
      </el-col>

    </el-row>

    <el-table
      :data="supplierList"
    >
        <el-table-column align="center" prop="categoryName" label="品类" />
        <el-table-column align="center" prop="seriesName" label="品系" />
        <el-table-column align="center" prop="createUser" label="创建人" />
        <el-table-column align="center" prop="createTime" label="创建时间" />
        <el-table-column align="center" prop="remark" label="备注" />
    </el-table>
  </div>
</template>

<script>
import {
  listCounterparty,
  delCounterparty,
  enableCounterparty,
  disableCounterparty,
  importCounterparty,
} from "@/api/counterparty";
// import app from "../../main"
export default {
  name: "Supplier",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 上传地址
      importCounterparty,
      // 选中数组
      ids: [],
      selected: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: false,
      // 总条数
      total: 0,
      // 供应商表格数据
      supplierList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 数据类型
      dataType: "2", // 类型
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        pageData: {
          dataType: "2",
        },
      },
    };
  },
  created() {
    this.getList();
    // console.log(app.config.globalProperties.$pinia);
    // debugger
  },
  computed: {
    isDisabled: function () {
      return !(this.selected.length === 1 && this.selected[0].status === "9");
    },
    isEnabled: function () {
      return !(this.selected.length === 1 && this.selected[0].status === "0");
    },
  },
  methods: {
    /** 查询供应商列表 */
    getList() {
      this.loading = true;
      const pageData = { ...this.queryParams.pageData };
      for (const key in pageData) {
        const element = pageData[key];
        if (!element) pageData[key] = undefined;
      }
      this.queryParams.pageData = {
        ...pageData,
        dataType: this.dataType,
      };
      listCounterparty(this.queryParams).then((response) => {
        this.supplierList = response.retData.list;
        this.total = response.retData.total;
        this.loading = false;
      });
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.pageData = {};
      this.handleQuery();
    },
    uploadSuccess() {
      this.$message.success("导入成功！");
      this.resetQuery();
    },
    fileSuccess() {
      this.$refs.fileUpload.submit();
    },
    // 上传
    fileHttpRequest(param) {
      let fd = new FormData();
      fd.append("file", param.file); // 传文件
      fd.append("dataType", this.dataType);
      this.download({
        url: importCounterparty,
        filename: `供应商上传结果日志.xlsx`,
        contentType: "multipart/form-data",
        params: fd,
        loadingText: "正在上传供应商信息，请稍候",
        callback: () => this.uploadSuccess(),
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.selected = selection;
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.$router.push({
        path: "/common/supplierInfo",
        query: {
          // id: id
          mode: "add",
        },
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      const ids = row?.id || this.ids;
      this.$router.push({
        path: "/common/supplierInfo",
        query: {
          id: ids,
          mode: "edit",
        },
      });
    },
    /** 启用按钮操作 */
    handleEnable(row) {
      const ids = row?.id || this.ids;
      const selected = row || this.selected[0];
      this.$modal
        .confirm('是否确认启用供应商编号为"' + selected.counterpartyCode + '"的数据项？')
        .then(function () {
          return enableCounterparty(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("启用成功");
        })
        .catch(() => {});
    },
    /** 禁用按钮操作 */
    handleDisable(row) {
      const ids = row?.id || this.ids;
      const selected = row || this.selected[0];
      this.$modal
        .confirm('是否确认禁用供应商编号为"' + selected.counterpartyCode + '"的数据项？')
        .then(function () {
          return disableCounterparty(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("禁用成功");
        })
        .catch(() => {});
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row?.id || this.ids;
      const selected = row || this.selected[0];
      this.$modal
        .confirm('是否确认删除供应商编号为"' + selected.counterpartyCode + '"的数据项？')
        .then(function () {
          return delCounterparty(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      // let fd = new FormData();
      // fd.append("objectName", templateEnum.supplierTpl); //附件名称
      // this.download({
      //   url: "/fs/file/doc-templates/get",
      //   filename: templateEnum.supplierTpl,
      //   contentType: "multipart/form-data",
      //   params: fd,
      // });
    },
  },
};
</script>
