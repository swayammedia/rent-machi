"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getWaitlistEmails } from "../actions"
import { authenticateAdmin } from "./actions"
import { Loader2, Download, Search, RefreshCw, CheckCircle2, Clock, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface WaitlistEntry {
  id: number
  email: string
  timestamp: string
  status: string
  metadata: Record<string, any>
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [waitlistData, setWaitlistData] = useState<WaitlistEntry[]>([])
  const [filteredData, setFilteredData] = useState<WaitlistEntry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleAuthentication = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Call the server action to authenticate
      const result = await authenticateAdmin(password)

      if (result.success) {
        // If authentication is successful, fetch waitlist data
        const data = await getWaitlistEmails()
        setWaitlistData(data)
        setFilteredData(data)
        setIsAuthenticated(true)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("Authentication failed. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (!term.trim()) {
      setFilteredData(waitlistData)
      return
    }

    const filtered = waitlistData.filter((entry) => entry.email.toLowerCase().includes(term.toLowerCase()))
    setFilteredData(filtered)
  }

  const refreshData = async () => {
    setIsLoading(true)
    try {
      const data = await getWaitlistEmails()
      setWaitlistData(data)
      setFilteredData(data)

      // Re-apply search filter if active
      if (searchTerm) {
        handleSearch(searchTerm)
      }

      toast({
        title: "Success",
        description: "Waitlist data refreshed successfully",
      })
    } catch (err) {
      setError("Failed to refresh waitlist data.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadCSV = () => {
    // Create CSV content
    const csvContent = [
      ["ID", "Email", "Timestamp", "Status", "Source"],
      ...filteredData.map((entry) => [
        entry.id.toString(),
        entry.email,
        entry.timestamp,
        entry.status,
        entry.metadata?.source || "unknown",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `rentmachi-waitlist-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        )
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status || "Unknown"}</Badge>
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
            <CardDescription>Enter your password to view the waitlist data</CardDescription>
          </CardHeader>
          <form onSubmit={handleAuthentication}>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-coral-red hover:bg-coral-red/90" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Access Waitlist"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">RentMachi Waitlist</h1>
          <p className="text-gray-500">Total subscribers: {waitlistData.length}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search emails..."
              className="pl-8 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to Website
          </Button>
          <Button onClick={downloadCSV} className="bg-coral-red hover:bg-coral-red/90">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Email Address</TableHead>
                  <TableHead>Date Joined</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-mono text-sm">{entry.id}</TableCell>
                      <TableCell className="font-medium">{entry.email}</TableCell>
                      <TableCell>{new Date(entry.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(entry.status)}</TableCell>
                      <TableCell>{entry.metadata?.source || "unknown"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      {isLoading ? (
                        <div className="flex justify-center items-center">
                          <Loader2 className="h-6 w-6 animate-spin text-coral-red" />
                        </div>
                      ) : searchTerm ? (
                        "No results found for your search."
                      ) : (
                        "No waitlist entries yet."
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  )
}
