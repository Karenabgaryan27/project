'use client'
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link"; // Adjusted import for Link
// import { useRouter } from "next/router"; // Updated import
import { usePathname } from "next/navigation.js";
import localData from "../../localData.jsx";
import { useGlobalContext} from '../../context.jsx'

export default function Sidebar() {
    const {
        bar,
        campaigns,
        analytics,
        strategist,
        arrowRight,
        support,
        ecoProduct,
        cube,
        trendUp,
        arrowUpRightDots,
        arrowsLeftRight,
        info,
        moneyBillTransfer,
        angleRight,
        arrowDown,
    } = localData.svgs;
    const { logo, logoSm, databaseIcon } = localData.images;
    const pathname = usePathname();
    const {
        showSidebar,
        setShowSidebar,
        errorAlert,
        getLoadUserProfile,
        requestedData,
    } = useGlobalContext();



    return (
        <>
            <aside
                className={`sidebar ${showSidebar ? "show" : ""}`}
                id="sidebar"
            >

                <div className="sidebar-inner">
                    <div className="sidebar-header">
                        <img className="sidebar-logo" src={logo.src} />
                        <img className="sidebar-logo sidebar-logo-sm" src={logoSm.src} />
                    </div>
                    <div className="sidebar-body">
                        <div className={`list-wrapper ad-network-wrapper  `}>
                            <h4
                                className={`sidebar-text   `}
                            >
                                AD Network
                            </h4>
                            <ul className="sidebar-list">
                                <Link
                                    href="/"
                                    className={`sidebar-link ${
                                         pathname == "/"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        window.innerWidth < 992 && setShowSidebar(false);
                                    }}
                                >
                                    {campaigns}
                                    <span> Statistics </span>
                                    <div
                                     
                                        className="info-popup"
                                    >
                                        {info}
                                    </div>
                                  
                                </Link>
                                <Link
                                    href="/invocation-codes"
                                    className={`sidebar-link ${
                                         pathname == "/invocation-codes"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        window.innerWidth < 992 && setShowSidebar(false);
                                    }}
                                >
                                    {campaigns}
                                    <span> Invocation codes </span>
                                    <div
                                     
                                        className="info-popup"
                                    >
                                        {info}
                                    </div>
                                  
                                </Link>

                
                            </ul>
                        </div>

             
                    </div>

                    <div className="sidebar-footer">
                        <div className="copyright">©2024 Blockchain-Ads Labs, LLC.</div>
                    </div>
                </div>
            </aside>

            <div
                className={`sidebar-backdrop ${showSidebar ? "show" : ""}`}
                onClick={() => setShowSidebar(false)}
            ></div>
        </>
    );
}
