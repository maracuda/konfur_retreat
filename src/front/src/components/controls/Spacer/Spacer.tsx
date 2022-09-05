import React from "react";

interface ISpacerProps extends Omit<React.CSSProperties, "display"> {
  gap?: number;
  style?: React.CSSProperties;
  inline?: boolean;
}

export const Spacer = (props: React.PropsWithChildren<ISpacerProps>) => {
  const { children, gap, style, inline, ...others } = props;
  const styles: React.CSSProperties = {
    display: inline ? "inline-block" : "block",
    ...style,
    ...others,
    height: gap || others.height,
  };

  return (
    <div style={styles}>
      {children}
    </div>
  );
};

Spacer.displayName = "Spacer";
