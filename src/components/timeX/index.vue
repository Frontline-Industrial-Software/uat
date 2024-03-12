<template>
  <div class="Timecontent">
    <div class="item" v-for="(Range, index) in TimeArray" :key="index">
      <div
        v-if="Range.label === 'Day Range'"
        :class="Range.className"
        v-for="(data, dataindex) in Range.data"
        :key="dataindex"
        :style="`width: ${dayWidth}px`"
      >
        <span v-if="props.chosenDate === 'Day'">
          {{ data.split('/')[2] }}
        </span>
      </div>
      <div
        v-if="Range.label === 'Week Range'"
        :class="Range.className"
        v-for="(data, dataindex) in Range.data"
        :style="`width: ${data.days * dayWidth}px`"
      >
        <span v-if="props.chosenDate === 'Day' || props.chosenDate === 'Week'">
          <p>{{ formatDateStringRange(data.data)[0] }}</p>
          <p>{{ formatDateStringRange(data.data)[1] }}</p>
        </span>
      </div>
      <div
        v-if="Range.label === 'Month Range'"
        :class="Range.className"
        v-for="(data, dataindex) in Range.data"
        :style="`width: ${data.days * dayWidth}px`"
      >
        <!-- 默认处理方式 -->
        <span
          v-if="
            props.chosenDate === 'Day' ||
            props.chosenDate === 'Week' ||
            props.chosenDate === 'Month'
          "
        >
          {{ getMonthFromDateRange(data.data) }}
        </span>
      </div>
      <div
        v-if="Range.label === 'Year Range'"
        :class="Range.className"
        v-for="(data, dataindex) in Range.data"
        :style="`width: ${data.days * dayWidth}px`"
      >
        <span
          v-if="
            props.chosenDate === 'Day' ||
            props.chosenDate === 'Week' ||
            props.chosenDate === 'Month' ||
            props.chosenDate === 'Year'
          "
        >
          {{ data.data.split('/')[0] }}
        </span>

        <!-- {{ data.split('/')[2] }} -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const dayWidth = 15 // 每天的宽度
let TimeArray = ref([])
const props = defineProps({
  startTime: Number,
  endTime: Number,
  chosenDate: String,
})
setTimeout(() => {
  getDate(props.startTime, props.endTime, props.chosenDate)
}, 0)
watch(
  () => ({
    startTime: props.startTime,
    endTime: props.endTime,
  }),
  () => {
    getDate(props.startTime, props.endTime, props.chosenDate)
  },
  { deep: true },
)

