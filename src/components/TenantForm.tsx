"use client"

import { supabase } from "@/lib/supabaseClient"
import { Tenant } from "@/schema/tenants"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./Button"

const FormSchema = z.object({
  fullname: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
  notes: z.string().nullable(),
})

type FormFields = z.infer<typeof FormSchema>

interface Props {
  data?: Tenant
}

export const TenantForm = ({ data }: Props) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(FormSchema),
    defaultValues: data
      ? {
          fullname: data.fullname,
          email: data.email,
          phone: data.phone,
          notes: data.notes,
        }
      : {},
  })

  const onSubmit = async ({ fullname, email, phone, notes }: FormFields) => {
    if (data) {
      await supabase
        .from("tenants")
        .update({ fullname, email, phone, notes })
        .eq("id", data.id)

      await fetch("/api/revalidate?path=/tenants/[id]")
    } else {
      await supabase.from("tenants").insert({ fullname, email, phone, notes })

      await fetch("/api/revalidate?path=/tenants")
    }

    router.push("/tenants")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4"
    >
      <div className="form-control w-full max-w-sm">
        <label className="label">
          <span className="label-text">Full name</span>
        </label>
        <input
          type="text"
          placeholder="Full name"
          className={clsx(
            "input input-bordered w-full max-w-sm rounded-none",
            errors.fullname && "input-error"
          )}
          {...register("fullname")}
        />
      </div>
      <div className="form-control w-full max-w-sm">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          className={clsx(
            "input input-bordered w-full max-w-sm rounded-none",
            errors.email && "input-error"
          )}
          {...register("email")}
        />
      </div>
      <div className="form-control w-full max-w-sm">
        <label className="label">
          <span className="label-text">Phone</span>
        </label>
        <input
          type="text"
          placeholder="Phone"
          className={clsx(
            "input input-bordered w-full max-w-sm rounded-none",
            errors.phone && "input-error"
          )}
          {...register("phone")}
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
