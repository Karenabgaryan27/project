'use client'
import React, { PureComponent } from "react";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import useFormatter from "../../../hooks/useFormatter";


export default function LineChartComponent({ data = [], defaultData = [], isLoading = false, lines = [] }) {
    let isSmallScreen = false 
    
    if(typeof window !== "undefined") {
        isSmallScreen = window?.innerWidth < 768; 
        
    }
    let fontSize = isSmallScreen ? 8 : 12;
    let leftMargin = isSmallScreen ? -20 : -10;
    // static demoUrl = "https://codesandbox.io/s/simple-line-chart-kec3v";
    const { formatNumber, formatCurrency } = useFormatter();
    return (
        <div className="position">
            <div className="position-inner">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data.length && !isLoading ? data : defaultData}
                        margin={{
                            top: 30,
                            right: 0,
                            left: leftMargin,
                            bottom: 30,
                        }}
                    >
                        <CartesianGrid strokeDasharray="" vertical={false} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            dy={15}
                            tick={{ fontSize: fontSize }}
                            // interval="auto"
                        />
                        <YAxis
                            axisLine={false}
                            tick={{ fontSize: fontSize }}
                            tickLine={false}
                            dx={-5}
                            // ticks={[0, 500, 1000, 2500, 5000, 7500, 10000]}
                        />
                        <Tooltip
                            formatter={(value, name, props) => {
                                if (name === "impressions") return formatNumber(value);
                                if (name === "ad spend") return formatCurrency(value, 2);
                                if (name === "clicks") return formatNumber(value);
                                if (name === "CPC") return formatCurrency(value, 2);
                                if (name === "CPM") return formatCurrency(value, 2);

                                // if (name === "Conversions") return formatNumber(value);
                                // if (name === "Engaged Sessions") return formatNumber(value);
                                // if (name === "Engagement Rate") return formatNumber(value);
                                // if (name === "Event Count") return formatNumber(value);
                                // if (name === "New Users") return formatNumber(value);
                                // if (name === "Total Revenue") return formatNumber(value);

                                
                                if (name === "unknown") return "0";
                                return formatNumber(value);
                            }}
                        />

                        {!lines.length
                            ? ""
                            : lines.map((line, index) => {
                                  return (
                                      <Line
                                          key={index}
                                          dataKey={line.propertyName}
                                          name={line.displayName}
                                          stackId={data.length > 10 ? "a" : undefined}
                                          type="linear"
                                          strokeWidth="3"
                                          //   fill={line.color}
                                          stroke={line.color}
                                          dot={false}
                                      />
                                  );
                              })}
                        <Line
                            type="linear"
                            dataKey="empty"
                            name="unknown"
                            stackId="a"
                            strokeWidth="1"
                            stroke={"#808080"}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
