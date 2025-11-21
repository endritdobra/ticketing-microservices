import {Subjects, Publisher, PaymentCreatedEvent} from "@rallycoding/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    readonly subject = Subjects.PaymentCreated;
}