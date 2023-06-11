import { TenantPropertyContract } from "@/components/ContractsTable"
import { InvoiceForm } from "@/components/InvoiceForm"
import { supabase } from "@/lib/supabaseClient"
import { Invoice } from "@/schema/invoices"
import Link from "next/link"

interface Props {
  params: { id: string }
}

const EditInvoice = async ({ params }: Props) => {
  const { data } = await supabase
    .from("contracts")
    .select(`*, tenants (id, fullname), properties (id, name)`)
  const contracts = data as TenantPropertyContract[]
  const { data: dataInvoice } = await supabase
    .from("invoices")
    .select()
    .eq("id", params.id)
    .single()
  const invoice = dataInvoice as Invoice

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-semibold text-sm">Edit Invoice</h1>
        <Link href="/invoices" className="btn btn-ghost rounded-none">
          Back
        </Link>
      </div>
      <InvoiceForm data={invoice} contracts={contracts} />
    </>
  )
}

export default EditInvoice
