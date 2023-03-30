import classNames from 'classnames';
import styles from './styles.module.scss';
import { GenericButton } from './types';

function Button(props: GenericButton) {
    const { callback, isReverse, children } = props;
    return (
        <button
            onClick={callback}
            type="button"
            className={classNames(
                styles.Button,
                isReverse ? styles.reverse : null
            )}
        >
            {children}
        </button>
    );
}

export default Button;
