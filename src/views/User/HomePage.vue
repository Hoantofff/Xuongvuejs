<script setup>
import { RouterView, RouterLink } from 'vue-router';
import Header from '@/components/User/Header.vue';
import Menu from '@/components/User/Menu.vue';
import Footer from '@/components/User/Footer.vue';
</script>
<template>
<!-- header -->
<Header/>
<!-- menu -->
<Menu/>
<!-- content -->
<RouterView/>
<!-- footer -->
<Footer/>
</template>
<style lang="css"></style>