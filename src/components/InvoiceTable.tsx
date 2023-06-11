import { InvoiceContract } from "@/app/invoices/page"
import dayjs from "dayjs"
import { Column, Datatable } from "./Datatable"

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
  { label: "Amount", cell: ({ amount }) => amount },
  {
    label: "Created at",
    cell: ({ created_at }) => dayjs(created_at).format("MM/DD/YYYY"),
  },
  {
    label: "",
    cell: ({ id }) => <>-</>,
  },
]

interface Props {
  data: InvoiceContract[]
}

export const InvoiceTable = ({ data }: Props) => {
  return <Datatable columns={columns} data={data} />
}
