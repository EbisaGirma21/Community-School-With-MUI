import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Badge,
} from "@mui/material";
import AuthContext from "../../../context/AuthContext"; // Assuming user data is managed in AuthContext
import { toast } from "react-toastify";

const ClubPage = () => {
  const { user } = useContext(AuthContext); // Authenticated user details
  const [clubMemberships, setClubMemberships] = useState({}); // Stores membership status for each club

  const clubs = [
    {
      id: 1,
      name: "Science Club",
      description:
        "The Science Club encourages curiosity and experimentation. Members participate in science fairs, organize experiments, and explore the wonders of science.",
      leaders: {
        teacher: "Mr. John Doe",
        student: "Jane Smith (Grade 10)",
      },
    },
    {
      id: 2,
      name: "Art Club",
      description:
        "The Art Club is for creative minds who love painting, drawing, and crafting. Members contribute to school exhibitions and art projects.",
      leaders: {
        teacher: "Ms. Sarah Adams",
        student: "Emily Johnson (Grade 11)",
      },
    },
    {
      id: 3,
      name: "Debate Club",
      description:
        "The Debate Club develops critical thinking and public speaking skills. Members engage in debates and competitions at the school and regional levels.",
      leaders: {
        teacher: "Mr. Robert Green",
        student: "Michael Brown (Grade 12)",
      },
    },
    {
      id: 4,
      name: "Sports Club",
      description:
        "The Sports Club promotes physical fitness and teamwork. Members organize sports events and participate in inter-school competitions.",
      leaders: {
        teacher: "Coach Alice White",
        student: "David Lee (Grade 9)",
      },
    },
  ];

  // Fetch membership status for the user (mocked for now)
  useEffect(() => {
    // Simulate an API call to check memberships
    const fetchMemberships = async () => {
      // Example: Replace with an actual API call
      const memberships = {
        1: true, // User is a member of Science Club
        2: false, // User is not a member of Art Club
        3: true, // User is a member of Debate Club
        4: false, // User is not a member of Sports Club
      };
      setClubMemberships(memberships);
    };

    fetchMemberships();
  }, []);

  return (
    <Box className="p-6">
      <Typography variant="h4" className="mb-4" textAlign="center">
        School Clubs
      </Typography>
      <Typography
        variant="body1"
        className="mb-6 text-gray-600"
        textAlign="center"
      >
        Discover our school clubs and their activities. See which clubs you’re
        already a member of and join others to explore your interests!
      </Typography>

      <Grid container spacing={4}>
        {clubs.map((club) => (
          <Grid item xs={12} md={6} key={club.id}>
            <Card className="hover:shadow-lg hover:transition-all">
              <CardContent>
                <Typography variant="h5" className="mb-4">
                  {club.name}
                </Typography>
                <Typography variant="body2" className="mb-4 text-gray-600">
                  {club.description}
                </Typography>
                <Typography variant="subtitle2" className="mb-3 text-gray-600">
                  <strong>Teacher Leader:</strong> {club.leaders.teacher}
                </Typography>
                <Typography variant="subtitle2" className="mb-4 text-gray-600">
                  <strong>Student Leader:</strong> {club.leaders.student}
                </Typography>
                {/* Membership Status */}
                <Typography
                  variant="body2"
                  className="mb-4"
                  color={
                    clubMemberships[club.id] ? "success.main" : "text.secondary"
                  }
                >
                  {clubMemberships[club.id]
                    ? "You are a member of this club."
                    : "You are not a member of this club."}
                </Typography>

                {/* Join Club Button */}
                {!clubMemberships[club.id] && (
                  <Badge className="bg-[#C7E4FC] text-[#1E88E5] p-2 rounded-md">
                    Contact Leader to Join
                  </Badge>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ClubPage;
