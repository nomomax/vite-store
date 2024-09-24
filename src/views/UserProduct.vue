<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/user/cart">購物車</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-8">
        <h2>{{ product.title }}</h2>
        <div>{{ product.content }}</div>
        <div>{{ product.description }}</div>
        <img :src="product.imageUrl" alt="" class="img-fluid mb-3" />
      </article>
      <div class="col-4">
        <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
        <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
        <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
        <hr />
        <button type="button" class="btn btn-outline-danger" @click="addToCart(product.id)">
          加到購物車
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      id: '',
      isLoading: false,
    }
  },
  methods: {
    getProduct() {
      const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/product/${this.id}`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.product = res.data.product
        }
      })
    },
    addToCart(id, qty = 1) {
      const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.isLoading = true
      this.$http.post(api, { data: cart }).then((response) => {
        this.$httpMessageState(response, '加入購物車')
        this.$router.push('/user/cart')
      })
    }
  },
  created() {
    this.id = this.$route.params.productId
    this.getProduct()
  }
}
</script>
