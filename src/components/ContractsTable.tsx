import { formatCurrencyPHP } from "@/lib/currency"
import { Contract } from "@/schema/contracts"
import { Property } from "@/schema/properties"
import { Tenant } from "@/schema/tenants"
import { ContractActions } from "./ContractActions"
import { Column, Datatable } from "./Datatable"

export interface TenantPropertyContract extends Contract {
  tenants: Pick<Tenant, "id" | "fullname">
  properties: Pick<Property, "id" | "name">
}

const columns: Column<TenantPropertyContract>[] = [
  {
    label: "Tenant",
    cell: ({ tenants }) => tenants.fullname,
  },
  {
    label: "Monthly",
    cell: ({ monthly }) => formatCurrencyPHP(parseInt(monthly)),
  },
  {
    label: "Status",
    cell: ({ status }) => <StatusToggle isChecked={status === "active"} />,
  },
  {
    label: "",
    cell: ({ id }) => <ContractActions id={id} />,
  },
]

interface Props {
  data: TenantPropertyContract[]
}

export const ContractsTable = ({ data }: Props) => {
  return <Datatable columns={columns} data={data} />
}

interface StatusToggleProps {
  isChecked: boolean
}

const StatusToggle = ({ isChecked }: StatusToggleProps) => {
  return <input type="checkbox" className="toggle" defaultChecked={isChecked} />
}
