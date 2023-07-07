<script setup>
import { defineComponent, ref, reactive, computed } from "vue";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import {
  alignHeaders,
  drawCheckboxInRowHeaders,
  addClassesToRows,
  changeCheckboxCell,
} from "@/utils/hooks-callback";
import { progressBarRenderer } from "@/utils/constants";
import { HotTable, HotColumn } from "@handsontable/vue3";
registerAllModules();
const props = defineProps(["tableOptions"]);
const alignHeadersProp = computed(() => alignHeaders);
const addClassesToRowsProp = computed(() => addClassesToRows);
const drawCheckboxInRowHeadersProp = computed(() => drawCheckboxInRowHeaders);
const changeCheckboxCellProp = computed(() => changeCheckboxCell);
const dataProp = computed(() => props.tableOptions.data);
const progressBarRendererProp = computed(() => progressBarRenderer);
</script>

<template>
  <HotTable
    :data="dataProp"
    style="width: 100%"
    :height="400"
    :colWidths="tableOptions.colWidths"
    :colHeaders="tableOptions.colHeaders"
    :dropdownMenu="true"
    :multiColumnSorting="true"
    :filters="true"
    :rowHeaders="true"
    :afterGetColHeader="alignHeadersProp"
    :beforeRenderer="addClassesToRowsProp"
    :afterGetRowHeader="drawCheckboxInRowHeadersProp"
    :afterOnCellMouseDown="changeCheckboxCellProp"
    :manualRowMove="true"
    licenseKey="non-commercial-and-evaluation"
  >
    <template v-if="tableOptions.tableName == 'one'">
      <HotColumn
        data="Critical"
        :renderer=progressBarRendererProp
        style="display: flex; justify-content: center"
      ></HotColumn>
      <HotColumn data="Code" />
      <HotColumn data="Name" />
      <HotColumn data="Duration(Baseline)" />
      <HotColumn data="Duration(New)" />
      <HotColumn data="Ratio" />
    </template>
    <template v-if="tableOptions.tableName == 'two'">
      <HotColumn
        data="ID"
        style="display: flex; justify-content: center"
      ></HotColumn>
      <HotColumn data="Code" />
      <HotColumn data="Type" />
      <HotColumn data="Name" />
      <HotColumn data="Distribution" />
      <HotColumn data="Max" />
      <HotColumn data="Span" />
    </template>
    <template v-if="tableOptions.tableName=='three'">
      <HotColumn
        data="Critical"
        :renderer=progressBarRendererProp
        style="display: flex; justify-content: center"
      ></HotColumn>
      <HotColumn data="Task Code" />
      <HotColumn data="Resource Name" />
      <HotColumn data="Task Name" />
      <HotColumn data="Duration(Old)" />
      <HotColumn data="Duration(New)" />
      <HotColumn data="Utils(Old)" />
      <HotColumn data="Utils(New)" />
      <HotColumn data="ToTal Planned Units" />
    </template>
  </HotTable>
</template>

<style lang="css">
/*
  A stylesheet customizing app (custom renderers)
*/

table.htCore tr.odd td {
  height: 40px;
  background: #fafbff;
}

table.htCore tr.selected td {
  height: 40px;
  background: #edf3fd;
}

table.htCore td {
  padding: 0 40px;
  height: 40px;
  vertical-align: middle;
  text-align: center;
}
table.htCore th {
  height: 40px;
  vertical-align: middle;
  text-align: center;
}

/*
  A stylesheet customizing Handsontable style
*/

.handsontable {
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
}

.handsontable .collapsibleIndicator {
  text-align: center;
}

td .error {
  background: #ff4c42;
}
</style>

<!-- // tasks.resources
let TaskResources = store.selectedData.tasks.filter((e) => {
  let length = Object.keys(e.resources).length;
  return length !== 0; // 返回 resources 不为空的任务对象
});
let TaskResourcesData=[]
TaskResources=TaskResources.map((e)=>{
for (const key in e.resources) {
 let taskobj= store.selectedData.tasks.find((obj)=>{
    return obj.id==e.resources[key].taskId
  })
  let resourceobj=store.selectedData.newResources.find((obj)=>{
    return obj.id==e.resources[key].resourceId
  })
  e.resources[key].resourceId=resourceobj
  e.resources[key].taskId=taskobj
  // e.resources[key].resourceId
  TaskResourcesData.push( e.resources[key])

}
})
console.log(TaskResourcesData);
TaskResourcesData.map((e)=>{
return {
    Critical:e.taskId.critical,
    "Task Code":e.taskId.ID,
    "Resource Name":e.resourceId.name,
    "Task Name":e.taskId.name,
    "Duration(Old)":e.taskId.plannnedDuration,
    "Duration(New)":e.taskId.newDuration,
    'Utils(Old)':e.plannedUtisPerHour,
    'Utils(Nes)':e.newUnitsPerHour,
    'ToTal Planned Units':e.remainingUnits
}
}) -->