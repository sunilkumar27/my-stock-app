import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StockProvider } from "./context/StockContext.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { StockDetailPage } from "./pages/StockDetailPage.tsx";
import { MainLayout } from "./components/layout/MainLayout.tsx";
import { ErrorBoundary } from "./components/common/ErrorBoundary.tsx";

const App = () => (
  <ErrorBoundary>
    <StockProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stock/:symbol" element={<StockDetailPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </StockProvider>
  </ErrorBoundary>
);

export default App;
