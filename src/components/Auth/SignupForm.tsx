"use client"
import { Database } from "@/lib/database.types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"

export default function SignupForm() {
  const supabase = createClientComponentClient<Database>()

  return (
    <div className="max-w-sm mx-auto">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={[]}
        redirectTo={`${process.env.NEXT_PUBLIC_BASE_URL}/tenants`}
      />
    </div>
  )
}
