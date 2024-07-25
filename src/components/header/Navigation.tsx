import { Box, Button } from "@mui/material";
import { Page } from "../../interfaces/page.interface";
import router from "../Router";

interface NavigationProps {
    pages: Page[];
    }

function Navigation({ pages }: NavigationProps) {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => { router.navigate(page.path); }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
  );
}

export default Navigation;