import { ViewInvoice } from "@/components/ViewInvoice"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"
import { InvoiceContract } from "../../page"

interface Props {
  params: { id: string }
}

const ViewInvoicePage = async ({ params }: Props) => {
  const { data: dataInvoice } = await supabase
    .from("invoices")
    .select(`*, contracts (tenants (id, fullname), properties (id, name))`)
    .eq("id", params.id)
    .single()
  const invoice = dataInvoice as InvoiceContract

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="uppercase font-semibold text-sm">Invoice</h1>
        <Link href="/invoices" className="btn btn-ghost rounded-none">
          Back
        </Link>
      </div>
      <ViewInvoice data={invoice} />
    </>
  )
}

export const revalidate = 60
export default ViewInvoicePage
