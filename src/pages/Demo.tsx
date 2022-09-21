import { MantineProvider } from '@mantine/core';
import { Challenge } from '../components/Challenge';
//import { StyledStringParser } from '../utils/styled-string-parser/StyledStringParser';
export default function Demo() {
  return (
    <MantineProvider
      theme={{
        // Override any other properties from default theme
        fontFamily: 'Open Sans, sans serif',
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
      }}
    >
     <Challenge title="Alert Message with bold styling using *bold*" encrStr='??__HELLO__?? WORLD ##SAMPLE --MAIN--##'/>
    </MantineProvider>
  );
}
