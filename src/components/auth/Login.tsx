import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  const { login, error } = useLogin();

  return (
    <Auth
      submitLabel="Log In"
      onSubmit={(req) => login(req)}
      error={error}
    >
      <Link to="/signup" style={{ alignSelf: "center" }}>
        <MUILink>Sign Up</MUILink>
      </Link>
    </Auth>
  );
}

export default Login;
