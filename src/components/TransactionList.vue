<template>
  <div v-if="transactions.length > 0">
    <h3 class="text-lg font-semibold mb-2">Список транзакций</h3>
    <ul>
      <li v-for="(transaction, index) in transactions" :key="index" class="mb-2">
        <span :class="transaction.type === 'deposit' ? 'text-green-500' : 'text-orange-500'">
          {{ transaction.type === 'deposit' ? '+' : '-' }} {{ transaction.amount }}₽
        </span>
        - {{ transaction.date }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { computed } from 'vue';


const userStore = useUserStore();
const transactions = computed(() => userStore.transactions);

</script>
