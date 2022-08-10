<template>
  <el-dialog
    v-model="contractDialog"
    @close="closeContractDialog"
    title="增加合同"
    width="30%"
  >
    <advanced-form ref="form" :form-options="formOptions">
      <template #actions="scoped">
        <div class="flex justify-end w-full">
          <el-button @click="closeContractDialog">取消</el-button>
          <el-button
            type="primary"
            @click="
              scoped.submitForm((valid: boolean, model: any) =>
                handleContractAdd(valid, model)
              )
            "
            >提交</el-button
          >
        </div>
      </template>
    </advanced-form>
  </el-dialog>
  <el-card shadow="never">
    <query-form
      justify="start"
      align="middle"
      :left-span="20"
      :right-span="4"
      :rightAttr="{ style: { textAlign: 'right' } }"
      class="mb-5"
    >
      <template #left>
        <el-row :gutter="10">
          <el-col :span="5">
            <el-input
              v-model="contractName"
              clearable
              placeholder="请输入合同名称"
            />
          </el-col>
          <el-col :span="1">
            <!-- <el-button type="primary">确认</el-button> -->
            <div class="text-center">与/或</div>
          </el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="contractDate"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
              style="width: 100%"
              format="YYYY/MM/DD"
              value-format="YYYY/MM/DD"
            />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="filterContract(true)"
              >确认</el-button
            >
            <el-button
              v-show="searchMode"
              type="success"
              @click="filterContract(false)"
              >清除</el-button
            >
          </el-col>
        </el-row>
      </template>
      <template #right>
        <el-button type="primary" @click="openContractDialog"
          >增加合同</el-button
        >
      </template>
    </query-form>
    <advanced-table
      v-model:current-page="currentPage"
      v-model:page-size="state.pageSize"
      :loading="loading"
      :tableOptions="tableOptions"
    >
      <template #action="{ row }">
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          icon="InfoFilled"
          icon-color="#626AEF"
          title="确定要删除这条数据吗？"
          @confirm="() => deleteContract(row)"
        >
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </advanced-table>
  </el-card>
</template>

<script setup lang="ts">
import AdvancedTable from "@components/table/index.vue";
import AdvancedForm from "@components/form/index.vue";
import QueryForm from "@components/query-form/index.vue";
import { TableProp, FormProp } from "../../../components/types";
import { reactive, ref, onMounted, watch, toRefs, inject } from "vue";
import {
  getContractData,
  // updateContract as updateContractAPI,
  ContractBodyProp,
  deleteContract as deleteContractAPI,
  addContract,
  searchContract,
} from "@service/contract";

// 这里出现了异步请求，但页面空白的问题...
// 解决方案之一是用suspense包裹，另外就是用函数式async/await

const loading = ref(false);

const $baseMessage: any = inject("$baseMessage");

const state = reactive({
  contractList: [],
  pages: 0,
  total: 0,

  currentPage: 1,
  pageSize: 10,

  // 两个筛选合同所用的属性以及标记当前是否是搜索状态的flag
  // 搜索状态下的分页等功能应该也带上搜索
  contractDate: "",
  contractName: "",
  searchMode: false,

  contractDialog: false,
});

const {
  currentPage,
  pageSize,
  contractDate,
  contractName,
  contractDialog,
  searchMode,
} = toRefs(state);

const tableOptions = reactive<TableProp>({
  data: [],
  fit: true,
  size: "large",
  border: true,
  stripe: true,
  columnOptions: [
    {
      prop: "id",
      label: "id",
      width: 70,
    },
    {
      prop: "contractName",
      label: "合同名称",
    },
    {
      prop: "content",
      label: "合同内容",
      showOverflowTooltip: true,

      width: 800,
    },
    {
      prop: "effectiveDate",
      label: "合同生效时间",

      editAttrs: {
        format: "YYYY/MM/DD hh:mm:ss",
        "value-format": "YYYY/MM/DD hh:mm:ss",
        type: "datetime",
      },
    },
    {
      prop: "expirationTime",
      label: "合同过期时间",

      editAttrs: {
        format: "YYYY/MM/DD hh:mm:ss",
        "value-format": "YYYY/MM/DD hh:mm:ss",
        type: "datetime",
      },
    },
    {
      slot: "action",
      label: "操作",
      width: 100,
    },
  ],
  paginationOption: {
    show: true,
    total: 0,
  },
});

