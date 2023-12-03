import { Box } from "@chakra-ui/react";
import Dropzone, { type DropzoneProps } from "react-dropzone";

export const FileUploader = (
  props: {
    InnerDropzone: JSX.Element;
  } & DropzoneProps
) => {
  return (
    <Box w="100%">
      <Dropzone {...props}>
        {({ getRootProps, getInputProps }) => (
          <>
            <div {...getRootProps()}>
              <input {...getInputProps()} className="hidden" />
              <div>{props.InnerDropzone}</div>
            </div>
          </>
        )}
      </Dropzone>
    </Box>
  );
};