function getDate(start, end, type) {
  TimeArray.value = getRanges(start, end)
}
function getRanges(startTimestamp, endTimestamp) {
  const startDay = new Date(startTimestamp).setHours(0, 0, 0, 0)
  const endDay = new Date(endTimestamp).setHours(0, 0, 0, 0)

  const dayRange = []
  const weekRange = []
  const monthRange = []
  const yearRange = []

  let currentDay = startDay
  let currentWeek = []
  let currentMonth = []
  let currentYear = []

  while (currentDay <= endDay) {
    const currentDate = new Date(currentDay)
    const nextDay = new Date(currentDay)
    nextDay.setDate(nextDay.getDate() + 1)

    dayRange.push(currentDate.toLocaleDateString())

    // 计算周的逻辑
    if (currentDate.getDay() === 1) {
      if (currentWeek.length > 0) {
        weekRange.push(
          formatDateRange(currentWeek[0], currentWeek[currentWeek.length - 1]),
        )
        currentWeek = []
      }
    }
    currentWeek.push(currentDate.toLocaleDateString())

    // 计算月的逻辑
    if (currentDate.getDate() === 1 && currentMonth.length > 0) {
      monthRange.push(
        formatDateRange(currentMonth[0], currentMonth[currentMonth.length - 1]),
      )
      currentMonth = []
    }
    currentMonth.push(currentDate.toLocaleDateString())

    // 计算年的逻辑
    if (
      currentDate.getMonth() === 0 &&
      currentDate.getDate() === 1 &&
      currentYear.length > 0
    ) {
      yearRange.push(
        formatDateRange(currentYear[0], currentYear[currentYear.length - 1]),
      )

      currentYear = []
    }
    currentYear.push(currentDate.toLocaleDateString())

    currentDay = nextDay
  }

  // 处理最后一周、最后一个月和最后一年
  if (currentWeek.length > 0) {
    weekRange.push(
      formatDateRange(currentWeek[0], currentWeek[currentWeek.length - 1]),
    )
  }
  if (currentMonth.length > 0) {
    monthRange.push(
      formatDateRange(currentMonth[0], currentMonth[currentMonth.length - 1]),
    )
  }
  if (currentYear.length > 0) {
    yearRange.push(
      formatDateRange(currentYear[0], currentYear[currentYear.length - 1]),
    )
  }
  return [
    {
      label: 'Day Range',
      data: addNumberAttribute(dayRange),
      className: 'day-range',
    },
    {
      label: 'Week Range',
      data: addNumberAttribute(weekRange),
      className: 'week-range',
    },
    {
      label: 'Month Range',
      data: addNumberAttribute(monthRange),
      className: 'month-range',
    },
    {
      label: 'Year Range',
      data: addNumberAttribute(yearRange),
      className: 'year-range',
    },
  ]
  // return [dayRange, weekRange, monthRange, yearRange];
}

const addNumberAttribute = (data) => {
  return data
}
function formatDateRange(start, end) {
  const startFormatted = new Date(start).toLocaleDateString()
  const endFormatted = new Date(end).toLocaleDateString()
  const startDate = new Date(start)
  const endDate = new Date(end)

  // 计算相差的时间（毫秒数）
  const timeDifference = endDate.getTime() - startDate.getTime()

  // 将毫秒数转换为天数
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1

  return { data: `${startFormatted} - ${endFormatted}`, days: daysDifference }
}

function formatDateStringRange(dateStringRange) {
  const [startDateString, endDateString] = dateStringRange.split(' - ')
  const startDate = new Date(startDateString)
  const endDate = new Date(endDateString)

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const startMonth = monthNames[startDate.getMonth()]
  const startDay = startDate.getDate()
  const endMonth = monthNames[endDate.getMonth()]
  const endDay = endDate.getDate()
  if (startMonth == endMonth) {
    return [`${startDay}-${endDay}`, `${startMonth} `]
  } else {
    return [` ${startDay}-${endDay} `, `${startMonth} -${endMonth}`]
  }
}
function getMonthFromDateRange(dateRange) {
  const [startDateString, endDateString] = dateRange.split(' - ')
  const startDate = new Date(startDateString)
  const endDate = new Date(endDateString)

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  if (startDate.getMonth() === endDate.getMonth()) {
    return monthNames[startDate.getMonth()]
  } else {
    return `${monthNames[startDate.getMonth()]} - ${
      monthNames[endDate.getMonth()]
    }`
  }
}
</script>

<style lang="scss" scoped>
.Timecontent {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column-reverse;
}
.item {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex: 1 0 0;
}
.day-range {
  height: 100%;
  font-size: 12px;
  text-align: center;
}
.week-range {
  height: 100%;
  font-size: 14px;
  text-align: center;
  // border: 0.5px solid #f0f0f0;
  overflow: hidden; /* 隐藏溢出部分 */
  white-space: nowrap; /* 防止文本换行 */
  text-overflow: ellipsis; /* 在溢出时显示省略号 */
}
.month-range {
  height: 100%;
  font-size: 16px;
  text-align: center;
  // border: 0.5px solid #f0f0f0;
}
.year-range {
  height: 100%;
  font-size: 20px;
  text-align: center;
  // border: 0.5px solid #f0f0f0;
}
</style>
