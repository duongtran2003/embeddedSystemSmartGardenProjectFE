import { useEffect, useRef } from 'react';
import { ColorType, createChart, LineSeries, UTCTimestamp } from 'lightweight-charts';

function genMockedData(min: number, max: number, sampleSize: number) {
  const chartValues = [];
  const now = new Date();

  for (let i = 1; i < sampleSize; i++) {
    const time = (new Date(now.getTime() - i * 1000).getTime() / 1000) as UTCTimestamp;
    const value = Math.floor(Math.random() * (max - min + 1)) + min;
    chartValues.unshift({ time, value });
  }

  return chartValues;
}

export const DirtHumidityChart = (props: any) => {
  const {
    colors: {
      backgroundColor = '#F3E9DC', // Warm soil-like tone
      lineColor = '#8B5E3C', // Earthy brown
      textColor = '#5A4633', // Deep brown for better contrast
      areaTopColor = '#8B5E3C',
      areaBottomColor = 'rgba(139, 94, 60, 0.2)', // Soft gradient for depth
    } = {},
  } = props;

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<any>(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current!, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
        attributionLogo: false,
      },
      width: chartContainerRef.current!.clientWidth,
      height: 300,
    });

    chart.timeScale().fitContent();

    const newSeries = chart.addSeries(LineSeries, {
      color: lineColor,
    });

    seriesRef.current = newSeries;

    // Initial data
    const initialData = genMockedData(0, 100, 12);
    newSeries.setData(initialData);

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    };
    window.addEventListener('resize', handleResize);

    chart.timeScale().applyOptions({
      timeVisible: true,
      secondsVisible: false,
      tickMarkFormatter: (time, tickMarkType) => {
        const date = new Date(time * 1000);
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).replace(',', '');
      },
    });

    // Continuously push new data every 2 seconds
    const interval = setInterval(() => {
      const newDataPoint = {
        time: (new Date().getTime() / 1000) as UTCTimestamp,
        value: Math.floor(Math.random() * 101),
      };
      seriesRef.current?.update(newDataPoint);
    }, 2000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
      chart.remove();
    };
  }, [backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-lg text-[#5A4633] font-semibold">Độ ẩm đất (%)</div>
      <div className="p-4 w-full max-w-3xl mx-auto h-[300px]">
        <div ref={chartContainerRef} />
      </div>
    </div>
  );
};
