"use client";
import React, { useState } from 'react';
import { Settings, FileText, Globe, Users, Building, ShieldCheck, Bell, Upload, BarChart3, ClipboardList, UserPlus, X, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import ReportingModules from './components/ReportingModules';

// Card 1: Company Overview Component
const CompanyOverview = ({ onGenerateReport }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Bosch Manufacturing GmbH</h2>
          <p className="text-slate-600 mt-1">FY 2024 CSRD Report • Wave 1 Company</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition inline-flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button 
            onClick={onGenerateReport}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition"
          >
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mt-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-slate-900">87%</div>
          <div className="text-sm text-slate-600 mt-1">Overall Complete</div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full" style={{ width: '87%' }}></div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">1,043</div>
          <div className="text-sm text-slate-600 mt-1">Data Points Collected</div>
          <div className="text-xs text-slate-500 mt-1">of 1,200 required</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">11</div>
          <div className="text-sm text-slate-600 mt-1">Material Topics</div>
          <div className="text-xs text-slate-500 mt-1">E1-E5, S1, S2, G1</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">94%</div>
          <div className="text-sm text-slate-600 mt-1">Data Quality</div>
          <div className="text-xs text-green-600 mt-1">✓ Excellent</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600">18</div>
          <div className="text-sm text-slate-600 mt-1">Days Remaining</div>
          <div className="text-xs text-slate-500 mt-1">Due: Dec 31, 2025</div>
        </div>
      </div>
    </div>
  );
};

// Card 3: Tasks & Alerts Component
const TasksAlerts = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="font-bold text-lg text-slate-900 mb-4">Tasks & Alerts</h3>
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-slate-900 text-sm">Missing Scope 3 emissions data</p>
            <p className="text-xs text-slate-600 mt-1">45 data points required from upstream transportation</p>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2">Assign to team →</button>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-slate-900 text-sm">Assurance preparation due</p>
            <p className="text-xs text-slate-600 mt-1">Schedule audit kick-off meeting for Q1 2025</p>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2">Schedule meeting →</button>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-slate-900 text-sm">ESRS 2 review completed</p>
            <p className="text-xs text-slate-600 mt-1">Legal team approved governance disclosures</p>
            <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Card 4: Data Quality Component
const DataQuality = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-slate-900">Data Quality & Completeness</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View full report →</button>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">823</div>
          <div className="text-xs text-slate-600 mt-1">Validated</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">220</div>
          <div className="text-xs text-slate-600 mt-1">Pending Review</div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">157</div>
          <div className="text-xs text-slate-600 mt-1">Missing</div>
        </div>
        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <div className="text-2xl font-bold text-slate-600">1,200</div>
          <div className="text-xs text-slate-600 mt-1">Total Required</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-700">E1 Climate Change</span>
              <span className="text-sm text-slate-600">89/102 points</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full" style={{ width: '87%' }}></div>
            </div>
          </div>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Details</button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-700">S1 Own Workforce</span>
              <span className="text-sm text-slate-600">78/95 points</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-yellow-500 to-red-500 h-2 rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Details</button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-700">EU Taxonomy Alignment</span>
              <span className="text-sm text-slate-600">45/68 points</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '66%' }}></div>
            </div>
          </div>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Details</button>
        </div>
      </div>
    </div>
  );
};

// Quick Actions Component
const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="font-bold text-lg text-slate-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <button className="p-4 border-2 border-slate-200 hover:border-blue-500 rounded-xl transition text-left group">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-600 transition">
            <Upload className="w-5 h-5 text-blue-600 group-hover:text-white" />
          </div>
          <p className="font-medium text-slate-900 text-sm">Upload Data</p>
          <p className="text-xs text-slate-600 mt-1">Import CSV/Excel</p>
        </button>

        <button className="p-4 border-2 border-slate-200 hover:border-green-500 rounded-xl transition text-left group">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-600 transition">
            <BarChart3 className="w-5 h-5 text-green-600 group-hover:text-white" />
          </div>
          <p className="font-medium text-slate-900 text-sm">GHG Calculator</p>
          <p className="text-xs text-slate-600 mt-1">Calculate emissions</p>
        </button>

        <button className="p-4 border-2 border-slate-200 hover:border-purple-500 rounded-xl transition text-left group">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-600 transition">
            <ClipboardList className="w-5 h-5 text-purple-600 group-hover:text-white" />
          </div>
          <p className="font-medium text-slate-900 text-sm">Materiality Matrix</p>
          <p className="text-xs text-slate-600 mt-1">View assessment</p>
        </button>

        <button className="p-4 border-2 border-slate-200 hover:border-orange-500 rounded-xl transition text-left group">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-600 transition">
            <UserPlus className="w-5 h-5 text-orange-600 group-hover:text-white" />
          </div>
          <p className="font-medium text-slate-900 text-sm">Invite Team</p>
          <p className="text-xs text-slate-600 mt-1">Add collaborators</p>
        </button>
      </div>
    </div>
  );
};

// Main Dashboard Component
const ESGDashboard = () => {
  const handleGenerateReport = () => {
    alert('Report generation initiated! In production, this would:\n\n1. Validate all required data points\n2. Run AI narrative generation\n3. Assemble ESRS sections\n4. Apply XBRL tagging\n5. Generate 120-180 page PDF\n\nEstimated time: 3-5 minutes');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">ESG</span>
                </div>
                <div>
                  <h1 className="font-bold text-lg text-slate-900">ESG Pro</h1>
                  <p className="text-xs text-slate-500">CSRD Compliance Platform</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-6 text-sm">
                <a href="#" className="text-blue-600 font-medium">Dashboard</a>
                <a href="#" className="text-slate-600 hover:text-slate-900">Reports</a>
                <a href="#" className="text-slate-600 hover:text-slate-900">Analytics</a>
                <a href="#" className="text-slate-600 hover:text-slate-900">Team</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                <Bell className="w-5 h-5 text-slate-600" />
              </button>
              <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" className="w-8 h-8 rounded-lg" alt="User" />
                <span className="text-sm font-medium text-slate-700 pr-2">Anna Schmidt</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Card 1: Company Overview */}
        <CompanyOverview onGenerateReport={handleGenerateReport} />

        {/* Card 2: Reporting Modules - Will be in next step */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <h3 className="font-bold text-lg text-slate-900 mb-4">Reporting Modules</h3>
          {/* <p className="text-slate-600 text-sm">Module cards with modals will be added in the next step...</p> */}

          <ReportingModules />
        </div>

        {/* Cards 3 & 4: Tasks and Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <TasksAlerts />
          <QuickActions />
        </div>

        {/* Card 4: Data Quality */}
        <DataQuality />
      </div>
    </div>
  );
};

export default ESGDashboard;