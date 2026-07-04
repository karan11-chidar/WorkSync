import React from 'react'
import { NotebookPen,UserPlus,X,ShieldAlert,IndianRupee } from 'lucide-react'
 function AddEmployeeForm({
    isAdding,
    editingEmployee,
    setIsAdding,
    setEditingEmployee
 }) {
   const [formError, setFormError] = React.useState(null);
   const availableDepts = ["Engineering", "HR", "Finance", "Design"];
   const formData = {
     performanceRating: 3,
   };
  const handleFormSubmit = (e) => {
     e.preventDefault();
     // Handle form submission logic here
   }
   
  return (
    (isAdding || editingEmployee) && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300">
        {/* Modal Container - Removed motion.div and used normal div with smooth styling */}
        <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 overflow-hidden flex flex-col max-h-[90vh] scale-100 opacity-100 transition-all duration-300">
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-md font-semibold text-slate-900 flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-indigo-600" />
              {isAdding
                ? "Add New Employee"
                : `Edit Profile: ${editingEmployee?.firstName} ${editingEmployee?.lastName}`}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingEmployee(null);
              }}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal Body / Scrollable Form */}
          <form
            onSubmit={handleFormSubmit}
            className="flex-1 overflow-y-auto py-4 space-y-4 text-xs"
          >
            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-lg flex items-start gap-2">
                <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {/* Name fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">
                  First Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alexis"
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">
                  Last Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vance"
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 outline-none bg-white"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="alexis.v@company.com"
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 outline-none bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+1 (555) 777-8888"
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 outline-none bg-white"
                />
              </div>
            </div>

            {/* Dept & Role */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">
                  Department
                </label>
                <select className="w-full p-2.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-indigo-600 outline-none">
                  {availableDepts?.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">
                  Job Role/Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead Dev Ops"
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 outline-none bg-white"
                />
              </div>
            </div>

            {/* Salary & Status */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">
                  Annual Salary (USD) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-2.5 top-3 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="number"
                    required
                    min="20000"
                    placeholder="75000"
                    className="w-full pl-8 pr-2.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 outline-none bg-white"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">
                  Employment Status
                </label>
                <select className="w-full p-2.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-indigo-600 outline-none">
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Terminated">Terminated</option>
                </select>
              </div>
            </div>

            {/* Gender & Rating */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">
                  Gender Identity
                </label>
                <select className="w-full p-2.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-indigo-600 outline-none">
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">
                  Performance Evaluation (1-5)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  className="w-full mt-2 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5">
                  <span>1 (Improvement Needed)</span>
                  <span className="text-indigo-600 font-bold">
                    {formData.performanceRating} Stars
                  </span>
                  <span>5 (Exceptional)</span>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">
                Primary Home Address
              </label>
              <input
                type="text"
                placeholder="123 Pinecrest Road, City, ST Zip"
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 outline-none bg-white"
              />
            </div>

            {/* Private Notes */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-600">
                HR Confidential Comments
              </label>
              <textarea
                rows={2.5}
                placeholder="Provide any context about professional progress, disciplinary compliance or special requirements..."
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-600 outline-none resize-none bg-white"
              />
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingEmployee(null);
                }}
                className="px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors cursor-pointer text-xs active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-sm transition-colors cursor-pointer text-xs active:scale-95"
              >
                {isAdding ? "Onboard Member" : "Save Profile Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}


export default AddEmployeeForm
