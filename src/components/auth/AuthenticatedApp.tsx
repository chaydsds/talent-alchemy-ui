
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { UserButton } from '@clerk/clerk-react';
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Upload from "@/pages/Upload";
import TalentSearch from "@/pages/Search";
import CandidateDetail from "@/pages/CandidateDetail";
import Dashboard from "@/pages/Dashboard";
import EmailSetup from "@/pages/EmailSetup";
import Pricing from "@/pages/Pricing";
import BackgroundChecks from "@/pages/BackgroundChecks";
import EmployeeDetails from "@/pages/EmployeeDetails";
import InitiateBackgroundCheck from "@/pages/InitiateBackgroundCheck";
import EmailIntegration from "@/pages/EmailIntegration";
import AdminPanel from "@/pages/AdminPanel";
import EmployeeManagement from "@/pages/EmployeeManagement";
import NotFound from "@/pages/NotFound";

const AuthenticatedApp = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/search" element={<TalentSearch />} />
        <Route path="/candidates/:id" element={<CandidateDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/email-setup" element={<EmailSetup />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/background-checks" element={<BackgroundChecks />} />
        <Route path="/background-checks/employee/:id" element={<EmployeeDetails />} />
        <Route path="/background-checks/initiate" element={<InitiateBackgroundCheck />} />
        <Route path="/email-integration" element={<EmailIntegration />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/employee-management" element={<EmployeeManagement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default AuthenticatedApp;
