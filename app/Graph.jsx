'use client'

import React, { useState, useEffect } from "react";
import localData from "../localData.jsx";
import {
    Dropdown,
    Select,
    Button,
    Calendar,
    Loading,
    TableSkeleton,
    ChartSkeleton,
    BarChart, LineChartComponent 
} from "../index";
import { useGlobalContext } from "../context";

import { Tooltip } from "react-tooltip";
import useFormatter from "../hooks/useFormatter";

export default function Graph() {
    const {
        requestedData: {
            userProfileData,
            campaignData,
        },
        getDateName,
        activeCampaign,
        isDarkModeEnabled,
    } = useGlobalContext();

    const { formatCurrency, removeAlias, formatDateToMMDD , formatNumber} = useFormatter();

    const { user, textPreloader } = localData.images;
    const { eye, transactions, coins, lineChart, barChart } = localData.svgs;

    const [graphBtns, setGraphBtns] = useState({
        impressions: {
            isActive: true,
            propertyName: "impressions",
            displayName: "impressions",
            color: "purple",
        },
        amount_spent: {
            isActive: true,
            propertyName: "amount_spent",
            displayName: "ad spend",
            color: "rgba(35, 149, 110,1)",
        },

        clicks: {
            isActive: false,
            propertyName: "clicks",
            displayName: "clicks",
            color: "rgba(21, 161, 197,1)",
        },
        CPM: {
            isActive: false,
            propertyName: "CPM",
            displayName: "CPM",
            color: "rgba(6, 23, 38,1)",
        },
        CPC: {
            isActive: false,
            propertyName: "CPC",
            displayName: "CPC",
            color: "rgba(249, 57, 57,1)",
        },
    });


    const handleActiveChartBtn = ()=>{}

    const [isLineChartActive, setIsLineChartActive] = useState(true);

    return (
        <div className="campaigns-graph shadow">
            <div className="campaigns-graph-inner">
                <div className="graph">
                    <div className="graph-header">
                        <img src={userProfileData.profile_image} alt="" />
                        <p className="graph-text dark-mode-style">
                            <span>Welcome to Blockchain-Ads</span>
                            <strong className="dark-mode-style">
                                {false ? (
                                    <img src={textPreloader} className="text-preloader" />
                                ) : (
                                    userProfileData.userName
                                )}
                            </strong>
                        </p>
                    </div>

                    <div className="graph-body">
                        <h2
                            className="graph-title"
                            data-tooltip-id="tooltip-graph-title"
                            data-tooltip-content={
                               'content here'
                            }
                        > <span className="prefix">Campaign:</span>
                            {false
                                ? ""
                                :''}
                            <Tooltip id="tooltip-graph-title" className="custom-tooltip" />
                        </h2>
                        <div className="division">
                            <div className="division-icon btn-icon">{eye}</div>
                            <div className="wrapper">
                                <h6 className="division-title">Total Ad Spend</h6>
                                <div
                                    className={` division-amount ${
                                        isDarkModeEnabled ? "dark-mode-style" : ""
                                    }`}
                                >
                                    {false ? (
                                        <img src={textPreloader} className="text-preloader" />
                                    ) : (
                                        // formatCurrency(dashboardSummaryData?.totalAdSpend, 2)
                                        formatCurrency(activeCampaign?.amount_spent, 2)
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="division">
                            <div className="division-icon btn-icon">{transactions}</div>
                            <div className="wrapper">
                                <h6 className="division-title">Total Clicks</h6>
                                <div
                                    className={` division-amount ${
                                        isDarkModeEnabled ? "dark-mode-style" : ""
                                    }`}
                                >
                                    {false ? (
                                        <img src={textPreloader} className="text-preloader" />
                                    ) : (
                                        // formatNumber(dashboardSummaryData?.totalClicks?.toFixed(0) || "0")
                                        formatNumber(activeCampaign?.clicks?.toFixed(0) || "0")
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="division">
                            <div className="division-icon btn-icon">{coins}</div>
                            <div className="wrapper">
                                <h6 className="division-title">Total Impressions</h6>
                                <div
                                    className={`division-amount ${
                                        isDarkModeEnabled ? "dark-mode-style" : ""
                                    } `}
                                >
                                    {false ? (
                                        <img src={textPreloader} className="text-preloader" />
                                    ) : (
                                        formatNumber(
                                            // dashboardSummaryData?.totalImpressions?.toFixed(0) || "0"
                                            activeCampaign?.impressions.toFixed(0) || "0"
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="divider"></div>

                <div className={`chart-wrapper `}>
                    {false && (
                        <div className="loader">
                            <div className="message">Loading...</div>
                            <img src={textPreloader} />
                        </div>
                    )}
                    {/* <div className="row row-top">
                        <Dropdown
                            {...{
                                title: dateRange,
                                variant: "text",
                                color: "dark",
                                className: "calendar-dropdown",
                                isOpen: isCalendarOpen,
                                setIsOpen: setIsCalendarOpen,
                                size: "sm",
                            }}
                        >
                            <Calendar
                                setIsOpen={setIsCalendarOpen}
                                {...{
                                    dateRange,
                                    setDateRange,
                                    selectionRange,
                                    setSelectionRange,
                                    setDefaultSelectionRange,
                                    callback: callback,
                                }}
                            />
                        </Dropdown>
                    </div> */}
                    <div className="row row-bottom">
                        <div className="col col-left btn-group">
                            <Button
                                variant="circle"
                                icon={lineChart}
                                size="sm"
                                color={isLineChartActive ? "dark" : "light"}
                                onClick={() => setIsLineChartActive(true)}
                            />
                            <Button
                                variant="circle"
                                icon={barChart}
                                size="sm"
                                color={isLineChartActive ? "light" : "dark"}
                                onClick={() => setIsLineChartActive(false)}
                            />
                        </div>
                        <div className="col col-right btn-group">
                            {Object.values(graphBtns).map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`chart-btn ${item.isActive ? "active" : ""}`}
                                        data-name={item.propertyName}
                                        onClick={handleActiveChartBtn}
                                    >
                                        <div
                                            className="list-style"
                                            style={{ backgroundColor: item.color }}
                                        ></div>
                                        {item.displayName}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <LineChartComponent
                        // data={filteredGraphData}
                        defaultData={[
                            {
                                empty: 0,
                                name: "",
                            },
                            // {
                            //     empty: 0,
                            //     name: "Campaign progression is empty",
                            // },
                        ]}
                        lines={Object.values(graphBtns)}
                        isLoading={false}
                    />
                    {/* ) : (
                        <BarChart
                            data={filteredGraphData}
                            defaultData={[
                                {
                                    empty: 0,
                                    name: "Campaign progression is empty",
                                },
                            ]}
                            bars={Object.values(graphBtns)}
                            isLoading={false}
                        />
                    )} */}
                </div>
            </div>
        </div>
    );
}
