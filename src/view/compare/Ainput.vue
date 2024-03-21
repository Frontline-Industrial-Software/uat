<template>
  <el-button size="small" text ref="buttonRef" v-click-outside="onClickOutside">
    <el-icon>
      <Filter />
    </el-icon>
  </el-button>
  <el-popover
    ref="popoverRef"
    :virtual-ref="buttonRef"
    trigger="click"
    title="Filter"
    virtual-triggering
    placement="top-start"
    width="200px"
  >
    <el-input v-model="input" style="width: 170px" placeholder="Please input" />
    <div style="display: flex; justify-content: space-around">
      <el-button
        @click="
          () => {
            sendData(input)
          }
        "
      >
        Apply
      </el-button>
      <el-button
        @click="
          () => {
            sendData('')
          }
        "
      >
        Reset
      </el-button>
    </div>
  </el-popover>
</template>

<script setup>
import { Filter } from '@element-plus/icons-vue'
defineOptions({
  name: 'AInput',
})
import { onMounted, ref, watch, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
})
const input = ref('')
const emit = defineEmits(['update:value'])
// watch(input, (newVal) => {
//   onInput(newVal)
// })
function sendData(val) {
  input.value = val
  emit('update:value', input.value)
}
// function
const onInput = (v) => {
  input.value = v
  emit('update:value', v)
}
defineExpose({
  setValue: (v) => {
    input.value = v
  },
})
onMounted(() => {
  input.value = props.value
})
</script>
