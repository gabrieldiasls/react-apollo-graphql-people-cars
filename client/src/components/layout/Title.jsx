// Antd imports
import { Divider } from "antd";

const getStyles = () => ({
  title: {
    fontSize: 20,
    padding: "10px",
    fontWeight: "bold",
    textAlign: "center",
  },
  divider: {
    width: "30",
  },
});

const Title = () => {
  const styles = getStyles();

  return (
    <>
      <h1 style={styles.title}>PEOPLE AND THEIR CARS</h1>
      <Divider style={styles.divider} />
    </>
  );
};

export default Title;
