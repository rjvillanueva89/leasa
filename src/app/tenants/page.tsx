import { Menu } from "@/components/Menu"
import { TenantActions } from "@/components/TenantActions"
import { supabase } from "@/lib/supabaseClient"
import { Tenant } from "@/schema/tenants"
import dayjs from "dayjs"
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
      <table className="table">
        <thead>
          <tr>
            <th>Details</th>
            <th>Phone</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map(({ id, fullname, email, phone, created_at }) => (
            <tr key={id}>
              <td>
                {fullname}
                <small className="block">{email}</small>
              </td>
              <td>{phone}</td>
              <td>{dayjs(created_at).format("MMM DD, YYYY")}</td>
              <td>
                <TenantActions id={id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default TenantsPage
