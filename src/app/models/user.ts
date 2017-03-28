export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    uuid: string;
    activated: string|null;
    locked:boolean;
    created_at:string|null;
    updated_at:string|null;
    deleted_at:string|null;
    image:string|null;
}
