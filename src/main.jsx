import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import FundComparison from './components/FundComparison'
import FundMonitoring from './components/FundMonitoring'
import FAQ from './components/FAQ'
import Headlines from './components/Headlines'
import Navbar from './components/Navbar'
import './index.css'

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/investmentCalc/" replace />} />
          <Route path="/investmentCalc/" element={<App />} />
          <Route path="/investmentCalc/compare" element={<FundComparison />} />
          <Route path="/investmentCalc/monitor" element={<FundMonitoring />} />
          <Route path="/investmentCalc/headlines" element={<Headlines />} />
          <Route path="/investmentCalc/faq" element={<FAQ />} />
          <Route path="*" element={<Navigate to="/investmentCalc/" replace />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>,
)