const formOptions = reactive<FormProp>({
  model: {
    contractName: "",
    content: "",
    effectiveDate: "",
    expirationTime: "",
  },
  labelWidth: "80px",
  size: "large",
  options: [
    {
      prop: "contractName",
      type: "input",
      placeholder: "合同名",
      label: "合同名",
      required: true,
    },
    {
      prop: "content",
      type: "input",
      placeholder: "合同内容",
      label: "合同内容",
      required: true,
    },
    {
      prop: "effectiveDate",
      type: "date-picker",
      placeholder: "生效时间",
      label: "生效时间",
      required: true,
      attrs: {
        format: "YYYY/MM/DD",
        "value-format": "YYYY/MM/DD",
      },
    },
    {
      prop: "expirationTime",
      type: "date-picker",
      placeholder: "过期时间",
      label: "过期时间",
      required: true,
      attrs: {
        format: "YYYY/MM/DD",
        "value-format": "YYYY/MM/DD",
      },
    },
  ],
});

const filterContract = (ctn = true) => {
  if (!contractDate.value && !contractName.value) {
    $baseMessage({
      message: "请先输入合同名称或选择合同筛选日期！",
      type: "error",
    });
    return;
  }
  if (searchMode.value && !ctn) {
    contractDate.value = "";
    contractName.value = "";
  }
  searchMode.value = ctn || !searchMode.value;
  loadTableData();
  // 发现可以合并到loadData中，它们的区别只是有无搜索条件
  // searchContract({
  //   ls: 1,
  //   cp: 10,
  //   contractDate: contractDate.value,
  //   contractName: contractName.value,
  // }).then((res: any) => {
  //   if (res.code === 400) {
  //   } else {
  //     $baseMessage({
  //       message: "搜索成功！",
  //       type: "success",
  //     });
  //     const {
  //       data: { contractList = [], pages = 0, total = 0 },
  //     } = res;
  //     tableOptions.data = contractList;
  //     state.pages = pages;
  //     state.total = total;
  //     tableOptions.paginationOption!.total! = state.total;
  //   }
  // });
};

const loadTableData = async (params = { cp: 1, ls: 10 }) => {
  loading.value = true;
  const {
    data: { contractList, pages, total },
    code,
  } = await (!searchMode.value
    ? getContractData(params)
    : searchContract({
        ls: params.ls,
        cp: params.cp,
        effectiveDate: contractDate.value[0],
        expirationTime: contractDate.value[1],
        contractName: contractName.value,
      }));

  if (code === 400) {
    $baseMessage({
      message: "出问题辣，请重试！",
      type: "error",
    });
  }

  state.contractList = contractList;
  // 总页数
  state.pages = pages;
  // 总条数
  state.total = total;

  tableOptions.data = state.contractList;
  tableOptions.paginationOption!.total! = state.total;

  loading.value = false;
};

// const updateContract = (row: ContractBodyProp, column: any, $index: number) => {
//   updateContractAPI({
//     id: row.id,
//     [column["property"]]: row[column["property"]],
//   });
// };

// const updateRowContract = (editRow: ContractBodyProp, row: any) => {
//   updateContractAPI({
//     id: row.id,
//     ...editRow,
//   });
// };

const deleteContract = (row: ContractBodyProp) => {
  deleteContractAPI({ id: row.id }).then((res: any) => {
    if (res.code === 200) {
      $baseMessage({
        message: "删除成功！",
        type: "success",
      });
      loadTableData();
      state.currentPage = 1;
    } else {
      $baseMessage({
        message: "删除失败，请重试！",
        type: "error",
      });
    }
  });
};

const form = ref<any>();

const openContractDialog = () => (contractDialog.value = true);

const closeContractDialog = () => {
  form.value?.clearForm();
  contractDialog.value = false;
};

// 发现用插槽将form实例方法传递出来是不可靠的，因为可能还有别的
// 地方需要调用form实例方法，但这时没法直接获取实例方法
// const handleDialogClose = (resetFields: Function) => {

//   closeContract();
//   resetFields();
// };

const handleContractAdd = (valid: boolean, model: any) => {
  if (valid) {
    addContract(model).then((res: any) => {
      if (res.code === 400) {
        $baseMessage({
          message: "合同添加失败辣，请重试！",
          type: "error",
        });
      } else {
        $baseMessage({
          message: "合同添加成功！",
          type: "success",
        });
        closeContractDialog();
      }
    });
  }
};

watch([currentPage, pageSize], (val) => {
  loadTableData({
    cp: val[0],
    ls: val[1],
  });
});

onMounted(() => {
  loadTableData();
});
</script>

<style scoped></style>
