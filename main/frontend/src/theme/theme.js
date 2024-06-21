import { extendTheme } from "@chakra-ui/react";
import { CardComponent } from "./additions/card/card";
import { buttonStyles } from "./components/button";
import { inputStyles } from "./components/input";
import { linkStyles } from "./components/link";
import { breakpoints } from "./foundations/breakpoints";
import { globalStyles } from "./styles";
import { stepperStyles } from "./components/stepper.js";
export default extendTheme(
  { breakpoints }, // Breakpoints
  globalStyles,
  buttonStyles, // button styles
  linkStyles, // link styles
  inputStyles, // input styles
  CardComponent, // card component
  stepperStyles , //stepper style
);
