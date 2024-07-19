'use client'

import React from "react";
import { Button } from "../../../index";
import localData from "../../../localData";

export default function TableSkeleton({message = '',icon = null}) {

    return (
        <div className="table-skeleton" >
                {message && <div className="message" dangerouslySetInnerHTML={{ __html: message }}></div>}
                {icon && <img src={icon} />}
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
    );
}
