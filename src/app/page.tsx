"use client"

import SignupForm from "@/components/Auth/SignupForm"
import { useSession } from "@supabase/auth-helpers-react"
import Link from "next/link"

export default function Home() {
  const session = useSession()

  return (
    <>
      {!session ? (
        <SignupForm />
      ) : (
        <div className="text-center">
          <Link href="/tenants" className="btn">
            Get Started
          </Link>
        </div>
      )}
    </>
  )
}
