import { useEffect, useState } from "react";
import {
  MDBSideNav,
  MDBSideNavMenu,
  MDBSideNavItem,
  MDBSideNavLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBSideNavCollapse,
} from "mdb-react-ui-kit";
import styles from "shared/Components/Sidebar/styles.module.css";
import { useNavigate } from "react-router-dom";

import { ArrowDownIcon } from "helper/icons";
interface SidebarProps {
  title: string;
  type: number;
  subtype?: number;
}
export interface navigation {
  name: string;
  route: string;
  type: number;
  subnavigations?: subnavigations[];
  subtype?: number;
  invisible?: boolean;
}
interface subnavigations {
  subtype: number;
  name: string;
  route: string;
}

interface Props {
  title: string;
  navigations: navigation[];
  type: number;
  subtype?: number;
}
export default function Sidebar({ title, navigations, type, subtype }: Props) {
  const navigate = useNavigate();
  const [selectedSubNavigation, setSelectedSubNavigation] = useState<
    number | null
  >(null);
  const [subNavigations, setSubNavigations] = useState<number[]>([]);

  useEffect(() => {
    // eslint-disable-next-line
    navigations.map((n) => {
      if (n.subnavigations)
        setSubNavigations([...subNavigations, n.subtype ?? 0]);
    });
    // eslint-disable-next-line
  }, [navigations]);

  useEffect(() => {
    setSelectedSubNavigation(subtype ? subtype : -1);
    // eslint-disable-next-line
  }, [type]);

  return (
    <div>
      <div className={styles["mobile-view"]}>
        <MDBDropdown>
          <MDBDropdownToggle className="p-0 text-dark bg-transparent">
            <h6 className="fw-bold">
              {title} <ArrowDownIcon style={{ fill: "#000" }} />
            </h6>
          </MDBDropdownToggle>
          <MDBDropdownMenu responsive="end">
            {navigations?.length > 0 ? (
              navigations
                .filter((navigation) => !navigation.invisible)
                ?.map((navigation, i) => {
                  return (
                    <MDBDropdownItem
                      link
                      childTag="button"
                      key={i}
                      style={{
                        color: "#3b71ca",
                        fontSize: "14px",
                      }}
                      onClick={() => {
                        navigation?.route && navigate(navigation?.route);
                      }}
                    >
                      {navigation?.name}
                    </MDBDropdownItem>
                  );
                })
            ) : (
              <></>
            )}
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>
      <div id="side-nav" className={styles["web-view"]}>
        <div className={styles['heading']}>{title}</div>
        <div>
          <MDBSideNav
            className={styles["side-nav"]}
            isOpen={true}
            relative
            constant={true}
            closeOnEsc={false}
            backdrop={false}
          >
            {navigations?.map((item, index) => {
              return (
                <MDBSideNavMenu key={index}>
                  <MDBSideNavItem key={index}>
                    <MDBSideNavLink
                      key={index}
                      onClick={() => {
                        navigate(item.route);
                        setSelectedSubNavigation(
                          item?.subtype ? item?.subtype : -1
                        );
                      }}
                      icon={
                        item?.subnavigations &&
                        item?.subnavigations.length > 0 &&
                        selectedSubNavigation
                          ? selectedSubNavigation === subtype
                            ? "angle-down"
                            : "angle-up"
                          : ""
                      }
                      className={
                        styles[
                          `${
                            +item?.type === type
                              ? "side-nav-link-active"
                              : "side-nav-link"
                          }`
                        ] + " black"
                      }
                    >
                      {item?.name}
                    </MDBSideNavLink>
                    {item.subnavigations && (
                      <MDBSideNavCollapse
                        id={item.type.toString()}
                        open={selectedSubNavigation === subtype}
                      >
                        {item?.subnavigations?.map(
                          (subitem: {
                            subtype: number;
                            route: string;
                            name: string;
                          }) => {
                            return (
                              <MDBSideNavLink
                                className={
                                  styles[
                                    `${
                                      subitem?.subtype === subtype
                                        ? "side-nav-link-active"
                                        : "side-nav-link"
                                    }`
                                  ] + " black"
                                }
                                onClick={() => {
                                  navigate(subitem?.route);
                                }}
                              >
                                {subitem?.name}
                              </MDBSideNavLink>
                            );
                          }
                        )}
                      </MDBSideNavCollapse>
                    )}
                  </MDBSideNavItem>
                </MDBSideNavMenu>
              );
            })}
          </MDBSideNav>
        </div>
      </div>
    </div>
  );
}
