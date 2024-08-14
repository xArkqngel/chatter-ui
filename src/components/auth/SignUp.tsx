import { Link } from "react-router-dom";
import { Link as MUILink, TextField } from "@mui/material";
import Auth from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useState } from "react";
import { extractErrorMessage } from "../../utils/errors";
import { useLogin } from "../../hooks/useLogin";
import { UNKNOWN_ERROR_MESSAGE } from "../../constants/errors";

function SignUp() {
  const [createUser] = useCreateUser();
  const [userName, setUserName] = useState("");
  const [error, setError] = useState<string>();
  const { login } = useLogin();

  return (
    <Auth
      submitLabel="Sign Up"
      error={error}
      extraFields={[
        <TextField
        label="Username"
        variant="outlined"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        error={!!error}
        helperText={error}
      />
      ]}
      onSubmit={async ({ email, password }) => {
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                username: userName,
                password,
              },
            },
          });
          await login({ email, password });
          setError("");
        } catch (error) {
          const errorMessage = extractErrorMessage(error);
          if (errorMessage) {
            setError(errorMessage);
            return;
          }
          setError(UNKNOWN_ERROR_MESSAGE);
        }
      }}
    >
      <Link to="/login" style={{ alignSelf: "center" }}>
        <MUILink>Log In</MUILink>
      </Link>
    </Auth>
  );
}

export default SignUp;
