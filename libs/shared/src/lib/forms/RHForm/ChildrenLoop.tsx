import type { ReactElement, ReactNode } from 'react'
import { Children, cloneElement, isValidElement } from 'react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import type { AnyObject, TestConfig } from 'yup'

import { Label, Text } from './index'

interface Props {
  validationSchema: AnyObject
  formProps: UseFormReturn<FieldValues, any>
  children: ReactNode
}

const isFieldRequired = (validationSchema: AnyObject, id: string) =>
  validationSchema
    .describe()
    //@ts-expect-error name is string or undefined
    .fields[id].tests.some(({ name }) => name === 'required')

const getFieldLimits = (validationSchema: AnyObject | null, id: string) => {
  let minLength: undefined | number = undefined
  let maxLength: undefined | number = undefined
  if (!validationSchema) return { minLength, maxLength }
  validationSchema.describe().fields[id].tests.forEach((test: TestConfig) => {
    if (test.name === 'min') {
      minLength = test?.params?.min as number
    }
    if (test.name === 'max') {
      maxLength = test?.params?.max as number
    }
  })
  return { minLength, maxLength }
}
// The point of this component is to loop through ALL children and
// find the inputs. This allows us to wrap inputs in other components and elements
export const ChildrenLoop = (props: Props) => {
  // --------------------- ===
  //  PROPS
  // ---------------------
  const { validationSchema, formProps, children } = props

  // --------------------- ===
  //  LOOP
  // ---------------------
  const loopChildren = (_children: ReactNode): ReactNode =>
    Children.map(_children, (child: ReactNode) => {
      if (!isValidElement(child)) return child
      const inputs = [Text, Date, Label]
      const name = typeof child.type !== 'string' ? child.type.name : undefined
      const isInput = inputs.some((input) => input.name === name)
      // If we find an input, stop here and return
      // This won't find nested inputs, but that shouldn't be a thing
      if (isInput) {
        const { minLength, maxLength } = getFieldLimits(
          validationSchema,
          child.props.id
        )
        return cloneElement(child as ReactElement<any>, {
          formProps,
          minLength,
          maxLength,
          required:
            !!validationSchema &&
            isFieldRequired(validationSchema, (child.props as any).id),
        })
      }
      if (child.props.children) {
        // If we find a child with children, keep looping
        return cloneElement(child, {
          // @ts-expect-error - not sure how to type this
          children: loopChildren((child.props as any).children),
        })
      }
      return child
    })

  // --------------------- ===
  //  RETURN
  // ---------------------

  return loopChildren(children)
}
