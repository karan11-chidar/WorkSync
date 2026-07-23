import { toast } from "sonner"

export const toastSuccess = (message) => {
   return toast.success(message, {
     style: {
       background: "#1E293B",
       color: "#FFFFFF",
       border: "1px solid #22C55E",
     },
   });
}
 
 export   const toastError = (message) => {
     return toast.error(message, {
     style: {
       background: "#450A0A",
       color: "#FEE2E2",
       border: "1px solid #EF4444",
     },
   });
}

export const toastLoading = (message) => {
    return  toast.loading(message);
}
export  const toastAlert = (message) => {
    return toast.promise(message)
}