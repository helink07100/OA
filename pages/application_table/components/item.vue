<template>
  <div class="item">
    <table>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>
<style lang="less" scoped>
.item {
  margin-bottom: 15px;
  cursor: pointer;
  table {
    width: 100%;
  }
  /deep/ td {
    border: solid 1px #f1f1f1;
    text-align: center;
    padding: 10px;
  }
  /deep/ .cell {
    width: 100%;
    height: 12px;
    background: #f6f6f6;
  }
  /deep/ .title-column {
    .cell {
      width: 20%;
      margin: 0 auto;
    }
  }
}
</style>
