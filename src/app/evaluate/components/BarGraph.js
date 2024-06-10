'use client';

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';


const barColors = ['#3b82f6', '#8b5cf6'];

const BarGraph = ( {dataBar}) => {
  
  const CustomLabel = ({ x, y, width, value }) => (
    <text x={x + width / 2} y={y} dy={-10} textAnchor="middle" fill="#666">{value}</text>
  );
  const maxValue = Math.ceil(Math.max(...dataBar.map(entry => entry.value)));

  
  return (
    <div className='graph-container' id="bar-graph">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={400} height={300} data={dataBar}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, maxValue]} />

          <Bar dataKey="value">
            <LabelList dataKey="value" /* content={<CustomLabel />} */ />
            {dataBar.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
            ))}
        </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;

