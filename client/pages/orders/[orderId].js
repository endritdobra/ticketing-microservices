import {useEffect, useState} from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";
import router from "next/router";

const OrderShow = ({order, currentUser}) => {
    const [timeLeft, setTimeLeft] = useState('');
    const {doRequest, errors} = useRequest({
        url: `/api/payments/${order.id}`,
        method: 'post',
        body: {
            orderId: order.id
        },
        onSuccess: (payment) => {
            router.push('/orders')
            console.log('Payment successful!', payment);
        }
    })

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);
        return () => {
            clearInterval(timerId)
        };
    }, [order]);

    if (timeLeft < 0) {
        return <div>Order expired</div>
    }

    return <div>
        Time left to pay: {timeLeft} seconds
        <StripeCheckout
            token={({id}) => doRequest({ token: id })}
            stripeKey="test"
            amount={order.ticket.price * 100}
            email={currentUser.email}
        />
        {errors}
    </div>
}

OrderShow.getInitialProps = async (ctx, client) => {
    const orderId = ctx.query.orderId;
    const {data} = await client.get(`/api/orders/${orderId}`);
    return {order: data}
};

export default OrderShow;