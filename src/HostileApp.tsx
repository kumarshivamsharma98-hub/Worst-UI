import React, { useState } from 'react';
import { 
  AlertTriangle, 
  User, 
  CheckCircle2, 
  ChevronRight, 
  Sprout
} from 'lucide-react';

export const HostileApp: React.FC = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'advisory-flow' | 'history' | 'profile' | 'settings' | 'auth'>('dashboard');
  
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>('farmer_john_99@agri-corp.local');
  const [loginInputEmail, setLoginInputEmail] = useState<string>('');
  const [loginInputPassword, setLoginInputPassword] = useState<string>('');

  // Form State
  const [formStep, setFormStep] = useState<number>(1);
  const [confirmStepCount, setConfirmStepCount] = useState<number>(0);
  
  // Field values
  const [region, setRegion] = useState<string>('North Midwest');
  const [soilType, setSoilType] = useState<string>('Clay Loam');
  const [phLevel, setPhLevel] = useState<number>(6.5);
  const [season, setSeason] = useState<string>('Spring');
  const [irrigation, setIrrigation] = useState<string>('Drip');
  const [farmSize, setFarmSize] = useState<number>(50);
  const budget = 'Medium';

  // Search Fake State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchClicked, setSearchClicked] = useState<boolean>(false);

  // Status & Loading State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState<number>(0);
  const [advisoryResult, setAdvisoryResult] = useState<any>(null);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  // Severe alarming error state demo
  const [validationError, setValidationError] = useState<string | null>(null);

  // Advisories history
  const [historyList, setHistoryList] = useState<any[]>([
    {
      id: 'adv_88329',
      date: '2026-09-28',
      crop: 'Winter Wheat (Triticum aestivum)',
      confidence: 0.96,
      status: 'CALCULATED_VALIDATED'
    }
  ]);

  const loadingMessages = [
    "Consulting agricultural intelligence infrastructure...",
    "Interrogating soil chemical vectors...",
    "Calibrating macro-climate precipitation matrices...",
    "Running Zod strict runtime structural schema verification...",
    "Querying Gemini 2.5 flash inference endpoints...",
    "Finalizing enterprise agricultural report..."
  ];

  // Handlers
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchClicked(true);
    setTimeout(() => setSearchClicked(false), 4000);
  };

  const handleStartForm = () => {
    if (confirmStepCount < 2) {
      setConfirmStepCount(prev => prev + 1);
      return;
    }
    setFormStep(1);
    setActiveTab('advisory-flow');
  };

  const handleGenerateAdvisory = async () => {
    if (!region || !soilType || !season) {
      setValidationError("CRITICAL AGRICULTURAL DATA PROCESSING FAILURE: INPUT STATE INVALID (0x8849F)");
      return;
    }

    setValidationError(null);
    setIsGenerating(true);
    
    // Cycle fake loading messages
    let msgIdx = 0;
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % loadingMessages.length;
      setLoadingTextIndex(msgIdx);
    }, 700);

    try {
      const response = await fetch('/api/advisory/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          region,
          soilType,
          phLevel: Number(phLevel),
          season,
          irrigation,
          farmSizeAcres: Number(farmSize),
          targetBudget: budget
        })
      });

      const resData = await response.json();
      clearInterval(interval);
      setIsGenerating(false);

      if (resData.success) {
        setAdvisoryResult(resData.data);
        setHistoryList(prev => [
          {
            id: resData.data.id,
            date: new Date().toISOString().split('T')[0],
            crop: resData.data.recommendedCrop,
            confidence: resData.data.confidenceScore,
            status: resData.data.status
          },
          ...prev
        ]);
        setFormStep(5); // Step 5: Post-calculation holding screen
      } else {
        setValidationError(`CRITICAL SYSTEM FAULT: ${resData.message || 'UNSPECIFIED_FAILURE'}`);
      }
    } catch (err: any) {
      clearInterval(interval);
      setIsGenerating(false);
      setValidationError("CRITICAL FATAL NETWORK ANOMALY DETECTED: SERVER UNREACHABLE OR TIMED OUT");
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginInputEmail || !loginInputPassword) {
      setValidationError("CRITICAL AUTHENTICATION SECURITY FAILURE: NULL CREDENTIAL SPECIFIED");
      return;
    }
    setIsLoggedIn(true);
    setUserEmail(loginInputEmail);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f7f5ed] text-[#2b2b2b] font-mono text-sm flex flex-col justify-between selection:bg-yellow-300 selection:text-red-900 border-8 border-yellow-500">
      
      {/* --- RAGEBAIT HEADER & DECORATIVE TOP MARQUEE --- */}
      <div className="bg-red-800 text-yellow-300 text-xs py-1 px-2 overflow-hidden font-bold tracking-widest border-b-4 border-black">
        <div className="marquee-text">
          ⚠️ ATTENTION AGRICULTURAL OPERATOR: SYSTEM LOG LEVEL = VERBOSE // RLS POLICIES ENFORCED // ENSURE ALL 18 PHASES OF FORM ENTRY ARE COMPLETED IN TRIPLICATE // DO NOT PRESS REFRESH //
        </div>
      </div>

      {/* Confusing Multi-tier Inconsistent Header */}
      <header className="bg-emerald-900 text-white p-4 shadow-2xl border-b-8 border-lime-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-full rotate-12 border-2 border-black animate-bounce">
              <Sprout className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-extrabold tracking-tighter text-yellow-300 uppercase underline decoration-wavy decoration-red-500">
                AI-AGRI-CROP-ADVISORY-SYSTEM_v4.2.9-FINAL
              </h1>
              <p className="text-[10px] text-emerald-200">
                Official Enterprise Multi-Spectral Advisory Engine & Database Management Portal
              </p>
            </div>
          </div>

          {/* Excessive Search decorative component that doesn't actually filter */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Search Crop Advisory Portal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-emerald-950 text-yellow-200 text-xs px-3 py-2 pr-16 rounded-none border-2 border-dashed border-yellow-400 focus:outline-none focus:bg-black w-64"
            />
            <button 
              type="submit" 
              className="absolute right-1 bg-yellow-400 text-black px-2 py-1 text-[10px] font-bold hover:bg-yellow-300 border border-black"
            >
              SEARCH
            </button>
          </form>

          {/* User Profile Quick status */}
          <div className="flex items-center gap-2 text-xs bg-emerald-950 p-2 border border-emerald-600 rounded-lg">
            <User className="w-4 h-4 text-lime-400" />
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400">AUTHENTICATED OPERATOR:</span>
              <span className="font-bold text-yellow-300">{isLoggedIn ? userEmail : 'GUEST_ANONYMOUS'}</span>
            </div>
            {isLoggedIn ? (
              <button 
                onClick={() => setIsLoggedIn(false)} 
                className="ml-2 text-[10px] bg-red-700 hover:bg-red-600 text-white px-2 py-1 border border-black"
              >
                LOGOUT
              </button>
            ) : (
              <button 
                onClick={() => setActiveTab('auth')} 
                className="ml-2 text-[10px] bg-green-600 text-white px-2 py-1 border border-black"
              >
                LOGIN
              </button>
            )}
          </div>
        </div>

        {/* Decorative Fake Search Warning Banner */}
        {searchClicked && (
          <div className="mt-2 bg-yellow-400 text-black text-center text-xs py-1 border-2 border-red-600 font-bold animate-pulse">
            ⚠️ NOTICE: GLOBAL PORTAL SEARCH IS CURRENTLY DECORATIVE AND UNINDEXED. PLEASE NAVIGATE MANUALLY USING THE SUB-TIER TREE BELOW.
          </div>
        )}
      </header>

      {/* --- EXCESSIVE REDUNDANT BREADCRUMBS --- */}
      <div className="bg-amber-100 border-b-2 border-amber-400 px-4 py-1 text-[11px] text-amber-900 flex flex-wrap items-center gap-1 overflow-x-auto">
        <span className="font-bold text-red-700">PATH:</span>
        <span className="underline cursor-pointer hover:text-black" onClick={() => setActiveTab('dashboard')}>Home</span>
        <ChevronRight className="w-3 h-3 text-amber-600" />
        <span className="underline cursor-pointer hover:text-black" onClick={() => setActiveTab('dashboard')}>Dashboard</span>
        <ChevronRight className="w-3 h-3 text-amber-600" />
        <span>Agriculture</span>
        <ChevronRight className="w-3 h-3 text-amber-600" />
        <span>Crop Module</span>
        <ChevronRight className="w-3 h-3 text-amber-600" />
        <span className="underline cursor-pointer hover:text-black" onClick={() => setActiveTab('advisory-flow')}>New Advisory Workflow</span>
        <ChevronRight className="w-3 h-3 text-amber-600" />
        <span className="bg-amber-300 font-bold px-1">{activeTab.toUpperCase()}</span>
      </div>

      {/* --- NAVIGATION MENU WITH AMBIGUOUS LABELS & CONFUSING LAYOUT --- */}
      <nav className="bg-slate-800 text-slate-200 border-b-4 border-slate-900 p-2 flex flex-wrap justify-center gap-3 text-xs">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 border-2 font-bold transition-all ${
            activeTab === 'dashboard' 
              ? 'bg-yellow-400 text-black border-red-600 translate-y-1 shadow-inner' 
              : 'bg-slate-700 hover:bg-slate-600 border-slate-500'
          }`}
        >
          📊 CENTRAL COMMAND (Dashboard)
        </button>

        <button 
          onClick={() => setActiveTab('advisory-flow')}
          className={`px-4 py-2 border-2 font-bold transition-all ${
            activeTab === 'advisory-flow' 
              ? 'bg-yellow-400 text-black border-red-600 translate-y-1 shadow-inner' 
              : 'bg-slate-700 hover:bg-slate-600 border-slate-500'
          }`}
        >
          🌱 INITIATE CROP ADVISORY PROTOCOL
        </button>

        <button 
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 border-2 font-bold transition-all ${
            activeTab === 'history' 
              ? 'bg-yellow-400 text-black border-red-600 translate-y-1 shadow-inner' 
              : 'bg-slate-700 hover:bg-slate-600 border-slate-500'
          }`}
        >
          📜 HISTORICAL ARCHIVES & RECORDS
        </button>

        <button 
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 border-2 font-bold transition-all ${
            activeTab === 'profile' 
              ? 'bg-yellow-400 text-black border-red-600 translate-y-1 shadow-inner' 
              : 'bg-slate-700 hover:bg-slate-600 border-slate-500'
          }`}
        >
          👤 OPERATOR SPECIFICATIONS (Profile)
        </button>

        <button 
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 border-2 font-bold transition-all ${
            activeTab === 'settings' 
              ? 'bg-yellow-400 text-black border-red-600 translate-y-1 shadow-inner' 
              : 'bg-slate-700 hover:bg-slate-600 border-slate-500'
          }`}
        >
          ⚙️ SUBSYSTEM PREFERENCES
        </button>

        <button 
          onClick={() => setActiveTab('auth')}
          className={`px-4 py-2 border-2 font-bold transition-all ${
            activeTab === 'auth' 
              ? 'bg-yellow-400 text-black border-red-600 translate-y-1 shadow-inner' 
              : 'bg-slate-700 hover:bg-slate-600 border-slate-500'
          }`}
        >
          🔒 SECURITY CREDS
        </button>
      </nav>

      {/* --- DRAMATIC ALARMING ERROR DISPLAY IF TRIGGERED --- */}
      {validationError && (
        <div className="bg-red-600 text-white p-4 m-4 border-4 border-black shadow-2xl animate-bounce">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-10 h-10 text-yellow-300 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-widest text-yellow-300">
                ⚠️ CRITICAL SYSTEM FAULT & TERMINATION WARNING ⚠️
              </h2>
              <p className="text-sm font-mono mt-1 bg-black p-2 border border-red-400">
                {validationError}
              </p>
            </div>
            <button 
              onClick={() => setValidationError(null)}
              className="ml-auto bg-yellow-400 text-black px-3 py-1 text-xs font-bold border-2 border-black hover:bg-yellow-300"
            >
              DISMISS ERROR LOG
            </button>
          </div>
        </div>
      )}

      {/* --- MAIN CONTENT CONTAINER --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-6">

        {/* ============================================================== */}
        {/* ROUTE 1: DASHBOARD                                             */}
        {/* ============================================================== */}
        {activeTab === 'dashboard' && (
          <div className="flex flex-col gap-6">
            
            {/* Confusing Banner */}
            <div className="bg-emerald-100 border-4 border-emerald-700 p-6 rounded-none relative shadow-xl">
              <span className="absolute -top-3 right-4 bg-emerald-800 text-white px-2 py-0.5 text-[10px] uppercase font-bold">
                SYSTEM OPERATIONAL STATUS: OVERLOADED
              </span>
              <h2 className="text-2xl font-black text-emerald-950 uppercase mb-2">
                AGRICULTURAL TELEMETRY & ADVISORY CONTROL PANEL
              </h2>
              <p className="text-xs text-emerald-800 max-w-3xl">
                Welcome to the primary crop optimization terminal. To initiate an AI evaluation request, locate the tiny action link below or navigate through the multi-stage setup workflow.
              </p>
            </div>

            {/* Oversized & Inconsistent Category Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-yellow-50 border-4 border-dashed border-yellow-600 p-8 flex flex-col justify-between h-72 shadow-lg hover:bg-yellow-100 transition-all">
                <div>
                  <div className="text-4xl mb-2">🌽</div>
                  <h3 className="text-lg font-black text-yellow-950 uppercase">Cereal & Grain Crops</h3>
                  <p className="text-xs text-yellow-800 mt-2">
                    Corn, Wheat, Barley, Oat & Cereal metrics. Requires soil pH between 5.8 - 7.2 for optimal yield calculation.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setSoilType('Clay Loam');
                    setActiveTab('advisory-flow');
                  }}
                  className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-xs py-3 px-4 border-2 border-black text-center uppercase tracking-wider"
                >
                  START GRAIN ADVISORY NOW →
                </button>
              </div>

              <div className="bg-lime-50 border-4 border-solid border-lime-700 p-4 flex flex-col justify-between h-96 shadow-xl">
                <div>
                  <div className="text-6xl mb-2">🥦</div>
                  <h3 className="text-2xl font-black text-lime-950 underline">Horticulture & Vegetables</h3>
                  <p className="text-xs text-lime-800 mt-4 leading-relaxed">
                    High value vegetable cultivars. Drip irrigation recommended. Soil moisture vectors analyzed via neural algorithms.
                  </p>
                </div>
                <div className="mt-4 p-2 bg-lime-200 border border-lime-500 text-[10px]">
                  💡 TIP: Ensure farm area is accurately specified in acres or hectares.
                </div>
                <button 
                  onClick={() => {
                    setSoilType('Silt Loam');
                    setActiveTab('advisory-flow');
                  }}
                  className="mt-2 bg-lime-700 text-white font-bold text-xs py-2 px-2 border border-black hover:bg-lime-800"
                >
                  SELECT HORTICULTURE PROTOCOL
                </button>
              </div>

              <div className="bg-amber-100 border-8 border-double border-amber-900 p-3 flex flex-col justify-between h-64">
                <div>
                  <div className="text-xl mb-1">🌱</div>
                  <h3 className="text-sm font-bold text-amber-900">Legumes & Pulses</h3>
                  <p className="text-[11px] text-amber-800">
                    Nitrogen-fixing organic crop options for soil remediation.
                  </p>
                </div>
                {/* Tiny hidden text link instead of a button */}
                <div className="mt-6 text-right">
                  <span 
                    onClick={() => {
                      setSoilType('Sandy Loam');
                      setActiveTab('advisory-flow');
                    }}
                    className="text-[10px] text-blue-800 underline font-bold cursor-pointer hover:text-red-600 bg-amber-200 p-1 border border-blue-400"
                  >
                    click here to open pulse advisory link (step 1 of 14)
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Actions Panel with Inconsistent Button Styles */}
            <div className="bg-slate-900 text-white p-6 border-4 border-slate-700">
              <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-4">
                FAST-TRACK ACTIONS & ADVISORY INITIATION
              </h3>
              
              <div className="flex flex-wrap gap-4 items-center">
                
                {/* Multi-step click trigger for rage bait requirement */}
                <div className="bg-slate-800 p-4 border border-slate-600 flex flex-col gap-2">
                  <span className="text-xs text-slate-300 font-bold">Standard Advisory Flow Launch:</span>
                  {confirmStepCount === 0 && (
                    <button 
                      onClick={handleStartForm} 
                      className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold px-6 py-3 text-xs border-2 border-black"
                    >
                      BEGIN ADVISORY REQUEST (1/3)
                    </button>
                  )}

                  {confirmStepCount === 1 && (
                    <button 
                      onClick={handleStartForm} 
                      className="bg-orange-500 hover:bg-orange-400 text-black font-extrabold px-6 py-3 text-xs border-2 border-black animate-pulse"
                    >
                      ARE YOU SURE YOU WANT TO START? CONFIRM (2/3)
                    </button>
                  )}

                  {confirmStepCount >= 2 && (
                    <button 
                      onClick={handleStartForm} 
                      className="bg-red-500 hover:bg-red-400 text-white font-extrabold px-6 py-3 text-xs border-2 border-black"
                    >
                      FINAL CONFIRMATION: PROCEED TO FORM (3/3)
                    </button>
                  )}
                </div>

                <div className="bg-slate-800 p-4 border border-slate-600 flex flex-col gap-2">
                  <span className="text-xs text-slate-300 font-bold">View Saved Telemetry Logs:</span>
                  <button 
                    onClick={() => setActiveTab('history')} 
                    className="bg-sky-600 hover:bg-sky-500 text-white text-xs px-4 py-2 border border-sky-300"
                  >
                    ACCESS HISTORICAL RECORDS
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}


        {/* ============================================================== */}
        {/* ROUTE 2: CROP ADVISORY MULTI-STEP FORM                         */}
        {/* ============================================================== */}
        {activeTab === 'advisory-flow' && (
          <div className="bg-white border-4 border-black p-6 shadow-2xl">
            
            {/* Confusing Secondary Progress Indicator */}
            <div className="mb-6 bg-gray-100 p-4 border-2 border-gray-400">
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
                <span>FORM STEP: {formStep} OF 5</span>
                <span>COMPLETION PROBABILITY: {formStep * 20}%</span>
              </div>
              <div className="w-full bg-gray-300 h-4 border border-black p-0.5">
                <div 
                  className="bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 h-full transition-all duration-300"
                  style={{ width: `${formStep * 20}%` }}
                />
              </div>
              <div className="text-[10px] text-gray-500 mt-1 flex justify-between">
                <span>Step 1: Region</span>
                <span>Step 2: Soil Specs</span>
                <span>Step 3: Seasonal Matrix</span>
                <span>Step 4: Confirmation</span>
                <span>Step 5: Execution</span>
              </div>
            </div>

            {/* STEP 1: REGION & LOCATION */}
            {formStep === 1 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold bg-yellow-300 p-2 border border-black uppercase">
                  SECTION A-1: GEOGRAPHIC & REGIONAL VECTOR SELECTION
                </h3>
                <p className="text-xs text-gray-600">
                  Select the primary geographic zone corresponding to the agricultural field boundary.
                </p>

                <div className="flex flex-col gap-2 max-w-md">
                  <label className="text-xs font-bold uppercase">TARGET REGIONAL ZONE (*REQUIRED):</label>
                  <select 
                    value={region} 
                    onChange={(e) => setRegion(e.target.value)}
                    className="p-3 bg-yellow-50 border-2 border-black text-xs font-bold focus:bg-white"
                  >
                    <option value="North Midwest">North Midwest (Temperate / Loam)</option>
                    <option value="Pacific Northwest">Pacific Northwest (High Rainfall)</option>
                    <option value="Southern Sunbelt">Southern Sunbelt (Arid / Warm)</option>
                    <option value="Eastern Valley">Eastern Valley (Clay Heavy)</option>
                  </select>
                </div>

                <div className="mt-8 flex justify-end">
                  <button 
                    onClick={() => setFormStep(2)}
                    className="bg-green-600 hover:bg-green-500 text-white font-extrabold px-8 py-3 text-xs border-2 border-black shadow-lg"
                  >
                    CONTINUE TO NEXT SECTION →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SOIL & HYDROLIC SPECS */}
            {formStep === 2 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold bg-lime-300 p-2 border border-black uppercase">
                  SECTION B-4: SOIL CHEMICAL & PH PARAMETERS
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase">SOIL TAXONOMY TYPE:</label>
                    <select 
                      value={soilType} 
                      onChange={(e) => setSoilType(e.target.value)}
                      className="p-3 bg-lime-50 border-2 border-black text-xs font-bold"
                    >
                      <option value="Clay Loam">Clay Loam (High Retention)</option>
                      <option value="Silt Loam">Silt Loam (Balanced)</option>
                      <option value="Sandy Loam">Sandy Loam (Fast Drainage)</option>
                      <option value="Peat Heavy">Peat Heavy (High Organic Content)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase">SOIL pH LEVEL: [{phLevel}]</label>
                    <input 
                      type="range" 
                      min="4.0" 
                      max="9.0" 
                      step="0.1" 
                      value={phLevel}
                      onChange={(e) => setPhLevel(parseFloat(e.target.value))}
                      className="w-full accent-green-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500">
                      <span>4.0 (Acidic)</span>
                      <span>7.0 (Neutral)</span>
                      <span>9.0 (Alkaline)</span>
                    </div>
                  </div>

                </div>

                {/* Random helper text placed far away from relevant fields */}
                <div className="mt-6 p-3 bg-yellow-100 border border-yellow-500 text-[10px] text-yellow-900">
                  ℹ️ HELPER NOTE (REFERENCING STEP 1): Region choices made in section A-1 will affect default nitrogen absorption rates calculated in section C-9.
                </div>

                <div className="mt-8 flex justify-between">
                  <button 
                    onClick={() => setFormStep(1)}
                    className="bg-gray-400 hover:bg-gray-300 text-black font-bold px-6 py-2 text-xs border border-black"
                  >
                    ← PREVIOUS SECTION
                  </button>
                  <button 
                    onClick={() => setFormStep(3)}
                    className="bg-green-600 hover:bg-green-500 text-white font-extrabold px-8 py-3 text-xs border-2 border-black"
                  >
                    PROCEED TO TEMPORAL MATRIX →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SEASON, IRRIGATION, FARM SIZE */}
            {formStep === 3 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold bg-amber-300 p-2 border border-black uppercase">
                  SECTION C-9: TEMPORAL & IRRIGATION PARAMETERS
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase">PLANTING SEASON:</label>
                    <select 
                      value={season} 
                      onChange={(e) => setSeason(e.target.value)}
                      className="p-3 bg-amber-50 border-2 border-black text-xs font-bold"
                    >
                      <option value="Spring">Spring / Early Moisture</option>
                      <option value="Summer">Summer / High Heat</option>
                      <option value="Autumn">Autumn / Post-Harvest</option>
                      <option value="Winter">Winter Cover</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase">IRRIGATION PROTOCOL:</label>
                    <select 
                      value={irrigation} 
                      onChange={(e) => setIrrigation(e.target.value)}
                      className="p-3 bg-amber-50 border-2 border-black text-xs font-bold"
                    >
                      <option value="Drip">Drip Irrigation</option>
                      <option value="Pivot Sprinkler">Center Pivot Sprinkler</option>
                      <option value="Flood / Rainfed">Rainfed / Flood</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase">FARM SIZE (ACRES):</label>
                    <input 
                      type="number"
                      value={farmSize}
                      onChange={(e) => setFarmSize(Number(e.target.value))}
                      className="p-3 bg-amber-50 border-2 border-black text-xs font-bold"
                    />
                  </div>

                </div>

                <div className="mt-8 flex justify-between">
                  <button 
                    onClick={() => setFormStep(2)}
                    className="bg-gray-400 hover:bg-gray-300 text-black font-bold px-6 py-2 text-xs border border-black"
                  >
                    ← BACK
                  </button>
                  <button 
                    onClick={() => setFormStep(4)}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-8 py-3 text-xs border-2 border-black"
                  >
                    REVIEW PARAMETERS (STEP 4) →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & CONFIRMATION OVERKILL */}
            {formStep === 4 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold bg-sky-300 p-2 border border-black uppercase">
                  SECTION D-12: PRE-ANALYSIS PARAMETER AUDIT
                </h3>
                <p className="text-xs text-gray-700">
                  Please review the verified input parameters before triggering Gemini AI inference algorithms.
                </p>

                <div className="bg-slate-100 p-4 border-2 border-slate-400 font-mono text-xs flex flex-col gap-2">
                  <div><strong>GEOGRAPHIC REGION:</strong> {region}</div>
                  <div><strong>SOIL TAXONOMY:</strong> {soilType}</div>
                  <div><strong>SOIL pH MATRIX:</strong> {phLevel}</div>
                  <div><strong>TARGET SEASON:</strong> {season}</div>
                  <div><strong>IRRIGATION SCHEME:</strong> {irrigation}</div>
                  <div><strong>LAND AREA:</strong> {farmSize} Acres</div>
                </div>

                {isGenerating && (
                  <div className="bg-yellow-300 border-4 border-red-600 p-6 text-center animate-pulse">
                    <div className="text-lg font-black text-black">
                      ⏳ {loadingMessages[loadingTextIndex]}
                    </div>
                    <div className="text-xs text-red-800 mt-2 font-bold">
                      DO NOT CLOSE THIS BROWSER WINDOW OR NAVIGATE AWAY.
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-between items-center">
                  <button 
                    onClick={() => setFormStep(3)}
                    disabled={isGenerating}
                    className="bg-gray-400 hover:bg-gray-300 text-black font-bold px-6 py-2 text-xs border border-black disabled:opacity-50"
                  >
                    ← RE-EDIT PARAMETERS
                  </button>

                  <button 
                    onClick={handleGenerateAdvisory}
                    disabled={isGenerating}
                    className="bg-red-600 hover:bg-red-500 text-white font-black px-10 py-4 text-sm border-4 border-black uppercase tracking-widest shadow-2xl shake-hover"
                  >
                    {isGenerating ? 'PROCESSING...' : '⚡ GENERATE AI ADVISORY NOW'}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: POST-CALCULATION AMBIGUOUS HOLDING SCREEN */}
            {formStep === 5 && advisoryResult && (
              <div className="flex flex-col gap-6 text-center p-8 bg-emerald-50 border-4 border-emerald-600">
                <div className="inline-block mx-auto bg-green-500 text-white p-4 rounded-full border-2 border-black">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-black text-emerald-950 uppercase">
                  ADVISORY DATASET SUCCESSFULLY GENERATED & INDEXED
                </h2>
                <p className="text-xs text-emerald-800 max-w-lg mx-auto">
                  The Gemini AI engine has completed matrix evaluation. Record ID <code className="bg-yellow-200 px-2 py-1 border border-black">{advisoryResult.id}</code> has been saved to PostgreSQL.
                </p>

                {/* Require user to click another button to actually view the advisory modal */}
                <div className="mt-4 flex justify-center gap-4">
                  <button 
                    onClick={() => {
                      setShowResultModal(true);
                    }}
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-sm px-8 py-4 border-4 border-black shadow-xl uppercase tracking-wider"
                  >
                    👁️ CLICK HERE TO ACCESS GENERATED ADVISORY RESULTS
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ============================================================== */}
        {/* MODAL: ADVISORY RESULTS (OVERSIZED TECHNICAL HEADINGS)         */}
        {/* ============================================================== */}
        {showResultModal && advisoryResult && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white border-8 border-red-600 max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto flex flex-col gap-6 shadow-2xl">
              
              <div className="flex justify-between items-center bg-emerald-900 text-yellow-300 p-4 border-b-4 border-black">
                <h3 className="text-lg font-black uppercase tracking-widest">
                  PRIMARY AGRICULTURAL OUTPUT ENTITY // STATUS: CALCULATED
                </h3>
                <button 
                  onClick={() => setShowResultModal(false)}
                  className="bg-red-600 text-white font-bold px-3 py-1 text-xs border border-black hover:bg-red-500"
                >
                  CLOSE [X]
                </button>
              </div>

              {/* Technical Obscured Header formatting */}
              <div className="bg-yellow-100 p-4 border-2 border-yellow-600 text-xs font-mono">
                <div className="font-bold text-red-800 uppercase mb-1">RECOMMENDATION INDEX: 01</div>
                <div className="text-2xl font-black text-black">
                  CROP: {advisoryResult.fullResponseJson.primaryRecommendation.cropName}
                </div>
                <div className="text-xs text-gray-700 mt-2">
                  CONFIDENCE SCORE METRIC: <span className="bg-green-300 px-2 font-bold">{advisoryResult.confidenceScore * 100}%</span> | EXPECTED YIELD: {advisoryResult.fullResponseJson.primaryRecommendation.expectedYieldPerAcre}
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                <div className="bg-slate-50 p-4 border border-slate-300 flex flex-col gap-2">
                  <h4 className="font-bold uppercase text-blue-900 border-b pb-1">SOIL SUITABILITY ASSESSMENT:</h4>
                  <p>{advisoryResult.fullResponseJson.soilSuitabilityAnalysis.phAssessment}</p>
                  <div className="font-bold mt-2">NUTRIENT REQUIREMENTS:</div>
                  <ul className="list-disc pl-4 text-gray-700">
                    {advisoryResult.fullResponseJson.soilSuitabilityAnalysis.nutrientRequirements.map((n: string, i: number) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 border border-slate-300 flex flex-col gap-2">
                  <h4 className="font-bold uppercase text-emerald-900 border-b pb-1">IRRIGATION STRATEGY MATRIX:</h4>
                  <p><strong>Frequency:</strong> {advisoryResult.fullResponseJson.irrigationStrategy.frequency}</p>
                  <p><strong>Water Volume:</strong> {advisoryResult.fullResponseJson.irrigationStrategy.waterVolumeRequirement}</p>
                </div>

              </div>

              {/* Risk Factors Table */}
              <div className="bg-red-50 p-4 border-2 border-red-300 text-xs">
                <h4 className="font-bold uppercase text-red-900 mb-2">RISK MANAGEMENT & MITIGATION PROTOCOLS:</h4>
                {advisoryResult.fullResponseJson.riskManagement.map((risk: any, idx: number) => (
                  <div key={idx} className="bg-white p-2 border border-red-200 mb-2">
                    <span className="font-bold text-red-700">[{risk.riskLevel} RISK] - {risk.threatCategory}:</span>
                    <ul className="list-disc pl-4 text-gray-700 mt-1">
                      {risk.mitigationSteps.map((m: string, mi: number) => (
                        <li key={mi}>{m}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="bg-gray-200 p-3 text-[10px] text-gray-600 flex justify-between items-center">
                <span>ALTERNATIVE CROP CANDIDATES: {advisoryResult.fullResponseJson.alternativeCrops.join(', ')}</span>
                <button 
                  onClick={() => setShowResultModal(false)}
                  className="bg-black text-white px-4 py-2 font-bold"
                >
                  DISMISS VIEW
                </button>
              </div>

            </div>
          </div>
        )}


        {/* ============================================================== */}
        {/* ROUTE 3: HISTORICAL ARCHIVES (Advisory History)                */}
        {/* ============================================================== */}
        {activeTab === 'history' && (
          <div className="flex flex-col gap-4 bg-white p-6 border-4 border-black">
            <h2 className="text-xl font-bold bg-slate-800 text-white p-3 uppercase tracking-wider">
              HISTORICAL TELEMETRY LOGS & ADVISORY RECORD ARCHIVE
            </h2>
            <p className="text-xs text-gray-600">
              The following log entries reflect saved crop advisory outputs in PostgreSQL.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse border-2 border-black">
                <thead>
                  <tr className="bg-yellow-300 text-black border-b-2 border-black font-bold">
                    <th className="p-3 border">LOG ID</th>
                    <th className="p-3 border">TIMESTAMP</th>
                    <th className="p-3 border">RECOMMENDED CROP</th>
                    <th className="p-3 border">CONFIDENCE</th>
                    <th className="p-3 border">STATUS CODE</th>
                    <th className="p-3 border">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {historyList.map((item, idx) => (
                    <tr key={idx} className="hover:bg-yellow-50 border-b border-gray-300">
                      <td className="p-3 border font-mono font-bold">{item.id}</td>
                      <td className="p-3 border">{item.date}</td>
                      <td className="p-3 border font-bold text-emerald-900">{item.crop}</td>
                      <td className="p-3 border">{(item.confidence * 100).toFixed(0)}%</td>
                      <td className="p-3 border">
                        <span className="bg-green-200 text-green-800 px-2 py-0.5 border border-green-600 font-bold text-[10px]">
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 border">
                        <button 
                          onClick={() => {
                            setAdvisoryResult({
                              id: item.id,
                              recommendedCrop: item.crop,
                              confidenceScore: item.confidence,
                              fullResponseJson: {
                                primaryRecommendation: {
                                  cropName: item.crop,
                                  confidenceScore: item.confidence,
                                  expectedYieldPerAcre: "3.8 Metric Tons"
                                },
                                soilSuitabilityAnalysis: {
                                  phAssessment: "Optimal pH range recorded.",
                                  nutrientRequirements: ["Nitrogen: 100 kg/ha"]
                                },
                                irrigationStrategy: {
                                  frequency: "Regular drip interval",
                                  waterVolumeRequirement: "4000 m3/ha"
                                },
                                riskManagement: [
                                  { threatCategory: "Fungal Spores", riskLevel: "Low", mitigationSteps: ["Crop rotation"] }
                                ],
                                alternativeCrops: ["Barley", "Oats"]
                              }
                            });
                            setShowResultModal(true);
                          }}
                          className="bg-blue-600 text-white px-2 py-1 text-[10px] font-bold border border-black hover:bg-blue-500"
                        >
                          INSPECT LOG
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


        {/* ============================================================== */}
        {/* ROUTE 4: OPERATOR PROFILE                                       */}
        {/* ============================================================== */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 border-4 border-black flex flex-col gap-4">
            <h2 className="text-xl font-bold bg-amber-400 text-black p-3 border border-black uppercase">
              OPERATOR SPECIFICATIONS & AGRICULTURAL PROFILE
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-amber-50 border border-amber-300">
                <span className="font-bold text-gray-500">AUTHENTICATED EMAIL:</span>
                <p className="text-sm font-bold text-black mt-1">{userEmail}</p>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-300">
                <span className="font-bold text-gray-500">ASSIGNED FARM ENTITY:</span>
                <p className="text-sm font-bold text-black mt-1">Green Acres Facility #09</p>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-300">
                <span className="font-bold text-gray-500">DEFAULT REGION MATRIX:</span>
                <p className="text-sm font-bold text-black mt-1">{region}</p>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-300">
                <span className="font-bold text-gray-500">DATABASE UUID:</span>
                <p className="text-xs font-bold text-gray-700 mt-1">usr_88f92-a9b0-441f-880c</p>
              </div>
            </div>
          </div>
        )}


        {/* ============================================================== */}
        {/* ROUTE 5: SUBSYSTEM PREFERENCES (Settings)                     */}
        {/* ============================================================== */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 border-4 border-black flex flex-col gap-4">
            <h2 className="text-xl font-bold bg-slate-800 text-yellow-300 p-3 uppercase">
              SUBSYSTEM CONFIGURATION & PREFERENCES
            </h2>

            <div className="flex flex-col gap-4 text-xs">
              <label className="flex items-center gap-3 p-3 bg-gray-100 border border-gray-400">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-red-600" />
                <span className="font-bold">Enable Verbose Debug Logs in Browser Console</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-gray-100 border border-gray-400">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-red-600" />
                <span className="font-bold">Strict Zod Payload Validation on Frontend Submit</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-gray-100 border border-gray-400">
                <input type="checkbox" className="w-4 h-4 accent-red-600" />
                <span className="font-bold">Bypass Confirmation Dialog Phase 2 & Phase 3</span>
              </label>
            </div>
          </div>
        )}


        {/* ============================================================== */}
        {/* ROUTE 6: SECURITY / AUTHENTICATION                             */}
        {/* ============================================================== */}
        {activeTab === 'auth' && (
          <div className="max-w-md mx-auto bg-white p-6 border-4 border-black shadow-2xl flex flex-col gap-4">
            <h2 className="text-xl font-bold bg-red-800 text-yellow-300 p-3 text-center uppercase">
              🔒 OPERATOR AUTHENTICATION TERMINAL
            </h2>

            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-bold uppercase">OPERATOR IDENTIFIER / EMAIL:</label>
                <input 
                  type="email" 
                  value={loginInputEmail} 
                  onChange={(e) => setLoginInputEmail(e.target.value)}
                  placeholder="operator@agri-corp.local"
                  className="p-3 bg-yellow-50 border-2 border-black font-bold"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold uppercase">SECURITY PASSPHRASE:</label>
                <input 
                  type="password" 
                  value={loginInputPassword} 
                  onChange={(e) => setLoginInputPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="p-3 bg-yellow-50 border-2 border-black font-bold"
                />
              </div>

              <button 
                type="submit" 
                className="mt-4 bg-green-600 hover:bg-green-500 text-white font-extrabold py-3 border-2 border-black text-sm uppercase tracking-wider"
              >
                VERIFY CREDENTIALS & SIGN IN
              </button>
            </form>
          </div>
        )}

      </main>

      {/* --- HOSTILE FOOTER WITH UNNECESSARY COPYRIGHT & CONTRADICTORY LINKS --- */}
      <footer className="bg-black text-yellow-400 p-6 border-t-8 border-red-700 text-xs flex flex-col items-center gap-2 mt-8">
        <div className="flex flex-wrap justify-center gap-6 font-bold">
          <span className="underline cursor-pointer hover:text-white" onClick={() => setActiveTab('dashboard')}>SYSTEM HOME</span>
          <span className="underline cursor-pointer hover:text-white" onClick={() => setActiveTab('advisory-flow')}>START CROP FLOW</span>
          <span className="underline cursor-pointer hover:text-white" onClick={() => setActiveTab('history')}>RECORD LOGS</span>
          <span className="underline cursor-pointer hover:text-white" onClick={() => setActiveTab('settings')}>CONFIG</span>
        </div>
        <div className="text-[10px] text-gray-400 mt-2 text-center">
          © 2026 AGRI-CROP-ADVISORY-SYSTEM INC. ALL RIGHTS RESERVED. POWERED BY EXPRESS, SUPABASE POSTGRESQL & GEMINI 2.5 FLASH.
        </div>
      </footer>

    </div>
  );
};
