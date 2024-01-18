export const getFormStyle = (token) => {
  return {
    container: {
      margin: "0 auto",
      padding: `${token.paddingXL}px`,
      width: "380px",
      backgroundColor: token.colorBgContainer,
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: "center",
    },
    section: {
      alignItems: "center",
      display: "flex",
      height: "100vh",
      padding: `${token.sizeXXL}px 0px`,
      backgroundColor: "#f0f0f0",
      backgroundSize: "cover",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: token.fontSizeHeading2,
    },
  };
};
