import { Menu } from "@/components/Menu"
import { TenantsTable } from "@/components/TenantsTable"
import { supabase } from "@/lib/supabaseClient"
import { Tenant } from "@/schema/tenants"
import Link from "next/link"

const getTenants = () => {
  return supabase.from("tenants").select()
}

const TenantsPage = async () => {
  const { data } = await getTenants()
  const tenants = data as Tenant[]

  return (
    <>
      <div className="flex items-center justify-between">
        <Menu label="Tenants" />
        <Link href="/tenants/new" className="btn btn-ghost rounded-none">
          New Tenant
        </Link>
      </div>
      <TenantsTable data={tenants} />
    </>
  )
}

export const revalidate = 10
export default TenantsPage
