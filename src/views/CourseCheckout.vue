<template>
  <div class="container">
    <br />
    <form @submit.prevent="checkout_submit">
      <div class="card">
        <div class="card-header">
          <b>Course Details</b>
        </div>
        <div class="card-body">
          <input type="hidden" id="course_id" v-model="checkout_coupon.course_id" />
          <div class="row">
            <div class="col-6">
              <label for="">Course Name: </label>
              <b> {{ course.name }} </b>
              <p>
                Product Price: <b>{{ course.amount }}৳</b>
              </p>
            </div>
            <div class="col-6">
              <form @submit.prevent="coupon_submit" style="display: flex">
                <input
                  type="text"
                  class="form-control"
                  id="coupon"
                  aria-describedby="couponHelp"
                  name="coupon"
                  placeholder="USE COUPON"
                  required
                  v-model="coupon_data.coupon"
                />
                <input type="hidden" id="course_id" v-model="coupon_data.course_id" />

                <div class="text-end">
                  <button type="submit" class="btn btn-primary">Apply</button>
                </div>
              </form>
            </div>
            <div class="col-md-6">
              <div v-if="coupon !== null">
                <label for="">Discount: -{{ coupon.rate }} {{ coupon.type }}</label>
                <br />
                <label for="">Final Price:</label>
                <input
                  class="form-control"
                  type="text"
                  id="final_price"
                  v-model="checkout_coupon.final_price"
                  readonly
                />
                <label for="">Use Coupon:</label>
                <input
                  class="form-control"
                  type="text"
                  id="coupon_code"
                  v-model="checkout_coupon.coupon_code"
                  readonly
                />
              </div>

              <div v-if="coupon === null">
                <label for="">Final Price:</label>
                <input
                  class="form-control"
                  type="text"
                  id="final_price"
                  v-model="checkout_coupon.final_price"
                  readonly
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer text-center">
          <button type="submit" class="btn btn-primary">Checkout</button>
        </div>
      </div>
    </form>
    <br />
  </div>
</template>

<script>
import toastr from "toastr";

export default {
  name: "CourseCheckout",
  data() {
    return {
      id: this.$route.params.id,
      course: {},
      coupon_data: {
        course_id: this.$route.params.id,
        coupon: null,
      },
      coupon: null,
      checkout_coupon: {
        course_id: null,
        coupon_code: null,
        final_price: null,
      },
    };
  },
  created() {
    this.$store.dispatch("course_checkout", this.id).then((res) => {
      toastr.success(res.message);
      this.course = res.data.course;
      this.checkout_coupon.course_id = res.data.course.id;
      this.checkout_coupon.final_price = res.data.course.amount;
    });
  },
  props: {},
  methods: {
    coupon_submit() {
      this.$store
        .dispatch("coupon_submit", this.coupon_data)
        .then((res) => {
          toastr.success(res.message);
          this.course = res.data.course;
          this.coupon = res.data.coupon;
          this.checkout_coupon.course_id = res.data.course.id;
          this.checkout_coupon.coupon_code = res.data.coupon.coupon;
          this.checkout_coupon.final_price = res.data.coupon.final_price;
          // console.log(res.data.coupon);
        })
        .catch((error) => {
          toastr.error(error.response.data.error);
          this.coupon = null;
        });
    },
    checkout_submit() {
      this.$store
        .dispatch("checkout_submit", this.checkout_coupon)
        .then((res) => {
          toastr.success(res.message);
          console.log(res.data);
          this.$router.push({
            name:'course'
          })
        })
        .catch((error) => {
          toastr.error(error.response.data.error);
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
