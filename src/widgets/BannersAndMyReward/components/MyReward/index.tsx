import { Box, Typography, styled } from '@mui/material'
import Button from '@/shared/ui/button/Button';
import s from '../../styles.module.scss'

export function MyReward() {
  return (
    <div className={s.rewardBlock}>
      <h3 className={s.rewardTitle}>My bonus program</h3>
      <span className={s.rewardSubtitle}>0,1% on all card purchases</span>
      <span className={s.conditionsTitle}>Conditions</span>
      <ul style={{
        marginLeft: "12px",
        listStyleType: 'disc',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}>
        <li>
          <span className={s.conditionsItemTitle}>
            You make a card purchase and something else is written here to show the line change
          </span>
        </li>
        <li>
        <span className={s.conditionsItemTitle}>
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
