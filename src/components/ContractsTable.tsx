import { Contract } from "@/schema/contracts"
import { Property } from "@/schema/properties"
import { Tenant } from "@/schema/tenants"
import { ContractActions } from "./ContractActions"

export interface TenantPropertyContract extends Contract {
  tenants: Pick<Tenant, "id" | "fullname">
  properties: Pick<Property, "id" | "name">
}

interface Props {
  data: TenantPropertyContract[]
}

export const ContractsTable = ({ data }: Props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Tenant</th>
          <th>Monthly</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, tenants, properties, monthly, status }) => {
          return (
            <tr key={id}>
              <td>
                {tenants.fullname}
                <small className="block">{properties.name}</small>
              </td>
              <td>{monthly}</td>
              <td>
                <StatusToggle isChecked={status === "active"} />
              </td>
              <td>
                <ContractActions id={id} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

interface StatusToggleProps {
  isChecked: boolean
}

const StatusToggle = ({ isChecked }: StatusToggleProps) => {
  return <input type="checkbox" className="toggle" defaultChecked={isChecked} />
}
