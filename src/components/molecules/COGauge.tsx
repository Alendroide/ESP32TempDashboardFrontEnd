import GaugeComponent from "react-gauge-component";

export default function COGauge({co} : {co : number}) {
    return (
        <GaugeComponent
            type="semicircle"
            arc={{
                width: 0.2,
                padding: 0.005,
                cornerRadius: 1,
                subArcs: [
                    {
                        limit: 200,
                        color: '#42a120',
                        showTick: true,
                        tooltip: {
                            text: 'Great concentration!'
                        }
                    },
                    {
                        limit: 462, color: '#5BE12C', showTick: true,
                        tooltip: {
                            text: 'OK'
                        }
                    },
                    {
                        color: '#EA4228',
                        tooltip: {
                            text: 'Too much gas!'
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
                valueLabel: { formatTextValue: value => value + 'ppm' },
                tickLabels: {
                    type: 'outer',
                    defaultTickValueConfig: {
                        formatTextValue: (value: any) => value + 'ppm',
                        style: { fontSize: 10 }
                    },
                    ticks: [
                        { value: 200 },
                        { value: 725 }
                    ],
                }
            }}
            value={co}
            minValue={0}
            maxValue={925}
        />
    )
}