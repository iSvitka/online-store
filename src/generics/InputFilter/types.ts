export interface GenericInputFilter {
    isReset?: boolean;
    setResetFalse: () => void;
    callback?: (value: string) => void;
    text: string;
    count?: number;
    totalCount: number;
    checked: boolean;
}