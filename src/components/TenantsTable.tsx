import { Tenant } from "@/schema/tenants"
import dayjs from "dayjs"
import { TenantActions } from "./TenantActions"

interface Props {
  data: Tenant[]
}

export const TenantsTable = ({ data }: Props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Details</th>
          <th>Phone</th>
          <th>Created at</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, fullname, email, phone, created_at }) => (
          <tr key={id}>
            <td>
              {fullname}
              <small className="block">{email}</small>
            </td>
            <td>{phone}</td>
            <td>{dayjs(created_at).format("MMM DD, YYYY")}</td>
            <td>
              <TenantActions id={id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
