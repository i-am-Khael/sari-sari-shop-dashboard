<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import TextInputs from '@/components/utilities/TextInputs.vue';

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
    errors.value = result.errors;

    setTimeout(() => {
      errors.value = null;
    }, 2000);

    return;
  }

}

</script>

<template>
  <section class="w-dvw h-dvh flex items-center justify-center bg-linear-to-b from-blue-700 to-blue-900">

    <div class="w-125 p-6 rounded shadow-lg bg-slate-300">

      <form class="flex flex-col gap-4">

        <TextInputs
          id="username"
          type="text"
          label="Username"
          placeholder="Username"
          labelClass="uppercase font-semibold text-blue-900"
          inputClass="w-full px-4 py-2 text-slate-700 rounded border border-blue-900 focus:border-blue-600 outline-none"
          :hasError="errors?.username || errors?.msg"
          :errorMsg="errors?.username || errors?.msg"
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
          :hasError="errors?.password || errors?.msg"
          :errorMsg="errors?.password || errors?.msg"
          :required="true"
          v-model="password"
        />

        <button
          type="button"
          class="w-full px-4 py-2 uppercase font-semibold tracking-wide text-slate-200 rounded bg-linear-to-b from-blue-900 to-blue-700 hover:from-blue-700 hover:to-blue-500 cursor-pointer"
          @click="handleLogin"
        >
          Login
        </button>

      </form>

    </div>

  </section>
</template>
