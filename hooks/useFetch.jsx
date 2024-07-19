'use client'

import React, { useState } from "react";
import axios from "axios";

const urls = {
    chatGPT: process.env.CHAT_GPT_URL || "https://api.openai.com",
    blockchain: process.env.BASE_URL || "https://us-central1-web3-marketing-hub.cloudfunctions.net/api", //production
    // blockchain:  "https://us-central1-web3-marketing-hub.cloudfunctions.net/dev_api", //Ahmad's test api
    // blockchain: "https://us-central1-bca-hosting.cloudfunctions.net/api",  //Boban's test api
};

export default function useFetch() {
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(false);

    const request = async ({ url, method = "GET", data = {}, headers = {}, cb = () => {} }) => {
        setLoading(true);
        try {
            const response = await axios({
                url,
                method,
                headers,
                data,
                // withCredentials: true,
            });

            setLoading(false);
            if (response.status !== 200) throw new Error("some error appears!");
            cb(null, response.data);
            return response.data;
        } catch (err) {
            // if (!err.response) return console.log(err);
            // if (!err.response) return (window.location.pathname = "/connection-error");

            setLoading(false);
            setError(true);

            cb(err, null);
            throw err;
        }
    };

    const getAccessToken = async () => {
        const token = 'fdsfd'
        return token;
    };

    const getHeaders = async (withToken, organizationID) => {
        const headers = {};
        headers["Content-type"] = "application/json";

        if (withToken) {
            const accessToken = await getAccessToken();
            headers.Authorization = `Bearer ${accessToken}`;
        }
        if (organizationID) {
            headers.organizationID = `${organizationID}`;
        }
        return headers;
    };

    // ---------------------

    // const getBlockchainDataTest = async (cb, id) => {
    //   const url = urls.blockchain + "/getAllCurrencies";
    //   const headers = await getHeaders(true);
    //   return await request({ url, method: "GET", headers, cb });
    // };

    const getImage = async (textFileUrl, cb) => {
        // const accessToken = await getAccessToken();
        // var requestOptions = {
        //   method: "GET",
        //   headers: {
        //     'Content-Type': 'image/*',
        //   },
        //   Authorization : `Bearer ${accessToken}`,
        //     crossdomain: true,
        // };
        // const url = `${urls.blockchain}/${textFileUrl}` ;
        // return await request({ url, cb, ...requestOptions });
    };

    const register = async (cb, raw) => {
        var requestOptions = {
            method: "POST",
            headers: await getHeaders(false),
            data: JSON.stringify(raw),
        };
        const url = urls.blockchain + "/newSignUp";
        return await request({ url, cb, ...requestOptions });
    };
    const resetAccountPassword = async (cb, raw) => {
        var requestOptions = {
            method: "POST",
            headers: await getHeaders(false),
            data: JSON.stringify(raw),
        };
        const url = urls.blockchain + "/resetAccountPassword";
        return await request({ url, cb, ...requestOptions });
    };

    const completeSignUp = async (cb, raw) => {
        var requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/completeSignUp`;
        return await request({ url, cb, ...requestOptions });
    };

    const loadUserProfile = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
            redirect: "follow",
        };
        const url = `${urls.blockchain}/loadUserProfile`;
        return await request({ url, cb, ...requestOptions });
    };

    const loadBlockchainData = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
            redirect: "follow",
        };
        const url = `${urls.blockchain}/loadBlockchainData`;
        return await request({ url, cb, ...requestOptions });
    };
    const updateTransaction = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/updateTransaction`;
        return await request({ url, cb, ...requestOptions });
    };
    const sumTransactionQuantities = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/sumTransactionQuantities`;
        return await request({ url, cb, ...requestOptions });
    };
    const loadCampaignData = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
            redirect: "follow",
        };
        const url = `${urls.blockchain}/loadCampaignData`;
        return await request({ url, cb, ...requestOptions });
    };
    const loadCampaignStatistics = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        // const url = `${urls.blockchain}/campaignStatistics`;
        const url = `${urls.blockchain}/propellerStatisticsByGroup`;
        return await request({ url, cb, ...requestOptions });
    };

    const startOrStopCampaignZone = async (cb, raw) => {
        let requestOptions = {
            method: "PATCH",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        // const url = `${urls.blockchain}/campaignStatistics`;
        const url = `${urls.blockchain}/startOrStopCampaignZone`;
        return await request({ url, cb, ...requestOptions });
    };

    const connectAnalyticsAccount = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/connectAnalyticsAccount`;
        return await request({ url, cb, ...requestOptions });
    };

    const loadAnalyticsProfile = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/loadAnalyticsProfile`;
        return await request({ url, cb, ...requestOptions });
    };

    const loadAnalyticsProject = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/loadAnalyticsProject`;
        return await request({ url, cb, ...requestOptions });
    };

    const disconnectAnalyticsAccount = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/disconnectAnalyticsAccount`;
        return await request({ url, cb, ...requestOptions });
    };

    const switchOrganization = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };

        const url = `${urls.blockchain}/switchOrganization`;
        return await request({ url, cb, ...requestOptions });
    };

    const createNewOrganization = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };

        const url = `${urls.blockchain}/createNewOrganization`;
        return await request({ url, cb, ...requestOptions });
    };

    const updateUserInfo = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };

        const url = `${urls.blockchain}/updateUserInfo`;
        return await request({ url, cb, ...requestOptions });
    };
    const resetEmail = async (cb, raw) => {
        // let requestOptions = {
        //   method: "POST",
        //   headers: await getHeaders(true),
        //   data: JSON.stringify(raw),
        // };
        // const url = `${urls.blockchain}/resetEmail`;
        // return await request({ url, cb, ...requestOptions });
    };
    const resetPassword = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };

        const url = `${urls.blockchain}/resetPassword`;
        return await request({ url, cb, ...requestOptions });
    };

    const inviteUser = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/inviteUser`;
        return await request({ url, cb, ...requestOptions });
    };
    const acceptInvite = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/acceptInvite`;
        return await request({ url, cb, ...requestOptions });
    };
    const rejectInvite = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/rejectInvite`;
        return await request({ url, cb, ...requestOptions });
    };

    const getAllCurrencies = async (cb) => {
        let requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: await getHeaders(true),
        };

        const url = `${urls.blockchain}/getAllCurrencies`;
        return await request({ url, cb, ...requestOptions });
    };

    // -------------------------  CAMPAIGN ENDPOINTS --------------------------- //

    const createNewCampaign = async (cb, raw,organizationID) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true, organizationID),
            data: JSON.stringify(raw),
        };

        const url = `${urls.blockchain}/createNewCampaign`;
        return await request({ url, cb, ...requestOptions });
    };
    const deleteCampaign = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };

        const url = `${urls.blockchain}/deleteCampaign`;
        return await request({ url, cb, ...requestOptions });
    };

    const editCampaign = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };

        const url = `${urls.blockchain}/updateCampaignInfo`;
        return await request({ url, cb, ...requestOptions });
    };

    const playOrPauseCampaign = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };

        const url = `${urls.blockchain}/playOrPauseCampaign`;
        return await request({ url, cb, ...requestOptions });
    };

    const viewCampaignInfo = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };

        const url = `${urls.blockchain}/viewCampaignInfo`;
        return await request({ url, cb, ...requestOptions });
    };

    const updateCampaignInfo = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/updateCampaignInfo`;
        return await request({ url, cb, ...requestOptions });
    };

    const viewCampaignStats = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(false),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/viewCampaignStats`;
        return await request({ url, cb, ...requestOptions });
    };

    const updateURL = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/updateURL`;
        return await request({ url, cb, ...requestOptions });
    };

    const paymentOnSite = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/paymentOnSite`;
        return await request({ url, cb, ...requestOptions });
    };

    const paymentWithInvoice = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/paymentWithInvoice`;
        return await request({ url, cb, ...requestOptions });
    };

    const APIavailableWithAuth = async (cb, raw) => {
        let requestOptions = {
            method: "GET",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
            /*   redirect: "follow", */
        };
        const url = `${urls.blockchain}/APIavailableWithAuth`;
        return await request({ url, cb, ...requestOptions });
    };

    const CreatePixelTag  = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/CreatePixelTag`;
        return await request({ url, cb, ...requestOptions });
    };

    const CreateConversionPixel  = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/CreateConversionPixel`;
        return await request({ url, cb, ...requestOptions });
    };
    const getAdvertiserPixelStats   = async (cb, raw) => {
        let requestOptions = {
            method: "POST",
            headers: await getHeaders(true),
            data: JSON.stringify(raw),
        };
        const url = `${urls.blockchain}/getAdvertiserPixelStats `;
        return await request({ url, cb, ...requestOptions });
    };

    const clearError = () => setError(null);

    // const getTrainingContent = async(cb)=>{
    //     const url = "https://api.openai.com/v1/datasets/" + process.env.REACT_APP_OPENAI_API_DATASET_ID
    //     const headers = {
    //         // Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
    //         Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
    //         "Content-Type": "application/json",
    //     };

    //     return await request({ url, method: "GET", data:{}, headers, cb });
    // }

    const instructions =  
    `You are a web3 marketing strategist and an assistant. 

    For every prompt, act professional and cater your tone of voice, and position as a proper Marketing Expert for web3 industry. All questions and answers will be related toward this specific niche. 
    
    Answer every question concise and short. After every answer ask: "what would you like me to expand on or explain in details?" 
    
    Don't offer generic answers if prompted with something specific. 
    take note and say: I do not have data for that at the moment. Will notify my human handler on this matter and will return with an answer. In the meantime if you want to get in touch with the BCA team directly please use this telegram link @markorende. 
    
    All the info is from the data insights you have that the team from Blockchain-Ads have give you access to. 
    
    Use the framework in The Playbook and the strategy sheet when answering questions for marketing strategy for web3/crypto projects. 
    
    Be short and precise with the answers. And at the end of the answer ask: "what would you like me to expand on"?
    
    Top Analytics solution for web3 or top crypto analytics tools, refers to web3 attribution tooling. 
    
    Here you can mention several solutions, one of which is Cookie3.io , then we have several Marketing Hubs that provide user analytics for web3 such as Blockchain-ads.com 
    
    The top Ad networks you can pull from the documentations. Always keep as short list of 3 to 5 max on every list you do, unless asked specifically otherwise. 
    
    Paid Media solution for web3 Is Blockchain-Ads network. It has outperformed drastically any other acquisition model.
    Check the documentation for details on how it work or refer to the https://blockchain-ads.com/technology 
    
    For Quests, which is consider the newest marketing channel for user acquisition, and even tho the users have low LTV, the have proven as one of the best to start building early community. 
    
    Zealy
    Galxe
    Layer3
    Questn
    TaskOn
    Are some of the most known. 
    
    When prompted to provide a list influencers that can be used as part of a marketing strategy or promote a projects use the data from "Crypto Influencers (KOLs) list" 
    
     For questions regarding Blockhchain-Ads network itself you can refer to the website and share the links with the user, based on what the prompt or question is. Check bellow:
    
    1. Media Kit - https://docsend.com/view/ikdxbxy5whqi5ykd
    2. How it works - https://www.blockchain-ads.com/technology
    3. Case studies - https://www.blockchain-ads.com/case-studies
    
    4. One-Pager: https://docsend.com/view/bwaynuj8msevrt4x
    5. Placements List: https://docs.google.com/spreadsheets/d/12eWQ93Xb-bHAYFiA8QQvYJmuHMEUwFFtjCFR8SmxSPQ/edit?usp=sharing
    
    Per vertical: 
    6. Blockchain Gaming https://www.blockchain-ads.com/blockchain-gaming
    7. DeFi - https://www.blockchain-ads.com/decentralized-finance
    8. CeFi - https://www.blockchain-ads.com/cefi
    9. NFT - https://www.blockchain-ads.com/nft
    10. Infrastructure - https://www.blockchain-ads.com/web3-infrastructure
    11. Crypto Betting - https://www.blockchain-ads.com/cypto-gambling-betting
    12. Igaming (traditional betting/gambling) - https://www.blockchain-ads.com/igaming
    13. TradeFi (traditional financial industry) - https://www.blockchain-ads.com/tradefi
    
    Additional case studies: https://www.blockchain-ads.com/case-studies
    
    If anyone ask how to arrange a meeting or get in touch of these solutions and marketing you can suggest several marketing agencies to help from a search on the net, but recommend official Marketing partners on BCA that have been verified, such as LeanMarketing-Crypto.com. 
    
    Every response you give, have to be in a structure formate and follow the best practices paragraph style. `

    const getChatGPTMessage = async (cb, apiMessages) => {
        const url = urls.chatGPT + "/v1/chat/completions";
        const headers = {
            Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
            "Content-Type": "application/json",
        };

        const systemMessage = {
            role: "system",
            content: instructions,
        };
        const apiRequestBody = {
            model: "gpt-3.5-turbo",
        
            messages: [
                systemMessage, // The system message DEFINES the logic of our chatGPT
                ...apiMessages, // The messages from our chat with ChatGPT
            ],
        };
        return await request({ url, method: "POST", data: apiRequestBody, headers, cb });
    };

    return {
        register,
        completeSignUp,
        resetAccountPassword,
        // getBlockchainDataTest,
        loading,
        clearError,
        error,
        request,
        loadUserProfile,
        switchOrganization,
        createNewOrganization,
        updateUserInfo,
        inviteUser,
        acceptInvite,
        rejectInvite,
        getAllCurrencies,
        createNewCampaign,
        deleteCampaign,
        editCampaign,
        playOrPauseCampaign,
        viewCampaignInfo,
        updateCampaignInfo,
        paymentWithInvoice,
        paymentOnSite,
        updateURL,
        APIavailableWithAuth,
        loadBlockchainData,
        updateTransaction,
        sumTransactionQuantities,
        loadCampaignData,
        loadCampaignStatistics,
        startOrStopCampaignZone,
        connectAnalyticsAccount,
        loadAnalyticsProfile,
        loadAnalyticsProject,
        disconnectAnalyticsAccount,
        resetEmail,
        resetPassword,
        getChatGPTMessage,
        getImage,
        CreatePixelTag,
        CreateConversionPixel,
        getAdvertiserPixelStats 
    };
}
