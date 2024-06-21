import { mode } from "@chakra-ui/theme-tools";
export const stepperStyles = {
    components: {
        Stepper: {
            variants: {
                custom: {
                    step: {
                        transition: 'all 0.3s ease-in-out', // Define transition for steps
                      //  _last: { border: 'none' }, // Optionally remove border for last step
                   //   bg: mode("brand.500", "brand.400"),
                    },
                    stepLabel: {
                     //   fontWeight: 'bold', // Customize step label styles
                    },
                    separator: {
                        transition: 'all 0.3s ease-in-out', // Define transition for step separators
                        // _active: { bg: 'blue.500', height: '2px' }, // Customize separator on active step
                    },
                    stepper:{
                      //  bg: mode("brand.500", "brand.400"),
                  
                    },
                    indicator:{
                     //   _completed:{ background: mode("red", "brand.400"),},
                     //  borderColor: mode("red", "brand.400"),
                     //  _active: { borderColor: mode("red", "brand.400"), },
                    },
                    number:{
                       // bg: mode("red", "brand.400"),
                  
                    },
                    icon:{
                     //   bg: mode("red", "brand.400"),
                  
                    },
                    step: {
                       // color: mode('brand.600', 'brand.300'),// Define step color for light mode
                    },
                    stepLabel: {
                       // color: mode('brand.800', 'brand.400'), // Define step label color for light mode
                    },
                    separator: {
                      //  bg: mode('brand.300', 'brand.700'),// Define separator color for light mode
                    },

                },
            },
        },
    },
};
