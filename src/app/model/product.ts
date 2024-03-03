export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    delPrice: number;
    discount: number;
    rating: number;
    category: string;
    total: number;
    quantity: number;
}

export interface User {
    fullname: string;
    email: string;
    phone: number;
    premium: string;
    offer: string[];
    address: string;
    password: string;
    status: boolean;
    id: number;
}