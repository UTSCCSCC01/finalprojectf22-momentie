import axios from 'axios'
import React, { useState } from "react";
import { useRouter } from 'next/router'
export default () => {
    const router = useRouter()
    const [form, setValues] = useState({
        password: "",
        username: ""
    });

    const sendRequest = e => {
        e.preventDefault();
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.post('http://localhost:5000/login', { username: form.username, password: form.password })
            .then(function (response) {
                router.replace('/')
            }).catch(function (error) {
                console.log(error.message);
            });
    };

    // Simplified onChange event uses useState
    const updateField = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div>
            <form onSubmit={sendRequest}>
                <label>
                    Username:
                    <input
                        value={form.username}
                        name="username"
                        type="text"
                        required={true}
                        onChange={updateField}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        value={form.password}
                        name="password"
                        type="password"
                        required={true}
                        onChange={updateField}
                    />
                </label>
                <br />
                <button>
                    Submit
                </button>
            </form>
        </div>
    )
}