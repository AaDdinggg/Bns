import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from 'react-router-dom';
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Activities from "./scenes/activities/activities";
import Reports from "./scenes/reports";
import Beneficiaries from "./scenes/beneficiaries/beneficiaries";
import Calendar from "./scenes/calendar/calendar";
import Bns from "./scenes/bns/bns";
// import Archives from "./scenes/archives";

function App() {
  const [theme, colorMode] = useMode();
  
  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <div className="app">
      <Sidebar />
      <main className="content"><Topbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/activities" element={<Activities />} /> 
        <Route path="/reports" element={<Reports />} />
        <Route path="/beneficiaries" element={<Beneficiaries />} /> 
        <Route path="/calendar" element={<Calendar />} /> 
        <Route path="/bns" element={<Bns />} />
        {/* <Route path="/archives" element={<Archives />} /> */}
      </Routes>
      </main>
      </div>
    </ThemeProvider>
    </ColorModeContext.Provider>);
};

export default App;