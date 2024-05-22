import Button from '@/shared/ui/button/Button';
import styles from '../../styles.module.scss'

export function MyReward() {
  return (
    <div className={styles.rewardBlock}>
      <h3 className={styles.rewardTitle}>My bonus program</h3>
      <span className={styles.rewardSubtitle}>0,1% on all card purchases</span>
      <span className={styles.conditionsTitle}>Conditions</span>
      <ul style={{
        marginLeft: "12px",
        listStyleType: 'disc',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}>
        <li>
          <span className={styles.conditionsItemTitle}>
            You make a card purchase and something else is written here to show the line change
          </span>
        </li>
        <li>
        <span className={styles.conditionsItemTitle}>
          Card purchase makes you
        </span>
        </li>
      </ul>

      <Button>
        Proceed to My Reward
      </Button>
    </div>
  )
}
