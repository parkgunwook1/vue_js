<template>
    <main class="mt-3">
      <div class="container">
        <h2 class="text-center">주문완료</h2>
        <div class="float-end mb-1">
          <button type="button" class="btn btn-dark" @click="goToInsert">메인페이지 이동</button>
        </div>
       </div>
    </main>
    </template>
    <script>
    export default {
  methods: {
    
    goToInsert() {
      this.$router.push({path:'/'});
    }
}
    }
    </script>