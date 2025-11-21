import useRequest from "../../hooks/use-request";
import router from "next/router";

const TicketShow = ({ticket}) => {
    const {doRequest, errors} = useRequest({
        url: `/api/orders`,
        method: 'post',
        body: {ticketId: ticket.id},
        onSuccess: (order) => {
            router.push("/orders/[orderId]", `/orders/${order.id}`);
        }
    });

    const onPurchase = () => {
        doRequest();
    }

    return <div>
        <h1>{ticket.title}</h1>
        <h4>{ticket.price}</h4>
        {errors}
        <button onClick={onPurchase} className="btn btn-primary">Purchase</button>
    </div>
};

TicketShow.getInitialProps = async (ctx, client) => {
    const ticketId = ctx.query.ticketId;
    const {data} = await client.get(`/api/tickets/${ticketId}`);

    return {ticket: data};
};

export default TicketShow;