import React from 'react';
import { LaptopInformation } from '../services/laptop';

interface LaptopListProps {
  laptops: LaptopInformation[];  
}

const LaptopList: React.FC<LaptopListProps> = ({ laptops }) => {
  
  return(
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              CPU Usage
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Memory Usage
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {laptops.map((laptop) => (
            <tr key={laptop.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{laptop.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{laptop.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {laptop.cpuUsage !== undefined
                    ? (laptop.cpuUsage * 100).toFixed(2) + '%'
                    : 'N/A'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {laptop.memoryUsage !== undefined
                    ? (laptop.memoryUsage * 100).toFixed(2) + '%'
                    : 'N/A'}
                </div>
              </td>
            </tr>
          ))}          
        </tbody>
      </table>
    </div>
  );
};

export default LaptopList;