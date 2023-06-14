import { InvoiceContract } from "@/app/invoices/page"
import { formatCurrencyPHP } from "@/lib/currency"
import dayjs from "@/lib/dayjs"

interface Props {
  data: InvoiceContract
}

export const ViewInvoice = ({ data }: Props) => {
  console.log(data)
  return (
    <div>
      <div>
        <ul>
          <li>
            <b className="uppercase text-xs">Property: </b>
            {data.contracts.properties.name}
          </li>
          <li>
            <b className="uppercase text-xs">Tenant: </b>
            {data.contracts.tenants.fullname}
          </li>
          <li>
            <b className="uppercase text-xs">Created on: </b>
            {dayjs(data.created_at).format("MMM DD, YYYY")}
          </li>
          {!!data.due_date && (
            <li>
              <b className="uppercase text-xs">Due on: </b>
              {dayjs(data.due_date).format("MMM DD, YYYY")}
            </li>
          )}
        </ul>
      </div>
      <div>
        <ul>
          {data.items.map((item, key) => {
            return (
              <li className="p-4" key={key}>
                <div className="flex justify-between gap-4">
                  <div className="flex-1">{item.description}</div>
                  <div className="font-medium">
                    {formatCurrencyPHP(parseFloat(item.amount))}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
