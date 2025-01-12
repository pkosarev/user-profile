import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

const getLocalStorageItem = (key, defaultValue) => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch {
        console.warn(`Error parsing localStorage item: ${key}`);
        return defaultValue;
    }
};

const setLocalStorageItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const useUserStore = defineStore('user', () => {
    const profile = ref({
        name: '',
        address: '',
        country: '',
    });

    const balance = ref(Number(localStorage.getItem('balance')) || 1000);

    const transactions = ref(
        getLocalStorageItem('transactions', [])
    );

    const updateProfile = (newProfile) => {
        profile.value = { ...profile.value, ...newProfile };
    };

    const addTransaction = (type, amount) => {
        if (type === 'withdrawal' && balance.value < amount) {
            console.error('Insufficient balance for withdrawal');
            return;
        }

        const newTransaction = {
            type,
            amount,
            date: new Date().toLocaleString(),
        };

        transactions.value.push(newTransaction);
        balance.value += type === 'deposit' ? amount : -amount;
    };

    const clearTransactions = () => {
        transactions.value = [];
        localStorage.removeItem('transactions');
    };

    watch(
        transactions,
        (newTransactions) => {
            setLocalStorageItem('transactions', newTransactions);
        },
        { deep: true }
    );

    watch(balance, (newBalance) => {
        localStorage.setItem('balance', newBalance.toString());
    });

    return {
        profile,
        balance,
        transactions,
        updateProfile,
        addTransaction,
        clearTransactions,
    };
});
