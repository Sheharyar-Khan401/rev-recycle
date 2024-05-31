import styles from "shared/Components/Topbar/Topbar.module.css";
import avatar from "assets/avatar.png";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBSideNav,
  MDBSideNavItem,
  MDBSideNavMenu,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { logOut } from "redux/features/auth/authSlice";
import React, { useState } from "react";
import { useAppSelector } from "redux/hooks";
import { ArrowDownIcon, CrossIcon, LogoIcon, LogoutIcon } from "helper/icons";
import {
  hasClientsPermissions,
  hasFinancePermissions,
  hasProductionsPermissions,
  hasPurchasePermissions,
  hasSalePermissions,
  hasSettingsPermissions,
} from "helper/utility";
import ActionDialog from "../ActionDialog/ActionDialog";
import { UserData } from "redux/types/Settings/user";
export default function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state?.auth?.user);
  const location = useLocation();
  const [basicOpen, setBasicOpen] = useState<boolean>(false);
  const [isOpenDeleteDialogue, setIsOpenDeleteDialogue] = useState(false);
  const navigations = [
    {
      title: "Dashboard",
      route: "/grader/dashboard",
      invisible: false,
    },
    {
      title: "Finance",
      route: "/grader/finance",
      invisible: !hasFinancePermissions(),
    },
    {
      title: "Purchase",
      route: "/grader/purchase",
      invisible: !hasPurchasePermissions(),
    },
    {
      title: "Sales",
      route: "/grader/sales",
      invisible: !hasSalePermissions(),
    },
    {
      title: "Clients",
      route: "/grader/clients",
      invisible: !hasClientsPermissions(),
    },
    {
      title: "Production",
      route: "/grader/production",
      invisible: !hasProductionsPermissions(),
    },
    {
      title: "Reports",
      route: "/grader/reports",
      invisible: false,
    },
    // {
    //   title: "Analytics",
    //   route: "/grader/analytics",
    //   invisible: false,
    // },
    // {
    //   title: "Trends",
    //   route: "/grader/trends",
    //   invisible: false,
    // },
    // {
    //   title: "Marketing",
    //   route: "/grader/marketing",
    //   invisible: false,
    // },
    {
      title: "Settings",
      route: "/grader/settings",
      invisible: !hasSettingsPermissions(),
    },
  ];
  const getName = (user: UserData) => {
    if (user) {
      if (user.fullName) return user.fullName;
      if (user.email) {
        return user?.email?.split("@")[0];
      }
    }
    return "-";
  };
  return (
    <>
      <div className={styles["bg"]}>
        <div className={"custom-container"}>
          <div className="d-flex justify-content-between align-items-center h-100">
            <div className={styles["logostart"]}>
              <LogoIcon
                className={"cursor"}
                onClick={() => navigate("/grader/dashboard")}
              />
            </div>
            <div className={styles["mobile-view"]}>
              <MDBBtn
                onClick={() => setBasicOpen(!basicOpen)}
                style={{ background: "none" }}
                className="p-0 m-0"
              >
                <MDBIcon
                  fas
                  size="2x"
                  icon="bars"
                  style={{ color: "#8E8E93", paddingBottom: 0 }}
                />
              </MDBBtn>
              <MDBSideNav
                open={basicOpen}
                absolute
                getOpenState={(e) => setBasicOpen(e)}
                style={{
                  height: "100vh",
                  width: "100%",
                  background: "#FFFFFF",
                }}
              >
                <MDBSideNavMenu>
                  <MDBSideNavItem>
                    <>
                      <div className="d-flex justify-content-end">
                        <span
                          className="m-3 cursor"
                          onClick={() => setBasicOpen(!basicOpen)}
                        >
                          <CrossIcon />
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        {navigations?.length > 0 &&
                          user &&
                          navigations
                            .filter((navigation) => !navigation.invisible)
                            ?.map((navigation, i) => {
                              return (
                                <React.Fragment key={i}>
                                  <h6
                                    key={i}
                                    style={{
                                      width: "100%",
                                      textAlign: "center",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      navigation?.route &&
                                        navigate(navigation?.route);
                                      setBasicOpen(!basicOpen);
                                    }}
                                  >
                                    {navigation.title}
                                  </h6>
                                  <hr
                                    className="my-2"
                                    style={{ height: "0.5px" }}
                                  />
                                </React.Fragment>
                              );
                            })}
                      </div>
                    </>
                  </MDBSideNavItem>
                </MDBSideNavMenu>
              </MDBSideNav>
            </div>
            <div className={styles["web-view"] + " hide-scrollbar"}>
              {navigations?.length > 0 &&
                user &&
                navigations
                  .filter(
                    (navigation: {
                      title: string;
                      route: string;
                      invisible: boolean;
                    }) => !navigation.invisible
                  )
                  ?.map(
                    (
                      navigation: {
                        title: string;
                        route: string;
                        invisible: boolean;
                      },
                      i: number
                    ) => {
                      return (
                        <Link
                          title={navigation.title}
                          to={navigation?.route}
                          key={i}
                          className={
                            styles[
                              `nav-item${
                                location.pathname.includes(navigation.route)
                                  ? "-active"
                                  : ""
                              }`
                            ]
                          }
                        >
                          {navigation.title}
                        </Link>
                      );
                    }
                  )}
            </div>
            <div className={styles["mobile-view"]}>
              <LogoIcon className={" cursor"} onClick={() => {}} />
            </div>
            <div
              style={{ minWidth: "20%" }}
              className="d-flex justify-content-end"
            >
              {user ? (
                <>
                  <div className={styles["web-view"]}>
                    <div className="d-flex flex-column align-items-end">
                      <span
                        className="text-capitalize text-dark"
                        style={{
                          fontSize: "13px",
                          fontWeight: "400",
                          lineHeight: 1,
                        }}
                      >
                        {getName(user)}
                      </span>
                      <span
                        className="text-lowercase"
                        style={{ fontSize: "12px" }}
                      >
                        {user.email ? user.email : "-"}
                      </span>
                    </div>
                  </div>
                  <MDBDropdown className="p-0 m-0 d-flex flex-column mx-1">
                    <MDBDropdownToggle className="bg-transparent p-0 m-0 mb-auto">
                      <div className={styles["web-view"]}>
                        <ArrowDownIcon
                          style={{ width: "10px", fill: "#000" }}
                        />
                      </div>
                      <div className={styles["mobile-view"]}>
                        <MDBIcon
                          fas
                          icon="user-circle"
                          color="black-50"
                          size="2x"
                        />
                      </div>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="py-2 px-2 my-2">
                      <MDBDropdownItem className="d-flex align-items-center">
                        <img
                          src={user?.imageUrl ? user.imageUrl : avatar}
                          alt=""
                          width={user ? 35 : 25}
                          className={styles["profile"]}
                        />
                        <span className="mx-2 d-flex flex-column">
                          <div className="black fw500 fs16 text-capitalize">
                            {getName(user)}
                          </div>
                          <div
                            style={{ color: "#BFBFBF", fontSize: "12px" }}
                            className=" fw500"
                          >
                            {user?.email ? user?.email : "-"}
                          </div>
                        </span>
                      </MDBDropdownItem>
                      <hr className="my-2" />
                      <MDBDropdownItem
                        className="cursor black fs16 fs500"
                        onClick={() => {
                          setIsOpenDeleteDialogue(true);
                        }}
                      >
                        <LogoutIcon className="mx-2" /> Sign Out
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <ActionDialog
        isOpen={isOpenDeleteDialogue}
        onClose={() => setIsOpenDeleteDialogue(false)}
        onOk={() => {
          dispatch(logOut());
        }}
        title="Sign out"
        message={"Are you sure you want to sign  out your session?"}
      />
    </>
  );
}
