<template>
  <el-dialog
    v-model="tableDialog"
    @close="closeDialog"
    :title="dialogTitle"
    width="30%"
  >
    <advanced-form ref="form" :form-options="formOptions">
      <template #actions="scoped">
        <div class="flex justify-end w-full">
          <el-button @click="closeDialog">取消</el-button>
          <el-button
            type="primary"
            @click="
              scoped.submitForm((valid: boolean, model: any) =>
                handleAdd(valid, model)
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
              v-model="searchName"
              clearable
              :placeholder="searchNameHolder"
            />
          </el-col>
          <el-col :span="1">
            <!-- <el-button type="primary">确认</el-button> -->
            <div class="text-center">与/或</div>
          </el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="searchDate"
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
            <el-button type="primary" @click="filterData(true)">确认</el-button>
            <el-button
              v-show="searchMode"
              type="success"
              @click="filterData(false)"
              >清除</el-button
            >
          </el-col>
        </el-row>
      </template>
      <template #right>
        <el-button type="primary" @click="openDialog">{{
          addBtnText
        }}</el-button>
      </template>
    </query-form>
    <advanced-table
      v-model:current-page="currentPage"
      v-model:page-size="state.pageSize"
      :loading="loading"
      :tableOptions="tableOptions"
      @updateCellData="updateData"
      @updateRowData="updateRow"
      @deleteRowData="deleteData"
    ></advanced-table>
  </el-card>
</template>

<script setup lang="ts">
// 再进一步封装高级表格，有些需求和合同管理是非常类似的
// 需要改变的就是接口等
import AdvancedTable from "@components/table/index.vue";
import AdvancedForm from "@components/form/index.vue";
import QueryForm from "@components/query-form/index.vue";
import { TableProp, FormProp } from "../types";
import { cloneDeep } from "lodash";
import {
  reactive,
  ref,
  onMounted,
  watch,
  toRefs,
  inject,
  PropType,
  defineEmits,
  useAttrs,
} from "vue";

const props = defineProps({
  dialogTitle: {
    type: String,
    default: "",
  },
  searchNameHolder: {
    type: String,
    default: "",
  },
  addBtnText: {
    type: String,
    default: "",
  },
  tableOptions: {
    type: Object as PropType<TableProp>,
    required: true,
  },
  formOptions: {
    type: Object as PropType<FormProp>,
    required: true,
  },
});

/**
 * getTableData
 * getSearchData
 * updateTableData
 * updateTableRowData
 * deleteTableData
 * addTableData
 */

const { dialogTitle, searchNameHolder, addBtnText } = props;

const tableOptions = cloneDeep(props.tableOptions);
const formOptions = cloneDeep(props.formOptions);

const loading = ref(false);

const $baseMessage: any = inject("$baseMessage");

const attrs: any = useAttrs();

const state = reactive({
  dataList: [],
  pages: 0,
  total: 0,

  currentPage: 1,
  pageSize: 10,

  searchDate: "",
  searchName: "",
  searchMode: false,

  tableDialog: false,
});

const {
  currentPage,
  pageSize,
  searchDate,
  searchName,
  tableDialog,
  searchMode,
} = toRefs(state);

const filterData = (ctn = true) => {
  if (!searchDate.value && !searchName.value) {
    $baseMessage({
      message: "请先输入筛选条件或筛选日期！",
      type: "error",
    });
    return;
  }
  if (searchMode.value && !ctn) {
    searchDate.value = "";
    searchName.value = "";
  }
  searchMode.value = ctn || !searchMode.value;
  loadTableData();
};

const loadTableData = async (params = { cp: 1, ls: 10 }) => {
  loading.value = true;
  const {
    data: { dataList, pages, total },
    code,
  } = await (!searchMode.value
    ? attrs.getTableData(params)
    : attrs.getSearchData({
        ls: params.ls,
        cp: params.cp,
        startDate: searchDate.value[0],
        endDate: searchDate.value[1],
        searchName: searchName.value,
      }));

  if (code === 400) {
    $baseMessage({
      message: "出问题辣，请重试！",
      type: "error",
    });
  }

  state.dataList = dataList;
  state.pages = pages;
  state.total = total;

  tableOptions.data = state.dataList;
  tableOptions.paginationOption!.total! = state.total;

  loading.value = false;
};

const updateData = (row: any, column: any, $index: number) => {
  attrs.updateTableData({
    id: row.id,
    [column["property"]]: row[column["property"]],
  });
};

const updateRow = (editRow: any, row: any) => {
  attrs.updateTableData({
    id: row.id,
    ...editRow,
  });
};

const deleteData = (row: any) => {
  attrs.deleteTableData({ id: row.id }).then((res: any) => {
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

const openDialog = () => (tableDialog.value = true);

const closeDialog = () => {
  form.value?.clearForm();
  tableDialog.value = false;
};

const handleAdd = (valid: boolean, model: any) => {
  if (valid) {
    attrs.addTableData(model).then((res: any) => {
      if (res.code === 400) {
        $baseMessage({
          message: "添加失败辣，请重试！",
          type: "error",
        });
      } else {
        $baseMessage({
          message: "添加成功！",
          type: "success",
        });
        closeDialog();
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
