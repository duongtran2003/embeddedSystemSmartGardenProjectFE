import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { chartDataPoint, chartTheme } from '../../monitor.model';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

interface props {
  label: string,
  min: number,
  max: number,
  data: chartDataPoint[],
  theme: chartTheme,
}

export const LineChart = ({ label, min, max, data, theme }: props) => {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: label },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'x',
        }
      },
    },
    scales: {
      y: { min: min, max: max },
    },
    animation: {
      duration: 0 // Disable animation on render
    }
  };

  const parsedData = {
    labels: data.map((data) => data.label),
    datasets: [
      {
        label: label,
        data: data.map((data) => data.value),
        borderColor: `rgb(${theme.r}, ${theme.g}, ${theme.b})`,
        backgroundColor: `rgba(${theme.r}, ${theme.g}, ${theme.b}, 0.2)`,
        tension: 0,
      },
    ],
  };

  return (
    <div className="p-4 w-full max-w-3xl mx-auto h-[300px]">
      <Line data={parsedData} options={options} />
    </div>
  );
};
