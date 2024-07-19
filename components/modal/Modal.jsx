'use client'

import React, { useState, useEffect } from "react";
import useLock from "../../hooks/useLock";
import { Button } from "../../index.jsx";
import localData from "../../localData";

export default function Modal({
    children = "",
    // title = "modal",
    id = "",
    className = "",
    buttonTitle = "open modal",
    buttonStartIcon = null,
    buttonClassName = "",
    buttonColor = "",
    Child = null,
    Toggler = null,
    modalCloseCallback = () => {},
    display = null,
    setDisplay = () => {},
    togglerInfo = "",
    togglerId = "",
    overlayClickDisabled = false,
    restProps = null,

}) {
    // const [display, setDisplay] = useState("none");
    const [isOpen, setIsOpen] = useState(false);

    const { lockScroll, unlockScroll } = useLock();
    const { close } = localData.svgs;

    useEffect(() => {
        if (display === "none") return unlockScroll();
        lockScroll();
        setIsOpen(true);
    }, [display]);

    return (
        <>
            {Toggler ? (
                <Toggler onClick={() => setDisplay("block")} />
            ) : (
                <Button
                    tooltipId={togglerId}
                    tooltipContent={togglerInfo}
                    startIcon={buttonStartIcon}
                    className={buttonClassName}
                    color={buttonColor}
                    variant="contained"
                    onClick={() => setDisplay("block")}
                >
                    {buttonTitle}
                </Button>
            )}

            {display === "block" && (
                <div
                    id={id}
                    className={`modal fade ${isOpen ? "show" : ""}`}
                    onClick={(e) => {
                        if (overlayClickDisabled) return;
                        if (e.target.closest(".modal-content")) return;
                        setIsOpen(false);
                        modalCloseCallback();
                    }}
                    onTransitionEnd={() => !isOpen && setDisplay("none")}
                >
                    <div className={`modal-dialog ${className}`}>
                        <div
                            className={`modal-content`}
                            // onClick={(e) => e.stopPropagation()}
                            onTransitionEnd={(e) => e.stopPropagation()}
                        >
                            {/* <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    {title}
                                </h5>
                                <Button
                                    className="btn-close"
                                    variant="circle"
                                    color="dark"
                                    size="sm"
                                    icon={close}
                                    onClick={() => {
                                        setIsOpen(false);
                                        modalCloseCallback();
                                    }}
                                />
                            </div> */}
                            {children}
                            {Child && <Child setIsOpen={setIsOpen} {...restProps} />}
                            {/* <div className="modal-body">
                                {children}
                                {Child && <Child parentCallback={() => console.log("parent callback")} />}
                            </div>
                            <div className="modal-footer">
                                <Button
                                    variant="contained"
                                    color="light"
                                    style={{ marginRight: "10px" }}
                                    onClick={() => setIsOpen(false)}
                                    name="cancel"
                                />
                                <Button variant="contained" name="update" onClick={submitButtonCallback} />
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
