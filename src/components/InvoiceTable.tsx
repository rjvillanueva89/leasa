import { InvoiceContract } from "@/app/invoices/page"
import dayjs from "dayjs"

interface Props {
  data: InvoiceContract[]
}

export const InvoiceTable = ({ data }: Props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Created at</th>
        </tr>
      </thead>
      <tbody>
        {data.map(
          ({
            id,
            title,
            contracts: { tenants, properties },
            amount,
            created_at,
          }) => {
            return (
              <tr key={id}>
                <td>
                  {title}
                  <small className="block">
                    {properties.name} - {tenants.fullname}
                  </small>
                </td>
                <td>{amount}</td>
                <td>{dayjs(created_at).format("MMM DD, YYYY")}</td>
                <td>-</td>
              </tr>
            )
          }
        )}
      </tbody>
    </table>
  )
}
