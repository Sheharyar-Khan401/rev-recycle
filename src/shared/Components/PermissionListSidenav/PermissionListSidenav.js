import { useEffect, useState } from "react";
import {
  MDBSideNav,
  MDBSideNavMenu,
  MDBSideNavItem,
  MDBSideNavLink,
  MDBSideNavCollapse,
} from "mdb-react-ui-kit";
import styles from "shared/Components/PermissionListSidenav/styles.module.css";
import { useSelector } from "react-redux";

export default function PermissionListSideNav({
  sidePermission,
  setSidePermission,
}) {
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [collapseOpened, setCollapseOpened] = useState("");
  const permissionList = useSelector((state) => state.roles.permissionList);
  useEffect(() => {
    if (permissionList?.length > 0) {
      setSidePermission(permissionList[0]?.screens[0]);
      setCollapseOpened("accordionCollapse" + permissionList[0]?.screenGroupId);
    }
  }, [permissionList]);
  const toggleAccordion = (value) => {
    value != collapseOpened ? setCollapseOpened(value) : setCollapseOpened("");
  };

  return (
    <div id="user-side-nav">
      <div>
        <MDBSideNav
          className={styles["side-nav"]}
          isOpen={accordionOpen}
          relative
          constant={true}
          closeOnEsc={false}
          backdrop={false}
          getOpenState={(e) => {
            setAccordionOpen(e);
          }}
        >
          <MDBSideNavMenu>
            {permissionList?.map((rg) => {
              return (
                <MDBSideNavItem key={rg.screenGroupId}>
                  <MDBSideNavLink
                    icon="angle-down"
                    shouldBeExpanded={
                      collapseOpened == "accordionCollapse" + rg.screenGroupId
                    }
                    onClick={() => {
                      toggleAccordion("accordionCollapse" + rg.screenGroupId);
                    }}
                    className={styles["side-nav-item"]}
                  >
                    {rg.name}
                  </MDBSideNavLink>
                  <MDBSideNavCollapse
                    id={"accordionCollapse" + rg.screenGroupId}
                    open={
                      collapseOpened != "accordionCollapse" + rg.screenGroupId
                    }
                  >
                    {rg?.screens?.map((screen) => {
                      return (
                        <MDBSideNavLink
                          key={screen.screenId}
                          className={
                            styles[
                              `${
                                sidePermission?.screenId === screen.screenId
                                  ? "side-nav-link-active"
                                  : ""
                              }`
                            ]
                          }
                          onClick={() => {
                            setSidePermission(screen);
                            setCollapseOpened(
                              "accordionCollapse" + rg.screenGroupId
                            );
                          }}
                        >
                          {screen.name}
                        </MDBSideNavLink>
                      );
                    })}
                  </MDBSideNavCollapse>
                </MDBSideNavItem>
              );
            })}
          </MDBSideNavMenu>
        </MDBSideNav>
      </div>
    </div>
  );
}
