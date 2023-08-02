import React from 'react'
import { GET_ALL_USERS } from '../graphql/queries'
import { useQuery, useMutation } from "@apollo/client"
import { DELETE_USER } from '../graphql/mutation'

export default function ListOfUsers() {
    const {data, loading} = useQuery(GET_ALL_USERS)
    const [deleteUser, {error}] = useMutation(DELETE_USER)
    if (data){
        console.log('data', data)
    }

    return (
        <div>
            {data && data.getAllUsers.map((user: any) => {
                return (
                <div>
                    {user.name} / {user.username}
                    <button onClick={() => deleteUser({
                        variables: {
                            id: user.id
                        }
                    })}>Delete USer</button>
                </div>
                )
            })}
        </div>
    )
}