import styles from './error-display.module.scss';

interface IErrorDisplay {
    error: string;
    onClick: () => void;
}

// TODO: Add a toast/snackbar
export default function ErrorDisplay(props: IErrorDisplay) {
    const { error, onClick } = props;

    return (
        error && (
            <div className={styles.errorContainer} data-testid="errorDisplay" onClick={onClick}>
                {error}, please contact support regarding this issue at support@solace.health
            </div>
        )
    );
}
