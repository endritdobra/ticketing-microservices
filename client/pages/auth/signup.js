import axios from "axios";
import {useState} from "react";
import useRequest from "../../hooks/use-request";
import router from "next/router";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {doRequest, errors} = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {email, password},
        onSuccess: () => {
            router.push('/');
        }
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        await doRequest();
    }

    return <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
            <label>Email Address</label>
            <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
            <label>Password</label>
            <input className="form-control" type="password" value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
        </div>
        {errors}
        <button className="btn btn-primary">Sign Up</button>
    </form>
}