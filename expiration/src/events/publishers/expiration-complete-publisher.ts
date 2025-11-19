import {Subjects, Publisher, ExpirationCompleteEvent} from "@rallycoding/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    readonly subject = Subjects.ExpirationComplete;
}