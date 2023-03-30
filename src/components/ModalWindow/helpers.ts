import { AddressChangeProps, CardCvvChangeProps, CardNumChangeProps, CardValidChangeProps, CheckTimerProps, ConfirmModalProps, EmailChangeProps, FullNameChangeProps, TelChangeProps } from "./types";

const checkFullname = (fullnameString: string) => 
    fullnameString.split(' ').length >= 2 && 
    fullnameString.split(' ').every((part) => part.length >= 3 && part[0].toUpperCase() === part[0]);
export const fullNameChangeFunc = ({event, setFullNameValue, validateModal, setValidateModal}: FullNameChangeProps) => {
    setFullNameValue(event.target.value);
    setValidateModal({ ...validateModal, fullname: checkFullname(event.target.value), });
};

const checkTel = (telString: string) => !telString.slice(1).replaceAll(/[0-9]/g, '').length && telString.length >= 9 && telString.charAt(0) === '+';
export const telChangeFunc = ({event, setTelValue, validateModal, setValidateModal}: TelChangeProps) => {
    setTelValue(event.target.value);
    setValidateModal({ ...validateModal, tel: checkTel(event.target.value), });
};

const checkAddress = (addressString: string) => addressString.split(' ').length >= 3 && addressString.split(' ').every((part) => part.length >= 5);
export const addressChangeFunc = ({event, setAddressValue, validateModal, setValidateModal}: AddressChangeProps) => {
    setAddressValue(event.target.value);
    setValidateModal({ ...validateModal, address: checkAddress(event.target.value), });
};

const checkEmail = (emailString: string) => emailString.toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null;
export const emailChangeFunc = ({event, setEmailValue, validateModal, setValidateModal}: EmailChangeProps) => { 
    setEmailValue(event.target.value);
    setValidateModal({ ...validateModal, email: checkEmail(event.target.value), });
};

const checkCardNum = (cardNumString: string) => cardNumString.length === 16 && cardNumString.replaceAll(/[0-9]/g, '').length === 0;
export const cardNumChangeFunc = ({event, setCardImage, setCardNumValue, validateModal, setValidateModal,
mirLogo, visaCardImg, mcCardImg, defCardImg}: CardNumChangeProps) => {
    const firstDigit = Number(event.target.value.slice(0, 1));
    if (firstDigit === 2) {
        setCardImage(mirLogo);
    } else if (firstDigit === 4) {
        setCardImage(visaCardImg);
    } else if (firstDigit === 5) {
        setCardImage(mcCardImg);
    } else {
        setCardImage(defCardImg);
    }
    const cardNumString = event.target.value;
    const lastDigit = cardNumString.slice(-1);
    if (
        !lastDigit.replace(/[0-9]/g, '').length &&
        cardNumString.length <= 16
    ) {
        setCardNumValue(cardNumString);
        setValidateModal({
            ...validateModal,
            cardNum: checkCardNum(cardNumString),
        });
    }
};

const checkCardValid = (cardValidString: string) => {
    const month = Number(cardValidString.split('/')[0]);
    return ( month > 0 && month <= 12 && cardValidString.split('/').join('').length === 4 );
};
export const cardValidChangeFunc = ({event, cardValidValue, setCardValidValue, validateModal, setValidateModal}: CardValidChangeProps) => {
    if (event.target.value.length <= 5) {
        if (!event.target.value.slice(-1).replace(/[0-9]/, '').length) {
            if ( event.target.value.length === 2 && event.target.value.length > cardValidValue.length ) {
                const newValue = `${event.target.value}/`;
                setCardValidValue(newValue);
                setValidateModal({ ...validateModal, cardValid: checkCardValid(newValue), });
            } else if ( event.target.value.length === 3 && event.target.value.length > cardValidValue.length ) {
                const newValue = `${event.target.value.slice(0, -1)}/${event.target.value.slice(-1)}`;
                setCardValidValue(newValue);
                setValidateModal({ ...validateModal, cardValid: checkCardValid(newValue), });
            } else {
                setCardValidValue(event.target.value);
                setValidateModal({ ...validateModal, cardValid: checkCardValid(event.target.value), });
            }
        }
        if ( event.target.value.length === 3 && event.target.value.slice(-1) === '/' && event.target.value.length < cardValidValue.length ) {
            setCardValidValue(event.target.value);
            setValidateModal({ ...validateModal, cardValid: checkCardValid(event.target.value), });
        }
    }
};

const checkCardCvv = (cardCvvString: string) => cardCvvString.length === 3;
export const cardCvvChangeFunc = ({event, setCardCvvValue, validateModal, setValidateModal}: CardCvvChangeProps) => {
    if (event.target.value.length <= 3) {
        if (!event.target.value.slice(-1).replace(/[0-9]/g, '').length) {
            setCardCvvValue(event.target.value);
            setValidateModal({ ...validateModal, cardCvv: checkCardCvv(event.target.value), });
        }
    }
};

export const confirmModalFunc = ({validateModal, setTimer, setIsValid}: ConfirmModalProps) => {
    if ( Object.values(validateModal).every((part) => Boolean(part) === true) ) {
        setTimer(true);
    }
    setIsValid(true);
};

export const checkTimerFunc = ({timer, counter, setCounter, closeModal, clearCart, navigate}: CheckTimerProps) => {
    if (timer) {
        const interval = setInterval(() => setCounter((c) => c - 1), 1000);
        if (counter === 0) {
            clearInterval(interval);
            closeModal();
            clearCart();
            navigate('/online-store/');
        }
    }
}