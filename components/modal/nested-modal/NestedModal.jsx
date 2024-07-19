'use client'

import React, { useState, useEffect } from "react";
import { Button } from "../../../index.jsx";
import localData from "../../../localData.jsx";

export default function NestedModal({
    children = null,
    title = "nested modal",
    className = "",
    buttonTitle = "open nested modal",
    parentCallback,
    togglerClassName = "",
    display = "none",
    setDisplay = () => {},
}) {
    // const [display, setDisplay] = useState("none");
    const [isOpen, setIsOpen] = useState(false);

    const { close } = localData.svgs;

    useEffect(() => {
        if (display === "none") return;
        setIsOpen(true);
        if (parentCallback) parentCallback();
    }, [display]);

    return (
        <>
            <Button
                className={togglerClassName}
                variant="contained"
                name={buttonTitle}
                onClick={() => setDisplay("block")}
            />
            {display === "block" && (
                <div
                    className={`nested-modal fade ${isOpen ? "show" : ""}`}
                    onClick={() => setIsOpen(false)}
                    onTransitionEnd={() => !isOpen && setDisplay("none")}
                >
                    <div className={`nested-modal-dialog ${className}`}>
                        <div
                            className={`nested-modal-content`}
                            onClick={(e) => e.stopPropagation()}
                            onTransitionEnd={(e) => e.stopPropagation()}
                        >
                            <Button
                                className="btn-close"
                                variant="circle"
                                size="sm"
                                icon={close}
                                color="dark"
                                onClick={() => setIsOpen(false)}
                            />
                            {children || (
                                <>
                                    <div className="nested-modal-header">
                                        <h5 className="nested-modal-title" id="exampleModalLabel">
                                            {title}
                                        </h5>
                                        <Button
                                            variant="circle"
                                            color="dark"
                                            icon={close}
                                            className="btn-close"
                                            onClick={() => setIsOpen(false)}
                                        />
                                    </div>
                                    <div className="nested-modal-body">...</div>
                                    <div className="nested-modal-footer">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            style={{ marginRight: "10px" }}
                                            onClick={() => setIsOpen(false)}
                                            name="cancel"
                                        />
                                        <Button variant="contained" name="submit" />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
