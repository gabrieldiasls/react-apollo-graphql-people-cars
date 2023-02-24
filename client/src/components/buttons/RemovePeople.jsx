// React imports
import React from 'react'

// Antd imports
import { DeleteOutlined } from '@ant-design/icons'

// Apollo imports
import { useMutation } from '@apollo/client'

// Loadash imports
import filter from 'lodash.filter'

// Queries imports
import { GET_PEOPLE, REMOVE_PERSON } from '../../queries'

const RemovePeople = ({ id }) => {
  const [removePeople] = useMutation(REMOVE_PERSON)

  const onClick = () => {
    const result = window.confirm('Are you sure you want to delete this person?')

    if (result) {
      removePeople({
        variables: {
          id
        },
        update: (cache, { data: { removePeople } }) => {
          const { people } = cache.readQuery({ query: GET_PEOPLE })
          cache.writeQuery({
            query: GET_PEOPLE,
            data: {
              contacts: filter(people, c => {
                return c.id !== removePeople.id
              })
            }
          })
        }
      })
    }
  }

  return (
    <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={onClick} />
  )
}

export default RemovePeople