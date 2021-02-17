import { Address } from "./address";
import { Customer } from "./customer";
import { Item } from "./item";
import { Order } from "./order";

export interface Quote {
    customer: Customer;
    address: Address;
    order: Order;
    items: Item[];
    id: string;
    quantity: number;
    value: number;
    freight: number;
}
