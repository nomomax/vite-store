<template>
    <Navbar />
    <div class="container-fluid"></div>
    <RouterView />
</template>

<script>
    import { RouterView } from 'vue-router'
    import Navbar from '../components/NavbarCompo.vue'

    export default {
        components: {
            RouterView,
            Navbar
        },
        created() {

            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
            //console.log(token);
            this.$http.defaults.headers.common['Authorization'] = token;

            const api = `${import.meta.env.VITE_API}api/user/check`;
            this.$http.post(api, this.user)
                .then((res) => {
                    if (!res.data.success) {
                        this.$router.push('/login');
                    }
                });
        }
    }
</script>