// pages/LineChart.tsx o components/LineChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Importar Chart.js

const LineChart: React.FC = () => {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    datasets: [
      {
        label: 'Valor',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <h2>Gráfica de Líneas</h2>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
