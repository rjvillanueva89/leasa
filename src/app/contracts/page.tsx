import {
  ContractsTable,
  TenantPropertyContract,
} from "@/components/ContractsTable"
import { Menu } from "@/components/Menu"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

const ContractsPage = async () => {
  const { data } = await supabase
    .from("contracts")
    .select(`*, tenants (id, fullname), properties ( id, name )`)
  const contracts = data as TenantPropertyContract[]

  return (
    <>
      <div className="flex items-center justify-between">
        <Menu label="Contracts" />
        <Link href="/contracts/new" className="btn btn-ghost rounded-none">
          New Contract
        </Link>
      </div>
      <ContractsTable data={contracts} />
    </>
  )
}

export const revalidate = 10
export default ContractsPage
