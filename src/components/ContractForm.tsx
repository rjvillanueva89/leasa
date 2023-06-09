"use client"

import { supabase } from "@/lib/supabaseClient"
import { Property } from "@/schema/properties"
import { Tenant } from "@/schema/tenants"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./Button"

const FormSchema = z.object({
  tenant_id: z.string().min(1),
  property_id: z.string().min(1),
  start_date: z.string().min(1),
  monthly: z.string().min(1),
  notes: z.string().nullable(),
})

type FormFields = z.infer<typeof FormSchema>

type TenantOption = Pick<Tenant, "id" | "fullname">
type PropertyOption = Pick<Property, "id" | "name">

export const ContractForm = () => {
  const router = useRouter()
  const [tenants, setTenants] = useState<TenantOption[] | null>()
  const [properties, setProperties] = useState<PropertyOption[] | null>()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = async (data: FormFields) => {
    await supabase.from("contracts").insert(data)
    router.push("/contracts")
  }

  const getTenants = async () => {
    const { data } = await supabase.from("tenants").select("id, fullname")
    setTenants(data as TenantOption[])
  }

  const getProperties = async () => {
    const { data } = await supabase.from("properties").select("id, name")
    setProperties(data as PropertyOption[])
  }

  useEffect(() => {
    getTenants()
    getProperties()
  }, [])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4"
    >
      <div className="form-control w-full max-w-sm">
        <label className="label">
          <span className="label-text">Property</span>
        </label>
        <select
          className={clsx(
            "select rounded-none",
            errors.property_id && "select-error"
          )}
          {...register("property_id")}
        >
          <option value="">Select Property</option>
          {properties?.map((property) => (
            <option key={property.id} value={property.id}>
              {property.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control w-full max-w-sm">
        <label className="label">
          <span className="label-text">Tenant</span>
        </label>
        <select
          className={clsx(
            "select rounded-none",
            errors.tenant_id && "select-error"
          )}
          {...register("tenant_id")}
        >
          <option value="">Select Tenant</option>
          {tenants?.map((tenant) => (
            <option key={tenant.id} value={tenant.id}>
              {tenant.fullname}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control w-full max-w-sm">
        <label className="label">
          <span className="label-text">Start Date</span>
        </label>
        <input
          type="date"
          placeholder="Start Date"
          className={clsx(
            "input input-bordered w-full max-w-sm rounded-none",
            errors.start_date && "input-error"
          )}
          {...register("start_date")}
        />
      </div>
      <div className="form-control w-full max-w-sm">
        <label className="label">
          <span className="label-text">Monthly</span>
        </label>
        <input
          type="text"
          placeholder="Monthly"
          className={clsx(
            "input input-bordered w-full max-w-sm rounded-none",
            errors.monthly && "input-error"
          )}
          {...register("monthly")}
        />
      </div>
      <div className="form-control w-full max-w-sm">
        <label className="label">
          <span className="label-text">Notes</span>
        </label>
        <textarea
          className="textarea textarea-bordered rounded-none"
          placeholder="Notes"
          {...register("notes")}
        ></textarea>
      </div>
      <div className="flex w-full justify-end">
        <Button type="submit" loading={isSubmitting}>
          Submit
        </Button>
      </div>
    </form>
  )
}
