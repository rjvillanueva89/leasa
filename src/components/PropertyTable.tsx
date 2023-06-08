import { Property } from "@/schema/properties"
import dayjs from "dayjs"
import { PropertyActions } from "./PropertyActions"

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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, name, monthly, created_at }) => {
          return (
            <tr key={id}>
              <td>{name}</td>
              <td>{monthly}</td>
              <td>{dayjs(created_at).format("MMM DD, YYYY")}</td>
              <td>
                <PropertyActions id={id} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
