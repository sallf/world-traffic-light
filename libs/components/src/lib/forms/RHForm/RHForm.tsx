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
  onClick: () => void
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
    onClick,
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
  const { handleSubmit, formState } = formProps

  useEffect(() => {
    if (defaultValues) {
      formProps.reset(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]) // only defaultValues

  // --------------------- ===
  //  RENDER
  // ---------------------
  const errorsCount = formState.errors
    ? Object.keys(formState.errors).length
    : 0

  return (
    <form onSubmit={handleSubmit(onClick)} className={className} {...rest}>
      {validationSchema && (
        <ChildrenLoop validationSchema={validationSchema} formProps={formProps}>
          {children}
        </ChildrenLoop>
      )}
      <div className="mt-2 flex gap-2 justify-end w-full col-span-full">
        <Cta type="submit">Sign In</Cta>
      </div>
      {errorsCount > 0 && (
        <div
          role="alert"
          className={`text-theme-error text-sm basis-full text-right`}
        >{`You have (${errorsCount}) error${errorsCount > 1 ? 's' : ''}`}</div>
      )}
      <input type="submit" className="hidden" />
    </form>
  )
}
