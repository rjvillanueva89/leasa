"use client"

import { supabase } from "@/lib/supabaseClient"
import { Property } from "@/schema/properties"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./Button"

const FormSchema = z.object({
  name: z.string().min(1),
  monthly: z.string().min(1),
  notes: z.string().nullable(),
})

type FormFields = z.infer<typeof FormSchema>

interface Props {
  data?: Property
}

export const PropertyForm = ({ data }: Props) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(FormSchema),
    defaultValues: data
      ? {
          name: data.name,
          monthly: data.monthly,
          notes: data.notes,
        }
      : {},
  })

  const onSubmit = async ({ name, monthly, notes }: FormFields) => {
    if (data) {
      await supabase
        .from("properties")
        .update({ name, monthly, notes })
        .eq("id", data.id)
    } else {
      await supabase.from("properties").insert({ name, monthly, notes })
    }

    revalidatePath("/properties")
    router.push("/properties")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4"
    >
      <div className="form-control w-full max-w-sm">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Name"
          className={clsx(
            "input input-bordered w-full max-w-sm rounded-none",
            errors.name && "input-error"
          )}
          {...register("name")}
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
