import Sidebar from "shared/Components/Sidebar/Sidebar";
interface Props {
  type: number ;
}
export default function ProductionSideNav({ type }: Props) {
  return (
    <>
      <Sidebar
        title="Production"
        type={type}
        navigations={[
          {
            type: 1,
            name: "Categories",
            route: "/grader/settings/productions/categories",
          },
          {
            type: 2,
            name: "Items",
            route: "/grader/settings/productions/items/",
          },
          {
            type: 3,
            name: "Belts",
            route: "/grader/settings/productions/belts",
          },
          {
            type: 4,
            name: "Stockrooms",
            route: "/grader/settings/productions/stockrooms",
          },
          {
            type: 5,
            name: "Floors",
            route: "/grader/settings/productions/floors",
          },
          {
            type: 6,
            name: "Sorted Rooms",
            route: "/grader/settings/productions/sortedrooms",
          },
          {
            type: 8,
            name: "Label Types",
            route: "/grader/settings/productions/labeltypes",
          },
          {
            type: 9,
            name: "Stations",
            route: "/grader/settings/productions/stations",
          },
          {
            type: 10,
            name: "Cartons",
            route: "/grader/settings/productions/cartons",
          },
          {
            type: 11,
            name: "Brands",
            route: "/grader/settings/productions/brands",
          },
          {
            type: 12,
            name: "Grades",
            route: "/grader/settings/productions/grades",
          },
          {
            type: 13,
            name: "Departments",
            route: "/grader/settings/productions/departments",
          },
        ]}
      />
    </>
  );
}
