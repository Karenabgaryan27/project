'use client'
import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link'
import localData from "../../localData";
import { Button } from "../../index";

export default function Dropdown({
    items = [],
    setItems = () => console.log('Error: "setItems function required"'),
    title = "dropdown",
    className = "",
    variant,
    color,
    startIcon,
    endIcon,
    toggleIcon,
    children,
    size = "md",
    listStyle = "",
    listStyleColor = "",
    isOpen = false,
    setIsOpen = () => {},
    disabled = false,
}) {
    // const [isOpen, setIsOpen] = useState(false);
    const [activeOption, setActiveOption] = useState(-1);

    const clickWrapper = useRef(null);
    const dropdownRef = useRef(null);
    const activeOptionRef = useRef(null);

    const { arrowDown } = localData.svgs;

    useEffect(() => {
        let handler = (e) => !clickWrapper.current.contains(e.target) && setIsOpen(false);

        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    });

    const openMenu = () => {
        setIsOpen(true);
        setTimeout(() => scrollIntoView(), 100);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const setActive = (id) => {
        let tempItems = [...items];
        tempItems = tempItems.map((item) => ({
            ...item,
            isActive: item.id === id,
        }));
        setItems(tempItems);
        setActiveOption(tempItems.findIndex((item) => item.isActive === true));
    };

    const scrollIntoView = () => {
        // const activeItem = activeOptionRef.current;
        // activeItem?.scrollIntoView({
        //     // behavior: 'smooth',
        //     block: "nearest",
        //     inline: "nearest",
        // });
    };

    const handleKeyDown = (e) => {
        if (["ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault(); // to prevent autocompleteField default behaviour when pressed ArrowUp or ArrowDown
        if (e.key === "Tab") closeMenu();
        if (["ArrowUp", "ArrowDown"].includes(e.key) && !isOpen) {
            openMenu();
            return;
        }
        switch (e.key) {
            case "ArrowDown":
                if (activeOption >= items.length - 1) return;
                setActiveOption((prevIndex) => prevIndex + 1);
                break;
            case "ArrowUp":
                if (activeOption <= 0) return;
                setActiveOption((prevIndex) => prevIndex - 1);
                break;
            case "Enter":
                activeOptionRef.current?.click();
                isOpen && setTimeout(() => closeMenu(), 0);
                break;
        }
    };

    useEffect(() => {
        scrollIntoView();
    }, [activeOption]);

    // don't render menu while it closed (replace "isOpen" variable with "isAnimate" from dropdown classname and remove commented isOpen scopes around menu)
    // const [isAnimate, setIsAnimate] = useState(false);

    // useEffect(() => {
    //     setIsAnimate(isOpen);
    // }, [isOpen]);
    //

    return (
        <div
            className={`dropdown dropdown-${size}  ${isOpen ? "active" : ""}  ${className} ${
                disabled ? "disabled" : ""
            }`}
            ref={dropdownRef}
        >
            {/* you can wrap only Button with clickWrapper to allow menu closing when select-items clicked */}
            <div className="dropdown-toggle-wrapper" ref={clickWrapper}>
                <Button
                    className={`dropdown-toggle`}
                    data-toggle="dropdown"
                    onClick={() => (isOpen ? closeMenu() : openMenu())}
                    variant={variant}
                    color={color}
                    onKeyDown={handleKeyDown}
                >
                    <div className="wrapper">
                        {listStyle && <span className={`list-style list-style-${listStyleColor}`}></span>}
                        {startIcon && <span className="startIcon">{startIcon}</span>}
                        <span className="dropdown-toggle-title">{title}</span>
                        {endIcon && <span className="endIcon">{endIcon}</span>}
                    </div>
                    <span className="endIcon dropdown-toggle-icon">{toggleIcon || arrowDown}</span>
                </Button>
                {/* {isOpen && ( // don't render menu while it closed */}
                <div className="dropdown-menu">
                    {!items.length && !children ? (
                        <div className="dropdown-item disabled">empty.</div>
                    ) : (
                        items.map(({ title, startIcon, endIcon, to, id }, index) => (
                            <Link
                                tabIndex={-1}
                                key={index}
                                id={`dropdown-item-${id}`}
                                href={to || `#/path/item-${index + 1}`}
                                className={`dropdown-item ${activeOption === index ? "active" : ""}`}
                                onClick={() => setActive(id)}
                                ref={activeOption === index ? activeOptionRef : null}
                            >
                                {startIcon && <span className="startIcon">{startIcon}</span>}
                                <span className="dropdown-item-title">{title}</span>
                                {endIcon && <span className="endIcon">{endIcon}</span>}
                            </Link>
                        ))
                    )}
                    {children}
                </div>
            </div>

            {/* )} */}
        </div>
    );
}
