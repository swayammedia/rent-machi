"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Truck,
  Wallet,
  Store,
  Play,
  ChevronRight,
  Mail,
  Twitter,
  Instagram,
  Linkedin,
  Apple,
  ArrowRight,
  X,
  Camera,
  Gamepad2,
  Glasses,
  Car,
  Laptop,
  Bike,
  PartyPopper,
  Building2,
  Loader2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { saveEmailToWaitlist } from "./actions"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false)
  const [showVideoDialog, setShowVideoDialog] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const { toast } = useToast()

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Call the server action to save the email
      const result = await saveEmailToWaitlist(email)

      if (result.success) {
        setIsSubmitted(true)
        setSubmitMessage(result.message)
        toast({
          title: "Success!",
          description: result.message,
        })

        // Reset form after 3 seconds and close dialog
        setTimeout(() => {
          setIsSubmitted(false)
          setEmail("")
          setShowWaitlistDialog(false)
        }, 3000)
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Header logo section - ONLY LOGO KEPT */}
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="RentMachi Logo" width={120} height={40} className="h-8 w-auto" />
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-coral-red">
              Features
            </Link>
            <Link href="#categories" className="text-sm font-medium hover:text-coral-red">
              Categories
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-coral-red">
              How It Works
            </Link>
            <Link href="#download" className="text-sm font-medium hover:text-coral-red">
              Download
            </Link>
          </nav>
          {/* Login/Signup buttons removed */}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-light-pink opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-light-pink opacity-20"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
              {/* Center logo removed */}

              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Rent Anything. Anytime. Locally.
                </h1>
                <p className="max-w-[700px] text-gray-600 md:text-xl">
                  A safe, verified rental marketplace for products and spaces.
                </p>
              </div>

              <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto sm:max-w-4xl sm:flex-row">
                <Button
                  size="lg"
                  className="bg-coral-red hover:bg-coral-red/90 text-white border-none w-full sm:flex-1 h-12 sm:h-11 py-3 px-6 text-base font-medium flex items-center justify-center"
                  onClick={() => setShowWaitlistDialog(true)}
                >
                  Join Waitlist <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-coral-red text-coral-red hover:bg-coral-red/10 w-full sm:flex-1 h-12 sm:h-11 py-3 px-6 text-base font-medium flex items-center justify-center"
                  onClick={() => setShowVideoDialog(true)}
                >
                  About RentMachi <Play className="h-4 w-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  className="bg-coral-red hover:bg-coral-red/90 text-white border-none w-full sm:flex-1 h-12 sm:h-11 py-3 px-6 text-base font-medium flex items-center justify-center"
                  onClick={() => (window.location.href = "https://home.rentmachi.in/public")}
                >
                  Check Products <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg">
                <div className="relative bg-gray-100 rounded-xl px-4 py-3 flex items-center gap-3 w-full sm:w-auto">
                  <div className="absolute -top-2 -right-2">
                    {/* Made Coming Soon smaller */}
                    <span className="bg-coral-red text-white text-xs px-1.5 py-0.5 rounded-full text-[10px]">
                      Coming Soon
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-smartphone"
                    >
                      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                      <path d="M12 18h.01" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500">GET IT ON</div>
                    <div className="font-medium">Google Play</div>
                  </div>
                </div>

                <div className="relative bg-gray-100 rounded-xl px-4 py-3 flex items-center gap-3 w-full sm:w-auto">
                  <div className="absolute -top-2 -right-2">
                    {/* Made Coming Soon smaller */}
                    <span className="bg-coral-red text-white text-xs px-1.5 py-0.5 rounded-full text-[10px]">
                      Coming Soon
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <Apple className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500">DOWNLOAD ON THE</div>
                    <div className="font-medium">App Store</div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <h2 className="text-2xl font-semibold">
                  Launching soon in <span className="text-coral-red">Chennai</span>
                </h2>
                <div className="w-32 h-1 bg-coral-red/30 mx-auto mt-2 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-coral-red px-3 py-1 text-sm text-white">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose RentMachi?</h2>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Our platform makes renting and lending safe, easy, and profitable.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="grid gap-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-coral-red/10">
                  <Shield className="h-8 w-8 text-coral-red" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">KYC-Verified Users</h3>
                  <p className="text-gray-600">Every user is verified for a safe and trustworthy community.</p>
                </div>
              </div>
              <div className="grid gap-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-coral-red/10">
                  <Truck className="h-8 w-8 text-coral-red" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Doorstep Delivery</h3>
                  <p className="text-gray-600">
                    Get items delivered right to your doorstep with our logistics partners.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-coral-red/10">
                  <Wallet className="h-8 w-8 text-coral-red" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Earn from Idle Items</h3>
                  <p className="text-gray-600">Turn your unused items into a steady stream of passive income.</p>
                </div>
              </div>
              <div className="grid gap-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-coral-red/10">
                  <Store className="h-8 w-8 text-coral-red" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">P2P + Shop Listings</h3>
                  <p className="text-gray-600">Rent from individuals or verified businesses on our platform.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section - NEW SECTION */}
        <section id="categories" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-coral-red px-3 py-1 text-sm text-white">Categories</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Can You Rent?</h2>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  From tech gadgets to parking spaces, RentMachi has everything you need.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-6xl gap-6 py-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                {
                  icon: <Camera className="h-10 w-10 text-coral-red" />,
                  title: "Cameras",
                  description: "Professional cameras, lenses, and accessories",
                },
                {
                  icon: <Gamepad2 className="h-10 w-10 text-coral-red" />,
                  title: "Gaming Consoles",
                  description: "Latest gaming consoles and accessories",
                },
                {
                  icon: <Glasses className="h-10 w-10 text-coral-red" />,
                  title: "VR Headsets",
                  description: "Virtual reality equipment for immersive experiences",
                },
                {
                  icon: <Car className="h-10 w-10 text-coral-red" />,
                  title: "Parking Spaces",
                  description: "Convenient parking spots in prime locations",
                },
                {
                  icon: <Laptop className="h-10 w-10 text-coral-red" />,
                  title: "Electronics",
                  description: "Laptops, tablets, and other tech gadgets",
                },
                {
                  icon: <Building2 className="h-10 w-10 text-coral-red" />,
                  title: "Event Spaces",
                  description: "Venues for parties, meetings, and gatherings",
                },
                {
                  icon: <Bike className="h-10 w-10 text-coral-red" />,
                  title: "Sports Equipment",
                  description: "Bikes, fitness gear, and outdoor equipment",
                },
                {
                  icon: <PartyPopper className="h-10 w-10 text-coral-red" />,
                  title: "Party Supplies",
                  description: "Decorations, sound systems, and more",
                },
              ].map((category, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4">{category.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-6">And many more categories coming soon!</p>
              <Button
                className="bg-coral-red hover:bg-coral-red/90 text-white border-none"
                onClick={() => setShowWaitlistDialog(true)}
              >
                Join Waitlist to Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-coral-red px-3 py-1 text-sm text-white">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple. Secure. Seamless.</h2>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Renting or lending has never been easier.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Sign Up & Verify",
                  description: "Create an account and complete our simple KYC verification process.",
                },
                {
                  step: "02",
                  title: "Browse or List",
                  description: "Search for items to rent or list your own items for others to rent.",
                },
                {
                  step: "03",
                  title: "Rent & Return",
                  description: "Book items, receive them, enjoy, and return when you're done.",
                },
              ].map((item, i) => (
                <div key={i} className="relative grid gap-4 p-6 bg-white rounded-lg border border-gray-100">
                  <div className="absolute -top-4 -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-coral-red text-white text-sm font-bold">
                    {item.step}
                  </div>
                  <div className="space-y-2 pt-4">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button
                size="lg"
                className="bg-coral-red hover:bg-coral-red/90 text-white border-none gap-1"
                onClick={() => setShowWaitlistDialog(true)}
              >
                Get Started <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to join the rental revolution?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Be among the first to access RentMachi when we launch.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg">
                <div className="relative bg-white rounded-xl px-4 py-3 flex items-center gap-3 w-full sm:w-auto border border-gray-200">
                  <div className="absolute -top-2 -right-2">
                    {/* Made Coming Soon smaller */}
                    <span className="bg-coral-red text-white text-xs px-1.5 py-0.5 rounded-full text-[10px]">
                      Coming Soon
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-smartphone"
                    >
                      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                      <path d="M12 18h.01" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500">GET IT ON</div>
                    <div className="font-medium">Google Play</div>
                  </div>
                </div>

                <div className="relative bg-white rounded-xl px-4 py-3 flex items-center gap-3 w-full sm:w-auto border border-gray-200">
                  <div className="absolute -top-2 -right-2">
                    {/* Made Coming Soon smaller */}
                    <span className="bg-coral-red text-white text-xs px-1.5 py-0.5 rounded-full text-[10px]">
                      Coming Soon
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <Apple className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500">DOWNLOAD ON THE</div>
                    <div className="font-medium">App Store</div>
                  </div>
                </div>
              </div>

              <div className="pt-8 max-w-2xl mx-auto">
                <p className="text-xl italic text-gray-600">
                  "Got it? List it. Need it? Rent it, <span className="text-coral-red font-medium">machi</span>."
                </p>
              </div>

              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Button
                  size="lg"
                  className="bg-coral-red hover:bg-coral-red/90 text-white border-none gap-1"
                  onClick={() => setShowWaitlistDialog(true)}
                >
                  Join Waitlist <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-between">
            {/* Footer logo section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="RentMachi Logo" width={90} height={30} className="h-6 w-auto" />
              </div>
              <p className="text-sm text-gray-500">© {new Date().getFullYear()} RentMachi. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="mailto:hello@rentmachi.com"
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-coral-red"
              >
                <Mail className="h-4 w-4" /> hello@rentmachi.com
              </a>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-coral-red">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-coral-red">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-coral-red">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Waitlist Dialog */}
      <Dialog open={showWaitlistDialog} onOpenChange={setShowWaitlistDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">Join the Waitlist</DialogTitle>
            <DialogDescription className="text-center">
              Be the first to know when RentMachi launches in your area.
            </DialogDescription>
          </DialogHeader>
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <p className="text-center font-medium">{submitMessage || "Thanks for joining the waitlist!"}</p>
              <p className="text-center text-sm text-gray-500">
                We'll notify you when RentMachi launches in your area.
              </p>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full bg-coral-red hover:bg-coral-red/90 text-white border-none"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Join Waitlist"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-black">
          <div className="relative pt-[56.25%] w-full">
            <button
              onClick={() => setShowVideoDialog(false)}
              className="absolute top-2 right-2 z-10 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
            >
              <X className="h-5 w-5" />
            </button>
            <iframe
              src="https://drive.google.com/file/d/1nrvTBeijZnlfR2QjkKem6IWksmpvTbee/preview"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toast notifications */}
      <Toaster />
    </div>
  )
}
