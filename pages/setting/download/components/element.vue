<template>
  <div class="element-item-ui">
    <!-- 字体元素 -->
    <div v-if="elementType === 'font'" class="min-list fx-allstart">
      <div class="min-item">
        <div class="min-title">文字大小</div>
        <el-select
          v-model="fontValue.fontSize"
          @change="elementChange('fontValue', 'fontSize', $event)"
        >
          <el-option
            v-for="(item, index) in fontSizeList"
            :key="index"
            :label="item.label"
            :value="item.value"
            >{{ item.label }}</el-option
          >
        </el-select>
      </div>
      <div class="min-item">
        <div class="min-title">文字形态</div>
        <el-select
          v-model="fontValue.fontStyle"
          @change="elementChange('fontValue', 'fontStyle', $event)"
        >
          <el-option
            v-for="(item, index) in fontStyleList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="min-item">
        <div class="min-title">文字颜色</div>
        <div class="fx-bstart">
          <el-color-picker
            v-model="fontValue.fontColor"
            @change="elementChange('fontValue', 'fontColor', $event)"
          ></el-color-picker>
          <el-input
            v-model="fontValue.fontColor"
            @change="elementChange('fontValue', 'fontColor', $event)"
          />
        </div>
      </div>
      <div v-if="showTextAlignOptions" class="min-item">
        <div class="min-title">文字位置</div>
        <el-select
          v-model="fontValue.textAlign"
          @change="elementChange('fontValue', 'textAlign', $event)"
        >
          <el-option
            v-for="(item, index) in textAlignList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>

    <!-- 表格元素 -->
    <div v-if="elementType === 'table'" class="min-list fx-allstart">
      <div class="min-item">
        <div class="min-title">线段大小</div>
        <el-select
          v-model="tableValue.borderWidth"
          @change="elementChange('tableValue', 'borderWidth', $event)"
        >
          <el-option
            v-for="(item, index) in borderWeightList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="min-item">
        <div class="min-title">线段类型</div>
        <el-select
          v-model="tableValue.borderStyle"
          @change="elementChange('tableValue', 'borderStyle', $event)"
        >
          <el-option
            v-for="(item, index) in borderStyleList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="min-item ">
        <div class="min-title">线段颜色</div>
        <div class="fx-bstart">
          <el-color-picker
            v-model="tableValue.borderColor"
            @change="elementChange('tableValue', 'borderColor', $event)"
          ></el-color-picker>
          <el-input
            v-model="tableValue.borderColor"
            @change="elementChange('tableValue', 'borderColor', $event)"
          />
        </div>
      </div>
    </div>

    <!-- 分割线 -->
    <div v-if="elementType === 'line'" class="min-list fx-allstart">
      <div class="min-item">
        <div class="fx-bstart">
          <el-color-picker
            v-model="lineValue.backgroundColor"
            @change="elementChange('lineValue', 'backgroundColor', $event)"
          ></el-color-picker>
          <el-input
            v-model="lineValue.backgroundColor"
            @change="elementChange('lineValue', 'backgroundColor', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    // 元素类型： font / table / line
    elementType: {
      type: String,
      default: 'font'
    },
    showTextAlignOptions: Boolean // 是否显示【文字位置】选项
  },
  data() {
    return {
      fontValue: {
        fontSize: '',
        fontStyle: '',
        fontColor: '',
        textAlign: 'text-align: left'
      },
      tableValue: {
        borderStyle: '',
        borderWidth: '',
        borderColor: ''
      },
      lineValue: {
        backgroundColor: ''
      },
      fontSizeList: [
        { value: 'font-size: 10px;', label: '10px' },
        { value: 'font-size: 12px;', label: '12px' },
        { value: 'font-size: 14px;', label: '14px' },
        { value: 'font-size: 16px;', label: '16px' },
        { value: 'font-size: 18px;', label: '18px' },
        { value: 'font-size: 20px;', label: '20px' },
        { value: 'font-size: 22px;', label: '22px' },
        { value: 'font-size: 24px;', label: '24px' },
        { value: 'font-size: 26px;', label: '26px' },
        { value: 'font-size: 28px;', label: '28px' },
        { value: 'font-size: 30px;', label: '30px' }
      ],
      fontStyleList: [
        { value: 'font-weight: normal;', label: '标准' },
        { value: 'font-weight: bold;', label: '粗体' }
      ],
      textAlignList: [
        { value: 'text-align: left', label: '置左' },
        { value: 'text-align: center', label: '置中' },
        { value: 'text-align: right', label: '置右' }
      ],
      borderStyleList: [
        { value: 'border-style: solid;', label: '实线' },
        { value: 'border-style: dashed;', label: '虚线' }
      ],
      borderWeightList: [
        { value: 'border-width: 1px;', label: '1px' },
        { value: 'border-width: 2px;', label: '2px' },
        { value: 'border-width: 3px;', label: '3px' }
      ]
    }
  },
  watch: {
    '$attrs.value': {
      immediate: true,
      deep: true,
      handler(nv, ov) {
        if (!nv) return
        for (const key in nv) {
          if (!nv[key]) return
          const nvArr = nv[key].match(/.+:\s(.+);/)
          if (key.match('Color') && nvArr) {
            nv[key] = nv[key].match(/.+:\s(.+);/)[1]
          }
        }
        this[this.elementType + 'Value'] = nv
      }
    }
  },
  methods: {
    // 元素更新
    elementChange(type, element, value) {
      this[type][element] = value
      this.$emit('input', this[type])
    }
  }
}
</script>

<style lang="less" scoped>
.element-item-ui {
  .min-item {
    margin-right: 30px;

    /deep/.el-select,
    /deep/.el-input {
      width: 150px;
    }

    /deep/.el-color-picker {
      margin-right: 8px;
    }
  }

  .mt38 {
    margin-top: 38px;
  }

  .min-title {
    color: #afb1b3;
  }
}

@media screen and (max-width: 1880px) {
  .element-item-ui {
    .min-item {
      /deep/.el-select,
      /deep/.el-input {
        width: 100px;
      }
    }
  }
}

@media screen and (max-width: 1500px) {
  .element-item-ui {
    .min-item {
      /deep/.el-select,
      /deep/.el-input {
        width: 80px;
      }
    }
  }
}
</style>
