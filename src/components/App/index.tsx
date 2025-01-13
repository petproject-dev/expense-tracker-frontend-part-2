import { DatePickerRange } from '../DatePickerRange';
import { ExpenseTable } from '../ExpenseTable';
import { Layout } from '../Layout';
import styles from './index.module.css';

function App() {
  return (
    <Layout>
      <div className={styles['date-range']}>
        <DatePickerRange
          from="2025-01-01"
          to="2025-01-11"
          onChange={(from, to) => {
            console.log({ from, to });
          }}
        />
      </div>
      <ExpenseTable />
    </Layout>
  );
}

export default App;
