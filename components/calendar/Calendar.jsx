'use client'

import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Button, Dropdown } from "../../index";
import useFormatter from "../../hooks/useFormatter";
import { useGlobalContext } from "../../context";

const endDate = new Date(); // today
const startDate = new Date(endDate);
startDate.setDate(endDate.getDate() - 6); // 7 days ago

const SELECTIONRANGE = {
    startDate,
    endDate,
    key: "selection",
};

const DateRangePickerComponent = ({ className = "", _selectionRange = "", callback = () => {}, disabled=false }) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectionRange, setSelectionRange] = useState(_selectionRange || SELECTIONRANGE);
    const [defaultSelectionRange, setDefaultSelectionRange] = useState(_selectionRange || SELECTIONRANGE);
    const [dateRange, setDateRange] = useState("");

    const {requestedData} = useGlobalContext()

    useEffect(() => {
        if (!isCalendarOpen) return;
        setSelectionRange(defaultSelectionRange);
    }, [isCalendarOpen]);

    const { formatDateRange } = useFormatter();
    const [activeButton, setActiveButton] = useState(null);

    const setInitialActiveButton = () => {
        // Set active button based on initial selection
        const today = new Date();
        const lastSevenDays = new Date(today);
        lastSevenDays.setDate(today.getDate() - 6);
        const lastThirtyDays = new Date(today);
        lastThirtyDays.setDate(today.getDate() - 29);

        const startDate = new Date(selectionRange.startDate);
        const endDate = new Date(selectionRange.endDate);

        if (
            startDate.getFullYear() === lastSevenDays.getFullYear() &&
            startDate.getMonth() === lastSevenDays.getMonth() &&
            startDate.getDate() === lastSevenDays.getDate() &&
            endDate.getFullYear() === today.getFullYear() &&
            endDate.getMonth() === today.getMonth() &&
            endDate.getDate() === today.getDate()
        ) {
            setActiveButton("last7days");
        } else if (
            startDate.getFullYear() === lastThirtyDays.getFullYear() &&
            startDate.getMonth() === lastThirtyDays.getMonth() &&
            startDate.getDate() === lastThirtyDays.getDate() &&
            endDate.getFullYear() === today.getFullYear() &&
            endDate.getMonth() === today.getMonth() &&
            endDate.getDate() === today.getDate()
        ) {
            setActiveButton("last30days");
        } else {
            setActiveButton("");
        }
    };

    useEffect(() => {
        setDateRange(
            getSelectedRangeLabel() + formatDateRange(selectionRange.startDate, selectionRange.endDate)
        );
        setInitialActiveButton();
    }, []);

    const handleSelect = (ranges) => {
        setSelectionRange({
            startDate: ranges.selection.startDate,
            endDate: ranges.selection.endDate,
            key: "selection",
        });
    };

    const handleApply = () => {
        const date =
            getSelectedRangeLabel() + formatDateRange(selectionRange.startDate, selectionRange.endDate);
        setDateRange(date);
        setDefaultSelectionRange(selectionRange);
        setIsCalendarOpen(false);
        callback(selectionRange);
    };

    const handleLast7Days = () => {
        const today = new Date();
        const lastSevenDays = new Date(today);
        lastSevenDays.setDate(today.getDate() - 6);
        setSelectionRange({
            startDate: lastSevenDays,
            endDate: today,
            key: "selection",
        });
        setActiveButton("last7days");
    };

    const handleLast30Days = () => {
        const today = new Date();
        const lastThirtyDays = new Date(today);
        lastThirtyDays.setDate(today.getDate() - 29);
        setSelectionRange({
            startDate: lastThirtyDays,
            endDate: today,
            key: "selection",
        });
        setActiveButton("last30days");
    };

    const handleAllTime = () => {
        const today = new Date();
        const tenYearsAgo = new Date();
        tenYearsAgo.setFullYear(today.getFullYear() - 10);
        setSelectionRange({
            startDate: tenYearsAgo,
            endDate: today,
            key: "selection",
        });
        setActiveButton("alltime");
    };

    const getSelectedRangeLabel = () => {
        const selectedRange = document.querySelector(".campaigns-calendar .rdrStaticRangeSelected");
        return (selectedRange ? selectedRange.textContent.toLowerCase() : "custom") + " | ";
    };

    return (
        <Dropdown
            {...{
                title: dateRange,
                variant: "text",
                color: "dark",
                className: `calendar-dropdown ${className}`,
                isOpen: isCalendarOpen,
                setIsOpen: setIsCalendarOpen,
                size: "sm",
                disabled:  disabled
            }}
        >
            <div className="react-date-range-picker">
                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    showSelectionPreview={false}
                />
                <div className="custom-labels">
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleLast7Days}
                        size="sm"
                        className={activeButton === "last7days" ? "active" : ""}
                    >
                        Last 7 Days
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleLast30Days}
                        size="sm"
                        className={activeButton === "last30days" ? "active" : ""}
                    >
                        Last 30 Days
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleAllTime}
                        size="sm"
                        className={activeButton === "alltime" ? "active" : ""}
                    >
                        All Time
                    </Button>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ display: "block", margin: "5px 5px 5px auto" }}
                    onClick={() => {
                        handleApply();
                        setInitialActiveButton();
                    }}
                    size="sm"
                >
                    Apply
                </Button>
            </div>
        </Dropdown>
    );
};

export default DateRangePickerComponent;


