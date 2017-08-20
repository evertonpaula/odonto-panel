import { AddressType } from './address-type';
import { Country } from './country';

export class Address {
    id: number|null;
    address: number|null;
    city: string|null;
    zipcode: string|null;
    country_id: string|null;
    country:Country = new Country;
    latitude: string|null;
    longitude:string|null;
    address_type_id:number|null;
    type:AddressType = new AddressType;
    created_at:Date|null;
    updated_at:Date|null;
    deleted_at:Date|null;
}
