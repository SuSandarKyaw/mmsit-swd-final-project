import React from "react";
import Path from "./routes/Path";
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";

const App = () => {
  return (
    
      <MantineProvider>
        <Path />
      </MantineProvider>
    
  );
};

export default App;
