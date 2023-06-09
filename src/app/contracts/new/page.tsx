import { ContractForm } from "@/components/ContractForm"
import { supabase } from "@/lib/supabaseClient"
import { Property } from "@/schema/properties"
import { Tenant } from "@/schema/tenants"
import Link from "next/link"

const NewContract = async () => {
  const { data: dataTenants } = await supabase
    .from("tenants")
    .select(`id, fullname`)
  const tenants = dataTenants as Pick<Tenant, "id" | "fullname">[]

  const { data: dataProperties } = await supabase
    .from("properties")
    .select(`id, name`)
  const properties = dataProperties as Pick<Property, "id" | "name">[]

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-semibold text-sm">New Contract</h1>
        <Link href="/contracts" className="btn btn-ghost rounded-none">
          Back
        </Link>
      </div>
      <ContractForm tenants={tenants} properties={properties} />
    </>
  )
}

export default NewContract
