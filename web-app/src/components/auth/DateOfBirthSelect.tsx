import { useMediaQuery } from 'react-responsive';

type Props = {
  days: number[];
  months: number[];
  years: number[];
  dateError: string;
  handleSelectChange: any;
  bDay: number;
  bMonth: number;
  bYear: number;
};

const DateOfBirthSelect: React.FC<Props> = ({
  days,
  months,
  years,
  dateError,
  handleSelectChange,
  bDay,
  bMonth,
  bYear,
}) => {
  const view3 = useMediaQuery({
    query: '(min-width: 1170px)',
  });

  return (
    <div
      className="register_grid"
      style={{
        marginBottom: `${dateError && !view3 ? '90px' : '0'}`,
      }}
    >
      <select name="bDay" value={bDay} onChange={handleSelectChange}>
        {days.map((day, i) => (
          <option value={day} key={i}>
            {day}
          </option>
        ))}
      </select>
      <select name="bMonth" value={bMonth} onChange={handleSelectChange}>
        {months.map((month, i) => (
          <option value={month} key={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="bYear" value={bYear} onChange={handleSelectChange}>
        {years.map((year, i) => (
          <option value={year} key={i}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
        <div
          className={
            !view3 ? 'input_error' : 'input_error input_error_select_large'
          }
        >
          <div
            className={!view3 ? 'error_arrow_bottom' : 'error_arrow_left'}
          ></div>
          {dateError}
        </div>
      )}
    </div>
  );
};

export default DateOfBirthSelect;
