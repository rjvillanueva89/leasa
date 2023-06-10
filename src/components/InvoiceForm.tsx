"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./Button"
import { TenantPropertyContract } from "./ContractsTable"
import { IconTrash } from "./Icons/Outline"
import { Separator } from "./Separator"

const ItemSchema = z.object({
  description: z.string(),
  amount: z.string(),
})

const FormSchema = z.object({
  contract_id: z.string().min(1),
  title: z.string().min(1),
  items: ItemSchema.array(),
  total: z.number(),
  due_date: z.date(),
})

type FormFields = z.infer<typeof FormSchema>

interface Props {
  contracts: TenantPropertyContract[]
}

export const InvoiceForm = ({ contracts }: Props) => {
  const [total, setTotal] = useState(0)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormFields>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [{ description: "", amount: "" }],
    },
  })

  const {
    fields: itemFields,
    append,
    remove,
  } = useFieldArray({
    name: "items",
    control,
  })

  const watchedItems = watch("items")
  const totalAmount = watchedItems?.reduce((accumulator, field) => {
    return accumulator + parseFloat(field.amount)
  }, 0)

  useEffect(() => {
    if (!!totalAmount) setTotal(totalAmount)
  }, [watchedItems, totalAmount, setTotal])

  return (
    <form className="flex flex-col items-center gap-4">
      <div className="form-control w-full max-w-sm">
        <label className="label">
          <span className="label-text">Tenant Contract</span>
        </label>
        <select
          className={clsx(
            "select rounded-none",
            errors.contract_id && "select-error"
          )}
          {...register("contract_id")}
        >
          <option value="">Select Tenant</option>
          {contracts?.map((contract) => (
            <option key={contract.id} value={contract.id}>
              {contract.properties.name} - {contract.tenants.fullname}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control w-full max-w-sm">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          placeholder="Full name"
          className={clsx(
            "input input-bordered w-full max-w-sm rounded-none",
            errors.title && "input-error"
          )}
          {...register("title")}
        />
      </div>
      <div className="form-control w-full max-w-sm">
        <label className="label">
          <span className="label-text">Due Date</span>
        </label>
        <input
          type="date"
          placeholder="Full name"
          className={clsx(
            "input input-bordered w-full max-w-sm rounded-none",
            errors.title && "input-error"
          )}
          {...register("title")}
        />
      </div>
      <Separator label="Items" />
      <div className="flex flex-col gap-4">
        {itemFields.map((item, key) => {
          return (
            <div key={key} className="flex items-center w-full max-w-sm">
              <input
                type="text"
                className="input w-2/3 rounded-none"
                placeholder="Item"
                {...register(`items.${key}.description`)}
              />
              <input
                type="number"
                step="any"
                className="text-right input w-1/3 rounded-none ml-2"
                placeholder="0"
                {...register(`items.${key}.amount`)}
              />
              <div className="relative">
                {key > 0 && (
                  <button
                    type="button"
                    className="absolute -mt-1.5 ml-2"
                    onClick={() => {
                      remove(key)
                    }}
                  >
                    <IconTrash />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <button
        type="button"
        className="btn rounded-none"
        onClick={() => append({ description: "", amount: "" })}
      >
        Add Item
      </button>
      <Separator label="Total" />
      <span className="text-3xl font-bold">{total}</span>
      <div className="flex w-full justify-end">
        <Button type="submit" loading={isSubmitting}>
          Submit
        </Button>
      </div>
    </form>
  )
}
