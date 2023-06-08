import { Property } from "@/app/properties/page"
import dayjs from "dayjs"

interface Props {
  data: Property[]
}

export const PropertyTable = ({ data }: Props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Monthly</th>
          <th>Created at</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, name, monthly, created_at }) => {
          return (
            <tr key={id}>
              <td>{name}</td>
              <td>{monthly}</td>
              <td>{dayjs(created_at).format("MMM DD, YYYY")}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
