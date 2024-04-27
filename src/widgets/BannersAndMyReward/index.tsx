import { Banners } from './components/Banners'
import { MyReward } from './components/MyReward'
import styles from './styles.module.scss'

export function BannersAndMyReward() {
  return (
    <div className={styles.rewardsWrap}>
      <Banners />
      <MyReward />
    </div>
  )
}
