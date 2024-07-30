import AddCircle from "@mui/icons-material/AddCircle";
import { AppBar, IconButton, Toolbar } from "@mui/material";

interface ChatListHeaderProps {
    handleAddChat: () => void;
}

function ChatListHeader({ handleAddChat }: ChatListHeaderProps) {
  return (
    <AppBar position="static" color="transparent">
        <Toolbar>
            <IconButton size="large" edge="start" onClick={handleAddChat}>
                <AddCircle />
            </IconButton>
        </Toolbar>
    </AppBar>
  );
}

export default ChatListHeader;