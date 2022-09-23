<template>
  <div class="container about">
    <div class="row">
      <div class="col-md-3 course"  v-for="(result) in results" :key="result.id">
        <div class="card">
          <div class="card-header">
            <label for="">Course Name: </label>
            <b> {{result.name}} </b>
          </div>
          <div class="card-body">
            <p>Product Price: <b>{{ result.amount }}৳</b></p>
          </div>
          <div class="card-footer text-center">
              <router-link class="btn btn-info btn-sm" :to="{name:'course.checkout', params: { id: result.id }}">Buy</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import toastr from 'toastr';
  export default {
    name: "CourseView",
    data() {
      return {
        results:[]
      };
    },
    created() {
      this.$store.dispatch("course").then(res => {
        toastr.success(res.message)
        this.results = res.courses
      });
    },
    props: {},
    methods: {
      
    },
  };
  </script>
  <style>
    .course{
      padding: 10px;
    }
  </style>
  
