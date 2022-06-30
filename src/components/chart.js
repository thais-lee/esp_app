import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const Chart = ({date, content, name}) => {
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const data = {
    labels: date.slice(-10),
    datasets: [
      {
        data: content.slice(-10),
        color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['last 10 values of ' + name],
  };
  return (
    <LineChart
      width={screenWidth}
      height={400}
      chartConfig={chartConfig}
      data={data}
      fromZero={true}
      verticalLabelRotation= {35}

    />
  );
};

export default Chart;
