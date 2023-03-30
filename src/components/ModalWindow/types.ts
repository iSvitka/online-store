import { NavigateFunction } from "react-router-dom";

export interface ModalWindowProps {
    closeModal: () => void;
    clearCart: () => void;
}

export interface ValidateModalInterface {
    fullname: boolean;
    tel: boolean;
    address: boolean;
    email: boolean;
    cardNum: boolean;
    cardValid: boolean;
    cardCvv: boolean;
}

interface BaseChangeProps {
    event: React.ChangeEvent<HTMLInputElement>;
    validateModal: ValidateModalInterface;
    setValidateModal: (value: React.SetStateAction<ValidateModalInterface>, ) => void;
}

export interface FullNameChangeProps extends BaseChangeProps{
    setFullNameValue: (value: React.SetStateAction<string>) => void;
}

export interface TelChangeProps extends BaseChangeProps {
    setTelValue: (value: React.SetStateAction<string>) => void;
}

export interface AddressChangeProps extends BaseChangeProps{
    setAddressValue: (value: React.SetStateAction<string>) => void;
}

export interface EmailChangeProps extends BaseChangeProps {
    setEmailValue: (value: React.SetStateAction<string>) => void;
}
export interface CardNumChangeProps extends BaseChangeProps {
    setCardImage: (value: React.SetStateAction<string>) => void;
    setCardNumValue: (value: React.SetStateAction<string>) => void;
    mirLogo: string;
    visaCardImg: string;
    mcCardImg: string;
    defCardImg: string;
}

export interface CardValidChangeProps extends BaseChangeProps {
    cardValidValue: string;
    setCardValidValue: (value: React.SetStateAction<string>) => void
}

export interface CardCvvChangeProps extends BaseChangeProps {
    setCardCvvValue: (value: React.SetStateAction<string>) => void
}

export interface ConfirmModalProps {
    validateModal: ValidateModalInterface
    setTimer: (value: React.SetStateAction<boolean>) => void
    setIsValid: (value: React.SetStateAction<boolean>) => void
}
export interface CheckTimerProps {
    timer: boolean
    counter: number
    setCounter: (value: React.SetStateAction<number>) => void
    closeModal: () => void
    clearCart: () => void
    navigate: NavigateFunction
}