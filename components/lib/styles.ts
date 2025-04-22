import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  fullWidthButton: {
    alignSelf: "stretch",
    margin: 16,
  },
  titleContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  overrideLabel: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 8,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  questionText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    color: "#444",
  },
});

export default styles;
