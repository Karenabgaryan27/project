"use client";
import React, { useState, createContext, useContext, useEffect, useRef } from "react";
import localData from "./localData";

export const Context = createContext();

const { avatar, user, coinTelegraph, bitcoin, beInCrypto } = localData.images;

export default function Provider({ children }) {
    // REQUESTED STATES
    const DEFAULTREQUESTEDDATA = {
        userProfileData: {
            isLoading: false,
            profile_image: user.src,
            userName: "Username",
            allOrganization: [],
            currentOrganization: {
                balance: 0,
            },
        },
        blockchainData: [],

        campaignData: {
            currentOrganizationCampaigns: [],
            dashboardSummaryData: {
                totalAdAmountSpent: 0,
                totalClicks: 0,
                totalImpressions: 0,
            },
            dataSize: 0,
        },
        campaignStatistics: {
            tab: "",
            items: [],
        },
        campaignDataSummary: {},

        analyticsProfileData: {
            isFetched: false,
            accountSummaries: [],
        },
        analyticsProjectData: {
            mapData: {
                rows: [],
            },
            tableData: {
                rows: [],
            },
            transformedData: [],
        },
        allCurrenciesData: [],
        isAnalyticsConnected: false,
    };

    const [requestedData, setRequestedData] = useState(DEFAULTREQUESTEDDATA);

    const [showSidebar, setShowSidebar] = useState(false);
    const [showProfileDrawer, setShowProfileDrawer] = useState("none");
    const [showDepositModal, setShowDepositModal] = useState("none");
    const [showWizardDrawer, setShowWizardDrawer] = useState("none");


    return (
        <Context.Provider
            value={{
                requestedData,
                setRequestedData,
                showSidebar,
                setShowSidebar,
                showProfileDrawer,
                setShowProfileDrawer,
                showDepositModal,
                setShowDepositModal,
                showWizardDrawer, setShowWizardDrawer
            }}
        >
            {children}
        </Context.Provider>
    );
}

export const useGlobalContext = () => useContext(Context);
