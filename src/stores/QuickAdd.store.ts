import { create } from "zustand";

export const useQuickAddStore = create((set) => ({
  isOpen: false,
  itemId: "",
  isLoading: false,
  isValided: false,
  setIsOpen: (boolean: boolean) => {
    set((state: any) => ({ isOpen: boolean }));
  },
  setId: (id: string) => {
    set((state: any) => ({ itemId: id }));
  },
}));

// {isLoading && (
//   <div
//     className={`loader-wrapper ${
//       isValided ? "loader-wrapper--isValided" : ""
//     }`}
//   >
//     {isValided ? (
//       <img src={check} alt="" />
//     ) : (
//       <div className="loader-wrapper__lds-ring">
//         <div></div>
//         <div></div>
//         <div></div>
//         <div></div>
//       </div>
//     )}
//   </div>
// )}
