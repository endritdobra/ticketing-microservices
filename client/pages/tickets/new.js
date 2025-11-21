import {useState} from "react";
import useRequest from "../../hooks/use-request";
import router from "next/router";

const NewTicket = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const {doRequest, errors} = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {title, price},
        onSuccess: (ticket) => {
            setTitle('');
            setPrice('');
            console.log(ticket);
            router.push('/');
        }
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        doRequest();

    }

    const onBlur = (e) => {
        const value = parseFloat(price);
        if (!isNaN(value)) {
            setPrice(value.toFixed(2));
        }
    }

    return <div>
        <h1>New Ticket</h1>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Price</label>
                <input value={price} onBlur={onBlur} onChange={(e) => setPrice(e.target.value)}
                       className="form-control"/>
            </div>
            {errors}
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
}

export default NewTicket;