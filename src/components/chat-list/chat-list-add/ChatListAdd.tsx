import { Search as SearchIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface ChatListAddProps {
  open: boolean;
  handleClose: () => void;
}

function ChatListAdd({ open, handleClose }: ChatListAddProps) {
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          width: 400,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" component="h2">
            Add Chat
          </Typography>
          <FormGroup>
            <FormControlLabel
              style={{ width: 0 }}
              control={
                <Switch
                  defaultChecked
                  value={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
              }
              label="Private"
            />
          </FormGroup>
          {isPrivate ? (
            <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for users"
              />
              <IconButton sx={{ p: "10px" }}>
                <SearchIcon />
              </IconButton>
            </Paper>
          ) : (
            <TextField label="Name" />
          )}
          <Button variant="outlined">Save</Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default ChatListAdd;
