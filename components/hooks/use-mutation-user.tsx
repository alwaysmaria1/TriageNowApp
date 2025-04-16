import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "convex/_generated/dataModel";
import { CreateUserDTO, EditPatientDTO, User } from "../lib/types";
import { useStore } from "../lib/store";

// export function useMutationUser() {
//   const createMutation = useMutation(api.users.createUser);
// //   const updateMutation = useMutation(api.users.update);
// //   const removeMutation = useMutation(api.patients.remove);
//   const addUser = useStore((state) => state.addUser);

//   const createUser = async (
//     user: CreateUserDTO
//   ): Promise<User | null> => {

//     try {
//       const createdUser = await createMutation(user);


//       if (createdUser) {
//         addUser(createdUser);
//       }

//       return createdUser;

//     } catch (error) {
//       alert((error as Error).message || "Please try again later");
//       return null;
//     }
//   };

//TODO: fix/update for user
//   const updateUser = async (
//     patient: EditPatientDTO
//   ): Promise<boolean> => {
//     try {
//       await updateMutation(patient);
//       alert("Patient updated successfully!");
//       return true;
//     } catch (error) {
//       alert((error as Error).message || "Please try again later");
//       return false;
//     }
//   };

//   const removeUser = async (barcodeID: string): Promise<boolean> => {
//     try {
//       await removeMutation({ barcodeID });
//       alert("Patient removed successfully!");
//       return true;
//     } catch (error) {
//       alert((error as Error).message || "Please try again later");
//       return false;
//     }
//   };

// return {
//   useCreateUser: createUser,
//   // update: updateUser,
//   // remove: removeUser,
// };
// }
