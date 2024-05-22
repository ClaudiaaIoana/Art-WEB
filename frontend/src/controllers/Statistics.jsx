import ReactDOM from 'react-dom'
import React, { Fragment, useState,useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import axios from "axios";

Chart.register(...registerables)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    colors: {
      enabled: true,
    },
    tooltip: {
      callbacks: {
        title: (tooltipItems) => {
          return ''
        },
        label: function (context) {
          let label = context.dataset.label || ''

          if (label) {
            label += ' Sales'
          }
          if (context.parsed.y !== null) {
            label += `: ${context.parsed.y}`
          }
          return label
        },
      },
      backgroundColor: '#fff',
      borderColor: '#f0f0f0',
      usePointStyle: false,
      showShadow: true,
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
      },
      ticks: {
        color: '#6B7280', // Adjust x-axis label color
      },
    },
    y: {
      grid: {
        display: true,
        color: '#E5E7EB', // Adjust grid line color
      },
      ticks: {
        color: '#6B7280', // Adjust y-axis label color
      },
    },
  },
}

// Simulated sales data per month
const salesPerMonth = [10, 50, 100, 16, 80, 70, 55, 65, 103, 120, 82, 45]
const sumPerMonth = [1200, 1500, 1300, 1600, 1800, 2000, 2200, 2500, 2700, 3000, 3200, 2800]

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

// Use salesData instead of graphData
const labels = months
export const salesData = {
  labels,
  datasets: [
    {
      backgroundColor: '#5052ff',
      data: salesPerMonth, // Use salesData instead of graphData
      barPercentage: 0.5, // Adjust bar width
    },
  ],
}

export const sumData = {
  labels,
  datasets: [
    {
      backgroundColor: '#5052ff',
      data: sumPerMonth, // Use salesData instead of graphData
      barPercentage: 0.5, // Adjust bar width
    },
  ],
}


const Statistics = () => {

  const [sellers,setSellers]=useState([]);
  const [isAdmin,setIsAdmin]=useState(false);
  const [bidders,setBidders]=useState([]);
  const [expArt,setExpArt]=useState([]);

  useEffect(() => {
    // Function to check if the user is admin
    const checkAdminStatus = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:4200/api/user/isAdmin", {
                headers: {
                    Authorization: `${token}`
                }
            });
            setIsAdmin(response.data.isAdmin);
        } catch (error) {
            console.error("Error while checking admin status:", error);
            setIsAdmin(false);
        }
    };

    const fetchSellers = async () => {
        try {
          const response = await axios.get("http://localhost:4200/api/admin/sellers", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
          setSellers(response.data);
        } catch (error) {
          console.error("Error fetching top sellers:", error);
        }
    };

    const fetchBidders = async () => {
      try {
        const response = await axios.get("http://localhost:4200/api/admin/bidders", {
          headers: {
              Authorization: localStorage.getItem("token")
          }
      });
        setBidders(response.data);
      } catch (error) {
        console.error("Error fetching top bidders:", error);
      }
    };

    const fetchTopArt = async () => {
      try {
        const response = await axios.get("http://localhost:4200/api/admin/exp_art", {
          headers: {
              Authorization: localStorage.getItem("token")
          }
      });
        setExpArt(response.data);
      } catch (error) {
        console.error("Error fetching top bidders:", error);
      }
    };


    checkAdminStatus(); // Call the function when the component mounts
    fetchSellers();
    fetchBidders();
    fetchTopArt();
}, []);

  return (
    <Fragment>
    <section className="manage-users">
      <h2>Top Sellers</h2>
      <table className='info-table'>
          <thead>
              <tr>
                  <th className='idth'>ID</th>
                  <th className='simpleth'>Name</th>
                  <th className='simpleth'>Email</th>
                  <th className='simpleth'>Posts</th>
              </tr>
          </thead>
          <tbody>
              {sellers.map(user => (
                  <tr key={user.ID}>
                      <td className='idtd'>{user.ID}</td>
                      <td className='simpletd'>{user.username}</td>
                      <td className='simpletd'>{user.email}</td>
                      <td className='simpletd'>{user.post_count}</td>
                  </tr>
              ))}
          </tbody>
      </table>
  </section>

  <section className="manage-users">
      <h2>Top Bidders</h2>
      <table className='info-table'>
          <thead>
              <tr>
                  <th className='idth'>ID</th>
                  <th className='simpleth'>Name</th>
                  <th className='simpleth'>Email</th>
                  <th className='simpleth'>Total Bids</th>
              </tr>
          </thead>
          <tbody>
              {bidders.map(user => (
                  <tr key={user.ID}>
                      <td className='idtd'>{user.ID}</td>
                      <td className='simpletd'>{user.username}</td>
                      <td className='simpletd'>{user.email}</td>
                      <td className='simpletd'>{user.bids}</td>
                  </tr>
              ))}
          </tbody>
      </table>
  </section>

  <section className="manage-users">
      <h2>Top Most Expensive Auctions</h2>
      <table className='info-table'>
          <thead>
              <tr>
                  <th className='idth'>ID</th>
                  <th className='simpleth'>Title</th>
                  <th className='simpleth'>Username</th>
                  <th className='simpleth'>Current Price</th>
              </tr>
          </thead>
          <tbody>
              {expArt.map(art => (
                  <tr key={art.ID}>
                      <td className='idtd'>{art.ID}</td>
                      <td className='simpletd'>{art.title}</td>
                      <td className='simpletd'>{art.username}</td>
                      <td className='simpletd'>{art.highest_bid}</td>
                  </tr>
              ))}
          </tbody>
      </table>
  </section>

  
    <div className='graphStyle'>
        <h2>Sales/Month</h2>
      <Bar data={salesData} options={options} />
    </div>
    <div className='graphStyle'>
        <h2>Transaction value/Month</h2>
      <Bar data={sumData} options={options} />
    </div>


    </Fragment>
    
  );
}

export default Statistics;
