import * as d3 from "d3";
import cloud from "d3-cloud";
import { useEffect, useRef } from "react";

export default function WordCloud({ words, width = 400, height = 200 }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!words || words.length === 0) return;
    // Clear previous svg
    d3.select(svgRef.current).selectAll("*").remove();

    const layout = cloud()
      .size([width, height])
      .words(words.map((d) => ({ text: d.word, size: 10 + d.count * 10 })))
      .padding(5)
      .rotate(() => 0)
      .font("Impact")
      .fontSize((d) => d.size)
      .on("end", draw);

    layout.start();

    function draw(words) {
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      svg
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-family", "Impact")
        .style("fill", (d, i) => d3.schemeCategory10[i % 10])
        .attr("text-anchor", "middle")
        .attr("font-size", (d) => d.size)
        .attr("transform", (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text((d) => d.text);
    }
  }, [words, width, height]);

  return <svg ref={svgRef}></svg>;
}
