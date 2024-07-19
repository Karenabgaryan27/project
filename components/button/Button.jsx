'use client'

import React, { useState } from "react";
import { useEffect } from "react";
import { Tooltip } from 'react-tooltip';
import { v4 as uuidv4 } from "uuid";
import ReactDOMServer from "react-dom/server";
import { useGlobalContext } from "../../context";

export default function RippleButton({
    name = "",
    variant = "",
    color = "primary",
    size = "md",
    className = "",
    children,
    onClick = () => {},
    onKeyDown = () => {},
    icon,
    endIcon,
    startIcon,
    startImageIcon,
    endImageIcon,
    style = {},
    tabIndex = 0,
    disabled = false,
    iconColor = "",
    type = "submit",
    title = "",
    tooltipContent = '',
    // tooltipId=''
}) {
    const [showRipple, setShowRipple] = useState(false);
    const [rippleStyle, setRippleStyle] = useState({});

    const {isDarkModeEnabled} = useGlobalContext()

    const animate = (event) => {
        if (event.type === "keydown" && event.keyCode !== 32) return;
        const button = event.currentTarget;
        const btnRect = button.getBoundingClientRect();

        const diameter = Math.max(btnRect.width, btnRect.height);
        const radius = diameter / 2;

        const width = diameter + "px";
        const height = diameter + "px";
        const left = event.clientX - btnRect.left - radius + "px";
        const top = event.clientY - btnRect.top - radius + "px";
        setShowRipple(false);
        setRippleStyle({ width, height, left, top });
    };

    useEffect(() => {
        Object.keys(rippleStyle).length && setShowRipple(true);
    }, [rippleStyle]);

    const getVariant = (variant) => {
        switch (variant) {
            case "outlined":
                return "-outline";
            case "contained":
                return "";
            case "circle":
                return "-circle";
            default:
                return "-text";
        }
    };

    const [filteredVariant, setFilteredVariant] = useState(getVariant(variant));

    // const customTooltipStyle = {
    //     backgroundColor: 'rgba(100,100,100,1)',
    //     color: '#fff',
    //     border: '2px solid black',
    //     boxShadow: '0 0 3px rgba(255,255,255,0.3)',
    //     // borderRadius: '8px',
    //     padding: '8px',
    //     width: 'calc(100% - 11px)',
    //     maxWidth: 'fit-content',
    //     zIndex: '999',
    //     fontSize: '12px'
    //   };
const [tooltipId,setTooltipId] = useState('')

    useEffect(()=>{
        setTooltipId(`tooltip-btn-${uuidv4()}`)
    },[])

    return (
       <>
         <button
             data-tooltip-id={tooltipId}
             data-tooltip-html={ReactDOMServer.renderToStaticMarkup(tooltipContent)}
             title={title}
             className={`btn btn-${size} btn${filteredVariant}-${color} ${className} ${iconColor} ${
                 disabled ? "disabled" : ""
             } ${color === 'dark' ? 'dark-mode-style': ""}`}
             type={type}
             onClick={onClick}
             onMouseDown={animate}
             onKeyDown={(e) => {
                 onKeyDown(e);
                 animate(e);
             }}
             style={style}
             tabIndex={tabIndex}
         >
             {startIcon && <span className="startIcon">{startIcon}</span>}
             {startImageIcon && <span className="startIcon"><img src={startImageIcon} /></span>}
             {name || children}
             {icon}
             {endIcon && <span className="endIcon">{endIcon}</span>}
             {endImageIcon && <span className="startIcon"><img src={endImageIcon} /></span>}
        
             {showRipple && (
                 <span
                     className="ripple"
                     style={rippleStyle}
                     onTransitionEnd={() => setShowRipple(false)}
                 ></span>
             )}
         </button>
         {tooltipId &&  <Tooltip id={tooltipId} className="custom-tooltip"  /> }
       </>
    );
}
