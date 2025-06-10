import GaugeComponent from 'react-gauge-component';

export default function TempGauge( {temp} : {temp: number} ) {
    return (
        <GaugeComponent
            type="semicircle"
            arc={{
                width: 0.2,
                padding: 0.005,
                cornerRadius: 1,
                subArcs: [
                    {
                        limit: 15,
                        color: '#00FFFF',
                        showTick: true,
                        tooltip: {
                            text: 'Too low temperature!'
                        }
                    },
                    {
                        limit: 17,
                        color: '#00D4FF',
                        showTick: true,
                        tooltip: {
                            text: 'Low temperature!'
                        }
                    },
                    {
                        limit: 28,
                        color: '#5BE12C',
                        showTick: true,
                        tooltip: {
                            text: 'OK temperature!'
                        }
                    },
                    {
                        limit: 30, color: '#F5CD19', showTick: true,
                        tooltip: {
                            text: 'High temperature!'
                        }
                    },
                    {
                        color: '#EA4228',
                        tooltip: {
                            text: 'Too high temperature!'
                        }
                    }
                ]
            }}
            pointer={{
                color: '#345243',
                length: 0.80,
                width: 15,
            }}
            labels={{
                valueLabel: { formatTextValue: value => value + 'ºC' },
                tickLabels: {
                    type: 'outer',
                    defaultTickValueConfig: {
                        formatTextValue: (value: any) => value + 'ºC',
                        style: { fontSize: 10 }
                    },
                    ticks: [
                        { value: 13 },
                        { value: 22.5 },
                        { value: 32 }
                    ],
                }
            }}
            value={temp}
            minValue={10}
            maxValue={35}
        />
    )
}