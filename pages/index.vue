<template>  
  <div class="h-screen grid grid-cols-3 divide-x">
    <div class="col-span-2 h-screen flex flex-col bg-slate-100">
      <div class="flex-1 overflow-y-auto p-8">
        <app-form-profile
          v-model:name="data.n"
          v-model:desc="data.d"
          v-model:image="data.i"
        />
        <app-form-hr />
        <app-form-social-links
          v-model:facebook="data.f"
          v-model:twitter="data.t"
          v-model:instagram="data.ig"
          v-model:github="data.gh"
          v-model:telegram="data.tg"
          v-model:linkedin="data.l"
          v-model:email="data.e"
          v-model:whatsapp="data.w"
          v-model:youtube="data.y"
          v-model:website="data.ws"
        />
        <app-form-hr />
        <app-form-links v-model="data.ls" />
      </div>
      <div class="border-t bg-white flex items-center">
        <button
          @click="prefillDemoData"
          class="h-12 flex items-center space-x-2 px-4 border-r text-xs font-medium bg-white text-slate-700"
        >
          <span> Add demo data </span>
          <icon name="mdi:code-json" class="h-4 w-4" />
        </button>
        <button
          @click="publish"
          class="h-12 flex items-center space-x-2 px-4 border-r text-xs font-medium bg-white text-slate-700"
        >
          <span> Publish </span>
          <icon name="ph:paper-plane-tilt-bold" class="h-4 w-4" />
        </button>
        <a
          href="https://directories.ai"
          target="_blank"
          class="h-12 flex items-center space-x-2 px-4 border-r text-xs font-medium bg-white text-slate-700"
        >
          <span> Learn </span>
          <icon name="mdi:lightbulb-on-10" class="h-4 w-4" />
        </a>
      </div>
    </div>
    <div>
    <app-form-preview :data="data" />
    <a
      href="https://listing.directories.ai"
      target="_blank"
      class="absolute bottom-0 right-0 bg-white rounded-tl-lg shadow px-4 py-1 font-medium text-sm text-gray-500"
    >
      Made by Directories.ai 
    </a>
    </div>
    <div>
    <select @change="selectListing">
      <option value="">Select a listing</option>
      <option v-for="listing in userListings" :value="listing">{{ listing.n }}</option>
    </select>
  </div>
  </div>
</template>

<script setup>
  import { encodeData  } from "../utils/transformer"; 
  import { onMounted } from 'vue';
  import { createClient } from '@supabase/supabase-js';
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router'; 
  import Signin from '~/pages/auth/signin.vue';

  const supabaseUrl = "https://cjrvfowsacykehtvyqkq.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqcnZmb3dzYWN5a2VodHZ5cWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUxOTQxMjAsImV4cCI6MjAwMDc3MDEyMH0.gfchVrdRUBT5KwcsK7VZ--13fq9Br16t6S1v0LHopJA";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const router = useRouter();
  const listings = ref([])

  const data = ref({
    n: "",
    d: "",
    i: "",
    f: "",
    t: "",
    ig: "",
    gh: "",
    tg: "",
    l: "",
    e: "",
    w: "",
    y: "",
    ws: "",
    ls: [],
  });

  const prefillDemoData = () => {
    data.value = {
  "n": "Bigfoot's Pizza",
  "i": "https://i.imgur.com/on3jglg.png",
  "d": "We don't just make pizzas - we craft mythically delicious, cryptozoologically-approved pizzas made with fur-raised dough and hand-foraged forest toppings.",
  "f": "https://www.facebook.com/bigfootspizza", 
  "t": "https://twitter.com/bigfoots_pizza",
  "ig": "https://www.instagram.com/bigfoots_pizza",
  "gh": "https://github.com/bigfootspizza",
  "tg": "https://t.me/bigfoots_pizza",
  "w": "https://www.bigfootspizza.com",
  "y": "https://youtube.com/c/bigfootspizza",
  "l": "https://www.linkedin.com/company/bigfoots-pizza",
  "ls": [
    {
      "l": "Visit our website for free foot massages!",
      "i": "👣",
      "u": "https://www.bigfootspizza.com"
    },
    {  
      "l": "See our menu of forest-inspired pizzas",
      "i": "🌲",
      "u": "https://www.bigfootspizza.com/menu"
    },
    {
      "l": "Order online and get $5 off with promo code 'SASQUATCH'",
      "i": "🍕", 
      "u": "https://www.bigfootspizza.com/online-ordering"
    }
  ]
}
  };

  async function getListings() {
  await supabase.from('ListingsCache').select();
  const { user, error } = await supabase.auth.user();

  if (error) {
    console.error('Error retrieving user:', error);
    // Redirect to sign-in page or handle the error as needed
    return;
  } 
  if (!user) {
    // Redirect to sign-in page or handle the case when the user isn't registered
     router.push('/auth/signin');
     return;
  }

  const userId = user.id;
  const { data: ListingData } = await supabase
    .from('ListingsCache')
    .select()
    .eq('editor', userId);

   listing.value = ListingData
   const acc = ListingData.query.long_url;
   const decodedData = ref({});
   decodedData.value = decodeData(acc);
  }

  onMounted(() => {
    getListings()
  })

  const userListings = computed(() => {
  return listings.value;
  });

  const selectListing = (event) => {
    const selectedListing = event.target.value;
    if (selectedListing) {
      // Update the `data` object with the selected listing's values
      data.value = { decodeData };
    }
  };

  const publish =
      function geturl() {
      const url = `${window.location.origin}/1?data=${encodeData(data.value)}`;
      navigator.clipboard.writeText(url).then(() => {
        alert("Link copied to clipboard");
      });
    }

        
</script>
