'use client'

import React, { useState, useEffect, useRef } from "react";
import { Button, Carousel } from "../../index";
import localData from "../../localData";

function TabTitleItem({
    index,
    title,
    activeTab,
    setActiveTab,
    activeTabRef,
    startIcon,
    startImageIcon,
    id,
    tabClickable = true,
    tabMarked = true,
    tabDisabled = false,
    isTitleHidden = false,
}) {
    return (
        <li
            key={index}
            id={id}
            // className={`nav-item ${activeTab === index ? "active" : ""}`}
            className={`nav-item ${tabMarked && activeTab !== index ? "marked" : ""} ${
                tabDisabled ? "disabled" : ""
            }`}
            ref={activeTab === index ? activeTabRef : null}
            style={isTitleHidden ? { display: "none" } : {}}
        >
            <Button
                style={{ pointerEvents: tabClickable ? "auto" : "none" }}
                variant="text"
                className={`nav-link ${activeTab === index ? "active" : ""}`}
                onClick={() => setActiveTab(index)}
                name={title}
                startIcon={startIcon}
                startImageIcon={startImageIcon}
                color="dark"
            />
        </li>
    );
}

export default function Tabs({
    tabs,
    defaultTab = 0,
    className,
    swiper,
    indicatorIcon,
    tabsProps,
    callback = () => {},
    isLoading = false,
    loadingMessage = "",
    hideTabs = false
}) {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [isShown, setIsShown] = useState(defaultTab);
    const [style, setStyle] = useState(null);
    const activeTabRef = useRef(null);

    const { arrowRight } = localData.svgs;

    useEffect(() => {
        callback(tabs[activeTab].title); //, tabs[activeTab]
        setIsShown(activeTab);
        setStyle({
            ...style,
            top: activeTabRef.current.offsetTop + "px",
        });
    }, [activeTab]);

    return (
        <div className={`tabs shadow ${className} ${swiper ? "swiper-tabs" : ""}`}>
            <ul className={`nav nav-tabs  ${isLoading ? "on-hold" : ""}`} style={hideTabs ? {opacity: 0, pointerEvents: 'none'}:{}}>
                {swiper ? (
                    <Carousel
                        items={tabs}
                        Card={TabTitleItem}
                        cardOptions={{ activeTab, setActiveTab, activeTabRef }}
                        options={{
                            slidesPerView: "auto",
                            spaceBetween: 5,
                            breakpoints: null,
                            loop: false,
                            autoplay: false,
                            speed: 500,
                        }}
                    />
                ) : (
                    tabs.map((item, index) => (
                        <TabTitleItem
                            key={index}
                            {...{ ...item, index, activeTab, setActiveTab, activeTabRef }}
                        />
                    ))
                )}

                {!swiper && (
                    <div className="indicator dark-mode-style" style={style}>
                        {indicatorIcon || arrowRight}
                    </div>
                )}

                {/* OLD VERSION */}
                {/* {tabs.map(({ title }, index) => ( 
                    <li key={index} className="nav-item" ref={activeTab === index ? activeTabRef : null}>
                        <Button
                            variant="text"
                            color="primary"
                            className={`nav-link ${activeTab === index ? "active" : ""}`}
                            onClick={() => setActiveTab(index)}
                            name={title}
                        />
                    </li>
                ))} */}
            </ul>
            {isLoading && <div className="loading-message">{loadingMessage}</div>}
            <div className="divider"></div>
            <div className="tab-content">
                {tabs.map(({ content }, index) => (
                    <div
                        key={index}
                        className={`tab-pane fade ${isShown === index ? "show" : ""} ${
                            activeTab === index ? "active" : ""
                        }`}
                    >
                        {/* {content} */}
                        {React.cloneElement(content, { setActiveTab, ...tabsProps })}
                    </div>
                ))}
            </div>
        </div>
    );
}
