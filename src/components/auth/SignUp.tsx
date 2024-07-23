import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useState } from "react";
import { extractErrorMessage } from "../../utils/errors";

function SignUp() {
  const [createUser] = useCreateUser();
  const [error, setError] = useState<string>();

  return (
    <Auth
      submitLabel="Sign Up"
      error={error}
      onSubmit={async ({ email, password }) => {
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                password,
              },
            },
          });
          setError("");
        } catch (error) {
          const errorMessage = extractErrorMessage(error);
          if (errorMessage) {
            setError(errorMessage);
            return;
          }
          setError("Something went wrong");
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
