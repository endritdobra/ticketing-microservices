import mongoose from 'mongoose';
import {OrderStatus} from "@rallycoding/common";
import {TicketDoc} from "./ticket";

interface OrderAttrs {
    orderId: string;
    status: OrderStatus;
    expiresAt: string;
    ticket: TicketDoc;
}

interface OrderDoc extends mongoose.Document {
    orderId: string;
    status: OrderStatus;
    expiresAt: string;
    ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
        }
    }
});

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export {Order};