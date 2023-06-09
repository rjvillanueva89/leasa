import { ContractForm } from "@/components/ContractForm"
import { TenantPropertyContract } from "@/components/ContractsTable"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

interface Props {
  params: { id: string }
}

const EditContract = async ({ params }: Props) => {
  const { data } = await supabase
    .from("contracts")
    .select(`*, tenants (id, fullname), properties ( id, name )`)
    .eq("id", params.id)
    .single()
  const contract = data as TenantPropertyContract

  console.log(contract)

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-semibold text-sm">Edit Contract</h1>
        <Link href="/contracts" className="btn btn-ghost rounded-none">
          Back
        </Link>
      </div>
      <ContractForm data={contract} />
    </>
  )
}

export default EditContract
