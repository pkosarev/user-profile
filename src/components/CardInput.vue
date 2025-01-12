<template>
  <div class="card-input">
    <label class="flex flex-col gap-1 text-sm font-medium text-gray-700 mb-2">
      Номер карты
      <input
          type="text"
          v-model="localCardNumber"
          @input="formatCardNumber"
          placeholder="Введите номер карты"
          maxlength="19"
          class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
      />
    </label>
    <div class="flex gap-4">
      <label class="flex flex-col gap-1 text-sm font-medium text-gray-700 mb-2">
        Срок действия
        <input
            type="text"
            v-model="localExpirationDate"
            @input="formatExpirationDate"
            placeholder="ММ/ГГ"
            maxlength="5"
            class="px-4 py-2 w-24 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
        />
      </label>
      <label class="flex flex-col gap-1 text-sm font-medium text-gray-700 mb-2">
        CVC/CVV
        <input
            type="password"
            v-model="localCvc"
            maxlength="3"
            placeholder="CVC/CVV"
            class="px-4 py-2 w-24 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
        />
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true },
  cvc: { type: String, required: true },
});

const emit = defineEmits(['update:cardNumber', 'update:expirationDate', 'update:cvc']);

const localCardNumber = ref(props.cardNumber);
const localExpirationDate = ref(props.expirationDate);
const localCvc = ref(props.cvc);

watch(localCardNumber, (value) => emit('update:cardNumber', value));
watch(localExpirationDate, (value) => emit('update:expirationDate', value));
watch(localCvc, (value) => emit('update:cvc', value));

const formatCardNumber = () => {
  let digits = localCardNumber.value.replace(/\D/g, '');

  if (digits.length > 16) {
    digits = digits.slice(0, 16);
  }

  const groups = [];
  for (let i = 0; i < digits.length; i += 4) {
    groups.push(digits.slice(i, i + 4));
  }

  localCardNumber.value = groups.join(' ').trim();
};

const formatExpirationDate = () => {
  let digits = localExpirationDate.value.replace(/\D/g, '');

  if (digits.length > 4) {
    digits = digits.slice(0, 4);
  }

  if (digits.length > 2) {
    digits = `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  localExpirationDate.value = digits;
};
</script>
