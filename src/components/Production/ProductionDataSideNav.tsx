import Sidebar from "shared/Components/Sidebar/Sidebar";
interface Props {
  type: number;
}
export default function ProductionDataSideNav({ type }: Props) {
  return (
    <>
      <Sidebar
        title="Issuance"
        type={type}
        navigations={[
          {
            type: 3,
            name: "Wiper",
            route: "/grader/production/issuances/wiperissuance",
          },
          {
            type: 1,
            name: "Production",
            route: "/grader/production/issuances/issuance",
          },
          {
            type: 4,
            name: "Mutility",
            route: "/grader/production/issuances/mutilityissuance",
          },
          {
            type: 2,
            name: "Reproduction",
            route: "/grader/production/issuances/reproductionissuance",
          },
        ]}
      />
    </>
  );
}
