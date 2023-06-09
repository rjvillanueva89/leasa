import { Contract } from "@/schema/contracts"
import { Property } from "@/schema/properties"
import { Tenant } from "@/schema/tenants"
import dayjs from "dayjs"

export interface TenantPropertyContract extends Contract {
  tenants: Pick<Tenant, "id" | "fullname">
  properties: Pick<Property, "id" | "name">
}

interface Props {
  data: TenantPropertyContract[]
}

export const ContractsTable = ({ data }: Props) => {
  console.log(data)
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Monthly</th>
          <th>Created at</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, tenants, properties, monthly, created_at }) => {
          return (
            <tr key={id}>
              <td>
                {tenants.fullname}
                <small className="block">{properties.name}</small>
              </td>
              <td>{monthly}</td>
              <td>{dayjs(created_at).format("MMM DD, YYYY")}</td>
              <td>-</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
