import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { ModalWindowProps, ValidateModalInterface } from './types';
import defCardImg from '../../assets/images/default-card.jpg';
import visaCardImg from '../../assets/icons/visa-card.svg';
import mcCardImg from '../../assets/icons/mastercard-card.svg';
import mirLogo from '../../assets/icons/mir-logo.svg';
import { addressChangeFunc, cardCvvChangeFunc, cardNumChangeFunc, cardValidChangeFunc, checkTimerFunc, confirmModalFunc, emailChangeFunc, fullNameChangeFunc, telChangeFunc } from './helpers';
import ValidateCardMarkers from '../ValidateCardMarkers/ValidateCardMarkers';
import CreditCard from '../CreditCard/CreditCard';

export default function ModalWindow({ closeModal, clearCart }: ModalWindowProps) {
    const navigate = useNavigate();
    const [validateModal, setValidateModal] = useState<ValidateModalInterface>({
        fullname: false,
        tel: false,
        address: false,
        email: false,
        cardNum: false,
        cardValid: false,
        cardCvv: false,
    });
    const [fullNameValue, setFullNameValue] = useState('');
    const fullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        fullNameChangeFunc({event, setFullNameValue, validateModal, setValidateModal})
    };
    const [telValue, setTelValue] = useState('');
    const telChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        telChangeFunc({event, setTelValue, validateModal, setValidateModal})
    };
    const [addressValue, setAddressValue] = useState('');
    const addressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        addressChangeFunc({event, setAddressValue, validateModal, setValidateModal})
    };
    const [emailValue, setEmailValue] = useState('');
    const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        emailChangeFunc({event, setEmailValue, validateModal, setValidateModal})
    };
    const [cardImage, setCardImage] = useState(defCardImg);
    const [cardNumValue, setCardNumValue] = useState('');
    const cardNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        cardNumChangeFunc({event, setCardImage, setCardNumValue, validateModal, setValidateModal,
        mirLogo, visaCardImg, mcCardImg, defCardImg})
    };
    const [cardValidValue, setCardValidValue] = useState('');
    const cardValidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        cardValidChangeFunc({event, cardValidValue, setCardValidValue, validateModal, setValidateModal})
    };
    const [cardCvvValue, setCardCvvValue] = useState('');
    const cardCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        cardCvvChangeFunc({event, setCardCvvValue, validateModal, setValidateModal})
    };
    const [isValid, setIsValid] = useState<boolean>(false);
    const [counter, setCounter] = useState(3);
    const [timer, setTimer] = useState(false);
    const confirmModal = () => {
        confirmModalFunc({validateModal, setTimer, setIsValid})
    };
    useEffect(() => {
        checkTimerFunc({timer, counter, setCounter, closeModal, clearCart, navigate})
    }, [counter, timer, closeModal, clearCart, navigate]);

    return (
        <div className={styles.ModalWindow}>
            <div className={styles.contentCont}>
                {timer 
                ? ( <p>Thanks for the purchase!</p>) 
                : (
                    <>
                        <div className={styles.defInputCont}>
                            <input
                                className={`${styles.defInput}\n${
                                    validateModal.fullname
                                        ? styles.defInputValid
                                        : styles.defInputInvalid
                                }`}
                                type="text"
                                name="fullname"
                                placeholder="Name nad Surname"
                                onChange={fullNameChange}
                                value={fullNameValue}
                                required
                            />
                            {isValid === true && validateModal.fullname === false 
                            ? (<span
                                    className={styles.defInputErrorSpan}
                                    title="Enter Name and Surname longer than 3 char's"
                                >Error!</span>)
                            : (false)}
                        </div>
                        <div className={styles.defInputCont}>
                            <input
                                className={`${styles.defInput}\n${
                                    validateModal.tel
                                        ? styles.defInputValid
                                        : styles.defInputInvalid
                                }`}
                                type="tel"
                                name="tel"
                                placeholder="Phone number"
                                onChange={telChange}
                                value={telValue}
                                required
                            />
                            {isValid === true && validateModal.tel === false
                            ? (<span
                                    className={styles.defInputErrorSpan}
                                    title="Enter phone number, that starts with '+'"
                                >Error!</span>)
                            : (false)}
                        </div>
                        <div className={styles.defInputCont}>
                            <input
                                className={`${styles.defInput}\n${
                                    validateModal.address
                                        ? styles.defInputValid
                                        : styles.defInputInvalid
                                }`}
                                type="text"
                                name="address"
                                placeholder="Delivery address"
                                onChange={addressChange}
                                value={addressValue}
                                required
                            />
                            {isValid === true &&
                            validateModal.address === false 
                            ? (<span
                                    className={styles.defInputErrorSpan}
                                    title="Enter at least three words longer than 5 char's"
                                >Error!</span>)
                            : (false)}
                        </div>
                        <div className={styles.defInputCont}>
                            <input
                                className={`${styles.defInput}\n${
                                    validateModal.email
                                        ? styles.defInputValid
                                        : styles.defInputInvalid
                                }`}
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={emailChange}
                                value={emailValue}
                                required
                            />
                            {isValid === true && validateModal.email === false
                            ? (<span
                                    className={styles.defInputErrorSpan}
                                    title="Enter one correct email"
                                >Error!</span>)
                            : (false)}
                        </div>
                        <CreditCard 
                            cardNumChange={cardNumChange}
                            cardNumValue={cardNumValue}
                            cardValidChange={cardValidChange}
                            cardValidValue={cardValidValue}
                            cardCvvChange={cardCvvChange}
                            cardCvvValue={cardCvvValue}
                            validateModal={validateModal}
                            cardImage={cardImage}
                            />
                        {!!isValid && <ValidateCardMarkers isValid={isValid} validateModal={validateModal}/>}
                        <button className={styles.confirmButton} type="button" onClick={confirmModal}>Confirm</button>
                        <button className={styles.closeModalButton} type="button" onClick={closeModal}>X</button>
                    </>
                )}
            </div>
        </div>
    );
}
