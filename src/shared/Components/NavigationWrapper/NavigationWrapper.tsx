import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "shared/Components/NavigationWrapper/styles.module.css";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { ReactElement } from "react";
import { ArrowDownIcon } from "helper/icons";
interface Props {
  title: string;
  marginLeft?: string;
  navigations: {
    title: string | ReactElement;
    route: string;
    invisible?: boolean;
  }[];
}
export default function NavigationWrapper({ title, navigations }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="d-flex align-items-end mt-3 border-bottom my-4 ">
        <div className={styles["mobile-view"]}>
          <MDBDropdown>
            <MDBDropdownToggle className="p-0 text-dark bg-transparent">
              <h5 className="fw-bold">
                {title} <ArrowDownIcon style={{ fill: "#000" }} />
              </h5>
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              {navigations.length > 0 ? (
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
                        {navigation.title}
                      </MDBDropdownItem>
                    );
                  })
              ) : (
                <></>
              )}
            </MDBDropdownMenu>
          </MDBDropdown>
        </div>

        <div className={styles["web-view"]}>
          <div className="me-4">
            <div className={"fw-bolder"}>
              <h2 className="fw-bold black mb-0">{title ? title : ""}</h2>
            </div>
          </div>
          <div className={styles['nav-items-container']+" hide-scrollbar"}>
            {navigations?.length > 0 &&
              navigations
                .filter(
                  (navigation: {
                    title: string | ReactElement;
                    route: string;
                    invisible?: boolean;
                  }) => !navigation.invisible
                )
                ?.map(
                  (
                    navigation: {
                      route: string;
                      title: string | ReactElement;
                    },
                    i: number
                  ) => {
                    return (
                      <Link
                        to={navigation?.route ?? ""}
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
        </div>
      </div>
    </>
  );
}
