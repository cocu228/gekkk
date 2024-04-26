import Loader from '@/shared/ui/loader';
import styles from './style.module.css';

const SkeletonCard = () => {
    return (
        <div className={styles.CardSkeleton}>
            <Loader />
        </div>
    );
}

export default SkeletonCard;
