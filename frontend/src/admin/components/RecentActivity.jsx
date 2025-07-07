import { Box, Card, CardContent, Typography, Stack, Avatar, Divider } from "@mui/material";
import {
  MdCheckCircle,
  MdPersonAdd,
  MdCancel,
  MdLocationOn,
  MdBuild,
  MdAccessTime,
} from "react-icons/md";

const activities = [
  {
    icon: MdCheckCircle,
    bgColor: "#dcfce7",
    iconColor: "#22c55e",
    title: "Ride Completed",
    subtitle: "Rajesh → Airport Terminal 1",
    time: "2 mins ago",
    amount: "₹450",
  },
  {
    icon: MdPersonAdd,
    bgColor: "#fef9c3",
    iconColor: "#facc15",
    title: "New Driver Registered",
    subtitle: "Suresh Patel joined the platform",
    time: "15 mins ago",
  },
  {
    icon: MdCancel,
    bgColor: "#fee2e2",
    iconColor: "#ef4444",
    title: "Ride Cancelled",
    subtitle: "User cancelled ride to Mall",
    time: "32 mins ago",
  },
  {
    icon: MdLocationOn,
    bgColor: "#dbeafe",
    iconColor: "#3b82f6",
    title: "Ride Started",
    subtitle: "Amit → Business District",
    time: "45 mins ago",
  },
  {
    icon: MdBuild,
    bgColor: "#fef9c3",
    iconColor: "#f59e0b",
    title: "Vehicle Maintenance",
    subtitle: "Car servicing scheduled",
    time: "1 hour ago",
  },
];

const RecentActivity = () => {
  return (
    <Card sx={{ borderRadius: 3, p: 2, height: "100%" }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <MdAccessTime color="#3b82f6" size={22} />
          <Typography variant="h6" fontWeight="bold">
            Recent Activity
          </Typography>
        </Box>
        <Stack spacing={3}>
          {activities.map((a, i) => (
            <Box key={i} display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" gap={2} alignItems="center">
                <Avatar
                  sx={{
                    bgcolor: a.bgColor,
                    color: a.iconColor,
                    width: 36,
                    height: 36,
                  }}
                >
                  <a.icon size={20} />
                </Avatar>
                <Box>
                  <Typography fontWeight="bold">{a.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {a.subtitle}
                  </Typography>
                </Box>
              </Box>
              <Box textAlign="right">
                {a.amount && (
                  <Typography sx={{ color: "#22c55e", fontWeight: "bold" }}>
                    {a.amount}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                  {a.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ mt: 3, mb: 2 }} />
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "#3b82f6",
            fontWeight: 500,
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          View all activities →
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
