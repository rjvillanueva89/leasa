"use client"

import { supabase } from "@/lib/supabaseClient"
import { Property } from "@/schema/properties"
import { Tenant } from "@/schema/tenants"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./Button"
import { TenantPropertyContract } from "./ContractsTable"

const FormSchema = z.object({
  tenant_id: z.string().min(1),
  property_id: z.string().min(1),
  start_date: z.string().min(1),
  monthly: z.string(),
  notes: z.string().nullable(),
})

type FormFields = z.infer<typeof FormSchema>

interface Props {
  data?: TenantPropertyContract
  tenants: Pick<Tenant, "id" | "fullname">[]
  properties: Pick<Property, "id" | "name">[]
}

export const ContractForm = ({ data, tenants, properties }: Props) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(FormSchema),
    defaultValues: data
      ? {
          tenant_id: data.tenant_id,
          property_id: data.property_id,
          start_date: data.start_date,
          monthly: data.monthly,
          notes: data.notes,
        }
      : {},
  })

  const onSubmit = async ({
    tenant_id,
    property_id,
    start_date,
    monthly,
    notes,
  }: FormFields) => {
    if (data) {
      await supabase
        .from("contracts")
        .update({ tenant_id, property_id, start_date, monthly, notes })
        .eq("id", data.id)
    } else {
      await supabase
        .from("contracts")
        .insert({ tenant_id, property_id, start_date, monthly, notes })
    }
    router.push("/contracts")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4"
    >
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
          type="number"
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
