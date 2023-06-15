import { ContractForm } from "@/components/ContractForm"
import { TenantPropertyContract } from "@/components/ContractsTable"
import { supabase } from "@/lib/supabaseClient"
import { Property } from "@/schema/properties"
import { Tenant } from "@/schema/tenants"
import Link from "next/link"

interface Props {
  params: { id: string }
}

const EditContractPage = async ({ params }: Props) => {
  const { data } = await supabase
    .from("contracts")
    .select(`*, tenants (id, fullname), properties ( id, name )`)
    .eq("id", params.id)
    .single()
  const contract = data as TenantPropertyContract

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
        <h1 className="uppercase font-semibold text-sm">Edit Contract</h1>
        <Link href="/contracts" className="btn btn-ghost rounded-none">
          Back
        </Link>
      </div>
      <ContractForm data={contract} tenants={tenants} properties={properties} />
    </>
  )
}

export const revalidate = 10
export default EditContractPage
