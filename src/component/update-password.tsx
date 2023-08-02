import React, { useState } from "react";
import { UPDATE_PASSWORD } from "../graphql/mutation";
import { useMutation } from "@apollo/client"

function UpdatedPassword () {
    const [username, setUsername] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [updatePassword, {error}] = useMutation(UPDATE_PASSWORD)
    return (
        <div>
            <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
            <input type="text" placeholder="current password" onChange={e => setCurrentPassword(e.target.value)}/>
            <input type="text" placeholder="new password" onChange={e => setNewPassword(e.target.value)} />
            <button onClick={() => updatePassword({
                variables: {
                    username: username,
                    oldPassword: currentPassword,
                    newPassword: newPassword
                }
            })}>Update Password</button>
        </div>
    )
}

export default UpdatedPassword