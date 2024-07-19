'use client'
import React, { useState, useEffect } from "react";
import { Button } from "../../index";
import localData from "../../localData";
import useLock from "../../hooks/useLock";
import { useGlobalContext } from "../../context";
import { v4 as uuidv4 } from "uuid";
import { Tooltip } from "react-tooltip";
import ReactDOMServer from "react-dom/server";

export default function Drawer({
    className = "drawer-left",
    content = "",
    toggler = null,
    children = null,
    Component = null,
    ref = null,
    display = null,
    setDisplay = () => {},
    callback = () => {},
    disabled = false,
    tooltipContent = "",
}) {
    const [isOpen, setIsOpen] = useState(false);
    // const [display, setDisplay] = useState("none");
    const { close } = localData.svgs;

    useEffect(() => {
        if (display === "block") setIsOpen(true);
    }, [display]);

    const { lockScroll, unlockScroll } = useLock();

    useEffect(() => {
        isOpen ? lockScroll() : unlockScroll();
    }, [isOpen]);

    const callbackFromParent = () => {
        setIsOpen(false);
    };

    const [tooltipId, setTooltipId] = useState("");

    useEffect(() => {
        setTooltipId(`tooltip-btn-${uuidv4()}`);
    }, []);

    return (
        <>
            <div
                // style={{ pointerEvents: disabled ? "none" : "auto" }}
                // style={{ opacity: disabled ? "0.5" : "1" }}
                className={`drawer-toggler ${isOpen ? "active" : ""} ${disabled ? 'disabled' : ''}`}
                onClick={() => {
                    if (disabled) return;
                    setDisplay("block");
                }}
                ref={ref}
                data-tooltip-id={tooltipId}
                data-tooltip-html={ReactDOMServer.renderToStaticMarkup(tooltipContent)}
                data-tooltip-place="top-end"
            >
                {toggler || <Button name="Open Drawer" variant="contained" color="secondary" />}
            </div>
            {tooltipId && <Tooltip id={tooltipId} className="custom-tooltip" />}
            {display === "block" && (
                <>
                    <div
                        className={`drawer ${className} ${isOpen ? "show" : ""}`}
                        onTransitionEnd={() => {
                          if(isOpen)return 
                           setDisplay("none");
                           callback();
                        }}
                    >
                        <div onTransitionEnd={(e) => e.stopPropagation()}>
                            <Button
                                variant="circle"
                                color="dark"
                                icon={close}
                                className="drawer-close campaigns-drawer-close"
                                onClick={() => setIsOpen(false)}
                            />
                            {content ||
                                children ||
                                (Component && <Component callbackFromParent={callbackFromParent} />) ||
                                "drawer content"}
                        </div>
                    </div>
                    <div
                        className={`drawer-backdrop ${isOpen ? "show" : ""}`}
                        onClick={() => setIsOpen(false)}
                    ></div>
                </>
            )}
        </>
    );
}
