import { Tenant } from "@/schema/tenants"
import dayjs from "dayjs"
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
        <>
          {fullname}
          <small className="block">{email}</small>
        </>
      )
    },
  },
  { label: "Phone", cell: ({ phone }) => phone },
  {
    label: "Created at",
    cell: ({ created_at }) => dayjs(created_at).format("MMM DD,YYYY"),
  },
  {
    label: "Actions",
    cell: ({ id }) => <TenantActions id={id} />,
  },
]

export const TenantsTable = ({ data }: Props) => {
  return <Datatable columns={columns} data={data} />
}
