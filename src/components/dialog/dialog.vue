<template>
  <el-dialog
    @open="init"
    @close="closeDialog"
    v-model="props.dialogVisible"
    title="Detailed content"
    width="50%"
    draggable
  >
    <span>{{ data.id }} </span>
    <div ref="editorRef"></div>
    <template #footer>
      <span class="dialog-footer"> </span>
    </template>
  </el-dialog>
</template>
<script setup>
import Vditor from "vditor";
import {
  onMounted,
  computed,
  onBeforeUnmount,
  ref,
  watch,
  nextTick,
} from "vue";
const props = defineProps(["dialogVisible", "data"]);
let editorRef = ref();
let instance;
// 初始化 方法
async function init() {
  Vditor.preview(editorRef.value, ("\n\n" + data.value));
  
  // instance = await new Vditor(editorRef.value, {
  //   height: 720,
  //   mode: "ir",
  //   toolbarConfig: {
  //     hide: true,
  //   },
  //   cache: {
  //     enable: false,
  //   },
  //   editable: false,
  //   after: () => {
  //     // 获取实例的值
  //     const content = instance.getValue();

  //     // 将属性和属性值转换为表格内容
  //     // 在实例中添加表格内容

  //     // instance.preview("\n\n" + data.value);
  //     instance.setValue("\n\n" + data.value);
  //   },
  //   // 这里写上传
  //   upload: {},
  // });
}
// 强制保留2位小数
function returnFloat(value) {
  if (!value) {
    return "0.00";
  }
  var value = Math.round(parseFloat(value) * 100) / 100;
  var xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = value.toString() + ".00";
    return value;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
}
let bool = computed(() => {
  return props.dialogVisible;
});

function processData(data, level = 0) {
  let content = "\n";

  const addIndent = (level) => {
    return "  ".repeat(level);
  };

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "object" && value !== null) {
      content += `${addIndent(level)}- **${key}**\n`;
      content += processData(value, level + 1);
    } else {
      content += `${addIndent(level)}- ${key}: ${value}\n`;
    }
  }

  return content;
}
function utcTime(time) {
  const utcDate = new Date(time);
  const utcString = utcDate.toISOString();
  return utcString;
}
let data = computed(() => {
  let resources = () => {
    let string = "";
    for (const resource in props.data.resources) {
      const resourceInfo = props.data.resources[resource];
      string += `The resource with ID ${
        resourceInfo.resourceId
      } was originally planned to have ${returnFloat(
        resourceInfo.plannedUnits
      )} units. The initial planned usage rate was ${returnFloat(
        resourceInfo.plannedUnitsPerHour
      )} units per hour, and it currently remains at ${returnFloat(
        resourceInfo.Units
      )} units per hour. However, after optimization, the new usage rate is ${returnFloat(
        resourceInfo.newUnitsPerHour
      )} units per hour, and the new daily usage is ${returnFloat(
        resourceInfo.newUnitsPerDay
      )} units per day.\n`;
    }
    return string;
  };

  let str = `This is a task named '${props.data.name}' categorized as '${
    props.data.type
  }', and it is ${props.data.critical == true ? "" : "not"} a Critical Task.
   Before optimization,
   it is scheduled to start on ${utcTime(props.data.plannedStart)
     .replace("T", " ")
     .replace("Z", "").slice(0, 16)} (date) and finish on ${utcTime(props.data.plannedFinish)
    .replace("T", " ")
    .replace("Z", "").slice(0, 16)} (date), with an estimated duration of ${
    props.data.remainingDuration
  } hours. 
  After optimization,
   it is scheduled to start on ${utcTime(props.data.newStart)
     .replace("T", " ")
     .replace("Z", "").slice(0, 16)} (date) and finish on ${utcTime(props.data.newFinish)
    .replace("T", " ")
    .replace("Z", "").slice(0, 16)} (date), with an estimated duration of ${
    props.data.newDuration
  } hours. \nResources:\n${resources()}As of now, the task has not commenced and is labeled as '${
    props.data.status
  }.' The task's duration ratio is ${returnFloat(props.data.durationRatio)}.`;
  return str + processData(props.data);
});

const emit = defineEmits(["closeDialog"]);
const closeDialog = () => {
  // 向父组件发送 closeDialog 事件，通知父组件关闭对话框
  emit("closeDialog");
};
</script>
