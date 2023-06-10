import { TenantPropertyContract } from "@/components/ContractsTable"
import { InvoiceForm } from "@/components/InvoiceForm"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

const NewInvoice = async () => {
  const { data } = await supabase
    .from("contracts")
    .select(`*, tenants (id, fullname), properties (id, name)`)
  const contracts = data as TenantPropertyContract[]

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-semibold text-sm">New Invoice</h1>
        <Link href="/invoices" className="btn btn-ghost rounded-none">
          Back
        </Link>
      </div>
      <InvoiceForm contracts={contracts} />
    </>
  )
}

export default NewInvoice
