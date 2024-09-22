<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        ref="modal">
        <!-- 請同學自行新增 v-model -->
        <div class="modal-dialog modal-xl" aria-labelledby="exampleModalLabel" aria-hidden="true" role="document"
            ref="modal">
            <div class="modal-content border-0">
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消
                    </button>
                    <button type="button" class="btn btn-primary"
                        @click="$emit('update-product', tempProduct)">確認</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Modal from 'bootstrap/js/dist/modal';

    export default {
        props: {
            item: {},
        },
        data() {
            return {
                modal: {},
            }
        },
        methods: {
            showModal() {
                console.log(this.item);

                this.modal.show();
            },
            hideModal() {
                this.modal.hide();
            },
        },
        mounted() {
            this.modal = new Modal(this.$refs.modal);
        }
    }
</script>