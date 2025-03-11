// {/* Demographic Header */}
//       <ThemedView style={styles.sectionContainer}>
//         <Pressable style={styles.header} onPress={() => setIsDemographicsExpanded(!isDemographicsExpanded)}>
//           <View style={styles.topRow}>
//             <ThemedText style={styles.title}>Demographics</ThemedText>
//               {isDemographicsExpanded ? <ChevronUp size={24} style={styles.chevron}/> : <ChevronDown size={24} style={styles.chevron}/>}
//           </View>
//         </Pressable>

//         {/* Demographic Questions */}
//         {isDemographicsExpanded && (
//           <ThemedView style={styles.form}>
//             <ThemedText style={styles.label}>Name:</ThemedText>
//             <TextInput style={styles.input} placeholder="Enter name" placeholderTextColor="#a5a5a5"/>

//             <ThemedText style={styles.label}>DOB:</ThemedText>
//             <TextInput style={styles.input} placeholder="MM/DD/YYYY" placeholderTextColor="#a5a5a5"/>

//             <ThemedText style={styles.label}>Age:</ThemedText>
//             <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter age" placeholderTextColor="#a5a5a5"/>

//             <ThemedText style={styles.label}>Sex:</ThemedText>
//             <TextInput style={styles.input} placeholder="Enter sex" placeholderTextColor="#a5a5a5"/>

//             <ThemedText style={styles.label}>Weight:</ThemedText>
//             <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter weight" placeholderTextColor="#a5a5a5"/>
//           </ThemedView>
//         )}
//       </ThemedView>

//       {/* Contact Info Header */}
//       <ThemedView style={styles.sectionContainer}>
//         <Pressable style={styles.header} onPress={() => setIsContactInfoExpanded(!isContactInfoExpanded)}>
//           <View style={styles.topRow}>
//             <ThemedText style={styles.title}>Contact Information</ThemedText>
//                 {isContactInfoExpanded ? <ChevronUp size={24} style={styles.chevron}/> : <ChevronDown size={24} style={styles.chevron}/>}
//           </View>
//         </Pressable>

//         {/* Contact Info Questions */}
//         {isContactInfoExpanded && (
//           <ThemedView style={styles.form}>
//             <ThemedText style={styles.label}>Address:</ThemedText>
//             <TextInput style={styles.input} placeholder="Enter address" placeholderTextColor="#a5a5a5"/>

//             <ThemedText style={styles.label}>City:</ThemedText>
    //         <TextInput style={styles.input} placeholder="Enter city" placeholderTextColor="#a5a5a5"/>

    //         <ThemedText style={styles.label}>Street:</ThemedText>
    //         <TextInput style={styles.input} placeholder="Enter street" placeholderTextColor="#a5a5a5"/>

    //         <ThemedText style={styles.label}>Zip:</ThemedText>
    //         <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter zipcode" placeholderTextColor="#a5a5a5"/>

    //         <ThemedText style={styles.label}>Phone:</ThemedText>
    //         <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter phone" placeholderTextColor="#a5a5a5"/>
    //       </ThemedView>
    //     )}
    //   </ThemedView>

    //   {/* Patient Notes Header */}
    //   <ThemedView style={styles.sectionContainer}>
    //     <Pressable style={styles.header} onPress={() => setIsPatientNotesExpanded(!isPatientNotesExpanded)}>
    //       <View style={styles.topRow}>
    //         <ThemedText style={styles.title}>Patient Notes</ThemedText>
    //             {isPatientNotesExpanded ? <ChevronUp size={24} style={styles.chevron}/> : <ChevronDown size={24} style={styles.chevron}/>}
    //       </View>
    //     </Pressable>

    //     {/* Patient Notes Question*/}
    //     {isPatientNotesExpanded && (
    //       <ThemedView style={styles.form}>
    //         <TextInput style={styles.inputPatientNotes} multiline={true} placeholder="Enter notes" placeholderTextColor="#a5a5a5"/>
    //       </ThemedView>
    //     )}
    //   </ThemedView>
      
    //   {/* Images Section */}
    //   <View style={styles.imagesContainer}>
    //     <TouchableOpacity style={styles.imagePlaceholder}>
    //       <Text style={styles.imagePlaceholderText}>Camera Icon</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.imagePlaceholder}>
    //       <Text style={styles.imagePlaceholderText}>Image Placeholder</Text>
    //     </TouchableOpacity>
    //   </View>
    //   </View>
    // </ScrollView>