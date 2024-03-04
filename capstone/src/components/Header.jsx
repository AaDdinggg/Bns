import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
// import { Title } from "@mui/icons-material";

const Header = ({ title, subtitle}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return <Box mb="20px">
        <Typography 
        variant="h2" 
        color={colors.grey[100]} 
        fontWeight="bold" 
        sx={{mb: "2px"}}>{title}</Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>{subtitle}</Typography>
    </Box>
}

export default Header