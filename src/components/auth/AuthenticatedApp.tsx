
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Upload from "@/pages/Upload";
import TalentSearch from "@/pages/Search";
import CandidateDetail from "@/pages/CandidateDetail";
import Dashboard from "@/pages/Dashboard";
import EmailSetup from "@/pages/EmailSetup";
import Payment from "@/pages/Payment";
import NotFound from "@/pages/NotFound";
import { SidebarProvider } from "@/components/ui/sidebar";

const AuthenticatedApp = () => {
  return (
    <SidebarProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/search" element={<TalentSearch />} />
          <Route path="/candidates/:id" element={<CandidateDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/email-setup" element={<EmailSetup />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </SidebarProvider>
  );
};

export default AuthenticatedApp;
