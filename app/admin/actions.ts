"use server"

// Admin authentication server action
export async function authenticateAdmin(password: string) {
  // Get the admin secret key from environment variables (server-side only)
  const adminSecretKey = process.env.ADMIN_SECRET_KEY

  if (!adminSecretKey) {
    console.error("ADMIN_SECRET_KEY environment variable is not set")
    return { success: false, message: "Server configuration error" }
  }

  // Compare the provided password with the admin secret key
  if (password === adminSecretKey) {
    return { success: true, message: "Authentication successful" }
  } else {
    return { success: false, message: "Invalid password. Please try again." }
  }
}
