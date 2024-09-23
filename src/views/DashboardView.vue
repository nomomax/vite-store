<template>
    <Loading :active="isLoading"></Loading>
    <Navbar />
    <div class="container-fluid">
        <ToastMessages></ToastMessages>
        <RouterView />
    </div>
</template>

<script>
    import { RouterView } from 'vue-router'
    import Navbar from '../components/NavbarCompo.vue'
    import emitter from '../methods/emitter'
    import ToastMessages from '@/components/ToastMessages.vue'

    export default {
        data() {
            return {
                isLoading: false,
            }
        },
        components: {
            RouterView,
            Navbar,
            ToastMessages,
        },
        provide() {
            return {
                emitter
            }
        },
        created() {
            this.isLoading = true;
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
            this.$http.defaults.headers.common['Authorization'] = token;
            
            const api = `${import.meta.env.VITE_API}api/user/check`;
            this.$http.post(api, this.user)
                .then((res) => {
                    this.isLoading = false;
                    if (!res.data.success) {
                        this.$router.push('/login');
                    }
                });
        }
    }
</script>