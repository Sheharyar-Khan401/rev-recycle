import {
  MDBSideNav,
  MDBSideNavMenu,
  MDBSideNavItem,
  MDBSideNavLink,
  MDBSideNavCollapse,
} from "mdb-react-ui-kit";
import styles from "shared/Components/Sidebar2/styles.module.css";

export interface navigation {
  name: string;
  type: number;
  subnavigations?: subnavigations[];
  subtype?: number;
  invisible?: boolean;
  onClick?: (value: number) => void;
}
interface subnavigations {
  subtype: number;
  name: string;
  onClick?: (value: number) => void;
}

interface Props {
  title?: string;
  navigations: navigation[];
  type: number;
  subtype?: number;
}
export default function Sidebar({ title, navigations, type, subtype }: Props) {
  return (
    <div id="side-nav" className={styles["web-view"]}>
      {title && <div className={styles["heading"]}>{title}</div>}
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
                    onClick={(e) => {
                      e.preventDefault();
                      item.onClick?.(item.type);
                    }}
                    icon={
                      item?.subnavigations &&
                      item?.subnavigations.length > 0 &&
                      type === item?.type
                        ? "angle-down"
                        : "angle-up"
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
                      open={type === item?.type}
                    >
                      {item?.subnavigations?.map((subitem) => {
                        return (
                          <MDBSideNavLink
                            className={`${
                              subitem.subtype === subtype
                                ? styles["side-nav-link-active"]
                                : styles["side-nav-link"]
                            } ${styles["sub-nav"]} black`}
                            onClick={(e) => {
                              e.preventDefault();
                              subitem?.onClick?.(subitem.subtype);
                            }}
                          >
                            {subitem?.name}
                          </MDBSideNavLink>
                        );
                      })}
                    </MDBSideNavCollapse>
                  )}
                </MDBSideNavItem>
              </MDBSideNavMenu>
            );
          })}
        </MDBSideNav>
      </div>
    </div>
  );
}
