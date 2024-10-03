<template>
  <div class="about">
    <h1>This is an about page</h1>
    <br>
    <br>
    {{ user.name }}, {{ user.getUserName }}, {{ user.wallet }}
    <button type="button" @click="user.updateName">按我</button>
    <br>
    {{ name }}, {{ getUserName }}, {{ wallet }}
    <button type="button" @click="updateData">按我</button>
    <button type="button" @click="reset">Reset</button>
  </div>
</template>

<script>
  import userStore from '@/stores/user'
  import { storeToRefs } from 'pinia';
  // import { mapState, mapActions } from 'pinia'

  export default {
    setup() {
      const user = userStore();
      const { name, wallet, getUserName } = storeToRefs(user);
      const { updateName } = user;

      function updateData() {
        console.log(user);

        user.$patch({
          name: '漂亮阿姨',
          wallet: 1000,
        });
      }

      function reset() {
        user.$reset();
      }

      return {
        user,
        name,
        wallet,
        getUserName,
        updateName,
        updateData,
        reset,
      }

    }
    // data() {
    //   return {
    //     data: {}
    //   }
    // },
    // computed: {
    //   ...mapState(userStore, ['name', 'wallet', 'getUserName'])
    // },
    // methods: {
    //   ...mapActions(userStore, ['updateName'])
    // },
    // mounted() {
    //   console.log(import.meta.env.VITE_API, import.meta.env.VITE_PATH)
    // }
  }
</script>

<style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>
