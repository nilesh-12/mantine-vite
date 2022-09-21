import { FC, useState, useEffect } from "react";
// import { Markdown } from "../utils/styled-string-parser/simpler";
// import { styledStrParser } from "../utils/styled-string-parser/StyledStringParser";
interface Props {
  title?: string;
  encrStr?: string;
}
export const Challenge: FC<Props> = ({ title = "", encrStr = "" }) => {
  const page_title = `Challenge: ${title}`;
  // const parser = styledStrParser({ "##":"b", "??":"em", "__":"u", "--":"s" });
  // console.log("parser",parser("##Helo##"))
  const [error, setError] = useState(false);

  let examples;
  const loadParseString = async (value: string) => {
    setError(!error);
  }

  return <div>
    <button onClick={e => loadParseString("*Hello*")}>Load</button>
    {error ? <Error msg="*Error*:%name% is not found" /> : (
      <>
        <h1>
          {page_title}
        </h1>
        {/* <Markdown /> */}
        <pre>
          {/* {parser("??__HELLO__?? WORLD ##SAMPLE --MAIN--##")} */}
          {/* {parser(tokens)} */}
          {/* {content} */}
        </pre>
      </>
    )}
  </div>
};

const Error = ({ msg = "" }) => {
  const [render, setRender] = useState<any>();
  useEffect(() => {
    import("../utils/styled-string-parser/simpler").then(mod => {
      const { lexer, parser } = mod.default()
      setRender(parser(lexer(msg)))
    }).catch(error => {
      setRender(error);
    })
  }, [msg])
  return render
}