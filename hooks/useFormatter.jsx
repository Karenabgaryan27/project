import React from "react";

export default function useFormatter() {
    // function formatDateRange(startDateStr, endDateStr) {
    //     // Parse the date strings into Date objects
    //     const startDate = new Date(startDateStr);
    //     const endDate = new Date(endDateStr);

    //     // Format the start date
    //     const startMonth = startDate.toLocaleString("default", { month: "short" });
    //     const startDay = startDate.getDate();

    //     // Format the end date
    //     const endMonth = endDate.toLocaleString("default", { month: "short" });
    //     const endDay = endDate.getDate();

    //     // Format the year
    //     const startYear = startDate.getFullYear();
    //     const endYear = endDate.getFullYear();
    //     const yearString = startYear === endYear ? `, ${startYear}` : ` - ${endYear}`;

    //     // Construct the formatted date range string
    //     const formattedDateRange = `${startMonth} ${startDay} - ${endMonth} ${endDay}${yearString}`;

    //     return formattedDateRange;
    // }

    function formatDateRange(startDateStr, endDateStr) {
        // Parse the date strings into Date objects
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        // Format the start date
        const startMonth = startDate.toLocaleString("default", { month: "short" });
        const startDay = startDate.getDate();
        const startYear = startDate.getFullYear();

        // Format the end date
        const endMonth = endDate.toLocaleString("default", { month: "short" });
        const endDay = endDate.getDate();
        const endYear = endDate.getFullYear();

        let formattedStartDate = `${startMonth} ${startDay}`;
        let formattedEndDate = `${endMonth} ${endDay}`;

        // Include year for start date if it's different from end date's year
        if (startYear !== endYear) {
            formattedStartDate += `, ${startYear}`;
        }

        // Include year for end date
        formattedEndDate += `, ${endYear}`;

        // Construct the formatted date range string
        const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;

        return formattedDateRange;
    }

    const filteredCampaignsDateRange = (
        data,
        _startDate = "Thu Feb 01 2024",
        _endDate = "Thu Feb 29 2024"
    ) => {
        // const startDate = new Date(_startDate);
        // const endDate = new Date(_endDate);
        // const filteredData = data.map((item) => {
        //     const filteredProgressionData = {};
        //     for (const key in item.progressionData) {
        //         const [day, month, year] = key.split("/");
        //         const currentDate = new Date(`${month}/${day}/${year}`);
        //         if (currentDate >= startDate && currentDate <= endDate) {
        //             filteredProgressionData[key] = item.progressionData[key];
        //         }
        //     }
        //     return { ...item, progressionData: filteredProgressionData };
        // });
        // return filteredData;
    };

    const formatCurrency = (amount = 0, digits = 3) => {
        const _amount = parseFloat(amount);
        return _amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: digits, // Ensure 3 decimal places
            maximumFractionDigits: digits, // Ensure 3 decimal places
        });
    };

    const formatNumber = (number) => {
        return number.toLocaleString("en-US", {
            style: "decimal",
            maximumFractionDigits: 0,
        });
    };

    function formatLargeNumber(number) {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        } else {
            return number.toLocaleString(undefined, { maximumFractionDigits: 2 });
        }
    }

    function addCommas(value) {
        const stringValue = value.toString() // temporary post
        const number = parseFloat(stringValue.replace(/[^\d.]/g, ""));

        if (!number || isNaN(parseFloat(number))) {
            return "";
        }

        const formattedNumber = number.toLocaleString();

        return formattedNumber;
    }



    // function removeAlias(str) {
    //     // const lastIndex = str.lastIndexOf("---");
    //     // const name = str.substring(0, lastIndex);
    //     // return name;
    //     let name = str.split("---")[0];
    //     return name;
    // }
    function removeAlias(str) {
        const lastIndex = str.lastIndexOf("---");
        if(lastIndex === -1) return str
        const name = str.substring(0, lastIndex);
        return name;
    }

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    };
    const formatDateToYYYYMMDD = (date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();
        return `${year}-${month}-${day}`;
    };

    function formatDateToMMDD(dateString) {
        // Parse the date string into a Date object
        let date = new Date(dateString);
    
        // Define an array of month names
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
        // Extract day and month components
        let day = date.getDate();
        let month = months[date.getMonth()];
    
        // Format the date
        let formattedDate = day + " " + month;
    
        return formattedDate;
    }
    
    function calculateTimeLeft(xRateLimitReset) {
           // Convert the string timestamp to a number
    var timestamp = parseInt(xRateLimitReset);

    // Create a new Date object with the timestamp
    var resetDate = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

    // Get the current date and time
    var currentDate = new Date();

    // Calculate the difference in milliseconds
    var differenceMs = resetDate - currentDate;

    // Convert milliseconds to seconds
    var secondsLeft = Math.ceil(differenceMs / 1000);

    return secondsLeft;
    }


    return {
        formatDateRange,
        filteredCampaignsDateRange,
        formatCurrency,
        formatNumber,
        formatLargeNumber,
        addCommas,
        removeAlias,
        formatDate,
        formatDateToYYYYMMDD,
        formatDateToMMDD,
        calculateTimeLeft
    };
}
