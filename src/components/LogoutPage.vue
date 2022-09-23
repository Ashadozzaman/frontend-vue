<template>
  <div></div>
</template>

<script>
import toastr from 'toastr';

export default {
  name: "LogoutPage",
  created() {
    this.$store.dispatch("logout").then(res => {
      toastr.success(res.message)
      this.$router.push({
        name: "login",
      });
    });
  },
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
