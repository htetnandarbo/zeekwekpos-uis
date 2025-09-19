<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Send Email</h2>
      <p class="text-gray-600">Compose and send emails to your users</p>
    </div>

    <form @submit.prevent="sendEmail" class="space-y-6">
      <!-- Recipient Selection -->
      <div class="space-y-4">
        <label class="block text-sm font-medium text-gray-700">Recipients</label>
        
        <!-- Send Type Toggle -->
        <div class="flex space-x-4">
          <label class="flex items-center">
            <input
              type="radio"
              v-model="sendType"
              value="all"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span class="ml-2 text-sm text-gray-700">Send to all users</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              v-model="sendType"
              value="specific"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span class="ml-2 text-sm text-gray-700">Send to specific users</span>
          </label>
        </div>

        <!-- User Selection (when specific is selected) -->
        <div v-if="sendType === 'specific'" class="space-y-3">
          <!-- Search Users -->
          <div class="relative">
            <input
              type="text"
              v-model="userSearch"
              placeholder="Search users..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

          <!-- Selected Users Display -->
          <div v-if="selectedUsers.length > 0" class="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md">
            <span
              v-for="user in selectedUsers"
              :key="user.id"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {{ user.name }} ({{ user.email }})
              <button
                type="button"
                @click="removeUser(user.id)"
                class="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          </div>

          <!-- User List -->
          <div class="max-h-48 overflow-y-auto border border-gray-200 rounded-md">
            <div
              v-for="user in filteredUsers"
              :key="user.id"
              @click="toggleUser(user)"
              class="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div class="flex items-center space-x-3">
                <input
                  type="checkbox"
                  :checked="isUserSelected(user.id)"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
                  <p class="text-sm text-gray-500">{{ user.email }}</p>
                </div>
              </div>
              <span class="text-xs text-gray-400">{{ user.role }}</span>
            </div>
          </div>

          <!-- Recipients Count -->
          <p class="text-sm text-gray-600">
            {{ selectedUsers.length }} user{{ selectedUsers.length !== 1 ? 's' : '' }} selected
          </p>
        </div>

        <!-- All Users Count -->
        <div v-else class="p-3 bg-blue-50 rounded-md">
          <p class="text-sm text-blue-800">
            Email will be sent to all {{ allUsers.length }} users
          </p>
        </div>
      </div>

      <!-- Email Subject -->
      <div>
        <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
          Subject *
        </label>
        <input
          id="subject"
          type="text"
          v-model="emailData.subject"
          required
          placeholder="Enter email subject..."
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <!-- Email Body -->
      <div>
        <label for="body" class="block text-sm font-medium text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          id="body"
          v-model="emailData.body"
          required
          rows="8"
          placeholder="Enter your message..."
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
        ></textarea>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-end">
    
        <div class="flex space-x-3">
          <button
            type="button"
            @click="previewEmail"
            class="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Preview
          </button>
          <button
            type="submit"
            :disabled="!canSend"
            class="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSending ? 'Sending...' : 'Send Email' }}
          </button>
        </div>
      </div>
    </form>

    <!-- Preview Modal -->
    <div v-if="showPreview" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Email Preview</h3>
            <button
              @click="showPreview = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div class="border border-gray-200 rounded-md p-4 space-y-3">
            <div>
              <span class="text-sm font-medium text-gray-500">To:</span>
              <span class="ml-2 text-sm text-gray-900">
                {{ sendType === 'all' ? `All users (${allUsers.length})` : `${selectedUsers.length} selected users` }}
              </span>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-500">Subject:</span>
              <span class="ml-2 text-sm text-gray-900">{{ emailData.subject }}</span>
            </div>
            <div class="pt-3 border-t border-gray-200">
              <div class="whitespace-pre-wrap text-sm text-gray-900">{{ emailData.body }}</div>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button
              @click="showPreview = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Close
            </button>
            <button
              @click="sendEmailFromPreview"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Send Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="message" class="mt-4 p-4 rounded-md" :class="messageType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive data
const sendType = ref('all')
const userSearch = ref('')
const selectedUsers = ref([])
const emailData = ref({
  subject: '',
  body: ''
})
const emailOptions = ref({
  sendCopy: false,
  highPriority: false
})
const showPreview = ref(false)
const isSending = ref(false)
const message = ref('')
const messageType = ref('success')

// Mock user data - replace with your actual user data
const allUsers = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Moderator' },
  { id: 5, name: 'David Brown', email: 'david@example.com', role: 'User' },
  { id: 6, name: 'Lisa Davis', email: 'lisa@example.com', role: 'User' },
])

// Computed properties
const filteredUsers = computed(() => {
  if (!userSearch.value) return allUsers.value
  return allUsers.value.filter(user => 
    user.name.toLowerCase().includes(userSearch.value.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.value.toLowerCase())
  )
})

const canSend = computed(() => {
  return emailData.value.subject.trim() && 
         emailData.value.body.trim() && 
         (sendType.value === 'all' || selectedUsers.value.length > 0)
})

// Methods
const toggleUser = (user) => {
  const index = selectedUsers.value.findIndex(u => u.id === user.id)
  if (index > -1) {
    selectedUsers.value.splice(index, 1)
  } else {
    selectedUsers.value.push(user)
  }
}

const removeUser = (userId) => {
  selectedUsers.value = selectedUsers.value.filter(u => u.id !== userId)
}

const isUserSelected = (userId) => {
  return selectedUsers.value.some(u => u.id === userId)
}

const previewEmail = () => {
  showPreview.value = true
}

const sendEmailFromPreview = () => {
  showPreview.value = false
  sendEmail()
}

const sendEmail = async () => {
  isSending.value = true
  message.value = ''
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const recipients = sendType.value === 'all' ? allUsers.value : selectedUsers.value
    
    // Here you would make your actual API call
    console.log('Sending email:', {
      recipients: recipients.map(u => u.email),
      subject: emailData.value.subject,
      body: emailData.value.body,
      options: emailOptions.value
    })
    
    message.value = `Email sent successfully to ${recipients.length} recipient${recipients.length !== 1 ? 's' : ''}!`
    messageType.value = 'success'
    
    // Reset form
    emailData.value = { subject: '', body: '' }
    selectedUsers.value = []
    emailOptions.value = { sendCopy: false, highPriority: false }
    
  } catch (error) {
    message.value = 'Failed to send email. Please try again.'
    messageType.value = 'error'
  } finally {
    isSending.value = false
  }
}

const saveDraft = () => {
  // Implement save draft functionality
  message.value = 'Draft saved successfully!'
  messageType.value = 'success'
  setTimeout(() => { message.value = '' }, 3000)
}

// Clear message after 5 seconds
const clearMessage = () => {
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

// Watch for message changes to auto-clear
const watchMessage = () => {
  if (message.value) {
    clearMessage()
  }
}

onMounted(() => {
  // Initialize component
})
</script>