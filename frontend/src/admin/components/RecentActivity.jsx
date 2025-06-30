import { Box, Card, CardContent, Typography, Stack, Divider } from "@mui/material";
import {
  MdCheckCircle,
  MdPersonAdd,
  MdCancel,
  MdLocationOn,
  MdBuild,
} from "react-icons/md";

const activities = [
  {
    icon: <MdCheckCircle color="green" />,
    title: "Ride Completed",
    subtitle: "Rajesh → Airport Terminal 1",
    time: "2 mins ago",
    amount: "₹450",
  },
  {
    icon: <MdPersonAdd color="#fbbf24" />,
    title: "New Driver Registered",
    subtitle: "Suresh Patel joined the platform",
    time: "15 mins ago",
  },
  {
    icon: <MdCancel color="#ef4444" />,
    title: "Ride Cancelled",
    subtitle: "User cancelled ride to Mall",
    time: "32 mins ago",
  },
  {
    icon: <MdLocationOn color="#60a5fa" />,
    title: "Ride Started",
    subtitle: "Amit → Business District",
    time: "45 mins ago",
  },
  {
    icon: <MdBuild color="#fbbf24" />,
    title: "Vehicle Maintenance",
    subtitle: "Car servicing scheduled",
    time: "1 hour ago",
  },
];

const RecentActivity = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Recent Activity
        </Typography>
        <Stack spacing={2}>
          {activities.map((a, i) => (
            <Box key={i} display="flex" justifyContent="space-between">
              <Box display="flex" gap={2}>
                {a.icon}
                <Box>
                  <Typography fontWeight="bold">{a.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {a.subtitle}
                  </Typography>
                </Box>
              </Box>
              <Box textAlign="right">
                {a.amount && (
                  <Typography color="green" fontWeight="bold">
                    {a.amount}
                  </Typography>
                )}
                <Typography variant="caption">{a.time}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
