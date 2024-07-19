'use client'
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../index.jsx";

export default function Checkbox({
    label = "",
    className = "",
    checked = false,
    color = "primary",
    callback = () => {},
    disabled = false,
    size='md',
}) {
    const checkInput = useRef(null);

    const [isChecked, setIsChecked] = useState(checked);

    useEffect(()=>{
        setIsChecked(checked);
    },[checked])

    const onChange = (e) => {
        setIsChecked(e.target.checked);
        callback(e.target.checked);
    };

    return (
        <label className={`form-check ${className} ${disabled ? "disabled" : ""} form-check-${size}`}>
            <input
                ref={checkInput}
                type="checkbox"
                className="form-check-input"
                checked={isChecked}
                onChange={onChange}
            />
            <Button onClick={() => checkInput.current.click()} className={`btn form-check-btn btn-circle-${color}`}>
                <div className="form-check-checkbox"></div>
            </Button>
            {label && <span className={`form-check-label text-${color}`}>{label}</span>}
        </label>
    );
}
