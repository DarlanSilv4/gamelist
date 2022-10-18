import React from "react";
import { StyledSkeleton } from "./Skeleton.element";

interface SkeletonProps {
  width: number;
  height: number;
  number?: number;
}

function Skeleton({ width, height, number }: SkeletonProps) {
  return number ? (
    <React.Fragment>
      {[...Array(number)].map((_, id) => {
        return <StyledSkeleton width={width} height={height} key={id} />;
      })}
    </React.Fragment>
  ) : (
    <StyledSkeleton width={width} height={height} />
  );
}

export default Skeleton;
