"use client"

import { supabase } from "@/lib/supabaseClient"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const FormSchema = z.object({
  fullname: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
  notes: z.string(),
})

type FormFields = z.infer<typeof FormSchema>

export const TenantForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = async ({ fullname, email, phone, notes }: FormFields) => {
    await supabase.from("tenants").insert({ fullname, email, phone, notes })
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
        <button type="submit" className="btn btn-ghost rounded-none">
          Submit
        </button>
      </div>
    </form>
  )
}
