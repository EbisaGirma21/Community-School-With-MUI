import { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import ClubMemberCreate from "./components/ClubMemberCreate";
import ClubMemberContext from "../../context/ClubMemberContext";
import ClubMemberTable from "./components/ClubMemberTable";
import ClubContext from "../../context/ClubContext";
import Dropdown from "../../components/UI/Dropdown";
import { toast } from "react-toastify";

function ClubMember() {
  const { setError, setIsLoading } = useContext(ClubMemberContext);
  const { club, fetchClubs } = useContext(ClubContext);
  const [open, setOpen] = useState(false);
  const [clubId, setClubId] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setError(null);
    setIsLoading(null);
    setOpen(false);
  };

  // update local club state when context club changes
  useEffect(() => {
    fetchClubs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // section option
  const clubOption = !club
    ? [{ label: "Not found", value: 1 }]
    : club.map((clu) => ({
        label: clu.clubName,
        value: clu._id,
      }));

  return (
    <Box>
      <Box>
        <Box>
          <Box className="border-2 border-gray-200 p-2 rounded-md m-1 flex justify-between">
            <Box className="w-1/6">
              <Dropdown
                label="Club"
                options={clubOption}
                value={clubId}
                onChange={(e) => setClubId(e.target.value)}
                width={"50%"}
              />
            </Box>
            <Button
              onClick={() => {
                if (clubId) {
                  handleOpen();
                } else {
                  toast.warning("No selected club");
                }
              }}
              variant="contained"
              sx={{ m: 1 }}
            >
              <AddIcon />
              New
            </Button>
          </Box>
          <ClubMemberCreate
            open={open}
            handleClose={handleClose}
            clubId={clubId}
          />
          <Box>
            <ClubMemberTable clubId={clubId} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ClubMember;
