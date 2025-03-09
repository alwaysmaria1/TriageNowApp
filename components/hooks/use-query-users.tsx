import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useStore } from "../lib/store";
import { useEffect } from "react";
// import { FindUsersDTO } from "../lib/types";

// export function useQueryUsers() {
//   // console.log("hello2")
//   const users = useStore((state) => state.users);
//   const setUsers = useStore((state) => state.setUsers);

//   //TODO: add args?
//   const args: FindUsersDTO = {
//   };

//   const fetchedUsers = useQuery(api.users.getAll); 
//   // console.log(fetchedPatients)
//   const loadUsers = async () => {
//     if (fetchedUsers) {
//       setUsers(fetchedUsers);
//     }
//   }
//   useEffect(() => {
//     loadUsers();
//   }, [fetchedUsers, setUsers]);

//   return { users };
// }

export function useQueryUsers() {
    // console.log("hello2")
    const users = useStore((state) => state.users);
    const setUsers = useStore((state) => state.setUsers);
  
    // const args: FindUsersDTO = {
    //     userZone,
    // };
  

    // if (args.userZone) {
        const fetchedUsers = useQuery(api.users.getAll,{}); 
        // console.log(fetchedPatients)
        const loadUsers = async () => {
            if (fetchedUsers) {
                setUsers(fetchedUsers);
            }
        }
        // // const zone = "Zone 1";
        // console.log(zone.substring(zone.indexOf(" ") + 1));
        useEffect(() => {
            loadUsers();
        }, [fetchedUsers, setUsers]);
    // }    
  
    return { users };
  }
  