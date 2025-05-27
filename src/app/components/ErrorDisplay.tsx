import { FC } from 'react';
import styles from './error-display.module.scss';

interface IErrorDisplay {
    error: string;
    onClick: () => void;
}

/**
 * Error Display is the placeholder for a better way to display errors
 */
const ErrorDisplay: FC = (props: IErrorDisplay) => {
    const { error, onClick } = props;

    return (
        error && (
            <div className={styles.errorContainer} data-testid="errorDisplay" onClick={onClick}>
                {error}, please contact support regarding this issue at support@solace.health
            </div>
        )
    );
};

export default ErrorDisplay;
