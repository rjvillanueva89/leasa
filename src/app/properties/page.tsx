import { supabase } from "@/lib/supabaseClient"
import dayjs from "dayjs"
import Link from "next/link"
import { Database } from "../../lib/database.types"

type Tenant = Database["public"]["Tables"]["tenants"]["Row"]

const PropertiesPage = async () => {
  const { data } = await supabase.from("tenants").select()
  const tenants = data as Tenant[]

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-semibold text-sm">Properties</h1>
        <Link href="/tenants/new" className="btn btn-ghost rounded-none">
          New Property
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Label</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map(({ id, fullname, label, created_at }) => (
            <tr key={id}>
              <td>{fullname}</td>
              <td>{label}</td>
              <td>{dayjs(created_at).format("MMM DD, YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default PropertiesPage
