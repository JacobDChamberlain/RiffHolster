//* ------------ Tab Interfaces: ------------
interface Tab {
    id: number;
    name: string;
    fileURL: string; //* This will eventually point to the location of an actual file (ex: coolTab.gp5)
    userId: number;
}

interface IUploadTabForm {
    name: string;
    fileURL: string; //? How can I upload a .gp5 file? --> AWS S3
    userId: number;
}