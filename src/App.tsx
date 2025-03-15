import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavBar } from './common/NavBar/NavBar'
import { Monitor } from './monitor/Monitor/Monitor'
import { ConfigManager } from './configManager/ConfigManager/ConfigManager'

function App() {
  return (
    <>
      <BrowserRouter>
        {/* Navigation component that will be shown on all pages */}
        <NavBar />

        <div>
          <Routes>
            <Route path="/monitor" element={<Monitor />} />
            <Route path="/config-manager" element={<ConfigManager />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
