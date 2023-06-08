import { Menu } from "@/components/Menu"
import { TenantsTable } from "@/components/TenantsTable"
import { supabase } from "@/lib/supabaseClient"
import { Tenant } from "@/schema/tenants"
import Link from "next/link"

const TenantsPage = async () => {
  const { data } = await supabase.from("tenants").select()
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

export default TenantsPage
