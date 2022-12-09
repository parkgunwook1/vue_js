<template>
<main class="mt-3">
  <div class="container">
    <h2 class="text-center">장바구니</h2>
    <div class="float-end mb-1">
      <button type="button" class="btn btn-dark" @click="goToInsert">메인페이지 이동</button>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th></th>
          <th>제품명</th>
          <th>제품가격</th>
          <th>총 상품 금액</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(product, i) in productList">
          <td>
            <img v-if="product.path!=null" :src="`/download/${product.id}/${product.path}`" style="height:50px;width:auto;" />
          </td>        
          <td>{{product.product_name}}</td>
          <td>{{product.product_price}}</td>
          <td>{{getCurrencyFormat(totalPrice)}}원</td>
          <td>
            <div class="col-auto">
                    <div class="input-group">
                      <span class="input-group-text" style="cursor:pointer;" @click="calculatePrice(-1);">-</span>
                      <input type="text" class="form-control" style="width:40px;" v-model="total">
                      <span class="input-group-text" style="cursor:pointer;" @click="calculatePrice(1);">+</span>
                    </div>
                  </div>
            <button type="button" class="btn btn-dark me-1" @click="goToorder(product.id);">주문</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct(product.id);">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</main>
</template>
<script>
export default {
  data() {
    return {
      productList: [],
      productcart: [],
      productId: 0,
      productDetail: {},
      productImage: [],
      total: 1,
      totalPrice: 0, 
    };
  },
  created() {
    this.productId = this.$route.query.product_id;
    this.getProductList();
    this.getProductDetail();
  },
  methods: {
    async getProductList() {
      this.productList = await this.$api("/api/productList2",{});
      console.log(this.productList);
    },
    goToInsert() {
      this.$router.push({path:'/'});
    },
    calculatePrice(cnt) {
      let total = this.total + cnt;
      if(total < 1) total = 1;
      this.total = total;
      this.totalPrice = this.productDetail.product_price * this.total;
    },
    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },
    async getProductDetail() {
      let productDetail = await this.$api("/api/productDetail",{param:[this.productId]});
      if(productDetail.length > 0) {
        this.productDetail = productDetail[0];
        this.totalPrice = this.totalPrice = this.productDetail.product_price * this.total;
      }
      console.log(this.productDetail);
    },
    goToDetail(product_id) {
     this.$router.push({path:'/detail', query:{product_id:product_id}}); 
    },
    goToorder(product_id) {
      this.$swal.fire({
        title: '주문 하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: `주문`,
        cancelButtonText: `취소`
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log(product_id)
          await this.$api("/api/productInsert",{param:[product_id]});
          this.getProductList();
          this.$swal.fire('주문 완료되었습니다.!', '', 'success')
          this.$router.push({path:'/order'}); 
        } 
      });
      
    },
    deleteProduct(product_id) {
      this.$swal.fire({
        title: '정말 삭제하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: `삭제`,
        cancelButtonText: `취소`
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log(product_id)
          await this.$api("/api/productDelete",{param:[product_id]});
          this.getProductList();
          this.$swal.fire('삭제되었습니다!', '', 'success')
        } 
      });
    }
  }
}
</script>