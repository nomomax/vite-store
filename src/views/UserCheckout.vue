<template>
  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table align-middle">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.product.num }} / {{ item.product.unit }}</td>
            <td class="text-end">{{ item.product.price }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td class="text-end">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span class="text-success" v-else>付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-end" v-if="!order.is_paid">
        <button class="btn btn-danger">確認付款去</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        order: {
          user: {
            email: '',
            name: '',
            tel: '',
            address: '',
          }
        },
      }
    },
    methods: {
      getOrder() {
        const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/order/${this.id}`;
        this.isLoading = true
        this.$http.get(api).then((res) => {
          if (res.data.success) {
            this.order = res.data.order;
            console.log(this.order);
            this.isLoading = false;
          }
        })
      },
      payOrder() {
        const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/pay/${this.id}`;
        this.isLoading = true
        this.$http.post(api).then((res) => {
          if (res.data.success) {
            this.getOrder();
          }
        })
      }
    },
    created() {
      this.id = this.$route.params.orderId;
      this.getOrder();
    }
  }
</script>
