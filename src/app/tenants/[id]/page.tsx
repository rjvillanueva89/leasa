import { TenantForm } from "@/components/TenantForm"
import { supabase } from "@/lib/supabaseClient"
import { Tenant } from "@/schema/tenants"
import Link from "next/link"

interface Props {
  params: { id: string }
}

const EditTenant = async ({ params }: Props) => {
  const { data } = await supabase
    .from("tenants")
    .select()
    .eq("id", params.id)
    .single()
  const tenant = data as Tenant

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-semibold text-sm">Edit Tenant</h1>
        <Link href="/tenants" className="btn btn-ghost rounded-none">
          Back
        </Link>
      </div>
      <TenantForm data={tenant} />
    </>
  )
}

export default EditTenant
