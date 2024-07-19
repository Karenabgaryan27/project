
'use client'

import React, { useEffect,useRef } from "react";
import { Drawer, ConnectWallet,Button, Modal, } from "../../index.jsx";
import  Link  from "next/link";
import { useGlobalContext } from "../../context.jsx";
import localData from "../../localData.jsx";
import useFormatter from '../../hooks/useFormatter.jsx'

// const menu = [
//     { title: "home", to: "/" },
//     { title: "about", to: "/about" },
//     { title: "products", to: "/products" },
// ];

export default function Navbar({ title = "", titlePopup = "" }) {
    // const location = useLocation();
    const { avatar, user } = localData.images;
    const {
        showSidebar,
        setShowSidebar,
        successAlert,

        showProfileDrawer,
        setShowProfileDrawer,
        showDepositModal,
        setShowDepositModal,
        requestedData,
        requestedData: { userProfileData },
        isDarkModeEnabled,
        setIsDarkModeEnabled,
        handleSignOut
    } = useGlobalContext();

    const navbarRef = useRef(null)

    const {formatNumber} = useFormatter()
    // console.log(auth?.currentUser?.email, " navbar page");
    const { arrowDown, bars, barsClose, sun, moon, deposit } = localData.svgs;
    const { textPreloader } = localData.images;

    useEffect(() => {
        if ( !navbarRef.current) return;
        const mainContentElement = document.querySelector('.main-content');
        console.log(mainContentElement)
        const shrink = () => {
            navbarRef.current.classList.toggle("shrink", mainContentElement.scrollTop > 0);
        };

        mainContentElement.addEventListener("scroll", shrink);

        return () => {
            mainContentElement.removeEventListener("scroll", shrink);
        };
    }, [ navbarRef.current]);

    // DRAWER
    const DrawerComponent = ({ callbackFromParent }) => {
        const { logout } = localData.svgs;
        const { isLoading } = useGlobalContext();

        return (
            <>
                {/* <p>drawer with callback</p> */}
                {/* <Button variant="contained" name="close drawer" onClick={callbackFromParent} /> */}
                <div className="drawer-header">
                    <img src={userProfileData.profile_image} alt="" />
                    <p className="drawer-text">
                        Welcome to Blockchain-Ads
                        <br />{" "}
                        <strong>
                            {false ? (
                                <img src={textPreloader.src} className="text-preloader" />
                            ) : (
                                userProfileData.userName
                            )}
                        </strong>
                    </p>
                </div>

                <div className="drawer-body">
                    {/* <Link href="/profile">
                        <Button name="My Profile" color="dark" onClick={callbackFromParent} />
                    </Link>
                    <br />

                    <Button
                        name="deposit funds"
                        color="dark"
                        onClick={() => {
                            setShowDepositModal("block");
                        }}
                    />
                    <br />
                        <Link href="/referral">
                            <Button name="Referral Program" color="dark" onClick={callbackFromParent} />
                        </Link>
                    <br />
                    <br /> */}

                    <Button
                        name="log out"
                        color="danger"
                        variant="outlined"
                        startIcon={logout}
                        onClick={() => {
                            callbackFromParent();
                            setTimeout(() => {
                                alert('sign out triggered')
                                // handleSignOut();
                            }, 1000);
                        }}
                    />
                </div>

                <div className="drawer-footer">
              
                </div>
            </>
        );
    };

    let isMobile = false

    if(typeof window !== "undefined") {
        isMobile =   window.innerWidth < 576
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg" ref={navbarRef}>
                <h1 className="navbar-title navbar-title-sm-media" title={titlePopup}>
                    {title}
                </h1>
                <div className="wrapper">
                    <Button
                        className="sidebar-toggler-show"
                        size="sm"
                        icon={showSidebar ? bars : barsClose}
                        variant="circle"
                        color="dark"
                        onClick={() => setShowSidebar(!showSidebar)}
                    />
                    <h1 className="navbar-title" title={titlePopup}>
                        {title}
                    </h1>
                </div>

                <div className="wrapper">
                    <Modal
                        Child={ConnectWallet}
                        className="deposit-modal modal-dialog-centered"
                        buttonTitle="Connect wallet"
                        buttonStartIcon={deposit}
                        buttonClassName={`rounded-pill deposit-btn ${
                            isMobile  ? "btn-sm" : ""
                        }`}
                        buttonColor="primary"
                        display={showDepositModal}
                        setDisplay={setShowDepositModal}
                        togglerInfo={
                            <>
                                Top up your account balance to use <br /> Blockchain-Ads.
                            </>
                        }
                        // togglerId="tooltip-deposit-btn"
                    ></Modal>
                    <div className="budget dark-mode-style">
                        <p className="budget-title">BALANCE</p>
                        <div className="budget-balance">
                            $
                            {formatNumber(
                                requestedData.userProfileData.currentOrganization.balance?.toFixed(0) || "0"
                            )}
                        </div>
                    </div>
                    <Drawer
                        Component={DrawerComponent}
                        className="drawer-right"
                        display={showProfileDrawer}
                        setDisplay={setShowProfileDrawer}
                        disabled={false}
                        toggler={
                            <Button color="dark" variant="text">
                                <div className="profile  dark-mode-style">
                                    <div className="profile-image">
                                        <img src={userProfileData.profile_image} alt="" />
                                    </div>
                                    <div className="profile-name">
                                        {false ? (
                                            <img src={textPreloader.src} className="text-preloader" />
                                        ) : (
                                            userProfileData.userName
                                        )}
                                    </div>
                                    <div className="profile-icon">{arrowDown}</div>
                                </div>
                            </Button>
                        }
                    />
                </div>

                {/* <div className="navbar-collapse" id="navbarSupportedContent">
                     <ul className="navbar-nav me-auto">
                         {menu.map(({ title, to }, index) => (
                             <li className="nav-item" key={index}>
                                 <Link to={to} className={`nav-link ${to === location.pathname ? "active" : ""}`}>
                                     {title}
                                 </Link>
                             </li>
                         ))}
                        
                     </ul>
                 </div> */}
            </nav>
            <hr className="navbar-divider" />
        </>
    );
}
