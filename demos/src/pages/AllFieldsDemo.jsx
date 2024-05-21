import React from 'react'
import Formol, { Field } from 'formol'

const onSubmit = ({ login, password }) => {
  console.log('Submitted:', login, password)
}

const AllFieldsDemo = () => (
  <Formol onSubmit={onSubmit}>
    <Field>Login</Field>
    <Field type="password-strength">Password</Field>
  </Formol>
)

export default AllFieldsDemo
