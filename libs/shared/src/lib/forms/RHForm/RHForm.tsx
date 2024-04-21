import type { FormHTMLAttributes, ReactNode } from 'react'
import { useEffect } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type { AnyObject } from 'yup'

import { ChildrenLoop } from './ChildrenLoop'
import { useYupValidationResolver } from '@world-traffic-light/hooks'
import { Cta } from '../../buttons'

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
  onSubmit: (data: FieldValues) => void
  validationSchema?: AnyObject | null
  className?: string
  defaultValues?: FieldValues | null
}

export const RHForm = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const {
    children,
    onSubmit,
    validationSchema = null,
    className = 'flex flex-wrap gap-4',
    defaultValues = null, // can be passed as array here, or individually to each component
    ...rest
  } = props

  // --------------------- ===
  //  HOOKS
  // ---------------------
  const resolver = useYupValidationResolver(validationSchema)
  const formProps = useForm({
    ...(validationSchema && { resolver }),
  }) // only add resolver if there's a schema
  const { handleSubmit } = formProps

  useEffect(() => {
    if (defaultValues) {
      formProps.reset(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]) // only defaultValues

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} {...rest}>
      {validationSchema && (
        <ChildrenLoop validationSchema={validationSchema} formProps={formProps}>
          {children}
        </ChildrenLoop>
      )}
      <div className="flex gap-2 justify-end w-full col-span-full">
        <Cta type="submit">Sign In</Cta>
      </div>
      <input type="submit" className="hidden" />
    </form>
  )
}
