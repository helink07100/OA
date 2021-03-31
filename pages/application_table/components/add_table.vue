<template>
  <div class="add-template-box">
    <div class="table-wrap">
      <!-- 模板 A -->
      <trItem>
        <tr @click="$emit('add', 'A')">
          <td v-for="item in [1, 2, 3, 4]" :key="item">
            <div class="cell"></div>
          </td>
        </tr>
      </trItem>

      <!-- 模板 B 标题栏 -->
      <trItem>
        <tr class="title-column" @click="$emit('add', 'B')">
          <td>
            <div class="cell"></div>
          </td>
        </tr>
      </trItem>

      <!-- 模板 C -->
      <trItem>
        <tr @click="$emit('add', 'C')">
          <td rowspan="2" width="116" style="position: relative">
            <div class="oa-table-flex">
              <div class="flex-1">
                <div class="cell"></div>
              </div>
              <div class="line-h"></div>
              <div class="flex-1 ml-sm">
                <div class="cell top"></div>
                <div class="line-w"></div>
                <div class="cell bottom mt-sm"></div>
              </div>
            </div>
          </td>
          <td v-for="item in [1, 2, 3]" :key="item">
            <div class="cell"></div>
          </td>
        </tr>
        <tr @click="$emit('add', 'C')">
          <td v-for="item in [1, 2, 3]" :key="item">
            <div class="cell"></div>
          </td>
        </tr>
      </trItem>

      <!-- 模板 G -->
      <trItem>
        <tr @click="$emit('add', 'G')">
          <td rowspan="2" width="116" style="position: relative">
            <div class="cell"></div>
          </td>
          <td v-for="item in [1, 2, 3]" :key="item">
            <div class="cell"></div>
          </td>
        </tr>
        <tr @click="$emit('add', 'G')">
          <td v-for="item in [1, 2, 3]" :key="item">
            <div class="cell"></div>
          </td>
        </tr>
      </trItem>

      <!-- 模板 D 文本 -->
      <trItem>
        <tr @click="$emit('add', 'D')">
          <td width="116">
            <div class="cell"></div>
          </td>
          <td>
            <div class="text mb-sm" style="padding-right: 100px">
              <div class="cell"></div>
            </div>
            <div class="signature-date">
              <div class="cell signature"></div>
              <div class="cell date"></div>
            </div>
          </td>
        </tr>
      </trItem>

      <!-- 模板 E checkbox 选项 -->
      <trItem>
        <tr @click="$emit('add', 'E')">
          <td width="116">
            <div class="cell"></div>
          </td>
          <td>
            <div class="checkbox-style">
              <label
                v-for="item in [1, 2, 3]"
                :key="item"
                class="checkbox-cell"
              >
                <div class="cell checkbox"></div>
                <div class="cell text"></div>
              </label>
            </div>
            <div class="signature-date">
              <div class="cell signature"></div>
              <div class="cell date"></div>
            </div>
          </td>
        </tr>
      </trItem>

      <!-- 模板 F checkbox 选项 -->
      <trItem>
        <tr @click="$emit('add', 'F')">
          <td width="116">
            <div class="cell"></div>
          </td>
          <td>
            <div class="checkbox-style" style="margin-bottom:0">
              <label
                v-for="item in [1, 2, 3]"
                :key="item"
                class="checkbox-cell"
              >
                <div class="cell checkbox"></div>
                <div class="cell text"></div>
              </label>
            </div>
          </td>
        </tr>
      </trItem>
    </div>
  </div>
</template>
<script>
import trItem from './item'
export default {
  components: {
    trItem
  }
}
</script>
<style lang="less" scoped>
.oa-table-flex {
  display: flex;
  align-items: center;
  .line-h {
    width: 1px;
    height: 100%;
    background: #f1f1f1;
    position: absolute;
    left: 58px;
    top: 0;
  }
  .line-w {
    width: 50%;
    height: 1px;
    background: #f1f1f1;
    position: absolute;
    right: 0;
    top: 32px;
  }
  .bottom {
    position: relative;
    bottom: -5px;
  }
  .top {
    position: relative;
    top: -5px;
  }
}
.flex-1 {
  flex: 1;
}
.add-template-box {
  background: #fff;
  padding: 30px;
  .table-wrap {
    .checkbox-style {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .checkbox-cell {
        display: flex;
        align-items: center;
        padding-right: 15px;
        .checkbox {
          width: 15px;
          margin-right: 5px;
        }
        .text {
          width: 50px;
        }
      }
    }
    .signature-date {
      float: right;
      .signature {
        width: 80px;
        margin-bottom: 10px;
      }
      .date {
        width: 40px;
      }
    }
  }
}
</style>
