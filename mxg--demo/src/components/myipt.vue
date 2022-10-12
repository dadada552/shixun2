<template>
  <el-input
    :value="value"
    :placeholder="placeholder ? placeholder : '请输入'"
    style="width: 200px; margin-right: 10px"
    @focus="show"
  ></el-input>
</template>

<script>
export default {
  props: ["placeholder", "value"],
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
        show(){
            this.$emit('openGys')
        }
  },
};
</script>

<style scoped lang='scss'>
</style>
