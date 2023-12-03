import React, { type PropsWithChildren } from "react";
import dynamic from "next/dynamic";

// SSR can suck a big fat one, thx
const NoSSRWrapper = (props: PropsWithChildren) => (
  <React.Fragment>{props.children}</React.Fragment>
);
export const NoSSR = dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
