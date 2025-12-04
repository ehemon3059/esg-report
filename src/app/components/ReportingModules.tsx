'use client';

import React, { useState } from 'react';

interface ModuleContent {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

interface ModuleContentMap {
  [key: string]: ModuleContent;
}

const ReportingModules: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentModule, setCurrentModule] = useState<string | null>(null);

  // Module content templates
  const moduleContent: ModuleContentMap = {
    esrs2: {
      title: 'ESRS 2: General Disclosures',
      subtitle: 'Mandatory foundation disclosures for all companies',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-blue-900 mb-2">🔒 Mandatory Module - No Materiality Exemption</h4>
            <p className="text-sm text-blue-800">All ESRS 2 disclosures must be completed regardless of materiality assessment results.</p>
          </div>

          <div className="border border-slate-200 rounded-lg p-6 text-black">
            <h4 className="font-bold text-lg mb-4">Basis for Preparation</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Reporting Period</label>
                <input 
                  type="month" 
                  defaultValue="2024-12" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Consolidation Scope</label>
                <textarea 
                  rows={3} 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="List all consolidated entities and their ownership percentages..." 
                />
                <p className="text-xs text-slate-500 mt-1">Include subsidiaries, associates, and joint ventures</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Value Chain Boundaries</label>
                <textarea 
                  rows={3} 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Define upstream and downstream boundaries..." 
                />
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-6 text-black">
            <h4 className="font-bold text-lg mb-4">Governance (GOV-1 to GOV-5)</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Board Role in Sustainability</label>
                <textarea 
                  rows={4} 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Describe board responsibilities, committees, reporting lines..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">ESG Integration in Remuneration (%)</label>
                <input 
                  type="number" 
                  min="0" 
                  max="100" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="e.g., 25" 
                />
                <p className="text-xs text-slate-500 mt-1">Percentage of variable pay tied to ESG KPIs</p>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-6 text-black">
            <h4 className="font-bold text-lg mb-4">Double Materiality Assessment Summary</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Assessment Process</label>
                <textarea 
                  rows={3} 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Describe methodology, stakeholder engagement process..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Material Topics Identified</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">E1: Climate Change</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">E2: Pollution</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">S1: Own Workforce</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">G1: Business Conduct</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    environmental: {
      title: 'Environmental Topics (E1-E5)',
      subtitle: 'Climate, pollution, water, biodiversity, circular economy',
      content: (
        <div className="space-y-6 text-black">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">Complete only for topics determined as material in your double materiality assessment.</p>
          </div>

          <div className="border-2 border-green-500 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-lg">E1 - Climate Change</h4>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">✓ Material</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Climate Policy</label>
                <textarea 
                  rows={3} 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500" 
                  placeholder="Describe climate change policy and commitments..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Reduction Target</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 text-black" 
                  placeholder="e.g., -50% Scope 1+2 by 2030 vs 2023" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Scope 1 Emissions (tCO₂e)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500" 
                  placeholder="12500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Scope 2 Emissions (tCO₂e)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500" 
                  placeholder="8300" 
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold mb-3">E2 - Pollution</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">NOx Emissions (t/year)</label>
                  <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">SOx Emissions (t/year)</label>
                  <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold mb-3">E3 - Water & Marine</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Water Withdrawal (m³)</label>
                  <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Water Recycling Rate (%)</label>
                  <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold mb-3">E4 - Biodiversity</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Protected Areas Impact</label>
                  <textarea rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold mb-3">E5 - Circular Economy</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Recycling Rate (%)</label>
                  <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Recycled Input Materials (%)</label>
                  <input type="number" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    social: {
      title: 'Social Topics (S1-S4)',
      subtitle: 'Workforce, value chain, communities, consumers',
      content: (
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">Complete only for topics determined as material in your double materiality assessment.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold text-purple-600 mb-3">S1 — Own Workforce</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Employee count by contract & gender</label>
                  <textarea 
                    rows={2} 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 text-black" 
                    placeholder="e.g., Full-time: 850 (M:520, F:330), Part-time: 150 (M:60, F:90)" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Health & safety (LTIFR, fatalities)</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 text-black" 
                    placeholder="LTIFR: 2.5, Fatalities: 0" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Training hours per employee</label>
                  <input 
                    type="number" 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 text-black" 
                    placeholder="32" 
                  />
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold text-purple-600 mb-3">S2 — Workers in the Value Chain</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">% Suppliers audited for social compliance</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 text-black" 
                    placeholder="78" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Remediation / corrective actions</label>
                  <textarea 
                    rows={2} 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 text-black" 
                    placeholder="Describe corrective action plans implemented..." 
                  />
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold text-purple-600 mb-3">S3 — Affected Communities</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Community engagement programs</label>
                  <textarea 
                    rows={2} 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 text-black" 
                    placeholder="List engagement initiatives and stakeholder dialogue forums..." 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Complaints & outcomes</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 text-black" 
                    placeholder="15 complaints received, 14 resolved" 
                  />
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold text-purple-600 mb-3">S4 — Consumers & End Users</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Product safety incidents</label>
                  <input 
                    type="number" 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 text-black" 
                    placeholder="2" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Consumer remediation actions</label>
                  <textarea 
                    rows={2} 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 text-black" 
                    placeholder="Describe recalls, compensation, or corrective measures..." 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    governance: {
      title: 'Governance (G1)',
      subtitle: 'Business conduct, anti-corruption, ethics',
      content: (
        <div className="space-y-6">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h4 className="font-bold text-indigo-900 mb-2">🛡️ Governance & Ethics</h4>
            <p className="text-sm text-indigo-800">Disclose board structure, business conduct policies, anti-corruption measures, and ESG oversight mechanisms.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold text-indigo-600 mb-3">Board Structure & Independence</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Board composition & independence</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 text-black" 
                    placeholder="e.g., 12 members, 8 independent (67%)" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Gender diversity on board (%)</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 text-black" 
                    placeholder="42" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">ESG oversight (committees & KPIs)</label>
                  <textarea 
                    rows={3} 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 text-black" 
                    placeholder="Describe sustainability committee, ESG KPIs in exec compensation..." 
                  />
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold text-indigo-600 mb-3">Business Conduct & Compliance</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Whistleblower channels & cases</label>
                  <textarea 
                    rows={2} 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 text-black" 
                    placeholder="Number of reports received, investigated, substantiated..." 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Anti-corruption policies & trainings</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 text-black" 
                    placeholder="98% employees trained, 0 incidents" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Related-party transactions & controls</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 text-black" 
                    placeholder="Describe approval processes and controls" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    taxonomy: {
      title: 'EU Taxonomy',
      subtitle: 'Alignment assessment, DNSH, safeguards',
      content: (
        <div className="space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-bold text-orange-900 mb-2">🌍 EU Taxonomy Regulation</h4>
            <p className="text-sm text-orange-800">Report the proportion of taxonomy-eligible and taxonomy-aligned activities across revenue, CapEx, and OpEx. Demonstrate DNSH compliance and minimum social safeguards.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold text-orange-600 mb-3">Economic Activities Mapping</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">List of economic activities (taxonomy)</label>
                  <textarea 
                    rows={3} 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500 text-black" 
                    placeholder="NACE/CPA code, activity name, % revenue, e.g.,&#10;3.3 Manufacture of low carbon technologies: 35%&#10;7.3 Installation of energy efficiency equipment: 12%" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Taxonomy-eligible revenue (%)</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500 text-black" 
                    placeholder="47" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Taxonomy-aligned revenue (%)</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500 text-black" 
                    placeholder="38" 
                  />
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold text-orange-600 mb-3">DNSH & Safeguards</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Technical screening criteria met</label>
                  <textarea 
                    rows={2} 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500 text-black" 
                    placeholder="Summarize how substantial contribution criteria are met..." 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">DNSH (Do No Significant Harm) checks</label>
                  <select className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500 text-black">
                    <option>All objectives checked & passed</option>
                    <option>Some objectives not met</option>
                    <option>Assessment in progress</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Minimum social safeguards compliance</label>
                  <select className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500 text-black">
                    <option>Yes - Full compliance</option>
                    <option>No - Non-compliance identified</option>
                    <option>Partial - Remediation ongoing</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-3">CapEx & OpEx Alignment</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Taxonomy-eligible CapEx (%)</label>
                <input 
                  type="number" 
                  min="0" 
                  max="100" 
                  className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500 text-black" 
                  placeholder="52" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Taxonomy-aligned CapEx (%)</label>
                <input 
                  type="number" 
                  min="0" 
                  max="100" 
                  className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500 text-black" 
                  placeholder="45" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Taxonomy-aligned OpEx (%)</label>
                <input 
                  type="number" 
                  min="0" 
                  max="100" 
                  className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500 text-black" 
                  placeholder="28" 
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    assurance: {
      title: 'Assurance',
      subtitle: 'Limited assurance preparation & documentation',
      content: (
        <div className="space-y-6">
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
            <h4 className="font-bold text-pink-900 mb-2">🔍 External Assurance</h4>
            <p className="text-sm text-pink-800">CSRD requires limited assurance from 2024 (transitioning to reasonable assurance). Document assurance scope, provider, conclusions, and any identified misstatements.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold text-pink-600 mb-3">Assurance Engagement Details</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Assurance provider</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-pink-500 text-black" 
                    placeholder="e.g., PwC, Deloitte, EY, KPMG" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Scope of assurance</label>
                  <select className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-pink-500 text-black">
                    <option>Limited assurance</option>
                    <option>Reasonable assurance</option>
                    <option>Mixed (limited + reasonable)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Reporting standards applied</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-pink-500 text-black" 
                    placeholder="e.g., ISAE 3000, AA1000AS" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Assurance conclusion summary</label>
                  <textarea 
                    rows={3} 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-pink-500 text-black" 
                    placeholder="Summarize auditor's opinion and any qualifications or emphasis of matter..." 
                  />
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold text-pink-600 mb-3">Documentation & Findings</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Upload assurance report (PDF)</label>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100" 
                  />
                  <p className="text-xs text-slate-500 mt-1">Independent assurance report must be included in annual report</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Material misstatements identified</label>
                  <textarea 
                    rows={2} 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-pink-500 text-black" 
                    placeholder="List any material misstatements or control deficiencies identified by auditors..." 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Management response</label>
                  <textarea 
                    rows={2} 
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 text-sm focus:ring-2 focus:ring-pink-500 text-black" 
                    placeholder="Describe corrective actions taken in response to findings..." 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-2">Assurance Readiness Checklist</h4>
            <div className="grid md:grid-cols-2 gap-3 text-black">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-slate-300 text-pink-600 focus:ring-pink-500" />
                <span>Data collection processes documented</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-slate-300 text-pink-600 focus:ring-pink-500" />
                <span>Internal controls tested</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-slate-300 text-pink-600 focus:ring-pink-500" />
                <span>Source documentation trail complete</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-slate-300 text-pink-600 focus:ring-pink-500" />
                <span>Calculation methodologies validated</span>
              </label>
            </div>
          </div>
        </div>
      )
    }
  };

  const openModule = (moduleId: string): void => {
    setCurrentModule(moduleId);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const generateReport = (): void => {
    alert('Report generation initiated! In production, this would:\n\n1. Validate all required data points\n2. Run AI narrative generation\n3. Assemble ESRS sections\n4. Apply XBRL tagging\n5. Generate 120-180 page PDF\n\nEstimated time: 3-5 minutes');
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h3 className="font-bold text-lg text-slate-900 mb-4">Reporting Modules</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ESRS 2 Module */}
          <button 
            onClick={() => openModule('esrs2')} 
            className="module-card text-left p-4 border-2 border-slate-200 hover:border-blue-500 rounded-xl transition group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">MANDATORY</span>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">ESRS 2 General Disclosures</h4>
            <p className="text-sm text-slate-600 mb-3">Governance, strategy, materiality assessment</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-600">98% Complete</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-slate-500">204 data points</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
              <div className="bg-green-500 h-1.5 rounded-full" style={{width: '98%'}}></div>
            </div>
          </button>

          {/* Environmental Module */}
          <button 
            onClick={() => openModule('environmental')} 
            className="module-card text-left p-4 border-2 border-slate-200 hover:border-green-500 rounded-xl transition group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition">
                <svg className="w-6 h-6 text-green-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded">MATERIAL</span>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Environmental (E1-E5)</h4>
            <p className="text-sm text-slate-600 mb-3">Climate, pollution, water, biodiversity, circular economy</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-yellow-600">85% Complete</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-slate-500">367/432 points</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
              <div className="bg-yellow-500 h-1.5 rounded-full" style={{width: '85%'}}></div>
            </div>
          </button>

          {/* Social Module */}
          <button 
            onClick={() => openModule('social')} 
            className="module-card text-left p-4 border-2 border-slate-200 hover:border-purple-500 rounded-xl transition group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition">
                <svg className="w-6 h-6 text-purple-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded">MATERIAL</span>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Social (S1-S4)</h4>
            <p className="text-sm text-slate-600 mb-3">Workforce, value chain, communities, consumers</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-yellow-600">86% Complete</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-slate-500">342/398 points</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
              <div className="bg-yellow-500 h-1.5 rounded-full" style={{width: '86%'}}></div>
            </div>
          </button>

          {/* Governance Module */}
          <button 
            onClick={() => openModule('governance')} 
            className="module-card text-left p-4 border-2 border-slate-200 hover:border-indigo-500 rounded-xl transition group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition">
                <svg className="w-6 h-6 text-indigo-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded">MATERIAL</span>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Governance (G1)</h4>
            <p className="text-sm text-slate-600 mb-3">Business conduct, anti-corruption, ethics</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-600">91% Complete</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-slate-500">151/166 points</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
              <div className="bg-green-500 h-1.5 rounded-full" style={{width: '91%'}}></div>
            </div>
          </button>

          {/* EU Taxonomy Module */}
          <button 
            onClick={() => openModule('taxonomy')} 
            className="module-card text-left p-4 border-2 border-slate-200 hover:border-orange-500 rounded-xl transition group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition">
                <svg className="w-6 h-6 text-orange-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">REQUIRED</span>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">EU Taxonomy</h4>
            <p className="text-sm text-slate-600 mb-3">Alignment assessment, DNSH, safeguards</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-yellow-600">78% Complete</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse-slow"></div>
                <span className="text-xs text-slate-500">In progress</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
              <div className="bg-yellow-500 h-1.5 rounded-full" style={{width: '78%'}}></div>
            </div>
          </button>

          {/* Assurance Module */}
          <button 
            onClick={() => openModule('assurance')} 
            className="module-card text-left p-4 border-2 border-slate-200 hover:border-pink-500 rounded-xl transition group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-600 transition">
                <svg className="w-6 h-6 text-pink-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">REQUIRED</span>
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Assurance</h4>
            <p className="text-sm text-slate-600 mb-3">Limited assurance preparation & documentation</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-red-600">65% Complete</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse-slow"></div>
                <span className="text-xs text-slate-500">Needs attention</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
              <div className="bg-red-500 h-1.5 rounded-full" style={{width: '65%'}}></div>
            </div>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div id="moduleModal" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h2 id="modalTitle" className="text-2xl font-bold text-slate-900">
                  {currentModule && moduleContent[currentModule].title}
                </h2>
                <p id="modalSubtitle" className="text-sm text-slate-600 mt-1">
                  {currentModule && moduleContent[currentModule].subtitle}
                </p>
              </div>
              <button 
                onClick={closeModal}
                className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-100 transition"
              >
                <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div id="modalContent" className="p-6 overflow-y-auto flex-1">
              {currentModule && moduleContent[currentModule].content}
            </div>
            
            <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center gap-4">
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition text-black"
                >
                  Save Draft
                </button>
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
                >
                  Close
                </button>
              </div>
              <button 
                id="generateReportBtn"
                onClick={generateReport}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportingModules;