import { InvoiceContract } from "@/app/invoices/page"
import { formatCurrencyPHP } from "@/lib/currency"
import dayjs from "@/lib/dayjs"
import { Separator } from "./Separator"

interface Props {
  data: InvoiceContract
}

export const ViewInvoice = ({ data }: Props) => {
  return (
    <div>
      <h2 className="text-center text-xl my-8 font-semibold">{data.title}</h2>
      <div className="flex justify-evenly text-center">
        <ul>
          <li>
            <small className="uppercase text-xs font-light">Property: </small>
            {data.contracts.properties.name}
          </li>
          <li>
            <small className="uppercase text-xs font-light">Tenant: </small>
            {data.contracts.tenants.fullname}
          </li>
        </ul>
        <ul>
          <li>
            <small className="uppercase text-xs font-light">Created on: </small>
            {dayjs(data.created_at).format("MMM DD, YYYY")}
          </li>
          {!!data.due_date && (
            <li>
              <small className="uppercase text-xs font-light">Due on: </small>
              {dayjs(data.due_date).format("MMM DD, YYYY")}
            </li>
          )}
        </ul>
      </div>
      <Separator label="items summary" />
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
      <Separator label="total" />
      <div className="text-center p-4">
        <span className="text-3xl font-bold">
          {formatCurrencyPHP(parseFloat(data.amount))}
        </span>
      </div>
    </div>
  )
}
