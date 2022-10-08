<template>
  <div class="app-container">
    <!-- 添加或修改合同主信息对话框 -->
    <div style="display: flex; margin-bottom: 10px">
      <div style="flex: 1"></div>
      <el-button size="mini" type="primary" @click="submitForm"> 保 存 </el-button>
      <el-button size="mini" @click="cancel">返 回</el-button>
    </div>

    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="供应商代码" prop="counterpartyCode">
            <el-input
              v-model="formData.counterpartyCode"
              :disabled="isEdit"
              placeholder="请输入供应商代码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商名称" prop="counterpartyName">
            <el-input
              v-model="formData.counterpartyName"
              :disabled="isEdit"
              placeholder="请输入供应商名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专业板块" prop="majorPlate">
            <el-input
              v-model="formData.majorPlate"
              :disabled="isEdit"
              placeholder="请输入专业板块"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="供应商简称" prop="shortName">
            <el-input v-model="formData.shortName" placeholder="请输入供应商简称" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="开户行" prop="bank">
            <el-input v-model="formData.bank" placeholder="请输入开户行" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="供应商地址" prop="address">
            <el-input v-model="formData.address" placeholder="请输入供应商地址" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户行账号" prop="accountNo">
            <el-input v-model="formData.accountNo" placeholder="请输入开户行账号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系人1" prop="contact1">
            <el-input v-model="formData.contact1" placeholder="请输入联系人1" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话1" prop="tel1">
            <el-input v-model="formData.tel1" placeholder="请输入联系电话1" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户行名称" prop="bankName">
            <el-input v-model="formData.bankName" placeholder="请输入开户行名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系人2" prop="contact2">
            <el-input v-model="formData.contact2" placeholder="请输入联系人2" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话2" prop="tel2">
            <el-input v-model="formData.tel2" placeholder="请输入联系电话2" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系人3" prop="contact3">
            <el-input v-model="formData.contact3" placeholder="请输入联系人3" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话3" prop="tel3">
            <el-input v-model="formData.tel3" placeholder="请输入联系电话3" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>
<script setup>
import {ref} from "vue"
import mainStore from "../../../store/main"
import {useRouter} from "vue-router"
import {storeToRefs} from "pinia"

const rules = ref({
  counterpartyCode: [
    { required: true, message: "请输入供应商代码", trigger: "blur" },
  ],
  counterpartyName: [
    { required: true, message: "请输入供应商名称", trigger: "blur" },
  ],
  majorPlate: [{ required: false, message: "请输入专业板块", trigger: "blur" }],
  shortName: [{ required: true, message: "请输入供应商简称", trigger: "blur" }],
  address: [{ required: true, message: "请输入供应商地址", trigger: "blur" }],
})
const useMainStore = mainStore.getUseStore("main")

const {formData} = storeToRefs(useMainStore)

const form = ref()
const isEdit = ref(true)
/** 提交按钮 */
function submitForm() {
  formData.value.validate((valid) => {
    if (valid) {

    }
  });
}
    // 取消按钮
function cancel() {
  const router = useRouter()
  // this.$store.dispatch("tagsView/delView", this.$route);
  router.replace({
    path: "/supplier",
  });
}
</script>
<style scoped>
.remark {
  width: 100%;

}

</style>
