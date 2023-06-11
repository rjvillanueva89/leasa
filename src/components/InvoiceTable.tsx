import { InvoiceContract } from "@/app/invoices/page"
import { formatCurrencyPHP } from "@/lib/currency"
import dayjs from "dayjs"
import { Column, Datatable } from "./Datatable"
import { InvoiceActions } from "./InvoiceActions"

const columns: Column<InvoiceContract>[] = [
  {
    label: "Title",
    cell: ({ title, contracts: { tenants, properties } }) => {
      return (
        <>
          {title}
          <small className="block">
            {properties.name} - {tenants.fullname}
          </small>
        </>
      )
    },
  },
  {
    label: "Amount",
    cell: ({ amount }) => formatCurrencyPHP(parseInt(amount)),
  },
  {
    label: "Created at",
    cell: ({ created_at }) => dayjs(created_at).format("MM/DD/YYYY"),
  },
  {
    label: "",
    cell: ({ id }) => <InvoiceActions id={id} />,
  },
]

interface Props {
  data: InvoiceContract[]
}

export const InvoiceTable = ({ data }: Props) => {
  return <Datatable columns={columns} data={data} />
}
