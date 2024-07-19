'use client'

import React, { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../../context";
import { Modal } from "../../index";

import {
    Button,
    Drawer,
    Tabs,
} from "../../index";
import localData from "../../localData";
import { v4 as uuidv4 } from "uuid";


const Step1 = ()=> {
    return (
        <div>step 1</div>
    )
}
const Step2 = ()=> {
    return (
        <div>step 2</div>
    )
}

export default function CampaingsWizard() {
    const {
        showWizardDrawer,
        setShowWizardDrawer,
        campaignWizardStatus,
        setCampaignWizardStatus,
        requestedData,
        isLoading,
        formatDate,
        campaignState,
        setCampaignState,
        defaultCampaign,
        setSelectedImages,
        setCreatives,
        campaignsState,
    } = useGlobalContext();



    const { plus, arrowRightExtended, checkbox, alert } = localData.svgs;



    const tabs = [
        {
            title: "tab 1",
            startIcon: checkbox,
            content: <Step1 />,
            id: "campain-information-btn",
        },
        {
            title: "tab 2",
            startIcon: checkbox,
            content: <Step2 />,
            id: "targeting-btn",
        },

    ];

    const modalCloseCallback = () => {
        console.log("modal close callback");

    };

    return (
        <>
   
            <div className={`campaigns-wizard`}>
                <Drawer
                    display={showWizardDrawer}
                    setDisplay={setShowWizardDrawer}

                    toggler={
                        <Button
                            name="Create Campaign"
                            variant="contained"
                            startIcon={plus}
                            color="success"
                        />
                    }
                    className="drawer-right drawer-fullscreen"
                    callback={() => {
                    
                    }}
                >
       
                    <h2 className="campaigns-wizard-title display-2"> title</h2>
                    <Tabs
                        tabsProps={{
                         
                        }}
                        tabs={tabs}
                        title="Create Camaign"
                        indicatorIcon={arrowRightExtended}
                    />
                </Drawer>
            </div>
        </>
    );
}


