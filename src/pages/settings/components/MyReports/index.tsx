import styles from "../../styles.module.scss";
import { Table } from "./components/Table";

export function MyReports() {

  return (
    <div className={styles.reportsWrap}>
      <div className='flex flex-col'>
          <Table />
        </div>
    </div>
  )
}
