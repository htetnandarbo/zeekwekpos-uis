<template>
  <div
    class="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100 mt-10"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-800">Send Email</h2>
    </div>

    <!-- Recipient Type -->
    <div class="mt-2">
      <label for="recipient" class="block text-sm/6 font-medium text-gray-900"
        >Recipient</label
      >
      <div class="mt-2 grid grid-cols-1">
        <select
          v-model="recipientType"
          id="recipient"
          name="recipient"
          class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6"
        >
          <option value="all">All users</option>
          <option value="specific">Specific Users</option>
        </select>
        <ChevronDownIcon
          class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          aria-hidden="true"
        />
      </div>
    </div>

    <!-- Specific User Selection -->
    <div v-if="recipientType === 'specific'" class="mt-2">
      <label for="selectusers" class="block text-sm/6 font-medium text-gray-900"
        >Select Users</label
      >
      <div>
        <!-- Input field -->
        <div class="mt-2">
          <input
            ref="userInput"
            v-model="search"
            type="text"
            placeholder="Type to search..."
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>

        <!-- Selected tags -->
        <div class="flex mt-2">
          <span
            v-for="id in selectedUsers"
            :key="id"
            class="w-fit flex items-center gap-1 px-3 py-1 rounded-full bg-[#DFB1321A] text-[#DFB132] text-sm"
          >
            {{ getUserName(id) }}
            <button
              @click.stop="removeUser(id)"
              class="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </span>
        </div>
      </div>

      <!-- Dropdown -->
      <div
        v-if="filteredUsers.length > 0 && search"
        class="mt-2 max-h-40 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg"
      >
        <div
          v-for="user in filteredUsers"
          :key="user.id"
          @click="selectUser(user.id)"
          class="px-4 py-2 cursor-pointer hover:bg-gray-50 text-gray-700"
        >
          {{ user.name }}
        </div>
      </div>
    </div>

    <!-- Subject -->
    <div class="mt-2">
      <label for="subject" class="block text-sm/6 font-medium text-gray-900"
        >Subject</label
      >
      <input
        v-model="subject"
        type="text"
        placeholder="Enter subject"
        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      />
    </div>

    <!-- Message -->
    <div class="mt-2">
      <label for="message" class="block text-sm/6 font-medium text-gray-900"
        >Message</label
      >
      <div class="mt-2">
        <textarea
          v-model="message"
          placeholder="Write your email message..."
          rows="4"
          name="comment"
          id="comment"
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-3 mt-3">
      <button
        class="px-3 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium shadow-sm hover:bg-[#c29722] transition"
      >
        Send Email
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/16/solid";

const recipientType = ref("all");
const subject = ref("");
const message = ref("");
const selectedUsers = ref([]);
const search = ref("");
const userInput = ref(null);

const users = ref([
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
  { id: 4, name: "David Miller" },
  { id: 5, name: "Emma Wilson" },
]);

// Computed filtered users
const filteredUsers = computed(() => {
  return users.value.filter(
    (u) =>
      u.name.toLowerCase().includes(search.value.toLowerCase()) &&
      !selectedUsers.value.includes(u.id)
  );
});

// Get user name by id
const getUserName = (id) => {
  const user = users.value.find((u) => u.id === id);
  return user ? user.name : "";
};

// Select user
const selectUser = (id) => {
  selectedUsers.value.push(id);
  search.value = "";
  userInput.value.focus();
};

// Remove user
const removeUser = (id) => {
  selectedUsers.value = selectedUsers.value.filter((u) => u !== id);
};
</script>
