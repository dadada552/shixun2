<template>
  <div>
    <span
      v-for="item in val"
      :key="item"
      :class="item == active ? 'active' : ''"
      @click="changeactive(item)"
      ><slot :name="item"></slot
    ></span>
  </div>
</template>

<script>
export default {
  props: ["val"],
  name: "",
  components: {},
  data() {
    return {
      active: 1,
    };
  },
  created() {},
  mounted() {},
  methods: {
    changeactive(num) {
      this.active = num;
    },
  },
  watch: {
    active: function (val) {
      console.log(val);
      this.$emit("fromChild", val);
    },
  },
};
</script>

<style scoped lang='scss'>
.active {
  color: orangered;
  font-size: 18px;
}
</style>
