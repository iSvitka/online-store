import { ValidateModalInterface } from "../ModalWindow/types"

export interface CreditCardProps {
    cardNumChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    cardNumValue: string
    cardValidChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    cardValidValue: string
    cardCvvChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    cardCvvValue: string
    validateModal: ValidateModalInterface
    cardImage: string
}