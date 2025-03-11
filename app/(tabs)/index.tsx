import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useMutationUser } from '@/components/hooks/use-mutation-user';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
// import { api } from '@/convex/_generated/api';
import { CreateUserDTO } from '@/components/lib/types';

export default function LoginPage() {
  const router = useRouter();
  const { useCreateUser } = useMutationUser();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelection = async (role: string) => {
    setSelectedRole(role);
    setIsLoading(true);
    
    try {
      // TODO: fix dummy data
      const createUserDto: CreateUserDTO = {
        userID: "dummyID",
        name: "goosegoosecaboose",
        role: role === 'Incident Commander' ? 'Incident Commander' : 'Triage Team',
        userZone: "1",
      }
      const createdUser = await useCreateUser(createUserDto);
      
      // Navigate to the appropriate screen based on role
      if (role === 'Incident Commander') {
        router.push('/incident_command');
      } else {
        // Navigate directly to triage-3 page
        router.push('/triage-3');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>TriageNow</ThemedText>
        <ThemedText style={styles.subtitle}>Select Your Role</ThemedText>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === 'Incident Commander' && styles.selectedButton,
            isLoading && selectedRole === 'Incident Commander' && styles.loadingButton
          ]}
          onPress={() => handleRoleSelection('Incident Commander')}
          disabled={isLoading}
        >
          <ThemedView style={styles.buttonContent}>
            <ThemedText style={styles.buttonText}>Incident Commander</ThemedText>
            <ThemedText style={styles.description}>
              Oversee the entire incident response and coordinate resources
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === 'Triage Team' && styles.selectedButton,
            isLoading && selectedRole === 'Triage Team' && styles.loadingButton
          ]}
          onPress={() => handleRoleSelection('Triage Team')}
          disabled={isLoading}
        >
          <ThemedView style={styles.buttonContent}>
            <ThemedText style={styles.buttonText}>Triage Team</ThemedText>
            <ThemedText style={styles.description}>
              Assess patients and assign priority levels at the scene
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>

      {isLoading && (
        <ThemedText style={styles.loadingText}>
          Setting up your dashboard...
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  roleButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedButton: {
    backgroundColor: '#e0f7fa',
    borderColor: '#00b8d4',
    borderWidth: 2,
  },
  loadingButton: {
    opacity: 0.7,
  },
  buttonContent: {
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    opacity: 0.8,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 18,
  }
});



// import React, { useState } from 'react';
// import { StyleSheet, TouchableOpacity } from 'react-native';
// import { useMutation } from 'convex/react';
// import { useRouter } from 'expo-router';

// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { api } from '@/convex/_generated/api';
// import { useUser } from '@/app/context/users';

// export default function LoginPage() {
//   const router = useRouter();
//   const { setUser } = useUser();
//   const createUser = useMutation(api.users.createUser);
//   const [selectedRole, setSelectedRole] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleRoleSelection = async (role: string) => {
//     setSelectedRole(role);
//     setIsLoading(true);
    
//     try {
//       // Create user in database
//       const userId = await createUser({ 
//         role, 
//         // Zone would be assigned later for Triage Team members
//         zone: role === 'Incident Commander' ? 'Command' : undefined 
//       });
      
//       console.log(`User created with ID: ${userId}, role: ${role}`);
      
//       // Store user in context
//       setUser({
//         id: userId,
//         role: role as 'Incident Commander' | 'Triage Team',
//         zone: role === 'Incident Commander' ? 'Command' : undefined
//       });
      
//       // Navigate to the appropriate screen based on role
//       if (role === 'Incident Commander') {
//         router.replace('/incident_command');
//       } else {
//         // Navigate directly to triage-3 page
//         router.replace('/triage-3');
//       }
//     } catch (error) {
//       console.error('Error creating user:', error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <ThemedView style={styles.container}>
//       <ThemedView style={styles.header}>
//         <ThemedText style={styles.title}>TriageNow</ThemedText>
//         <ThemedText style={styles.subtitle}>Select Your Role</ThemedText>
//       </ThemedView>

//       <ThemedView style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[
//             styles.roleButton,
//             selectedRole === 'Incident Commander' && styles.selectedButton,
//             isLoading && selectedRole === 'Incident Commander' && styles.loadingButton
//           ]}
//           onPress={() => handleRoleSelection('Incident Commander')}
//           disabled={isLoading}
//         >
//           <ThemedView style={styles.buttonContent}>
//             <ThemedText style={styles.buttonText}>Incident Commander</ThemedText>
//             <ThemedText style={styles.description}>
//               Oversee the entire incident response and coordinate resources
//             </ThemedText>
//           </ThemedView>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.roleButton,
//             selectedRole === 'Triage Team' && styles.selectedButton,
//             isLoading && selectedRole === 'Triage Team' && styles.loadingButton
//           ]}
//           onPress={() => handleRoleSelection('Triage Team')}
//           disabled={isLoading}
//         >
//           <ThemedView style={styles.buttonContent}>
//             <ThemedText style={styles.buttonText}>Triage Team</ThemedText>
//             <ThemedText style={styles.description}>
//               Assess patients and assign priority levels at the scene
//             </ThemedText>
//           </ThemedView>
//         </TouchableOpacity>
//       </ThemedView>

