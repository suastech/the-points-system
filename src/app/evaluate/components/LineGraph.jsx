'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Dot,
  ResponsiveContainer,
} from 'recharts';

const calculateYDomain = (data, keys) => {
  let minY = Infinity;
  let maxY = -Infinity;

  data.forEach(entry => {
    keys.forEach(key => {
      const value = entry[key];
      if (value < minY) minY = value;
      if (value > maxY) maxY = value;
    });
  });

  //Adding margin 
  const margin = (maxY - minY) * 0.1;
  return [Math.round(minY - margin), Math.round(maxY + margin)];
};

const LineGraph = ({dataLine, person1, person2}) => {

  const yAxisDomain = calculateYDomain(dataLine, [person1, person2]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip">
          <p>Date: {label}</p>
          <p>{person1}: {payload[0].value} points</p>
          <p>{person2}: {payload[1].value} points</p>
        </div>
      );
    }
  };

  return (
    <div className='graph-container' id="line-graph">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={dataLine}
          margin={{
            right: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={false}/>
          <YAxis domain={yAxisDomain} />
         <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey={person1} stroke="#008944" dot={false}/>
          <Line type="monotone" dataKey={person2} stroke="#334bff" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;

