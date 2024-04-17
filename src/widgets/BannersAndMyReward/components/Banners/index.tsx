import s from '../../styles.module.scss'
import { BannerWrapper } from './BannerWrapper'

export function Banners() {
  return (
    <div className={s.bannersWrap}>
      <BannerWrapper
        color="dark blue"
        bgcolor="#54CFE7"
      >
        <div className={s.goToBlock}>
          {'>'}
        </div>
        <p className={s.bannerText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </p>
      </BannerWrapper>

      <div className='gap-[24px] flex'>
        <BannerWrapper color="brand dark blue" bgcolor="#FFC7D4">
        <div className={s.goToBlock}>
          {'>'}
        </div>
          <p className={s.bannerText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </p>
        </BannerWrapper>

        <BannerWrapper color="brand white" bgcolor="#1259AD">
        <div className={s.goToBlock}>
          {'>'}
        </div>
          <p className={s.bannerText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </p>
        </BannerWrapper>
      </div>
    </div>
  )
}
