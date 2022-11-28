import { Pagination, Box, Paper, Grid, Typography, Rating, Avatar, IconButton } from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import { useState } from "react";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate } from "react-router-dom";
import { backendHost } from "../../constants";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#D9D9D9',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function MomentieUserList(props) {
    const { userList, cardPerPage } = props
    const [pageNumber, setPageNumber] = useState(1);
    const navigate = useNavigate();
    const elmOnPage = !cardPerPage || cardPerPage < 1 ? 6 : cardPerPage

    function toProfile(email) {
        navigate('/profile/' + email);
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", width: "80%", minHeight: "35vh" }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {pageNumber > 0 && userList.slice((pageNumber - 1) * elmOnPage, pageNumber * elmOnPage).map((user) => (
                        <Grid item xs={2} sm={4} md={4} key={user.email} >
                            <Item sx={{ height: "fit-content", width: "fit-content" }}>
                                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                                    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                                        <Avatar sx={{ height: '70px', width: '70px', marginRight: "10px" }} alt={user.email} crossorigin use-credentials src={backendHost + `/profile/image?email=` + user.email} />
                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

                                            {user.username && <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{user.username}</Typography>}
                                            <Typography variant="h5">{user.email}</Typography>
                                            <Rating
                                                value={user.like}
                                                readOnly
                                                precision={0.5} size="large"
                                            />
                                        </Box>

                                    </Box>
                                    <IconButton onClick={() => { toProfile(user.email) }} sx={{ marginLeft: "auto", maxWidth: "false" }}>
                                        <ReadMoreIcon fontSize="large"></ReadMoreIcon>
                                    </IconButton>

                                </Box>

                            </Item>
                        </Grid>
                    ))}
                </Grid>

            </Box>
            <Pagination onChange={(_, num) => { setPageNumber(num) }} sx={{ justifyContent: "flex-start", marginLeft: "-50px" }} count={Math.ceil(userList.length / elmOnPage)} variant="outlined" shape="rounded" />
        </Box >
    );
}