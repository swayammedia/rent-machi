"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

// Function to save email to the waitlist
export async function saveEmailToWaitlist(email: string) {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, message: "Please enter a valid email address." }
    }

    const supabase = createServerSupabaseClient()

    // Check if email already exists
    const { data: existingEmail } = await supabase.from("waitlist").select("email").eq("email", email).maybeSingle()

    if (existingEmail) {
      return { success: true, message: "You're already on our waitlist!" }
    }

    // Insert new email
    const { error } = await supabase.from("waitlist").insert([
      {
        email,
        status: "pending",
        metadata: { source: "website" },
      },
    ])

    if (error) {
      console.error("Error saving to Supabase:", error)
      return { success: false, message: "Something went wrong. Please try again later." }
    }

    return { success: true, message: "Thank you for joining our waitlist!" }
  } catch (error) {
    console.error("Error saving email:", error)
    return { success: false, message: "Something went wrong. Please try again later." }
  }
}

// Function to get all waitlist emails (for admin use)
export async function getWaitlistEmails() {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("waitlist").select("*").order("timestamp", { ascending: false })

    if (error) {
      console.error("Error fetching from Supabase:", error)
      throw new Error("Failed to retrieve waitlist data")
    }

    return data || []
  } catch (error) {
    console.error("Error reading waitlist data:", error)
    throw new Error("Failed to retrieve waitlist data")
  }
}
