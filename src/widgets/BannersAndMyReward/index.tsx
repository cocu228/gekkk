import { Box } from '@mui/material'
import { Banners } from './components/Banners'
import { MyReward } from './components/MyReward'
import s from './styles.module.scss'

export function BannersAndMyReward() {
  return (
    <div className={s.rewardsWrap}>
      <Banners />
      <MyReward />
    </div>
  )
}
