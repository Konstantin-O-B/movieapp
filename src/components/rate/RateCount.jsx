import './RateCount.css';

export default function RateCount({ rate }) {
  const borderColor = (rate) => {
    if (rate >= 0 && rate < 3) {
      return '#E90000';
    }
    if (rate >= 3 && rate < 5) {
      return '#E97E00';
    }
    if (rate >= 5 && rate <= 7) {
      return '#E9D100';
    }
    if (rate > 7) {
      return '#66E900';
    }
    return '#E90000';
  };

  return (
    <div style={{ borderColor: borderColor(rate) }} className="numberCircle">
      {rate.toFixed(1)}
    </div>
  );
}
