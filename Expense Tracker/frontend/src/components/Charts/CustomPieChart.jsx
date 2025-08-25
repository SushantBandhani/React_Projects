import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";
const CustomPieChart = ({
  data,
  label,
  totalIncome,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data || []} // Prevents errors if data is undefined
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={CustomTooltip} />
        <Legend content={CustomLegend} />
        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy="-15"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#666"
              fontSize="14px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy="10"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#333"
              fontSize="24px"
              fontWeight="600"
            >
              {totalIncome}{" "}
              {/* Make sure this is used instead of totalAmount */}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
