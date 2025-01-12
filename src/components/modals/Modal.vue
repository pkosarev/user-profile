<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md max-w-md w-full relative">
      <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-500 hover:text-black">
        ✖
      </button>
      <slot />
    </div>
  </div>
</template>
