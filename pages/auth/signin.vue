<template>
  <div class="modal" v-if="!signedIn">
    <div class="modal-content">
      <h2>Listing by Directories.ai</h2>
      <form @submit.prevent="signIn">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
        <button type="submit">Sign In</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
<script>
import { createClient } from '@supabase/supabase-js';
import { ref } from 'vue';

const supabaseUrl = "https://cjrvfowsacykehtvyqkq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqcnZmb3dzYWN5a2VodHZ5cWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUxOTQxMjAsImV4cCI6MjAwMDc3MDEyMH0.gfchVrdRUBT5KwcsK7VZ--13fq9Br16t6S1v0LHopJA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref(null);
    const signedIn = ref(false);

    const signIn = async () => {
      try {
        const { user, error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });
        if (error) {
          throw error;
        }
        signedIn.value = true;
      } catch (error) {
        console.error('Error signing in:', error);
        // Handle error as needed
      }
    };

    return {
      email,
      password,
      error,
      signIn,
      signedIn,
    };
  },
};
</script>
