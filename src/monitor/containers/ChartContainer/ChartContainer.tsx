import { DirtHumidityChart } from "../DirtHumidityChart/DirtHumidityChart";
import { LightIntensityChart } from "../LightIntensityChart/LightIntensityChart";

export const ChartContainer = () => {
  return (
    <>
      <div className="py-4">
        <DirtHumidityChart />
      </div>
      <div className="py-4">
        <LightIntensityChart />
      </div>
    </>
  )
}
