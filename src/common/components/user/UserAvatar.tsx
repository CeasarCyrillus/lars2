import {Avatar, Box, Skeleton} from "@mui/material";
import {useState} from "react";

type Props = {
  name: string,
  width?: number,
  height?: number
}
export const UserAvatar = ({name, height, width}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dimensions = {width: width ?? 30, height: height ?? 30};
  return <Box {...dimensions}>
    <Avatar
      src={`https://ui-avatars.com/api/?background=random&name=${name}`}
      sx={{...dimensions, display: isLoaded ? "block" : "none"}}
      onLoad={() => setIsLoaded(true)}
    />
    {!isLoaded && <Skeleton variant={"circular"} {...dimensions}/>}
  </Box>
}