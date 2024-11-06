export interface Order {
    id: string;
    customer: string;
    date: string;
    status: string;
    total: number;
    address: Address;
    notes?: string;
    orderItems: OrderItems[];
}

export interface Address {
    id: string;
    line1: string;
    line2?: string;
    city: string
    phoneNumber: string
}

export interface OrderItems {
    id: string,
    orderId: string,
    productId: string,
    variantId: string,
    quantity: number,
    price: number,
    total: number,
    product: Product;
    variant: Variant;
}

export interface Product {
    id: string;
    name: string
}

export interface Variant {
    id: string;
    name: string;
}