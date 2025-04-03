import styles from './SprintScreen.module.css'
import SprintList from '../ui/SprintList';
import Backlog from '../ui/Backlog';

const SprintScreen = () => {
   
    return (
        <>
            <div className={styles.backlog_container}>
                {/* Sprint List */}
                <SprintList />

                {/* Backlog */}
                <Backlog />
            </div>
        </>
    );
};

export default SprintScreen;
