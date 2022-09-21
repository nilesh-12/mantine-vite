import React from "react";

export class StyledStringParser {
  markerMapping: Record<string, any> = {
    "##": "b",
    "??": "em",
    "__": "u",
    "--": "s",
  };

  constructor(markerMapping?: Record<string, any>) {
    if (markerMapping)
		this.markerMapping = markerMapping;
  }

  // if param is eligible to recurse.
  // recurseWhenValueIsMeta(couldBeArrayOrNot: Array<any>|string) {
  // 	const possibility = {
  // 		"string":false,
  // 		"array":true,
  // 	}
  // 	return possibility[typeof couldBeArrayOrNot] ??;
  // }

  metaFormatChecker(meta: any): Array<any> {
    const keys = ["marker", "value"];

    let result: boolean = false;
    let detail: string =
      "Error: It ain't instance of an object with key: [marker, value]";

    console.log()

    if (meta instanceof Object) {
      result = Object.keys(meta).every((key) => keys.includes(key));
      detail = "";
      return [result, detail];
    }

    return [result, detail];
  }

  // the meta in the params means that it can be either object or string
  // meta points to the array element.
  metaIterator(meta: any): any {
    // makes sure that marker and value key exist on meta object.

    const [isMeta] = this.metaFormatChecker(meta);

    // if it is not meta it is returning string.
    if (!isMeta) return meta;

    // value is always an array
    const { marker, value } = meta;

    return this.generateHTML(
      this.markerMapping[marker],
      value.map(this.metaIterator)
    );
  }

  generateHTML(tag: string, innerValue: any, attributes?: Record<string, any>) {
    return React.createElement(tag, attributes ?? {}, innerValue);
  }

  parse(styledString: string): any {
    var self = this;
    const markers = Object.keys(self.markerMapping);
    // Escape the markers (mostly useless...)
    const escaped = markers.map((m) => m.replace(/./g, "\\$&"));
    // console.log(escaped, markers)

    // Create regexs to match each individual marker.
    const groups = escaped.map((m) => new RegExp("(" + m + ")(.*?)" + m));
    // console.log(groups, escaped)

    // Create the regex to match any group.
    const regex = new RegExp(
      "(" + escaped.map((m) => m + ".*?" + m).join("|") + ")"
    );
    const output = [];

    // 'Match' the groups markers.
    const splitStyledString = styledString.split(regex).filter((_) => _);
    // console.log(styledString)

    const meta = splitStyledString.map((match) => {
      // Find the marker if it is a marker.
      let marker = groups.find((m) => m.test(match));
      // console.log(marker)

      // If it's not a marker return the value.
      if (!marker) {
        // console.log(match.trim())
        return match.trim();
      }

      // It is a marker so make the marker object.
      const matchedMatch = match.match(marker);
      // console.log(marker,match)

      return {
        marker: matchedMatch?.[1],
        // Do the recursion.
        value: self.parse(match[2]),
      };
    });

    // meta contains all the info to convert it to html node.
    return Array.prototype.map.call(meta, self.metaIterator);
  }
}

export const styledStrParser = (markerMapping: Record<string, string>) => {



  
  const generateHTML = (tag: string, innerValue: any, attributes?: Record<string, any>): React.ReactElement => {
    console.log(tag, attributes, innerValue)
    return React.createElement(tag, attributes ?? {}, innerValue);
  }


  const metaFormatChecker = (meta: any): Array<any> => {
    const keys = ["marker", "value"];

    let result: boolean = false;
    let detail: string =
      "Error: It ain't instance of an object with key: [marker, value]";

    console.log(meta instanceof Object)

    if (meta instanceof Object) {
      result = Object.keys(meta).every((key) => keys.includes(key));
      detail = "";
      return [result, detail];
    }

    return [result, detail];
  }
  
  
  // the meta in the params means that it can be either object or string
  // meta points to the array element.
  const metaIterator=(meta: any): any => {
    // makes sure that marker and value key exist on meta object.

    const [isMeta] = metaFormatChecker(meta);
    console.log(isMeta)

    // if it is not meta it is returning string.
    if (!isMeta) return meta;

    // value is always an array
    const { marker, value } = meta;

    return generateHTML(
      markerMapping[marker],
      value.map(metaIterator)
    );
  }



  const parse = (styledString: string): any => {
    const markers = Object.keys(markerMapping);
    // Escape the markers (mostly useless...)
    const escaped = markers.map((m) => m.replace(/./g, "\\$&"));
    // console.log(escaped, markers)

    // Create regexs to match each individual marker.
    const groups = escaped.map((m) => new RegExp("(" + m + ")(.*?)" + m));
    // console.log(groups, escaped)

    // Create the regex to match any group.
    const regex = new RegExp(
      "(" + escaped.map((m) => m + ".*?" + m).join("|") + ")"
    );
    const output = [];

    // 'Match' the groups markers.
    const splitStyledString = styledString.split(regex).filter((_) => _);
    console.log("styledString",styledString)

    const meta = splitStyledString.map((match) => {
      // Find the marker if it is a marker.
      let marker = groups.find((m) => m.test(match));
      // console.log(marker)

      // If it's not a marker return the value.
      if (!marker) {
        // console.log(match.trim())
        return match.trim();
      }

      // It is a marker so make the marker object.
      const matchedMatch = match.match(marker);
      // console.log(marker,match)

      return {
        marker: matchedMatch?.[1],
        // Do the recursion.
        value: parse(match[2]),
      };
    });
    console.log("meta:", meta)

    // meta contains all the info to convert it to html node.
    return Array.prototype.map.call(meta, metaIterator);
  }

  return parse;
} 