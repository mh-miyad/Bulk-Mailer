import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDashboardStore } from "@/Store/DashboardStore";

export function CampaignsTable() {
  const campaigns = useDashboardStore((state) => state.campaigns);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Sent</TableHead>
          <TableHead>Open Rate</TableHead>
          <TableHead>Click Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => (
          <TableRow key={campaign.id}>
            <TableCell>{campaign.name}</TableCell>
            <TableCell>{campaign.status}</TableCell>
            <TableCell>{campaign.sentCount}</TableCell>
            <TableCell>{campaign.openRate}%</TableCell>
            <TableCell>{campaign.clickRate}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
