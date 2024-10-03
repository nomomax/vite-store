<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-7">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sortedProducts" :key="item.id">
              <td style="width: 200px">
                <div style="height: 100px; background-size: cover; background-position: center"
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"></div>
              </td>
              <td>
                <a href="#" class="text-dark">{{ item.title }}</a>
              </td>
              <td>
                <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                <div class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</div>
                <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
              </td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button type="button" class="btn btn-outline-secondary" @click="getProduct(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if="cartLoadingItem === item.id"></i>
                    查看更多
                  </button>
                  <button type="button" class="btn btn-outline-danger" @click="addToCart(item.id)"
                    :disabled="cartLoadingItem === item.id">
                    <span class="spinner-border spinner-grow-sm" v-if="cartLoadingItem === item.id"></span>
                    加到購物車
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 購物車列表 -->
      <div class="col-md-5">
        <div class="sticky-top">
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 110px">數量</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="cart.carts">
                <tr v-for="item in cart.carts" :key="item.id">
                  <td>
                    <button type="button" class="btn btn-outline-danger btn-sm" :disabled="cartLoadingItem === item.id"
                      @click="removeCartItem(item.id)">
                      <i class="bi bi-x"></i>
                    </button>
                  </td>
                  <td>
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                  </td>
                  <td>
                    <div class="input-group input-group-sm">
                      <input type="number" min="1" class="form-control" :disabled="cartLoadingItem === item.id"
                        @change="updateCart(item)" v-model.number="item.qty" />
                      <div class="input-group-text">/ {{ item.product.unit }}</div>
                    </div>
                  </td>
                  <td class="text-end">
                    <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                    {{ $filters.currency(item.final_total) }}
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ $filters.currency(cart.total) }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-5 row justify-content-center">
      <Form class="col-md-6" v-slot="{ errors }" @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email" rules="email|required" v-model="form.user.email"></Field>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名" rules="required" v-model="form.user.name"></Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話" rules="required" v-model="form.user.tel"></Field>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址" rules="required" v-model="form.user.address"></Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea name="" id="message" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-end">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import productStore from '@/stores/productStore'
  import statusStore from '@/stores/statusStore';
  import cartStore from '@/stores/cartStore';

  export default {
    data() {
      return {
        coupon_code: '',
        form: {
          user: {
            email: '',
            name: '',
            tel: '',
            address: '',
          },
          message: '',
        },
      }
    },
    computed: {
      ...mapState(productStore, ['sortedProducts']),
      ...mapState(statusStore, ['isLoading', 'cartLoadingItem']),
      ...mapState(cartStore, ['cart']),
    },
    methods: {
      ...mapActions(productStore, ['getProducts']),
      ...mapActions(cartStore, ['getCart', 'addToCart', 'removeCartItem', 'updateCart']),
      getProduct(id) {
        this.$router.push(`/user/product/${id}`)
      },
      addCouponCode() {
        const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/coupon`
        const coupon = {
          code: this.coupon_code
        }
        this.$http.post(api, { data: coupon }).then((res) => {
          console.log(res)
          this.getCart()
        })
      },
      createOrder() {
        const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/order`;
        const order = this.form;
        this.isLoading = true
        this.$http.post(api, { data: order }).then((res) => {
          if (res.data.success) {
            this.$router.push(`/user/checkout/${res.data.orderId}`);
          }
        })
      }
    },
    created() {
      this.getProducts()
      this.getCart()
    }
  }
</script>
