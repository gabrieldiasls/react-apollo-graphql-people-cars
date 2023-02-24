// React imports
import React, { useEffect, useState } from 'react'

// Apollo imports
import { useMutation } from '@apollo/client'

// Antd imports
import { Button, Form, Input } from 'antd'

// Queries imports
import { UPDATE_PERSON } from '../../queries'

const UpdatePerson = props => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [updatePerson] = useMutation(UPDATE_PERSON)

  useEffect(() => {
    forceUpdate()
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values
    updatePerson({
      variables: {
        id,
        firstName,
        lastName
      }
    })
    props.onButtonClick()
  }

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value)
    switch (variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      default:
        break
    }
  }

  return (
    <Form
    form={form}
    name='update-people-form'
    layout='inline'
    onFinish={onFinish}
    size='large'
    initialValues={{
      firstName: firstName,
      lastName: lastName
    }}
    >
      <Form.Item
      name='firstName'
      rules={[{
        required: true,
        message: 'Please input your first name!'
      }]}
      >
        <Input
        placeholder='First Name'
        onChange={e => updateStateVariable('firstName', e.target.value)}
        />
      </Form.Item>

      <Form.Item
      name='lastName'
      rules={[{
        required: true,
        message: 'Please input your last name!'
      }]}
      >
        <Input
        placeholder='Last Name'
        onChange={e => updateStateVariable('lastName', e.target.value)}
        />
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
          type='primary'
          htmlType='submit'
          disabled={
            (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) || form.getFieldsError().filter(({ errors }) => errors.length).length
          }
          >Update Contact</Button>
        )}
      </Form.Item>

      <Button
      onClick={props.onButtonClick}
      >Cancel</Button>
    </Form>
  )
}

export default UpdatePerson