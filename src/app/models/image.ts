import { File } from './file';

export class Image {
    id: number|null;
    file_id:number|null;
    file:File = new File;
    height:number|null;
    width:number|null;
    created_at:Date|null;
    updated_at:Date|null;
    deleted_at:Date|null;
}
