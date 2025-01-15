import { useStore } from '../../store/storeContext';
import { DatePickerRange } from '../DatePickerRange';
import { ExpenseTable } from '../ExpenseTable';
import { Layout } from '../Layout';
import styles from './index.module.css';

function App() {
  const { fromDate, toDate, setFromDate, setToDate } = useStore();

  return (
    <Layout>
      <div className={styles.content}>
        <div className={styles['date-range']}>
          <DatePickerRange
            from={fromDate}
            to={toDate}
            onChange={(from, to) => {
              setFromDate(from);
              setToDate(to);
            }}
          />
        </div>
        <ExpenseTable />
      </div>
    </Layout>
  );
}

export default App;
