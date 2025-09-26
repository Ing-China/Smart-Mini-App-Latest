<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">Telegram User Info</h1>

      <!-- Loading State -->
      <div v-if="!isLoaded" class="bg-white rounded-lg shadow-md p-6 text-center">
        <div class="animate-pulse">Loading user data...</div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="text-red-600">Failed to load user data</p>
        <button
          @click="loadUserData"
          class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>

      <!-- User Data -->
      <div v-else class="space-y-4">
        <!-- Request Permissions Card -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-bold text-gray-800 mb-4">Request Permissions</h3>
          <div class="flex justify-center">
            <!-- Contact Info -->
            <div class="space-y-2 w-full max-w-md">
              <button
                @click="handleContactRequest"
                :disabled="!contactRequestAvailable || isRequestingContact"
                class="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg font-medium"
              >
                <span v-if="isRequestingContact" class="mr-2">
                  <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                      fill="none"
                    />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                </span>
                Request Contact Info
              </button>
              <p v-if="!contactRequestAvailable" class="text-xs text-red-500 text-center">
                Contact request not available
              </p>
            </div>
          </div>
        </div>

        <!-- Contact Information Card -->
        <div v-if="contactInfo" class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <label class="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
              <p class="text-gray-800 font-medium">
                {{ contactInfo.contact?.phone_number || 'Not available' }}
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <label class="block text-sm font-medium text-gray-600 mb-1">Contact Name</label>
              <p class="text-gray-800 font-medium">
                {{ contactInfo.contact?.first_name }} {{ contactInfo.contact?.last_name || '' }}
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <label class="block text-sm font-medium text-gray-600 mb-1">User ID</label>
              <p class="text-gray-800 font-medium">
                {{ contactInfo.contact?.user_id || 'Not available' }}
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <label class="block text-sm font-medium text-gray-600 mb-1">Auth Date</label>
              <p class="text-gray-800 font-medium">
                {{ contactInfo.auth_date || 'Not available' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTelegramUser } from '@/composables/useTelegramUser'

const {
  isLoaded,
  error,
  loadUserData,
  // Contact methods
  contactInfo,
  isRequestingContact,
  requestContactInfo,
  // Availability checks
  contactRequestAvailable,
} = useTelegramUser()

// Handle contact request
const handleContactRequest = async () => {
  try {
    const contact = await requestContactInfo()
    console.log('Contact info received:', contact)
  } catch (err) {
    console.error('Contact request failed:', err)
  }
}
</script>
