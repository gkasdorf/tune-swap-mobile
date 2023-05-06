import {createTheme} from "@rneui/themed";

const theme = createTheme({
    lightColors: {
        primary: "#6d3982",
        secondary: "#4f6ab5",

    },
    darkColors: {
        primary: "#6d3982",
        secondary: "#4f6ab5",
    },

    components: {
        Button: {
            buttonStyle: {
                backgroundColor: "black",
                borderRadius: 10,
                marginVertical: 10
            },

            titleStyle: {
                fontSize: 20,
                fontWeight: "bold"
            }
        },

        Text: {
            style: {
                fontFamily: "OpenSans",
                fontSize: 16
            }
        },

        ListItem: {
            style: {
                borderRadius: 10
            },

            containerStyle: {
            }
        }
    },
});

export default theme;
