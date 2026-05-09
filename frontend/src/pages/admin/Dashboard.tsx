export default function Dashboard() { 
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">Total Orders</h3>
          <p className="text-3xl font-bold text-white mt-2">Loading...</p>
        </div>
        <div className="bg-dark-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">Total Revenue</h3>
          <p className="text-3xl font-bold text-gamertech-500 mt-2">Loading...</p>
        </div>
        <div className="bg-dark-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">Pending Orders</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">Loading...</p>
        </div>
      </div>
    </div>
  ); 
}
