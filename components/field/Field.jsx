'use client'

import React, { useState, useEffect } from "react";
import { Button } from "../../index";
import { Tooltip } from "react-tooltip";

export default function Field({
    label,
    labelInfo,
    name,
    color = "primary",
    placeholder = "",
    type,
    callback = () => {},
    onClick=()=>{},
    value = "",
    dataValue = '',
    className = "",
    inputClassName = "",
    required = false,
    successMessage = "",
    errorMessage = "",
    Tag = "input",
    link,
    onKeyDown = null,
    startIcon  ,
    endIcon,
    children,
    size = "md",
    _ref= null,
    readOnly = false,
}) {
    const [_value, _setValue] = useState(value);

    useEffect(() => {
        _setValue(value);
    }, [value]);

    const onChange = (e) => {
        _setValue(e.target.value);
        callback(e);
    };

    return (
        <div className={`field ${className}`} >
            {label && (
                <div className="wrapper">
                    <label
                        className="form-label"
                        htmlFor={name}
                        data-tooltip-id={`tooltip-campaign-${name}`}
                        data-tooltip-content={labelInfo}
                    >
                        {label}
                    </label>
                    {link}
                </div>
            )}
            {labelInfo && <Tooltip id={`tooltip-campaign-${name}`} className="custom-tooltip" />}
            <div className="input-group">
                {/* onClick={(e) => e.preventDefault()} */}
                <div>
                    {children}
                    {startIcon && (
                        <Button
                            className="field-startIcon"
                            icon={startIcon}
                            variant="circle"
                            size="sm"
                            color="secondary"
                        />
                    )}
                    {endIcon && (
                        <Button
                            className="field-endIcon"
                            icon={endIcon}
                            variant="circle"
                            size="sm"
                            color="secondary"
                        />
                    )}

                    <Tag
                        type={type}
                        name={name}
                        id={name}
                        className={`form-control form-control-${color} ${inputClassName} form-control-${size}`}
                        onClick={onClick}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        placeholder={placeholder}
                        value={_value}
                        data-value={dataValue}
                        required={required}
                        ref={_ref}
                        readOnly={readOnly}
                    />
                </div>
            </div>
            {errorMessage && <p className="error-message" dangerouslySetInnerHTML={{ __html: errorMessage }}></p>}
            {successMessage && <p className="success-message" dangerouslySetInnerHTML={{ __html: successMessage }}></p>}
        </div>
    );
}
