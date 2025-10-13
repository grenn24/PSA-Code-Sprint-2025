import React from "react";
interface Activity {
    name: string;
    duration?: string;
    completed: boolean;
}
interface WBDashboardProps {
    mood: string;
    streak: number;
    activities: Activity[];
}
declare const WBDashboard: React.FC<WBDashboardProps>;
export default WBDashboard;
