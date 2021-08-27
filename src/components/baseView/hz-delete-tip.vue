<template>
  <el-popover placement="top"
              width="160"
              v-model="visible">
    <p>确定删除吗？</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini"
                 type="text"
                 @click="visible = false">取消</el-button>
      <el-button type="primary"
                 size="mini"
                 @click="submit">确定</el-button>
    </div>
    <el-button>删除</el-button>
  </el-popover>
</template>

<script>
export default {
  name: "deleteTip",
  data () {
    return {
      visible: false,
    };
  },
  props: {
    ok: {
      type: Function,
      default () {
        return function () { };
      }
    },
    submit () {
      this.visible = false
      this.ok();
    }
  }
}
</script>