<template>
  <el-form>
    <el-row class="content">
      <el-col class="detail-control-item" :span="12">
        <el-form-item label="申请日期 ：" prop="show_name"
          >系统自带
        </el-form-item>
      </el-col>
      <el-col class="detail-control-item" :span="12">
        <el-form-item label="编号：" prop="show_name"
          >前缀＋系统产生
        </el-form-item>
      </el-col>
      <el-col class="detail-control-item" :span="12">
        <el-form-item label="姓名：" prop="show_name">
          系统自带
        </el-form-item>
      </el-col>
      <el-col class="detail-control-item" :span="12">
        <el-form-item label="部门：" prop="department_name">
          系统自带
        </el-form-item>
      </el-col>
      <el-col class="detail-control-item" :span="12">
        <el-form-item label="岗位：" prop="station_name">
          系统自带
        </el-form-item>
      </el-col>
      <el-col class="detail-control-item" :span="12">
        <el-form-item label="公司名称：" prop="station_name">
          系统自带
        </el-form-item>
      </el-col>
      <el-col class="detail-control-item" :span="12">
        <el-form-item label="紧急程度：" prop="level">
          申请人自选
        </el-form-item>
      </el-col>
      <el-col class="detail-control-item" :span="12">
        <el-form-item label="关连表单：" prop="follow_ids">
          <a href="javascript:;" class="text-primary"> 申请人自选</a>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: {
    link: { default: '', type: String },
    createTime: { default: '', type: String },
    no: { default: '', type: String }
  }
}
</script>

<style></style>
