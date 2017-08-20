import { Address } from './address';
import { Image } from './image';

export class Profile {
    user_id: number|null;
    image_id: number|null;
    image:Image = new Image;
    address_id: number|null;
    address:Address = new Address;
    first_name: string|null;
    last_name: string|null;
    phone: string|null;
    created_at:Date|null;
    updated_at:Date|null;
    deleted_at:Date|null;
}
