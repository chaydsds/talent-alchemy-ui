
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { UserButton } from '@clerk/clerk-react';
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Upload from "@/pages/Upload";
import TalentSearch from "@/pages/Search";
import CandidateDetail from "@/pages/CandidateDetail";
import Dashboard from "@/pages/Dashboard";
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default AuthenticatedApp;
