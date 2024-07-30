import { useEffect, useState } from "react";
import router from "../components/Router";

const usePath = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    router.subscribe((state) => {
      setPath(state.location.pathname);
    });
  }, []);

  return { path };
};

export { usePath };
