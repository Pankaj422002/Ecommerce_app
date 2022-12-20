import { getSummary } from "../api";
import DashboardMenu from "../components/DashboardMenu";

let summary = {};

const DashboardScreen = {
    after_render: ()=>{
    },
    render: async()=>{
        summary = await getSummary();
        return `
        <div class="dashboard">
            ${DashboardMenu.render({selected:'dashboard'})}
            <div class="dashboard-content">
                <h1>Dashboard</h1>
                <ul class="summary-items">
                    <li>
                        <div class="summary-title color1">
                            <span><i class="fa fa-users">Users</i></span>
                        </div>
                        ${summary.userStats ? `<div class="summary-body">${summary.userStats.numUsers}</div>` : `<div class="summary-body">0</div>` } 
                    </li>
                    <li>
                        <div class="summary-title color2">
                            <span><i class="fa fa-users">Orders</i></span>
                        </div>
                        ${summary.orderStats ? `<div class="summary-body">${summary.orderStats.numOrders}</div>` : `<div class="summary-body">0</div>` } 
                    </li>
                    <li>
                        <div class="summary-title color3">
                            <span><i class="fa fa-users">Sales</i></span>
                        </div>
                        ${summary.orderStats ? `<div class="summary-body">${summary.orderStats.totalSales}</div>` : `<div class="summary-body">0</div>` } 
                  
                    </li>
                </ul>
                
            </div>
        </div>
        `;
    },
};

export default DashboardScreen;