/**
 * Dynamically loads the Razorpay Checkout script into the document.
 * Prevents multiple injections and handles loading failures.
 * 
 * @returns {Promise<boolean>} Resolves to true if script loads successfully, false otherwise.
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    // 1. Check if already loaded
    if (window.Razorpay) {
      return resolve(true)
    }

    // 2. Check if script tag already exists but not yet loaded
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true))
      existingScript.addEventListener('error', () => resolve(false))
      return
    }

    // 3. Create and inject the script
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.id = 'razorpay-sdk'

    script.onload = () => {
      console.log('Razorpay SDK loaded successfully')
      resolve(true)
    }

    script.onerror = () => {
      console.error('Failed to load Razorpay SDK')
      resolve(false)
    }

    document.body.appendChild(script)
  })
}
