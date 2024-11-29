import React from "react";


const Card = ({ title, value, sx }) => {
  return <div className="bg-white p-4 rounded-md shadow-md" style={sx}>
    <p className="text-lg font-bold">{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
} 
const Home = () => {
  return <div className="text-2xl font-bold">
    <Card title="Total de movimientos" value="100" sx={{ width: '300px', margin: '10px' }}/>
    <Card title="Total de recibos" value="100" sx={{ width: '300px', margin: '10px' }}/>
  </div>;
};

export default Home;
