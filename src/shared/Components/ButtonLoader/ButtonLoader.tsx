import { MDBSpinner } from "mdb-react-ui-kit";

export default function ButtonLoader() {
  return (
    <>
      <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
      Please wait...
    </>
  );
}
