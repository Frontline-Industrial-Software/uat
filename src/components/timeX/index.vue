<template>
  <div v-if="TimeArray.length != 0" class="Timecontent">
    <div class="item" v-for="(Range, index) in timeData" :key="index">
      <div
        v-for="(data, dataindex) in Range.data"
        :style="`width: ${data.days * dayWidth}px`"
        :class="Range.className"
      >
        <span v-if="Range.label == 'Year Range'">
          <p>{{ data.data }}</p>
        </span>
        <span v-if="Range.label == 'Quarter Range'">
          <p>{{ data[0] }} {{ data[1] }}</p>
        </span>
        <span v-if="Range.label == 'Month Range'">
          <p>{{ data.data }}</p>
        </span>

        <span v-if="Range.label == 'Week Range'">
          <p>{{ data.data[0] }}</p>
          <p>{{ data.data[1] }}</p>
        </span>
        <span v-if="Range.label == 'Day Range'">
          <p>{{ data }}</p>
        </span>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
const dayWidth = 15 // 每天的宽度
let TimeArray = ref([])
const props = defineProps({
  startTime: Number,
  endTime: Number,
  chosenDate: String,
})
let timeData = computed(() => {
  let _data = []
  if (TimeArray.value) {
    switch (props.chosenDate) {
      case 'Day':
        _data.push(TimeArray.value[0])
        _data.push(TimeArray.value[1])
        break
      case 'Week':
        _data.push(TimeArray.value[1])
        _data.push(TimeArray.value[2])
        break
      case 'Month':
        _data.push(TimeArray.value[2])
        _data.push(TimeArray.value[3])
        break
      case 'Year':
        _data.push(TimeArray.value[3])
        _data.push(TimeArray.value[4])
        break
      default:
        break
    }
  }

  return _data
})
setTimeout(() => {
  if (props.startTime == null) {
    return
  }
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
  const quarterRange = []

  let currentDay = startDay
  let currentWeek = []
  let currentMonth = []
  let currentYear = []
  let currentQuarter = []

  while (currentDay <= endDay) {
    const currentDate = new Date(currentDay)
    const nextDay = new Date(currentDay)
    nextDay.setDate(nextDay.getDate() + 1)

    dayRange.push(currentDate.toLocaleDateString())

    // Calculate week logic
    if (currentDate.getDay() === 1) {
      if (currentWeek.length > 0) {
        weekRange.push(
          formatDateRange(currentWeek[0], currentWeek[currentWeek.length - 1]),
        )
        currentWeek = []
      }
    }
    currentWeek.push(currentDate.toLocaleDateString())

    // Calculate month logic
    if (currentDate.getDate() === 1 && currentMonth.length > 0) {
      monthRange.push(
        formatDateRange(currentMonth[0], currentMonth[currentMonth.length - 1]),
      )
      currentMonth = []
    }
    currentMonth.push(currentDate.toLocaleDateString())

    // Calculate year logic
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

    // Calculate quarter logic
    let Quarter
    let Month = currentDate.getMonth() + 1
    let Year = currentDate.getFullYear()
    if (Month >= 1 && Month <= 3) {
      Quarter = [Year, 'Q1']
    } else if (Month >= 4 && Month <= 6) {
      Quarter = [Year, 'Q2']
    } else if (Month >= 7 && Month <= 9) {
      Quarter = [Year, 'Q3']
    } else {
      Quarter = [Year, 'Q4']
    }
    currentQuarter.push(Quarter)
    currentDay = nextDay
  }

  // Handle the last week, month, year, and quarter
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
  if (currentQuarter.length > 0) {
    quarterRange.push(
      currentQuarter[0],
      currentQuarter[currentQuarter.length - 1],
    )
  }

  return [
    {
      label: 'Day Range',
      data: addNumberAttribute(dayRange, 'day'),
      className: 'day-range',
    },
    {
      label: 'Week Range',
      data: addNumberAttribute(weekRange, 'week'),
      className: 'week-range',
    },
    {
      label: 'Month Range',
      data: addNumberAttribute(monthRange, 'month'),
      className: 'month-range',
    },
    {
      label: 'Quarter Range',
      data: addNumberAttribute(quarterRange, 'quarter'),
      className: 'quarter-range',
    },
    {
      label: 'Year Range',
      data: addNumberAttribute(yearRange, 'year'),
      className: 'year-range',
    },
  ]
}

const addNumberAttribute = (data, type) => {
  data.map((e) => {
    switch (type) {
      case 'day':
        e = e.split('/')[2]
        break
      case 'week':
        e.data = formatDateStringRange(e.data)
        break
      case 'month':
        e.data = getMonthFromDateRange(e.data)
        break

      case 'year':
        e.data = e.data.split('/')[0]
        break
      default:
        break
    }
    return e
  })
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
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
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
  margin-bottom: -40px;
  overflow: hidden;
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
.quarter-range {
  height: 100%;
  font-size: 18px;
  text-align: center;
}
</style>
