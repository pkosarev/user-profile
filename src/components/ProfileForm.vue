<template>
    <h2 class="text-xl font-semibold mb-4 text-center">Профиль пользователя</h2>
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Имя</label>
        <input
            v-model="profile.name"
            type="text"
            autocomplete="name"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
        />
      </div>

      <!-- Address -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Адрес</label>
        <input
            v-model="profile.address"
            type="text"
            autocomplete="address"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
        />
      </div>

      <!-- Country -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Страна</label>
        <select
            v-model="profile.country"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
        >
          <option disabled value="">Выберите страну</option>
          <option v-for="(country, index) in countries" :key="index" :value="country">
            {{ country }}
          </option>
        </select>
      </div>

      <!-- Submit Button -->
      <button
          type="submit"
          class="w-full py-2 px-4 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Сохранить
      </button>
    </form>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { computed } from 'vue';

const countries = [
  'USA',
  'Canada',
  'Russia',
  'United Kingdom',
  'Germany',
  'France',
  'Australia',
  'India',
  'Japan',
  'China',
  'Brazil',
];

const userStore = useUserStore();
const profile = computed(() => userStore.profile);

const submitForm = () => {
  userStore.updateProfile(profile.value);
};
</script>