//       {isLoading && (
//         <ThemedText style={styles.loadingText}>
//           Setting up your dashboard...
//         </ThemedText>
//       )}
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'center',
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 48,
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 24,
//     marginBottom: 24,
//   },
//   buttonContainer: {
//     width: '100%',
//     maxWidth: 600,
//     alignSelf: 'center',
//   },
//   roleButton: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 12,
//     padding: 24,
//     marginBottom: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   selectedButton: {
//     backgroundColor: '#e0f7fa',
//     borderColor: '#00b8d4',
//     borderWidth: 2,
//   },
//   loadingButton: {
//     opacity: 0.7,
//   },
//   buttonContent: {
//     flexDirection: 'column',
//   },
//   buttonText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 16,
//     opacity: 0.8,
//   },
//   loadingText: {
//     textAlign: 'center',
//     marginTop: 24,
//     fontSize: 18,
//   }
// });







// // import React, { useState } from 'react';
// // import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
// // import { useMutation } from 'convex/react';
// // import { useRouter } from 'expo-router';

// // import { ThemedText } from '@/components/ThemedText';
// // import { ThemedView } from '@/components/ThemedView';
// // import { api } from '@/convex/_generated/api';

// // export default function LoginPage() {
// //   const router = useRouter();
// //   const createUser = useMutation(api.users.createUser);
// //   const [selectedRole, setSelectedRole] = useState<string | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleRoleSelection = async (role: string) => {
// //     setSelectedRole(role);
// //     setIsLoading(true);
    
// //     try {
// //       // Create user in database
// //       const userId = await createUser({ 
// //         role, 
// //         // Zone would be assigned later for Triage Team members
// //         zone: role === 'Incident Commander' ? 'Command' : undefined 
// //       });
      
// //       console.log(`User created with ID: ${userId}, role: ${role}`);
      
// //       // Navigate to the appropriate screen based on role
// //       if (role === 'Incident Commander') {
// //         router.push('/incident_command');
// //       } else {
// //         // Navigate directly to triage-3 page
// //         router.push('/triage-3');
// //       }
// //     } catch (error) {
// //       console.error('Error creating user:', error);
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <ThemedView style={styles.container}>
// //       <ThemedView style={styles.header}>
// //         <ThemedText style={styles.title}>TriageNow</ThemedText>
// //         <ThemedText style={styles.subtitle}>Select Your Role</ThemedText>
// //       </ThemedView>

// //       <ThemedView style={styles.buttonContainer}>
// //         <TouchableOpacity
// //           style={[
// //             styles.roleButton,
// //             selectedRole === 'Incident Commander' && styles.selectedButton,
// //             isLoading && selectedRole === 'Incident Commander' && styles.loadingButton
// //           ]}
// //           onPress={() => handleRoleSelection('Incident Commander')}
// //           disabled={isLoading}
// //         >
// //           <ThemedView style={styles.buttonContent}>
// //             <ThemedText style={styles.buttonText}>Incident Commander</ThemedText>
// //             <ThemedText style={styles.description}>
// //               Oversee the entire incident response and coordinate resources
// //             </ThemedText>
// //           </ThemedView>
// //         </TouchableOpacity>

// //         <TouchableOpacity
// //           style={[
// //             styles.roleButton,
// //             selectedRole === 'Triage Team' && styles.selectedButton,
// //             isLoading && selectedRole === 'Triage Team' && styles.loadingButton
// //           ]}
// //           onPress={() => handleRoleSelection('Triage Team')}
// //           disabled={isLoading}
// //         >
// //           <ThemedView style={styles.buttonContent}>
// //             <ThemedText style={styles.buttonText}>Triage Team</ThemedText>
// //             <ThemedText style={styles.description}>
// //               Assess patients and assign priority levels at the scene
// //             </ThemedText>
// //           </ThemedView>
// //         </TouchableOpacity>
// //       </ThemedView>

// //       {isLoading && (
// //         <ThemedText style={styles.loadingText}>
// //           Setting up your dashboard...
// //         </ThemedText>
// //       )}
// //     </ThemedView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 16,
// //     justifyContent: 'center',
// //   },
// //   header: {
// //     alignItems: 'center',
// //     marginBottom: 48,
// //   },
// //   title: {
// //     fontSize: 36,
// //     fontWeight: 'bold',
// //     marginBottom: 8,
// //   },
// //   subtitle: {
// //     fontSize: 24,
// //     marginBottom: 24,
// //   },
// //   buttonContainer: {
// //     width: '100%',
// //     maxWidth: 600,
// //     alignSelf: 'center',
// //   },
// //   roleButton: {
// //     backgroundColor: '#f0f0f0',
// //     borderRadius: 12,
// //     padding: 24,
// //     marginBottom: 24,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   selectedButton: {
// //     backgroundColor: '#e0f7fa',
// //     borderColor: '#00b8d4',
// //     borderWidth: 2,
// //   },
// //   loadingButton: {
// //     opacity: 0.7,
// //   },
// //   buttonContent: {
// //     flexDirection: 'column',
// //   },
// //   buttonText: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginBottom: 8,
// //   },
// //   description: {
// //     fontSize: 16,
// //     opacity: 0.8,
// //   },
// //   loadingText: {
// //     textAlign: 'center',
// //     marginTop: 24,
// //     fontSize: 18,
// //   }
// // });