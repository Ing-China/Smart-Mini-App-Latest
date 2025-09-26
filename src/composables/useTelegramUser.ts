import { ref, computed } from 'vue'
import { requestContact } from '@telegram-apps/sdk'

interface ContactInfo {
  contact: {
    user_id: number
    phone_number: string
    first_name: string
    last_name?: string
  }
  auth_date: Date
  hash: string
}

export function useTelegramUser() {
  const isLoaded = ref(false)
  const error = ref<any>(null)
  const contactInfo = ref<ContactInfo | null>(null)
  const isRequestingContact = ref(false)

  const loadUserData = async () => {
    try {
      isLoaded.value = false
      error.value = null
      isLoaded.value = true
    } catch (err) {
      error.value = err
      console.error('Failed to load Telegram user data:', err)
    }
  }

  // Request contact information
  const requestContactInfo = async () => {
    try {
      isRequestingContact.value = true

      if (requestContact.isAvailable()) {
        const contact = (await requestContact()) as ContactInfo
        contactInfo.value = contact
        return contact
      } else {
        throw new Error('Contact request not available')
      }
    } catch (err) {
      console.error('Failed to request contact:', err)
      throw err
    } finally {
      isRequestingContact.value = false
    }
  }

  // Check availability of features
  const contactRequestAvailable = computed(() => requestContact.isAvailable())

  // Load user data immediately
  loadUserData()

  return {
    isLoaded,
    error,
    loadUserData,
    // Contact methods
    contactInfo,
    isRequestingContact,
    requestContactInfo,
    // Availability checks
    contactRequestAvailable,
  }
}
