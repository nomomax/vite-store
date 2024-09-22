<template>
    <div class="text-end">
        <button class="btn btn-primary" type="button" @click="openModal(true)">增加一個產品</button>
    </div>
    <table class="table mt-4">
        <thead>
            <tr>
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="100">是否啟用</th>
                <th width="200">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in products" :key="item.id">
                <td>{{ item.category }}</td>
                <td>{{ item.title }}</td>
                <td class="text-right">
                    {{ item.origin_price }}
                </td>
                <td class="text-right">
                    {{ item.price }}
                </td>
                <td>
                    <span class="text-success" v-if="item.is_enabled">啟用</span>
                    <span class="text-muted" v-else>未啟用</span>
                </td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm" @click="delModal(item)">刪除</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <ProductModal :product="tempProduct" @update-product="updateProduct" ref="productModal"></ProductModal>
    <DelModal :item="tempProduct" ref="deleteModal"></DelModal>
</template>

<script>
    import ProductModal from '@/components/ProductModal.vue';
    import DelModal from '@/components/DelModal.vue';

    export default {
        components: {
            ProductModal,
            DelModal
        },
        data() {
            return {
                products: [],
                pagination: {},
                tempProduct: {},
                isNew: false,
            };
        },
        methods: {
            openModal(isNew, item) {
                if (isNew) {
                    this.tempProduct = {};
                } else {
                    this.tempProduct = { ...item };
                }
                this.isNew = isNew;
                this.$refs.productModal.showModal();
            },
            closeModal() {
                this.$refs.productModal.hideModal();
            },
            delModal(item) {
                this.tempProduct = { ...item };
                this.$refs.deleteModal.showModal();
            },
            getProducts() {
                const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/products`;
                this.$http.get(api)
                    .then((res) => {
                        if (res.data.success) {
                            this.products = res.data.products;
                            this.pagination = res.data.pagination;
                        }
                    });
            },
            updateProduct(item) {
                this.tempProduct = item;

                // 新增
                let api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product`;
                let httpMethod = 'post';
                // 編輯
                if (!this.isNew) {
                    api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product/${item.id}`;
                    httpMethod = 'put';
                }

                this.$http[httpMethod](api, { data: this.tempProduct })
                    .then((res) => {
                        if (res.data.success) {
                            console.log('success');
                        }
                        console.log(res);
                        this.closeModal();
                        this.getProducts();
                    });
            },
            deleteProduct(item) {
                console.log(item);

            }
        },
        created() {
            this.getProducts();
        }
    }
</script>