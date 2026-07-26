import { Card, CardContent, Typography, Box } from "@mui/material";

function formatCurrency(value) {
  if (value >= 1000000000)
    return `₹${(value / 1000000000).toFixed(2)} B`;

  if (value >= 10000000)
    return `₹${(value / 10000000).toFixed(2)} Cr`;

  if (value >= 100000)
    return `₹${(value / 100000).toFixed(2)} L`;

  return `₹${value.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

function KPICard({
  title,
  value,
  color,
  icon,
  trend = "+2.4%",
}) {
  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 4,
        transition: "0.3s",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Box
        sx={{
          height: 6,
          background: color,
        }}
      />

      <CardContent>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >

          <Typography
            color="text.secondary"
            fontWeight={600}
          >
            {title}
          </Typography>

          <Box
            sx={{
              bgcolor: color,
              color: "white",
              width: 50,
              height: 50,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {icon}
          </Box>

        </Box>

        <Typography
          variant="h4"
          fontWeight="bold"
          mt={2}
        >
          {typeof value === "number"
            ? formatCurrency(value)
            : value}
        </Typography>

        <Typography
          color="success.main"
          mt={1}
          fontWeight="bold"
        >
          ▲ {trend} from last period
        </Typography>

      </CardContent>
    </Card>
  );
}

export default KPICard;