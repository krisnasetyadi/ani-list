import React, { useState } from 'react'
import { CREATE_USER } from "../graphql/mutation";
import { useMutation } from "@apollo/client";

export default function CreateUser() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [createUser, {error}] = useMutation(CREATE_USER)

  return (
    <div>
    <input type="text" placeholder="name" onChange={e => setName(e.target.value)} />
    <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)}/>
    <input type="text" placeholder="password" onChange={e => setPassword(e.target.value)} />
    <button onClick={() => {
      createUser({variables: {
        name: name,
        username: username,
        password: password
      }})
    }}>Create User</button>
    </div>
  )
}