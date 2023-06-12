import dayjs from "@/lib/dayjs"
import { Tenant } from "@/schema/tenants"
import { Column, Datatable } from "./Datatable"
import { TenantActions } from "./TenantActions"

interface Props {
  data: Tenant[]
}

const columns: Column<Tenant>[] = [
  {
    label: "Details",
    cell: ({ fullname, email }) => {
      return (
        <span className="text-right md:text-left">
          {fullname}
          <small className="block">{email}</small>
        </span>
      )
    },
  },
  { label: "Phone", cell: ({ phone }) => phone },
  {
    label: "Created at",
    cell: ({ created_at }) => dayjs(created_at).format("MM/DD/YYYY"),
  },
  {
    label: "Actions",
    cell: ({ id }) => <TenantActions id={id} />,
  },
]

export const TenantsTable = ({ data }: Props) => {
  return <Datatable columns={columns} data={data} />
}
