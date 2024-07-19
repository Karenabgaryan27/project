'use client'

import React, { useEffect, useState } from "react";
import { Dropdown, Select, Autocomplete, Button, Field, NestedModal, Checkbox } from "../../index.jsx";
import { useGlobalContext } from "../../context";
import localData from "../../localData.jsx";
import useFetch from "../../hooks/useFetch";
import ReactDOMServer from "react-dom/server";
import { Tooltip } from 'react-tooltip';
import useFormatter from "../../hooks/useFormatter.jsx";

export default function ConnectWallet({ setIsOpen }) {
    const { errorAlert, requestedData, isDarkModeEnabled } = useGlobalContext();
    const {formatNumber} = useFormatter()

    const { preloaderBig, pay, plants } = localData.images;
    const { close, wallet, budget } = localData.svgs;
    const [isLoading, setIsLoading] = useState();
    const { getAllCurrencies, getPaymentWithInvoice, paymentWithInvoice } = useFetch();


    const [state, setState] = useState({
        priceAmount: 10000,
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target || e;
        setState({ ...state, [name]: value });
    };

    const [url, setURL] = useState("fdf");
    const [display, setDisplay] = useState("none");

    const NestedModalChildren = () => {
        const [isChecked, setIsChecked] = useState(false);
        const { isDarkModeEnabled } = useGlobalContext();

        const handleCheckbox = (target) => {
            setIsChecked(target);
        };

        return (
            <div className="redirect-modal">
                <div className="nested-modal-header">
                    <h5 className="nested-modal-title" id="exampleModalLabel">
                        Payment Invoice
                    </h5>
                </div>
                <div className="nested-modal-body">
                    <p className="text info-text">You are about to be redirected</p>

                    <p className="text">
                        Important points to note before depositing funds for your campaign:
                    </p>
                    <br />

                    <ul>
                        <li>
                            <span className="list-style list-style-primary"></span>
                            <p>Blockchain-Ads and/or the publishers may reject any ads at any moment.</p>
                        </li>
                        <li>
                            <span className="list-style list-style-primary"></span>
                            <p>
                                Any refunds are at the entire discretion of Blockchain-Ads with a minimum 20%
                                fee to be retained.
                            </p>
                        </li>
                    </ul>

                    <Checkbox
                        callback={handleCheckbox}
                        checked={isChecked}
                        color="primary"
                        label="I understand and I want to proceed"
                        size="sm"
                    />
                </div>
                <div className="nested-modal-footer">
                    <Button variant="contained" color="primary" size="sm" disabled={!isChecked}>
                        <a href={url} target="_blank">
                            Submit
                        </a>
                    </Button>
                </div>
            </div>
        );
    };

    const handleSubmit = async () => {

        // setIsLoading(true);
        // try {
        //     const data = await paymentWithInvoice(() => {});
        //     console.log(data, " =paymentWithInvoice= request");
         
        // } catch (err) {
        //     errorAlert(err?.response?.data?.res_msg || "Internal Server Error");
        //     console.log(err, "=paymentWithInvoice= request error");
        // }
        // setIsLoading(false);
        alert('connect wallet triggered')
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const [isBalanceOpen, setIsBalanceOpen] = useState(false);

    return (
        <div className="deposit-component">
            <div className="modal-header">
                <h2 className="modal-title">Pay in 150+ Currencies</h2>

                <Button
                    className="btn-close"
                    variant="circle"
                    color="dark"
                    size="sm"
                    icon={close}
                    onClick={closeModal}
                />
            </div>

            <div className="modal-body">
                {/* <Dropdown
                    {...{
                        title: "Balance",
                        variant: "contained",
                        color: "light",
                        className: "balance-dropdown",
                        startIcon: wallet,
                        isOpen: isBalanceOpen,
                        setIsOpen: setIsBalanceOpen,
                    }}
                >
                    <div className="balance-amount">
                        {formatNumber(requestedData.userProfileData.currentOrganization.balance?.toFixed(0)) || "0"}$
                    </div>
                    <p className="balance-text">Available Balance</p>
                </Dropdown> */}

                <p className="balance-info">We accept any crypto currency.</p>
                <img className="modal-cover" src={plants} alt="" />

                <Field
                    type="number"
                    label="Amount"
                    color="secondary"
                    placeholder=""
                    value={state.priceAmount}
                    required={true}
                    name="priceAmount"
                    size="sm"
                    callback={handleOnChange}
                    startIcon={budget}
                />
                <div
                    data-tooltip-id="deposit-btn"
                    data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                        "content here"
                    )}
                >
                    <Button
                        variant="contained"
                        name="Connect wallet"
                        color={`${isDarkModeEnabled ? "light" : "dark"}`}
                        onClick={handleSubmit}
                        icon={
                            isLoading ? (
                                <span className="endIcon">
                                    <img src={preloaderBig} />
                                </span>
                            ) : null
                        }
                        disabled={isLoading || state.priceAmount < 10000}
                        className="balance-btn"
                        // tooltipContent={state.priceAmount < 10000 ? "Please deposit a minimum amount of 10000.": ''}
                    />
                    {state.priceAmount < 10000 && <Tooltip id="deposit-btn" className="custom-tooltip"  />}
                </div>
                {/* <Autocomplete
                    {...{
                        items: items,
                        setItems: setItems,
                        placeholder: "loading...",
                        variant: "outlined",
                        color: "secondary",
                        label: "Currency:",
                        className: "modal-autocomplete",
                    }}
                /> */}
            </div>
            <NestedModal
                togglerClassName="nested-modal-toggler"
                className="modal-dialog-centered redirect-modal"
                display={display}
                setDisplay={setDisplay}
            >
                <NestedModalChildren />
            </NestedModal>
            <div className="modal-footer"></div>
        </div>
    );
}
