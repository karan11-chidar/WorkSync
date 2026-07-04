import {
  X,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Star,
  FileText,
} from "lucide-react";
export function EmployeeDetailDrawer(props) {
const {
  selectedEmployee,
  setSelectedEmployee,
  handleEditEmployee,
  onDeleteEmployee,
  } = props;
  if (!selectedEmployee) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setSelectedEmployee(null)}
        className="
    absolute
    inset-0
    bg-slate-900/10
    backdrop-blur-md
    transition-all
    duration-300
    ease-in-out
    transform
    cursor-pointer
  "
      />
      {/* Slide block */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform translate-x-0">
        {/* Profile Top Color Banner */}
        <div
          className={`h-10 bg-linear-to-r ${selectedEmployee.avatarColor || "from-slate-500 to-slate-700"} p-6 flex justify-between items-start text-white relative`}
        >
          <button
            onClick={() => setSelectedEmployee(null)}
            className="bg-black/20 hover:bg-slate-600 p-1.5 rounded-full transition-colors absolute top-4 right-4 text-white active:scale-95"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Floating Head Initials Avatar */}
        <div className="px-6 mt-5 flex items-end justify-between ">
          <div
            className={`h-15 w-15 rounded-2xl bg-linear-to-br ${selectedEmployee.avatarColor || "from-slate-500 to-slate-700"} ring-4 ring-white flex items-center justify-center text-white text-xl font-bold uppercase shadow-md`}
          >
            {selectedEmployee.firstName?.[0]}
            {selectedEmployee.lastName?.[0]}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                handleEditEmployee(selectedEmployee);
                setSelectedEmployee(null);
              }}
              className="p-2 border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-600 flex items-center gap-1.5 text-xs font-semibold shadow-xxs transition-colors active:scale-95"
            >
              <Edit className="h-3.5 w-3.5" /> Edit Profile
            </button>
            <button
              onClick={() => {
                if (
                  confirm(
                    `Are you absolutely sure you want to remove ${selectedEmployee.firstName}?`,
                  )
                ) {
                  onDeleteEmployee && onDeleteEmployee(selectedEmployee.id);
                  setSelectedEmployee(null);
                }
              }}
              className="p-2 border border-rose-100 rounded-xl hover:bg-rose-50 text-rose-600 flex items-center gap-1.5 text-xs font-semibold shadow-xxs transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        </div>

        {/* Drawer Body Details */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {selectedEmployee.firstName} {selectedEmployee.lastName}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedEmployee.role} •{" "}
              <span className="font-semibold text-slate-700">
                {selectedEmployee.department}
              </span>
            </p>
          </div>

          {/* Grid attributes */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Employee ID
              </span>
              <div className="text-xs font-semibold text-slate-800 font-mono mt-0.5">
                {selectedEmployee.id}
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Status Badge
              </span>
              <div className="mt-0.5">
                <span
                  className={`px-2 py-0.5 inline-flex text-[10px] leading-5 font-semibold rounded-full ${
                    selectedEmployee.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : selectedEmployee.status === "On Leave"
                        ? "bg-amber-100 text-amber-800"
                        : selectedEmployee.status === "Inactive"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {selectedEmployee.status || "Active"}
                </span>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Base Salary
              </span>
              <div className="text-xs font-semibold text-slate-800 font-mono mt-0.5">
                ${selectedEmployee.salary?.toLocaleString()}/yr
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Joining Date
              </span>
              <div className="text-xs font-semibold text-slate-800 font-mono mt-0.5">
                {selectedEmployee.dateJoined}
              </div>
            </div>
          </div>

          {/* Contact Coordinates */}
          <div className="space-y-3" id="drawer-contact-coordinates">
            <h4 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-1 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-slate-400" /> Contact
              Coordinates
            </h4>
            <div className="text-xs space-y-2.5 text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3 text-slate-400" />
                <a
                  href={`mailto:${selectedEmployee.email}`}
                  className="text-indigo-600 hover:underline"
                >
                  {selectedEmployee.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3 text-slate-400" />
                <a
                  href={`tel:${selectedEmployee.phone}`}
                  className="text-indigo-600 hover:underline"
                >
                  <span>{selectedEmployee.phone || "No phone set"}</span>
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedEmployee.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  <span className="leading-relaxed">
                    {selectedEmployee.address || "No office address logged"}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Performance Evaluation card */}
          <div className="space-y-3" id="drawer-performance-container">
            <h4 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-1 flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-amber-500" /> Performance &
              Rating
            </h4>
            <div className="bg-amber-50/50 border border-amber-100/60 p-3.5 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-800">
                  Operational Score
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Based on quarterly evaluations.
                </p>
              </div>
              <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-amber-100">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-amber-700">
                  {selectedEmployee.performanceRating || 0}.0 / 5.0
                </span>
              </div>
            </div>
          </div>

          {/* Internal HR Notes */}
          <div className="space-y-3" id="drawer-notes-container">
            <h4 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-1 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-slate-400" /> HR Compliance
              Notes
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
              "
              {selectedEmployee.notes ||
                "No private notes have been written for this employee yet."}
              "
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailDrawer;
