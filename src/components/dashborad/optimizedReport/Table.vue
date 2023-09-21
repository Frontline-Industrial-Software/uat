<script setup>
import { defineComponent, ref, reactive, computed, onActivated } from 'vue'
import { registerAllModules } from 'handsontable/registry'
import 'handsontable/dist/handsontable.full.css'
import {
  alignHeaders,
  drawCheckboxInRowHeaders,
  addClassesToRows,
  changeCheckboxCell,
} from '@/utils/hooks-callback'
import { progressBarRenderer } from '@/utils/constants'
import { HotTable, HotColumn } from '@handsontable/vue3'
registerAllModules()
const props = defineProps(['tableOptions'])
const alignHeadersProp = computed(() => alignHeaders)
const addClassesToRowsProp = computed(() => addClassesToRows)
const drawCheckboxInRowHeadersProp = computed(() => drawCheckboxInRowHeaders)
const changeCheckboxCellProp = computed(() => changeCheckboxCell)
const dataProp = computed(() => props.tableOptions.data)
const progressBarRendererProp = computed(() => progressBarRenderer)
onActivated(() => {
  //   console.log(props.tableOptions.data);
  // console.log('chilren');
})
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
    :readOnly="true"
    licenseKey="non-commercial-and-evaluation"
  >
    <template v-if="tableOptions.tableName == 'one'">
      <HotColumn
        data="Critical"
        :renderer="progressBarRendererProp"
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
      <HotColumn data="Distribution(Min)" />
      <HotColumn data="Distribution(Max)" />
      <HotColumn data="Span" />
    </template>
    <template v-if="tableOptions.tableName == 'three'">
      <HotColumn
        data="Critical"
        :renderer="progressBarRendererProp"
        style="display: flex; justify-content: center"
      ></HotColumn>
      <HotColumn data="Task Code" />
      <HotColumn data="Resource Name" />
      <HotColumn data="Task Name" />
      <HotColumn data="Duration(Old)" />
      <HotColumn data="Duration(New)" />
      <HotColumn data="UnitsPerHour(Old)" />
      <HotColumn data="UnitsPerHour(New)" />
      <HotColumn data="Total Planned Units" />
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

.handsontable {
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
}

.handsontable .collapsibleIndicator {
  text-align: center;
}

td .error {
  background: #ff4c42;
}
</style>
