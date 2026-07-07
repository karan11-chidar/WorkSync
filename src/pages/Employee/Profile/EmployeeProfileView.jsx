import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  IndianRupee,
  Star,
  Camera,
  ShieldCheck,
  Building2,
  Check,
  AlertCircle,
  Fingerprint,
  Calendar,
  Briefcase,
  User,
  Award,
  FileText,
} from "lucide-react";

export default function EmployeeProfileView() {
  // कॉर्पोरेट-ग्रेड कंप्लीट एम्प्लॉई ऑब्जेक्ट
  const [employeeProfile, setEmployeeProfile] = useState({
    empId: "EMP-2026-0894",
    firstName: "Karan",
    lastName: "Chidar",
    email: "karan.chidar@company.com",
    phone: "+91 98765-43210",
    department: "Engineering",
    role: "Full Stack Developer (MERN)",
    joiningDate: "12 August, 2025",
    salary: "850000",
    status: "Active",
    gender: "Male",
    bloodGroup: "O+ Positive",
    performanceRating: 5,
    officeLocation: "HQ - Phase 2, Smart City Tech Park, Bhopal, MP, India",
    permanentAddress:
      "House No. 142, Premium Residency, Near Lakeshore Drive, Bhopal, MP, 462001",
    hrNotes:
      "Exemplary performance logs across corporate ERP systems and premium UI infrastructure modules.",
    avatarUrl: "", // डिफ़ॉल्ट रूप से खाली, एम्प्लॉई खुद सेट करेगा
  });

  // इमेज URL एडिटर कंट्रोल्स की स्टेट्स
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [photoError, setPhotoError] = useState(null);

  const stars = Array.from(
    { length: 5 },
    (_, i) => i < employeeProfile.performanceRating,
  );

  const handlePhotoUpdate = (e) => {
    e.preventDefault();
    setPhotoError(null);

    if (!inputUrl.trim() || !inputUrl.startsWith("http")) {
      setPhotoError("Please provide a valid secure (https://) image link.");
      return;
    }

    setEmployeeProfile((prev) => ({ ...prev, avatarUrl: inputUrl.trim() }));
    setIsEditingPhoto(false);
    setInputUrl("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-2">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden transition-all duration-300">
        <div className="h-32 bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 flex justify-between items-start relative">
          <div className="space-y-0.5">
            <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-xs">
              ✦ {employeeProfile.status}
            </span>
          </div>
          <div className="text-[9px] font-bold text-indigo-200/60 uppercase tracking-widest font-mono bg-indigo-500/10 px-2.5 py-1 rounded-xl border border-indigo-500/20 backdrop-blur-xs">
            Official ID Console
          </div>
        </div>

        {/* PROFILE HEADER MATRIX */}
        <div className="px-6 pb-6 relative -mt-14 space-y-6">
          {/* Avatar Picture Block with Camera Overlay */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
            <div className="relative group shrink-0">
              {employeeProfile.avatarUrl ? (
                <img
                  src={employeeProfile.avatarUrl}
                  alt="Avatar"
                  className="h-24 w-24 rounded-2xl object-cover ring-4 ring-white shadow-lg bg-slate-100 transition-transform duration-300"
                />
              ) : (
                <div className="h-24 w-24 rounded-2xl bg-linear-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white flex items-center justify-center font-black text-2xl shadow-lg ring-4 ring-white font-mono uppercase">
                  {employeeProfile.firstName[0]}
                  {employeeProfile.lastName[0]}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setIsEditingPhoto(!isEditingPhoto);
                  setPhotoError(null);
                }}
                className="absolute -bottom-1.5 -right-1.5 h-7 w-7 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl border-2 border-white flex items-center justify-center shadow-md cursor-pointer transition-all active:scale-90"
                title="Update Profile Picture"
              >
                <Camera size={13} className="stroke-[2.5]" />
              </button>
            </div>

            {/* Basic Badge Row */}
            <div className="mt-1.5 pb-1 flex-1 min-w-0 ">
              <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center justify-center sm:justify-start  gap-1.5">
                {employeeProfile.firstName} {employeeProfile.lastName}
                <ShieldCheck size={16} className="text-indigo-600 shrink-0" />
              </h2>
              <p className="text-xs font-bold text-indigo-600 font-mono flex items-center justify-center sm:justify-start gap-1">
                <Briefcase size={12} /> {employeeProfile.role}
              </p>
            </div>

            {/* Performance Badge */}
            <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl text-center shadow-xxs shrink-0">
              <span className="text-[8px] font-black text-slate-400 block uppercase tracking-wider">
                Evaluation
              </span>
              <div className="flex items-center gap-0.5 mt-0.5">
                {stars.map((filled, idx) => (
                  <Star
                    key={idx}
                    size={10}
                    className={
                      filled
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200"
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* DYNAMIC URL DROPDOWN ATTACHMENT */}
          {isEditingPhoto && (
            <form
              onSubmit={handlePhotoUpdate}
              className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="text-left">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Upload via Custom Image Address
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="Paste secure image URL link (https://)..."
                    className="flex-1 p-2.5 border border-slate-200 bg-white rounded-xl text-xs outline-none focus:ring-1 focus:ring-indigo-600 text-slate-700 font-semibold"
                  />
                  <button
                    type="submit"
                    className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center cursor-pointer active:scale-95 shadow-xs shrink-0"
                  >
                    <Check size={14} className="stroke-3" />
                  </button>
                </div>
              </div>
              {photoError && (
                <div className="text-[9px] text-rose-600 font-bold flex items-center gap-1">
                  <AlertCircle size={11} /> <span>{photoError}</span>
                </div>
              )}
            </form>
          )}

          {/* GRID LAYOUT: 3 DISTINCT CORPORATE DATA BLOCKS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
            {/* Block 1: Professional Meta Logs */}
            <div className="border border-slate-100 rounded-2xl p-4 space-y-3 bg-slate-50/40">
              <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest border-b border-slate-200/60 pb-1.5 flex items-center gap-1.5">
                <Fingerprint size={12} className="text-indigo-500" />{" "}
                Professional Identity
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">
                    Employee ID:
                  </span>{" "}
                  <span className="font-mono text-slate-800 font-bold tracking-wider">
                    {employeeProfile.empId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">
                    Department:
                  </span>{" "}
                  <span className="text-slate-800 font-bold">
                    {employeeProfile.department}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">
                    Joining Date:
                  </span>{" "}
                  <span className="text-slate-700 font-bold font-mono">
                    {employeeProfile.joiningDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">
                    Compensation (CTC):
                  </span>{" "}
                  <span className="text-slate-800 font-black font-mono">
                    ₹{Number(employeeProfile.salary).toLocaleString("en-IN")} /
                    PA
                  </span>
                </div>
              </div>
            </div>

            {/* Block 2: Communication Matrix */}
            <div className="border border-slate-100 rounded-2xl p-4 space-y-3 bg-slate-50/40">
              <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest border-b border-slate-200/60 pb-1.5 flex items-center gap-1.5">
                <Mail size={12} className="text-indigo-500" /> Communication
                Channels
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-slate-400 font-medium">
                    Work Email:
                  </span>{" "}
                  <span className="text-slate-800 font-bold truncate max-w-40">
                    {employeeProfile.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">
                    Contact Number:
                  </span>{" "}
                  <span className="text-slate-700 font-bold font-mono">
                    {employeeProfile.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">
                    Gender Info:
                  </span>{" "}
                  <span className="text-slate-700 font-bold">
                    {employeeProfile.gender}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">
                    Blood Matrix:
                  </span>{" "}
                  <span className="text-rose-600 font-black">
                    {employeeProfile.bloodGroup}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Block 3: Addresses Sheets (Full Width Row) */}
          <div className="border border-slate-100 rounded-2xl p-4 space-y-3.5 bg-slate-50/20 text-xs">
            <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
              <MapPin size={12} className="text-indigo-500" /> Geographic Log
              Sheets
            </div>
            <div className="space-y-3 font-medium">
              <div className="flex gap-4 items-start">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider w-24 shrink-0 mt-0.5">
                  Office Hub:
                </span>
                <span className="text-slate-700 font-semibold leading-relaxed">
                  {employeeProfile.officeLocation}
                </span>
              </div>
              <div className="border-t border-slate-100 pt-2.5 flex gap-4 items-start">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider w-24 shrink-0 mt-0.5">
                  Residential:
                </span>
                <span className="text-slate-600 font-semibold leading-relaxed">
                  {employeeProfile.permanentAddress}
                </span>
              </div>
            </div>
          </div>

          {/* HR Remarks Compliance Section */}
          {employeeProfile.hrNotes && (
            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <FileText size={10} /> HR Compliance Comments & Logs
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium italic">
                "{employeeProfile.hrNotes}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
