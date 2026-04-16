import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts";

interface ChartModuleProps {
  type: "bar" | "pie" | "line" | "area";
  data: any[];
  bars?: { dataKey: string; color: string; name: string }[];
  pieKey?: string;
  pieNameKey?: string;
  pieColors?: string[];
  lineOrAreaKeys?: { dataKey: string; color: string; name: string }[];
  xAxisKey?: string;
  height?: number;
  formatY?: (value: number) => string;
}

export function ChartModule({ 
  type, 
  data, 
  bars, 
  pieKey = "value", 
  pieNameKey = "name", 
  pieColors = ["#2563EB", "#16A34A", "#DC2626", "#F59E0B"], 
  lineOrAreaKeys,
  xAxisKey = "name", 
  height = 300,
  formatY = (val) => `$${val.toLocaleString()}`
}: ChartModuleProps) {
  
  if (!data || data.length === 0) {
    return <div className="w-full h-[300px] flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200 text-gray-400 text-sm">No data to chart</div>;
  }

  const renderTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length) {
      return (
        <div className="bg-white p-3 border border-border rounded-lg shadow-lg">
          <p className="font-semibold text-sm mb-2">{props.label}</p>
          {props.payload.map((p: any, i: number) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="text-muted-foreground">{p.name}:</span>
              <span className="font-medium">{formatY ? formatY(p.value) : p.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        {type === "bar" ? (
          <BarChart data={data} margin={{ top: 10, right: 10, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatY} tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <Tooltip content={renderTooltip} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            {bars?.map((b, i) => (
              <Bar key={i} dataKey={b.dataKey} name={b.name} stackId="a" fill={b.color} radius={i === bars.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
            ))}
          </BarChart>
        ) : type === "pie" ? (
          <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <Tooltip formatter={(value: number) => formatY ? formatY(value) : value} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey={pieKey}
              nameKey={pieNameKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
          </PieChart>
        ) : type === "line" ? (
          <LineChart data={data} margin={{ top: 10, right: 10, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatY} tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <Tooltip content={renderTooltip} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            {lineOrAreaKeys?.map((k, i) => (
              <Line type="monotone" key={i} dataKey={k.dataKey} name={k.name} stroke={k.color} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
            ))}
          </LineChart>
        ) : (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatY} tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
            <Tooltip content={renderTooltip} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            {lineOrAreaKeys?.map((k, i) => (
              <Area type="monotone" key={i} dataKey={k.dataKey} name={k.name} fill={k.color} fillOpacity={0.2} stroke={k.color} strokeWidth={2} />
            ))}
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
