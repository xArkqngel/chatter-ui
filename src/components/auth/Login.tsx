import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material";

function Login() {
  return (
    <Auth submitLabel="Log In" onSubmit={async () => {}}>
      <Link to="/signup" style={{alignSelf:'center'}}>
        <MUILink>Sign Up</MUILink>
      </Link>
    </Auth>
  );
}

export default Login;
