export class User {
    id: number;
    name: string;
    email: string;
    phone: string;
    uuid: string;
    activated: string|null;
    locked:boolean;
    created_at:Date|null;
    updated_at:Date|null;
    deleted_at:Date|null;
    image:string|null;
}
