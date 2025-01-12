<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">Финансы</h3>
    <div class="mb-4">
      <p class="text-lg">Баланс: <span class="font-bold">{{ balance }}₽</span></p>
    </div>
    <div class="flex gap-2">
      <button @click="openModal('deposit')" class="w-full rounded-lg py-2 px-4 bg-green-500 text-white">
        Депозит
      </button>
      <button @click="openModal('withdraw')" class="w-full rounded-lg py-2 px-4 bg-orange-500 text-white">
        Вывод
      </button>
    </div>

    <TransactionModal
        v-if="currentModal"
        :type="currentModal"
        :balance="balance"
        @confirm="handleTransaction"
        @close="currentModal = null"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '../stores/user';
import TransactionModal from './modals/TransactionModal.vue';

const userStore = useUserStore();
const balance = computed(() => userStore.balance);

const currentModal = ref(null);

const openModal = (type) => {
  currentModal.value = type;
};

const handleTransaction = (type, amount) => {
  if (type === 'withdraw' && amount > userStore.balance) {
    alert('Недостаточно средств!');
    return;
  }
  userStore.addTransaction(type, amount);
  currentModal.value = null;
};
</script>

