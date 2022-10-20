export interface INotify {
    message?: string;
    type?: "ERROR" | "SUCCESS" | null;
    isOpen?: () => void;
    status?: boolean;
}