<template>
  <div class="p-4 max-w-xl mx-auto bg-white shadow-md rounded">
    <ProfileForm />

    <section class="mt-6">
      <Finances />
    </section>

    <section class="mt-6">
      <TransactionList />
    </section>
  </div>
</template>

<script setup>
import ProfileForm from '../components/ProfileForm.vue';
import Finances from '../components/Finances.vue';
import TransactionList from '../components/TransactionList.vue';
</script>
