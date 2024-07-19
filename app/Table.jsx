"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    TableSkeleton,
    Select,
    Button,
    Dropdown,
    CampaignDetailsPopup,
    Popup,
    Pagination,
    CampaignsCalendar,
    Calendar,
    Modal,
} from "../index.jsx";
import { v4 as uuidv4 } from "uuid";
import { useGlobalContext } from "../context";
import useFormatter from "../hooks/useFormatter.jsx";

const endDate = new Date(); // today
const startDate = new Date(endDate);
startDate.setDate(endDate.getDate() - 6); // 7 days ago

const SELECTIONRANGE = {
    startDate,
    endDate,
    key: "selection",
};

export default function CampaignsTable() {
    const { requestedData, getLoadCampaignData, isLoading, campaignsState } = useGlobalContext();


    const handleCalendar = ()=>{

    }
    const [campaignSelectionRange, setCampaignSelectionRange] = useState(SELECTIONRANGE);
    return (
        <div className="campaigns-table-wrapper" >
            <div className="row">
                <h2 className="display-2">campaigns</h2>

                <Calendar
                    className="reports-calendar"
                    _selectionRange={campaignSelectionRange}
                    callback={handleCalendar}
                />
            </div>
            <br />
            <div className={`scroll shadow }`} style={{ padding: 0 }}>
                {false ? (
                    <TableSkeleton message="Loading..." icon={textPreloader} />
                ) : (
                    <table id="campaigns-table" className="table campaigns-table">
                        <thead>
                            <tr className="table-row">
                                <th className="table-th-details text-center">
                                  
                                    <div
                                  
                                    >
                                       fsaf
                                    </div>
                                </th>

                                <th className="table-th-name text-start">
                                    <span
                                     
                                    >
                                        Name
                                    </span>
                                </th>
                                <th
                                    className="table-th-settings text-center"
                                >
                                    <div
                                        className="settings-icon"
                                   
                                    >
                                        fdsf
                                    </div>
                                </th>

                                <th className="table-th-status text-center" >
                                    <span
                                    >
                                        Status
                                    </span>
                                </th>
                                <th className="table-th-impressions text-center">
                                    <span
                                        data-tooltip-id="tooltip-table-impressions"
                                        data-tooltip-content={`How many times your ads have been seen.`}
                                    >
                                        Impressions
                                    </span>
                                </th>
                                <th className="table-th-clicks text-center">
                                    <span
                                        data-tooltip-id="tooltip-table-clicks"
                                        data-tooltip-content={`How many times your ads have been clicked.`}
                                    >
                                        Clicks
                                    </span>
                                </th>
                                <th className="table-th-ctr text-center">
                                    <span
                                        data-tooltip-id="tooltip-table-ctr"
                                        data-tooltip-content={` How often your ads are clicked when viewed by Blockchain-Ads users.`}
                                    >
                                        CTR
                                    </span>
                                </th>
                                <th className="table-th-ad-spend text-center">
                                    <span
                                        data-tooltip-id="tooltip-table-ad-spend"
                                        data-tooltip-content={` How much budget has been spent.`}
                                    >
                                        Ad Spend
                                    </span>
                                </th>
                                <th className="table-th-cpc text-center">
                                    <span
                                        data-tooltip-id="tooltip-table-cpc"
                                        data-tooltip-content={`How much you pay for each click.`}
                                    >
                                        CPC
                                    </span>
                                </th>
                              
                            </tr>
                        </thead>

                        <tbody>
                            {!['s','s','s'].length ? (
                                <tr >
                                    <td colSpan="10">
                                        <div className="no-data">No Data To Show!</div>
                                    </td>
                                </tr>
                            ) : (
                                ['s','s','s'].map((item, index) => (
                                    <CampaignRow key={index} item={item} index={index} />
                                ))
                            )}
                        </tbody>
                    </table>
                )}
          
            </div>
    
        </div>
    );
}



const CampaignRow = ({ item, index }) => {
    const { formatNumber, formatCurrency } = useFormatter();
    const {
 
    } = useGlobalContext();

    return (
        <>
            <tr className={`table-row   }`}>
                <td className="table-td-impressions text-center">text</td>
                <td className="table-td-impressions text-center">text</td>
                <td className="table-td-impressions text-center">text</td>
                <td className="table-td-impressions text-center">text</td>
                <td className="table-td-impressions text-center">text</td>
                <td className="table-td-impressions text-center">text</td>
                <td className="table-td-impressions text-center">text</td>
                <td className="table-td-impressions text-center">text</td>
                <td className="table-td-impressions text-center">text</td>
            </tr>
          
        </>
    );
};
