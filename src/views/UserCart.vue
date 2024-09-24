<template>
    <Loading :active="isLoading"></Loading>
    <div class="container">
        <div class="row mt-4">
            <div class="col-md-12">
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
                        <tr v-for="item in products" :key="item.id">
                            <td style="width: 200px">
                                <div style="height: 100px; background-size: cover; background-position: center;" :style="{ backgroundImage: `url(${item.imageUrl})` }">
                                </div>
                            </td>
                            <td><a href="#" class="text-dark">{{ item.title }}</a></td>
                            <td>
                                <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                                <div class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</div>
                                <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
                            </td>
                            <td>
                                <div class="btn-group btn-group-sm">
                                    <button type="button" class="btn btn-outline-secondary" @click="getProduct(item.id)">
                                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                                        查看更多
                                    </button>
                                    <button type="button" class="btn btn-outline-danger" @click="addToCart(item.id)" :disabled="status.loadingItem === item.id">
                                        <span class="spinner-border spinner-grow-sm" v-if="status.loadingItem === item.id"></span>
                                        加到購物車
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [],
            product: {},
            status: {
                loadingItem: '',
            }
        }
    },
    methods: {
        getProducts() {
            const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/products/all`;
            this.isLoading = true;
            this.$http.get(api)
                .then((res) => {
                    this.products = res.data.products;
                    this.isLoading = false;
                    console.log(this.products);
                });
        },
        getProduct(id) {
            this.$router.push(`/user/product/${id}`);
        },
        addToCart(id) {
            const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart`;
            const cart = {
                product_id: id,
                qty: 1,
            };
            this.status.loadingItem = id;
            this.$http.post(api, { data: cart })
                .then((res) => {
                    console.log(res);
                    this.status.loadingItem = '';
                });
        }
    },
    created() {
        this.getProducts();
    }
}
</script>