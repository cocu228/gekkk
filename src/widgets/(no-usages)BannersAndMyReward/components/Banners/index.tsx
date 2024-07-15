import styles from "../../styles.module.scss";
import { BannerWrapper } from "./BannerWrapper";

export function Banners() {
  return (
    <div className={styles.bannersWrap}>
      <BannerWrapper color='dark blue' bgcolor='#54CFE7'>
        <div className={styles.goToBlock}>{">"}</div>
        <p className={styles.bannerText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </p>
      </BannerWrapper>

      <div className='gap-[24px] flex'>
        <BannerWrapper color='brand dark blue' bgcolor='#FFC7D4'>
          <div className={styles.goToBlock}>{">"}</div>
          <p className={styles.bannerText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
        </BannerWrapper>

        <BannerWrapper color='brand white' bgcolor='#1259AD'>
          <div className={styles.goToBlock}>{">"}</div>
          <p className={styles.bannerText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
        </BannerWrapper>
      </div>
    </div>
  );
}
