<template>
  <div class="right-items">
    <div :style="{ height: height + 'px' }" class="right-item">
      <div class="title">{{ props.title }}</div>
      <div class="content">
        <div class="t-content">
          <span class="f">
            {{ props.body && props.body.length > 0 ? props.body[0] : null }}
          </span>
          <span
            v-if="
              props.precent &&
              props.precent.indexOf('-') !== -1 * props.isPositive
            "
            style="color: #10be00; font-weight: 700"
          >
            <img
              style="vertical-align: bottom"
              src="/arrow-up-thin.svg"
              alt=""
              srcset=""
            />
            <span>{{ props.precent }}</span>
          </span>
          <span
            v-else-if="props.precent"
            style="color: #be0010; font-weight: 700"
          >
            <img
              style="vertical-align: bottom"
              src="/arrow-down-thin.svg"
              alt=""
              srcset=""
            />
            <span>{{ props.precent }}</span>
          </span>
        </div>
        <div class="b-content">
          <div style="border-right: 1px solid #f0f1f3" class="bottom">
            <span>
              {{ props.body && props.body.length > 0 ? props.body[1] : null }}
            </span>
            <div>Actual</div>
          </div>
          <div class="bottom">
            <span>
              {{
                props.body && props.body.length > 0
                  ? props.body[2] !== null && props.body[2] !== undefined
                    ? props.body[2]
                    : props.body[1]
                  : null
              }}
            </span>
            <div>Plan</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['title', 'body', 'precent', 'height', 'isPositive'])
</script>

<style lang="scss" scoped>
.right-items {
  display: flex;
  justify-content: space-evenly;
  align-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  .t-content {
    display: flex;
    justify-content: flex-start;
    padding-left: 16px;
    align-items: center;
    .f {
      color: #545454;
      font-weight: 700;
      font-size: 32px;
    }
  }
  .b-content {
    border-top: 1px solid #f0f1f3;
    padding: 0px 16px;
  }
  .bottom {
    color: #b5b5b5;
    // text-align: center;
    > span {
      font-weight: 700;
      font-size: 20px;
    }
  }
  .title {
    width: 100%;
    height: 15%;
    color: #b5b5b5;
    padding: 8px 16px;
  }
  .content {
    display: flex;

    flex-wrap: wrap;
    width: 100%;
    height: 80%;
    > div {
      width: 100%;
      height: 50%;
      display: flex;
      flex-wrap: wrap;
      > div {
        // background-color: #40a795;
        width: 50%;
        height: 100%;
        text-align: center;
      }
    }
  }
  .right-item {
    flex: 1;
    box-shadow: 1px 1px 20px rgba(205.06, 205.06, 205.06, 0.25);
    margin: 4px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 16px;
    width: 48%;

    display: flex;
    flex-wrap: wrap;
  }
}
</style>
