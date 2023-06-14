"use client"

import { Database } from "@/lib/database.types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import clsx from "clsx"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { IconBars3 } from "./Icons/Outline"

interface Props {
  label: string
}

type Links = {
  label: string
  link: string
}

const LINK_ITEMS: Links[] = [
  { label: "Tenants", link: "/tenants" },
  { label: "Properties", link: "/properties" },
  { label: "Contracts", link: "/contracts" },
  { label: "Invoices", link: "/invoices" },
]

export const Menu = ({ label }: Props) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClientComponentClient<Database>()
    await supabase.auth.signOut()
    router.push("/")
  }
  return (
    <div className="dropdown dropdown-hover z-50">
      <h1 tabIndex={0} className="btn btn-ghost rounded-none mb-1">
        <IconBars3 className="w-5 h-5" /> {label}
      </h1>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 w-52"
      >
        {LINK_ITEMS.map((item, key) => {
          const isActive = pathname.startsWith(item.link)
          return (
            <li key={key}>
              <Link
                href={item.link}
                className={clsx("rounded-none mt-1", isActive && "active")}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
        <li>
          <button className="rounded-none mt-1" onClick={handleSignOut}>
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  )
}
