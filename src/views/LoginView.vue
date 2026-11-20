<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import TextInputs from '@/components/utilities/TextInputs.vue';
import Toast from '@/components/utilities/Toast.vue';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const errors = ref(null);
const username = ref('');
const password = ref('');


const handleLogin = async () => {

  const result = await auth.login({
    'username': username.value,
    'password': password.value
  });

  if (result.status !== 200) {
    errors.value = result;

    setTimeout(() => {
      errors.value = null;
    }, 2000);

    return;
  }

  await router.push({ name: 'dashboard' });

}

</script>

<template>
  <section class="w-dvw h-dvh flex flex-col items-center justify-center bg-linear-to-b from-blue-700 to-blue-900">

    <div class="max-w-60 mb-6 p-6 rounded bg-blue-100">
      <p class="mb-2">Use this account to login.</p>
      <p>Username: <span class="font-bold">dash</span></p>
      <p>Password: <span class="font-bold">password</span></p>
    </div>

    <div class="w-125 p-6 rounded shadow-lg bg-slate-300">

      <form
        method="POST"
        class="flex flex-col gap-4"
        @submit.prevent="handleLogin"
      >

        <TextInputs
          id="username"
          type="text"
          label="Username"
          placeholder="Username"
          labelClass="uppercase font-semibold text-blue-900"
          inputClass="w-full px-4 py-2 text-slate-700 rounded border border-blue-900 focus:border-blue-600 outline-none"
          :hasError="errors?.username || errors?.error"
          :errorMsg="errors?.username || errors?.error"
          :required="true"
          v-model="username"
        />

        <TextInputs
          id="password"
          type="password"
          label="Password"
          placeholder="Password"
          labelClass="uppercase font-semibold text-blue-900"
          inputClass="w-full px-4 py-2 text-slate-700 rounded border border-blue-900 focus:border-blue-600 outline-none"
          :hasError="errors?.password || errors?.error"
          :errorMsg="errors?.password || errors?.error"
          :required="true"
          v-model="password"
        />

        <button
          type="submit"
          class="w-full px-4 py-2 uppercase font-semibold tracking-wide text-slate-200 rounded bg-linear-to-b from-blue-900 to-blue-700 hover:from-blue-700 hover:to-blue-500 cursor-pointer"
        >
          Login
        </button>

      </form>

    </div>

    <Toast :show="errors?.msg ?? false" type="error" :text="errors?.msg ?? ''" />

  </section>
</template>
