
import GaugeChart from 'react-gauge-chart';

export default function GaugeCO ({co} : {co: number}) {
  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold text-center mb-4">Nivel de CO2 actual</h2>
      <GaugeChart
        id="gauge-chart1"
        nrOfLevels={20}
        percent={co}
        colors={['#00FF00', '#FFF', '#FF0000']}
        arcWidth={0.4}
        textColor="#000000"
        needleColor="#000000"
        animate={false}
      />
    </div>
  );
};
