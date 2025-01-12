<template>
  <Modal @close="$emit('close')">
    <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
    <template v-if="type === 'deposit'">
      <CardInput
          v-model:cardNumber="cardNumber"
          v-model:expirationDate="expirationDate"
          v-model:cvc="cvc"
      />
    </template>
    <label class="block text-sm font-medium text-gray-700 mb-2">Сумма</label>
    <input
        v-model.number="transactionAmount"
        type="number"
        placeholder="Введите сумму"
        class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
    />
    <div class="flex gap-2">
      <button
          @click="confirmTransaction"
          :disabled="!isFormValid"
          class="w-full rounded-lg py-2 px-4 bg-green-700 text-white disabled:bg-gray-400"
      >
        Подтвердить
      </button>
      <button
          @click="$emit('close')"
          class="w-full rounded-lg py-2 px-4 bg-red-600 text-white"
      >
        Отменить
      </button>
    </div>
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue';
import Modal from './Modal.vue';
import CardInput from '../CardInput.vue';

const props = defineProps({
  type: { type: String, required: true },
  balance: { type: Number, default: 0 },
});

const emit = defineEmits(['confirm', 'close']);

const transactionAmount = ref(0);
const cardNumber = ref('');
const expirationDate = ref('');
const cvc = ref('');

const isFormValid = computed(() => {
  if (props.type === 'deposit') {
    return (
        cardNumber.value.length === 19 &&
        expirationDate.value.length === 5 &&
        cvc.value.length === 3 &&
        transactionAmount.value > 0
    );
  }
  return transactionAmount.value > 0;
});

const confirmTransaction = () => {
  emit('confirm', props.type, transactionAmount.value);
};
</script>
